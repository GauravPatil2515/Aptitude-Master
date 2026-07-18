# ⚙️ Configuration (MOC)

Files that configure the build, runtime, and tooling of the AptitudeMaster project.

## Files

- [[vercel.json]] – Vercel deployment configuration: defines a catch‑all route (`/**`) that serves `index.html` for client‑side routing, and creates an serverless function at `/api/groq` that proxies Groq API calls (keeping the API key server‑side). Also sets up environment variables (`GROQ_API_KEY`) and enables edge runtime for low latency.
- [[.gitignore]] – List of files and directories ignored by Git to keep the repository clean. Includes:
  * Dependency folders: `node_modules`, `.kolo/node_modules`, `.vscode/extensions`.
  * Build outputs: `dist/`, `.cache/`, `coverage/`.
  * Environment files: `.env`, `.env.*`.
  * Logs: `*.log`, `npm-debug.log*`.
  * OS artefacts: `.DS_Store`, `Thumbs.db`, `ehthumbs.db`.
  * Misc: `npm-debug.log`, `yarn-debug.log*`, `yarn-error.log*`.
- [[router.js]] – Hash‑based SPA router that maps URL paths to page render functions (`renderHome`, `renderSubject`, `renderChapter`, `renderPractice`, `renderDSA`, `renderSQLSheet`, `renderCheatsheet`, `renderAITutor`, `renderPlayground`). It also defines a 404 fallback that renders a “Page not found” view. The router is initialized in `index.html` after the sidebar and top bar are mounted.
- [[jsconfig.json]] (optional) – If present, configures VS Code/JavaScript language service for path aliases (e.g., `@/` → project root). Not currently in the repository but kept for reference.
- [[pyrightconfig.json]] – Configuration for the Pyright type checker (used for Python‑related stubs in the playground). Enables strict type checking, ignores certain third‑party stubs, and sets the execution environment to `Node16` for better IntelliSense.

## Deprecated / Legacy Files (kept for reference but **not** imported by `index.html`)

- [[app.js]] – Original monolithic application (~1.4 k LOC). **Removed** after migration to the modular system. It contained the old UI logic, direct DOM manipulation, and the global `SYLLABUS_DATA` object.
- [[data.js]] – Legacy data file containing inline HTML questions and the global `SYLLABUS_DATA` object. **Removed** after migration to modular data modules (`data/*/index.js` and chapter files).
- [[style.css]] – Legacy monolithic stylesheet (~1.3 k LOC). **Removed** after migration to the 7‑layer CSS design system (`style/tokens.css`, `layout.css`, `components.css`, `pages.css`, `themes.css`, `utilities.css`).

## Related

- [[00-Index]] – Main MOC.
- [[01-API]] – `api/groq.js` is the endpoint referenced in `vercel.json`.
- [[06-Styles]] – The modular CSS system replaces the old `style.css`.
- [[05-Data]] – The new data module system replaces the legacy `data.js`.

## Tags

#config #vercel #gitignore #router #legacy

---