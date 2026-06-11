/**
 * pages/dsa.js — DSA Tracker Page
 * Topic-grouped problem list with difficulty filters and completion tracking
 */
import { store } from '../state/store.js';

export async function renderDSA() {
  const app = document.getElementById('page-content');
  app.innerHTML = '<div class="skeleton-page"></div>';

  const { default: dsaData } = await import('../data/dsa/index.js');
  const state = store.get();

  const filters = ['all', 'easy', 'medium', 'hard'];
  let activeFilter = 'all';

  function render(filter) {
    const topics = dsaData.topics.map(topic => {
      const problems = topic.problems.filter(
        p => filter === 'all' || p.difficulty === filter
      );
      return { ...topic, problems };
    }).filter(t => t.problems.length > 0);

    const totalProblems = dsaData.topics.reduce((a, t) => a + t.problems.length, 0);
    const solvedProblems = Object.values(state.dsa ?? {}).filter(Boolean).length;

    app.innerHTML = `
      <div class="page page--dsa">
        <div class="dsa-header">
          <h1 class="dsa-header__title">📊 DSA Tracker</h1>
          <div class="dsa-header__meta">
            <span class="badge badge--blue">${solvedProblems} / ${totalProblems} solved</span>
          </div>
        </div>

        <div class="dsa-filters">
          ${filters.map(f => `
            <button class="filter-btn ${f === filter ? 'filter-btn--active' : ''}" data-filter="${f}"
                    onclick="setDSAFilter('${f}')">
              ${f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          `).join('')}
        </div>

        <div class="dsa-topics">
          ${topics.map(topic => `
            <div class="dsa-topic-card">
              <div class="dsa-topic-card__header">
                <h2 class="dsa-topic-card__title">${topic.icon} ${topic.title}</h2>
                <span class="text-muted">${topic.problems.filter(p => state.dsa?.[p.id]).length} / ${topic.problems.length}</span>
              </div>
              <div class="problem-list">
                ${topic.problems.map(p => {
                  const solved = state.dsa?.[p.id] ?? false;
                  return `
                  <div class="problem-row ${solved ? 'problem-row--solved' : ''}">
                    <input type="checkbox" class="problem-row__check" ${solved ? 'checked' : ''}
                           onchange="toggleDSA('${p.id}', this.checked)" />
                    <span class="problem-row__title">${p.title}</span>
                    <span class="badge badge--${p.difficulty}">${p.difficulty}</span>
                    ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener" class="problem-row__link">LeetCode ↗</a>` : ''}
                  </div>`;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.setDSAFilter = (f) => { activeFilter = f; render(f); };
  window.toggleDSA = (id, val) => { store.setDSA(id, val); };

  render(activeFilter);
}
