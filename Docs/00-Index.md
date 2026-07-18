# 📚 Application Map of Content (MOC)

Welcome to the central knowledge base for the **AptitudeMaster** placement‑preparation application.

## 🗂️ Core Sections

- [[01-API]] – All API endpoints, edge functions, and helper functions (`api/`) • Handles AI requests (`askAI`, `generateSimilarQuestions`) and the Vercel proxy (`groq.js`).
- [[02-Modules]] – Optional IIFE modules (`modules/`) • Includes ads, calendar, and placeholders for future AI advisor & playground loader.
- [[modules/ai.js|AI]] and [[modules/playground.js|Playground]].
- [[03-Pages]] – SPA pages rendered by the router (`pages/`) • Home, Subject, Chapter, Practice, DSA, SQL‑Sheet, CheatSheet, AI Tutor, and Playground views.
- [[04-Components]] – Reusable UI components (`components/`) • Sidebar, TopBar, Card, Quiz‑Card, Markdown renderer, Toast notifications.
- [[05-Data]] – Chapter data manifests and subject data (`data/`) • Per‑subject folders with `index.js` manifests and chapter files containing notes, formulas, questions, and AI tutor prompts.
- [[06-Styles]] – Design tokens, CSS utilities, layout, components, pages, themes (`style/`) • 6‑file CSS system (tokens, layout, components, pages, themes, utilities) powering the modern look.
- [[07-Utils]] – Utility helpers, storage, store (`state/`, utils) • Central store (`store.js`) and localStorage wrapper (`storage.js`) for persisting state.
- [[08-Config]] – Configuration files (`vercel.json`, `.gitignore`, `router.js`, etc.) • Vercel config, Git ignore, SPA router, and notes on removed legacy files.

## 🧭 How to Navigate

- Click any link above to jump to the detailed MOC for that area.
- Within each MOC you’ll find links to the individual files (using `[[filename]]` syntax) so Obsidian’s graph view can visualize relationships.
- Use tags (`#api`, `#module`, `#page`, etc.) to filter the graph if desired.

## 📌 Quick Reference

- **Entry point**: `index.html` → loads modular CSS & bootstraps `router.js`
- **State management**: `state/store.js` (central state) + `state/storage.js` (localStorage helpers)
- **Router**: `router.js` – hash‑based SPA router
- **AI layer**: `api/ai.js` (client) ↔ `api/groq.js` (Vercel Edge Function proxy)
- **Design tokens**: `style/tokens.css` – fonts, colours, spacing, shadows, etc.

> 📁 Non‑app material (source PDFs, extracted images, the paper‑processing
> Python venv, and an archived old monolith clone) lives under `reference/`
> and is excluded from git — see `reference/REFERENCE_DATA.md`.
> The canonical project README is the top‑level `README.md`.

---
_Last updated: 2026-06-24_