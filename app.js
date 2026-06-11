// State Management
let state = {
  selectedDay: null,
  activeTab: 'dashboard',
  completedDays: JSON.parse(localStorage.getItem('aptitude_completed_days')) || [],
  mistakes: JSON.parse(localStorage.getItem('aptitude_mistakes')) || [],
  streak: parseInt(localStorage.getItem('aptitude_streak')) || 0,
  lastActiveDate: localStorage.getItem('aptitude_last_active') || null,
  currentQuestionIndex: 0,
  quizAnswers: [], // stores user selections
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
  // Show welcome page
  showDashboardHome();

  // Initialize modular features
  if (typeof CalendarModule !== 'undefined') {
    CalendarModule.render('sidebar-calendar');
  }
  if (typeof AdsModule !== 'undefined') {
    AdsModule.initAll();
  }
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
    // Check if there are matching days in this week
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

// Render Dashboard Grid boxes
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
  
  // Find Day Data
  let foundDay = null;
  for (let w of SYLLABUS_DATA.weeks) {
    foundDay = w.days.find(d => d.day === dayNum);
    if (foundDay) break;
  }
  
  if (!foundDay) return;
  
  // Set tab to Theory first
  switchTab('theory');

  // Mark today as partial study in calendar
  if (typeof CalendarModule !== 'undefined') {
    CalendarModule.markToday('partial');
  }
  
  // Populate Theory content
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
        <div>
          ${formulasHtml || '<p style="color: var(--text-muted)">No formula reference required for this topic. Focus on logical principles.</p>'}
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          Shortcut Tricks & Tips
        </div>
        <div>
          ${shortcutsHtml || '<p style="color: var(--text-muted)">No specific shortcuts. Solve using standard logical diagrams or analytical steps.</p>'}
        </div>
      </div>
    </div>
    <div style="margin-top: 30px; display: flex; justify-content: flex-end;">
      <button class="btn btn-primary" onclick="startPracticeZone()">
        Start Practice Zone
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </button>
    </div>
  `;
  
  // Set up Practice tab
  initQuiz(foundDay);
}

// Start Practice tab transition
function startPracticeZone() {
  switchTab('practice');
}

// Setup Event Listeners
// Setup Event Listeners
function setupEventListeners() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = tab.getAttribute('data-tab');
      if (targetTab === 'dashboard') {
        showDashboardHome();
      } else {
        switchTab(targetTab);
      }
    });
  });
  
  // Add Mistake handler
  const addMistakeBtn = document.getElementById('add-mistake-btn');
  if (addMistakeBtn) addMistakeBtn.addEventListener('click', addMistake);
  
  // AI Advisor trigger
  const sendAdviceBtn = document.getElementById('send-advice-btn');
  if (sendAdviceBtn) sendAdviceBtn.addEventListener('click', generateAIAdvice);

  // Theme Toggle Button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('app-theme', currentTheme);
      
      // Sync Monaco theme
      if (monacoEditor) {
        const monacoTheme = currentTheme === 'light' ? 'vs' : 'vs-dark';
        monaco.editor.setTheme(monacoTheme);
      }
    });
  }

  // Sidebar and Dashboard category selection synchronization
  const sidebarSelect = document.getElementById('sidebar-category-select');
  const dashboardSelect = document.getElementById('dashboard-category-select');
  
  function handleCategoryChange(val) {
    state.activeCategoryFilter = val;
    if (sidebarSelect) sidebarSelect.value = val;
    if (dashboardSelect) dashboardSelect.value = val;
    renderSidebar();
    renderDashboardOverview();
  }
  
  if (sidebarSelect) {
    sidebarSelect.addEventListener('change', (e) => handleCategoryChange(e.target.value));
  }
  if (dashboardSelect) {
    dashboardSelect.addEventListener('change', (e) => handleCategoryChange(e.target.value));
  }
}

// Initialize saved theme on start
function initTheme() {
  const savedTheme = localStorage.getItem('app-theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

// Switch between dashboard panels
function switchTab(tabId) {
  state.activeTab = tabId;
  
  // Update Top Nav CSS
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.remove('active');
    if (t.getAttribute('data-tab') === tabId) {
      t.classList.add('active');
    }
  });
  
  // Update Content panel
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.remove('active');
  });
  
  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add('active');
  }
  
  if (tabId === 'playground') {
    initPlayground();
  }
  
  if (tabId !== 'practice') {
    clearInterval(state.timerInterval);
  } else {
    // Restart timer if in practice and active
    startTimer();
  }
}

// Show Dashboard Home overview
function showDashboardHome() {
  state.selectedDay = null;
  renderSidebar();
  renderDashboardOverview();
  switchTab('dashboard');
}

// Initialize Day Quiz
function initQuiz(dayData) {
  state.currentQuestionIndex = 0;
  state.quizAnswers = new Array(dayData.questions.length).fill(null);
  renderQuizQuestion(dayData);
}

// Render Quiz Question
function renderQuizQuestion(dayData) {
  const quizBox = document.getElementById('quiz-container');
  const question = dayData.questions[state.currentQuestionIndex];
  
  if (!question) {
    // Render completion page
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
      <div class="question-box">
        <strong>Q: </strong>${question.question}
      </div>
      <div class="options-list">
        ${optionsHtml}
      </div>
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

// Safe string escaping
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Select Answer in Option list
function selectOption(selectedIdx) {
  // Find current day's questions
  let foundDay = null;
  for (let w of SYLLABUS_DATA.weeks) {
    foundDay = w.days.find(d => d.day === state.selectedDay);
    if (foundDay) break;
  }
  const question = foundDay.questions[state.currentQuestionIndex];
  const correctIdx = question.answer;
  const explanationText = question.explanation;

  const options = document.querySelectorAll('.option-btn');
  options.forEach(opt => opt.disabled = true); // lock answers
  
  const selectedBtn = document.getElementById(`opt-${selectedIdx}`);
  const correctBtn = document.getElementById(`opt-${correctIdx}`);
  
  state.quizAnswers[state.currentQuestionIndex] = selectedIdx;
  
  if (selectedIdx === correctIdx) {
    selectedBtn.classList.add('correct');
  } else {
    selectedBtn.classList.add('incorrect');
    correctBtn.classList.add('correct');
  }
  
  // Show explanation
  const expBox = document.getElementById('explanation-box');
  const expDesc = document.getElementById('explanation-desc');
  expDesc.textContent = explanationText;
  expBox.style.display = 'block';
  
  // Show Next Button
  document.getElementById('next-q-btn').style.display = 'block';
  clearInterval(state.timerInterval);
}

// Load Next Quiz Question
function nextQuestion(dayNum) {
  state.currentQuestionIndex++;
  
  let foundDay = null;
  for (let w of SYLLABUS_DATA.weeks) {
    foundDay = w.days.find(d => d.day === dayNum);
    if (foundDay) break;
  }
  
  renderQuizQuestion(foundDay);
}

// Render Completion Screen
function renderQuizCompletion(dayData) {
  // Mark day as completed
  if (!state.completedDays.includes(dayData.day)) {
    state.completedDays.push(dayData.day);
    localStorage.setItem('aptitude_completed_days', JSON.stringify(state.completedDays));
  }

  // Mark today as studied in calendar
  if (typeof CalendarModule !== 'undefined') {
    CalendarModule.markToday('studied');
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
          <div style="font-size: 24px; font-weight: 700; color: var(--accent-purple); font-family: var(--font-mono)">
            +1
          </div>
          <div style="font-size: 12px; color: var(--text-secondary)">Day Added</div>
        </div>
      </div>
      <button class="btn btn-primary" style="margin: 0 auto;" onclick="showDashboardHome()">
        Go back to Roadmap
      </button>
    </div>
  `;
}

