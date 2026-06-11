/**
 * pages/subject.js — Subject Overview Page
 * Shows chapter list, completion ring, quick-start last session.
 */
import { store } from '../state/store.js';

const SUBJECT_META = {
  aptitude:  { label: 'Aptitude',    icon: '📐', color: 'var(--accent-blue)' },
  'core-cs': { label: 'Core CS',     icon: '💻', color: 'var(--accent-purple)' },
  dsa:       { label: 'DSA',         icon: '📊', color: 'var(--accent-cyan)' },
  sql:       { label: 'SQL',         icon: '🗃️',  color: 'var(--accent-green)' },
  ml:        { label: 'ML & AI',     icon: '🤖', color: 'var(--accent-amber)' },
};

export async function renderSubject(subjectId) {
  const app = document.getElementById('page-content');
  const meta = SUBJECT_META[subjectId];
  if (!meta) { app.innerHTML = `<div class="empty-state"><h2>Unknown subject: ${subjectId}</h2></div>`; return; }

  app.innerHTML = `<div class="page-loading">Loading ${meta.label}…</div>`;

  let manifest;
  try {
    const mod = await import(`../data/${subjectId}/index.js`);
    manifest = mod.default;
  } catch(e) {
    app.innerHTML = `<div class="empty-state"><div class="empty-state__icon">${meta.icon}</div><h2>${meta.label}</h2><p>Content coming soon.</p></div>`;
    return;
  }

  const s = store.get();
  const done = manifest.chapters.filter(c => s.progress?.[subjectId + '/' + c.id]).length;
  const total = manifest.chapters.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const chapterCards = manifest.chapters.map(ch => {
    const isDone = !!s.progress?.[subjectId + '/' + ch.id];
    return `
      <a href="#/chapter/${subjectId}/${ch.id}" class="chapter-card ${isDone ? 'chapter-card--done' : ''}">
        <div class="chapter-card__icon">${ch.icon || '📄'}</div>
        <div class="chapter-card__body">
          <div class="chapter-card__title">${ch.title}</div>
          <div class="chapter-card__meta">${ch.estimatedTime ?? '?'} min · ${ch.difficulty ?? 'medium'}</div>
        </div>
        ${isDone ? '<div class="chapter-card__check">✅</div>' : ''}
      </a>`;
  }).join('');

  app.innerHTML = `
    <div class="page page--subject">
      <div class="subject-hero" style="--subject-color:${meta.color}">
        <div class="subject-hero__icon">${meta.icon}</div>
        <div>
          <h1 class="subject-hero__title">${meta.label}</h1>
          <p class="subject-hero__sub">${done}/${total} chapters · ${pct}% complete</p>
        </div>
        <div class="ring-mini" style="--pct:${pct};--color:${meta.color}">
          <svg viewBox="0 0 36 36" width="64" height="64">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--bg-track)" stroke-width="3"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="${meta.color}" stroke-width="3"
              stroke-dasharray="${pct} ${100 - pct}" stroke-linecap="round"
              transform="rotate(-90 18 18)"/>
          </svg>
          <span class="ring-mini__label">${pct}%</span>
        </div>
      </div>
      <section class="home-section">
        <h2 class="section-title">Chapters</h2>
        <div class="chapter-grid">${chapterCards}</div>
      </section>
    </div>
  `;
}
