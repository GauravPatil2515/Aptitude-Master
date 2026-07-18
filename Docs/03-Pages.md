# 📄 Pages (MOC)

All SPA views are rendered by the router (`router.js`). Each file in `pages/` exports a `render<PageName>()` function that populates `#page-content`.

## Pages

- [[pages/home.js]] – Landing/dashboard with streaks, quick stats, and subject overview. Shows daily streak, subject progress circles, and quick‑access buttons.
- [[pages/subject.js]] – Subject selector page; shows cards for each subject (Aptitude, Core CS, DSA, SQL, ML & AI, AI Engineer). Clicking a subject opens its chapter list.
- [[pages/chapter.js]] – Displays notes, formulas, shortcuts for a specific chapter; includes an AI drawer (“Ask AI to Explain”) that uses the chapter’s `aiTutorPrompt`.
- [[pages/practice.js]] – Quiz mode for a chapter; shows questions, tracks score, timer (with urgency pulse), and post‑answer AI explanation.
- [[pages/dsa.js]] – DSA tracker (Striver‑style A2Z sheet) with company tags, difficulty filters, progress tracking, and notes column. Allows filtering by difficulty, company, and status.
- [[pages/sql-sheet.js]] – SQL practice sheet (LeetCode‑style) with company tags, difficulty, pattern hints, and notes. Supports same filtering as DSA.
- [[pages/cheatsheet.js]] – Quick reference cheat sheet (formulas) for a selected subject. Presents formulas in compact cards with copy‑to‑clipboard.
- [[pages/ai-tutor.js]] – Full‑screen AI Tutor chat with conversation history (saved to localStorage), markdown rendering, copy‑to‑clipboard on code blocks, quick prompts, roadmap generator based on user profile, and per‑message timestamps with subtle fade‑in animation.
- [[pages/playground.js]] – Python (Pyodide) / JavaScript playground with curated challenges (percentage calculator, two‑sum, etc.) and a custom scratchpad. Includes extra domain‑specific challenges: Company‑Specific SQL (Amazon) and Model Evaluation Metrics. Allows language switching and executing code safely.

## Related

- [[00-Index]] – Main MOC.
- [[04-Components]] – Reusable UI components used across pages (sidebar, topbar, cards, toast, etc.).
- [[05-Data]] – Chapter data manifests that power the subject/chapter pages.
- [[01-API]] – AI backend used by `ai-tutor.js` and the AI drawer in `chapter.js` / `practice.js`.

## Tags

#page #home #subject #chapter #practice #dsa #sql #cheatsheet #ai-tutor #playground

---