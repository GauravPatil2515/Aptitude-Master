/**
 * components/sidebar.js — Left Navigation Component
 * 2-level hierarchy: Subjects → Chapters
 */
import Router from '../router.js';
import { store } from '../state/store.js';

const SUBJECTS = [
  { id: 'aptitude',  label: 'Aptitude',         icon: '📐' },
  { id: 'core-cs',  label: 'Core CS',           icon: '💻' },
  { id: 'dsa',      label: 'DSA Tracker',       icon: '📊' },
  { id: 'sql',      label: 'SQL',               icon: '🗃️' },
  { id: 'ml',       label: 'ML & AI',           icon: '🤖' },
];

export function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const s = store.get();
  const currentPath = window.location.hash.replace('#', '') || '/home';

  const items = SUBJECTS.map(sub => {
    const pct = s.progress?.[sub.id] ?? 0;
    const isActive = currentPath.includes(`/${sub.id}`);
    return `
      <div class="sidebar-item ${isActive ? 'sidebar-item--active' : ''}" data-href="#/subject/${sub.id}">
        <span class="sidebar-item__icon">${sub.icon}</span>
        <span class="sidebar-item__label">${sub.label}</span>
        <span class="sidebar-item__pct">${pct}%</span>
      </div>`;
  }).join('');

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <a href="#/home" class="sidebar-logo">
        <span class="sidebar-logo__icon">🎯</span>
        <span class="sidebar-logo__text">AptitudeMaster</span>
      </a>
      <button class="sidebar-collapse-btn" id="sidebar-collapse" title="Collapse sidebar">←</button>
    </div>

    <div class="sidebar-progress-bar">
      <div class="sidebar-progress-bar__fill" style="width:${s.progress?.overall ?? 0}%"></div>
    </div>

    <nav class="sidebar-nav">
      <a href="#/home" class="sidebar-item ${currentPath === '/home' ? 'sidebar-item--active' : ''}">
        <span class="sidebar-item__icon">🏠</span>
        <span class="sidebar-item__label">Home</span>
      </a>
      <div class="sidebar-section-title">SUBJECTS</div>
      ${items}
      <div class="sidebar-section-title">TOOLS</div>
      <a href="#/playground" class="sidebar-item ${currentPath === '/playground' ? 'sidebar-item--active' : ''}">
        <span class="sidebar-item__icon">🐍</span>
        <span class="sidebar-item__label">Playground</span>
      </a>
      <a href="#/ai-tutor" class="sidebar-item ${currentPath === '/ai-tutor' ? 'sidebar-item--active' : ''}">
        <span class="sidebar-item__icon">🤖</span>
        <span class="sidebar-item__label">AI Tutor</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-streak">🔥 ${s.streak ?? 0} day streak</div>
      <button id="theme-toggle-btn" class="theme-btn" title="Toggle theme">
        <svg class="sun-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
        <svg class="moon-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
      </button>
    </div>
  `;

  // Click nav items
  sidebar.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => Router.navigate(el.dataset.href));
  });

  // Collapse toggle
  document.getElementById('sidebar-collapse')?.addEventListener('click', () => {
    document.getElementById('app-layout')?.classList.toggle('sidebar-collapsed');
  });

  // Theme toggle
  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    store.set('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  });
}
