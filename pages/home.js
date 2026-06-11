/**
 * pages/home.js — Home / Dashboard Page
 * Clean dashboard: streak, subject progress bars, today's agenda.
 */
import { store } from '../state/store.js';
import Router from '../router.js';

export function renderHome() {
  const app = document.getElementById('page-content');
  const s = store.get();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const subjects = [
    { id: 'aptitude',  label: 'Aptitude',         icon: '📐', color: 'var(--accent-blue)' },
    { id: 'core-cs',  label: 'Core CS',           icon: '💻', color: 'var(--accent-purple)' },
    { id: 'dsa',      label: 'DSA',               icon: '📊', color: 'var(--accent-cyan)' },
    { id: 'sql',      label: 'SQL',               icon: '🗃️',  color: 'var(--accent-green)' },
    { id: 'ml',       label: 'ML & AI',           icon: '🤖', color: 'var(--accent-amber)' },
  ];

  const progressBars = subjects.map(sub => {
    const pct = s.progress?.[sub.id] ?? 0;
    return `
      <div class="progress-row">
        <div class="progress-row__label">
          <span>${sub.icon} ${sub.label}</span>
          <span class="progress-row__pct">${pct}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%;background:${sub.color}"></div>
        </div>
      </div>`;
  }).join('');

  const agenda = (s.todayAgenda || [
    { icon: '📖', title: 'Revise Last Topic', time: '20 min', href: '#/subject/aptitude' },
    { icon: '⚡', title: 'Practice 10 DSA',   time: '30 min', href: '#/dsa' },
    { icon: '🗃️', title: 'Learn SQL JOINs',   time: '25 min', href: '#/subject/sql' },
  ]).map(a => `
    <a href="${a.href}" class="agenda-card">
      <div class="agenda-card__icon">${a.icon}</div>
      <div class="agenda-card__title">${a.title}</div>
      <div class="agenda-card__time">${a.time}</div>
    </a>`).join('');

  app.innerHTML = `
    <div class="page page--home">
      <div class="home-hero">
        <div>
          <h1 class="home-hero__greeting">${greeting}, Gaurav 👋</h1>
          <p class="home-hero__sub">Streak: <strong>${s.streak ?? 0} days 🔥</strong></p>
        </div>
        ${s.lastSession ? `
          <a href="${s.lastSession.href}" class="btn btn--primary">
            Resume: ${s.lastSession.label} →
          </a>` : ''}
      </div>

      <section class="home-section">
        <h2 class="section-title">Your Progress</h2>
        <div class="progress-list">${progressBars}</div>
      </section>

      <section class="home-section">
        <h2 class="section-title">Today's Agenda <span class="badge badge--ai">AI suggested</span></h2>
        <div class="agenda-grid">${agenda}</div>
      </section>

      <section class="home-section">
        <h2 class="section-title">Subjects</h2>
        <div class="subject-grid">
          ${subjects.map(sub => `
            <a href="#/subject/${sub.id}" class="subject-card">
              <div class="subject-card__icon" style="color:${sub.color}">${sub.icon}</div>
              <div class="subject-card__label">${sub.label}</div>
              <div class="subject-card__pct" style="color:${sub.color}">${s.progress?.[sub.id] ?? 0}%</div>
            </a>`).join('')}
        </div>
      </section>
    </div>
  `;
}
