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
        <input id="global-search" class="global-search__input" type="text" placeholder="Search topics, problems…" autocomplete="off" spellcheck="false" aria-label="Search">
        <kbd class="global-search__kbd" aria-hidden="true">⌘K</kbd>
        <div id="global-search-results" class="global-search__results" role="listbox"></div>
      </div>
      <a href="#/practice/aptitude/percentages" class="btn btn--primary btn--sm">Quick Practice</a>
    </div>
  `;

  document.getElementById('topbar-menu-btn')?.addEventListener('click', () => {
    const layout = document.getElementById('app-layout');
    const sidebar = document.querySelector('.sidebar');
    if (!layout || !sidebar) return;
    // On narrow screens the sidebar is an off-canvas drawer (toggled via .open).
    // On wide screens it's the inline collapsible (toggled via .sidebar-collapsed).
    const isDrawer = window.matchMedia('(max-width: 1100px)').matches;
    if (isDrawer) {
      const willOpen = !sidebar.classList.contains('open');
      sidebar.classList.toggle('open', willOpen);
      toggleSidebarBackdrop(willOpen);
    } else {
      layout.classList.toggle('sidebar-collapsed');
    }
  });

  // Auto-close the off-canvas drawer after navigating on mobile.
  window.addEventListener('hashchange', () => {
    if (window.matchMedia('(max-width: 1100px)').matches) {
      document.querySelector('.sidebar')?.classList.remove('open');
      toggleSidebarBackdrop(false);
    }
  });
}

// Lightweight backdrop for the mobile off-canvas sidebar.
function toggleSidebarBackdrop(show) {
  let bd = document.getElementById('sidebar-backdrop');
  if (show) {
    if (!bd) {
      bd = document.createElement('div');
      bd.id = 'sidebar-backdrop';
      bd.className = 'sidebar-backdrop';
      bd.addEventListener('click', () => {
        document.querySelector('.sidebar')?.classList.remove('open');
        toggleSidebarBackdrop(false);
      });
      document.body.appendChild(bd);
    }
    // allow paint before fading in
    requestAnimationFrame(() => bd.classList.add('show'));
  } else if (bd) {
    bd.classList.remove('show');
  }
}
