/**
 * pages/cheatsheet.js — Cheat Sheet Page
 * Quick reference formulas for a given subject.
 */
export async function renderCheatsheet(subjectId) {
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="page-loading">
      <div class="page-loading__spinner"></div>
      <div class="page-loading__text">Loading cheat sheet…</div>
    </div>`;

  let manifest;
  try {
    const mod = await import(`../data/${subjectId}/index.js`);
    manifest = mod.default;
  } catch(e) {
    app.innerHTML = `<div class="empty-state"><h2>Cheat sheet not found</h2></div>`;
    return;
  }

  const cards = await Promise.all(
    manifest.chapters.map(async ch => {
      try {
        const mod = await import(`../data/${subjectId}/${ch.id}.js`);
        const data = mod.default;
        const formulaRows = (data.formulas || []).map(f =>
          `<tr><td class="cs-td cs-td--name">${f.name}</td><td class="cs-td"><code>${f.formula}</code></td>${f.example ? `<td class="cs-td cs-td--ex">${f.example}</td>` : '<td></td>'}</tr>`
        ).join('');
        return formulaRows ? `
          <div class="cs-card">
            <div class="cs-card__title">${data.icon || ''} ${data.title}</div>
            <div class="cs-table-wrap">
              <table class="cs-table"><thead><tr><th>Name</th><th>Formula</th><th>Example</th></tr></thead><tbody>${formulaRows}</tbody></table>
            </div>
          </div>` : '';
      } catch { return ''; }
    })
  );

  app.innerHTML = `
    <div class="page page--cheatsheet">
      <h1 class="page-title">${manifest.label} — Cheat Sheet</h1>
      <div class="cs-grid">${cards.join('')}</div>
    </div>
  `;
}
