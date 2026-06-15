/**
 * data/aptitude/simple-interest.js — Simple & Compound Interest Chapter
 */
export default {
  id: 'aptitude-simple-interest',
  subject: 'aptitude',
  title: 'Simple & Compound Interest',
  icon: '🏦',
  difficulty: 'medium',
  estimatedTime: 50,
  prerequisites: ['percentages'],

  notes: `
## Simple Interest (SI)

Simple interest is calculated only on the **principal** amount every year.

**SI = (P × R × T) / 100**

Where:
- P = Principal amount
- R = Rate of interest per annum
- T = Time in years

**Amount = P + SI = P × (1 + RT/100)**

> 💡 ₹10,000 at 8% for 3 years → SI = (10000 × 8 × 3)/100 = **₹2,400**

---

## Compound Interest (CI)

Interest is calculated on the **accumulated amount** (principal + previous interest).

**CI = P × (1 + R/100)^T − P**

**Amount = P × (1 + R/100)^T**

> 💡 ₹10,000 at 10% for 2 years → Amount = 10000 × 1.1² = **₹12,100**, CI = **₹2,100**

---

## SI vs CI Difference

For 2 years: **CI − SI = P × (R/100)²**

For 3 years: **CI − SI = P × (R/100)² × (3 + R/100)**

> 💡 ₹5,000 at 10% for 2 years: Difference = 5000 × (0.1)² = **₹50**

---

## Half-Yearly & Quarterly Compounding

- Half-yearly: Rate = R/2, Time = 2T → **A = P × (1 + R/200)^(2T)**
- Quarterly: Rate = R/4, Time = 4T → **A = P × (1 + R/400)^(4T)**

---

## Effective Annual Rate

For nominal rate R compounded n times a year:

**Effective Rate = (1 + R/(100×n))^n − 1) × 100%**

> 💡 12% compounded monthly → (1 + 0.01)^12 − 1 ≈ **12.68%**
  `,

  formulas: [
    { name: 'Simple Interest',     formula: 'SI = (P × R × T) / 100',           example: '(10000 × 8 × 3)/100 = 2400' },
    { name: 'Amount (SI)',         formula: 'P × (1 + RT/100)',                  example: '10000 × (1 + 24/100) = 12400' },
    { name: 'Compound Interest',   formula: 'P(1 + R/100)^T − P',               example: '10000 × 1.1² − 10000 = 2100' },
    { name: 'CI − SI (2 years)',   formula: 'P × (R/100)²',                     example: '5000 × 0.01 = 50' },
    { name: 'Half-yearly',         formula: 'P × (1 + R/200)^(2T)',             example: 'P × (1 + R/200)^(2T)' },
  ],

  shortcuts: [
    'SI for 1 year = P × R/100 — just find R% of P',
    'CI for 2 years = SI + interest on first year\'s interest',
    'Difference CI−SI for 2 yrs = P(R/100)² — very quick!',
    'Doubling time at R% ≈ 72/R years (Rule of 72)',
    'If amount doubles in T years at SI: R = 100/T %',
  ],

  questions: [
    {
      id: 'si-q1',
      text: 'Find the simple interest on ₹8,000 at 12% per annum for 5 years.',
      options: ['₹4,000', '₹4,800', '₹5,200', '₹3,600'],
      answer: 1,
      explanation: 'SI = (8000 × 12 × 5)/100 = 4800',
      hint: 'Use SI = PRT/100',
      difficulty: 'easy',
      tags: ['basic', 'si'],
      timeLimit: 60,
    },
    {
      id: 'si-q2',
      text: 'What is the compound interest on ₹10,000 at 10% per annum for 2 years?',
      options: ['₹2,000', '₹2,100', '₹2,200', '₹1,900'],
      answer: 1,
      explanation: 'CI = 10000 × (1.1)² − 10000 = 12100 − 10000 = 2100',
      hint: 'Amount = P(1 + R/100)^T, then subtract P',
      difficulty: 'easy',
      tags: ['basic', 'ci'],
      timeLimit: 75,
    },
    {
      id: 'si-q3',
      text: 'The difference between CI and SI on ₹5,000 at 10% per annum for 2 years is:',
      options: ['₹50', '₹100', '₹500', '₹25'],
      answer: 0,
      explanation: 'CI − SI = P × (R/100)² = 5000 × (0.1)² = 5000 × 0.01 = 50',
      hint: 'Use the direct formula: P(R/100)² for 2-year difference',
      difficulty: 'medium',
      tags: ['difference', 'shortcut'],
      timeLimit: 60,
    },
    {
      id: 'si-q4',
      text: 'In how many years will ₹6,000 become ₹7,200 at 10% simple interest?',
      options: ['1 year', '2 years', '3 years', '4 years'],
      answer: 1,
      explanation: 'SI = 7200 − 6000 = 1200. T = (SI × 100)/(P × R) = (1200 × 100)/(6000 × 10) = 2 years',
      hint: 'First find SI = Amount − P, then use T = SI × 100 / (P × R)',
      difficulty: 'easy',
      tags: ['find-time', 'si'],
      timeLimit: 75,
    },
    {
      id: 'si-q5',
      text: 'A sum of money doubles itself in 8 years at simple interest. What is the rate of interest?',
      options: ['10%', '12.5%', '15%', '20%'],
      answer: 1,
      explanation: 'If P doubles, SI = P. R = (SI × 100)/(P × T) = (P × 100)/(P × 8) = 12.5%',
      hint: 'When money doubles, SI = P. Use R = 100/T',
      difficulty: 'medium',
      tags: ['doubling', 'reverse'],
      timeLimit: 60,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Simple & Compound Interest for campus placement exams. Focus on the difference between SI and CI, the shortcut for CI−SI, and common exam traps. Keep answers concise with numeric examples.',
};
