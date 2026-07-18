# 🧩 Modules (MOC)

Optional self‑contained features loaded via `<script>` tags in `index.html`. Each module exposes a global variable (e.g., `AdsModule`, `CalendarModule`) and can be enabled/disabled independently.

## Existing Modules

- [[modules/ads.js]] – Google AdSense slot manager (placeholders for dev, replace IDs for prod).
  * Provides three ad slots: leaderboard (728×90), rectangle (300×250), banner (468×60).
  * In development shows styled placeholder blocks; in production loads the real AdSense script.
- [[modules/calendar.js]] – Study‑day calendar tracker (`localStorage` key `aptitude_study_log`).
  * Renders a month‑view grid in the sidebar.
  * Allows marking each day as *studied*, *partial*, or *missed*.
  * Exposes `markToday(status)` and `getLog()` for other modules (e.g., AI advisor) to consume.

## Planned / Referenced Modules

- [[modules/ai.js]] – **AI advisor / weak-topic detector** (implemented). Reads `store` (mistakes, low quiz scores, stuck DSA/SQL problems), ranks the weakest topics, and renders an "AI Study Advisor" card on the Home dashboard. A "Generate my focus plan" button calls the Groq-backed `askAI()` (see [[01-API]]) to produce a prioritised daily plan, with a graceful local fallback when no API key is configured.
- [[modules/playground.js]] – *Phase‑B* Monaco + Pyodide loader for the Python Playground. Not yet implemented.
  * Will replace the current inline editor with a full‑featured Monaco editor.
  * Will manage Pyodide lifecycle and provide richer language support (C++, Java, etc.).

## Related

- [[00-Index]] – Main MOC.
- [[03-Pages]] – Pages that may interact with modules (e.g., Playground page uses `modules/playground.js` if present).
- [[01-API]] – API layer used by the AI advisor module.

## Tags

#module #ads #calendar #ai #playground

---