// Timer Logic
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

// Add Question directly to Mistake Notebook
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
  
  alert('Added to your Mistake Notebook!');
}

// Render Mistakes Notebook
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

// Add Custom Mistake Note
function addMistake() {
  const titleInput = document.getElementById('m-title');
  const topicInput = document.getElementById('m-topic');
  const descInput = document.getElementById('m-desc');
  
  const title = titleInput.value.trim();
  const topic = topicInput.value.trim() || "General";
  const content = descInput.value.trim();
  
  if (!title || !content) {
    alert("Please fill in the title and description.");
    return;
  }
  
  const newMistake = {
    id: Date.now(),
    title,
    topic,
    content
  };
  
  state.mistakes.push(newMistake);
  localStorage.setItem('aptitude_mistakes', JSON.stringify(state.mistakes));
  
  // Clear inputs
  titleInput.value = '';
  topicInput.value = '';
  descInput.value = '';
  
  renderMistakes();
  updateGlobalStats();
}

// Delete Mistake Note
function deleteMistake(id) {
  state.mistakes = state.mistakes.filter(m => m.id !== id);
  localStorage.setItem('aptitude_mistakes', JSON.stringify(state.mistakes));
  renderMistakes();
  updateGlobalStats();
}

// Render Cheat Sheets list
function renderCheatSheets() {
  const container = document.getElementById('cheatsheets-container');
  container.innerHTML = '';
  
  CHEATSHEETS.forEach(c => {
    const item = document.createElement('div');
    item.className = 'cheatsheet-item';
    
    // Format markdown text lines to html
    const formattedContent = c.content.trim()
      .split('\n')
      .map(line => {
        if (line.startsWith('- ')) {
          // Bullet point
          let content = line.substring(2);
          // Simple bold formatting
          content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          // Simple LaTeX math replacements for rendering
          content = content.replace(/\$(.*?)\$/g, '<code class="math">$1</code>');
          return `<li>${content}</li>`;
        }
        return line;
      }).join('\n');
      
    item.innerHTML = `
      <div class="cheatsheet-title">${c.topic} (${c.category})</div>
      <div class="markdown-body">
        <ul>${formattedContent}</ul>
      </div>
    `;
    container.appendChild(item);
  });
}

