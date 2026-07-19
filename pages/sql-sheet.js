/**
 * pages/sql-sheet.js — SQL LeetCode-Style Sheet Page
 * Striver-style SQL problem list with company tags, difficulty filters,
 * TCS-NQT flags, a curated "Top 50" subset, progress tracking + notes.
 * Status uses CSS dot/check indicators (shared with DSA in trackers.css).
 */
import { store } from '../state/store.js';
import { SQL_PROBLEMS, SQL_TOPICS, SQL_TOP_50, SQL_TCS_NQT } from '../data/sql-sheet.js';

const TOP_50 = new Set(SQL_TOP_50);
const TCS = new Set(SQL_TCS_NQT);

const statusLabel = { todo: 'Todo', in_progress: 'In Progress', completed: 'Done' };
const statusCycle = { todo: 'in_progress', in_progress: 'completed', completed: 'todo' };

export function renderSQLSheet() {
  const s = store.get();
  const sqlState = s.sql || {};
  const sqlNotes = s.sqlNotes || {};

  const getStatus = (id) => sqlState[id] || 'todo';

  function updateStats() {
    const rows = document.querySelectorAll('.sql-row');
    const solved = document.querySelectorAll('.sql-row--completed').length;
    const total = rows.length;
    const pct = total ? Math.round(solved / total * 100) : 0;
    const solvedEl = document.querySelector('#sql-solved-count');
    const totalEl = document.querySelector('#sql-total-count');
    const pctEl = document.querySelector('#sql-pct-count');
    if (solvedEl) solvedEl.textContent = solved;
    if (totalEl) totalEl.textContent = total;
    if (pctEl) pctEl.textContent = `${pct}%`;
  }

  function cycleStatus(id) {
    const current = getStatus(id);
    const next = statusCycle[current];
    store.setSQL(id, next);

    const btn = document.querySelector(`.sql-status-btn[data-id="${id}"]`);
    if (!btn) return;
    const row = btn.closest('.sql-row');
    if (!row) return;

    btn.className = `sql-status-btn sql-status-btn--${next}`;
    btn.title = statusLabel[next];
    row.className = `sql-row sql-row--${next}`;
    updateStats();
  }

  function applyFilters() {
    const search = (document.getElementById('sql-search')?.value || '').toLowerCase();
    const diff = document.getElementById('sql-diff-filter')?.value || 'all';
    const status = document.getElementById('sql-status-filter')?.value || 'all';
    const scope = document.getElementById('sql-scope-filter')?.value || 'all';

    document.querySelectorAll('.sql-row').forEach(row => {
      const name = row.querySelector('.sql-cell--name')?.textContent?.toLowerCase() || '';
      const rowDiff = row.dataset.difficulty || '';
      const rowStatus = row.dataset.status || 'todo';
      const rowPattern = (row.dataset.pattern || '').toLowerCase();
      const rowId = row.dataset.id || '';

      const matchSearch = !search || name.includes(search) || rowPattern.includes(search);
      const matchDiff = diff === 'all' || rowDiff === diff;
      const matchStatus = status === 'all' || rowStatus === status;
      const matchScope = scope === 'all'
        || (scope === 'top50' && TOP_50.has(rowId))
        || (scope === 'tcs' && TCS.has(rowId));

      row.style.display = (matchSearch && matchDiff && matchStatus && matchScope) ? '' : 'none';
    });

    document.querySelectorAll('.sql-topic-group').forEach(group => {
      const visibleRows = group.querySelectorAll('.sql-row:not([style*="display: none"])');
      group.style.display = visibleRows.length > 0 ? '' : 'none';
    });
  }

  // Classify a problem into a topic by its pattern keywords.
  // Falls back to "Misc" so no problem is ever dropped (unlike the
  // old keyword filter that silently discarded unmatched rows).
  function topicOf(p) {
    const pat = (p.pattern || '').toLowerCase();
    if (['where', 'order by', 'limit', 'distinct', 'like', 'in ', 'between', 'is null', 'subquery / limit', 'subquery / in', 'regexp', 'length', 'mod'].some(k => pat.includes(k))) return 'basic';
    if (['join', 'self join', 'cross join'].some(k => pat.includes(k))) return 'join';
    if (['group by', 'having', 'count', 'sum', 'avg', 'max', 'min'].some(k => pat.includes(k)) && !pat.includes('window')) return 'aggregation';
    if (['subquery', 'exists', ' with', 'recursive'].some(k => pat.includes(k))) return 'subquery';
    if (['window', 'rank', 'dense_rank', 'row_number', 'lag', 'lead', 'running total', 'cumulative'].some(k => pat.includes(k))) return 'window';
    if (['case', 'pivot', 'union', 'dynamic', 'date_format', 'concat', 'ceil', 'coalesce', 'percent_rank'].some(k => pat.includes(k))) return 'advanced';
    return 'misc';
  }

  const topicOrder = ['basic', 'join', 'aggregation', 'subquery', 'window', 'advanced', 'misc'];
  const topicTitle = Object.fromEntries(SQL_TOPICS.map(t => [t.id, t.title]));
  topicTitle.misc = 'Misc / Other';

  const topicGroups = topicOrder.map(tid => {
    const problems = SQL_PROBLEMS.filter(p => topicOf(p) === tid);
    if (problems.length === 0) return '';

    let groupSolved = 0;
    const rows = problems.map(p => {
      const st = getStatus(p.id);
      if (st === 'completed') groupSolved++;
      const companies = p.companies || [];
      const companyTags = companies.slice(0, 2).map(c =>
        `<span class="company-tag company-tag--${c.toLowerCase().replace(/\s+/g, '')}">${c}</span>`
      ).join(' ');
      const noteVal = sqlNotes[p.id] || '';
      const mustDo = TOP_50.has(p.id);
      const tcs = TCS.has(p.id);

      return `
        <tr class="sql-row sql-row--${st}" data-id="${p.id}" data-difficulty="${p.difficulty}" data-status="${st}" data-pattern="${p.pattern || ''}">
          <td class="sql-cell">
            <button class="sql-status-btn sql-status-btn--${st}" data-id="${p.id}" title="${statusLabel[st]}"></button>
          </td>
          <td class="sql-cell sql-cell--name">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
              ${p.name}
              ${companyTags}
            </div>
          </td>
          <td class="sql-cell"><span class="badge badge--diff-${p.difficulty}">${p.difficulty}</span></td>
          <td class="sql-cell">${mustDo ? `<span class="badge badge--imp" style="font-size:10px;">Must Do</span>` : `<span class="badge badge--tcs-none">—</span>`}</td>
          <td class="sql-cell">${tcs ? `<span class="badge badge--tcs-nqt" style="font-size:10px;">TCS NQT</span>` : `<span class="badge badge--tcs-none">—</span>`}</td>
          <td class="sql-cell sql-cell--pattern">${p.pattern || '—'}</td>
          <td class="sql-cell">${p.link ? `<a href="${p.link}" target="_blank" class="sql-link">Solve ↗</a>` : '—'}</td>
          <td class="sql-cell">
            <input type="text" class="notes-input" data-note-id="${p.id}" placeholder="Note…" value="${noteVal}">
          </td>
        </tr>`;
    }).join('');

    return `
      <tbody class="sql-topic-group">
        <tr class="sql-topic-header">
          <td colspan="8" class="sql-topic-header__cell">${topicTitle[tid]} <span style="color:var(--text-muted);font-weight:400">(${groupSolved}/${problems.length})</span></td>
        </tr>
        ${rows}
      </tbody>`;
  }).join('');

  const total = SQL_PROBLEMS.length;
  const totalSolved = SQL_PROBLEMS.filter(p => getStatus(p.id) === 'completed').length;
  const pct = total ? Math.round(totalSolved / total * 100) : 0;

  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="page page--sql-sheet">
      <div class="sql-sheet-header">
        <div>
          <h1 class="page-title" style="margin-bottom:4px">SQL Sheet</h1>
          <p style="color:var(--text-muted);font-size:var(--text-sm)">LeetCode-style SQL — ${total} problems · Top ${SQL_TOP_50.length} curated · ${SQL_TCS_NQT.length} TCS-NQT tagged</p>
        </div>
        <div class="sql-sheet-stats">
          <div class="sql-sheet-stat">
            <span class="sql-sheet-stat__val" id="sql-solved-count" style="color:var(--accent-green)">${totalSolved}</span>
            <span class="sql-sheet-stat__label">Solved</span>
          </div>
          <div class="sql-sheet-stat">
            <span class="sql-sheet-stat__val" id="sql-total-count" style="color:var(--text-secondary)">${total}</span>
            <span class="sql-sheet-stat__label">Total</span>
          </div>
          <div class="sql-sheet-stat">
            <span class="sql-sheet-stat__val" id="sql-pct-count" style="color:var(--accent)">${pct}%</span>
            <span class="sql-sheet-stat__label">Progress</span>
          </div>
        </div>
      </div>

      <div class="card" style="padding:0;overflow:hidden">
        <div class="sql-sheet-toolbar">
          <input type="text" id="sql-search" class="input-field" placeholder="Search problems or patterns…" style="margin:0;flex:1;max-width:320px">
          <select id="sql-scope-filter" class="input-field" style="margin:0;width:auto">
            <option value="all">All Problems</option>
            <option value="top50">Top ${SQL_TOP_50.length} (Must Do)</option>
            <option value="tcs">TCS NQT / Prime / Digital</option>
          </select>
          <select id="sql-diff-filter" class="input-field" style="margin:0;width:auto">
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select id="sql-status-filter" class="input-field" style="margin:0;width:auto">
            <option value="all">All Status</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div style="overflow-x:auto;max-height:calc(100vh - 230px);overflow-y:auto">
          <table class="sql-table">
            <thead>
              <tr>
                <th style="width:40px">Status</th>
                <th>Problem</th>
                <th style="width:90px">Difficulty</th>
                <th style="width:90px">Must Do</th>
                <th style="width:90px">TCS NQT</th>
                <th>Pattern</th>
                <th style="width:70px">Link</th>
                <th style="width:120px">Notes</th>
              </tr>
            </thead>
            ${topicGroups}
          </table>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  document.querySelectorAll('.sql-status-btn').forEach(btn => {
    btn.addEventListener('click', () => cycleStatus(btn.dataset.id));
  });

  document.getElementById('sql-search')?.addEventListener('input', applyFilters);
  document.getElementById('sql-scope-filter')?.addEventListener('change', applyFilters);
  document.getElementById('sql-diff-filter')?.addEventListener('change', applyFilters);
  document.getElementById('sql-status-filter')?.addEventListener('change', applyFilters);

  document.querySelectorAll('.notes-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = e.target.dataset.noteId;
      const notes = { ...(s.sqlNotes || {}) };
      notes[id] = e.target.value;
      store.setSQLNotes(notes);
    });
  });
}
