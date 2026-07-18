/**
 * pages/subject.js — Subject Overview Page
 * Modern Leetcode-style chapter list with progress rings
 */
import { store } from '../state/store.js';

const SUBJECT_META = {
  aptitude:  { label: 'Aptitude',    color: 'var(--accent-blue)', initial: 'A' },
  'core-cs': { label: 'Core CS',     color: 'var(--accent-violet)', initial: 'C' },
  dsa:       { label: 'DSA',         color: 'var(--accent-cyan)', initial: 'D' },
  sql:       { label: 'SQL',         color: 'var(--accent-green)', initial: 'S' },
  ml:        { label: 'ML & AI',     color: 'var(--accent-amber)', initial: 'M' },
  'ai-engineer': { label: 'AI Engineer', color: 'var(--accent-red)', initial: 'AI' },
};

export async function renderSubject(subjectId) {
  const app = document.getElementById('page-content');
  const meta = SUBJECT_META[subjectId];
  if (!meta) {
    app.innerHTML = `<div class="empty-state"><h2>Unknown subject: ${subjectId}</h2></div>`;
    return;
  }

  app.innerHTML = `
    <div class="page-loading">
      <div class="page-loading__spinner"></div>
      <div class="page-loading__text">Loading ${meta.label}…</div>
    </div>`;

  let manifest;
  try {
    const mod = await import(`../data/${subjectId}/index.js`);
    manifest = mod.default;
  } catch(e) {
    app.innerHTML = `<div class="empty-state">
      <div class="empty-state__icon">${meta.icon}</div>
      <h2 class="empty-state__title">${meta.label}</h2>
      <p class="empty-state__desc">Content coming soon.</p>
    </div>`;
    return;
  }

  const s = store.get();
  const chapters = manifest.chapters || manifest.topics || [];
  const done = chapters.filter(c => s.progress?.[subjectId + '/' + c.id]).length;
  const total = chapters.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const chapterCards = chapters.map(ch => {
    const isDone = !!s.progress?.[subjectId + '/' + ch.id];
    const score = s.scores?.[subjectId + '/' + ch.id];
    const diffClass = ch.difficulty === 'easy' ? 'diff-badge easy' : ch.difficulty === 'hard' ? 'diff-badge hard' : 'diff-badge medium';
    const diffLabel = ch.difficulty === 'easy' ? '★☆☆' : ch.difficulty === 'hard' ? '★★★' : '★★☆';

    return `
      <a href="#/chapter/${subjectId}/${ch.id}" class="chapter-card ${isDone ? 'chapter-card--done' : ''}">
        <div class="chapter-card__icon">${(ch.title || '?').trim().charAt(0).toUpperCase()}</div>
        <div class="chapter-card__body">
          <div class="chapter-card__title">${ch.title}</div>
          <div class="chapter-card__meta">
            <span class="${diffClass}">${diffLabel}</span>
            <span>Time: ${ch.estimatedTime ?? '?'} min</span>
            ${score != null ? `<span style="color:var(--accent-green)">Score: ${score}%</span>` : ''}
          </div>
        </div>
        ${isDone ? '<div class="chapter-card__check">Done</div>' : '<div style="color:var(--text-muted);font-size:12px">Start →</div>'}
      </a>`;
  }).join('');

  app.innerHTML = `
    <div class="page page--subject">

      <!-- Subject Hero -->
      <div class="subject-hero" style="--subject-color:${meta.color}">
        <div class="subject-hero__icon">${meta.initial}</div>
        <div style="flex:1">
          <h1 class="subject-hero__title">${meta.label}</h1>
          <p class="subject-hero__sub">${done}/${total} chapters completed · ${pct}% complete</p>
        </div>
        <div class="ring-mini" style="--pct:${pct};--color:${meta.color}">
          <svg viewBox="0 0 36 36" width="68" height="68">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--bg-track)" stroke-width="3"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="${meta.color}" stroke-width="3"
              stroke-dasharray="${pct} ${100 - pct}" stroke-linecap="round"
              transform="rotate(-90 18 18)"/>
          </svg>
          <span class="ring-mini__label">${pct}%</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap;">
        ${total > 0 ? `<a href="#/practice/${subjectId}/${chapters[0].id}" class="btn btn--primary">Start Practice</a>` : ''}
        <a href="#/cheatsheet/${subjectId}" class="btn btn--ghost">Cheat Sheet</a>
      </div>

      <!-- Chapters -->
      <section class="home-section">
        <h2 class="section-title">Chapters</h2>
        <div class="chapter-grid">${chapterCards}</div>
      </section>

    </div>
  `;
}
