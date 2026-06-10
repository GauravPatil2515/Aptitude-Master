// State Management
let state = {
  selectedDay: null,
  activeTab: 'dashboard',
  completedDays: JSON.parse(localStorage.getItem('aptitude_completed_days')) || [],
  mistakes: JSON.parse(localStorage.getItem('aptitude_mistakes')) || [],
  streak: parseInt(localStorage.getItem('aptitude_streak')) || 0,
  lastActiveDate: localStorage.getItem('aptitude_last_active') || null,
  currentQuestionIndex: 0,
  quizAnswers: [],
  quizTimer: 0,
  timerInterval: null,
  dsaProgress: JSON.parse(localStorage.getItem('dsa_progress')) || {},
  selectedMLChapter: 1,
  completedMLChapters: JSON.parse(localStorage.getItem('ml_completed_chapters')) || [],
  activeCategoryFilter: 'all'
};

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStreak();
  renderSidebar();
  renderDashboardOverview();
  renderMistakes();
  renderCheatSheets();
  initDSATracker();
  initMLTracker();
  setupEventListeners();
  setupPlaygroundListeners();
  updateGlobalStats();
  showDashboardHome();
});

// Update Streak Logic
function initStreak() {
  const today = new Date().toDateString();
  if (state.lastActiveDate) {
    const lastDate = new Date(state.lastActiveDate);
    const diffTime = Math.abs(new Date(today) - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      state.streak += 1;
    } else if (diffDays > 1) {
      state.streak = 1;
    }
  } else {
    state.streak = 1;
  }
  state.lastActiveDate = today;
  localStorage.setItem('aptitude_streak', state.streak);
  localStorage.setItem('aptitude_last_active', today);
}

// Render Sidebar Navigation
function renderSidebar(categoryFilter = state.activeCategoryFilter) {
  const dayListContainer = document.getElementById('day-list-container');
  if (!dayListContainer) return;
  dayListContainer.innerHTML = '';

  SYLLABUS_DATA.weeks.forEach(week => {
    const matchingDays = week.days.filter(d => categoryFilter === 'all' || d.category === categoryFilter);
    if (matchingDays.length === 0) return;

    const weekGroup = document.createElement('div');
    weekGroup.className = 'week-group';

    const weekHeader = document.createElement('div');
    weekHeader.className = 'week-header';
    weekHeader.textContent = `Week ${week.weekNumber}: ${week.title}`;
    weekGroup.appendChild(weekHeader);

    matchingDays.forEach(dayData => {
      const isCompleted = state.completedDays.includes(dayData.day);
      const isActive = state.selectedDay === dayData.day;

      const dayItem = document.createElement('div');
      dayItem.className = `day-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;
      dayItem.innerHTML = `
        <div class="day-number">${dayData.day}</div>
        <div class="day-details">
          <div class="day-title">${dayData.topic}</div>
          <div class="day-cat">
            <span class="category-tag ${dayData.category.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 8)}">${dayData.category}</span>
          </div>
        </div>
        <div class="day-status"></div>
      `;
      dayItem.addEventListener('click', () => selectDay(dayData.day));
      weekGroup.appendChild(dayItem);
    });

    dayListContainer.appendChild(weekGroup);
  });
}

// Render Dashboard Grid
function renderDashboardOverview(categoryFilter = state.activeCategoryFilter) {
  const dayGrid = document.getElementById('day-grid');
  if (!dayGrid) return;
  dayGrid.innerHTML = '';

  SYLLABUS_DATA.weeks.forEach(week => {
    week.days.forEach(dayData => {
      if (categoryFilter !== 'all' && dayData.category !== categoryFilter) return;

      const isCompleted = state.completedDays.includes(dayData.day);
      const isActive = state.selectedDay === dayData.day;

      const dayBox = document.createElement('div');
      dayBox.className = `day-grid-box ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;
      dayBox.innerHTML = `
        <div class="day-box-num">${dayData.day}</div>
        <div class="day-box-title">${dayData.topic}</div>
        <div class="day-box-cat">${dayData.category}</div>
      `;
      dayBox.addEventListener('click', () => selectDay(dayData.day));
      dayGrid.appendChild(dayBox);
    });
  });
}

