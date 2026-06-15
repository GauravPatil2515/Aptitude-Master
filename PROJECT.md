---
title: AptitudeMaster
type: project-doc
tags:
  - placement-prep
  - spa
  - aptitude
  - tcs
  - infosys
  - wipro
  - accenture
  - vercel
  - groq
  - ai-tutor
  - pyodide
  - monaco
  - obsidian-doc
status: active
date: 2026-06-15
aliases:
  - AptitudeMaster
  - Placement Prep App
  - TCS Placement Prep
cssclasses: dashboard
---

# PROJECT.md — AptitudeMaster

> Placement preparation platform (Leetcode-style) for Indian campus placements.
> Built with vanilla JS, deployed on Vercel. No frameworks.

Related: [[modules/README.md]] · [[features/AI]] · [[data/]] · [[pages/]] · [[api/ai.js]]

---

## 1. What This Is

[[AptitudeMaster]] is a single-page app for placement preparation covering:

| Subject | Route | Tag |
|---|---|---|
| **Aptitude** (Percentages, Profit & Loss, etc.) | `#/subject/aptitude` | `#subject` `#aptitude` |
| **Core CS** (OS, DBMS, CN, OOP) | `#/subject/core-cs` | `#subject` `#core-cs` |
| **DSA Tracker** (LeetCode-style problem checklist) | `#/dsa` | `#subject` `#dsa` |
| **SQL** (queries, joins, practice) | `#/subject/sql` | `#subject` `#sql` |
| **ML & AI** (basics to advanced) | `#/subject/ml` | `#subject` `#ml` |
| **AI Engineer** (LLMs, RAG, MCP) | `#/subject/ai-engineer` | `#subject` `#ai-engineer` |
| **AI Tutor** ([[pages/ai-tutor.js\|Groq-powered chat]]) | `#/ai-tutor` | `#feature` `#ai` |
| **Playground** ([[pages/playground.js\|Pyodide + Monaco code runner]]) | `#/playground` | `#feature` `#playground` |

Target users: Indian engineering students preparing for [[TCS]], [[Infosys]], [[Wipro]], [[Accenture]], and product companies.

---

## 2. Architecture

### Tech Stack

- **Frontend**: Vanilla JS (ES modules), hash-based [[router.js|SPA router]]
- **CSS**: Design system with 7 modular stylesheets ([[style/]])
- **Backend**: Vercel serverless edge functions ([[api/groq.js|Groq API proxy]])
- **Data**: Per-chapter JS module manifests with dynamic `import()` ([[data/]])
- **Storage**: `localStorage` (Phase 3: planned Supabase migration)
- **Deployment**: Vercel static ([[vercel.json]])

### Two-Era Codebase

This project went through a major refactor (Phase 1 → Phase 2):

1. **Old (monolithic)**: [[app.js|`app.js`]] (1,397 LOC) + [[data.js|`data.js`]] (2,409 LOC) + [[style.css|`style.css`]] (1,345 LOC)
   - Direct DOM manipulation, tab-based navigation, inline styles
   - Still present in repo but **not imported** by [[index.html]]
   - Contains global functions that may conflict

2. **New (modular)**: Page components + design system
   - Hash-based [[router.js|router]] → page modules ([[pages/]])
   - 6-file CSS design system ([[style/tokens.css]], [[style/layout.css]], [[style/components.css]], [[style/themes.css]], [[style/utilities.css]], [[style/pages.css]])
   - State management ([[state/store.js]] + [[state/storage.js]])
   - Reusable components ([[components/]])

**CRITICAL**: The old system is dead code. [[index.html]] only imports the new modular system.

---

## 3. File Map

### Entry Point

```
[[index.html]]                 — Loads modular CSS, marked.js, Monaco (lazy)
                               — Bootstrap module script mounts sidebar, topbar, router
```

### Core

```
[[router.js]]                  — Hash-router with 8 routes + breadcrumb + 404
[[app.js]]                     — [DEAD CODE] Old monolithic app, NOT imported
[[data.js]]                    — [OLD DATA] SYLLABUS_DATA with inline HTML questions
```

### State

