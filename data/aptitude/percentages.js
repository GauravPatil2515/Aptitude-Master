/**
 * data/aptitude/percentages.js — Percentages Chapter
 * Full structured chapter: notes (Markdown), formulas, shortcuts, questions.
 */
export default {
  id: 'aptitude-percentages',
  subject: 'aptitude',
  title: 'Percentages',
  icon: '📈',
  difficulty: 'easy',
  estimatedTime: 40,
  prerequisites: [],

  notes: `
## What is a Percentage?

A **percentage** means *per hundred*. It expresses a number as a fraction of 100, denoted by **%**.

**Formula:** Percentage = (Part / Whole) × 100

> 💡 **Quick check:** 30 out of 200 = (30/200) × 100 = **15%**

---

## Key Fraction ↔ Percentage Conversions

| Fraction | Percentage |
|----------|------------|
| 1/2      | 50%        |
| 1/3      | 33.33%     |
| 1/4      | 25%        |
| 1/5      | 20%        |
| 1/8      | 12.5%      |
| 1/6      | 16.67%     |
| 3/4      | 75%        |
| 2/3      | 66.67%     |

**Memorise these** — they appear directly in TCS/Infosys questions.

---

## Percentage Increase & Decrease

**Increase%** = (Increase / Original) × 100

**Decrease%** = (Decrease / Original) × 100

> 💡 If price goes from ₹400 to ₹500: Increase = 100, Increase% = (100/400) × 100 = **25%**

---

## Successive Percentage Changes

If a value changes by **A%** then **B%**, the net change is:

**Net% = A + B + (AB/100)**

> **Example:** Price up 20%, then down 10%.
> Net = 20 + (-10) + (20 × -10)/100 = 10 - 2 = **+8%** (net increase)

---

## Population / Value Change Formula

If a value **P** grows at **R%** per year for **n** years:

**Final = P × (1 + R/100)^n**

---

## Finding Original Value

If after an X% increase the result is N, find original:

**Original = N × 100 / (100 + X)**

> If after 25% increase price is ₹500 → Original = 500 × 100/125 = **₹400**
  `,

  formulas: [
    { name: 'Basic %',           formula: '(Part / Whole) × 100',        example: '(30/200) × 100 = 15%' },
    { name: 'Increase %',        formula: '(Increase / Original) × 100', example: '(50/400) × 100 = 12.5%' },
    { name: 'Successive Change', formula: 'A + B + (AB/100)',             example: '20 + (-10) + (-2) = 8%' },
    { name: 'Value after R%',    formula: 'P × (1 + R/100)^n',           example: '1000 × 1.1^2 = 1210' },
    { name: 'Find Original',     formula: 'N × 100 / (100 + X)',         example: '500 × 100/125 = 400' },
  ],

  shortcuts: [
    '10% of X = X/10 — just move decimal one left',
    '20% = 2 × 10%, 25% = X/4, 33.33% = X/3',
    'To find X% of Y: swap them! 18% of 50 = 50% of 18 = 9',
    'If price rises R%, to restore original: decrease by R/(100+R) × 100',
    'Successive 10% up then 10% down = net −1% (not 0!)',
  ],

  questions: [
    {
      id: 'pct-q1',
      text: 'What is 15% of 800?',
      options: ['100', '110', '120', '130'],
      answer: 2,
      explanation: '15% of 800 = (15/100) × 800 = 120',
      hint: 'Find 10% first (80), then add half of that (40) = 120',
      difficulty: 'easy',
      tags: ['basic', 'direct'],
      timeLimit: 60,
    },
    {
      id: 'pct-q2',
      text: 'A number is increased by 20% and then decreased by 20%. What is the net percentage change?',
      options: ['0%', '-4%', '+4%', '-2%'],
      answer: 1,
      explanation: 'Net% = A + B + AB/100 = 20 + (-20) + (20×-20)/100 = 0 - 4 = -4%',
      hint: 'Use the successive change formula: A + B + AB/100',
      difficulty: 'medium',
      tags: ['successive', 'tricky'],
      timeLimit: 75,
    },
    {
      id: 'pct-q3',
      text: 'If 60% of a number is 150, what is 80% of that number?',
      options: ['180', '200', '220', '240'],
      answer: 1,
      explanation: 'Number = 150/0.6 = 250. 80% of 250 = 200.',
      hint: 'First find the full number, then calculate 80% of it.',
      difficulty: 'easy',
      tags: ['basic', 'reverse'],
      timeLimit: 60,
    },
    {
      id: 'pct-q4',
      text: 'The population of a town increases by 10% every year. If the current population is 10,000, what will it be after 2 years?',
      options: ['12,000', '12,100', '11,000', '12,200'],
      answer: 1,
      explanation: 'P × (1.1)^2 = 10000 × 1.21 = 12,100',
      hint: 'Use compound growth: P × (1 + R/100)^n',
      difficulty: 'medium',
      tags: ['compound', 'population'],
      timeLimit: 90,
    },
    {
      id: 'pct-q5',
      text: 'Ravi\'s salary is 20% more than Priya\'s. By what percentage is Priya\'s salary less than Ravi\'s?',
      options: ['20%', '16.67%', '25%', '15%'],
      answer: 1,
      explanation: 'If Priya = 100, Ravi = 120. Priya is less by 20/120 × 100 = 16.67%',
      hint: 'Remember: X% more does NOT mean the other is X% less!',
      difficulty: 'medium',
      tags: ['comparison', 'classic'],
      timeLimit: 75,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Percentages for campus placement exams (TCS, Infosys, Wipro). Focus on shortcuts, common tricks, and pattern recognition. Keep answers concise and use simple numeric examples.',
};
