# 🧩 Components (MOC)

Reusable UI building blocks used throughout the application. Each file exports a factory function or plain object that can be instantiated or invoked by pages.

## Components

- [[components/sidebar.js]] – Left navigation panel with subject list, collapse button, theme toggle, progress bar, and streak display. Includes responsive collapse (icon‑only on wide screens) and smooth animations.
- [[components/topbar.js]] – Header bar containing hamburger menu (mobile), breadcrumb, and “Quick Practice” button. Shows current route and provides global search placeholder.
- [[components/card.js]] – Generic card container with header, body, and optional footer; used for modals, widgets, and containers. Applies glass‑morphism background, subtle shadow, and hover lift.
- [[components/quiz-card.js]] – Specialized card for rendering a single multiple‑choice question with answer options and `markAnswer()` logic. Handles selection, immediate feedback, and disabling after answer.
- [[components/markdown.js]] – Thin wrapper around the `marked` library (loaded from CDN) to convert markdown strings to HTML; includes a fallback renderer for offline use.
- [[components/toast.js]] – Simple toast notification system (success, error, info, warning) with auto‑dismiss (3 s), manual close, and stacking. Uses CSS variables for theming.

## Related

- [[00-Index]] – Main MOC.
- [[03-Pages]] – Pages that consume these components (e.g., sidebar appears on every page; toast is used globally).
- [[06-Styles]] – CSS files (`components.css`) that style these components using BEM‑style classes and design tokens.

## Tags

#component #sidebar #topbar #card #quiz-card #markdown #toast

---