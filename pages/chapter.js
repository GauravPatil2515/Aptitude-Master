/**
 * pages/chapter.js — Chapter Notes Page (Notebook feel)
 * 3-column layout: outline | markdown notes | formulas panel
 */
import { store } from '../state/store.js';
import { renderMarkdown } from '../components/markdown.js';
import Router from '../router.js';

export async function renderChapter(subjectId, chapterId) {
  // DSA is a problem tracker (no notes/content file) — render its topic view.
  if (subjectId === 'dsa') {
    return renderDsaChapter(chapterId);
  }

  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="page-loading">
      <div class="page-loading__spinner"></div>
      <div class="page-loading__text">Loading chapter…</div>
    </div>`;

  let chapter;
  try {
    const mod = await import(`../data/${subjectId}/${chapterId}.js`);
    chapter = mod.default;
  } catch(e) {
    app.innerHTML = `<div class="empty-state"><h2>Chapter not found</h2><p>${subjectId}/${chapterId}</p></div>`;
    return;
  }

  const headings = (chapter.notes || '').match(/^#{1,3} .+/gm) || [];
  const outline = headings.map((h, i) => {
    const level = h.match(/^#+/)[0].length;
    const text = h.replace(/^#+\s*/, '');
    return `<div class="outline-item outline-item--h${level}" data-idx="${i}">${text}</div>`;
  }).join('');

  const formulaCards = (chapter.formulas || []).map(f => `
    <div class="formula-card">
      <div class="formula-card__name">${f.name}</div>
      <code class="formula-card__expr">${f.formula}</code>
      ${f.example ? `<div class="formula-card__ex">${f.example}</div>` : ''}
    </div>`).join('');

  const shortcuts = (chapter.shortcuts || []).map(s => `
    <div class="shortcut-item">${s}</div>`).join('');

  app.innerHTML = `
    <div class="page page--chapter">
      <div class="chapter-layout">

        <!-- LEFT: Outline -->
        <aside class="chapter-outline">
          <div class="chapter-outline__title">OUTLINE</div>
          ${outline || '<div class="outline-empty">No headings found</div>'}
          <div style="margin-top:auto;padding-top:var(--space-6);">
            <a href="#/practice/${subjectId}/${chapterId}" class="btn btn--primary btn--full">▶ Start Practice</a>
          </div>
        </aside>

        <!-- CENTER: Notes -->
        <article class="chapter-notes">
          <h1 class="chapter-notes__title">${chapter.title}</h1>
          <div class="chapter-notes__meta">
            <span class="badge badge--diff-${chapter.difficulty ?? 'medium'}">${chapter.difficulty ?? 'medium'}</span>
            <span class="badge badge--time">${chapter.estimatedTime ?? '?'} min</span>
          </div>
          <div class="chapter-notes__body markdown-body">
            ${renderMarkdown(chapter.notes || '_No notes yet._')}
          </div>
          <div class="chapter-notes__actions">
            <button class="btn btn--ghost" id="ask-ai-btn">Ask AI to Explain</button>
            <a href="#/practice/${subjectId}/${chapterId}" class="btn btn--primary">▶ Start Practice →</a>
          </div>
        </article>

        <!-- RIGHT: Formulas -->
        <aside class="chapter-formulas">
          <div class="chapter-formulas__title">FORMULAS</div>
          ${formulaCards || '<div class="formula-empty">No formulas yet</div>'}
          ${shortcuts ? `<div class="chapter-formulas__title" style="margin-top:var(--space-6)">SHORTCUTS</div>${shortcuts}` : ''}
        </aside>
      </div>

      <!-- AI Drawer -->
      <div class="ai-drawer" id="ai-drawer">
        <div class="ai-drawer__header">
          <span>Ask AI — ${chapter.title}</span>
          <button class="ai-drawer__close" id="ai-drawer-close">✕</button>
        </div>
        <div class="ai-drawer__messages" id="ai-messages"></div>
        <div class="ai-drawer__input-row">
          <input type="text" id="ai-input" class="input-field" placeholder="Ask anything about this chapter…" style="margin:0;flex:1">
          <button class="btn btn--primary" id="ai-send">Send</button>
        </div>
      </div>
    </div>
  `;

  // Mark as visited in state
  store.setProgress(subjectId, chapterId, 'visited');

  // AI drawer toggle
  document.getElementById('ask-ai-btn')?.addEventListener('click', () => {
    document.getElementById('ai-drawer')?.classList.add('ai-drawer--open');
  });
  document.getElementById('ai-drawer-close')?.addEventListener('click', () => {
    document.getElementById('ai-drawer')?.classList.remove('ai-drawer--open');
  });

  // AI send
  document.getElementById('ai-send')?.addEventListener('click', async () => {
    const input = document.getElementById('ai-input');
    const msg = input?.value?.trim();
    if (!msg) return;
    input.value = '';
    appendAIMessage('user', msg);
    appendAIMessage('bot', '⏳ Thinking…');
    try {
      const { askAI } = await import('../api/ai.js');
      const reply = await askAI(chapter.aiTutorPrompt || `You are a placement prep tutor helping with ${chapter.title}.`, msg);
      document.querySelectorAll('#ai-messages .ai-msg--bot').forEach((el, i, arr) => {
        if (i === arr.length - 1) el.textContent = reply;
      });
    } catch(e) {
      console.error(e);
    }
  });
}

function appendAIMessage(role, text) {
  const box = document.getElementById('ai-messages');
  if (!box) return;
  const div = document.createElement('div');
  div.className = `ai-msg ai-msg--${role}`;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

/* DSA topic chapter — renders a problem-tracker topic from data/dsa/index.js.
   DSA has no notes/content files, so this builds the topic view directly. */
const DSA_STATUS = { todo: '', in_progress: '', completed: '' };
const DSA_STATUS_LABEL = { todo: 'Not started', in_progress: 'In progress', completed: 'Completed' };

async function renderDsaChapter(topicId) {
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="page-loading">
      <div class="page-loading__spinner"></div>
      <div class="page-loading__text">Loading topic…</div>
    </div>`;

  let manifest;
  try {
    manifest = (await import('../data/dsa/index.js')).default;
  } catch (e) {
    app.innerHTML = `<div class="empty-state"><h2>Topic not found</h2><p>dsa/${topicId}</p></div>`;
    return;
  }

  const topic = (manifest.topics || []).find(t => t.id === topicId);
  if (!topic) {
    app.innerHTML = `<div class="empty-state"><h2>Topic not found</h2><p>dsa/${topicId}</p></div>`;
    return;
  }

  const getStatus = (id) => store.get().dsa?.[id] || 'todo';

  const rows = (topic.problems || []).map(p => {
    const st = getStatus(p.id);
    const companies = (p.companies || []).slice(0, 3)
      .map(c => `<span class="company-tag company-tag--${c.toLowerCase().replace(/\s+/g, '')}">${c}</span>`).join(' ');
    const noteVal = store.get().dsaNotes?.[p.id] || '';
    const res = `
      <div class="dsa-res-links">
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="dsa-res-link">Solve</a>` : ''}
        ${p.youtube ? `<a href="${p.youtube}" target="_blank" rel="noopener" class="dsa-res-link">Video</a>` : ''}
        ${p.article ? `<a href="${p.article}" target="_blank" rel="noopener" class="dsa-res-link">Article</a>` : ''}
      </div>`;
    return `
      <tr class="dsa-row dsa-row--${st}" data-id="${p.id}">
        <td class="dsa-cell">
          <button class="status-btn status-btn--${st}" data-id="${p.id}" title="${DSA_STATUS_LABEL[st]}">${DSA_STATUS[st]}</button>
        </td>
        <td class="dsa-cell dsa-cell--name">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span style="font-weight:600;">${p.name}</span>
            <div style="display:inline-flex;gap:4px;">${companies}</div>
          </div>
        </td>
        <td class="dsa-cell"><span class="badge badge--diff-${p.difficulty}">${p.difficulty}</span></td>
        <td class="dsa-cell"><span class="badge badge--imp">${p.importance || 'Medium'}</span></td>
        <td class="dsa-cell">${p.tcsNqt ? `<span class="badge badge--tcs-nqt" style="font-size:10px;">TCS NQT</span>` : `<span class="badge badge--tcs-none">—</span>`}</td>
        <td class="dsa-cell">${res}</td>
        <td class="dsa-cell dsa-cell--hint">${p.pattern || '—'}</td>
        <td class="dsa-cell">
          <input type="text" class="notes-input" data-note-id="${p.id}" placeholder="Add note…" value="${noteVal}">
        </td>
      </tr>`;
  }).join('');

  const total = (topic.problems || []).length;
  const solved = (topic.problems || []).filter(p => getStatus(p.id) === 'completed').length;
  const pct = total ? Math.round(solved / total * 100) : 0;

  app.innerHTML = `
    <div class="page page--chapter">
      <div class="chapter-head" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:var(--space-4);flex-wrap:wrap;">
        <div>
          <a href="#/dsa" class="btn btn--ghost btn--sm" style="font-weight:600;margin-bottom:8px;">← DSA Tracker</a>
          <h1 class="chapter-notes__title" style="margin:0;">${topic.title}</h1>
          <div class="chapter-notes__meta" style="margin-top:6px;">
            <span class="badge badge--time">${total} problems</span>
            <span class="badge badge--diff-easy">${topic.problems?.filter(p=>p.difficulty==='easy').length||0} easy</span>
            <span class="badge badge--diff-medium">${topic.problems?.filter(p=>p.difficulty==='medium').length||0} medium</span>
            <span class="badge badge--diff-hard">${topic.problems?.filter(p=>p.difficulty==='hard').length||0} hard</span>
          </div>
        </div>
        <div class="dsa-stats" style="display:flex;gap:18px;">
          <div class="dsa-stat"><span class="dsa-stat__val" style="color:var(--accent-green)">${solved}</span><span class="dsa-stat__label">Solved</span></div>
          <div class="dsa-stat"><span class="dsa-stat__val" style="color:var(--text-secondary)">${total}</span><span class="dsa-stat__label">Total</span></div>
          <div class="dsa-stat"><span class="dsa-stat__val" style="color:var(--accent-indigo)">${pct}%</span><span class="dsa-stat__label">Done</span></div>
        </div>
      </div>

      <div class="card" style="padding:0;overflow:hidden;">
        <table class="dsa-table">
          <thead>
            <tr>
              <th style="width:40px">Status</th>
              <th>Problem</th>
              <th style="width:90px">Difficulty</th>
              <th style="width:90px">Importance</th>
              <th style="width:90px">TCS NQT</th>
              <th style="width:120px">Resources</th>
              <th>Pattern / Hint</th>
              <th style="width:160px">Notes</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;

  // Mark topic visited (so chapter shows as done in navigation)
  store.setProgress('dsa', topicId, 'visited');

  // Status toggle
  app.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cur = getStatus(id);
      const next = cur === 'completed' ? 'todo' : cur === 'todo' ? 'in_progress' : 'completed';
      store.setDSA(id, next);
      btn.className = `status-btn status-btn--${next}`;
      btn.title = DSA_STATUS_LABEL[next];
      btn.textContent = DSA_STATUS[next];
      btn.closest('.dsa-row').className = `dsa-row dsa-row--${next}`;
    });
  });

  // Notes
  app.querySelectorAll('.notes-input').forEach(inp => {
    inp.addEventListener('change', () => {
      store.setDSANotes({ [inp.dataset.noteId]: inp.value });
    });
  });
}
