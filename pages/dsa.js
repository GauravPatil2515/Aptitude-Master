/**
 * pages/dsa.js — DSA Sheet (Striver A2Z style)
 * Master-detail layout: topic sidebar + filters + problem list (tracker)
 * with a per-problem Solve Space (code editor + run, like the TCS editor).
 */
import { store } from '../state/store.js';

const DSA_STATUS = { todo: '', in_progress: '', completed: '' };
const DSA_STATUS_LABEL = { todo: 'Not started', in_progress: 'In progress', completed: 'Completed' };
const DSA_STATUS_CYCLE = { todo: 'in_progress', in_progress: 'completed', completed: 'todo' };

const COMPANIES = ['Amazon', 'Google', 'Meta', 'Microsoft', 'Adobe'];

export async function renderDSA() {
  const app = document.getElementById('page-content');
  app.innerHTML = `<div class="page-loading"><div class="page-loading__spinner"></div><div class="page-loading__text">Loading DSA Sheet…</div></div>`;

  let manifest;
  try {
    manifest = (await import('../data/dsa/index.js')).default;
  } catch (e) {
    app.innerHTML = `<div class="empty-state"><h2>Could not load DSA sheet</h2></div>`;
    return;
  }

  const s = store.get();
  const dsaState = s.dsa || {};
  const dsaNotes = s.dsaNotes || {};
  const dsaCode = s.dsaCode || {};

  const getStatus = (id) => dsaState[id] || 'todo';

  function starter(lang, p) {
    const pat = p.pattern || '';
    if (lang === 'python') {
      return `# ${p.name}\n# Pattern: ${pat}\n# Write your solution below.\n\ndef solve(nums):\n    # TODO: implement\n    pass\n\n# Example test:\nprint(solve([]))\n`;
    }
    return `// ${p.name}\n// Pattern: ${pat}\n// Write your solution below.\n\nfunction solve(input) {\n  // TODO: implement\n  return input;\n}\n\n// Example test:\nconsole.log(solve(/* test input */));\n`;
  }

  // ── Topic sections ──
  const topicSections = manifest.topics.map(topic => {
    let topicSolved = 0;
    const rows = topic.problems.map(p => {
      const st = getStatus(p.id);
      if (st === 'completed') topicSolved++;
      const companies = (p.companies || []).slice(0, 3)
        .map(c => `<span class="company-tag company-tag--${c.toLowerCase().replace(/\s+/g, '')}">${c}</span>`).join(' ');
      const noteVal = dsaNotes[p.id] || '';
      const res = `
        <div class="dsa-res-links">
          ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="dsa-res-link">Solve</a>` : ''}
          ${p.youtube ? `<a href="${p.youtube}" target="_blank" rel="noopener" class="dsa-res-link">Video</a>` : ''}
          ${p.article ? `<a href="${p.article}" target="_blank" rel="noopener" class="dsa-res-link">Article</a>` : ''}
        </div>`;
      return `
        <tr class="dsa-row dsa-row--${st}" data-id="${p.id}" data-difficulty="${p.difficulty}" data-status="${st}" data-tcs="${p.tcsNqt ? 'true' : 'false'}" data-company="${(p.companies || []).join(',').toLowerCase()}">
          <td class="dsa-cell">
            <button class="status-btn status-btn--${st}" data-id="${p.id}" title="${DSA_STATUS_LABEL[st]}">${DSA_STATUS[st]}</button>
          </td>
          <td class="dsa-cell dsa-cell--name">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <button class="dsa-open-btn" data-id="${p.id}" style="background:none;border:none;color:var(--accent);font-weight:600;cursor:pointer;padding:0;font-size:inherit;font-family:inherit;">${p.name}</button>
              <div style="display:inline-flex;gap:4px;">${companies}</div>
            </div>
          </td>
          <td class="dsa-cell"><span class="badge badge--diff-${p.difficulty}">${p.difficulty}</span></td>
          <td class="dsa-cell"><span class="badge badge--imp">${p.importance || 'Medium'}</span></td>
          <td class="dsa-cell">${p.tcsNqt ? `<span class="badge badge--tcs-nqt" style="font-size:10px;">TCS NQT</span>` : `<span class="badge badge--tcs-none">—</span>`}</td>
          <td class="dsa-cell">${res}</td>
          <td class="dsa-cell dsa-cell--hint">${p.pattern || '—'}</td>
        </tr>`;
    }).join('');

    const topicPct = topic.problems.length ? Math.round(topicSolved / topic.problems.length * 100) : 0;
    return `
      <tbody class="dsa-topic-group" data-topic="${topic.id}">
        <tr class="dsa-topic-header" style="cursor:pointer;">
          <td colspan="7" class="dsa-topic-header__cell">
            <span class="dsa-topic-header__arrow" style="display:inline-block;transition:transform .2s;margin-right:6px;">▼</span>
            <strong style="font-family:var(--font-display);">${topic.title}</strong>
            <span class="dsa-topic-header__progress" style="margin-left:8px;font-size:11px;font-weight:500;color:var(--text-secondary);font-family:var(--font-mono);">[${topicSolved}/${topic.problems.length} · ${topicPct}%]</span>
            <span class="dsa-topic-bar" style="display:inline-block;width:80px;height:6px;border-radius:4px;background:var(--border);margin-left:10px;vertical-align:middle;overflow:hidden;">
              <span style="display:block;height:100%;width:${topicPct}%;background:var(--accent);"></span>
            </span>
          </td>
        </tr>
        ${rows}
      </tbody>`;
  }).join('');

  const total = manifest.topics.reduce((a, t) => a + t.problems.length, 0);
  const totalSolved = manifest.topics.reduce((a, t) => a + t.problems.filter(p => getStatus(p.id) === 'completed').length, 0);
  const pct = total ? Math.round(totalSolved / total * 100) : 0;

  app.innerHTML = `
    <div class="page page--dsa">
      <div class="dsa-shell">
        <!-- SIDEBAR -->
        <aside class="dsa-sidebar">
          <div class="dsa-sidebar__head">
            <h1 class="dsa-sidebar__title">DSA Sheet</h1>
            <p class="dsa-sidebar__sub">Striver A2Z · ${total} problems</p>
          </div>

          <div class="dsa-overall">
            <div class="dsa-overall__bar"><span style="width:${pct}%"></span></div>
            <div class="dsa-overall__meta"><strong>${totalSolved}</strong>/${total} solved · ${pct}%</div>
          </div>

          <div class="dsa-filters">
            <input type="text" id="dsa-search" class="input-field" placeholder="Search problem / pattern / company…">
            <select id="dsa-diff-filter" class="input-field">
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select id="dsa-status-filter" class="input-field">
              <option value="all">All Status</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select id="dsa-company-filter" class="input-field">
              <option value="all">All Companies</option>
              ${COMPANIES.map(c => `<option value="${c.toLowerCase()}">${c}</option>`).join('')}
            </select>
            <select id="dsa-tcs-filter" class="input-field">
              <option value="all">All Exams</option>
              <option value="tcs">TCS NQT / Prime / Digital</option>
            </select>
          </div>

          <nav class="dsa-topic-nav" id="dsa-topic-nav">
            ${manifest.topics.map(t => {
              const ts = t.problems.filter(p => getStatus(p.id) === 'completed').length;
              return `<button class="dsa-topic-nav__item" data-topic="${t.id}">
                <span>${t.title}</span>
                <span class="dsa-topic-nav__count">${ts}/${t.problems.length}</span>
              </button>`;
            }).join('')}
          </nav>
        </aside>

        <!-- MAIN -->
        <main class="dsa-main">
          <div class="card" style="padding:0;overflow:hidden;">
            <div class="dsa-toolbar">
              <span style="font-size:var(--text-sm);color:var(--text-muted);">Click a problem name to open the Solve Space →</span>
              <button class="btn btn--ghost btn--sm" id="dsa-expand-all" style="font-weight:700;margin-left:auto;">Collapse All</button>
            </div>
            <div style="overflow-x:auto;">
              <table class="dsa-table">
                <thead>
                  <tr>
                    <th style="width:40px">Status</th>
                    <th>Problem</th>
                    <th style="width:90px">Difficulty</th>
                    <th style="width:90px">Importance</th>
                    <th style="width:90px">TCS NQT</th>
                    <th style="width:140px">Resources</th>
                    <th>Pattern / Hint</th>
                  </tr>
                </thead>
                ${topicSections}
              </table>
            </div>
          </div>
        </main>
      </div>

      <!-- SOLVE SPACE DRAWER -->
      <div class="dsa-drawer" id="dsa-drawer" aria-hidden="true">
        <div class="dsa-drawer__backdrop" id="dsa-drawer-backdrop"></div>
        <aside class="dsa-drawer__panel" id="dsa-drawer-panel">
          <div class="dsa-drawer__header">
            <div>
              <div class="dsa-drawer__title" id="dsa-drawer-title">Problem</div>
              <div class="dsa-drawer__meta" id="dsa-drawer-meta"></div>
            </div>
            <button class="btn btn--ghost btn--icon" id="dsa-drawer-close" aria-label="Close">✕</button>
          </div>
          <div class="dsa-drawer__body" id="dsa-drawer-body"></div>
        </aside>
      </div>
    </div>
  `;

  // ── Status toggle ──
  function cycleStatus(id) {
    const cur = getStatus(id);
    const next = DSA_STATUS_CYCLE[cur];
    store.setDSA(id, next);
    const btn = app.querySelector(`.status-btn[data-id="${id}"]`);
    if (btn) { btn.className = `status-btn status-btn--${next}`; btn.title = DSA_STATUS_LABEL[next]; btn.textContent = DSA_STATUS[next]; }
    const row = app.querySelector(`.dsa-row[data-id="${id}"]`);
    if (row) row.className = `dsa-row dsa-row--${next}`;
    refreshTotals();
  }
  app.querySelectorAll('.status-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); cycleStatus(btn.dataset.id); }));

  // ── Open problem drawer ──
  app.querySelectorAll('.dsa-open-btn').forEach(btn => btn.addEventListener('click', () => openProblem(btn.dataset.id)));

  function openProblem(id) {
    let problem = null, topic = null;
    for (const t of manifest.topics) { const p = t.problems.find(x => x.id === id); if (p) { problem = p; topic = t; break; } }
    if (!problem) return;
    const savedCode = dsaCode[id];
    const lang = (store.get().dsaLang === 'python') ? 'python' : 'javascript';
    const code = savedCode && savedCode[lang] ? savedCode[lang] : starter(lang, problem);

    const drawer = app.querySelector('#dsa-drawer');
    const title = app.querySelector('#dsa-drawer-title');
    const meta = app.querySelector('#dsa-drawer-meta');
    const body = app.querySelector('#dsa-drawer-body');

    title.textContent = problem.name;
    meta.innerHTML = `
      <span class="badge badge--diff-${problem.difficulty}">${problem.difficulty}</span>
      <span class="badge badge--imp">${problem.importance || 'Medium'}</span>
      ${problem.tcsNqt ? `<span class="badge badge--tcs-nqt" style="font-size:10px;">TCS NQT</span>` : ''}
      <span style="color:var(--text-muted);font-size:11px;">${problem.pattern || ''}</span>`;

    body.innerHTML = `
      <div class="dsa-problem">
        <div class="dsa-problem__desc">
          <strong>${problem.name}</strong> — ${problem.pattern || 'pattern'} problem.
          ${(problem.companies || []).length ? `Asked by <em>${(problem.companies || []).join(', ')}</em>.` : ''}
          Try to solve it, then compare with the optimal article. Use the editor below to run code (JavaScript runs in-browser; Python opens in the Playground).
        </div>
        <div class="dsa-problem__res" style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0;">
          ${problem.link ? `<a href="${problem.link}" target="_blank" rel="noopener" class="dsa-res-link">LeetCode ↗</a>` : ''}
          ${problem.youtube ? `<a href="${problem.youtube}" target="_blank" rel="noopener" class="dsa-res-link">Video</a>` : ''}
          ${problem.article ? `<a href="${problem.article}" target="_blank" rel="noopener" class="dsa-res-link">Article</a>` : ''}
        </div>
      </div>

      <div class="dsa-editor">
        <div class="dsa-editor__bar">
          <div class="dsa-lang-toggle">
            <button class="dsa-lang-btn ${lang === 'javascript' ? 'active' : ''}" data-lang="javascript">JS</button>
            <button class="dsa-lang-btn ${lang === 'python' ? 'active' : ''}" data-lang="python">Python</button>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn--ghost btn--sm" id="dsa-reset-code">Reset</button>
            <a class="btn btn--ghost btn--sm" id="dsa-open-playground" href="#/playground" target="_blank" rel="noopener">Open in Playground</a>
            <button class="btn btn--primary btn--sm" id="dsa-run-code">▶ Run</button>
          </div>
        </div>
        <textarea id="dsa-code" class="console-output" spellcheck="false" style="min-height:260px;width:100%;border-radius:0;border:none;resize:vertical;outline:none;font-size:13px;">${code}</textarea>
        <pre id="dsa-output" class="console-output" style="min-height:90px;">// Output appears here after Run.</pre>
      </div>

      <div class="dsa-notes">
        <label class="form-label">Notes</label>
        <input type="text" class="notes-input" id="dsa-note" data-note-id="${problem.id}" placeholder="Add your notes…" value="${dsaNotes[problem.id] || ''}">
      </div>
    `;

    // language switch
    body.querySelectorAll('.dsa-lang-btn').forEach(b => b.addEventListener('click', () => {
      const newLang = b.dataset.lang;
      // save current
      saveCode(problem.id, lang, body.querySelector('#dsa-code').value);
      store.set({ dsaLang: newLang });
      openProblem(id); // re-render with new lang
    }));

    body.querySelector('#dsa-run-code').addEventListener('click', () => runCode(problem.id, lang, body));
    body.querySelector('#dsa-reset-code').addEventListener('click', () => {
      const ta = body.querySelector('#dsa-code');
      ta.value = starter(lang, problem);
      saveCode(problem.id, lang, ta.value);
    });
    body.querySelector('#dsa-note').addEventListener('change', (e) => {
      store.setDSANotes({ [problem.id]: e.target.value });
    });

    drawer.classList.add('dsa-drawer--open');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function saveCode(id, lang, code) {
    const cur = store.get().dsaCode || {};
    const entry = cur[id] || {};
    entry[lang] = code;
    store.setDSACode({ [id]: entry });
  }

  function runCode(id, lang, body) {
    const ta = body.querySelector('#dsa-code');
    const out = body.querySelector('#dsa-output');
    const code = ta.value;
    saveCode(id, lang, code);
    if (lang === 'python') {
      out.textContent = 'Python runs in the Playground (Pyodide). Click "Open in Playground" to execute, or switch to JS to run here.';
      return;
    }
    // JS runner: capture console.log
    const logs = [];
    const sandboxConsole = { log: (...a) => logs.push(a.map(fmt).join(' ')), error: (...a) => logs.push('Error: ' + a.map(fmt).join(' ')) };
    try {
      const fn = new Function('console', code);
      fn(sandboxConsole);
      out.textContent = logs.length ? logs.join('\n') : '(no output)';
    } catch (err) {
      out.textContent = 'Error: ' + (err && err.message ? err.message : String(err));
    }
  }

  function fmt(v) {
    if (typeof v === 'object') { try { return JSON.stringify(v); } catch { return String(v); } }
    return String(v);
  }

  app.querySelector('#dsa-drawer-close').addEventListener('click', closeDrawer);
  app.querySelector('#dsa-drawer-backdrop').addEventListener('click', closeDrawer);
  function closeDrawer() {
    const drawer = app.querySelector('#dsa-drawer');
    drawer.classList.remove('dsa-drawer--open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  // ── Filters ──
  function applyFilters() {
    const search = (app.querySelector('#dsa-search').value || '').toLowerCase();
    const diff = app.querySelector('#dsa-diff-filter').value;
    const status = app.querySelector('#dsa-status-filter').value;
    const company = app.querySelector('#dsa-company-filter').value;
    const tcs = app.querySelector('#dsa-tcs-filter').value;

    app.querySelectorAll('.dsa-row').forEach(row => {
      const name = row.querySelector('.dsa-cell--name')?.textContent?.toLowerCase() || '';
      const pattern = (row.dataset.tcs ? '' : '') ; // pattern not in dataset; use name+company
      const rowDiff = row.dataset.difficulty || '';
      const rowStatus = row.dataset.status || 'todo';
      const rowCompany = (row.dataset.company || '');
      const rowTcs = row.dataset.tcs === 'true';

      const matchSearch = !search || name.includes(search) || rowCompany.includes(search);
      const matchDiff = diff === 'all' || rowDiff === diff;
      const matchStatus = status === 'all' || rowStatus === status;
      const matchCompany = company === 'all' || rowCompany.includes(company);
      const matchTcs = tcs === 'all' || (tcs === 'tcs' && rowTcs);

      row.style.display = (matchSearch && matchDiff && matchStatus && matchCompany && matchTcs) ? '' : 'none';
    });

    app.querySelectorAll('.dsa-topic-group').forEach(group => {
      const visible = group.querySelectorAll('.dsa-row:not([style*="display: none"])').length;
      group.style.display = visible > 0 ? '' : 'none';
    });
  }
  app.querySelector('#dsa-search').addEventListener('input', applyFilters);
  app.querySelector('#dsa-diff-filter').addEventListener('change', applyFilters);
  app.querySelector('#dsa-status-filter').addEventListener('change', applyFilters);
  app.querySelector('#dsa-company-filter').addEventListener('change', applyFilters);
  app.querySelector('#dsa-tcs-filter').addEventListener('change', applyFilters);

  // ── Topic nav scroll + collapse ──
  app.querySelectorAll('.dsa-topic-nav__item').forEach(btn => btn.addEventListener('click', () => {
    const group = app.querySelector(`.dsa-topic-group[data-topic="${btn.dataset.topic}"]`);
    if (group) { group.scrollIntoView({ behavior: 'smooth', block: 'start' }); group.classList.remove('dsa-topic-group--collapsed'); }
  }));

  app.querySelectorAll('.dsa-topic-header').forEach(header => header.addEventListener('click', () => {
    const group = header.closest('.dsa-topic-group');
    group.classList.toggle('dsa-topic-group--collapsed');
    const arrow = header.querySelector('.dsa-topic-header__arrow');
    if (group.classList.contains('dsa-topic-group--collapsed')) arrow.textContent = '▶'; else arrow.textContent = '▼';
  }));

  const expandBtn = app.querySelector('#dsa-expand-all');
  let allExpanded = true;
  expandBtn.addEventListener('click', () => {
    allExpanded = !allExpanded;
    app.querySelectorAll('.dsa-topic-group').forEach(group => {
      const arrow = group.querySelector('.dsa-topic-header__arrow');
      if (allExpanded) { group.classList.remove('dsa-topic-group--collapsed'); if (arrow) arrow.textContent = '▼'; }
      else { group.classList.add('dsa-topic-group--collapsed'); if (arrow) arrow.textContent = '▶'; }
    });
    expandBtn.textContent = allExpanded ? 'Collapse All' : 'Expand All';
  });

  function refreshTotals() {
    const st = store.get().dsa || {};
    let solved = 0;
    manifest.topics.forEach(t => t.problems.forEach(p => { if (st[p.id] === 'completed') solved++; }));
    const p = total ? Math.round(solved / total * 100) : 0;
    app.querySelector('.dsa-overall__bar span').style.width = p + '%';
    app.querySelector('.dsa-overall__meta').innerHTML = `<strong>${solved}</strong>/${total} solved · ${p}%`;
    // update topic nav counts
    manifest.topics.forEach(t => {
      const ts = t.problems.filter(pp => st[pp.id] === 'completed').length;
      const el = app.querySelector(`.dsa-topic-nav__item[data-topic="${t.id}"] .dsa-topic-nav__count`);
      if (el) el.textContent = `${ts}/${t.problems.length}`;
    });
  }
}
