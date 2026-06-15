/**
 * pages/dsa.js — DSA Tracker Page
 * Full-page tracker with topic chapters, difficulty grouping, filters.
 */
import { store } from '../state/store.js';

const statusIcon = { todo: '○', in_progress: '◑', completed: '✅' };
const statusLabel = { todo: 'Todo', in_progress: 'In Progress', completed: 'Done' };
const statusCycle = { todo: 'in_progress', in_progress: 'completed', completed: 'todo' };

export async function renderDSA() {
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="page-loading">
      <div class="page-loading__spinner"></div>
      <div class="page-loading__text">Loading DSA tracker…</div>
    </div>`;

  let manifest;
  try {
    const mod = await import('../data/dsa/index.js');
    manifest = mod.default;
  } catch(e) {
    app.innerHTML = `<div class="empty-state"><h2>DSA data not found</h2></div>`;
    return;
  }

  const s = store.get();
  const dsaState = s.dsa || {};

  function getStatus(id) { return dsaState[id] || 'todo'; }

  function updateStats() {
    const total = document.querySelectorAll('.dsa-row').length;
    const solved = document.querySelectorAll('.dsa-row--completed').length;
    const pct = total ? Math.round(solved / total * 100) : 0;
    const solvedEl = document.querySelector('#dsa-solved-count');
    const pctEl = document.querySelector('#dsa-pct-count');
    if (solvedEl) solvedEl.textContent = `${solved}/${total}`;
    if (pctEl) pctEl.textContent = `${pct}%`;
  }

  function cycleStatus(id) {
    const current = getStatus(id);
    const next = statusCycle[current];
    store.setDSA(id, next);

    // Update only the affected row — no full re-render
    const btn = document.querySelector(`.status-btn[data-id="${id}"]`);
    if (!btn) return;
    const row = btn.closest('.dsa-row');
    if (!row) return;

    // Update button
    btn.className = `status-btn status-btn--${next}`;
    btn.title = statusLabel[next];
    btn.textContent = statusIcon[next];

    // Update row class
    row.className = `dsa-row dsa-row--${next}`;

    // Update stats
    updateStats();
  }

  let totalSolved = 0, total = 0;
  const topicSections = manifest.topics.map(topic => {
    const rows = topic.problems.map(p => {
      total++;
      const st = getStatus(p.id);
      if (st === 'completed') totalSolved++;
      return `
        <tr class="dsa-row dsa-row--${st}">
          <td class="dsa-cell">
            <button class="status-btn status-btn--${st}" data-id="${p.id}" title="${statusLabel[st]}">
              ${statusIcon[st]}
            </button>
          </td>
          <td class="dsa-cell dsa-cell--name">${p.name}</td>
          <td class="dsa-cell"><span class="badge badge--diff-${p.difficulty}">${p.difficulty}</span></td>
          <td class="dsa-cell"><span class="badge badge--imp">${p.importance || 'Medium'}</span></td>
          <td class="dsa-cell">${p.link ? `<a href="${p.link}" target="_blank" class="dsa-link">LeetCode ↗</a>` : '—'}</td>
          <td class="dsa-cell dsa-cell--hint">${p.pattern || '—'}</td>
        </tr>`;
    }).join('');
    return `
      <tbody>
        <tr class="dsa-topic-header">
          <td colspan="6" class="dsa-topic-header__cell">${topic.icon || '📌'} ${topic.title}</td>
        </tr>
        ${rows}
      </tbody>`;
  }).join('');

  const pct = total ? Math.round(totalSolved / total * 100) : 0;

  app.innerHTML = `
    <div class="page page--dsa">
      <div class="dsa-header">
        <h1 class="page-title">📊 DSA Tracker</h1>
        <div class="dsa-stats">
          <div class="dsa-stat"><span class="dsa-stat__val" id="dsa-solved-count" style="color:var(--accent-cyan)">${totalSolved}/${total}</span><span class="dsa-stat__label">Solved</span></div>
          <div class="dsa-stat"><span class="dsa-stat__val" id="dsa-pct-count" style="color:var(--accent-purple)">${pct}%</span><span class="dsa-stat__label">Progress</span></div>
        </div>
      </div>
      <div class="card" style="padding:0;overflow:hidden">
        <div class="dsa-toolbar">
          <input type="text" id="dsa-search" class="input-field" placeholder="Search problems…" style="margin:0;flex:1;">
          <select id="dsa-diff-filter" class="input-field" style="margin:0;width:auto;">
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select id="dsa-status-filter" class="input-field" style="margin:0;width:auto;">
            <option value="all">All Status</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div style="overflow-x:auto">
          <table class="dsa-table">
            <thead>
              <tr>
                <th>Status</th><th>Problem</th><th>Difficulty</th>
                <th>Importance</th><th>Link</th><th>Pattern / Hint</th>
              </tr>
            </thead>
            ${topicSections}
          </table>
        </div>
      </div>
    </div>
  `;

  // Status cycle click — updates DOM in-place, no re-render
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => cycleStatus(btn.dataset.id));
  });
}
