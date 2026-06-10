# 📦 Modules

This folder contains all feature modules for AptitudeMaster. Each file is self-contained and loaded via `<script>` tags in `index.html`.

| File | Purpose | Exposes |
|---|---|---|
| `rings.js` | Animated SVG circular progress rings | `RingsModule` |
| `calendar.js` | Monthly study-day calendar tracker (localStorage) | `CalendarModule` |
| `ads.js` | Google AdSense slot manager (dev placeholders + prod tags) | `AdsModule` |
| `ai.js` *(Phase B)* | Smart AI advisor + weak topic detector | `AIModule` |
| `playground.js` *(Phase B)* | Monaco editor + Pyodide lazy loader | `PlaygroundModule` |

## Quick Setup for Ads
1. Sign up at [Google AdSense](https://adsense.google.com)
2. Get your Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
3. Create 3 ad units (leaderboard 728×90, rectangle 300×250, banner 468×60)
4. Replace `PUBLISHER_ID` and `SLOTS` values in `modules/ads.js`
5. Deploy to Vercel — ads render automatically in production

## Calendar Tracking
- Study activity is stored in `localStorage` key `aptitude_study_log`
- Format: `{ "2026-06-10": "studied", "2026-06-09": "partial" }`
- Call `CalendarModule.markToday('studied')` when a user completes a day
- Call `CalendarModule.markToday('partial')` when they only do theory or quiz
