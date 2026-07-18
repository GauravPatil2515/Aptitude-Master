/**
 * components/topbar.js — Top Navigation Bar
 * Shows breadcrumb + quick actions. Minimal — main nav is in sidebar.
 */
export function renderTopbar() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;
  topbar.innerHTML = `
    <div class="topbar-left">
      <button class="topbar-menu-btn" id="topbar-menu-btn" title="Toggle sidebar">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <nav id="breadcrumb" class="breadcrumb" aria-label="breadcrumb"></nav>
    </div>
    <div class="topbar-right">
      <div class="global-search">
        <svg class="global-search__icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input id="global-search" class="global-search__input" type="text" placeholder="Search topics, problems…  (Ctrl/⌘K)" autocomplete="off" spellcheck="false" aria-label="Search">
        <div id="global-search-results" class="global-search__results" role="listbox"></div>
      </div>
      <a href="#/practice/aptitude/percentages" class="btn btn--primary btn--sm">Quick Practice</a>
    </div>
  `;

  document.getElementById('topbar-menu-btn')?.addEventListener('click', () => {
    document.getElementById('app-layout')?.classList.toggle('sidebar-collapsed');
  });
}