// Update Global Dashboard Metrics
function updateGlobalStats() {
  let totalDays = 0;
  SYLLABUS_DATA.weeks.forEach(w => {
    totalDays += w.days.length;
  });
  const progressPercent = Math.round((state.completedDays.length / totalDays) * 100);
  
  // Update sidebar progress bar
  document.getElementById('progress-bar').style.width = `${progressPercent}%`;
  document.getElementById('progress-text').textContent = `${progressPercent}%`;
  
  // Update dashboard stats cards
  const statCompleted = document.getElementById('stat-completed');
  if (statCompleted) statCompleted.textContent = `${state.completedDays.length}/${totalDays}`;
  
  const statStreak = document.getElementById('stat-streak');
  if (statStreak) statStreak.textContent = `${state.streak} Days`;
  
  const statMistakes = document.getElementById('stat-mistakes');
  if (statMistakes) statMistakes.textContent = state.mistakes.length;

  // Update SVG rings
  if (typeof RingsModule !== 'undefined') {
    RingsModule.updateAll(state);
  }
}

// AI Placement Advisor simulator
function generateAIAdvice() {
  const branch = document.getElementById('user-branch').value;
  const year = document.getElementById('user-year').value;
  const target = document.getElementById('user-target').value;
  
  const chatHistory = document.getElementById('chat-history');
  
  // Add User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  userMsg.textContent = `My details: Branch: ${branch.toUpperCase()}, Year: ${year}, Target Company: ${target.toUpperCase()}`;
  chatHistory.appendChild(userMsg);
  
  // Add Bot Thinking
  const botMsg = document.createElement('div');
  botMsg.className = 'chat-message bot';
  botMsg.textContent = `Generating tailored placement roadmap...`;
  chatHistory.appendChild(botMsg);
  chatHistory.scrollTop = chatHistory.scrollHeight;
  
  // Simulate AI Response delay
  setTimeout(() => {
    const isService = ['tcs', 'infosys', 'accenture', 'deloitte'].includes(target.toLowerCase());
    const info = isService ? PLACEMENT_ROADMAPS.service : PLACEMENT_ROADMAPS.product;
    
    let stepsHtml = info.roadmap.map(step => `<li>${step}</li>`).join('');
    
    botMsg.innerHTML = `
      <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px; color: var(--accent-cyan)">
        ${info.name} - Roadmap
      </div>
      <p style="margin-bottom: 8px;"><strong>Difficulty:</strong> ${info.difficulty}</p>
      <p style="margin-bottom: 8px;"><strong>Focus Areas:</strong> ${info.focus}</p>
      <p style="margin-bottom: 8px;"><strong>Math/Aptitude Requirement:</strong> ${info.mathRequirement}</p>
      <hr style="border-color: var(--border-color); margin: 10px 0;">
      <div style="font-weight: 600; margin-bottom: 6px;">Recommended Preparation Steps:</div>
      <ol style="padding-left: 20px; font-size: 13.5px; line-height: 1.6;">
        ${stepsHtml}
      </ol>
      <p style="font-size: 12.5px; margin-top: 10px; color: var(--text-secondary)">
        Based on your branch (${branch.toUpperCase()}) and target (${target.toUpperCase()}), you should spend roughly ${isService ? '1.5' : '3'} hours daily on this tracker to easily clear the initial rounds.
      </p>
    `;
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }, 1000);
}

// Initialize DSA Tracker
function initDSATracker() {
  const searchInput = document.getElementById('dsa-search');
  const topicFilter = document.getElementById('dsa-filter-topic');
  const importanceFilter = document.getElementById('dsa-filter-importance');
  const statusFilter = document.getElementById('dsa-filter-status');
  
  if (searchInput) searchInput.addEventListener('input', renderDSAProblems);
  if (topicFilter) topicFilter.addEventListener('change', renderDSAProblems);
  if (importanceFilter) importanceFilter.addEventListener('change', renderDSAProblems);
  if (statusFilter) statusFilter.addEventListener('change', renderDSAProblems);
  
  renderDSAProblems();
  updateDSAMetrics();
}

