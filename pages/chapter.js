/**
 * pages/chapter.js — Chapter Notes Page
 * 3-column layout: outline | markdown notes | formula reference
 * Includes Ask AI panel and Start Practice CTA
 */
import { renderMarkdown } from '../components/markdown.js';
import { store } from '../state/store.js';
import Router from '../router.js';

const DATA_LOADERS = {
  'aptitude-percentages':  () => import('../data/aptitude/percentages.js'),
  'aptitude-profit-loss':  () => import('../data/aptitude/profit-loss.js'),
  'aptitude-hcf-lcm':      () => import('../data/aptitude/hcf-lcm.js'),
  'aptitude-ratio':        () => import('../data/aptitude/ratio.js'),
  'aptitude-time-work':    () => import('../data/aptitude/time-work.js'),
  'aptitude-speed':        () => import('../data/aptitude/speed.js'),
  'core-cs-os':            () => import('../data/core-cs/os.js'),
  'core-cs-dbms':          () => import('../data/core-cs/dbms.js'),
  'core-cs-networks':      () => import('../data/core-cs/networks.js'),
  'core-cs-oops':          () => import('../data/core-cs/oops.js'),
  'sql-basics':            () => import('../data/sql/basics.js'),
  'sql-joins':             () => import('../data/sql/joins.js'),
  'sql-aggregation':       () => import('../data/sql/aggregation.js'),
  'sql-window-functions':  () => import('../data/sql/window-functions.js'),
  'dsa-arrays':            () => import('../data/dsa/arrays.js'),
  'dsa-linked-lists':      () => import('../data/dsa/linked-lists.js'),
  'dsa-trees':             () => import('../data/dsa/trees.js'),
  'dsa-graphs':            () => import('../data/dsa/graphs.js'),
  'dsa-dp':                () => import('../data/dsa/dp.js'),
  'ml-math':               () => import('../data/ml/math.js'),
  'ml-core':               () => import('../data/ml/core.js'),
  'ml-deep-learning':      () => import('../data/ml/deep-learning.js'),
};

