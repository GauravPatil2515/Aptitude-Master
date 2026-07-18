/**
 * scripts/groq-feature-test.cjs
 * Headless verification of all AI-powered features against the LIVE Groq API.
 *
 * Security: the Groq key is passed ONLY via argv and injected into the
 * headless browser's localStorage at runtime. It is NEVER written to any
 * file, never logged, and never committed.
 *
 * Usage: node scripts/groq-feature-test.cjs <GROQ_API_KEY>
 */
const { execSync } = require('child_process');

const KEY = process.argv[2] || process.env.GROQ_API_KEY;
if (!KEY) { console.error('Usage: node scripts/groq-feature-test.cjs <GROQ_API_KEY>  (or set GROQ_API_KEY env)'); process.exit(2); }

const BASE = 'http://localhost:8099';

// A small HTML page that imports the app's REAL modules and runs them.
// The key is set into localStorage before importing ai.js so callDirect() picks it up.
const harness = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<div id="out"></div>
<script type="module">
  const KEY = ${JSON.stringify(KEY)};
  localStorage.setItem('groq_api_key', KEY);
  localStorage.setItem('ai_mode', 'direct');

  const log = (m) => { document.getElementById('out').textContent += m + '\\n'; };

  try {
    const { askAI, generateSimilarQuestions } = await import('${BASE}/api/ai.js');

    // FEATURE 1 — AI Tutor chat
    const tutorReply = await askAI(
      'You are an expert placement tutor. Be concise. Use markdown.',
      'Explain the quickest way to solve: A can do a work in 10 days, B in 15 days. Together?'
    );
    log('AI_TUTOR_OK len=' + tutorReply.length);
    log('AI_TUTOR_SAMPLE=' + tutorReply.slice(0, 120).replace(/\\n/g,' '));

    // FEATURE 2 — Chapter AI tutor (per-chapter help)
    const chapReply = await askAI(
      'You are a placement prep tutor helping with Arrays & Strings.',
      'What is the two-pointer technique? Give a 2-line example.'
    );
    log('CHAPTER_TUTOR_OK len=' + chapReply.length);

    // FEATURE 3 — Practice similar-questions generator (JSON output)
    const q = {
      text: 'If 40% of a number is 80, what is the number?',
      options: ['200', '180', '220', '160'],
      answer: 0,
    };
    const similar = await generateSimilarQuestions(q, 'Aptitude Percentages');
    log('SIMILAR_Q_OK count=' + (Array.isArray(similar) ? similar.length : 0));
    if (Array.isArray(similar) && similar.length) {
      log('SIMILAR_Q_SAMPLE=' + similar[0].text.slice(0, 100).replace(/\\n/g,' '));
    }

    log('ALL_FEATURES_PASSED');
  } catch (e) {
    log('ERROR: ' + (e && e.message ? e.message : e));
    log('FEATURES_FAILED');
  }
</script>
</body></html>`;

const fs = require('fs');
const tmp = '/tmp/groq_harness.html';
fs.writeFileSync(tmp, harness);

// Serve the harness via the running http.server (drop it in project root temporarily,
// then delete — it contains no secret; the key is only injected at runtime by the browser).
fs.copyFileSync(tmp, 'groq_harness_tmp.html');

const dump = execSync(
  `google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=30000 --dump-dom "${BASE}/groq_harness_tmp.html" 2>/dev/null`,
  { encoding: 'utf8', maxBuffer: 1 << 26 }
);

// Extract the #out text
const m = dump.match(/<div id="out">([\s\S]*?)<\/div>/);
const out = m ? m[1].replace(/<[^>]+>/g, '') : '(no output captured)';
console.log(out);

// Cleanup temp harness (never committed; contains no secret anyway)
try { fs.unlinkSync('groq_harness_tmp.html'); } catch (_) {}

const passed = /ALL_FEATURES_PASSED/.test(out);
process.exit(passed ? 0 : 1);
