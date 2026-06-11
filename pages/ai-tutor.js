/**
 * pages/ai-tutor.js — AI Tutor Page (full-page chat)
 * Real Groq LLM integration, scoped to user's study context.
 */
import { store } from '../state/store.js';
import { askAI } from '../api/ai.js';

export function renderAITutor() {
  const app = document.getElementById('page-content');
  const s = store.get();

  app.innerHTML = `
    <div class="page page--ai-tutor">
      <div class="ai-tutor-layout">
        <div class="ai-tutor-sidebar">
          <h2 class="ai-tutor-sidebar__title">🤖 AI Tutor</h2>
          <p class="ai-tutor-sidebar__desc">Ask me anything about your placement prep. I'll help you understand concepts, generate practice questions, and build a study roadmap.</p>
          <div class="ai-context-form">
            <label class="form-label">Your Branch</label>
            <input type="text" id="ai-branch" class="input-field" placeholder="CSE, ECE, MBA…" value="${s.profile?.branch || ''}">
            <label class="form-label">Target Company</label>
            <input type="text" id="ai-target" class="input-field" placeholder="TCS, Google, Infosys…" value="${s.profile?.target || ''}">
            <button class="btn btn--primary" id="ai-roadmap-btn">Generate Roadmap ✨</button>
          </div>
          <div class="ai-quick-prompts">
            <div class="ai-quick-prompts__title">Quick Prompts</div>
            <button class="quick-prompt-btn" data-prompt="Give me a 7-day revision plan for aptitude">📅 7-day revision plan</button>
            <button class="quick-prompt-btn" data-prompt="What are the top 5 aptitude shortcuts for TCS NQT?">⚡ Top shortcuts for TCS</button>
            <button class="quick-prompt-btn" data-prompt="Explain time and work problems with examples">⏱ Time & Work tricks</button>
            <button class="quick-prompt-btn" data-prompt="Give me 5 hard SQL interview questions with answers">🗃️ SQL interview Qs</button>
          </div>
        </div>
        <div class="ai-tutor-chat">
          <div class="chat-messages" id="chat-messages">
            <div class="chat-msg chat-msg--bot">
              👋 Hi! I'm your AI placement prep tutor. Ask me anything — aptitude tricks, DSA concepts, SQL queries, or company-specific prep strategies!
            </div>
          </div>
          <div class="chat-input-row">
            <input type="text" id="chat-input" class="input-field" placeholder="Ask me anything…" style="margin:0;flex:1">
            <button class="btn btn--primary" id="chat-send">Send →</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const SYSTEM = `You are an expert placement preparation tutor for Indian engineering students targeting TCS, Infosys, Wipro, Accenture, and product companies. Help with aptitude, DSA, SQL, Core CS, and ML questions. Be concise, give examples, and focus on shortcuts and patterns.`;

  async function sendMessage(msg) {
    if (!msg.trim()) return;
    appendMsg('user', msg);
    appendMsg('bot', '⏳ Thinking…');
    try {
      const reply = await askAI(SYSTEM, msg);
      const bots = document.querySelectorAll('.chat-msg--bot');
      bots[bots.length - 1].textContent = reply;
    } catch(e) {
      const bots = document.querySelectorAll('.chat-msg--bot');
      bots[bots.length - 1].textContent = '⚠️ AI unavailable. Check your API key in settings.';
    }
  }

  document.getElementById('chat-send')?.addEventListener('click', () => {
    const inp = document.getElementById('chat-input');
    const msg = inp?.value?.trim();
    if (inp) inp.value = '';
    sendMessage(msg);
  });

  document.getElementById('chat-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('chat-send')?.click();
  });

  document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.dataset.prompt));
  });

  document.getElementById('ai-roadmap-btn')?.addEventListener('click', () => {
    const branch = document.getElementById('ai-branch')?.value || 'CSE';
    const target = document.getElementById('ai-target')?.value || 'TCS';
    store.setProfile({ branch, target });
    sendMessage(`I'm a ${branch} student targeting ${target}. Generate a personalized 30-day placement prep roadmap for me.`);
  });
}

function appendMsg(role, text) {
  const box = document.getElementById('chat-messages');
  if (!box) return;
  const div = document.createElement('div');
  div.className = `chat-msg chat-msg--${role}`;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
