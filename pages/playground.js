/**
 * pages/playground.js — Python Playground Page
 * Wraps existing Pyodide + Monaco logic in a page module.
 */
export function renderPlayground() {
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="page page--playground">
      <h1 class="page-title">🐍 Python Playground</h1>
      <div class="playground-layout">
        <div class="card playground-sidebar">
          <h3 class="card-title" style="color:var(--accent-cyan)">Challenges</h3>
          <select id="playground-challenge-select" class="input-field">
            <option value="custom">Custom Scratchpad</option>
            <option value="sum_array">1. Sum of Array</option>
            <option value="matrix_mult">2. Matrix Multiplication</option>
            <option value="binary_search">3. Binary Search</option>
            <option value="relu">4. ReLU Activation</option>
          </select>
          <div id="playground-challenge-desc" class="playground-desc"></div>
          <div class="pyodide-status">
            <span id="pyodide-status-dot" class="status-dot"></span>
            <span id="pyodide-status-text">Pyodide: Not Loaded</span>
          </div>
        </div>
        <div class="playground-editor-area">
          <div class="card" style="padding:0;overflow:hidden;">
            <div class="editor-toolbar">
              <span class="editor-lang">Python</span>
              <div style="display:flex;gap:8px">
                <button class="btn btn--primary btn--sm" id="playground-run-btn">▶ Run</button>
                <button class="btn btn--ghost btn--sm" id="playground-reset-btn">Reset</button>
                <button class="btn btn--ghost btn--sm" id="playground-clear-console-btn">Clear</button>
              </div>
            </div>
            <div id="monaco-container" style="height:340px;width:100%"></div>
          </div>
          <div class="card" style="padding:0;overflow:hidden;margin-top:var(--space-4)">
            <div class="editor-toolbar"><span class="editor-lang">Output</span></div>
            <pre id="playground-console" class="console-output">// Output will appear here</pre>
          </div>
        </div>
      </div>
    </div>
  `;
  // Note: Pyodide/Monaco integration is a future enhancement.
  // Previously app.js provided initPlayground(), but it has been removed.
}
