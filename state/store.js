/**
 * state/store.js — Centralized State Management
 * Single source of truth. Backed by localStorage, ready for API bridge in Phase 3.
 */
import { saveState, loadState } from './storage.js';

const DEFAULT_STATE = {
  streak: 0,
  lastStudied: null,
  progress: {},   // { 'aptitude': 60, 'aptitude/percentages': 'visited' }
  dsa: {},        // { 'two-sum': 'completed' }
  scores: {},     // { 'aptitude/percentages': 85 }
  mistakes: [],
  profile: { branch: '', target: '' },
  theme: 'dark',
  lastSession: null,
  todayAgenda: null,
};

let _state = { ...DEFAULT_STATE, ...loadState() };

export const store = {
  get() { return { ..._state }; },

  set(key, value) {
    _state[key] = value;
    saveState(_state);
  },

  setProgress(subjectId, chapterId, value) {
    _state.progress = _state.progress || {};
    _state.progress[`${subjectId}/${chapterId}`] = value;
    _state.lastSession = { href: `#/chapter/${subjectId}/${chapterId}`, label: chapterId.replace(/-/g, ' ') };
    this._recalcSubjectProgress(subjectId);
    saveState(_state);
  },

  setScore(subjectId, chapterId, pct) {
    _state.scores = _state.scores || {};
    _state.scores[`${subjectId}/${chapterId}`] = pct;
    saveState(_state);
  },

  setDSA(problemId, status) {
    _state.dsa = _state.dsa || {};
    _state.dsa[problemId] = status;
    saveState(_state);
  },

  setProfile(profile) {
    _state.profile = { ..._state.profile, ...profile };
    saveState(_state);
  },

  addMistake(mistake) {
    _state.mistakes = _state.mistakes || [];
    _state.mistakes.unshift({ ...mistake, id: Date.now(), date: new Date().toISOString() });
    saveState(_state);
  },

  updateStreak() {
    const today = new Date().toDateString();
    if (_state.lastStudied === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    _state.streak = _state.lastStudied === yesterday ? (_state.streak || 0) + 1 : 1;
    _state.lastStudied = today;
    saveState(_state);
  },

  _recalcSubjectProgress(subjectId) {
    const keys = Object.keys(_state.progress).filter(k => k.startsWith(subjectId + '/'));
    // Simple heuristic: each visited chapter = equal weight
    // Will be replaced with proper chapter count from manifest in Phase 3
    const visited = keys.filter(k => _state.progress[k]).length;
    _state.progress[subjectId] = Math.min(100, Math.round((visited / Math.max(keys.length, 1)) * 100));
  },

  reset() {
    _state = { ...DEFAULT_STATE };
    saveState(_state);
  },
};
