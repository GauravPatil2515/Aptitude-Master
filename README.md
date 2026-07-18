# AptitudeMaster — Placement Preparation Platform

A vanilla‑JavaScript single‑page app (SPA) for Indian campus placement prep
(TCS, Infosys, Wipro, Accenture, product companies). Built with a modular
design system, data‑driven content modules, and an AI‑powered tutor
(Groq / Llama‑3.1‑8B via a Vercel Edge proxy). No frontend frameworks.

---

## Quick Start

```bash
# 1. Serve the static app (any static server works)
python3 -m http.server 8099
#    → open http://localhost:8099

# or with Node
npx serve .
```

No build step and no `npm install` are required — the app is plain ES
modules loaded directly by the browser. For the **AI Tutor** you need a
Groq API key:

- Local: Settings ⚙️ → paste your Groq key (stored in `localStorage`).
- Production: set the `GROQ_API_KEY` environment variable on Vercel
  (see `.env.example`); the app proxies through `/api/groq`.

> ⚠️ **No API key is ever hard‑coded in the source.** See `features/AI.md`
> and `api/ai.js` / `api/groq.js`.

---

## Project Structure

```
Tcs/
├── index.html          # Entry point — loads CSS, bootstraps the router
├── router.js           # Hash-based SPA router (#/route)
├── api/                # AI client (ai.js) + Vercel Edge proxy (groq.js)
├── components/         # Reusable UI: sidebar, topbar, card, quiz-card, toast, markdown
├── data/               # Subject content modules (aptitude, core-cs, dsa, sql, ml, ai-engineer, mocks)
├── pages/              # SPA views: home, subject, chapter, practice, dsa,
│                       #   playground, cheatsheet, ai-tutor, mock, sql-sheet
├── state/              # Redux-style store (store.js) + localStorage helpers (storage.js)
├── style/              # Design system: tokens, layout, components, themes, utilities, pages (6 files)
├── modules/            # Optional features: ads, calendar, ai (weak-topic advisor)
├── features/           # AI integration guide (features/AI.md)
├── Docs/               # Obsidian vault — architecture & module MOC (see Docs/00-Index.md)
├── reference/          # ⚠️ Non-app material: source PDFs/DOCXs, extracted images,
│                       #   the paper-processing venv, and an archived old app clone.
│                       #   NOT served by the app. See reference/REFERENCE_DATA.md.
├── vercel.json         # Vercel deployment config
├── PROJECT.md          # Full spec, architecture, changelog, extension guide
├── .gitignore          # Excludes reference/, venv, secrets, build output
└── .env.example        # Template for the server-side GROQ_API_KEY
```

The application source lives entirely in the top‑level directories above
(`api/`, `components/`, `data/`, `pages/`, `state/`, `style/`, `modules/`)
plus `index.html`, `router.js`, and `vercel.json`. **Everything under
`reference/` is archival** and is git‑ignored.

---

## Key Features

- **Modular SPA** — Vanilla ES modules + hash router, code‑split via dynamic imports.
- **Design System** — 6 modular CSS files (tokens, layout, components, themes, utilities, pages) with light/dark themes.
- **Data‑Driven Content** — Each chapter is a `.js` module exporting `{ title, icon, notes, formulas, shortcuts, questions, aiTutorPrompt }`, registered in its subject `index.js`.
- **AI Tutor** — Groq‑powered chat, per‑chapter prompts, question explanation, similar‑question generation, and a roadmap generator.
- **Weak‑Topic Advisor** (`modules/ai.js`) — Reads your quiz scores, mistake log, and stuck DSA/SQL problems from the store and ranks what to study next; one click generates a daily focus plan (with a graceful fallback when no API key is set).
- **Study Tracker** — Streak, calendar heatmap, progress, mistake log.
- **Mock Test & SQL Sheet** — Full‑length TCS mock (`pages/mock.js` + `data/mocks/`) and an interactive SQL practice sheet (`pages/sql-sheet.js` + `data/sql-sheet.js`).
- **Playground** — Pyodide + Monaco Editor for in‑browser Python.
- **AdSense‑ready** — Dev placeholder ad slots swappable for production IDs.

---

## Architecture at a Glance

| Layer | Files |
|---|---|
| Entry | `index.html` → loads `style/*`, then a `<script type="module">` that boots `router.js`, `sidebar.js`, `topbar.js`, and the `store`. |
| Routing | `router.js` — maps `#/route` to a `render*` function in `pages/`. |
| State | `state/store.js` — single state object, `localStorage`-backed; `updateStreak()`, `logMistake()`, etc. |
| Content | `data/<subject>/index.js` — array of chapter modules. |
| AI | `api/ai.js` (`askAI`) → `api/groq.js` (Edge proxy) or direct Groq call. |
| UI | `components/*` (sidebar, topbar, cards) + `style/*`. |

---

## Documentation

- **`PROJECT.md`** — comprehensive spec: architecture, data model, every
  module, the AI pipeline, deployment, and a "How to Extend" guide.
- **`Docs/`** — Obsidian vault; start at `Docs/00-Index.md` for the
  module/page/component map.
- **`features/AI.md`** — AI Tutor integration details.
- **`reference/REFERENCE_DATA.md`** — what's in `reference/` and how the
  extracted PDF images were generated (`reference/process_papers.py`).

---

## Development Notes

- **Add a chapter** — copy `data/aptitude/percentages.js`, fill it in, and
  push it onto the array in `data/aptitude/index.js`. No router change needed.
- **Add a page** — create `pages/foo.js` exporting `renderFoo()`, register a
  route in `router.js`, and (optionally) a nav item in `components/sidebar.js`.
- **CSS** — edit files in `style/`; the design tokens live in `style/tokens.css`.
- **Secrets** — never commit `.env`. The app reads the key from `localStorage`
  (set in Settings) or the server env var in production.

---

## License

MIT — fork and adapt for your own prep needs.
