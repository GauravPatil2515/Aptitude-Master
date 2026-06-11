/**
 * components/quiz-card.js — Reusable MCQ Card Component
 * Used by practice.js and any inline quiz.
 */
export function createQuizCard({ question, options, onAnswer }) {
  const card = document.createElement('div');
  card.className = 'quiz-card';
  card.innerHTML = `
    <p class="quiz-card__question">${question.text}</p>
    <div class="quiz-card__options">
      ${options.map((opt, i) => `
        <button class="option-btn" data-idx="${i}">
          <span class="option-btn__label">${String.fromCharCode(65 + i)}</span>
          ${opt}
        </button>`).join('')}
    </div>
  `;
  card.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (card.dataset.answered) return;
      card.dataset.answered = '1';
      onAnswer(parseInt(btn.dataset.idx), card);
    });
  });
  return card;
}

export function markAnswer(card, selectedIdx, correctIdx) {
  card.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIdx) btn.classList.add('option-btn--correct');
    else if (i === selectedIdx) btn.classList.add('option-btn--wrong');
  });
}