// Helper to get category/topic class matching our global styling tags
function getTopicColorClass(topic) {
  switch (topic) {
    case 'Arrays': case 'Sliding Window': case 'Trees': return 'quant'; // cyan
    case 'Hashing': case 'Binary Search': case 'Heap': return 'reasoning'; // purple
    case 'Strings': case 'Linked List': case 'Graph BFS/DFS': return 'verbal'; // pink
    default: return 'mocks'; // amber / orange
  }
}

// Render the filtered list of DSA problems into the table body
function renderDSAProblems() {
  const tableBody = document.getElementById('dsa-problems-body');
  if (!tableBody) return;
  
  const searchEl = document.getElementById('dsa-search');
  const topicEl = document.getElementById('dsa-filter-topic');
  const importanceEl = document.getElementById('dsa-filter-importance');
  const statusEl = document.getElementById('dsa-filter-status');
  
  const searchVal = searchEl ? searchEl.value.toLowerCase().trim() : '';
  const topicVal = topicEl ? topicEl.value : 'all';
  const importanceVal = importanceEl ? importanceEl.value : 'all';
  const statusVal = statusEl ? statusEl.value : 'all';
  
  tableBody.innerHTML = '';
  
  const filteredProblems = DSA_PROBLEMS.filter(p => {
    // Search filter
    const matchesSearch = p.name.toLowerCase().includes(searchVal) || p.pattern.toLowerCase().includes(searchVal);
    
    // Topic filter
    const matchesTopic = (topicVal === 'all' || p.topic === topicVal);
    
    // Importance filter
    const matchesImportance = (importanceVal === 'all' || p.importance === importanceVal);
    
    // Status filter
    const currentStatus = state.dsaProgress[p.id]?.status || 'todo';
    const matchesStatus = (statusVal === 'all' || currentStatus === statusVal);
    
    return matchesSearch && matchesTopic && matchesImportance && matchesStatus;
  });
  
  if (filteredProblems.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
          No problems found matching the filters.
        </td>
      </tr>
    `;
    return;
  }
  
  filteredProblems.forEach(p => {
    const status = state.dsaProgress[p.id]?.status || 'todo';
    const notes = state.dsaProgress[p.id]?.notes || '';
    const topicClass = getTopicColorClass(p.topic);
    
    let statusPill = '';
    if (status === 'todo') {
      statusPill = `<span class="status-badge todo" onclick="cycleDSAStatus(${p.id})">🔴 To Do</span>`;
    } else if (status === 'in_progress') {
      statusPill = `<span class="status-badge in_progress" onclick="cycleDSAStatus(${p.id})">🟡 In Progress</span>`;
    } else if (status === 'completed') {
      statusPill = `<span class="status-badge completed" onclick="cycleDSAStatus(${p.id})">🟢 Completed</span>`;
    }
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="padding: 12px 16px;">${statusPill}</td>
      <td style="padding: 12px 16px; font-weight: 600; color: var(--text-primary);">${p.name}</td>
      <td style="padding: 12px 16px;">
        <span class="category-tag ${topicClass}" style="margin: 0; font-size: 11px;">${p.topic}</span>
      </td>
      <td style="padding: 12px 16px;">
        <span class="imp-badge ${p.importance.toLowerCase().replace(' ', '-')}">${p.importance}</span>
      </td>
      <td style="padding: 12px 16px;">
        <a href="${p.link}" target="_blank" class="dsa-link" title="Open on LeetCode">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </td>
      <td style="padding: 12px 16px;">
        <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 2px;">${p.pattern}</div>
        <div style="font-size: 11.5px; color: var(--text-muted); line-height: 1.4;">${p.hint}</div>
      </td>
      <td style="padding: 12px 16px;">
        <input type="text" class="notes-input" placeholder="Add note/trick..." value="${escapeHtml(notes)}" onchange="updateDSANotes(${p.id}, this.value)">
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Update the top stats summary boxes for DSA preparation progress
function updateDSAMetrics() {
  const solvedCountEl = document.getElementById('dsa-solved-count');
  const progressPercentEl = document.getElementById('dsa-progress-percent');
  const activeCategoryEl = document.getElementById('dsa-active-category');
  
  if (!solvedCountEl) return;
  
  const total = DSA_PROBLEMS.length;
  let completedCount = 0;
  
  // Count completed
  Object.keys(state.dsaProgress).forEach(id => {
    if (state.dsaProgress[id]?.status === 'completed') {
      completedCount++;
    }
  });
  
  const percent = Math.round((completedCount / total) * 100);
  
  solvedCountEl.textContent = `${completedCount}/${total}`;
  progressPercentEl.textContent = `${percent}%`;
  
  // Find current focus topic
  // Topic order by prepared curriculum
  const topicOrder = [
    "Arrays", "Strings", "Hashing", "Two Pointers", "Sliding Window",
    "Binary Search", "Linked List", "Stack", "Trees", "Heap", "Graph BFS/DFS", "DP Basics"
  ];
  
  // Choose the first topic in topicOrder that is not fully completed
  let focusTopic = "All Completed!";
  for (let topic of topicOrder) {
    const topicProblems = DSA_PROBLEMS.filter(p => p.topic === topic);
    const completedTopicProblems = topicProblems.filter(p => state.dsaProgress[p.id]?.status === 'completed');
    if (completedTopicProblems.length < topicProblems.length) {
      focusTopic = topic;
      break;
    }
  }
  
  activeCategoryEl.textContent = focusTopic;
}

// Cycle problem status (To Do -> In Progress -> Completed -> To Do)
function cycleDSAStatus(id) {
  const current = state.dsaProgress[id]?.status || 'todo';
  let nextStatus = 'todo';
  if (current === 'todo') nextStatus = 'in_progress';
  else if (current === 'in_progress') nextStatus = 'completed';
  else if (current === 'completed') nextStatus = 'todo';
  
  if (!state.dsaProgress[id]) {
    state.dsaProgress[id] = { status: nextStatus, notes: '' };
  } else {
    state.dsaProgress[id].status = nextStatus;
  }
  
  localStorage.setItem('dsa_progress', JSON.stringify(state.dsaProgress));
  renderDSAProblems();
  updateDSAMetrics();
}

// Update the user's custom personal note for a specific problem ID
function updateDSANotes(id, value) {
  if (!state.dsaProgress[id]) {
    state.dsaProgress[id] = { status: 'todo', notes: value };
  } else {
    state.dsaProgress[id].notes = value;
  }
  localStorage.setItem('dsa_progress', JSON.stringify(state.dsaProgress));
}

// ==========================================
// MACHINE LEARNING TRACKER CONTROLLERS
// ==========================================

// Initialize Machine Learning Tracker
function initMLTracker() {
  renderMLChapters();
  loadMLChapter(state.selectedMLChapter || 1);

  // Setup Run Button event
  const runBtn = document.getElementById('ml-run-btn');
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      const consoleOutput = document.getElementById('ml-console-output');
      const statusText = document.getElementById('ml-sandbox-status');
      if (consoleOutput) {
        statusText.textContent = "Running...";
        statusText.style.color = "var(--accent-cyan)";
        consoleOutput.style.display = "block";
        consoleOutput.innerHTML = "Initializing sandbox...\n";
        
        setTimeout(() => {
          consoleOutput.innerHTML += "Executing main.py...\n\n";
          const activeCh = ML_DATA.find(c => c.id === state.selectedMLChapter);
          if (activeCh && activeCh.codeOutput) {
            consoleOutput.innerHTML += activeCh.codeOutput;
            statusText.textContent = "Success";
            statusText.style.color = "var(--accent-green)";
          } else {
            consoleOutput.innerHTML += "Process finished with exit code 0";
            statusText.textContent = "Success";
            statusText.style.color = "var(--accent-green)";
          }
        }, 800);
      }
    });
  }
}

// Render the list of ML chapters
function renderMLChapters() {
  const container = document.getElementById('ml-chapters-list');
  if (!container) return;
  container.innerHTML = '';

  ML_DATA.forEach(ch => {
    const isCompleted = state.completedMLChapters.includes(ch.id);
    const isActive = state.selectedMLChapter === ch.id;

    const btn = document.createElement('div');
    btn.className = `day-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
    btn.style.width = '100%';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'space-between';
    btn.style.padding = '12px 14px';

    btn.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${ch.layer}</span>
        <span style="font-size: 13.5px; font-weight: 500; color: var(--text-primary);">${ch.title}</span>
      </div>
      <div class="day-status" style="font-family: var(--font-mono); font-size: 12px; color: ${isCompleted ? 'var(--accent-emerald)' : 'var(--text-muted)'};">
        ${isCompleted ? '✓' : '○'}
      </div>
    `;

    btn.addEventListener('click', () => {
      state.selectedMLChapter = ch.id;
      renderMLChapters();
      loadMLChapter(ch.id);
    });

    container.appendChild(btn);
  });

  // Update ML completion stats
  const completionStat = document.getElementById('ml-completion-stat');
  if (completionStat) {
    completionStat.textContent = `${state.completedMLChapters.length}/${ML_DATA.length}`;
  }
}

// Load detailed data for selected ML Chapter
function loadMLChapter(id) {
  const ch = ML_DATA.find(c => c.id === id);
  if (!ch) return;

  // Update active layer stat card
  const activeLayerStat = document.getElementById('ml-active-layer');
  if (activeLayerStat) {
    activeLayerStat.textContent = ch.layer;
  }

  // Update Code Sandbox code block
  const codeBlock = document.getElementById('ml-code-block');
  if (codeBlock) {
    // Simple syntax highlights for display
    let highlighted = ch.code
      .replace(/(import numpy as np)/g, '<span style="color: #f472b6;">$1</span>')
      .replace(/(print)/g, '<span style="color: #60a5fa;">$1</span>')
      .replace(/(#.*)/g, '<span style="color: #71717a; font-style: italic;">$1</span>')
      .replace(/(np\.\w+)/g, '<span style="color: #fbbf24;">$1</span>');
    codeBlock.innerHTML = highlighted;
  }

  // Reset sandbox outputs
  const consoleOutput = document.getElementById('ml-console-output');
  if (consoleOutput) {
    consoleOutput.style.display = 'none';
    consoleOutput.innerHTML = '';
  }
  const statusText = document.getElementById('ml-sandbox-status');
  if (statusText) {
    statusText.textContent = "Idle";
    statusText.style.color = "var(--text-secondary)";
  }

  // Update Theory view
  const theoryTitle = document.getElementById('ml-theory-title');
  if (theoryTitle) {
    theoryTitle.textContent = `${ch.layer}: ${ch.title}`;
  }
  const theoryContent = document.getElementById('ml-theory-content');
  if (theoryContent) {
    theoryContent.innerHTML = ch.theory;
  }

  // Update Formulas list
  const formulasContent = document.getElementById('ml-formulas-content');
  if (formulasContent) {
    if (ch.formulas && ch.formulas.length > 0) {
      formulasContent.innerHTML = `
        <table class="dsa-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: var(--bg-tertiary); border-bottom: 1px solid var(--border-color);">
              <th style="padding: 10px; text-align: left; font-weight: 600;">Concept</th>
              <th style="padding: 10px; text-align: left; font-weight: 600;">Formula / Representation</th>
            </tr>
          </thead>
          <tbody>
            ${ch.formulas.map(f => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight: 500; color: var(--text-primary);">${f.name}</td>
                <td style="padding: 10px; font-family: var(--font-mono); color: var(--accent-cyan); font-size: 12.5px;">${f.formula}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else {
      formulasContent.innerHTML = '<p style="color: var(--text-secondary); font-style: italic;">No specific formulas for this section.</p>';
    }
  }

  // Render Quiz questions
  renderMLQuiz(ch);
}

// Render the quiz inside ML page
function renderMLQuiz(chapter) {
  const container = document.getElementById('ml-quiz-container');
  if (!container) return;
  container.innerHTML = '';

  chapter.questions.forEach((q, qIdx) => {
    const qBox = document.createElement('div');
    qBox.style.marginBottom = '24px';
    qBox.style.paddingBottom = '16px';
    qBox.style.borderBottom = '1px solid var(--border-color)';

    const optionsHtml = q.options.map((opt, optIdx) => `
      <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-secondary); cursor: pointer; transition: all 0.2s;" class="ml-opt-label-${chapter.id}-${qIdx}">
        <input type="radio" name="ml-q-${chapter.id}-${qIdx}" value="${optIdx}" style="cursor: pointer;">
        <span style="font-size: 13.5px; color: var(--text-primary);">${opt}</span>
      </label>
    `).join('');

    qBox.innerHTML = `
      <div style="font-size: 14.5px; font-weight: 500; color: var(--text-primary); margin-bottom: 12px;">Q${qIdx + 1}: ${q.question}</div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        ${optionsHtml}
      </div>
      <button class="btn btn-secondary" id="ml-check-btn-${chapter.id}-${qIdx}" style="margin-top: 12px; font-size: 12.5px; padding: 6px 12px;">Check Answer</button>
      <div id="ml-feedback-${chapter.id}-${qIdx}" style="margin-top: 10px; font-size: 13px; line-height: 1.5; padding: 10px; border-radius: 6px; display: none;"></div>
    `;

    container.appendChild(qBox);

    // Bind event for Check Answer
    const checkBtn = qBox.querySelector(`#ml-check-btn-${chapter.id}-${qIdx}`);
    checkBtn.addEventListener('click', () => {
      const selectedInput = qBox.querySelector(`input[name="ml-q-${chapter.id}-${qIdx}"]:checked`);
      if (!selectedInput) {
        alert("Please select an option first!");
        return;
      }

      const selectedIdx = parseInt(selectedInput.value);
      const feedback = qBox.querySelector(`#ml-feedback-${chapter.id}-${qIdx}`);
      const isCorrect = selectedIdx === q.answer;

      // Update options styling
      qBox.querySelectorAll(`.ml-opt-label-${chapter.id}-${qIdx}`).forEach((label, idx) => {
        if (idx === q.answer) {
          label.style.borderColor = 'var(--accent-green)';
          label.style.background = 'rgba(16, 185, 129, 0.05)';
        } else if (idx === selectedIdx) {
          label.style.borderColor = 'var(--accent-red)';
          label.style.background = 'rgba(239, 68, 68, 0.05)';
        }
      });

      feedback.style.display = 'block';
      if (isCorrect) {
        feedback.style.background = 'rgba(16, 185, 129, 0.08)';
        feedback.style.border = '1px solid var(--accent-green)';
        feedback.style.color = 'var(--accent-green)';
        feedback.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
        
        // Check if all questions in chapter are checked & correct
        checkChapterCompletion(chapter);
      } else {
        feedback.style.background = 'rgba(239, 68, 68, 0.08)';
        feedback.style.border = '1px solid var(--accent-red)';
        feedback.style.color = 'var(--accent-red)';
        feedback.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
      }
    });
  });
}

// Check if all questions have been correctly answered to mark module as complete
function checkChapterCompletion(chapter) {
  let allCorrect = true;
  chapter.questions.forEach((q, qIdx) => {
    const feedback = document.getElementById(`ml-feedback-${chapter.id}-${qIdx}`);
    if (!feedback || feedback.style.color !== 'var(--accent-green)') {
      allCorrect = false;
    }
  });

  if (allCorrect && !state.completedMLChapters.includes(chapter.id)) {
    state.completedMLChapters.push(chapter.id);
    localStorage.setItem('ml_completed_chapters', JSON.stringify(state.completedMLChapters));
    renderMLChapters();
    showToast(`✓ Mastered: ${chapter.title}!`);
  }
}

// Display Premium Toast Notification
function showToast(msg) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = 'var(--bg-tertiary)';
    toast.style.color = 'var(--text-primary)';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    toast.style.border = '1px solid var(--accent-purple)';
    toast.style.zIndex = '9999';
    toast.style.fontFamily = 'var(--font-sans)';
    toast.style.fontSize = '14px';
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3000);
}