```
[[state/store.js]]             — Central state: streak, progress, scores, DSA, profile, theme
[[state/storage.js]]           — localStorage helpers (key: 'aptitudemaster_state_v2')
```

### Pages (8 views)

| Page | File | Route | Tags |
|---|---|---|---|
| Dashboard | [[pages/home.js]] | `#/home` | `#page` `#dashboard` |
| Subject overview | [[pages/subject.js]] | `#/subject/:id` | `#page` `#subject` |
| Chapter notes | [[pages/chapter.js]] | `#/chapter/:subject/:chapter` | `#page` `#chapter` `#ai-drawer` |
| Practice quiz | [[pages/practice.js]] | `#/practice/:subject/:chapter` | `#page` `#practice` `#ai-explain` |
| DSA tracker | [[pages/dsa.js]] | `#/dsa` | `#page` `#dsa` |
| Python playground | [[pages/playground.js]] | `#/playground` | `#page` `#playground` |
| Cheat sheet | [[pages/cheatsheet.js]] | `#/cheatsheet/:subject` | `#page` `#cheatsheet` |
| AI tutor | [[pages/ai-tutor.js]] | `#/ai-tutor` | `#page` `#ai` `#tutor` |

```dataview
TABLE tags, route
FROM #page
SORT file.name ASC
```

### Components (6)

| Component | File | Purpose |
|---|---|---|
| Sidebar | [[components/sidebar.js]] | 2-level nav sidebar (BEM classes) |
| Top bar | [[components/topbar.js]] | Hamburger + breadcrumb + Quick Practice |
| Card | [[components/card.js]] | Factory: creates card DOM elements |
| Quiz card | [[components/quiz-card.js]] | Factory: creates quiz card with options + markAnswer() |
| Markdown | [[components/markdown.js]] | Render markdown (marked.js CDN + basic fallback) |
| Toast | [[components/toast.js]] | Notification system (success/error/info/warning) |

### CSS Design System (7 files)

| File | Purpose |
|---|---|
| [[style/tokens.css]] | CSS custom properties (colors, spacing, radii, shadows) |
| [[style/layout.css]] | Reset, base, sidebar, topbar, content, mobile nav |
| [[style/components.css]] | Cards, buttons, badges, inputs, toasts, utilities |
| [[style/themes.css]] | Light/dark theme overrides, skeleton loading animation |
| [[style/utilities.css]] | Atomic helper classes (flex, spacing, typography) |
| [[style/pages.css]] | Page-specific overrides (hero, quiz, DSA table, AI chat, etc.) |
| [[style.css]] | [DEAD CODE] Old monolithic stylesheet, loaded in index.html but conflicts |

### Data Modules (per-subject manifests)

```
[[data/aptitude/index.js]]      — Manifest: 12 chapters
[[data/aptitude/percentages.js]]       — Chapter data: theory, formulas, questions
[[data/aptitude/profit-loss.js]]       — Chapter data
[[data/core-cs/index.js]]       — Manifest
[[data/dsa/index.js]]           — Manifest: 6 topics, 25+ LeetCode problems with links
[[data/ml/index.js]]            — Manifest
[[data/sql/index.js]]           — Manifest
[[data/ai-engineer/index.js]]   — Manifest: 8 chapters (LLMs, RAG, MCP, etc.)
[[data/ai-engineer/*.js]]       — Chapter data files
```

Every chapter data module exports `aiTutorPrompt` — a per-chapter system prompt for the AI tutor. See [[features/AI]] for the full list.

### API / Edge Functions

```
[[api/ai.js]]                  — Client-side AI call: direct Groq or proxy mode
[[api/groq.js]]                — Vercel Edge Function: hides API key server-side
```

### Modules (legacy, IIFE pattern — problematic)

```
[[modules/ads.js]]             — AdSense slot manager (dev placeholders)
[[modules/calendar.js]]         — Study calendar (month view, activity tracking)
[[modules/rings.js]]            — Animated SVG progress rings (depends on global SYLLABUS_DATA)
```

### Config

```
[[vercel.json]]                — Vercel config: static build, catch-all route
[[.gitignore]]                 — ignores venv, __pycache__, zip, pdf, converted_images
```

---

