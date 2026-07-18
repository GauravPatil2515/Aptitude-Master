/**
 * scripts/md-render-test.cjs
 * Verifies renderMarkdown converts "AI-generated looking" markdown
 * (### headings, numbered lists, bullets, bold, code) into clean HTML
 * with no raw ### / * artifacts. Uses the page's own renderer via a test hook.
 */
const { execSync } = require('child_process');
const BASE = 'http://localhost:8099';
const fs = require('fs');

const sample = `### 1. Processes and Threads

A **process** is an instance of a program. A *thread* is a lightweight process.

1. First item
2. Second item

- bullet a
- bullet b

\`\`\`python
print("hi")
\`\`\`

> a note`;

const harness = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<div id="page-content"></div>
<div id="out"></div>
<script type="module">
  window.__EXPOSE_RENDER_MD = true;
  const { renderAITutor } = await import('${BASE}/pages/ai-tutor.js');
  renderAITutor();
  const fn = window.__renderMarkdown;
  const out = document.getElementById('out');
  out.textContent = fn ? fn(${JSON.stringify(sample)}) : 'NO_FN';
</script></body></html>`;

fs.writeFileSync('md_tmp.html', harness);
const dump = execSync(
  `google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=15000 --dump-dom "${BASE}/md_tmp.html" 2>/dev/null`,
  { encoding: 'utf8', maxBuffer: 1 << 26 }
);
try { fs.unlinkSync('md_tmp.html'); } catch(_) {}

const m = dump.match(/<div id="out">([\s\S]*?)<\/div>/);
const html = m ? m[1] : '(none)';
console.log('RENDERED HTML:\n' + html);
const hasHeading = /md-h3/.test(html);
const hasList = /&lt;ol|&lt;ul/.test(html);
const hasRawHash = /###/.test(html);
const hasRawStar = /\*[A-Za-z]/.test(html);
const hasCode = /&lt;pre&gt;&lt;code&gt;/.test(html);
const hasBlockquote = /&lt;blockquote&gt;/.test(html);
console.log('--- checks ---');
console.log('h3 heading:', hasHeading, '| list:', hasList, '| code:', hasCode, '| blockquote:', hasBlockquote);
console.log('raw ### left:', hasRawHash, '| raw * artifact:', hasRawStar);
const ok = hasHeading && hasList && hasCode && hasBlockquote && !hasRawHash && !hasRawStar;
console.log(ok ? 'MARKDOWN_OK' : 'MARKDOWN_FAIL');
process.exit(ok ? 0 : 1);
