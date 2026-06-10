/**
 * calendar.js — Daily Study Calendar Tracker
 * Renders a month-view calendar in the sidebar.
 * Tracks study activity per date in localStorage.
 * Colors: green=studied, amber=partial, grey=future, red=missed
 */

const CalendarModule = (() => {
  const STORAGE_KEY = 'aptitude_study_log';

  function getLog() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  }

  function saveLog(log) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  }

  function markToday(status = 'studied') {
    const log = getLog();
    const key = todayKey();
    log[key] = status;
    saveLog(log);
    render('sidebar-calendar');
  }

  function todayKey() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  }

  function statusForDate(dateStr, log) {
    const today = todayKey();
    if (dateStr > today) return 'future';
    if (log[dateStr] === 'studied') return 'studied';
    if (log[dateStr] === 'partial') return 'partial';
    if (dateStr === today) return 'today';
    return 'missed';
  }

  function render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const log = getLog();
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun',
                        'Jul','Aug','Sep','Oct','Nov','Dec'];
    const dayNames = ['S','M','T','W','T','F','S'];

    let cells = '';
    // Day-name headers
    dayNames.forEach(d => {
      cells += `<div class="cal-day-name">${d}</div>`;
    });
    // Empty leading cells
    for (let i = 0; i < firstDay; i++) {
      cells += `<div class="cal-cell empty"></div>`;
    }
    // Date cells
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      const dateStr = `${year}-${mm}-${dd}`;
      const status = statusForDate(dateStr, log);
      const isToday = (dateStr === todayKey());
      cells += `<div class="cal-cell ${status}${isToday ? ' is-today' : ''}" title="${dateStr}">${d}</div>`;
    }

    el.innerHTML = `
      <div class="cal-header">
        <span class="cal-month-label">${monthNames[month]} ${year}</span>
        <button class="cal-mark-btn" onclick="CalendarModule.markToday('studied')" title="Mark today as studied">✓ Today</button>
      </div>
      <div class="cal-grid">${cells}</div>
      <div class="cal-legend">
        <span class="cal-leg studied"></span><span>Studied</span>
        <span class="cal-leg partial"></span><span>Partial</span>
        <span class="cal-leg missed"></span><span>Missed</span>
      </div>`;
  }

  // Auto-mark today if a day was completed
  function onDayComplete() {
    markToday('studied');
  }

  return { render, markToday, onDayComplete, getLog, todayKey };
})();

if (typeof module !== 'undefined') module.exports = CalendarModule;
