/**
 * pages/ai-mock.js — AI Mock Test Generator (config screen)
 *
 * Lets the user pick focus (weak-topic / mixed / SQL-50 / DSA / aptitude),
 * question count and duration, then builds a personalised test from the
 * real question banks via modules/mock-generator.js and hands it to the
 * existing mock engine (pages/mock.js renderMock).
 */
import { buildMockTest } from '../modules/mock-generator.js';
import { analyzeWeakness } from '../modules/ai.js';
import { renderMock } from './mock.js';

const FOCUS_OPTIONS = [
  { id: 'weak',    label: 'Weak-Topic Focus', desc: 'Biased toward your weakest chapters (from study history).' },
  { id: 'mixed',   label: 'Mixed Revision',   desc: 'Balanced aptitude + DSA + SQL across the syllabus.' },
  { id: 'aptitude',label: 'Aptitude Only',    desc: 'Pure quant / logical / verbal MCQs.' },
  { id: 'dsa',     label: 'DSA Concepts',     desc: 'Pattern & data-structure concept MCQs.' },
  { id: 'sql50',   label: 'SQL Top 50',       desc: 'Curated SQL-50 technique questions.' },
];

export async function renderAIMock() {
  const app = document.getElementById('page-content');
  const report = analyzeWeakness();
  const weakSummary = report.hasData
    ? report.topics.slice(0, 5).map(t => t.label).join(' · ')
    : 'No weak topics yet — solve some chapters first, or pick "Mixed Revision".';

  app.innerHTML = `
    <div class="page page--ai-mock" style="max-width: 760px; margin: 0 auto; padding: var(--space-6) var(--space-4);">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom: 8px;">
        <span class="badge badge--ai" style="font-size:10px;">AI</span>
        <span style="font-size:11px; color:var(--text-muted); font-weight:500;">Runs offline · built from your question banks</span>
      </div>
      <h1 class="page-title" style="font-size: var(--text-2xl); margin-bottom: 6px;">Personalised Mock Test</h1>
      <p style="color: var(--text-secondary); font-size: var(--text-sm); margin-bottom: 22px;">
        Pick a focus and we'll assemble a test from your real chapters, weighted toward the areas you're weakest in.
      </p>

      <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-5);">
        <label style="display:block; font-size: var(--text-xs); text-transform:uppercase; letter-spacing:var(--tracking-wide); color:var(--text-muted); font-weight:700; margin-bottom:10px;">Focus</label>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap:10px;" id="focus-grid">
          ${FOCUS_OPTIONS.map(f => `
            <button class="ai-mock-focus ${f.id === 'weak' ? 'active' : ''}" data-focus="${f.id}">
              <div class="focus-label">${f.label}</div>
              <div class="focus-desc">${f.desc}</div>
            </button>`).join('')}
        </div>

        <div style="display:flex; gap:20px; flex-wrap:wrap; margin-top:22px;">
          <div style="flex:1; min-width:160px;">
            <label style="display:block; font-size: var(--text-xs); text-transform:uppercase; letter-spacing:var(--tracking-wide); color:var(--text-muted); font-weight:700; margin-bottom:8px;">Questions</label>
            <select id="ai-mock-count" class="input-field" style="width:100%;">
              <option value="15">15</option>
              <option value="30" selected>30</option>
              <option value="50">50</option>
            </select>
          </div>
          <div style="flex:1; min-width:160px;">
            <label style="display:block; font-size: var(--text-xs); text-transform:uppercase; letter-spacing:var(--tracking-wide); color:var(--text-muted); font-weight:700; margin-bottom:8px;">Duration (min)</label>
            <select id="ai-mock-minutes" class="input-field" style="width:100%;">
              <option value="15">15</option>
              <option value="30" selected>30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card" style="padding:14px 16px; margin-bottom: var(--space-6); background:var(--bg-secondary); border-left:3px solid var(--accent);">
        <div style="font-size:11px; text-transform:uppercase; letter-spacing:var(--tracking-wide); color:var(--text-muted); font-weight:700; margin-bottom:4px;">Detected weak areas</div>
        <div style="font-size:var(--text-sm); color:var(--text-secondary);">${weakSummary}</div>
      </div>

      <button id="ai-mock-generate" class="btn btn-primary" style="width:100%; justify-content:center; padding:14px; font-size:var(--text-md); font-weight:700;">
        Generate & Start Test
      </button>

      <p id="ai-mock-status" style="text-align:center; color:var(--text-muted); font-size:var(--text-xs); margin-top:12px; min-height:16px;"></p>
    </div>
  `;

  let selectedFocus = 'weak';
  document.querySelectorAll('.ai-mock-focus').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ai-mock-focus').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFocus = btn.dataset.focus;
    });
  });

  document.getElementById('ai-mock-generate').addEventListener('click', async () => {
    const statusEl = document.getElementById('ai-mock-status');
    statusEl.textContent = 'Generating your personalised test…';
    const count = parseInt(document.getElementById('ai-mock-count').value, 10);
    const minutes = parseInt(document.getElementById('ai-mock-minutes').value, 10);

    try {
      const mockData = await buildMockTest({ focus: selectedFocus, count, minutes });
      statusEl.textContent = '';
      // Hand off to the existing mock engine (intro → test → results).
      await renderMock(null, mockData);
    } catch (e) {
      console.error(e);
      statusEl.textContent = 'Failed to generate test: ' + (e?.message || e);
    }
  });
}
