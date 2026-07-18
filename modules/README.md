---
title: Modules
tags: [modules, ads, calendar, playground, ai, adsense, pyodide, monaco, study-tracker]
status: active
date: 2026-06-15
aliases: [AptitudeMaster Modules]
---

# 📦 Modules

Self-contained feature modules loaded via `<script>` tags in [[index.html]].

| File | Purpose | Exposes |
|---|---|---|
| [[modules/rings.js\|`rings.js`]] | Animated SVG circular progress rings *(planned — not yet implemented)* | `RingsModule` |
| [[modules/calendar.js\|`calendar.js`]] | Monthly study-day calendar tracker (`localStorage`) | `CalendarModule` |
| [[modules/ads.js\|`ads.js`]] | Google AdSense slot manager (dev placeholders + prod tags) | `AdsModule` |
| [[modules/ai.js\|`ai.js`]] | Smart AI advisor + weak topic detector *(implemented)* | `AIAdvisorModule` |
| [[modules/playground.js\|`playground.js`]] *(Phase B)* | Monaco Editor + Pyodide lazy loader | `PlaygroundModule` |

See also: [[PROJECT.md]] · [[features/AI]] · [[pages/ai-tutor.js]] · [[api/ai.js]]

---

## 📊 How AI Integrates

Each [[modules/ai.js|AIModule]] talks to the [[api/ai.js]] client layer, which in turn calls either:

- **Direct mode**: `https://api.groq.com` from the browser (key from `localStorage`)
- **Proxy mode**: `/api/groq` Vercel Edge Function (key hidden server-side)

AI context is scoped per-chapter via `aiTutorPrompt` in every data module (see [[data/]]).

---

## 🤖 All AI Features Reference

| Feature | Where | Tag |
|---|---|---|
| [[pages/ai-tutor.js\|Full AI Tutor chat]] | `#/ai-tutor` page | `#feature` `#ai` |
| [[pages/chapter.js\|In-chapter AI drawer]] | `Ask AI to Explain` button | `#feature` `#ai` `#chapter` |
| [[pages/practice.js\|Ask AI to Explain (quiz)]] | After answering a question | `#feature` `#ai` `#practice` |
| [[api/ai.js\|`generateSimilarQuestions()`]] | AI-generated similar questions | `#feature` `#ai` `#generation` |
| [[api/groq.js\|Vercel Edge Function]] | Server-side Groq proxy | `#infra` `#ai` |
| [[modules/ai.js\|Smart AI advisor + weak topic]] | Phase B module | `#feature` `#ai` `#phase-b` |

```dataview
LIST FROM #modules
SORT file.name ASC
```

---

## 📅 Calendar Tracking

- Study key: `aptitude_study_log` (`localStorage`)
- Format: `{ "2026-06-10": "studied", "2026-06-09": "partial" }`
- `CalendarModule.markToday('studied')` — completed full day
- `CalendarModule.markToday('partial')` — theory or quiz only

```dataview
LIST FROM #calendar
```

---

## 💰 AdSense Setup

1. Sign up at [Google AdSense](https://adsense.google.com)
2. Get your Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
3. Create 3 ad units (leaderboard 728×90, rectangle 300×250, banner 468×60)
4. Replace `PUBLISHER_ID` and `SLOTS` values in [[modules/ads.js]]
5. Deploy to Vercel — ads render automatically in production

```dataview
LIST FROM #adsense
```