// Select Day handler
function selectDay(dayNum) {
  state.selectedDay = dayNum;
  renderSidebar();
  renderDashboardOverview();

  let foundDay = null;
  for (let w of SYLLABUS_DATA.weeks) {
    foundDay = w.days.find(d => d.day === dayNum);
    if (foundDay) break;
  }
  if (!foundDay) return;

  switchTab('theory');

  const themeHeader = document.getElementById('theory-content');
  const catLower = foundDay.category.toLowerCase().replace(' ', '-').substring(0, 5);

  let formulasHtml = foundDay.formulas.map(f => `
    <div class="formula-item">
      <div class="formula-name">${f.name}</div>
      <div class="formula-body">${f.formula}</div>
    </div>
  `).join('');

  let shortcutsHtml = foundDay.shortcuts.map(s => `
    <div class="shortcut-item">${s}</div>
  `).join('');

  themeHeader.innerHTML = `
    <div class="theory-header">
      <span class="category-tag ${catLower}">${foundDay.category}</span>
      <h2 style="font-size: 26px; margin-bottom: 8px;">Day ${foundDay.day}: ${foundDay.topic}</h2>
      <p class="theory-desc">${foundDay.theory}</p>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          Important Formulas
        </div>
        <div>${formulasHtml || '<p style="color: var(--text-muted)">No formula reference required for this topic.</p>'}</div>
      </div>
      <div class="card">
        <div class="card-title">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          Shortcut Tricks & Tips
        </div>
        <div>${shortcutsHtml || '<p style="color: var(--text-muted)">No specific shortcuts. Solve using standard analytical steps.</p>'}</div>
      </div>
    </div>
    <div style="margin-top: 30px; display: flex; justify-content: flex-end;">
      <button class="btn btn-primary" onclick="startPracticeZone()">
        Start Practice Zone
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </button>
    </div>
  `;

  initQuiz(foundDay);
}

function startPracticeZone() {
  switchTab('practice');
}

// Setup Event Listeners
function setupEventListeners() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      if (targetTab === 'dashboard') {
        showDashboardHome();
      } else {
        switchTab(targetTab);
      }
    });
  });

  // Mistake notebook
  const addMistakeBtn = document.getElementById('add-mistake-btn');
  if (addMistakeBtn) addMistakeBtn.addEventListener('click', addMistake);

  // AI Advisor
  const sendAdviceBtn = document.getElementById('send-advice-btn');
  if (sendAdviceBtn) sendAdviceBtn.addEventListener('click', generateAIAdvice);

  // Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('app-theme', currentTheme);
      if (monacoEditor) {
        monaco.editor.setTheme(currentTheme === 'light' ? 'vs' : 'vs-dark');
      }
    });
  }

  // Category filter sync
  const sidebarSelect = document.getElementById('sidebar-category-select');
  const dashboardSelect = document.getElementById('dashboard-category-select');

  function handleCategoryChange(val) {
    state.activeCategoryFilter = val;
    if (sidebarSelect) sidebarSelect.value = val;
    if (dashboardSelect) dashboardSelect.value = val;
    renderSidebar();
    renderDashboardOverview();
  }

  if (sidebarSelect) sidebarSelect.addEventListener('change', e => handleCategoryChange(e.target.value));
  if (dashboardSelect) dashboardSelect.addEventListener('change', e => handleCategoryChange(e.target.value));
}

function initTheme() {
  const savedTheme = localStorage.getItem('app-theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

function switchTab(tabId) {
  state.activeTab = tabId;

  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.remove('active');
    if (t.getAttribute('data-tab') === tabId) t.classList.add('active');
  });

  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add('active');

  if (tabId === 'playground') initPlayground();

  if (tabId !== 'practice') {
    clearInterval(state.timerInterval);
  } else {
    startTimer();
  }
}

function showDashboardHome() {
  state.selectedDay = null;
  renderSidebar();
  renderDashboardOverview();
  switchTab('dashboard');
}

