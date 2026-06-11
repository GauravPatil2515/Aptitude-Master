/**
 * pages/practice.js — Practice / Quiz Page
 * Full-screen one-question-at-a-time quiz with timer, hints, AI explain.
 */
import { store } from '../state/store.js';

export async function renderPractice(subjectId, chapterId) {
  const app = document.getElementById('page-content');
  app.innerHTML = `<div class="page-loading">Loading questions…</div>`;

  let chapter;
  try {
    const mod = await import(`../data/${subjectId}/${chapterId}.js`);
    chapter = mod.default;
  } catch(e) {
    app.innerHTML = `<div class="empty-state"><h2>No questions found</h2></div>`;
    return;
  }

  const questions = chapter.questions || [];
  if (!questions.length) {
    app.innerHTML = `<div class="empty-state"><h2>No questions for this chapter yet.</h2>
      <a href="#/chapter/${subjectId}/${chapterId}" class="btn btn--primary">← Back to Notes</a></div>`;
    return;
  }

  let current = 0;
  let score = 0;
  let answered = false;
  let timerVal = 0;
  let timerInterval = null;
  const flagged = new Set();

  function renderQ() {
    answered = false;
    clearInterval(timerInterval);
    timerVal = questions[current].timeLimit ?? 90;

    const q = questions[current];
    app.innerHTML = `
      <div class="page page--practice">
        <div class="practice-header">
          <div class="practice-meta">
            <span class="badge badge--subject">${chapter.title}</span>
            <span class="practice-counter">Q ${current + 1} of ${questions.length}</span>
          </div>
          <div class="practice-timer" id="practice-timer">⏱ ${timerVal}s</div>
          <a href="#/chapter/${subjectId}/${chapterId}" class="btn btn--ghost btn--sm">← Notes</a>
        </div>

        <div class="practice-card">
          <p class="practice-question">${q.text}</p>
          <div class="practice-options" id="practice-options">
            ${q.options.map((opt, i) => `
              <button class="option-btn" data-idx="${i}">${String.fromCharCode(65+i)}) ${opt}</button>
            `).join('')}
          </div>
        </div>

        <div class="practice-actions">
          <button class="btn btn--ghost" id="skip-btn">Skip</button>
          <button class="btn btn--ghost" id="hint-btn">Hint 💡</button>
          <button class="btn btn--ghost ${flagged.has(current) ? 'btn--flagged' : ''}" id="flag-btn">
            ${flagged.has(current) ? '⭐ Flagged' : 'Mark ⭐'}
          </button>
        </div>

        <div class="practice-feedback" id="practice-feedback" style="display:none"></div>
      </div>
    `;

    // Timer
    timerInterval = setInterval(() => {
      timerVal--;
      const el = document.getElementById('practice-timer');
      if (el) el.textContent = `⏱ ${timerVal}s`;
      if (timerVal <= 0) { clearInterval(timerInterval); handleAnswer(-1); }
    }, 1000);

    // Option click
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx)));
    });

    document.getElementById('skip-btn')?.addEventListener('click', () => nextQ());
    document.getElementById('flag-btn')?.addEventListener('click', () => {
      flagged.has(current) ? flagged.delete(current) : flagged.add(current);
      renderQ();
    });
    document.getElementById('hint-btn')?.addEventListener('click', () => {
      const fb = document.getElementById('practice-feedback');
      if (fb) { fb.style.display = 'block'; fb.innerHTML = `<div class="feedback feedback--hint">💡 ${q.hint || 'Try eliminating wrong answers first.'}</div>`; }
    });
  }

  function handleAnswer(idx) {
    if (answered) return;
    answered = true;
    clearInterval(timerInterval);
    const q = questions[current];
    const correct = idx === q.answer;
    if (correct) score++;

    document.querySelectorAll('.option-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add('option-btn--correct');
      else if (i === idx) btn.classList.add('option-btn--wrong');
    });

    const fb = document.getElementById('practice-feedback');
    if (fb) {
      fb.style.display = 'block';
      fb.innerHTML = `
        <div class="feedback ${correct ? 'feedback--correct' : 'feedback--wrong'}">
          ${correct ? '✅ Correct!' : '❌ Wrong!'}
          <span class="feedback__explanation">${q.explanation || ''}</span>
        </div>
        <div class="feedback-actions">
          <button class="btn btn--ghost btn--sm" id="ai-explain-btn">Ask AI to Explain →</button>
          <button class="btn btn--primary btn--sm" id="next-btn">${current < questions.length - 1 ? 'Next →' : 'Finish ✓'}</button>
        </div>
      `;
      document.getElementById('next-btn')?.addEventListener('click', () => nextQ());
      document.getElementById('ai-explain-btn')?.addEventListener('click', async () => {
        const btn = document.getElementById('ai-explain-btn');
        if (btn) btn.textContent = '⏳ Asking AI…';
        try {
          const { askAI } = await import('../api/ai.js');
          const reply = await askAI(
            `You are a placement exam tutor. Explain aptitude questions step by step.`,
            `Explain this question: "${q.text}" — Correct answer: ${q.options[q.answer]}. Explanation: ${q.explanation}`
          );
          if (btn) { btn.textContent = ''; btn.className = 'ai-reply'; btn.textContent = reply; }
        } catch(e) { if (btn) btn.textContent = 'AI unavailable'; }
      });
    }
  }

  function nextQ() {
    clearInterval(timerInterval);
    if (current < questions.length - 1) { current++; renderQ(); }
    else showResults();
  }

  function showResults() {
    const pct = Math.round((score / questions.length) * 100);
    store.setScore(subjectId, chapterId, pct);
    app.innerHTML = `
      <div class="page page--results">
        <div class="results-card">
          <div class="results-card__icon">${pct >= 70 ? '🎉' : '📚'}</div>
          <h2 class="results-card__title">${pct >= 70 ? 'Great job!' : 'Keep practicing!'}</h2>
          <div class="results-card__score">${score} / ${questions.length}</div>
          <div class="results-card__pct">${pct}%</div>
          <div class="results-card__actions">
            <a href="#/practice/${subjectId}/${chapterId}" class="btn btn--primary">Try Again</a>
            <a href="#/chapter/${subjectId}/${chapterId}" class="btn btn--ghost">← Back to Notes</a>
            <a href="#/subject/${subjectId}" class="btn btn--ghost">All Chapters</a>
          </div>
        </div>
      </div>
    `;
  }

  renderQ();
}
