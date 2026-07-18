/**
 * components/sidebar.js — Left Navigation Component
 * 2-level hierarchy: Subjects → Chapters
 * Uses clean inline SVG icons (no emoji) for an aesthetic, non-AI-generated look.
 */
import { store } from '../state/store.js';

const ICON = {
  home:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>',
  aptitude:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v4H4zM4 10h16v4H4zM4 16h16v4H4z"/></svg>',
  cs:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l8-3 8 3-8 3-8-3zM4 12l8 3 8-3M4 18l8 3 8-3"/></svg>',
  dsa:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4v16M19 4v16M5 12h14M5 4h14v16H5z"/></svg>',
  sql:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
  ml:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7.5 7.5L11 16M16.5 7.5L13 16M8 6h8"/></svg>',
  ai:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 7V4M9 3h6M9 13h.01M15 13h.01"/></svg>',
  trophy:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M9 20h6M10 16v4M14 16v4"/></svg>',
  code:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/></svg>',
  python:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3 0-5 1.5-5 4v2h6v1.5H7c-3 0-5 1.8-5 5 0 2.5 2 4 5 4 2 0 3.5-1 4.5-2.5M12 21c3 0 5-1.5 5-4v-2H11v-1.5h6c3 0 5-1.8 5-5 0-2.5-2-4-5-4-2 0-3.5 1-4.5 2.5"/></svg>',
  spark:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></svg>',
};

const SUBJECTS = [
  { id: 'aptitude',    label: 'Aptitude',         icon: ICON.aptitude },
  { id: 'core-cs',    label: 'Core CS',           icon: ICON.cs },
  { id: 'dsa',        label: 'DSA Tracker',       icon: ICON.dsa },
  { id: 'sql',        label: 'SQL',               icon: ICON.sql },
  { id: 'ml',         label: 'ML & AI',           icon: ICON.ml },
  { id: 'ai-engineer',label: 'AI Engineer',       icon: ICON.ai },
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
      <a href="#/subject/${sub.id}" class="sidebar-item ${isActive ? 'sidebar-item--active' : ''}">
        <span class="sidebar-item__icon" aria-hidden="true">${sub.icon}</span>
        <span class="sidebar-item__label">${sub.label}</span>
        <span class="sidebar-item__pct">${pct}%</span>
      </a>`;
  }).join('');

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <a href="#/home" class="sidebar-logo">
        <span class="sidebar-logo__icon" aria-hidden="true">${ICON.spark}</span>
        <span class="sidebar-logo__text">AptitudeMaster</span>
      </a>
      <button class="sidebar-collapse-btn" id="sidebar-collapse" title="Toggle sidebar">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
        </svg>
      </button>
    </div>

    <div class="sidebar-progress-bar">
      <div class="sidebar-progress-bar__fill" style="width:${s.progress?.overall ?? 0}%"></div>
    </div>

    <nav class="sidebar-nav">
      <a href="#/home" class="sidebar-item ${currentPath === '/home' ? 'sidebar-item--active' : ''}">
        <span class="sidebar-item__icon" aria-hidden="true">${ICON.home}</span>
        <span class="sidebar-item__label">Home</span>
      </a>
      <div class="sidebar-section-title">SUBJECTS</div>
      ${items}
      <div class="sidebar-section-title">EXAMS</div>
      <a href="#/mock/tcs-1" class="sidebar-item ${currentPath === '/mock/tcs-1' ? 'sidebar-item--active' : ''}">
        <span class="sidebar-item__icon" aria-hidden="true">${ICON.trophy}</span>
        <span class="sidebar-item__label">TCS Mock Test</span>
      </a>
      <div class="sidebar-section-title">TOOLS</div>
      <a href="#/sql-sheet" class="sidebar-item ${currentPath === '/sql-sheet' ? 'sidebar-item--active' : ''}">
        <span class="sidebar-item__icon" aria-hidden="true">${ICON.sql}</span>
        <span class="sidebar-item__label">SQL Sheet</span>
      </a>
      <a href="#/playground" class="sidebar-item ${currentPath === '/playground' ? 'sidebar-item--active' : ''}">
        <span class="sidebar-item__icon" aria-hidden="true">${ICON.python}</span>
        <span class="sidebar-item__label">Playground</span>
      </a>
      <a href="#/ai-tutor" class="sidebar-item ${currentPath === '/ai-tutor' ? 'sidebar-item--active' : ''}">
        <span class="sidebar-item__icon" aria-hidden="true">${ICON.ai}</span>
        <span class="sidebar-item__label">AI Tutor</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-streak">${s.streak ?? 0} day streak</div>
      <button id="theme-toggle-btn" class="theme-btn" title="Toggle theme">
        <svg class="sun-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
        <svg class="moon-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
      </button>
    </div>
  `;

  // Collapse toggle
  document.getElementById('sidebar-collapse')?.addEventListener('click', () => {
    document.getElementById('app-layout')?.classList.toggle('sidebar-collapsed');
  });

  // Theme toggle
  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    // Mark an explicit dark choice so prefers-color-scheme fallback doesn't override it
    document.body.classList.toggle('dark-forced', !isLight);
    store.set('theme', isLight ? 'light' : 'dark');
  });
}
