# 🛠️ Utils / State (MOC)

Utility helpers and application state management.

## Files

- [[state/store.js]] – Central Redux‑like store (immutable state snapshot via `get()` and updater via `set()`). Holds:
  * `streak` – number of consecutive days the user has opened the app and performed at least one action.
  * `lastStudied` – ISO date string of the last day the user interacted with the app.
  * `progress` – nested object `{ subject: percent, subject/chapter: percent }` tracking completion percentages for subjects and individual chapters.
  * `dsa` – object mapping DSA problem IDs to status (`todo`, `in_progress`, `completed`).
  * `sql` – same structure for SQL sheet problems.
  * `scores` – object mapping chapter IDs to latest quiz score (0‑100).
  * `mistakes` – array of objects `{ chapterId, problemId, userAnswer, correctAnswer, timestamp }` used for error analysis.
  * `profile` – `{ branch: string, target: string, name: string }` – user’s academic stream, target company, and optional display name.
  * `theme` – `'dark'` or `'light'`; toggled via the sidebar theme button.
  * `lastSession` – `{ href: string, label: string }` – the last visited route for quick‑return.
  * `todayAgenda` – optional array of suggested activities for the day (filled by the AI roadmap generator).
  * Helper setters: `setProgress`, `setDSA`, `setDSANotes`, `setSQL`, `setSQLNotes`, `setProfile`, `setTheme`, `setStreak`, `setLastStudied`, `setLastSession`, `setTodayAgenda`, etc.
- [[state/storage.js]] – Thin wrapper around `localStorage` with a versioned key (`aptitudemaster_state_v2`). Provides `loadState()` and `saveState()` used by `store.js` on initialization and updates.
  * `loadState()` → returns parsed state object or `{}` if none.
  * `saveState(state)` → stringifies and stores under the versioned key.
  * Also includes helpers for notes: `loadDSANotes()/saveDSANotes()`, `loadSQLNotes()/saveSQLNotes()`, and for the calendar module: `loadStudyLog()/saveStudyLog()`.

## How It Works

1. **App start** – `store.js` calls `storage.loadState()` to hydrate state from `localStorage`. If the stored version differs, defaults are used.
2. **State mutation** – Whenever a component calls a setter (e.g., `store.setProgress({ subject: 'aptitude', chapter: 'percentages' }, 85)`), the store creates a new immutable state object, then invokes `storage.saveState(newState)` to persist.
3. **Reading state** – Components and pages import `{ store } from '../state/store.js'` and call `store.get()` to obtain the current state snapshot, or subscribe via a custom listener if they need real‑time updates (currently implemented via manual getter calls on render).
4. **Persistence** – Because the store saves on every change, a page refresh restores the exact UI state (scroll positions are handled separately by each component’s internal state).

## Related

- [[00-Index]] – Main MOC.
- [[01-API]] – AI tutor uses `store.get()` to read user profile (branch/target) for roadmap generation.
- [[03-Pages]] – Nearly every page reads/writes the store (progress, streaks, DSA status, notes, etc.).
- [[04-Components]] – Sidebar reads streak and progress from the store; the theme toggle reads/writes `store.theme`.

## Tags

#state #store #storage #utils

---