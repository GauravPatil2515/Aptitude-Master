/**
 * pages/mock.js — TCS Prime/Digital Mock Test Page
 */
import { store } from '../state/store.js';

export async function renderMock(mockId) {
  const app = document.getElementById('page-content');

  // Clean up any existing mock timer
  if (window.mockTimerInterval) {
    clearInterval(window.mockTimerInterval);
    window.mockTimerInterval = null;
  }

  app.innerHTML = `
    <div class="page-loading">
      <div class="page-loading__spinner"></div>
      <div class="page-loading__text">Loading Mock Test…</div>
    </div>`;

  let mockData;
  try {
    const mod = await import(`../data/mocks/${mockId}.js`);
    mockData = mod.default;
  } catch (e) {
    app.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px;opacity:.5"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      </div>
        <h2>Mock Test Not Found</h2>
        <p>We couldn't load the mock test data: <code>${mockId}</code></p>
        <a href="#/home" class="btn btn--primary" style="margin-top:14px">Go Back Home</a>
      </div>`;
    return;
  }

  // State
  let started = false;
  let submitted = false;
  let answers = {}; // questionId -> selectedOptionIndex
  let timeLeft = mockData.timeLimit;
  let activeSection = mockData.sections[0].id;

  function renderIntro() {
    app.innerHTML = `
      <div class="page page--mock">
        <div class="welcome-overlay" style="max-width: 680px; margin: 30px auto; padding: 40px var(--space-6);">
          <div class="results-card__icon" style="font-size:48px; margin-bottom: 20px;"></div>
          <h1 class="welcome-title" style="font-size: var(--text-2xl);">${mockData.title}</h1>
          <p class="welcome-desc" style="margin-bottom: 30px;">
            This mock test is designed to simulate the exact pattern, style, and difficulty of the 
            <strong>TCS NQT, TCS Prime, and TCS Digital</strong> aptitude rounds.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: var(--space-3); margin-bottom: 30px; text-align: left;">
            <div class="card" style="padding: var(--space-4);">
              <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase;">Questions</div>
              <div style="font-size: var(--text-lg); font-weight: 800; color: var(--accent-indigo); margin-top: 4px;">50 Qs</div>
            </div>
            <div class="card" style="padding: var(--space-4);">
              <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase;">Time Limit</div>
              <div style="font-size: var(--text-lg); font-weight: 800; color: var(--accent-amber); margin-top: 4px;">90 Mins</div>
            </div>
            <div class="card" style="padding: var(--space-4);">
              <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase;">Sections</div>
              <div style="font-size: var(--text-lg); font-weight: 800; color: var(--accent-green); margin-top: 4px;">3 Parts</div>
            </div>
          </div>

          <div class="card" style="text-align: left; margin-bottom: 30px; background: var(--bg-secondary);">
            <h3 style="font-size: var(--text-base); font-weight: 700; margin-bottom: var(--space-3); display: flex; align-items: center; gap: 8px;">
            Instructions:
            </h3>
            <ul style="padding-left: 20px; color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.6;">
              <li><strong>No calculator allowed</strong> – practice mental arithmetic like the actual TCS exam.</li>
              <li><strong>Section A:</strong> Quantitative Aptitude (20 Questions)</li>
              <li><strong>Section B:</strong> Logical Reasoning (20 Questions)</li>
              <li><strong>Section C:</strong> Verbal Ability (10 Questions)</li>
              <li>Once you click start, the countdown timer will begin immediately.</li>
              <li>You can navigate to any question at any time using the side panel.</li>
            </ul>
          </div>

          <button id="start-mock-btn" class="btn btn-primary" style="padding: var(--space-3) 40px; font-size: var(--text-md); width:100%; justify-content:center;">
            Start Mock Test
          </button>
        </div>
      </div>
    `;

    document.getElementById('start-mock-btn')?.addEventListener('click', () => {
      started = true;
      startTimer();
      renderTest();
    });
  }

  function startTimer() {
    window.mockTimerInterval = setInterval(() => {
      timeLeft--;
      updateTimerUI();
      if (timeLeft <= 0) {
        clearInterval(window.mockTimerInterval);
        submitTest(true);
      }
    }, 1000);

    // Register router hashchange cleanup to clear timer if user navigates away
    window.addEventListener('hashchange', function cleanup() {
      if (window.mockTimerInterval) {
        clearInterval(window.mockTimerInterval);
        window.mockTimerInterval = null;
      }
      window.removeEventListener('hashchange', cleanup);
    });
  }

  function updateTimerUI() {
    const el = document.getElementById('mock-timer-display');
    if (!el) return;

    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    el.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (timeLeft <= 300) { // < 5 mins
      el.parentElement.className = 'practice-timer practice-timer--urgent';
    } else if (timeLeft <= 600) { // < 10 mins
      el.parentElement.style.borderColor = 'var(--accent-orange)';
      el.parentElement.style.color = 'var(--accent-orange)';
    }
  }

  function renderTest() {
    let globalIndex = 0;
    const sectionsHTML = mockData.sections.map(section => {
      const qsHTML = section.questions.map(q => {
        globalIndex++;
        const optsHTML = q.options.map((opt, oIdx) => {
          const isSelected = answers[q.id] === oIdx;
          return `
            <button class="option-btn ${isSelected ? 'selected' : ''}" data-qid="${q.id}" data-oidx="${oIdx}">
              <span class="option-btn__key">${String.fromCharCode(65 + oIdx)}</span>
              <span class="option-btn__label">${opt}</span>
            </button>
          `;
        }).join('');

        return `
          <div class="practice-card mock-question-card" id="q-card-${q.id}" data-qid="${q.id}">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: var(--space-3);">
              <span class="badge badge--subject" style="text-transform:none;">Q${globalIndex} · ${section.title.split(': ')[1]}</span>
              <span class="badge badge--tcs-nqt" style="font-size: 10px;">TCS Pattern</span>
            </div>
            <div class="practice-question" style="margin-bottom: var(--space-4);">${q.text}</div>
            <div class="practice-options" style="margin-bottom: 2px;">
              ${optsHTML}
            </div>
          </div>
        `;
      }).join('');

      return `
        <section id="sec-${section.id}" class="mock-section-block">
          <h2 style="font-family: var(--font-display); font-size: var(--text-lg); font-weight: 800; border-bottom: 1px solid var(--border-color); padding-bottom: var(--space-2); margin: var(--space-8) 0 var(--space-4); display: flex; align-items:center; gap: 8px;">
            ${section.id === 'quant' ? 'Quantitative' : section.id === 'logical' ? 'Logical' : 'Verbal'} — ${section.title}
          </h2>
          ${qsHTML}
        </section>
      `;
    }).join('');

    // Right Sidebar Grid
    let qGridIndex = 0;
    const gridItems = mockData.sections.map(section => {
      const items = section.questions.map(q => {
        qGridIndex++;
        const isAnswered = answers[q.id] !== undefined;
        return `
          <button class="mock-grid-btn ${isAnswered ? 'mock-grid-btn--answered' : ''}" id="grid-btn-${q.id}" data-qid="${q.id}">
            ${qGridIndex}
          </button>
        `;
      }).join('');

      return `
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform:uppercase; margin-bottom: 6px; letter-spacing:var(--tracking-wide);">${section.title.split(': ')[1]}</div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
            ${items}
          </div>
        </div>
      `;
    }).join('');

    app.innerHTML = `
      <div class="page page--mock-active" style="display: grid; grid-template-columns: 1fr 260px; gap: var(--space-6); position:relative; min-height: 80vh;">
        
        <!-- Left Column: Scrollable Questions -->
        <div class="mock-questions-container" style="max-width: 100%; min-width: 0;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: var(--space-5);">
            <h1 class="page-title" style="margin: 0; font-size: var(--text-xl);">Exam Console</h1>
            <div class="practice-timer" style="font-size: var(--text-md); padding: var(--space-2) var(--space-4);">
              <span id="mock-timer-display">--:--</span>
            </div>
          </div>
          
          <!-- Sticky Section Navigation Tabs -->
          <div class="card" style="padding: 6px; display:flex; gap: 4px; background: var(--bg-tertiary); position:sticky; top: 0; z-index:10; border-radius: var(--radius-md); margin-bottom: var(--space-4);">
            ${mockData.sections.map(sec => `
              <button class="btn btn--ghost btn--sm mock-tab-btn ${sec.id === activeSection ? 'btn-primary' : ''}" data-secid="${sec.id}" style="flex:1; padding: 8px;">
                ${sec.title.split(': ')[1]}
              </button>
            `).join('')}
          </div>

          <div class="mock-scroll-area">
            ${sectionsHTML}
          </div>
        </div>

        <!-- Right Column: Sticky Navigation Console -->
        <aside class="mock-console-aside" style="position: sticky; top: var(--space-6); height: calc(100vh - 120px); display:flex; flex-direction:column; gap: var(--space-4); max-height: calc(100vh - 120px); overflow-y:auto; padding-right: 2px;">
          <div class="card" style="padding: var(--space-4);">
            <h3 style="font-size: var(--text-sm); font-weight:700; margin-bottom: var(--space-3); color: var(--text-primary); text-transform:uppercase; letter-spacing: var(--tracking-snug);">
              Exam Console
            </h3>
            <div style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: var(--space-3);">
              Attempted: <strong id="attempted-count-display" style="color:var(--accent-indigo);">0</strong> / 50 questions
            </div>
            
            <div class="divider" style="margin: 10px 0;"></div>
            
            ${gridItems}
            
            <div class="divider" style="margin: 15px 0 10px 0;"></div>
            
            <button id="submit-exam-btn" class="btn btn-primary btn--full" style="padding: var(--space-2); font-size: var(--text-sm); font-weight:700;">
              Submit Exam
            </button>
          </div>
        </aside>

      </div>
    `;

    updateTimerUI();
    updateAttemptedCount();

    // Event listeners for tabs
    document.querySelectorAll('.mock-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const secId = btn.dataset.secid;
        document.querySelectorAll('.mock-tab-btn').forEach(b => b.classList.remove('btn-primary'));
        btn.classList.add('btn-primary');
        
        const target = document.getElementById(`sec-${secId}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Event listeners for options
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        const oidx = parseInt(btn.dataset.oidx);

        answers[qid] = oidx;

        // Toggle selected styling in current question card
        const card = btn.closest('.mock-question-card');
        card.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Mark grid btn as answered
        const gridBtn = document.getElementById(`grid-btn-${qid}`);
        if (gridBtn) gridBtn.classList.add('mock-grid-btn--answered');

        updateAttemptedCount();
      });
    });

    // Event listeners for question grid numbers
    document.querySelectorAll('.mock-grid-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        const qcard = document.getElementById(`q-card-${qid}`);
        if (qcard) {
          qcard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          qcard.style.borderColor = 'var(--accent-indigo)';
          setTimeout(() => {
            qcard.style.borderColor = 'var(--border-color)';
          }, 1500);
        }
      });
    });

    // Submit button
    document.getElementById('submit-exam-btn')?.addEventListener('click', () => {
      submitTest(false);
    });
  }

  function updateAttemptedCount() {
    const attempted = Object.keys(answers).length;
    const el = document.getElementById('attempted-count-display');
    if (el) el.textContent = attempted;
  }

  function submitTest(isAutoSubmit = false) {
    if (!isAutoSubmit) {
      const attempted = Object.keys(answers).length;
      const confirmSubmit = confirm(`Are you sure you want to submit your exam? You have attempted ${attempted} out of 50 questions.`);
      if (!confirmSubmit) return;
    }

    submitted = true;
    if (window.mockTimerInterval) {
      clearInterval(window.mockTimerInterval);
      window.mockTimerInterval = null;
    }

    renderResults();
  }

  function renderResults() {
    let totalQuestions = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const sectionStats = mockData.sections.map(section => {
      let secCorrect = 0;
      let secWrong = 0;
      let secUnanswered = 0;

      section.questions.forEach(q => {
        totalQuestions++;
        const userAns = answers[q.id];
        if (userAns === undefined) {
          secUnanswered++;
          unansweredCount++;
        } else if (userAns === q.answer) {
          secCorrect++;
          correctCount++;
        } else {
          secWrong++;
          wrongCount++;
        }
      });

      return {
        id: section.id,
        title: section.title.split(': ')[1],
        total: section.questions.length,
        correct: secCorrect,
        wrong: secWrong,
        unanswered: secUnanswered,
        score: secCorrect
      };
    });

    const overallScore = correctCount;
    const overallPct = Math.round((overallScore / totalQuestions) * 100);

    // Scoring evaluation based on Example.txt:
    // 50–60 Correct -> Strong chance for aptitude clearance
    // 40–49 Correct -> Competitive but needs improvement
    // 30–39 Correct -> Risky for Prime/Digital
    // Below 30 -> Need more timed practice
    // (Adjusted to our 50 questions scale)
    let evaluationTitle = "";
    let evaluationDesc = "";
    let evaluationColor = "";

    if (overallScore >= 40) {
      evaluationTitle = "Strong Chance (Clearance)";
      evaluationDesc = "Excellent! Your score is outstanding. You have a very high chance of clearing the TCS Prime/Digital aptitude cutoffs. Maintain this performance and continue coding practice!";
      evaluationColor = "var(--accent-green)";
    } else if (overallScore >= 30) {
      evaluationTitle = "Competitive (Needs polish)";
      evaluationDesc = "Good job! You are in the competitive bracket, but you should review your mistakes. You need to secure a few more marks to guarantee a safe zone for TCS Digital/Prime.";
      evaluationColor = "var(--accent-indigo)";
    } else if (overallScore >= 20) {
      evaluationTitle = "Risky (Insecure)";
      evaluationDesc = "Your score is on the borderline. For premium roles like TCS Prime or Digital, this profile is risky. Focus on high-ROI topics (Arithmetic, Blood Relations, Para Jumbles) to boost your score.";
      evaluationColor = "var(--accent-amber)";
    } else {
      evaluationTitle = "Needs Timed Practice";
      evaluationDesc = "Your score is below the clearance threshold. You need immediate timed practice. Identify weak areas, log your errors, and solve mixed aptitude sets daily under a strict time limit.";
      evaluationColor = "var(--accent-red)";
    }

    // Save score to central state helper
    const scores = { ...store.get().scores };
    scores[`mock/${mockData.id}`] = overallPct;
    store.set('scores', scores);

    // Render HTML Results Dashboard
    const cardsSectionHTML = sectionStats.map(s => {
      const pct = Math.round((s.correct / s.total) * 100);
      return `
        <div class="card" style="padding: var(--space-5);">
          <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; font-weight:700;">${s.title}</div>
          <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:8px;">
            <span style="font-size: var(--text-xl); font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">${s.correct} <span style="font-size: var(--text-sm); font-weight:400; color:var(--text-secondary);">/ ${s.total}</span></span>
            <span style="font-size: var(--text-sm); font-weight:700; color:var(--accent-indigo); font-family:var(--font-mono);">${pct}%</span>
          </div>
          <div class="progress-track" style="margin-top: 10px; height:4px;">
            <div class="progress-fill" style="width: ${pct}%; background: var(--accent);"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-top:10px; color: var(--text-secondary);">
            <span>Wrong: ${s.wrong}</span>
            <span>Skipped: ${s.unanswered}</span>
          </div>
        </div>
      `;
    }).join('');

    // review list of questions
    let reviewIndex = 0;
    const reviewQuestionsHTML = mockData.sections.map(section => {
      const questionsHTML = section.questions.map(q => {
        reviewIndex++;
        const userAns = answers[q.id];
        const isCorrect = userAns === q.answer;
        const isSkipped = userAns === undefined;

        let statusClass = "feedback--hint";
        let statusBadge = "Skipped";
        if (isCorrect) {
          statusClass = "feedback--correct";
          statusBadge = "Correct";
        } else if (!isSkipped) {
          statusClass = "feedback--wrong";
          statusBadge = "Wrong";
        }

        const optsHTML = q.options.map((opt, oIdx) => {
          let classSuffix = "";
          if (oIdx === q.answer) classSuffix = "correct";
          else if (oIdx === userAns) classSuffix = "incorrect";

          return `
            <div class="option-btn ${classSuffix}" style="cursor: default;">
              <span class="option-btn__key">${String.fromCharCode(65 + oIdx)}</span>
              <span class="option-btn__label">${opt}</span>
            </div>
          `;
        }).join('');

        return `
          <div class="practice-card" style="margin-bottom: var(--space-4); border-color: ${isCorrect ? 'rgba(52,211,153,0.15)' : isSkipped ? 'var(--border-color)' : 'rgba(248,113,113,0.15)'};">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: var(--space-3);">
              <span class="badge badge--subject" style="text-transform:none;">Q${reviewIndex} · ${section.title.split(': ')[1]}</span>
              <span class="badge ${isCorrect ? 'badge--diff-easy' : isSkipped ? 'badge--time' : 'badge--diff-hard'}">${statusBadge}</span>
            </div>
            <div class="practice-question" style="margin-bottom: var(--space-4);">${q.text}</div>
            <div class="practice-options" style="margin-bottom: var(--space-4);">
              ${optsHTML}
            </div>
            <div class="feedback ${statusClass}" style="margin-top: var(--space-3);">
              <strong style="font-size: var(--text-sm);">Explanation:</strong>
              <span class="feedback__explanation" style="white-space: pre-wrap; margin-top:4px;">${q.explanation}</span>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div>
          <h2 style="font-family: var(--font-display); font-size: var(--text-md); font-weight:800; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; margin: 30px 0 15px 0; color:var(--text-primary);">
            ${section.title}
          </h2>
          ${questionsHTML}
        </div>
      `;
    }).join('');

    app.innerHTML = `
      <div class="page page--mock-results">
        
        <!-- Top Summary Row -->
        <div style="display:flex; align-items:center; gap: var(--space-6); flex-wrap:wrap; margin-bottom: var(--space-8);">
          <div class="card" style="display:flex; align-items:center; gap: var(--space-5); flex:1; min-width: 260px; padding: var(--space-6);">
            <div class="results-card__score" style="font-size: 64px; font-family:var(--font-mono); line-height:1; font-weight:900;">${overallScore}<span style="font-size: 24px; font-weight:400; color: var(--text-secondary); -webkit-text-fill-color: var(--text-secondary);">/50</span></div>
            <div>
              <h1 class="welcome-title" style="margin: 0; font-size: var(--text-lg); line-height:1.2;">Test Completed</h1>
              <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-top:4px;">Accuracy: <strong>${overallPct}%</strong></div>
            </div>
          </div>
          
          <div class="card" style="flex:2; min-width: 320px; border-left: 4px solid ${evaluationColor}; padding: var(--space-5);">
            <h3 style="font-size: var(--text-md); font-weight:700; color: ${evaluationColor}; margin-bottom: 6px;">${evaluationTitle}</h3>
            <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5; margin:0;">${evaluationDesc}</p>
          </div>
        </div>

        <!-- Section Scores Row -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-8);">
          ${cardsSectionHTML}
        </div>

        <!-- Actions -->
        <div style="display:flex; gap: var(--space-3); margin-bottom: var(--space-8); flex-wrap:wrap;">
          <a href="#/mock/tcs-1" class="btn btn-primary" id="restart-mock-btn">Retake Mock Test</a>
          <a href="#/home" class="btn btn--ghost">Dashboard</a>
        </div>

        <!-- Review Section -->
        <div class="card" style="padding: var(--space-6);">
          <h2 class="card-title" style="font-size: var(--text-lg); margin-bottom: var(--space-5);">Review Responses & Explanations</h2>
          ${reviewQuestionsHTML}
        </div>

      </div>
    `;

    document.getElementById('restart-mock-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      renderMock(mockId);
    });
  }

  // Initial call
  renderIntro();
}