## 4. Route Map

| Hash | Page | File | Tags |
|---|---|---|---|
| `#/home` | Dashboard | [[pages/home.js]] | `#route` `#dashboard` |
| `#/subject/:id` | Subject overview | [[pages/subject.js]] | `#route` `#subject` |
| `#/chapter/:subject/:chapter` | Chapter notes | [[pages/chapter.js]] | `#route` `#chapter` |
| `#/practice/:subject/:chapter` | Practice quiz | [[pages/practice.js]] | `#route` `#practice` |
| `#/dsa` | DSA Problem Tracker | [[pages/dsa.js]] | `#route` `#dsa` |
| `#/playground` | Python Playground | [[pages/playground.js]] | `#route` `#playground` |
| `#/cheatsheet/:subject` | Formula cheat sheet | [[pages/cheatsheet.js]] | `#route` `#cheatsheet` |
| `#/ai-tutor` | AI Tutor Chat | [[pages/ai-tutor.js]] | `#route` `#ai` `#tutor` |

```dataview
TABLE file.name AS "Page File"
FROM #route
SORT file.name ASC
```

---

## 5. State Shape

```js
{
  streak: 0,                          // consecutive study days
  lastStudied: null,                  // dateString of last activity
  progress: {                         // key: 'subject' (%) or 'subject/chapter' ('visited')
    'aptitude': 35,
    'aptitude/percentages': 'visited',
  },
  dsa: { 'two-sum': 'completed' },   // problem status: todo | in_progress | completed
  scores: { 'aptitude/percentages': 85 },
  mistakes: [],                       // user-logged wrong answers
  profile: { branch: '', target: '', name: '' },
  theme: 'dark',                      // 'dark' | 'light'
  lastSession: { href: '#/...', label: '...' },
  todayAgenda: null,                  // AI-generated or fallback array
}
```

Storage key: `aptitudemaster_state_v2` (`localStorage`)

---

## 6. Known Issues (Being Fixed)

### P0 — Broken/Missing

- **CSS class mismatch**: [[components/sidebar.js|`sidebar.js`]] renders BEM classes (`.sidebar-item`, `.sidebar-logo__text`, etc.) but the CSS for these doesn't exist anywhere. Sidebar renders unstyled.
- **[[style.css]] loaded in [[index.html]] conflicts with modular system**: 1,345-line monolithic file containing duplicated/overridden styles.
- **Sidebar items are `<div>` not `<a>`**: Keyboard-inaccessible, no link semantics, no focus ring.
- **Collapse button does nothing**: `.sidebar-collapsed` CSS class isn't defined.
- **[[style.css]] loads but [[app.js]] doesn't**: Some `style.css` styles target old `app.js` DOM structure. Loading order creates unpredictable specificity.

### P1 — Functional Bugs

- **[[app.js]] is dead code**: 1,397 lines still served to browsers (in [[index.html]]), global function conflicts.
- **DSA tracker full re-render**: Calling innerHTML on entire page for each checkbox click.
- **No loading skeletons**: async data imports show only "Loading..." text.
- **No keyboard shortcuts in practice**: Must click every answer.
- **Timer leak**: `setInterval` not cleaned up on route change.
- **No error boundaries**: Failed data imports show raw path, no way back.
- **Double theme key**: [[app.js]] uses `localStorage('app-theme')`, [[state/store.js]] uses `state.theme`.

### P2 — UX Improvements

- No quiz progress bar.
- No focus-visible styles for keyboard nav.
- No streaming AI responses (feels frozen during API calls).
- Practice header re-renders completely (no transitions).
- Hardcoded user name "Gaurav" in [[pages/home.js]].
- No offline support.

---

## 7. Design Decisions

### Why no framework?

Vanilla JS keeps bundle size minimal (no React/Vue overhead). Target users may have low-end devices and slow networks — every KB matters. The project's tutorial-teaching purpose also benefits from readable, framework-free source.

### Why per-chapter data imports?

Dynamic `import()` enables code-splitting — only load the chapter data the user actually visits. No need to download all 12 aptitude chapters upfront.

### Why localStorage over cookies?

