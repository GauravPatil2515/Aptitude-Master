/**
 * data/aptitude/ratio-proportion.js — Ratio & Proportion Chapter
 */
export default {
  id: 'aptitude-ratio-proportion',
  subject: 'aptitude',
  title: 'Ratio & Proportion',
  icon: '⚖️',
  difficulty: 'easy',
  estimatedTime: 35,
  prerequisites: [],

  notes: `
## What is a Ratio?

A **ratio** compares two quantities of the same kind. Written as **a:b** or **a/b**.

> 💡 If boys:girls = 3:2, for every 3 boys there are 2 girls.

**Important:** Ratio has no units. Always convert to same units first.

---

## What is a Proportion?

An equality of two ratios: **a:b = c:d** → **a/b = c/d**

**Product of means = Product of extremes**: **b × c = a × d**

> 💡 If 3:5 = 6:x → 3x = 30 → x = 10

---

## Types of Ratios

| Type | Meaning | Example |
|------|---------|---------|
| Duplicate | a²:b² | Duplicate of 3:4 = 9:16 |
| Triplicate | a³:b³ | Triplicate of 2:3 = 8:27 |
| Sub-duplicate | √a:√b | Sub-dup of 9:16 = 3:4 |
| Sub-triplicate | ∛a:∛b | Sub-tri of 8:27 = 2:3 |
| Inverse | b:a | Inverse of 4:5 = 5:4 |

---

## Componendo & Dividendo

If a/b = c/d, then:

**Componendo:** (a+b)/b = (c+d)/d

**Dividendo:** (a−b)/b = (c−d)/d

**Componendo & Dividendo:** (a+b)/(a−b) = (c+d)/(c−d)

> 💡 If x/y = 3/5, then (x+y)/(x−y) = (3+5)/(3−5) = 8/(−2) = −4

---

## Dividing in a Ratio

If amount **A** is divided in ratio **a:b**:

- First share = A × a/(a+b)
- Second share = A × b/(a+b)

> 💡 ₹12,000 in ratio 3:5 → Shares = 12000×3/8 = ₹4,500 and 12000×5/8 = ₹7,500

---

## Direct & Inverse Proportion

- **Direct:** x ∝ y → x/y = constant (if x doubles, y doubles)
- **Inverse:** x ∝ 1/y → xy = constant (if x doubles, y halves)
  `,

  formulas: [
    { name: 'Proportion',       formula: 'a/b = c/d → ad = bc',                example: '3/5 = x/20 → x = 12' },
    { name: 'Divide in ratio',  formula: 'Share = Total × part/(sum of parts)', example: '12000 × 3/8 = 4500' },
    { name: 'Componendo',       formula: '(a+b)/b = (c+d)/d',                  example: '(3+5)/5 = 8/5' },
    { name: 'C&D',              formula: '(a+b)/(a−b) = (c+d)/(c−d)',         example: '(3+5)/(3−5) = −4' },
    { name: 'Direct',           formula: 'x₁/y₁ = x₂/y₂',                     example: 'If 5:15 then x:45 → x=15' },
  ],

  shortcuts: [
    'Always simplify ratios to lowest terms first',
    'For C&D: if a/b = p/q, then (a+b)/(a−b) = (p+q)/(p−q) — very fast!',
    'If A:B = m:n and B:C = p:q, then A:B:C = mp:np:nq',
    'When ratios are chained, multiply through the common term',
    'For mixture problems: use alligation (cross method) for weighted averages',
  ],

  questions: [
    {
      id: 'rp-q1',
      text: 'If A:B = 3:4 and B:C = 5:6, find A:B:C.',
      options: ['15:20:24', '3:4:6', '12:16:24', '15:20:18'],
      answer: 0,
      explanation: 'A:B = 3:4 = 15:20, B:C = 5:6 = 20:24. So A:B:C = 15:20:24',
      hint: 'Make the common term (B) equal in both ratios by finding LCM',
      difficulty: 'easy',
      tags: ['combined-ratio'],
      timeLimit: 60,
    },
    {
      id: 'rp-q2',
      text: 'Divide ₹10,200 among A, B, C in the ratio 2:3:5. What is C\'s share?',
      options: ['₹3,060', '₹5,100', '₹2,040', '₹4,080'],
      answer: 1,
      explanation: 'C\'s share = 10200 × 5/(2+3+5) = 10200 × 5/10 = 5100',
      hint: 'C gets 5 parts out of total 10 parts',
      difficulty: 'easy',
      tags: ['divide'],
      timeLimit: 45,
    },
    {
      id: 'rp-q3',
      text: 'If (x+y):(x−y) = 5:3, find x:y.',
      options: ['4:1', '3:2', '5:3', '2:1'],
      answer: 0,
      explanation: 'Using C&D reverse: x/y = (5+3)/(5−3) = 8/2 = 4/1',
      hint: 'Apply Componendo & Dividendo in reverse: if (a+b)/(a−b) = p/q, then a/b = (p+q)/(p−q)',
      difficulty: 'medium',
      tags: ['cd-reverse'],
      timeLimit: 75,
    },
    {
      id: 'rp-q4',
      text: 'Two numbers are in the ratio 5:7. If 10 is added to each, the ratio becomes 7:9. Find the smaller number.',
      options: ['20', '25', '30', '35'],
      answer: 1,
      explanation: 'Let numbers be 5x and 7x. (5x+10)/(7x+10) = 7/9 → 9(5x+10) = 7(7x+10) → 45x+90 = 49x+70 → 4x = 20 → x = 5. Smaller = 5×5 = 25',
      hint: 'Set up the equation with the new ratio after adding 10 to both',
      difficulty: 'medium',
      tags: ['algebra'],
      timeLimit: 90,
    },
    {
      id: 'rp-q5',
      text: 'If 40% of A = 60% of B, find A:B.',
      options: ['3:2', '2:3', '4:6', '6:4'],
      answer: 0,
      explanation: '0.4A = 0.6B → A/B = 0.6/0.4 = 6/4 = 3/2',
      hint: 'Cross-multiply: A/B = 60/40',
      difficulty: 'easy',
      tags: ['percentage-ratio'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Ratio & Proportion for placement exams. Focus on combining ratios, Componendo & Dividendo, and common exam patterns. Keep answers concise with examples.',
};