function initQuiz(dayData) {
  state.currentQuestionIndex = 0;
  state.quizAnswers = new Array(dayData.questions.length).fill(null);
  renderQuizQuestion(dayData);
}

function renderQuizQuestion(dayData) {
  const quizBox = document.getElementById('quiz-container');
  const question = dayData.questions[state.currentQuestionIndex];

  if (!question) {
    renderQuizCompletion(dayData);
    return;
  }

  let optionsHtml = question.options.map((opt, idx) => `
    <button class="option-btn" id="opt-${idx}" onclick="selectOption(${idx})">
      ${opt}
    </button>
  `).join('');

  quizBox.innerHTML = `
    <div class="quiz-section">
      <div class="quiz-header">
        <div style="font-size: 14px; font-weight: 600; color: var(--text-secondary)">
          Question ${state.currentQuestionIndex + 1} of ${dayData.questions.length}
        </div>
        <div class="timer">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span id="timer-display">00:00</span>
        </div>
      </div>
      <div class="question-box"><strong>Q: </strong>${question.question}</div>
      <div class="options-list">${optionsHtml}</div>
      <div class="explanation-box" id="explanation-box">
        <div class="explanation-title">Explanation</div>
        <div class="explanation-desc" id="explanation-desc"></div>
      </div>
      <div class="quiz-footer">
        <button class="btn btn-secondary" onclick="addQuestionToMistakes('${escapeHtml(question.question)}', '${dayData.topic}')">
          Add to Mistakes Log
        </button>
        <button class="btn btn-primary" id="next-q-btn" style="display: none;" onclick="nextQuestion(${dayData.day})">
          Next Question
        </button>
      </div>
    </div>
  `;

  startTimer();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function selectOption(selectedIdx) {
  let foundDay = null;
  for (let w of SYLLABUS_DATA.weeks) {
    foundDay = w.days.find(d => d.day === state.selectedDay);
    if (foundDay) break;
  }
  const question = foundDay.questions[state.currentQuestionIndex];
  const correctIdx = question.answer;

  const options = document.querySelectorAll('.option-btn');
  options.forEach(opt => opt.disabled = true);

  const selectedBtn = document.getElementById(`opt-${selectedIdx}`);
  const correctBtn = document.getElementById(`opt-${correctIdx}`);

  state.quizAnswers[state.currentQuestionIndex] = selectedIdx;

  if (selectedIdx === correctIdx) {
    selectedBtn.classList.add('correct');
  } else {
    selectedBtn.classList.add('incorrect');
    correctBtn.classList.add('correct');
  }

  const expBox = document.getElementById('explanation-box');
  const expDesc = document.getElementById('explanation-desc');
  expDesc.textContent = question.explanation;
  expBox.style.display = 'block';

  document.getElementById('next-q-btn').style.display = 'block';
  clearInterval(state.timerInterval);
}

function nextQuestion(dayNum) {
  state.currentQuestionIndex++;
  let foundDay = null;
  for (let w of SYLLABUS_DATA.weeks) {
    foundDay = w.days.find(d => d.day === dayNum);
    if (foundDay) break;
  }
  renderQuizQuestion(foundDay);
}

function renderQuizCompletion(dayData) {
  if (!state.completedDays.includes(dayData.day)) {
    state.completedDays.push(dayData.day);
    localStorage.setItem('aptitude_completed_days', JSON.stringify(state.completedDays));
  }

  updateGlobalStats();
  renderSidebar();
  renderDashboardOverview();

  let correctCount = 0;
  dayData.questions.forEach((q, idx) => {
    if (state.quizAnswers[idx] === q.answer) correctCount++;
  });

  const quizBox = document.getElementById('quiz-container');
  quizBox.innerHTML = `
    <div style="text-align: center; padding: 40px 20px;">
      <div style="font-size: 60px; color: var(--accent-emerald); margin-bottom: 20px;">🎉</div>
      <h2 style="font-size: 24px; margin-bottom: 12px;">Day ${dayData.day} Completed!</h2>
      <p style="color: var(--text-secondary); margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto;">
        You solved all practice questions for <strong>${dayData.topic}</strong>. Keep going to maintain your streak!
      </p>
      <div class="card" style="max-width: 320px; margin: 0 auto 30px auto; display: flex; justify-content: space-around; padding: 16px;">
        <div>
          <div style="font-size: 24px; font-weight: 700; color: var(--accent-cyan); font-family: var(--font-mono)">
            ${correctCount}/${dayData.questions.length}
          </div>
          <div style="font-size: 12px; color: var(--text-secondary)">Score</div>
        </div>
        <div style="border-right: 1px solid var(--border-color)"></div>
        <div>
          <div style="font-size: 24px; font-weight: 700; color: var(--accent-purple); font-family: var(--font-mono)">+1</div>
          <div style="font-size: 12px; color: var(--text-secondary)">Day Added</div>
        </div>
      </div>
      <button class="btn btn-primary" style="margin: 0 auto;" onclick="showDashboardHome()">Go back to Roadmap</button>
    </div>
  `;
}

function startTimer() {
  clearInterval(state.timerInterval);
  state.quizTimer = 0;
  const timerDisplay = document.getElementById('timer-display');
  if (!timerDisplay) return;

  state.timerInterval = setInterval(() => {
    state.quizTimer++;
    const mins = String(Math.floor(state.quizTimer / 60)).padStart(2, '0');
    const secs = String(state.quizTimer % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);
}

function addQuestionToMistakes(questionText, topic) {
  const newMistake = {
    id: Date.now(),
    title: `Practice Mistake - ${topic}`,
    topic: topic,
    content: questionText
  };
  state.mistakes.push(newMistake);
  localStorage.setItem('aptitude_mistakes', JSON.stringify(state.mistakes));
  renderMistakes();
  updateGlobalStats();
  showToast('Added to your Mistake Notebook!');
}

// FIX: Added null guard so this never crashes on init
function renderMistakes() {
  const mistakeContainer = document.getElementById('mistake-container');
  if (!mistakeContainer) return;
  mistakeContainer.innerHTML = '';

  if (state.mistakes.length === 0) {
    mistakeContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted)">
        <p>No mistakes logged yet. When practicing, add any hard questions or missed concepts here.</p>
      </div>
    `;
    return;
  }

  state.mistakes.forEach(m => {
    const card = document.createElement('div');
    card.className = 'mistake-card';
    card.innerHTML = `
      <div class="mistake-header">
        <span class="mistake-tag">${m.topic}</span>
        <button class="mistake-delete" onclick="deleteMistake(${m.id})">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
      <div class="mistake-title">${m.title}</div>
      <div class="mistake-content">${m.content}</div>
    `;
    mistakeContainer.appendChild(card);
  });
}

function addMistake() {
  const titleInput = document.getElementById('m-title');
  const topicInput = document.getElementById('m-topic');
  const descInput = document.getElementById('m-desc');

  if (!titleInput || !descInput) return;

  const title = titleInput.value.trim();
  const topic = topicInput ? topicInput.value.trim() || 'General' : 'General';
  const content = descInput.value.trim();

  if (!title || !content) {
    alert('Please fill in the title and description.');
    return;
  }

  const newMistake = { id: Date.now(), title, topic, content };
  state.mistakes.push(newMistake);
  localStorage.setItem('aptitude_mistakes', JSON.stringify(state.mistakes));

  titleInput.value = '';
  if (topicInput) topicInput.value = '';
  descInput.value = '';

  renderMistakes();
  updateGlobalStats();
}

function deleteMistake(id) {
  state.mistakes = state.mistakes.filter(m => m.id !== id);
  localStorage.setItem('aptitude_mistakes', JSON.stringify(state.mistakes));
  renderMistakes();
  updateGlobalStats();
}

// FIX: Added null guard
function renderCheatSheets() {
  const container = document.getElementById('cheatsheets-container');
  if (!container) return;
  container.innerHTML = '';

  CHEATSHEETS.forEach(c => {
    const item = document.createElement('div');
    item.className = 'cheatsheet-item';

    const formattedContent = c.content.trim()
      .split('\n')
      .map(line => {
        if (line.startsWith('- ')) {
          let content = line.substring(2);
          content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</str