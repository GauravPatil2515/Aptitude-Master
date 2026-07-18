/**
 * modules/ai.js — Phase-B AI Advisor / Weak-Topic Detector
 *
 * Self-contained ES module (loaded by pages/home.js, also exposes a global
 * `AIAdvisorModule` so it can be mounted from `index.html` if desired).
 *
 * What it does:
 *   1. Reads `store` (mistakes, low quiz scores, stuck DSA/SQL problems).
 *   2. Derives a ranked list of weak topics.
 *   3. Renders an "AI Advisor" card with weak-topic chips + a
 *      "Generate my focus plan" button.
 *   4. On click, asks the Groq-backed AI (api/ai.js) for a prioritised
 *      daily study plan built from the analysis. Degrades gracefully when no
 *      API key is configured (shows the local analysis only).
 *
 * No secrets here — the key lives in localStorage (user Settings) or in the
 * Vercel proxy (server-side GROQ_API_KEY). See api/ai.js / api/groq.js.
 */

import { store } from '../state/store.js';
import { askAI } from '../api/ai.js';

const SUBJECT_LABELS = {
  aptitude: 'Aptitude',
  'core-cs': 'Core CS',
  dsa: 'DSA',
  sql: 'SQL',
  ml: 'ML & AI',
  'ai-engineer': 'AI Engineer',
};

/** Pull chapter id out of a progress/score/mistake key like "aptitude/percentages". */
function splitKey(key) {
  const idx = key.indexOf('/');
  if (idx === -1) return { subject: key, chapter: null };
  return { subject: key.slice(0, idx), chapter: key.slice(idx + 1) };
}

/**
 * Analyse store state and return a ranked weak-topic report.
 * @returns {{topics: Array<{subject, chapter, label, score, mistakes, stuck}>, hasData: boolean}}
 */
export function analyzeWeakness() {
  const s = store.get();
  const scores = s.scores || {};
  const mistakes = s.mistakes || [];
  const dsa = s.dsa || {};
  const sql = s.sql || {};

  // Aggregate weight per chapter: low score + mistakes + stuck problems.
  const tally = {}; // key -> { subject, chapter, score, mistakes, stuck }

  const ensure = (subject, chapter) => {
    const key = chapter ? `${subject}/${chapter}` : subject;
    if (!tally[key]) tally[key] = { subject, chapter, score: null, mistakes: 0, stuck: 0 };
    return tally[key];
  };

  // Low quiz scores (< 70%) count as weak.
  for (const [key, pct] of Object.entries(scores)) {
    if (typeof pct !== 'number' || pct >= 70) continue;
    const { subject, chapter } = splitKey(key);
    ensure(subject, chapter).score = pct;
  }

  // Logged mistakes.
  for (const m of mistakes) {
    const { subject, chapter } = splitKey(m.chapterId || '');
    if (!chapter) continue;
    ensure(subject, chapter).mistakes += 1;
  }

  // Stuck DSA / SQL problems (in_progress or todo, but give todo less weight).
  for (const [id, status] of Object.entries(dsa)) {
    if (status === 'completed') continue;
    const node = ensure('dsa', id);
    node.stuck += status === 'in_progress' ? 2 : 1;
  }
  for (const [id, status] of Object.entries(sql)) {
    if (status === 'completed') continue;
    const node = ensure('sql', id);
    node.stuck += status === 'in_progress' ? 2 : 1;
  }

  const topics = Object.values(tally)
    .map(t => {
      // Composite weakness score: each mistake = 15, stuck = 10, low score penalty up to 30.
      let w = t.mistakes * 15 + t.stuck * 10;
      if (t.score !== null) w += Math.max(0, 30 - t.score / 3);
      return { ...t, weight: Math.round(w) };
    })
    .filter(t => t.weight > 0)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 6)
    .map(t => ({
      subject: t.subject,
      chapter: t.chapter,
      label: t.chapter
        ? `${SUBJECT_LABELS[t.subject] || t.subject}: ${t.chapter.replace(/-/g, ' ')}`
        : (SUBJECT_LABELS[t.subject] || t.subject),
      score: t.score,
      mistakes: t.mistakes,
      stuck: t.stuck,
    }));

  return { topics, hasData: topics.length > 0 };
}

