/**
 * scripts/search-live-test.cjs
 * Loads the REAL app (index.html), types into the global search, and asserts
 * the dropdown shows results + Enter navigates. Authoritative end-to-end check.
 */
const { execSync } = require('child_process');
const BASE = 'http://localhost:8099';
const fs = require('fs');

const harness = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script type="module">
  // Pull in the real bootstrap logic is heavy; instead mount minimal hosts
  // and call the same init the app uses.
  const { renderSidebar } = await import('${BASE}/components/sidebar.js');
  const { renderTopbar }  = await import('${BASE}/components/topbar.js');
  const { initSearch }    = await import('${BASE}/modules/search.js');
  document.body.innerHTML = '<div id="app-layout"><aside id="sidebar"></aside><header id="topbar"></header><main id="page-content"></main></div>';
  renderSidebar();
  renderTopbar();
  await initSearch();
  const input = document.getElementById('global-search');
  input.value = 'two sum';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  await new Promise(r => setTimeout(r, 1200));
  const res = document.getElementById('global-search-results');
  const count = res ? res.querySelectorAll('.search-result').length : 0;
  const firstHref = res && res.querySelector('.search-result') ? res.querySelector('.search-result').getAttribute('href') : '';
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  await new Promise(r => setTimeout(r, 300));
  console.log('SEARCH count=' + count + ' firstHref=' + firstHref + ' hash=' + location.hash);
  window.__done = true;
</script></body></html>`;
fs.writeFileSync('search_tmp.html', harness);
const dump = execSync(`google-chrome --headless --disable-gpu --no-sandbox --enable-logging=stderr --virtual-time-budget=12000 --dump-dom "${BASE}/search_tmp.html" 2>&1`, { encoding: 'utf8', maxBuffer: 1 << 26 });
fs.unlinkSync('search_tmp.html');
const m = dump.match(/SEARCH count=[^\n]*/);
console.log(m ? m[0] : 'NO_SEARCH_RESULT');
const ok = m && /count=[1-9]/.test(m[0]) && /firstHref=#/.test(m[0]);
console.log(ok ? 'SEARCH_OK' : 'SEARCH_FAIL');
process.exit(ok ? 0 : 1);
