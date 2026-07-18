/**
 * pages/ai-tutor.js — AI Tutor Page (full-page chat)
 * Rich chat UI with markdown rendering, code blocks, copy buttons,
 * conversation history, topic-aware context, and quick prompts.
 */
import { store } from '../state/store.js';
import { askAI } from '../api/ai.js';

export function renderAITutor() {
  const app = document.getElementById('page-content');
  const s = store.get();

  app.innerHTML = `
    <div class="page page--ai-tutor">
      <div class="ai-tutor-layout">

        <!-- SIDEBAR: Context + Quick Prompts -->
        <aside class="ai-tutor-sidebar">
          <div class="ai-tutor-sidebar__title">AI Tutor</div>
          <p class="ai-tutor-sidebar__desc">Your personal placement prep tutor. Ask about aptitude, DSA, SQL, Core CS, ML, or company-specific strategies.</p>

          <div class="ai-context-form">
            <label class="form-label">Your Branch</label>
            <input type="text" id="ai-branch" class="input-field" placeholder="CSE, ECE, MBA…" value="${s.profile?.branch || ''}">
            <label class="form-label">Target Company</label>
            <input type="text" id="ai-target" class="input-field" placeholder="TCS, Google, Infosys…" value="${s.profile?.target || ''}">
            <button class="btn btn--primary btn--full" id="ai-roadmap-btn">Generate Roadmap</button>
          </div>

          <div class="ai-quick-prompts">
            <div class="ai-quick-prompts__title">Quick Prompts</div>
            <button class="quick-prompt-btn" data-prompt="Give me a 7-day revision plan for aptitude with daily targets">7-day revision plan</button>
            <button class="quick-prompt-btn" data-prompt="What are the top 5 aptitude shortcuts for TCS NQT?">Top shortcuts for TCS</button>
            <button class="quick-prompt-btn" data-prompt="Explain time and work problems with step-by-step examples">Time & Work tricks</button>
            <button class="quick-prompt-btn" data-prompt="Give me 5 hard SQL interview questions with answers and explanations">SQL interview Qs</button>
            <button class="quick-prompt-btn" data-prompt="Explain the two-sum problem and its optimal solution with code">Two Sum — DSA</button>
            <button class="quick-prompt-btn" data-prompt="What are the most important OS concepts for placement exams?">OS key topics</button>
            <button class="quick-prompt-btn" data-prompt="Explain normalization in DBMS with examples up to BCNF">DBMS Normalization</button>
            <button class="quick-prompt-btn" data-prompt="What is gradient descent? Explain with a simple numerical example">Gradient Descent</button>
          </div>

          <div style="margin-top:auto;padding-top:var(--space-4)">
            <button class="btn btn--ghost btn--sm btn--full" id="ai-clear-chat">Clear Chat</button>
          </div>
        </aside>

        <!-- MAIN: Chat area -->
        <div class="ai-tutor-chat">
          <div class="chat-messages" id="chat-messages">
            <div class="chat-msg chat-msg--bot">
              Hi! I'm your AI placement prep tutor.<br><br>
              I can help you with:<br>
              • <strong>Aptitude</strong> — shortcuts, tricks, practice<br>
              • <strong>DSA</strong> — algorithms, patterns, code<br>
              • <strong>SQL</strong> — queries, joins, window functions<br>
              • <strong>Core CS</strong> — OS, DBMS, CN, OOPs<br>
              • <strong>ML & AI</strong> — concepts, math, projects<br>
              • <strong>Company prep</strong> — TCS, Infosys, Google, etc.<br><br>
              Ask me anything or try a quick prompt →
            </div>
          </div>
          <div class="chat-input-row">
            <input type="text" id="chat-input" class="input-field" placeholder="Ask anything… (Ctrl+Enter to send)" style="margin:0;flex:1">
            <button class="btn btn--primary" id="chat-send">Send →</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const SYSTEM = `You are an expert placement preparation tutor for Indian engineering students targeting TCS, Infosys, Wipro, Accenture, and product companies. Help with aptitude, DSA, SQL, Core CS, and ML questions. Be concise, give examples, and focus on shortcuts and patterns. Use markdown formatting: **bold**, ` + '`code`' + `, and code blocks with ` + '```' + ` for multi-line code.`;

  // ── Conversation history ──
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('ai_tutor_history') || '[]');
  } catch { history = []; }

  // Restore history
  history.forEach(msg => {
    appendMsg(msg.role, msg.text, msg.time || Date.now(), false);
  });

  async function sendMessage(msg) {
    if (!msg.trim()) return;
    const userTime = Date.now();
    appendMsg('user', msg, userTime);
    saveHistory('user', msg);

    const thinkingMsg = appendMsg('bot', 'Thinking…', Date.now());
    try {
      const reply = await askAI(SYSTEM, msg);
      thinkingMsg.remove();
      const botTime = Date.now();
      appendMsg('bot', reply, botTime);
      saveHistory('bot', reply);
    } catch (e) {
      thinkingMsg.remove();
      appendMsg('bot', 'AI unavailable. Check your API key in settings.', Date.now());
    }
  }

  function saveHistory(role, text) {
    history.push({ role, text, time: Date.now() });
    // Keep last 50 messages
    if (history.length > 50) history = history.slice(-50);
    localStorage.setItem('ai_tutor_history', JSON.stringify(history));
  }

  function appendMsg(role, text, timestamp = Date.now(), animate = true) {
    const box = document.getElementById('chat-messages');
    if (!box) return null;
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg--${role}`;
    if (animate) div.style.animation = 'msgIn 0.2s ease-out';
    else div.style.animation = 'none';

    if (role === 'bot') {
      // Simple markdown rendering
      div.innerHTML = renderMarkdown(text);
      // Add copy buttons to code blocks
      div.querySelectorAll('pre').forEach(pre => {
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(pre.textContent).catch(() => {});
          copyBtn.textContent = 'Copied';
          setTimeout(() => copyBtn.textContent = 'Copy', 1500);
        };
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
      });
      // Add timestamp
      const timeSpan = document.createElement('span');
      timeSpan.className = 'msg-time';
      const date = new Date(timestamp);
      timeSpan.textContent = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      timeSpan.style.cssText = 'display:block;text-align:right;font-size:0.75rem;color:var(--text-tertiary);margin-top:4px;';
      div.appendChild(timeSpan);
    } else {
      div.textContent = text;
      // Add timestamp for user messages as well (right-aligned)
      const timeSpan = document.createElement('span');
      timeSpan.className = 'msg-time';
      const date = new Date(timestamp);
      timeSpan.textContent = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      timeSpan.style.cssText = 'display:block;text-align:right;font-size:0.75rem;color:var(--text-tertiary);margin-top:4px;';
      div.appendChild(timeSpan);
    }

    if (!animate) div.style.animation = 'none';
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
  }

  function renderMarkdown(text) {
    if (!text) return '';
    let html = text
      // Code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Bold
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Line breaks
      .replace(/\n/g, '<br>');
    return html;
  }

  // ── Event listeners ──
  document.getElementById('chat-send')?.addEventListener('click', () => {
    const inp = document.getElementById('chat-input');
    const msg = inp?.value?.trim();
    if (inp) inp.value = '';
    sendMessage(msg);
  });

  document.getElementById('chat-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.getElementById('chat-send')?.click();
    }
  });

  document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.dataset.prompt));
  });

  document.getElementById('ai-roadmap-btn')?.addEventListener('click', () => {
    const branch = document.getElementById('ai-branch')?.value || 'CSE';
    const target = document.getElementById('ai-target')?.value || 'TCS';
    store.setProfile({ branch, target });
    sendMessage(`I'm a ${branch} student targeting ${target}. Generate a personalized 30-day placement prep roadmap for me. Include daily topics, practice goals, and revision strategy.`);
  });

  document.getElementById('ai-clear-chat')?.addEventListener('click', () => {
    history = [];
    localStorage.removeItem('ai_tutor_history');
    const box = document.getElementById('chat-messages');
    if (box) {
      const now = Date.now();
      const date = new Date(now);
      const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      box.innerHTML = `
        <div class="chat-msg chat-msg--bot">
          Chat cleared! Ask me anything about your placement prep.
          <span class="msg-time" style="display:block;text-align:right;font-size:0.75rem;color:var(--text-tertiary);margin-top:4px;">${timeStr}</span>
        </div>
      `;
    }
  });
}
