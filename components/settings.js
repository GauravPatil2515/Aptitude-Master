/**
 * components/settings.js — Settings modal
 * Lets the user set their Groq API key (stored in localStorage) and choose
 * AI mode (direct vs. Vercel proxy). No secrets are ever hard-coded.
 *
 * Wire once at boot: import { initSettings } from './components/settings.js';
 * initSettings();  // mounts the gear button + modal markup
 */

let mounted = false;

export function initSettings() {
  if (mounted) return;
  mounted = true;

  // Gear button lives in the topbar-right cluster (added by renderTopbar).
  // We inject it lazily so it works even if topbar re-renders.
  ensureGearButton();

  // Build modal markup once.
  if (!document.getElementById('settings-modal')) {
    const modal = document.createElement('div');
    modal.id = 'settings-modal';
    modal.className = 'modal-overlay';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div class="modal__header">
          <h2 class="modal__title" id="settings-title">Settings</h2>
          <button class="modal__close" id="settings-close" aria-label="Close settings">&times;</button>
        </div>
        <div class="modal__body">
          <div class="form-group">
            <label class="form-label" for="settings-api-key">Groq API Key</label>
            <input type="password" id="settings-api-key" class="input-field"
                   placeholder="gsk_… (leave blank to use server proxy)"
                   autocomplete="off" spellcheck="false">
            <p class="form-hint">Stored only in this browser (localStorage). Get a free key at console.groq.com.</p>
          </div>

          <div class="form-group">
            <label class="form-label" for="settings-ai-mode">AI Mode</label>
            <select id="settings-ai-mode" class="input-field">
              <option value="direct">Direct (use my key above)</option>
              <option value="proxy">Proxy (server GROQ_API_KEY via /api/groq)</option>
            </select>
            <p class="form-hint">Proxy mode keeps the key server-side — use it in production deployments.</p>
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--ghost btn--sm" id="settings-clear">Clear Key</button>
          <div style="flex:1"></div>
          <button class="btn btn--ghost btn--sm" id="settings-cancel">Cancel</button>
          <button class="btn btn--primary btn--sm" id="settings-save">Save</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    const close = () => { modal.hidden = true; };
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.getElementById('settings-close').addEventListener('click', close);
    document.getElementById('settings-cancel').addEventListener('click', close);
    document.getElementById('settings-save').addEventListener('click', () => {
      const key = document.getElementById('settings-api-key').value.trim();
      const mode = document.getElementById('settings-ai-mode').value;
      if (key) localStorage.setItem('groq_api_key', key);
      localStorage.setItem('ai_mode', mode);
      close();
      toast('Settings saved.');
    });
    document.getElementById('settings-clear').addEventListener('click', () => {
      localStorage.removeItem('groq_api_key');
      document.getElementById('settings-api-key').value = '';
      toast('API key cleared.');
    });

    // Escape closes
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });
  }

  // Open handler (delegated so it survives topbar re-renders)
  document.addEventListener('click', (e) => {
    if (e.target.closest('#settings-gear-btn')) {
      openSettings();
    }
  });
}

function ensureGearButton() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;
  const right = topbar.querySelector('.topbar-right');
  if (right && !document.getElementById('settings-gear-btn')) {
    const btn = document.createElement('button');
    btn.id = 'settings-gear-btn';
    btn.className = 'btn btn--ghost btn--icon';
    btn.title = 'Settings';
    btn.setAttribute('aria-label', 'Open settings');
    btn.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>';
    right.prepend(btn);
  }
}

function openSettings() {
  const modal = document.getElementById('settings-modal');
  if (!modal) return;
  const keyInput = document.getElementById('settings-api-key');
  const modeSel = document.getElementById('settings-ai-mode');
  // Show a masked hint rather than the raw key
  const existing = localStorage.getItem('groq_api_key');
  keyInput.value = existing ? '••••••••••••' : '';
  keyInput.placeholder = existing ? 'Key set — paste a new one to replace' : 'gsk_…';
  modeSel.value = localStorage.getItem('ai_mode') || 'direct';
  modal.hidden = false;
  keyInput.focus();
}

// Lightweight toast (avoids a hard dependency on components/toast.js ordering)
function toast(msg) {
  try {
    // Prefer the shared toast if available
    // eslint-disable-next-line no-undef
    if (typeof showToast === 'function') { showToast(msg, 'success'); return; }
  } catch (_) { /* ignore */ }
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#1f2937;color:#fff;padding:10px 16px;border-radius:8px;font-size:13px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,.3)';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}
