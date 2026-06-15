/**
 * data/aptitude/permutation.js — Permutation & Combination Chapter
 */
export default {
  id: 'aptitude-permutation',
  subject: 'aptitude',
  title: 'Permutation & Combination',
  icon: '🔀',
  difficulty: 'hard',
  estimatedTime: 70,
  prerequisites: [],

  notes: `
## Fundamental Principle of Counting

If one task can be done in **m** ways and another in **n** ways, then both together can be done in **m × n** ways.

> 💡 3 shirts × 4 pants = **12 outfits**

---

## Permutation (Order Matters)

**nPr = n! / (n−r)!**

Number of ways to arrange **r** objects from **n** distinct objects.

> 💡 5P2 = 5!/(5−2)! = 5×4 = **20**

**Special case:** nPn = n! (arranging all n objects)

---

## Combination (Order Doesn't Matter)

**nCr = n! / (r!(n−r)!)**

Number of ways to choose **r** objects from **n** distinct objects.

> 💡 5C2 = 5!/(2!×3!) = **10**

**Key relation:** nCr = nPr / r!

---

## Important Identities

- **nCr = nC(n−r)** (choosing r = leaving n−r)
- **nC0 = nCn = 1**
- **nC1 = n**
- **nCr + nC(r+1) = (n+1)C(r+1)** (Pascal's identity)

---

## Circular Permutation

**Arranging n objects in a circle = (n−1)!**

> 💡 5 people around a round table = (5−1)! = **24** ways

---

## Arrangements with Repetition

If n objects have p of one kind, q of another, r of another:

**Arrangements = n! / (p! × q! × r!)**

> 💡 MISSISSIPPI = 11!/(1!×4!×4!×2!) = **34,650**

---

## Distribution

- **Distinct objects into distinct boxes:** m^n (each object has m choices)
- **Identical objects into distinct boxes:** (n+r−1)C(r−1)
  `,

  formulas: [
    { name: 'nPr',              formula: 'n! / (n−r)!',                      example: '5P2 = 5×4 = 20' },
    { name: 'nCr',              formula: 'n! / (r!(n−r)!)',                  example: '5C2 = 10' },
    { name: 'Circular',         formula: '(n−1)!',                            example: '5 people → 4! = 24' },
    { name: 'With repetition',  formula: 'n! / (p!q!r!)',                    example: 'MISSISSIPPI = 34650' },
    { name: 'nCr identity',     formula: 'nCr = nC(n−r)',                    example: '10C3 = 10C7 = 120' },
  ],

  shortcuts: [
    'Permutation = order matters (arrangements, rankings)',
    'Combination = order doesn\'t matter (selections, committees)',
    'nCr = nPr / r! — if you know one, you know the other',
    'Circular arrangements: always (n−1)!, not n!',
    'For "at least" problems: total − "none" is often easier',
  ],

  questions: [
    {
      id: 'pc-q1',
      text: 'In how many ways can 5 people be arranged in a row?',
      options: ['60', '120', '240', '24'],
      answer: 1,
      explanation: '5! = 5×4×3×2×1 = 120',
      hint: 'This is 5P5 = 5!',
      difficulty: 'easy',
      tags: ['basic', 'permutation'],
      timeLimit: 30,
    },
    {
      id: 'pc-q2',
      text: 'How many ways can a committee of 3 be chosen from 10 people?',
      options: ['720', '120', '360', '60'],
      answer: 1,
      explanation: '10C3 = 10!/(3!×7!) = (10×9×8)/(3×2×1) = 120',
      hint: 'Use nCr = n!/(r!(n−r)!)',
      difficulty: 'easy',
      tags: ['basic', 'combination'],
      timeLimit: 60,
    },
    {
      id: 'pc-q3',
      text: 'In how many ways can the letters of the word "LEADER" be arranged?',
      options: ['720', '360', '180', '240'],
      answer: 1,
      explanation: 'LEADER has 6 letters with E repeated twice. Arrangements = 6!/2! = 720/2 = 360',
      hint: 'Divide by factorial of repeated letters',
      difficulty: 'medium',
      tags: ['repetition'],
      timeLimit: 75,
    },
    {
      id: 'pc-q4',
      text: 'In how many ways can 6 people be seated around a circular table?',
      options: ['720', '120', '60', '24'],
      answer: 1,
      explanation: 'Circular permutation = (6−1)! = 5! = 120',
      hint: 'Circular arrangements use (n−1)!, not n!',
      difficulty: 'easy',
      tags: ['circular'],
      timeLimit: 45,
    },
    {
      id: 'pc-q5',
      text: 'From 5 men and 4 women, how many ways to form a committee of 3 with at least 1 woman?',
      options: ['74', '84', '64', '54'],
      answer: 0,
      explanation: 'Total − all men = 9C3 − 5C3 = 84 − 10 = 74',
      hint: 'Use complement: total committees − committees with no women',
      difficulty: 'medium',
      tags: ['at-least', 'complement'],
      timeLimit: 90,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Permutation & Combination for placement exams. Focus on when to use nPr vs nCr, circular permutations, arrangements with repetition, and the complement trick for "at least" problems. Keep answers concise.',
};
