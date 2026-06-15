/**
 * data/aptitude/time-work.js — Time & Work Chapter
 */
export default {
  id: 'aptitude-time-work',
  subject: 'aptitude',
  title: 'Time & Work',
  icon: '⏳',
  difficulty: 'medium',
  estimatedTime: 50,
  prerequisites: ['ratio-proportion'],

  notes: `
## Core Concept

If A can do a work in **n** days, then A's **1 day's work = 1/n**

> 💡 If A finishes work in 10 days, A does 1/10 of the work per day.

---

## Combined Work

If A does 1/a work per day and B does 1/b work per day:

**Together: 1 day's work = 1/a + 1/b = (a+b)/ab**

**Time together = ab/(a+b)**

> 💡 A in 12 days, B in 15 days → Together = (12×15)/(12+15) = 180/27 = **6.67 days**

---

## Efficiency Method (LCM Method)

Assume total work = LCM of individual times.

| Person | Time | Work/day (efficiency) |
|--------|------|----------------------|
| A      | 12   | LCM/12               |
| B      | 15   | LCM/15               |

> 💡 LCM(12,15) = 60. A does 5 units/day, B does 4 units/day. Together = 9 units/day. Time = 60/9 = 6.67 days

---

## Pipes & Cisterns

- **Inlet** (fills): positive work
- **Outlet** (empties): negative work

**Net rate = Rate of inlet − Rate of outlet**

> 💡 Fill in 6 hrs, empty in 8 hrs → Net = 1/6 − 1/8 = 1/24 → Tank fills in **24 hours**

---

## Work & Wages

Wages are divided in the ratio of **work done** (or efficiency).

If A and B work together and earn ₹W:
- A's share = W × (A's work) / (Total work)

---

## Man-Days Concept

**Men × Days = Constant** (for same work)

M₁ × D₁ = M₂ × D₂

> 💡 6 men finish in 12 days → 9 men finish in (6×12)/9 = **8 days**
  `,

  formulas: [
    { name: '1 day work',       formula: '1/n (if n days to complete)',       example: '10 days → 1/10 per day' },
    { name: 'Together',         formula: 'ab/(a+b)',                          example: '12 & 15 → 180/27 = 6.67 days' },
    { name: 'Pipes (net)',      formula: '1/a − 1/b',                        example: '1/6 − 1/8 = 1/24' },
    { name: 'Man-days',         formula: 'M₁D₁ = M₂D₂',                      example: '6×12 = 9×D → D = 8' },
    { name: 'Wages ratio',      formula: 'Ratio of work done',                example: 'A:B = 3:2 → wages 3:2' },
  ],

  shortcuts: [
    'Use LCM method — assume total work = LCM of all times',
    'If A is twice as efficient as B, A takes half the time',
    'For "A starts, B joins after x days": A works full time, B works (total−x) days',
    'Pipes: inlet = +, outlet = −. Net rate gives total time.',
    'If A+B together take n days and A alone takes a days: B alone = an/(a−n)',
  ],

  questions: [
    {
      id: 'tw-q1',
      text: 'A can do a piece of work in 12 days and B in 15 days. How long will they take working together?',
      options: ['6 days', '6.67 days', '7 days', '5.5 days'],
      answer: 1,
      explanation: 'Together = (12×15)/(12+15) = 180/27 = 6.67 days',
      hint: 'Use ab/(a+b) formula',
      difficulty: 'easy',
      tags: ['basic', 'together'],
      timeLimit: 60,
    },
    {
      id: 'tw-q2',
      text: 'A and B together can complete a work in 10 days. A alone can do it in 15 days. How long will B alone take?',
      options: ['20 days', '25 days', '30 days', '35 days'],
      answer: 2,
      explanation: '1/B = 1/10 − 1/15 = (3−2)/30 = 1/30. So B = 30 days',
      hint: '1/B = 1/together − 1/A',
      difficulty: 'easy',
      tags: ['find-individual'],
      timeLimit: 75,
    },
    {
      id: 'tw-q3',
      text: 'A tap fills a tank in 6 hours. Another empties it in 8 hours. If both are open, how long to fill?',
      options: ['20 hours', '24 hours', '18 hours', '22 hours'],
      answer: 1,
      explanation: 'Net rate = 1/6 − 1/8 = (4−3)/24 = 1/24. Time = 24 hours',
      hint: 'Inlet rate minus outlet rate',
      difficulty: 'easy',
      tags: ['pipes'],
      timeLimit: 60,
    },
    {
      id: 'tw-q4',
      text: 'A and B can do a job in 20 days. With C, they finish it in 12 days. C alone can do it in:',
      options: ['25 days', '30 days', '35 days', '40 days'],
      answer: 1,
      explanation: '1/C = 1/12 − 1/20 = (5−3)/60 = 2/60 = 1/30. C = 30 days',
      hint: '1/C = 1/ABC − 1/AB',
      difficulty: 'medium',
      tags: ['three-workers'],
      timeLimit: 75,
    },
    {
      id: 'tw-q5',
      text: '6 men can complete a work in 12 days. How many men are needed to complete it in 8 days?',
      options: ['7', '8', '9', '10'],
      answer: 2,
      explanation: 'M₁D₁ = M₂D₂ → 6×12 = M₂×8 → M₂ = 72/8 = 9',
      hint: 'Use man-days: M₁D₁ = M₂D₂',
      difficulty: 'easy',
      tags: ['man-days'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Time & Work for placement exams. Focus on the LCM efficiency method, pipes & cisterns, and the "A starts, B joins" pattern. Keep answers concise with step-by-step solutions.',
};
