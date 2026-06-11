/**
 * state/storage.js — localStorage helpers + future API bridge
 * In Phase 3: swap saveState/loadState to call /api/progress instead.
 */
const STORAGE_KEY = 'aptitudemaster_state_v2';

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch(e) {
    console.warn('State save failed (storage full?):', e);
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch(e) {
    console.warn('State load failed:', e);
    return {};
  }
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

// Phase 3 bridge stubs — uncomment and implement when Supabase is ready
// export async function saveStateRemote(state) {
//   await fetch('/api/progress', { method: 'POST', body: JSON.stringify(state), headers: { 'Content-Type': 'application/json' } });
// }
// export async function loadStateRemote() {
//   const res = await fetch('/api/progress');
//   return res.ok ? res.json() : {};
// }