Simpler API, larger storage capacity (5MB vs 4KB), no server-side parsing needed for the current phase.

### Why Groq?

Free tier Llama 3.1 8B with fast inference. Good enough for educational Q&A. Phase 3 will proxy through Vercel to hide the API key.

---

## 8. AI Features

See [[features/AI]] — dedicated doc covering all AI integration points, per-chapter `aiTutorPrompt` reference, API modes, and the full feature matrix.

Quick links:
- [[pages/ai-tutor.js]] — Full AI Tutor page (`#/ai-tutor`)
- [[pages/chapter.js]] — In-chapter AI drawer ("Ask AI to Explain")
- [[pages/practice.js]] — Post-answer AI explain in quiz mode
- [[api/ai.js]] — Client-side AI layer (`askAI()`, `generateSimilarQuestions()`)
- [[api/groq.js]] — Vercel Edge Function (server-side Groq proxy)
- [[modules/ai.js]] — Phase B: Smart AI advisor + weak topic detector

---

## 9. Changelog

### 2026-06-15 — UI/UX Audit & Fixes

**P0 Fixes (Critical/Broken):**
- Sidebar: Converted `<div>` items to proper `<a>` tags for keyboard nav and semantics
- Sidebar: Added full BEM CSS (`.sidebar-item`, `.sidebar-logo`, `.sidebar-section-title`, `.sidebar-streak`, `.sidebar-progress-bar`, `.sidebar-collapse-btn`, `.theme-btn`) to [[style/layout.css]]
- Sidebar: Added `.sidebar-collapsed` state — collapses to 60px icon-only strip on desktop, resets on mobile
- Sidebar: Removed `Router` import dependency — items now use native `href` links

**P1 Fixes (Functional):**
- DSA tracker: Status click now updates only the changed row + stats in-place (no full `innerHTML` re-render)
- Practice: Added keyboard shortcuts — `1-4` select option, `Enter` next, `H` hint, `S` skip
- Practice: Added progress bar showing quiz completion percentage
- Practice: Added timer urgency (red pulse at ≤10s) + cleanup on route change (prevents timer leak)
- Playground: Removed dead `initPlayground()` reference to removed [[app.js]]
- Loading states: All async pages now show skeleton spinner instead of plain text

**P2 Fixes (Polish):**
- Global: Added `:focus-visible` outline styles for keyboard accessibility
- Home: Removed hardcoded "Gaurav" — now reads from `profile.name` (empty = no name shown)
- Store: Added `name` field to profile state shape
- Practice: Added keyboard key hints on option badges and action buttons (`S`, `H`, `1`-`4`)

---

## 10. How to Extend

### Adding a new chapter

1. Create `data/{subject}/{chapter-id}.js` with default export:
   ```js
   export default {
     title: 'Chapter Title',
     icon: '📝',
     difficulty: 'medium',  // easy | medium | hard
     estimatedTime: 45,
     notes: '# Markdown content...',
     formulas: [{ name: '...', formula: '...', example: '...' }],
     shortcuts: ['...'],
     questions: [
       { text: '...', options: ['A','B','C','D'], answer: 0, explanation: '...' }
     ],
     aiTutorPrompt: 'You are a tutor for ...',  // ← AI context for this chapter
   };
   ```
2. Add manifest entry to `data/{subject}/index.js`:
   ```js
   { id: 'chapter-id', title: 'Chapter Title', icon: '📝', difficulty: 'medium', estimatedTime: 45 }
   ```
3. Routes `#/chapter/{subject}/{chapter-id}` and `#/practice/{subject}/{chapter-id}` work automatically.

### Adding a new subject

1. Create `data/{subject}/index.js` with manifest.
2. The sidebar hardcoded list in [[components/sidebar.js]] (line 8-15) needs manual addition.
3. Add metadata to [[pages/subject.js]] `SUBJECT_META` (line 7-13) and [[pages/home.js]] `subjects` array (line 14-20).

### Adding a new route

1. Add `{ pattern: /^\\/path$/, handler: () => renderPage() }` to [[router.js]] `ROUTES`.
2. Import the page render function at top of [[router.js]].

---

```dataview
LIST FROM #project-doc
SORT file.name ASC
```
