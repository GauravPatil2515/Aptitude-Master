#!/usr/bin/env node
/**
 * scripts/smoke.cjs — headless UI smoke test for AptitudeMaster.
 *
 * Renders key SPA routes in headless Chrome and asserts:
 *   1. No fatal fallback text ("Chapter not found", "Could not load", "empty-state" with error).
 *   2. No decorative emoji (the 🎯🎥📝🔍 etc. we removed).
 *   3. Expected anchor elements are present per route.
 *
 * Usage:
 *   node scripts/smoke.cjs            # expects a server on :8099
 *   BASE=http://localhost:3000 node scripts/smoke.cjs
 *
 * Requires Google Chrome (google-chrome) on PATH. Exits non-zero on failure.
 */
const { execSync } = require('child_process');

const BASE = process.env.BASE || 'http://localhost:8099';
const CHROME = process.env.CHROME_BIN || 'google-chrome';

// route -> checks. `expect` strings must appear in the rendered DOM.
const ROUTES = {
  '#/home':                 { expect: ['AptitudeMaster', 'Quick Practice'] },
  '#/dsa':                  { expect: ['DSA Sheet', 'dsa-table', 'dsa-row'] },
  '#/sql-sheet':            { expect: ['SQL Sheet', 'sql-table', 'sql-row'] },
  '#/playground':           { expect: ['playground-layout', 'Python Playground'] },
  '#/ai-tutor':             { expect: ['ai-tutor-layout', 'chat-messages'] },
  '#/chapter/dsa/arrays':   { expect: ['Arrays & Strings', 'dsa-row'] },
};

// Decorative emoji we explicitly removed from the UI. We only flag THESE
// (plus the colorful pictograph ranges), NOT typographic glyphs like
// ○ ● ✕ ✓ ★ ☆ ♥ ♦ ♣ ♠ ➔ which are legitimate UI symbols.
const DECORATIVE_EMOJI = /[🎯🎥📝🔍🔗📊🔄🪟⚡📈📋⚙️📊🎯]/u;
const PICTOGRAPH = /[🀀-🿿\u{1F000}-\u{1FAFF}\u{FE0F}]/u;
const EMOJI_RE = new RegExp(`(?:${DECORATIVE_EMOJI.source})|(?:${PICTOGRAPH.source})`, 'u');
const FATAL = ['Chapter not found', 'Could not load', 'empty-state'];

function render(route) {
  const url = `${BASE}/${route}`;
  let html = execSync(
    `"${CHROME}" --headless --disable-gpu --no-sandbox --virtual-time-budget=12000 --dump-dom "${url}" 2>/dev/null`,
    { encoding: 'utf-8', timeout: 45000 }
  );
  // Normalize HTML entities so substring checks match rendered text.
  return html.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

let failures = 0;
console.log(`Smoke test against ${BASE}\n`);

for (const [route, cfg] of Object.entries(ROUTES)) {
  let html;
  try {
    html = render(route);
  } catch (e) {
    console.log(`  FAIL ${route}: render error (${String(e.message || e).slice(0, 80)})`);
    failures++;
    continue;
  }

  const missing = cfg.expect.filter(needle => !html.includes(needle));
  const fatal = FATAL.filter(f => html.includes(f));
  const emoji = html.match(EMOJI_RE);

  if (missing.length || fatal.length || emoji) {
    failures++;
    console.log(`  FAIL ${route}`);
    if (missing.length) console.log(`       missing: ${missing.join(', ')}`);
    if (fatal.length)   console.log(`       fatal text: ${fatal.join(', ')}`);
    if (emoji)          console.log(`       emoji found: ${[...new Set(emoji)].join(' ')}`);
  } else {
    console.log(`  ok   ${route}  (${html.length} bytes)`);
  }
}

console.log('');
if (failures) {
  console.log(`SMOKE FAILED: ${failures} route(s) had problems.`);
  process.exit(1);
} else {
  console.log('SMOKE PASSED: all routes rendered cleanly.');
}
