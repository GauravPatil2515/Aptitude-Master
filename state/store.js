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
  dsaNotes: {},   // { 'two-sum': 'Use hash map' }
  dsaCode: {},    // { 'two-sum': 'function twoSum...' }  user code drafts in solve space
  sql: {},        // { 'sql_175': 'completed' }
  sqlNotes: {},   // { 'sql_175': 'LEFT JOIN pattern' }
  scores: {},     // { 'aptitude/percentages': 85 }
  mistakes: [],
  mockHistory: {},  // { 'tcs-1': [{ pct, at }] } — last attempts per mock
  profile: { branch: '', target: '', name: '' },
  theme: 'dark',
  lastSession: null,
  todayAgenda: null,
};

// Static chapter counts per subject (used to derive real completion %).
// NOTE: if chapters are added later, update this map. DSA/SQL counts reflect
// the actual problem banks (110 / 299); others reflect authored chapters.
const SUBJECT_CHAPTER_COUNTS = {
  aptitude: 16, 'core-cs': 5, dsa: 110, sql: 299, ml: 6, 'ai-engineer': 6,
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

  setDSANotes(notes) {
    _state.dsaNotes = { ...(_state.dsaNotes || {}), ...notes };
    saveState(_state);
  },

  setDSACode(code) {
    _state.dsaCode = { ...(_state.dsaCode || {}), ...code };
    saveState(_state);
  },

  setSQL(problemId, status) {
    _state.sql = _state.sql || {};
    _state.sql[problemId] = status;
    saveState(_state);
  },

  setSQLNotes(notes) {
    _state.sqlNotes = { ...(_state.sqlNotes || {}), ...notes };
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

  // Real, multi-signal completion status for a subject (no fake 100%).
  // Derives done-count from actual activity: chapter visits for content
  // subjects, completed DSA/SQL problems for tracker subjects.
  subjectStatus(subjectId) {
    const visited = Object.keys(_state.progress || {})
      .filter(k => k.startsWith(subjectId + '/') && _state.progress[k]);
    let done;
    if (subjectId === 'dsa') done = Object.values(_state.dsa || {}).filter(v => v === 'completed').length;
    else if (subjectId === 'sql') done = Object.values(_state.sql || {}).filter(v => v === 'completed').length;
    else done = visited.length;

    const total = SUBJECT_CHAPTER_COUNTS[subjectId] || Math.max(visited.length, 1);
    const pct = Math.min(100, Math.round((done / total) * 100));
    let status = 'not-started';
    if (pct >= 100) status = 'done';
    else if (done > 0) status = 'in-progress';
    return { pct, status, done, total };
  },

  // Record a mock attempt to history; keep best score in scores[`mock/<id>`].
  pushMockResult(mockId, pct) {
    _state.mockHistory = _state.mockHistory || {};
    const arr = _state.mockHistory[mockId] || [];
    arr.push({ pct, at: new Date().toISOString() });
    _state.mockHistory[mockId] = arr.slice(-10);
    _state.scores = _state.scores || {};
    _state.scores[`mock/${mockId}`] = Math.max(_state.scores[`mock/${mockId}`] || 0, pct);
    saveState(_state);
  },

  reset() {
    _state = { ...DEFAULT_STATE };
    saveState(_state);
  },
};
