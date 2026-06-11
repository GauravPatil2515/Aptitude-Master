/**
 * pages/cheatsheet.js — Quick Reference Cheat Sheet per subject
 */
export async function renderCheatsheet(subjectId) {
  const app = document.getElementById('page-content');
  app.innerHTML = '<div class="skeleton-page"></div>';

  let manifest;
  try {
    const mod = await import(`../data/${subjectId}/index.js`);
    manifest = mod.default;
  } catch {
    app.innerHTML = `<div class="empty-state"><h2>No cheat sheet for "${subjectId}"</h2></div>`;
    return;
  }

  const allFormulas = manifest.chapters.flatMap(ch => {
    const formulas = ch.formulas ?? [];
    return formulas.map(f => ({ ...f, chapter: ch.title }));
  });

  app.innerHTML = `
    <div class="page page--cheatsheet">
      <div class="cheatsheet-header">
        <h1>${manifest.icon} ${manifest.title} — Cheat Sheet</h1>
        <button class="btn btn--ghost btn--sm" onclick="window.print()">🖨️ Print</button>
      </div>
      <div class="cheatsheet-grid">
        ${allFormulas.map(f => `
          <div class="cheatsheet-card">
            <div class="cheatsheet-card__chapter">${f.chapter}</div>
            <div class="cheatsheet-card__name">${f.name}</div>
            <code class="cheatsheet-card__formula">${f.formula}</code>
            ${f.example ? `<div class="cheatsheet-card__example">${f.example}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
