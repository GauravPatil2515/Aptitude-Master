/**
 * pages/home.js — Home / Dashboard Page
 * Clean dashboard: streak, subject progress bars, today's agenda
 */
import { store } from '../state/store.js';
import Router from '../router.js';

export function renderHome() {
  const app = document.getElementById('page-content');
  const state = store.get();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const subjects = [
    { id: 'aptitude',   label: 'Aptitude',         icon: '📐', color: 'blue' },
    { id: 'core-cs',    label: 'Core CS',           icon: '💻', color: 'indigo' },
    { id: 'dsa',        label: 'DSA',               icon: '📊', color: 'green' },
    { id: 'sql',        label: 'SQL',               icon: '🗃️',  color: 'amber' },
    { id: 'ml',         label: 'ML & AI',           icon: '🤖', color: 'purple' },
  ];

  const agenda = [
    { icon: '📖', label: 'Revise', topic: 'HCF & LCM', time: '20 min',  href: '#/chapter/aptitude/hcf-lcm' },
    { icon: '⚡', label: 'Practice', topic: '10 DSA Problems', time: '30 min', href: '#/dsa' },
    { icon: '🧠', label: 'Learn',   topic: 'SQL JOINs',  time: '30 min', href: '#/chapter/sql/joins' },
  ];

  app.innerHTML = `
    <div class="page page--home">

      <!-- Hero -->
      <div class="home-hero">
        <div class="home-hero__left">
          <h1 class="home-hero__greeting">${greeting}, Gaurav 👋</h1>
          <p class="home-hero__sub">Keep your streak going — consistency beats intensity.</p>
        </div>
        <div class="home-hero__right">
          <div class="streak-badge">
            <span class="streak-badge__fire">🔥</span>
            <span class="streak-badge__count">${state.streak || 0}</span>
            <span class="streak-badge__label">day streak</span>
          </div>
        </div>
      </div>

      <!-- Progress -->
      <section class="home-section">
        <h2 class="home-section__title">Your Progress</h2>
        <div class="progress-grid">
          ${subjects.map(s => {
            const pct = state.progress?.[s.id] ?? 0;
            return `
            <div class="progress-card" role="button" tabindex="0"
                 onclick="Router.navigate('#/subject/${s.id}')">
              <div class="progress-card__header">
                <span class="progress-card__icon">${s.icon}</span>
                <span class="progress-card__label">${s.label}</span>
                <span class="progress-card__pct">${pct}%</span>
              </div>
              <div class="progress-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar__fill progress-bar__fill--${s.color}" style="width:${pct}%"></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </section>

      <!-- Today's Agenda -->
      <section class="home-section">
        <h2 class="home-section__title">Today's Agenda <span class="badge badge--ai">AI suggested</span></h2>
        <div class="agenda-grid">
          ${agenda.map(a => `
          <a href="${a.href}" class="agenda-card">
            <div class="agenda-card__icon">${a.icon}</div>
            <div class="agenda-card__label">${a.label}</div>
            <div class="agenda-card__topic">${a.topic}</div>
            <div class="agenda-card__time">${a.time}</div>
          </a>`).join('')}
        </div>
      </section>

    </div>
  `;
}
