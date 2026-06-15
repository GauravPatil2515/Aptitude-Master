/**
 * pages/home.js — Home / Dashboard Page
 * Modern Leetcode-style dashboard with glassmorphism cards
 */
import { store } from '../state/store.js';
import Router from '../router.js';

export function renderHome() {
  const app = document.getElementById('page-content');
  const s = store.get();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const subjects = [
    { id: 'aptitude',    label: 'Aptitude',         icon: '📐', color: 'var(--accent-blue)', gradient: 'var(--gradient-blue)' },
    { id: 'core-cs',    label: 'Core CS',           icon: '💻', color: 'var(--accent-violet)', gradient: 'var(--gradient-brand)' },
    { id: 'dsa',        label: 'DSA Tracker',       icon: '📊', color: 'var(--accent-cyan)', gradient: 'var(--gradient-green)' },
    { id: 'sql',        label: 'SQL',               icon: '🗃️',  color: 'var(--accent-green)', gradient: 'var(--gradient-green)' },
    { id: 'ml',         label: 'ML & AI',           icon: '🧠', color: 'var(--accent-amber)', gradient: 'var(--gradient-amber)' },
    { id: 'ai-engineer',label: 'AI Engineer',       icon: '🤖', color: 'var(--accent-red)', gradient: 'var(--gradient-red)' },
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
          <div class="progress-fill" style="width:${pct}%;background:${sub.gradient}"></div>
        </div>
      </div>`;
  }).join('');

  const agenda = (s.todayAgenda || [
    { icon: '📖', title: 'Revise Last Topic', time: '20 min', href: '#/subject/aptitude' },
    { icon: '⚡', title: 'Practice 10 Qs',   time: '30 min', href: '#/practice/aptitude/percentages' },
    { icon: '🗃️', title: 'SQL JOINs',        time: '25 min', href: '#/chapter/sql/joins' },
  ]).map(a => `
    <a href="${a.href}" class="agenda-card">
      <div class="agenda-card__icon">${a.icon}</div>
      <div class="agenda-card__title">${a.title}</div>
      <div class="agenda-card__time">${a.time}</div>
    </a>`).join('');

  const totalChapters = 62; // approximate total
  const visitedChapters = Object.keys(s.progress || {}).filter(k => !k.includes('/') && k !== 'overall').length;
  const overallPct = Math.round((visitedChapters / subjects.length) * 100);

  app.innerHTML = `
    <div class="page page--home">

      <!-- Hero Section -->
      <div class="home-hero">
        <div>
          <h1 class="home-hero__greeting">${greeting}${s.profile?.name ? `, ${s.profile.name}` : ''} 👋</h1>
          <p class="home-hero__sub">
            <span style="color:var(--accent-amber)">🔥 ${s.streak ?? 0} day streak</span>
            <span style="margin:0 8px;opacity:0.3">·</span>
            <span>${overallPct}% overall progress</span>
          </p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          ${s.lastSession ? `
            <a href="${s.lastSession.href}" class="btn btn--ghost btn--sm">
              📌 Resume: ${s.lastSession.label}
            </a>` : ''}
          <a href="#/practice/aptitude/percentages" class="btn btn--primary btn--sm">
            ⚡ Quick Practice
          </a>
        </div>
      </div>

      <!-- Stats Row -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-bottom:28px;">
        <div class="card stat-card">
          <div class="stat-icon blue">📚</div>
          <div>
            <div class="stat-value">${subjects.length}</div>
            <div class="stat-label">Subjects</div>
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon green">✅</div>
          <div>
            <div class="stat-value">${Object.keys(s.scores || {}).length}</div>
            <div class="stat-label">Chapters Done</div>
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon amber">🔥</div>
          <div>
            <div class="stat-value">${s.streak ?? 0}</div>
            <div class="stat-label">Day Streak</div>
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon purple">🎯</div>
          <div>
            <div class="stat-value">${Object.keys(s.mistakes || []).length}</div>
            <div class="stat-label">Mistakes Logged</div>
          </div>
        </div>
      </div>

      <!-- Progress Section -->
      <section class="home-section">
        <h2 class="section-title">📈 Your Progress</h2>
        <div class="card">
          <div class="progress-list">${progressBars}</div>
        </div>
      </section>

      <!-- Today's Agenda -->
      <section class="home-section">
        <h2 class="section-title">
          📅 Today's Agenda
          <span class="badge badge--ai">AI suggested</span>
        </h2>
        <div class="agenda-grid">${agenda}</div>
      </section>

      <!-- Subjects Grid -->
      <section class="home-section">
        <h2 class="section-title">🎓 Subjects</h2>
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
