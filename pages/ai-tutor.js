/**
 * pages/ai-tutor.js — Standalone AI Tutor Page
 * Full-page chat experience scoped to user's weak topics
 */
import { store } from '../state/store.js';
import { askAI } from '../api/ai.js';

const SYSTEM_PROMPT = `You are AptitudeMaster AI, an expert tutor for campus placements.
You help students with Aptitude, Logical Reasoning, Core CS (OS, DBMS, Networks, OOPs), SQL, DSA, and ML.
Always give clear step-by-step explanations. Use simple language. Include examples.
When asked for shortcuts, give memory tricks. Format responses in plain text, no markdown.`;

let _history = [];

export function renderAITutor() {
  const app = document.getElementById('page-content');
  _history = [];

  app.innerHTML = `
    <div class="page page--ai-tutor">
      <div class="ai-tutor-header">
        <h1>🤖 AI Tutor</h1>
        <p class="text-muted">Ask anything — aptitude tricks, concept explanations, practice questions.</p>
      </div>
      <div class="ai-tutor-chat" id="ai-tutor-chat">
        <div class="ai-msg ai-msg--bot">
          Hi! I'm your AI tutor. Ask me anything — a formula, a concept, or "give me 5 questions on percentages".
        </div>
      </div>
      <div class="ai-tutor-input-bar">
        <input type="text" id="ai-tutor-input" class="ai-tutor-input"
               placeholder="e.g. Explain profit & loss shortcuts…"
               onkeydown="if(event.key==='Enter') sendTutorMessage()" />
        <button class="btn btn--primary" onclick="sendTutorMessage()">Send →</button>
      </div>
      <div class="ai-tutor-suggestions">
        ${[
          'What is 20% of 850?',
          'Explain DBMS normalization',
          'Give me 5 easy SQL questions',
          'Shortcut for time & work',
        ].map(s => `
          <button class="suggestion-chip" onclick="document.getElementById('ai-tutor-input').value='${s}';sendTutorMessage()">${s}</button>
        `).join('')}
      </div>
    </div>
  `;
}

window.sendTutorMessage = async function() {
  const input = document.getElementById('ai-tutor-input');
  const chat = document.getElementById('ai-tutor-chat');
  const msg = input?.value?.trim();
  if (!msg || !chat) return;
  input.value = '';

  chat.insertAdjacentHTML('beforeend', `<div class="ai-msg ai-msg--user">${msg}</div>`);
  const loaderId = 'loader-' + Date.now();
  chat.insertAdjacentHTML('beforeend', `<div class="ai-msg ai-msg--bot" id="${loaderId}"><span class="ai-typing">…</span></div>`);
  chat.scrollTop = chat.scrollHeight;

  _history.push({ role: 'user', content: msg });

  try {
    const reply = await askAI(SYSTEM_PROMPT, msg, _history);
    document.getElementById(loaderId).textContent = reply;
    _history.push({ role: 'assistant', content: reply });
  } catch {
    document.getElementById(loaderId).textContent = '⚠️ AI unavailable. Check Vercel env vars for GROQ_API_KEY.';
  }
  chat.scrollTop = chat.scrollHeight;
};
