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
          <div class="chat-header">
            <div class="chat-header__avatar" aria-hidden="true">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 7V4M9 3h6M9 13h.01M15 13h.01"/></svg>
            </div>
            <div class="chat-header__meta">
              <div class="chat-header__name">AI Tutor</div>
              <div class="chat-header__status"><span class="status-dot ready"></span> Online · placement prep</div>
            </div>
            <button class="btn btn--ghost btn--sm" id="ai-clear-chat-header">Clear Chat</button>
          </div>

          <div class="chat-messages" id="chat-messages">
            <div class="chat-row chat-row--bot">
              <div class="chat-avatar chat-avatar--bot" aria-hidden="true">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 7V4M9 3h6M9 13h.01M15 13h.01"/></svg>
              </div>
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
          </div>

          <div class="chat-input-row">
            <input type="text" id="chat-input" class="input-field" placeholder="Ask anything… (Enter to send)" style="margin:0;flex:1">
            <button class="btn btn--primary" id="chat-send" aria-label="Send message">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              <span>Send</span>
            </button>
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

  // Typing indicator (animated dots), returns the row element to remove later
  function showTyping() {
    const box = document.getElementById('chat-messages');
    if (!box) return null;
    const row = document.createElement('div');
    row.className = 'chat-row chat-row--bot chat-typing';
    row.innerHTML = `
      <div class="chat-avatar chat-avatar--bot" aria-hidden="true">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 7V4M9 3h6M9 13h.01M15 13h.01"/></svg>
      </div>
      <div class="chat-msg chat-msg--bot chat-msg--typing"><span></span><span></span><span></span></div>`;
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
    return row;
  }

  async function sendMessage(msg) {
    if (!msg.trim()) return;
    const userTime = Date.now();
    appendMsg('user', msg, userTime);
    saveHistory('user', msg);

    const typing = showTyping();
    try {
      const reply = await askAI(SYSTEM, msg);
      typing?.remove();
      const botTime = Date.now();
      appendMsg('bot', reply, botTime);
      saveHistory('bot', reply);
    } catch (e) {
      typing?.remove();
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
    const row = document.createElement('div');
    row.className = `chat-row chat-row--${role}`;
    if (animate) row.style.animation = 'msgIn 0.25s cubic-bezier(0.16,1,0.3,1)';
    else row.style.animation = 'none';

    if (role === 'bot') {
      // Avatar (decorative)
      const av = document.createElement('div');
      av.className = 'chat-avatar chat-avatar--bot';
      av.setAttribute('aria-hidden', 'true');
      av.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 7V4M9 3h6M9 13h.01M15 13h.01"/></svg>';
      row.appendChild(av);
    } else {
      const av = document.createElement('div');
      av.className = 'chat-avatar chat-avatar--user';
      av.setAttribute('aria-hidden', 'true');
      av.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
      row.appendChild(av);
    }

    const div = document.createElement('div');
    div.className = `chat-msg chat-msg--${role}`;
    if (role === 'bot') {
      div.innerHTML = renderMarkdown(text);
      // Add copy buttons to code blocks
      div.querySelectorAll('pre').forEach(pre => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(pre.textContent).catch(() => {});
          copyBtn.textContent = 'Copied';
          setTimeout(() => copyBtn.textContent = 'Copy', 1500);
        };
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
      });
    } else {
      div.textContent = text;
    }

    // Timestamp
    const timeSpan = document.createElement('span');
    timeSpan.className = 'msg-time';
    const date = new Date(timestamp);
    timeSpan.textContent = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    div.appendChild(timeSpan);

    row.appendChild(div);
    if (!animate) row.style.animation = 'none';
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
    return div;
  }

  function renderMarkdown(text) {
    if (!text) return '';
    const esc = (s) => s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const lines = text.replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let inCode = false, codeBuf = [];
    let listType = null; // 'ul' | 'ol'
    const closeList = () => { if (listType) { html += `</${listType}>`; listType = null; } };

    const inline = (s) => {
      // links [t](u)
      s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        (_, t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`);
      // bold then italic
      s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
      // inline code
      s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
      return s;
    };

    for (let raw of lines) {
      const line = raw.trimEnd();

      // Fenced code
      if (/^```/.test(line)) {
        if (!inCode) { closeList(); inCode = true; codeBuf = []; }
        else {
          inCode = false;
          html += `<pre><code>${esc(codeBuf.join('\n'))}</code></pre>`;
        }
        continue;
      }
      if (inCode) { codeBuf.push(line); continue; }

      // Headings
      const h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        closeList();
        const lvl = h[1].length;
        html += `<h${lvl} class="md-h md-h${lvl}">${inline(esc(h[2]))}</h${lvl}>`;
        continue;
      }

      // Horizontal rule
      if (/^(-{3,}|\*{3,})$/.test(line)) { closeList(); html += '<hr>'; continue; }

      // Blockquote
      const bq = line.match(/^>\s?(.*)$/);
      if (bq) { closeList(); html += `<blockquote>${inline(esc(bq[1]))}</blockquote>`; continue; }

      // Unordered list
      const ul = line.match(/^[-•*]\s+(.*)$/);
      if (ul) {
        if (listType !== 'ul') { closeList(); html += '<ul>'; listType = 'ul'; }
        html += `<li>${inline(esc(ul[1]))}</li>`;
        continue;
      }
      // Ordered list
      const ol = line.match(/^\d+\.\s+(.*)$/);
      if (ol) {
        if (listType !== 'ol') { closeList(); html += '<ol>'; listType = 'ol'; }
        html += `<li>${inline(esc(ol[1]))}</li>`;
        continue;
      }

      // Blank line
      if (line.trim() === '') { closeList(); continue; }

      // Paragraph
      closeList();
      html += `<p>${inline(esc(line))}</p>`;
    }
    if (inCode) html += `<pre><code>${esc(codeBuf.join('\n'))}</code></pre>`;
    closeList();
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

  document.getElementById('ai-clear-chat')?.addEventListener('click', resetChat);
  document.getElementById('ai-clear-chat-header')?.addEventListener('click', resetChat);

  function resetChat() {
    history = [];
    localStorage.removeItem('ai_tutor_history');
    const box = document.getElementById('chat-messages');
    if (box) {
      const now = Date.now();
      const date = new Date(now);
      const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      box.innerHTML = `
        <div class="chat-row chat-row--bot">
          <div class="chat-avatar chat-avatar--bot" aria-hidden="true">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 7V4M9 3h6M9 13h.01M15 13h.01"/></svg>
          </div>
          <div class="chat-msg chat-msg--bot">
            Chat cleared! Ask me anything about your placement prep.
            <span class="msg-time">${timeStr}</span>
          </div>
        </div>`;
    }
  }

  // Test hook (no-op in production; used by scripts/md-render-test.cjs)
  if (typeof window !== 'undefined' && window.__EXPOSE_RENDER_MD) {
    window.__renderMarkdown = renderMarkdown;
  }
}