export async function renderChapter(subjectId, chapterId) {
  const app = document.getElementById('page-content');
  app.innerHTML = '<div class="skeleton-page skeleton-page--chapter"></div>';

  const key = `${subjectId}-${chapterId}`;
  const loader = DATA_LOADERS[key];
  if (!loader) { Router._render404(`/chapter/${subjectId}/${chapterId}`); return; }

  const { default: chapter } = await loader();
  const html = renderMarkdown(chapter.notes);

  // Build heading outline from markdown
  const headings = [...chapter.notes.matchAll(/^#{1,3}\s+(.+)$/gm)]
    .map((m, i) => ({ text: m[1], id: `heading-${i}` }));

  app.innerHTML = `
    <div class="page page--chapter">

      <!-- Outline panel -->
      <aside class="chapter-outline" id="chapter-outline">
        <div class="chapter-outline__header">OUTLINE</div>
        <nav class="chapter-outline__nav">
          ${headings.map((h, i) => `
            <a href="#heading-${i}" class="outline-link" data-index="${i}">${h.text}</a>
          `).join('')}
        </nav>
      </aside>

      <!-- Notes panel -->
      <main class="chapter-notes" id="chapter-notes">
        <div class="chapter-notes__header">
          <h1 class="chapter-notes__title">${chapter.icon ?? ''} ${chapter.title}</h1>
          <div class="chapter-notes__meta">
            <span class="badge badge--${chapter.difficulty}">${chapter.difficulty}</span>
            <span class="text-muted">~${chapter.estimatedTime} min read</span>
          </div>
        </div>

        <div class="prose" id="notes-content">
          ${html}
        </div>

        <div class="chapter-actions">
          <button class="btn btn--ghost" id="btn-ask-ai" onclick="toggleAIPanel()">🧠 Ask AI to Explain</button>
          <a href="#/practice/${subjectId}/${chapterId}" class="btn btn--primary">▶ Start Practice →</a>
        </div>
      </main>

      <!-- Formula panel -->
      <aside class="chapter-formulas" id="chapter-formulas">
        <div class="chapter-formulas__header">FORMULAS</div>
        <div class="chapter-formulas__list">
          ${(chapter.formulas ?? []).map(f => `
            <div class="formula-card">
              <div class="formula-card__name">${f.name}</div>
              <code class="formula-card__formula">${f.formula}</code>
              ${f.example ? `<div class="formula-card__example">e.g. ${f.example}</div>` : ''}
            </div>
          `).join('')}
        </div>

        ${chapter.shortcuts?.length ? `
        <div class="chapter-formulas__header" style="margin-top:var(--space-6)">SHORTCUTS</div>
        <ul class="shortcuts-list">
          ${chapter.shortcuts.map(s => `<li class="shortcuts-list__item">${s}</li>`).join('')}
        </ul>` : ''}
      </aside>

      <!-- AI Panel (hidden by default) -->
      <div class="ai-panel" id="ai-panel" aria-hidden="true">
        <div class="ai-panel__header">
          <span>🤖 AI Tutor — ${chapter.title}</span>
          <button class="ai-panel__close" onclick="toggleAIPanel()">✕</button>
        </div>
        <div class="ai-panel__messages" id="ai-messages"></div>
        <div class="ai-panel__input-row">
          <input type="text" id="ai-input" class="ai-panel__input"
                 placeholder="Ask anything about this chapter…"
                 onkeydown="if(event.key==='Enter') sendAIMessage('${chapter.id}', '${chapter.aiTutorPrompt?.replace(/'/g, "\\'") ?? ''}')" />
          <button class="btn btn--primary btn--sm" onclick="sendAIMessage('${chapter.id}', '${chapter.aiTutorPrompt?.replace(/'/g, "\\'") ?? ''}')">Send</button>
        </div>
      </div>

    </div>
  `;

  // Add heading IDs to rendered content for outline links
  const content = document.getElementById('notes-content');
  if (content) {
    content.querySelectorAll('h1,h2,h3').forEach((el, i) => el.id = `heading-${i}`);
  }

  // Highlight active outline link on scroll
  _initOutlineScroll();
}

function _initOutlineScroll() {
  const links = document.querySelectorAll('.outline-link');
  if (!links.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const link = document.querySelector(`.outline-link[href="#${e.target.id}"]`);
      if (link) link.classList.toggle('outline-link--active', e.isIntersecting);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('#notes-content h1,#notes-content h2,#notes-content h3')
    .forEach(el => observer.observe(el));
}

window.toggleAIPanel = function() {
  const panel = document.getElementById('ai-panel');
  if (!panel) return;
  const hidden = panel.getAttribute('aria-hidden') === 'true';
  panel.setAttribute('aria-hidden', String(!hidden));
  panel.classList.toggle('ai-panel--open', hidden);
  if (hidden) document.getElementById('ai-input')?.focus();
};

window.sendAIMessage = async function(chapterId, systemPrompt) {
  const input = document.getElementById('ai-input');
  const messages = document.getElementById('ai-messages');
  const msg = input?.value?.trim();
  if (!msg || !messages) return;
  input.value = '';

  messages.insertAdjacentHTML('beforeend',
    `<div class="ai-msg ai-msg--user">${msg}</div>`);

  const loaderId = 'ai-loader-' + Date.now();
  messages.insertAdjacentHTML('beforeend',
    `<div class="ai-msg ai-msg--bot" id="${loaderId}"><span class="ai-typing">…</span></div>`);
  messages.scrollTop = messages.scrollHeight;

  try {
    const { askAI } = await import('../api/ai.js');
    const reply = await askAI(systemPrompt, msg);
    document.getElementById(loaderId).innerHTML = reply;
  } catch (e) {
    document.getElementById(loaderId).innerHTML = '⚠️ AI unavailable. Check your API key in Vercel env vars.';
  }
  messages.scrollTop = messages.scrollHeight;
};
