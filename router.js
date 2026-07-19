/**
 * router.js — Hash-based SPA Router
 * Handles navigation between pages without page reloads.
 * Usage: Router.navigate('#/aptitude/percentages')
 */

import { renderHome } from './pages/home.js';
import { renderSubject } from './pages/subject.js';
import { renderChapter } from './pages/chapter.js';
import { renderPractice } from './pages/practice.js';
import { renderDSA } from './pages/dsa.js';
import { renderPlayground } from './pages/playground.js';
import { renderCheatsheet } from './pages/cheatsheet.js';
import { renderAITutor } from './pages/ai-tutor.js';
import { renderSQLSheet } from './pages/sql-sheet.js';
import { renderMock } from './pages/mock.js';
import { renderAIMock } from './pages/ai-mock.js';

// Route definitions: pattern → handler
const ROUTES = [
  { pattern: /^\/home$/, handler: () => renderHome() },
  { pattern: /^\/subject\/([\w-]+)$/, handler: ([subject]) => renderSubject(subject) },
  { pattern: /^\/chapter\/([\w-]+)\/([\w-]+)$/, handler: ([subject, chapter]) => renderChapter(subject, chapter) },
  { pattern: /^\/practice\/([\w-]+)\/([\w-]+)$/, handler: ([subject, chapter]) => renderPractice(subject, chapter) },
  { pattern: /^\/dsa$/, handler: () => renderDSA() },
  { pattern: /^\/sql-sheet$/, handler: () => renderSQLSheet() },
  { pattern: /^\/playground$/, handler: () => renderPlayground() },
  { pattern: /^\/cheatsheet\/([\w-]+)$/, handler: ([subject]) => renderCheatsheet(subject) },
  { pattern: /^\/ai-tutor$/, handler: () => renderAITutor() },
  { pattern: /^\/mock\/([\w-]+)$/, handler: ([mockId]) => renderMock(mockId) },
  { pattern: /^\/ai-mock$/, handler: () => renderAIMock() },
];

const Router = {
  /** Current resolved route params */
  current: { path: '', params: [] },

  /** Mount: listen for hash changes and handle initial load */
  init() {
    window.addEventListener('hashchange', () => this._resolve());
    this._resolve();
  },

  /** Navigate programmatically */
  navigate(hash) {
    window.location.hash = hash;
  },

  /** Resolve current hash to a page renderer */
  _resolve() {
    const hash = window.location.hash || '#/home';
    const path = hash.replace(/^#/, '') || '/home';

    for (const route of ROUTES) {
      const match = path.match(route.pattern);
      if (match) {
        const params = match.slice(1);
        this.current = { path, params };
        this._updateBreadcrumb(path);
        route.handler(params);
        return;
      }
    }

    // Fallback: 404 / redirect to home
    this._render404(path);
  },

  /** Update topbar breadcrumb based on current path */
  _updateBreadcrumb(path) {
    const el = document.getElementById('breadcrumb');
    if (!el) return;
    const parts = path.split('/').filter(Boolean);
    el.innerHTML = parts
      .map((p, i) => {
        const href = '#/' + parts.slice(0, i + 1).join('/');
        const label = p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return i < parts.length - 1
          ? `<a href="${href}" class="breadcrumb-link">${label}</a>`
          : `<span class="breadcrumb-current">${label}</span>`;
      })
      .join('<span class="breadcrumb-sep"> / </span>');
  },

  /** Render a friendly 404 state */
  _render404(path) {
    const app = document.getElementById('page-content');
    if (!app) return;
    app.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px;opacity:.5"><path d="M9 17H7a4 4 0 0 1 0-8h1M15 7h2a4 4 0 0 1 0 8h-1M8 12h8"/></svg>
        </div>
        <h2 class="empty-state__title">Page not found</h2>
        <p class="empty-state__desc">No route matched: <code>${path}</code></p>
        <a href="#/home" class="btn btn--primary">Go Home</a>
      </div>
    `;
  },
};

export default Router;
