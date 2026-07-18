/**
 * pages/chapter.js — Chapter Notes Page (Notebook feel)
 * 3-column layout: outline | markdown notes | formulas panel
 */
import { store } from '../state/store.js';
import { renderMarkdown } from '../components/markdown.js';
import Router from '../router.js';

export async function renderChapter(subjectId, chapterId) {
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
