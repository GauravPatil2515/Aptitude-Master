/**
 * rings.js — Animated SVG Progress Rings
 * Renders circular progress indicators for Dashboard stat cards.
 * Usage: RingsModule.render('elementId', percentage, color)
 */

const RingsModule = (() => {
  const RADIUS = 36;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  function render(containerId, percent, color = '#3b82f6', label = '') {
    const el = document.getElementById(containerId);
    if (!el) return;
    const clamp = Math.min(100, Math.max(0, percent));
    const offset = CIRCUMFERENCE - (clamp / 100) * CIRCUMFERENCE;
    el.innerHTML = `
      <svg width="88" height="88" viewBox="0 0 88 88" class="progress-ring">
        <circle cx="44" cy="44" r="${RADIUS}" fill="none"
          stroke="rgba(255,255,255,0.06)" stroke-width="7"/>
        <circle cx="44" cy="44" r="${RADIUS}" fill="none"
          stroke="${color}" stroke-width="7"
          stroke-linecap="round"
          stroke-dasharray="${CIRCUMFERENCE}"
          stroke-dashoffset="${CIRCUMFERENCE}"
          style="transform:rotate(-90deg);transform-origin:center;
                 transition:stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1);"
          class="ring-arc"/>
        <text x="44" y="40" text-anchor="middle" fill="${color}"
          font-size="16" font-weight="800" font-family="JetBrains Mono,monospace">${clamp}%</text>
        <text x="44" y="56" text-anchor="middle" fill="rgba(156,163,175,0.9)"
          font-size="9" font-weight="600" font-family="Inter,sans-serif" letter-spacing="0.5">${label.toUpperCase()}</text>
      </svg>`;
    // Animate on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const arc = el.querySelector('.ring-arc');
        if (arc) arc.style.strokeDashoffset = offset;
      });
    });
  }

  function updateAll(state) {
    const completed = state.completedDays ? state.completedDays.size : 0;
    const total = 35;
    const coursePercent = Math.round((completed / total) * 100);

    const dsaDone = state.dsaProblems
      ? state.dsaProblems.filter(p => p.status === 'completed').length : 0;
    const dsaTotal = state.dsaProblems ? state.dsaProblems.length : 1;
    const dsaPercent = Math.round((dsaDone / dsaTotal) * 100);

    const streakVal = state.streak || 0;
    const streakPercent = Math.min(100, Math.round((streakVal / 30) * 100));

    render('ring-course',  coursePercent,  '#06b6d4', 'Course');
    render('ring-dsa',     dsaPercent,     '#8b5cf6', 'DSA');
    render('ring-streak',  streakPercent,  '#f59e0b', 'Streak');
  }

  return { render, updateAll };
})();

if (typeof module !== 'undefined') module.exports = RingsModule;
