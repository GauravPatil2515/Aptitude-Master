/**
 * pages/playground.js — Code Playground
 * Python execution via Pyodide with error handling and output panel
 */
export function renderPlayground() {
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="page page--playground">
      <div class="playground-header">
        <h1>⚡ Code Playground</h1>
        <div class="playground-meta">
          <span class="badge badge--blue">Python (Pyodide)</span>
          <button class="btn btn--primary btn--sm" onclick="runPlayground()">▶ Run</button>
          <button class="btn btn--ghost btn--sm" onclick="clearPlayground()">Clear</button>
        </div>
      </div>
      <div class="playground-body">
        <div class="playground-editor-wrap">
          <textarea id="playground-code" class="playground-editor" spellcheck="false"
            placeholder="# Write Python here\nprint('Hello, World!')"># Aptitude shortcut example\nCP = 400\nSP = 500\nprofit_pct = ((SP - CP) / CP) * 100\nprint(f'Profit %: {profit_pct}%')
          </textarea>
        </div>
        <div class="playground-output-wrap">
          <div class="playground-output-header">Output</div>
          <pre id="playground-output" class="playground-output">Click ▶ Run to execute your code.</pre>
        </div>
      </div>
    </div>
  `;

  window.runPlayground = async function() {
    const code = document.getElementById('playground-code')?.value ?? '';
    const output = document.getElementById('playground-output');
    if (!output) return;
    output.textContent = 'Running…';
    try {
      if (!window.pyodide) {
        output.textContent = 'Loading Python runtime… (~5s on first run)';
        window.pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/' });
      }
      // Capture stdout
      window.pyodide.runPython(`
import sys, io
_buf = io.StringIO()
sys.stdout = _buf
`);
      window.pyodide.runPython(code);
      const result = window.pyodide.runPython('_buf.getvalue()');
      output.textContent = result || '(no output)';
    } catch (e) {
      output.textContent = '❌ Error:\n' + e.message;
    }
  };

  window.clearPlayground = function() {
    const el = document.getElementById('playground-code');
    const out = document.getElementById('playground-output');
    if (el) el.value = '';
    if (out) out.textContent = 'Output cleared.';
  };
}
