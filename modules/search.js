/**
 * modules/search.js — Global app search (topbar command palette).
 * Builds an index from data manifests (subjects, chapters, DSA problems,
 * SQL problems) and lets the user jump anywhere. Ctrl/Cmd+K focuses it.
 */
import Router from '../router.js';

let INDEX = null;
let inputEl = null;
let dropdownEl = null;
let activeIdx = -1;
let results = [];

const SUBJECTS = ['aptitude', 'core-cs', 'dsa', 'sql', 'ml', 'ai-engineer'];

async function buildIndex() {
  if (INDEX) return INDEX;
  const entries = [];

  for (const sub of SUBJECTS) {
    try {
      const mod = await import(`../data/${sub}/index.js`);
      const data = mod.default;
      if (!data) continue;

      // Subject landing page
      if (data.label && sub !== 'dsa') {
        entries.push({ title: data.label, subtitle: 'Subject', href: `#/subject/${sub}`, type: 'subject' });
      }

      // DSA sheet: topics -> problems
      if (data.topics) {
        for (const t of data.topics) {
          for (const p of t.problems) {
            entries.push({
              title: p.name,
              subtitle: `DSA · ${t.title}${p.tcsNqt ? ' · TCS NQT' : ''}`,
              href: `#/dsa`,
              type: 'dsa',
              keywords: `${p.pattern} ${p.companies ? p.companies.join(' ') : ''}`.toLowerCase(),
            });
          }
        }
        continue;
      }

      // Generic subject: chapters
      if (data.chapters) {
        for (const c of data.chapters) {
          entries.push({
            title: c.title,
            subtitle: `${data.label} · chapter`,
            href: `#/chapter/${sub}/${c.id}`,
            type: 'chapter',
          });
        }
      }
    } catch (_) { /* subject has no index; skip */ }
  }

  // Mocks
  try {
    const mk = await import('../data/mocks/index.js');
    const mdata = mk.default;
    if (mdata && mdata.mocks) {
      for (const m of mdata.mocks) {
        entries.push({ title: m.title || m.id, subtitle: 'Mock Test', href: `#/mock/${m.id}`, type: 'mock' });
      }
    }
  } catch (_) {}

  INDEX = entries;
  return INDEX;
}

function renderDropdown() {
  if (!dropdownEl) return;
  if (!results.length) { dropdownEl.classList.remove('search-open'); dropdownEl.innerHTML = ''; return; }
  dropdownEl.innerHTML = results.map((r, i) => `
    <a href="${r.href}" class="search-result ${i === activeIdx ? 'is-active' : ''}" data-i="${i}">
      <span class="search-result__title">${r.title}</span>
      <span class="search-result__sub">${r.subtitle || ''}</span>
    </a>`).join('');
  dropdownEl.classList.add('search-open');
}

function runQuery(q) {
  const query = q.trim().toLowerCase();
  if (!query) { results = []; renderDropdown(); return; }
  const idx = INDEX || [];
  results = idx
    .filter(e => {
      const hay = `${e.title} ${e.subtitle || ''} ${e.keywords || ''}`.toLowerCase();
      return hay.includes(query);
    })
    .slice(0, 8);
  activeIdx = results.length ? 0 : -1;
  renderDropdown();
}

function onKeydown(e) {
  if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, results.length - 1); renderDropdown(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); renderDropdown(); }
  else if (e.key === 'Enter') {
    if (activeIdx >= 0 && results[activeIdx]) { e.preventDefault(); location.hash = results[activeIdx].href; closeSearch(); }
  } else if (e.key === 'Escape') { closeSearch(); inputEl.blur(); }
}

function closeSearch() {
  if (dropdownEl) dropdownEl.classList.remove('search-open');
  activeIdx = -1;
}

export async function initSearch() {
  inputEl = document.getElementById('global-search');
  dropdownEl = document.getElementById('global-search-results');
  if (!inputEl) return;

  await buildIndex().catch(() => {});

  inputEl.addEventListener('input', (e) => runQuery(e.target.value));
  inputEl.addEventListener('keydown', onKeydown);
  inputEl.addEventListener('focus', () => { if (inputEl.value.trim()) runQuery(inputEl.value); });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.global-search')) closeSearch();
  });

  // Delegate clicks on results (they're anchors, but intercept to close cleanly)
  dropdownEl?.addEventListener('click', () => closeSearch());

  // Ctrl/Cmd+K focuses search; "/" focuses search when not already typing
  document.addEventListener('keydown', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      inputEl.focus();
      inputEl.select();
    } else if (e.key === '/' && !typing) {
      e.preventDefault();
      inputEl.focus();
    }
  });
}
