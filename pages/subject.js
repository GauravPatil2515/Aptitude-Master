/**
 * pages/subject.js — Subject Overview Page
 * Shows subject completion ring, chapter card grid, last session resume
 */
import { store } from '../state/store.js';
import Router from '../router.js';

const SUBJECT_MANIFESTS = {
  aptitude:  () => import('../data/aptitude/index.js'),
  'core-cs': () => import('../data/core-cs/index.js'),
  dsa:       () => import('../data/dsa/index.js'),
  sql:       () => import('../data/sql/index.js'),
  ml:        () => import('../data/ml/index.js'),
};

export async function renderSubject(subjectId) {
  const app = document.getElementById('page-content');
  app.innerHTML = '<div class="skeleton-page"></div>';

  const loader = SUBJECT_MANIFESTS[subjectId];
  if (!loader) { Router._render404(`/subject/${subjectId}`); return; }

  const { default: manifest } = await loader();
  const state = store.get();
  const pct = state.progress?.[subjectId] ?? 0;

  app.innerHTML = `
    <div class="page page--subject">

      <div class="subject-hero">
        <div class="subject-hero__icon">${manifest.icon}</div>
        <div class="subject-hero__info">
          <h1 class="subject-hero__title">${manifest.title}</h1>
          <p class="subject-hero__desc">${manifest.description}</p>
        </div>
        <div class="subject-hero__ring">
          <svg class="ring-svg" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="var(--bg-track)" stroke-width="6"/>
            <circle cx="40" cy="40" r="32" fill="none" stroke="var(--accent-blue)" stroke-width="6"
              stroke-dasharray="${2 * Math.PI * 32}"
              stroke-dashoffset="${2 * Math.PI * 32 * (1 - pct / 100)}"
              stroke-linecap="round"
              transform="rotate(-90 40 40)"/>
          </svg>
          <span class="ring-label">${pct}%</span>
        </div>
      </div>

      <section class="subject-section">
        <h2 class="subject-section__title">Chapters</h2>
        <div class="chapter-grid">
          ${manifest.chapters.map(ch => {
            const done = state.chapters?.[ch.id]?.completed ?? false;
            const score = state.chapters?.[ch.id]?.score ?? null;
            return `
            <div class="chapter-card ${done ? 'chapter-card--done' : ''}" role="button" tabindex="0"
                 onclick="Router.navigate('#/chapter/${subjectId}/${ch.id}')">
              <div class="chapter-card__header">
                <span class="chapter-card__icon">${ch.icon}</span>
                ${done ? '<span class="badge badge--success">✓ Done</span>' : ''}
              </div>
              <h3 class="chapter-card__title">${ch.title}</h3>
              <p class="chapter-card__meta">${ch.estimatedTime} min · ${ch.difficulty}</p>
              ${score !== null ? `<p class="chapter-card__score">Last score: ${score}%</p>` : ''}
              <div class="chapter-card__footer">
                <a href="#/chapter/${subjectId}/${ch.id}" class="btn btn--ghost btn--sm">Study →</a>
                <a href="#/practice/${subjectId}/${ch.id}" class="btn btn--primary btn--sm">Practice</a>
              </div>
            </div>`;
          }).join('')}
        </div>
      </section>

    </div>
  `;
}