// Monaco & Pyodide Playground Implementation
let monacoEditor = null;
let pyodideInstance = null;
let pyodideLoadingState = false;

const PLAYGROUND_CHALLENGES = {
  custom: {
    desc: `<h4>Scratchpad Mode</h4><p>Feel free to import <code>numpy</code> or write vanilla Python. Use <code>print()</code> to output results to the console.</p>`,
    starter: `import numpy as np

# Write your custom code here
x = np.array([1, 2, 3])
print("Vector:", x)
print("Mean:", np.mean(x))`
  },
  sum_array: {
    desc: `<h4>Challenge 1: Sum of Array</h4><p>Write a function <code>sum_array(arr)</code> that takes a list of integers and returns the sum. Print the result for array <code>[10, 20, 30, 40]</code>.</p>`,
    starter: `def sum_array(arr):
    # Your code here
    return sum(arr)

test_arr = [10, 20, 30, 40]
print("Sum of array:", sum_array(test_arr))`
  },
  matrix_mult: {
    desc: `<h4>Challenge 2: Matrix Multiplication</h4><p>Write a function <code>multiply_matrices(a, b)</code> using <code>numpy.dot</code> or the <code>@</code> operator to multiply two 2x2 matrices.</p>`,
    starter: `import numpy as np

def multiply_matrices(a, b):
    # Your code here
    return np.dot(a, b)

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print("Result of A x B:")
print(multiply_matrices(A, B))`
  },
  binary_search: {
    desc: `<h4>Challenge 3: Binary Search</h4><p>Implement binary search to find target element. Return index or -1 if not found.</p>`,
    starter: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

sorted_arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23
print(f"Target found at index: {binary_search(sorted_arr, target)}")`
  },
  relu: {
    desc: `<h4>Challenge 4: ReLU Activation</h4><p>Implement the Rectified Linear Unit function <code>relu(x)</code> which returns <code>max(0, x)</code> for all elements in a NumPy array.</p>`,
    starter: `import numpy as np

def relu(x):
    # Your code here
    return np.maximum(0, x)

inputs = np.array([-2.5, 1.0, 0.0, -0.5, 3.0])
print("Inputs:", inputs)
print("ReLU outputs:", relu(inputs))`
  }
};

async function initPlayground() {
  // 1. Initialize Monaco Editor if not already initialized
  if (!monacoEditor && typeof require !== 'undefined') {
    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });
    require(['vs/editor/editor.main'], function () {
      const isLightTheme = document.body.classList.contains('light-theme');
      monacoEditor = monaco.editor.create(document.getElementById('monaco-container'), {
        value: PLAYGROUND_CHALLENGES.custom.starter,
        language: 'python',
        theme: isLightTheme ? 'vs' : 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false }
      });
    });
  } else if (monacoEditor) {
    // Theme sync
    const isLightTheme = document.body.classList.contains('light-theme');
    monaco.editor.setTheme(isLightTheme ? 'vs' : 'vs-dark');
  }

  // 2. Start loading Pyodide in background
  if (!pyodideInstance && !pyodideLoadingState) {
    lazyLoadPyodide();
  }
}

async function lazyLoadPyodide() {
  if (pyodideInstance || pyodideLoadingState) return;
  pyodideLoadingState = true;

  const statusText = document.getElementById('pyodide-status-text');
  const statusDot = document.getElementById('pyodide-status-dot');
  if (statusText) statusText.textContent = "Pyodide: Loading...";
  if (statusDot) statusDot.style.background = "#eab308"; // yellow/amber

  try {
    pyodideInstance = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
    });
    // Load NumPy
    await pyodideInstance.loadPackage("numpy");
    
    if (statusText) statusText.textContent = "Pyodide: NumPy Ready";
    if (statusDot) statusDot.style.background = "#10b981"; // emerald/green
  } catch (err) {
    console.error("Pyodide loading failed:", err);
    if (statusText) statusText.textContent = "Pyodide: Failed";
    if (statusDot) statusDot.style.background = "#ef4444"; // red
    pyodideLoadingState = false;
  }
}

async function runPlaygroundCode() {
  const consoleEl = document.getElementById('playground-console');
  if (!consoleEl) return;

  if (!pyodideInstance) {
    consoleEl.textContent = "Python engine is loading. Please wait 5-10 seconds...";
    await lazyLoadPyodide();
    if (!pyodideInstance) {
      consoleEl.textContent = "Failed to load Python engine. Check internet connection.";
      return;
    }
  }

  consoleEl.textContent = "Running...\n";
  const code = monacoEditor ? monacoEditor.getValue() : "";
  
  let output = "";
  pyodideInstance.setStdout({
    write: (text) => {
      output += text;
      return text.length;
    }
  });
  pyodideInstance.setStderr({
    write: (text) => {
      output += text;
      return text.length;
    }
  });

  try {
    await pyodideInstance.runPythonAsync(code);
    consoleEl.textContent = output || "Code executed successfully with no print output.";
  } catch (err) {
    consoleEl.textContent = output + "\nError:\n" + err.message;
  }
}

function resetPlayground() {
  const challengeSelect = document.getElementById('playground-challenge-select');
  const selectedChallenge = challengeSelect ? challengeSelect.value : 'custom';
  const challengeData = PLAYGROUND_CHALLENGES[selectedChallenge];
  
  if (monacoEditor && challengeData) {
    monacoEditor.setValue(challengeData.starter);
  }
}

function clearPlaygroundConsole() {
  const consoleEl = document.getElementById('playground-console');
  if (consoleEl) {
    consoleEl.textContent = "";
  }
}

function setupPlaygroundListeners() {
  const challengeSelect = document.getElementById('playground-challenge-select');
  const challengeDesc = document.getElementById('playground-challenge-desc');
  const runBtn = document.getElementById('playground-run-btn');
  const resetBtn = document.getElementById('playground-reset-btn');
  const clearConsoleBtn = document.getElementById('playground-clear-console-btn');

  if (challengeSelect) {
    challengeSelect.addEventListener('change', (e) => {
      const challengeKey = e.target.value;
      const challengeData = PLAYGROUND_CHALLENGES[challengeKey];
      if (challengeData) {
        if (challengeDesc) challengeDesc.innerHTML = challengeData.desc;
        if (monacoEditor) monacoEditor.setValue(challengeData.starter);
      }
    });
  }

  if (runBtn) {
    runBtn.addEventListener('click', runPlaygroundCode);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetPlayground);
  }

  if (clearConsoleBtn) {
    clearConsoleBtn.addEventListener('click', clearPlaygroundConsole);
  }
}
