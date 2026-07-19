/**
 * pages/home.js — Home / Dashboard Page
 * Premium dashboard with glassmorphism, roadmap console, and custom typography
 */
import { store } from '../state/store.js';
import Router from '../router.js';
import { renderAIAdvisor } from '../modules/ai.js';

export function renderHome() {
  const app = document.getElementById('page-content');
  const s = store.get();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const mockScore = s.scores?.['mock/tcs-1'] || null;
  const roadmapProgress = s.tcsRoadmapProgress || [false, false, false, false, false];
  const mistakeCount = (s.mistakes || []).length;

  const subjects = [
    { id: 'aptitude',    label: 'Aptitude',         color: 'var(--accent-blue)' },
    { id: 'core-cs',    label: 'Core CS',           color: 'var(--accent-violet)' },
    { id: 'dsa',        label: 'DSA Tracker',       color: 'var(--accent-cyan)' },
    { id: 'sql',        label: 'SQL',               color: 'var(--accent-green)' },
    { id: 'ml',         label: 'ML & AI',           color: 'var(--accent-amber)' },
    { id: 'ai-engineer',label: 'AI Engineer',       color: 'var(--accent-red)' },
  ];

  const progressBars = subjects.map(sub => {
    const pct = s.progress?.[sub.id] ?? 0;
    return `
      <div class="progress-row">
        <div class="progress-row__label">
          <span style="font-weight: 600; color: var(--text-primary);">${sub.label}</span>
          <span class="progress-row__pct">${pct}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%;background:var(--accent)"></div>
        </div>
      </div>`;
  }).join('');

  const agenda = (s.todayAgenda || [
    { title: 'TCS Mock Test 1',   time: '90 min', href: '#/mock/tcs-1' },
    { title: 'Revise Verbal Roots', time: '20 min', href: '#/chapter/aptitude/verbal-ability' },
    { title: 'Solve 5 DSA Problems', time: '30 min', href: '#/dsa' },
  ]).map(a => `
    <a href="${a.href}" class="agenda-card">
      <div class="agenda-card__icon" aria-hidden="true"></div>
      <div class="agenda-card__title" style="font-weight: 600;">${a.title}</div>
      <div class="agenda-card__time">${a.time}</div>
    </a>`).join('');

  const totalChapters = 62;
  const chapterKeys = Object.keys(s.progress || {}).filter(k => k.includes('/') && s.progress[k]);
  const chaptersCompleted = chapterKeys.length;
  const overallPct = Math.round(subjects.reduce((sum, sub) => sum + (s.progress?.[sub.id] ?? 0), 0) / subjects.length);

  app.innerHTML = `
    <div class="page page--home">
 
      <!-- Hero Section -->
      <div class="home-hero" style="padding: 40px 30px; background: var(--card); border: 1px solid var(--border);">
        <div>
          <h1 class="home-hero__greeting" style="font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 800; color: var(--foreground); letter-spacing: var(--tracking-tight);">${greeting}${s.profile?.name ? `, ${s.profile.name}` : ''}</h1>
          <p class="home-hero__sub" style="margin-top: 8px;">
            <span class="badge badge--time" style="background: rgba(251,191,36,0.1); border-color: rgba(251,191,36,0.2); font-size: 11px;">${s.streak ?? 0} Day Streak</span>
            <span style="margin:0 8px;opacity:0.3;color:var(--text-muted)">|</span>
            <span style="font-size: var(--text-sm); font-weight: 500; color: var(--text-secondary);">${overallPct}% Overall Progress</span>
          </p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px;">
          <a href="#/mock/tcs-1" class="btn btn--primary btn--sm" style="font-weight: 700;">
            Run TCS Mock Test
          </a>
          <a href="#/ai-mock" class="btn btn--ghost btn--sm" style="font-weight: 700; border-color: var(--accent); color: var(--accent);">
            <span class="badge badge--ai" style="font-size:9px; margin-right:6px;">AI</span> Generate Personalised Mock
          </a>
        </div>
      </div>

      ${
        s.lastSession ? `
        <a href="${s.lastSession.href}" class="continue-card" aria-label="Continue where you left off">
          <div class="continue-card__icon" aria-hidden="true">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-9-9"/><path d="M12 7v5l3 2"/></svg>
          </div>
          <div class="continue-card__body">
            <div class="continue-card__eyebrow">Continue where you left off</div>
            <div class="continue-card__title">${s.lastSession.label.replace(/\b\w/g, c => c.toUpperCase())}</div>
          </div>
          <span class="continue-card__arrow" aria-hidden="true">→</span>
        </a>` : ''
      }

      <!-- Stats Row -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin-bottom:28px;">
        <div class="card stat-card">
          <div class="stat-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div>
            <div class="stat-value">${subjects.length}</div>
            <div class="stat-label">Subjects</div>
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </div>
          <div>
            <div class="stat-value">${chaptersCompleted}</div>
            <div class="stat-label">Chapters Completed</div>
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 3 3 4 3 7a3 3 0 0 1-6 0c0-1 .3-2 1-3 0 2 1 3 2 3 0-3-1-5 0-7z"/><path d="M12 22a6 6 0 0 0 6-6c0-3-2-5-3-7-2 2-3 3-3 6"/></svg>
          </div>
          <div>
            <div class="stat-value">${s.streak ?? 0}</div>
            <div class="stat-label">Study Streak</div>
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div>
            <div class="stat-value">${mistakeCount}</div>
            <div class="stat-label">Logged Mistakes</div>
          </div>
        </div>
      </div>

      <!-- TCS Prep Console & 15-Day Roadmap -->
      <section class="home-section" id="tcs-prep-console" style="margin-bottom: var(--space-8);">
        <h2 class="section-title" style="font-family: var(--font-display); font-size: var(--text-lg); font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-4); display:flex; align-items:center; gap:8px;">
        TCS NQT / Prime / Digital Prep Hub
        </h2>
        <div style="display:grid; grid-template-columns: 1.1fr 1.5fr; gap: 20px;" class="tcs-console-grid">
          
        <!-- Mock Card -->
        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between; background: var(--card);">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
              <span class="badge badge--tcs-nqt" style="font-size:9px;">TARGET ROLE: PRIME/DIGITAL</span>
              <span class="badge badge--time" style="font-size:9px;">90 Mins</span>
            </div>
            <h3 style="font-family:var(--font-display); font-size:var(--text-md); font-weight:800; margin-bottom:8px; color:var(--text-primary);">TCS Prime/Digital Mock Test 1</h3>
            <p style="font-size:var(--text-sm); color:var(--text-secondary); line-height:1.5; margin-bottom:20px;">
              Simulated placement exam containing 50 questions spanning Quantitative (20), Logical (20), and Verbal (10) rounds with exact TCS pattern matching.
            </p>
          </div>
            
          <div>
            <div class="card" style="padding:12px; background:var(--bg-tertiary); border-color:var(--border-color); margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center; border-radius: var(--radius-md);">
              <span style="font-size:12px; color:var(--text-secondary); font-weight:500;">Best Score:</span>
              <span style="font-size:14px; font-weight:800; color:${mockScore !== null ? 'var(--accent-green)' : 'var(--text-muted)'}; font-family:var(--font-mono);">
                ${mockScore !== null ? `${mockScore}%` : 'Not Attempted'}
              </span>
            </div>

            <a href="#/mock/tcs-1" class="btn btn-primary btn--full" style="justify-content:center; font-weight:700;">
              ${mockScore !== null ? 'Retake Mock Test' : 'Start Mock Test'}
            </a>
          </div>
        </div>

          <!-- Roadmap Checklist Card -->
          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <h3 style="font-family:var(--font-display); font-size:var(--text-md); font-weight:700; margin-bottom:6px; color: var(--text-primary);">
                15-Day Placement Preparation Roadmap
              </h3>
              <p style="font-size:var(--text-xs); color:var(--text-secondary); margin-bottom: 18px; line-height:1.4;">
                Track your placement preparation daily by completing each milestone phase. Mark completed phases as you progress.
              </p>
              <div style="display:flex; flex-direction:column; gap:12px;">
                
                <!-- Phase 1 -->
                <div class="roadmap-phase-row" style="display:flex; align-items:start; gap:12px; padding:10px 14px; border-radius:var(--radius-md); background:var(--bg-tertiary); border:1px solid var(--border-color); transition: var(--transition-fast);">
                  <input type="checkbox" class="roadmap-checkbox" data-index="0" ${roadmapProgress[0] ? 'checked' : ''} style="margin-top:4px; width:16px; height:16px; accent-color:var(--accent); cursor:pointer;">
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                      <strong style="font-size:13px; color:var(--text-primary); font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Phase 1 (Day 1-3): Quant Aptitude</strong>
                      <a href="#/chapter/aptitude/percentages" style="font-size:11px; color:var(--accent); font-weight:700; flex-shrink:0;">Study ↗</a>
                    </div>
                    <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Percentages, Profit & Loss, Simple & Compound Interest</div>
                  </div>
                </div>

                <!-- Phase 2 -->
                <div class="roadmap-phase-row" style="display:flex; align-items:start; gap:12px; padding:10px 14px; border-radius:var(--radius-md); background:var(--bg-tertiary); border:1px solid var(--border-color); transition: var(--transition-fast);">
                  <input type="checkbox" class="roadmap-checkbox" data-index="1" ${roadmapProgress[1] ? 'checked' : ''} style="margin-top:4px; width:16px; height:16px; accent-color:var(--accent); cursor:pointer;">
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                      <strong style="font-size:13px; color:var(--text-primary); font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Phase 2 (Day 4-6): Logical Reasoning</strong>
                      <a href="#/chapter/aptitude/logical-reasoning" style="font-size:11px; color:var(--accent); font-weight:700; flex-shrink:0;">Study ↗</a>
                    </div>
                    <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Syllogisms, Blood Relations, Series, Coding-Decoding</div>
                  </div>
                </div>

                <!-- Phase 3 -->
                <div class="roadmap-phase-row" style="display:flex; align-items:start; gap:12px; padding:10px 14px; border-radius:var(--radius-md); background:var(--bg-tertiary); border:1px solid var(--border-color); transition: var(--transition-fast);">
                  <input type="checkbox" class="roadmap-checkbox" data-index="2" ${roadmapProgress[2] ? 'checked' : ''} style="margin-top:4px; width:16px; height:16px; accent-color:var(--accent); cursor:pointer;">
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                      <strong style="font-size:13px; color:var(--text-primary); font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Phase 3 (Day 7-9): Verbal Ability</strong>
                      <a href="#/chapter/aptitude/verbal-ability" style="font-size:11px; color:var(--accent); font-weight:700; flex-shrink:0;">Study ↗</a>
                    </div>
                    <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Synonyms, Antonyms, One-word substitutes, Idioms</div>
                  </div>
                </div>

                <!-- Phase 4 -->
                <div class="roadmap-phase-row" style="display:flex; align-items:start; gap:12px; padding:10px 14px; border-radius:var(--radius-md); background:var(--bg-tertiary); border:1px solid var(--border-color); transition: var(--transition-fast);">
                  <input type="checkbox" class="roadmap-checkbox" data-index="3" ${roadmapProgress[3] ? 'checked' : ''} style="margin-top:4px; width:16px; height:16px; accent-color:var(--accent); cursor:pointer;">
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                      <strong style="font-size:13px; color:var(--text-primary); font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Phase 4 (Day 10-12): DSA Coding</strong>
                      <a href="#/dsa" style="font-size:11px; color:var(--accent); font-weight:700; flex-shrink:0;">Tracker ↗</a>
                    </div>
                    <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Arrays, Strings, Trees, Dynamic Programming (TCS NQT tagged Qs)</div>
                  </div>
                </div>

                <!-- Phase 5 -->
                <div class="roadmap-phase-row" style="display:flex; align-items:start; gap:12px; padding:10px 14px; border-radius:var(--radius-md); background:var(--bg-tertiary); border:1px solid var(--border-color); transition: var(--transition-fast);">
                  <input type="checkbox" class="roadmap-checkbox" data-index="4" ${roadmapProgress[4] ? 'checked' : ''} style="margin-top:4px; width:16px; height:16px; accent-color:var(--accent); cursor:pointer;">
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                      <strong style="font-size:13px; color:var(--text-primary); font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Phase 5 (Day 13-15): Mocks & Review</strong>
                      <a href="#/mock/tcs-1" style="font-size:11px; color:var(--accent); font-weight:700; flex-shrink:0;">Mocks ↗</a>
                    </div>
                    <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Simulate full mock test, error log review & strategy tuning</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Today's Agenda -->
      <section class="home-section" style="margin-bottom: var(--space-8);">
        <h2 class="section-title" style="font-family: var(--font-display); font-size: var(--text-lg); font-weight: 800; color: var(--text-primary);">
          Today's Agenda
          <span class="badge badge--ai" style="font-size: 9px; vertical-align: middle; margin-left: 6px;">AI suggested</span>
        </h2>
        <div class="agenda-grid">${agenda}</div>
      </section>

      <!-- AI Study Advisor (weak-topic detector) -->
      <section class="home-section" id="ai-advisor-mount" style="margin-bottom: var(--space-8);"></section>

      <!-- Progress Section -->
      <section class="home-section" style="margin-bottom: var(--space-8);">
        <h2 class="section-title" style="font-family: var(--font-display); font-size: var(--text-lg); font-weight: 800; color: var(--text-primary);">Progress Tracker</h2>
        <div class="card">
          <div class="progress-list">${progressBars}</div>
        </div>
      </section>

    </div>
  `;
  document.querySelectorAll('.roadmap-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.index);
      const progress = store.get().tcsRoadmapProgress || [false, false, false, false, false];
      progress[idx] = e.target.checked;
      store.set('tcsRoadmapProgress', progress);
      
      // Visual feedback: toggle row background
      const row = e.target.closest('.roadmap-phase-row');
      if (e.target.checked) {
        row.style.borderColor = 'var(--accent)';
        row.style.background = 'color-mix(in srgb, var(--accent) 6%, transparent)';
      } else {
        row.style.borderColor = 'var(--border-color)';
        row.style.background = 'var(--bg-tertiary)';
      }
    });
    
    // Initial visual feedback
    if (cb.checked) {
      const row = cb.closest('.roadmap-phase-row');
      row.style.borderColor = 'var(--accent)';
      row.style.background = 'color-mix(in srgb, var(--accent) 6%, transparent)';
    }
  });

  // Mount AI Study Advisor (weak-topic detector)
  const advisorMount = document.getElementById('ai-advisor-mount');
  if (advisorMount) renderAIAdvisor(advisorMount);
}
