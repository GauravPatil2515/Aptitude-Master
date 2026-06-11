/**
 * pages/practice.js — Practice / Quiz Page
 * Full-screen one-question-at-a-time with timer, hints, AI explain
 */
import { store } from '../state/store.js';
import Router from '../router.js';

let _session = null;

export async function renderPractice(subjectId, chapterId) {
  const app = document.getElementById('page-content');
  app.innerHTML = '<div class="skeleton-page"></div>';

  const key = `${subjectId}-${chapterId}`;
  let chapterData;
  try {
    const mod = await import(`../data/${subjectId}/${chapterId}.js`);
    chapterData = mod.default;
  } catch {
    Router._render404(`/practice/${subjectId}/${chapterId}`);
    return;
  }

  const questions = chapterData.questions ?? [];
  if (!questions.length) {
    app.innerHTML = `<div class="empty-state"><div class="empty-state__icon">📭</div><h2>No questions yet</h2><p>Check back soon!</p></div>`;
    return;
  }

  _session = {
    questions,
    current: 0,
    answers: {},
    marked: new Set(),
    startTime: Date.now(),
    chapterId: chapterData.id,
    subjectId,
    aiTutorPrompt: chapterData.aiTutorPrompt ?? '',
  };

  _renderQuestion(app);
}

function _renderQuestion(app) {
  const { questions, current, marked } = _session;
  const q = questions[current];
  const total = questions.length;
  const progress = Math.round(((current) / total) * 100);

  app.innerHTML = `
    <div class="page page--practice">

      <div class="practice-topbar">
        <button class="btn btn--ghost btn--sm" onclick="Router.navigate('#/chapter/${_session.subjectId}/${_session.chapterId.replace(_session.subjectId + '-', '')}')">
          ← Back
        </button>
        <div class="practice-progress">
          <div class="practice-progress__bar" style="width:${progress}%"></div>
        </div>
        <div class="practice-meta">
          <span>Q ${current + 1} of ${total}</span>
          <span class="practice-timer" id="practice-timer">⏱ 00:00</span>
        </div>
      </div>

      <div class="practice-body">
        <div class="question-card" id="question-card">
          <div class="question-card__tags">
            <span class="badge badge--${q.difficulty}">${q.difficulty}</span>
            ${q.tags?.map(t => `<span class="badge badge--ghost">${t}</span>`).join('') ?? ''}
            ${marked.has(current) ? '<span class="badge badge--amber">⭐ Marked</span>' : ''}
          </div>

          <p class="question-card__text">${q.text}</p>

          <div class="options-grid" id="options-grid">
            ${q.options.map((opt, i) => `
              <button class="option-btn" data-index="${i}"
                      onclick="selectAnswer(${i})">
                <span class="option-btn__letter">${String.fromCharCode(65 + i)}</span>
                <span class="option-btn__text">${opt}</span>
              </button>
            `).join('')}
          </div>

          <div class="question-actions">
            <button class="btn btn--ghost btn--sm" onclick="skipQuestion()">Skip</button>
            <button class="btn btn--ghost btn--sm" onclick="toggleMark(${current})">
              ${marked.has(current) ? '⭐ Unmark' : '☆ Mark for Review'}
            </button>
          </div>
        </div>

        <!-- Explanation (shown after answer) -->
        <div class="explanation-card" id="explanation-card" style="display:none">
          <div class="explanation-card__result" id="result-indicator"></div>
          <div class="explanation-card__text" id="explanation-text"></div>
          <div class="explanation-card__actions">
            <button class="btn btn--ghost btn--sm" onclick="askAIExplain()">🧠 Ask AI Different Method</button>
            <button class="btn btn--primary" onclick="nextQuestion()"
                    id="next-btn">${current + 1 < total ? 'Next Question →' : 'See Results'}</button>
          </div>
          <div class="ai-explain-output" id="ai-explain-output"></div>
        </div>
      </div>

    </div>
  `;

  _startTimer();
}

