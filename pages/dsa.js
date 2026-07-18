/**
 * pages/dsa.js — DSA Tracker Page
 * Collapsible Striver-style SDE sheet with video & article resources,
 * live progress headers, and dynamic filters.
 */
import { store } from '../state/store.js';

const statusIcon = { todo: '○', in_progress: '◑', completed: '●' };
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
  } catch (e) {
    app.innerHTML = `<div class="empty-state"><h2>DSA data not found</h2></div>`;
    return;
  }

  const s = store.get();
  const dsaState = s.dsa || {};
  const dsaNotes = s.dsaNotes || {};

  function getStatus(id) { return dsaState[id] || 'todo'; }

  function updateStats() {
    const rows = document.querySelectorAll('.dsa-row');
    const solved = document.querySelectorAll('.dsa-row--completed').length;
    const total = rows.length;
    const pct = total ? Math.round(solved / total * 100) : 0;
    const solvedEl = document.querySelector('#dsa-solved-count');
    const totalEl = document.querySelector('#dsa-total-count');
    const pctEl = document.querySelector('#dsa-pct-count');
    if (solvedEl) solvedEl.textContent = solved;
    if (totalEl) totalEl.textContent = total;
    if (pctEl) pctEl.textContent = `${pct}%`;
  }

  function updateTopicProgress(group) {
    const rows = group.querySelectorAll('.dsa-row');
    const solved = group.querySelectorAll('.dsa-row--completed').length;
    const total = rows.length;
    const pct = total ? Math.round(solved / total * 100) : 0;
    const progressEl = group.querySelector('.dsa-topic-header__progress');
    if (progressEl) {
      progressEl.textContent = `[${solved}/${total} Solved · ${pct}%]`;
    }
  }

  function cycleStatus(id) {
    const current = getStatus(id);
    const next = statusCycle[current];
    store.setDSA(id, next);

    const btn = document.querySelector(`.status-btn[data-id="${id}"]`);
    if (!btn) return;
    const row = btn.closest('.dsa-row');
    if (!row) return;

    btn.className = `status-btn status-btn--${next}`;
    btn.title = statusLabel[next];
    btn.textContent = statusIcon[next];
    row.className = `dsa-row dsa-row--${next}`;
    row.dataset.status = next;
    
    const group = row.closest('.dsa-topic-group');
    if (group) updateTopicProgress(group);
    
    updateStats();
  }

  function applyFilters() {
    const search = (document.getElementById('dsa-search')?.value || '').toLowerCase();
    const diff = document.getElementById('dsa-diff-filter')?.value || 'all';
    const status = document.getElementById('dsa-status-filter')?.value || 'all';
    const tcs = document.getElementById('dsa-tcs-filter')?.value || 'all';

    document.querySelectorAll('.dsa-row').forEach(row => {
      const name = row.querySelector('.dsa-cell--name')?.textContent?.toLowerCase() || '';
      const rowDiff = row.dataset.difficulty || '';
      const rowStatus = row.dataset.status || 'todo';
      const rowTcs = row.dataset.tcs || 'false';

      const matchSearch = !search || name.includes(search);
      const matchDiff = diff === 'all' || rowDiff === diff;
      const matchStatus = status === 'all' || rowStatus === status;
      const matchTcs = tcs === 'all' || (tcs === 'tcs' && rowTcs === 'true');

      row.style.display = (matchSearch && matchDiff && matchStatus && matchTcs) ? '' : 'none';
    });

    // Hide empty topic groups
    document.querySelectorAll('.dsa-topic-group').forEach(group => {
      const visibleRows = group.querySelectorAll('.dsa-row:not([style*="display: none"])');
      group.style.display = visibleRows.length > 0 ? '' : 'none';
    });
  }

  let totalSolved = 0, total = 0;
  const topicSections = manifest.topics.map(topic => {
    let topicSolved = 0;
    const rows = topic.problems.map(p => {
      total++;
      const st = getStatus(p.id);
      if (st === 'completed') {
        totalSolved++;
        topicSolved++;
      }
      const companies = p.companies || [];
      const companyTags = companies.slice(0, 3).map(c =>
        `<span class="company-tag company-tag--${c.toLowerCase().replace(/\s+/g, '')}">${c}</span>`
      ).join(' ');
      const noteVal = dsaNotes[p.id] || '';

      const resHTML = `
        <div class="dsa-res-links">
          ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="dsa-res-link" title="Solve on LeetCode">Solve</a>` : ''}
          ${p.youtube ? `<a href="${p.youtube}" target="_blank" rel="noopener" class="dsa-res-link" title="Watch Striver's Video">Video</a>` : ''}
          ${p.article ? `<a href="${p.article}" target="_blank" rel="noopener" class="dsa-res-link" title="Optimal Solution Article">Article</a>` : ''}
        </div>
      `;

      return `
        <tr class="dsa-row dsa-row--${st}" data-difficulty="${p.difficulty}" data-status="${st}" data-tcs="${p.tcsNqt ? 'true' : 'false'}">
          <td class="dsa-cell">
            <button class="status-btn status-btn--${st}" data-id="${p.id}" title="${statusLabel[st]}">
              ${statusIcon[st]}
            </button>
          </td>
          <td class="dsa-cell dsa-cell--name">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="font-weight:600;">${p.name}</span>
              <div style="display:inline-flex;gap:4px;">${companyTags}</div>
            </div>
          </td>
          <td class="dsa-cell"><span class="badge badge--diff-${p.difficulty}">${p.difficulty}</span></td>
          <td class="dsa-cell"><span class="badge badge--imp">${p.importance || 'Medium'}</span></td>
          <td class="dsa-cell">${p.tcsNqt ? `<span class="badge badge--tcs-nqt" style="font-size:10px;">TCS NQT</span>` : `<span class="badge badge--tcs-none">—</span>`}</td>
          <td class="dsa-cell">${resHTML}</td>
          <td class="dsa-cell dsa-cell--hint">${p.pattern || '—'}</td>
          <td class="dsa-cell">
            <input type="text" class="notes-input" data-note-id="${p.id}" placeholder="Add note…" value="${noteVal}">
          </td>
        </tr>`;
    }).join('');

    const topicPct = topic.problems.length ? Math.round(topicSolved / topic.problems.length * 100) : 0;

    return `
      <tbody class="dsa-topic-group">
        <tr class="dsa-topic-header" style="cursor: pointer;">
          <td colspan="8" class="dsa-topic-header__cell">
            <span class="dsa-topic-header__arrow" style="margin-right: 6px; display:inline-block; transition:transform 0.2s;">▼</span>
            <strong style="font-family:var(--font-display);">${topic.icon || '•'} ${topic.title}</strong>
            <span class="dsa-topic-header__progress" style="margin-left: 10px; font-size: 11px; font-weight: 500; color: var(--text-secondary); font-family: var(--font-mono);">
              [${topicSolved}/${topic.problems.length} Solved · ${topicPct}%]
            </span>
          </td>
        </tr>
        ${rows}
      </tbody>`;
  }).join('');

  const pct = total ? Math.round(totalSolved / total * 100) : 0;

  app.innerHTML = `
    <div class="page page--dsa">
      <div class="dsa-header" style="margin-bottom: var(--space-6);">
        <div>
          <h1 class="page-title" style="margin-bottom:4px; font-family:var(--font-display);">DSA Tracker</h1>
          <p style="color:var(--text-muted);font-size:var(--text-sm)">Striver's A2Z SDE Sheet — Master coding patterns & solutions</p>
        </div>
        <div class="dsa-stats">
          <div class="dsa-stat">
            <span class="dsa-stat__val" id="dsa-solved-count" style="color:var(--accent-green)">${totalSolved}</span>
            <span class="dsa-stat__label">Solved</span>
          </div>
          <div class="dsa-stat">
            <span class="dsa-stat__val" id="dsa-total-count" style="color:var(--text-secondary)">${total}</span>
            <span class="dsa-stat__label">Total</span>
          </div>
          <div class="dsa-stat">
            <span class="dsa-stat__val" id="dsa-pct-count" style="color:var(--accent-indigo)">${pct}%</span>
            <span class="dsa-stat__label">Progress</span>
          </div>
        </div>
      </div>

      <div class="card" style="padding:0;overflow:hidden">
        <div class="dsa-toolbar" style="padding: var(--space-4); display:flex; gap:12px; align-items:center; flex-wrap:wrap; border-bottom: 1px solid var(--border-color); background: var(--bg-secondary);">
          <input type="text" id="dsa-search" class="input-field" placeholder="Search problems…" style="max-width:280px">
          <select id="dsa-diff-filter" class="input-field" style="margin:0;width:auto">
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select id="dsa-status-filter" class="input-field" style="margin:0;width:auto">
            <option value="all">All Status</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select id="dsa-tcs-filter" class="input-field" style="margin:0;width:auto">
            <option value="all">All Exams</option>
            <option value="tcs">TCS NQT / Prime / Digital</option>
          </select>
          <button class="btn btn--ghost btn--sm" id="dsa-expand-all" style="font-weight:700;">Collapse All</button>
        </div>
        <div style="overflow-x:auto">
          <table class="dsa-table">
            <thead>
              <tr>
                <th style="width:40px">Status</th>
                <th>Problem</th>
                <th style="width:90px">Difficulty</th>
                <th style="width:90px">Importance</th>
                <th style="width:115px">TCS NQT</th>
                <th style="width:90px">Resources</th>
                <th>Pattern / Hint</th>
                <th style="width:160px">Notes</th>
              </tr>
            </thead>
            ${topicSections}
          </table>
        </div>
      </div>
    </div>
  `;

  // ── Event listeners ──
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      cycleStatus(btn.dataset.id);
    });
  });

  document.getElementById('dsa-search')?.addEventListener('input', applyFilters);
  document.getElementById('dsa-diff-filter')?.addEventListener('change', applyFilters);
  document.getElementById('dsa-status-filter')?.addEventListener('change', applyFilters);
  document.getElementById('dsa-tcs-filter')?.addEventListener('change', applyFilters);

  // Expand / Collapse Accordions
  document.querySelectorAll('.dsa-topic-header').forEach(header => {
    header.addEventListener('click', () => {
      const group = header.closest('.dsa-topic-group');
      group.classList.toggle('dsa-topic-group--collapsed');
      
      const arrow = header.querySelector('.dsa-topic-header__arrow');
      if (group.classList.contains('dsa-topic-group--collapsed')) {
        arrow.textContent = '▶';
      } else {
        arrow.textContent = '▼';
      }
    });
  });

  // Expand All / Collapse All Button
  const expandBtn = document.getElementById('dsa-expand-all');
  if (expandBtn) {
    let allExpanded = true;
    expandBtn.addEventListener('click', () => {
      allExpanded = !allExpanded;
      document.querySelectorAll('.dsa-topic-group').forEach(group => {
        const arrow = group.querySelector('.dsa-topic-header__arrow');
        if (allExpanded) {
          group.classList.remove('dsa-topic-group--collapsed');
          if (arrow) arrow.textContent = '▼';
        } else {
          group.classList.add('dsa-topic-group--collapsed');
          if (arrow) arrow.textContent = '▶';
        }
      });
      expandBtn.textContent = allExpanded ? 'Collapse All' : 'Expand All';
    });
  }

  // Notes saving
  document.querySelectorAll('.notes-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = e.target.dataset.noteId;
      const notes = { ...dsaNotes };
      notes[id] = e.target.value;
      store.setDSANotes(notes);
    });
  });
}
