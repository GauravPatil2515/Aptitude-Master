# 🎨 Styles (MOC)

All CSS lives in the `style/` folder and follows a modular architecture inspired by ITCSS. There are exactly **6** `.css` files on disk, all loaded by `index.html` via individual `<link>` tags. (Documentation elsewhere occasionally calls this a "7-layer" system — treat the on-disk count of 6 as authoritative.) Each file consumes the design tokens defined in `tokens.css`.

## Style Files

- [[style/tokens.css]] – **Design tokens**: colours (`--bg-primary`, `--accent-indigo`, …), fonts (`--font-display`, `--font-main`, `--font-mono`), spacing (`--space-*`), radii, shadows, transitions, etc. This is the single source of truth for the visual language.
- [[style/layout.css]] – Global reset, base `body` styles, scrollbar styling, and layout utilities (flex helpers, grid containers, responsive breakpoints). Also contains the `:focus-visible` outline definition and the page‑transition fade‑in class (`.page-enter`).
- [[style/components.css]] – Styles for the reusable components (`components/`): sidebar, topbar, card, toast, quiz‑card, markdown, etc. Uses BEM‑style blocks (`sidebar-item`, `card--primary`, …). Includes the message timestamp styling (`.msg-time`) and fade‑in animation (`@keyframes msgIn`) used by the AI Tutor chat.
- [[style/pages.css]] – Page‑specific layout overrides: welcome/hero section, day grid, theory/chapter layout, AI drawer, practice quiz UI, DSA/SQL sheet tables, etc. Contains utility classes for animations (e.g., `.fade-in`).
- [[style/themes.css]] – Light/Dark theme overrides (the `body.light-theme` class switches colours, shadows, etc.).
- [[style/utilities.css]] – Atomic helper classes (`.flex`, `.grid`, `.text-center`, `.sr-only`, spacing utilities, etc.) for quick utility‑first styling.

## How to Use

1. **Never edit** `style.css` (the legacy monolithic stylesheet) – it is loaded but overridden; prefer editing the modular files above.
2. When adding a new component, create a class in `components.css` (or extend an existing block) and reference the token variables (e.g., `background: var(--bg-card); border: 1px solid var(--border-color);`).
3. For page‑specific tweaks, add rules in `pages.css` scoped to a unique class or ID (e.g., `.page--ai-tutor .chat-messages { ... }`).
4. To trigger a fade‑in on route change, add the class `page-enter` to the container (handled by `router.js` or a simple script).

## Related

- [[00-Index]] – Main MOC.
- [[04-Components]] – Component implementations that these stylesheet rules target.
- [[03-Pages]] – Page files that rely on the layout definitions here.
- [[08-Config]] – Notes about the legacy `style.css` file.

## Tags

#styling #css #tokens #layout #components #pages #utilities #themes

---