/** Build a local fallback plan string when no AI key is present. */
function localPlan(report) {
  const lines = report.topics.map((t, i) => {
    const hints = [];
    if (t.score !== null) hints.push(`score ${t.score}%`);
    if (t.mistakes) hints.push(`${t.mistakes} mistake${t.mistakes > 1 ? 's' : ''}`);
    if (t.stuck) hints.push(`${t.stuck} problem${t.stuck > 1 ? 's' : ''} pending`);
    return `${i + 1}. ${t.label}${hints.length ? ` — ${hints.join(', ')}` : ''}`;
  });
  return [
    'Based on your stored activity (no AI key configured):',
    ...lines,
    '',
    'Tip: add your Groq API key in Settings to get an AI-generated, prioritised study plan.',
  ].join('\n');
}

/**
 * Render the advisor card into `container`.
 * @param {HTMLElement} container
 */
export function renderAIAdvisor(container) {
  if (!container) return;
  const report = analyzeWeakness();

  const chips = report.hasData
    ? report.topics.map(t => `
        <button class="advisor-chip" data-href="#${t.chapter ? `/chapter/${t.subject}/${t.chapter}` : `/subject/${t.subject}`}"
                title="${t.label}">
          ${t.label}
          ${t.score !== null ? `<span class="advisor-chip__score">${t.score}%</span>` : ''}
          ${t.mistakes ? `<span class="advisor-chip__badge">${t.mistakes}✗</span>` : ''}
        </button>`).join('')
    : `<p class="advisor-empty">No weak areas detected yet. Complete a quiz or log a mistake to get a personalised focus plan.</p>`;

  container.innerHTML = `
    <section class="home-section advisor-section">
      <h2 class="section-title" style="font-family: var(--font-display); font-size: var(--text-lg); font-weight: 800; color: var(--text-primary);">
        AI Study Advisor
        <span class="badge badge--ai" style="font-size: 9px; vertical-align: middle; margin-left: 6px;">weak-topic detector</span>
      </h2>
      <div class="card advisor-card">
        <div class="advisor-chips">${chips}</div>
        <div class="advisor-actions">
          <button id="advisor-generate" class="btn btn--primary btn--sm" style="font-weight: 700;">
            Generate my focus plan
          </button>
        </div>
        <div id="advisor-output" class="advisor-output" hidden></div>
      </div>
    </section>
  `;

  // Wire chip navigation.
  container.querySelectorAll('.advisor-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const href = chip.getAttribute('data-href');
      if (href) window.location.hash = href;
    });
  });

  // Wire plan generation.
  const btn = container.querySelector('#advisor-generate');
  const out = container.querySelector('#advisor-output');
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = 'Thinking…';
    out.hidden = false;
    out.innerHTML = '<div class="page-loading__text">Analysing your progress…</div>';

    const summary = report.topics
      .map(t => `- ${t.label} (${[
        t.score !== null ? `score ${t.score}%` : null,
        t.mistakes ? `${t.mistakes} mistakes` : null,
        t.stuck ? `${t.stuck} pending problems` : null,
      ].filter(Boolean).join(', ')})`)
      .join('\n');

    const systemPrompt = `You are a concise placement-prep study advisor for Indian campus recruitment (TCS, Infosys, Wipro, etc.). Given a student's weak topics, produce a tight, prioritised daily focus plan (max 6 bullet points, each with a time estimate and a concrete action). Be direct and encouraging. Avoid markdown headers.`;

    const userMessage = `My weak areas:\n${summary || '(none logged yet — suggest a balanced starting plan for a beginner)'}\n\nGive me today's focus plan.`;

    try {
      const reply = await askAI(systemPrompt, userMessage);
      out.innerHTML = `<div class="advisor-plan">${reply.replace(/\\n/g, '<br>')}</div>`;
    } catch (err) {
      // Graceful fallback — show local analysis without AI.
      out.innerHTML = `<div class="advisor-plan">${localPlan(report).replace(/\\n/g, '<br>')}</div>`;
      const note = document.createElement('p');
      note.className = 'advisor-note';
      note.textContent = `(AI unavailable: ${err.message})`;
      out.appendChild(note);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Regenerate plan';
    }
  });
}

// Global handle for the modules pattern (optional mount from index.html).
export const AIAdvisorModule = { analyzeWeakness, renderAIAdvisor };
if (typeof window !== 'undefined') window.AIAdvisorModule = AIAdvisorModule;
