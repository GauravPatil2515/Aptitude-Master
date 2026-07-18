/**
 * modules/ui-ripple.js — Material-style ripple + optional haptic feedback
 * for any element with the `.btn` (or `[data-ripple]`) class.
 *
 * - Lightweight: one delegated listener on document.
 * - Honors prefers-reduced-motion (skips ripple animation).
 * - Fires navigator.vibrate(8) on touch devices for a "haptic" tap.
 */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function attachRipple(el) {
  el.addEventListener('pointerdown', (e) => {
    // Haptic tap on supported devices
    if (navigator.vibrate) {
      try { navigator.vibrate(8); } catch (_) { /* ignore */ }
    }
    if (REDUCED_MOTION) return;

    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    el.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
    // Safety cleanup if animationend doesn't fire
    setTimeout(() => ripple.remove(), 700);
  });
}

export function initRipple() {
  // Delegate: attach to any existing .btn and observe for new ones
  const apply = (root = document) => {
    root.querySelectorAll('.btn:not([data-ripple-bound]), [data-ripple]:not([data-ripple-bound])')
      .forEach((el) => {
        el.setAttribute('data-ripple-bound', '1');
        attachRipple(el);
      });
  };

  apply(document);

  // Re-scan after SPA route changes / dynamic content
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((n) => {
        if (n.nodeType === 1) apply(n);
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