let _timerInterval = null;
function _startTimer() {
  clearInterval(_timerInterval);
  let elapsed = 0;
  _timerInterval = setInterval(() => {
    elapsed++;
    const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const ss = String(elapsed % 60).padStart(2, '0');
    const el = document.getElementById('practice-timer');
    if (el) el.textContent = `⏱ ${mm}:${ss}`;
  }, 1000);
}

window.selectAnswer = function(idx) {
  if (!_session) return;
  const q = _session.questions[_session.current];
  const correct = idx === q.answer;
  _session.answers[_session.current] = { chosen: idx, correct };
  clearInterval(_timerInterval);

  // Visual feedback on options
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('option-btn--correct');
    else if (i === idx && !correct) btn.classList.add('option-btn--wrong');
  });

  const expl = document.getElementById('explanation-card');
  const result = document.getElementById('result-indicator');
  const explText = document.getElementById('explanation-text');
  if (expl && result && explText) {
    expl.style.display = 'block';
    result.textContent = correct ? '✅ Correct!' : '❌ Incorrect';
    result.className = 'explanation-card__result ' + (correct ? 'text-success' : 'text-error');
    explText.textContent = q.explanation ?? '';
  }

  store.recordAnswer(_session.chapterId, q.id, correct);
};

window.skipQuestion = function() {
  clearInterval(_timerInterval);
  _session.current++;
  if (_session.current >= _session.questions.length) _renderResults();
  else _renderQuestion(document.getElementById('page-content'));
};

window.nextQuestion = function() {
  _session.current++;
  if (_session.current >= _session.questions.length) _renderResults();
  else _renderQuestion(document.getElementById('page-content'));
};

window.toggleMark = function(idx) {
  if (_session.marked.has(idx)) _session.marked.delete(idx);
  else _session.marked.add(idx);
  _renderQuestion(document.getElementById('page-content'));
};

window.askAIExplain = async function() {
  if (!_session) return;
  const out = document.getElementById('ai-explain-output');
  if (!out) return;
  out.innerHTML = '<span class="ai-typing">Thinking…</span>';
  const q = _session.questions[_session.current - 1] ?? _session.questions[_session.current];
  try {
    const { askAI } = await import('../api/ai.js');
    const reply = await askAI(
      _session.aiTutorPrompt || 'You are an expert aptitude tutor.',
      `Explain this question step-by-step in a different method:\n${q.text}\nCorrect Answer: ${q.options[q.answer]}\n${q.explanation ?? ''}`
    );
    out.innerHTML = reply;
  } catch {
    out.innerHTML = '⚠️ AI unavailable.';
  }
};

function _renderResults() {
  clearInterval(_timerInterval);
  const app = document.getElementById('page-content');
  const { questions, answers } = _session;
  const total = questions.length;
  const correct = Object.values(answers).filter(a => a.correct).length;
  const pct = Math.round((correct / total) * 100);
  const timeTaken = Math.round((Date.now() - _session.startTime) / 1000);

  app.innerHTML = `
    <div class="page page--results">
      <div class="results-card">
        <div class="results-card__score ${pct >= 70 ? 'text-success' : 'text-error'}">${pct}%</div>
        <h2 class="results-card__title">${pct >= 70 ? '🎉 Great work!' : '📚 Keep practising!'}</h2>
        <p class="results-card__meta">${correct} / ${total} correct · ${Math.floor(timeTaken/60)}m ${timeTaken%60}s</p>
        <div class="results-actions">
          <button class="btn btn--ghost" onclick="renderPractice('${_session.subjectId}', '${_session.chapterId.replace(_session.subjectId+'-','')}')">Retry</button>
          <a href="#/subject/${_session.subjectId}" class="btn btn--primary">Back to Subject</a>
        </div>
      </div>
    </div>
  `;
}
