/**
 * data/aptitude/progressions.js — Progressions (AP & GP) Chapter
 * Structured chapter: notes (Markdown), formulas, shortcuts, questions.
 */
export default {
  id: 'aptitude-progressions',
  subject: 'aptitude',
  title: 'Progressions (AP & GP)',

  difficulty: 'medium',
  estimatedTime: 50,
  prerequisites: ['percentages', 'averages'],

  notes: `
## Arithmetic Progression (AP)

A sequence where each term differs from the previous by a constant **d** (common difference).

- n-th term: **aₙ = a + (n − 1)d**
- Sum of first n terms: **Sₙ = n/2 × [2a + (n−1)d]** = **n/2 × (first + last)**

> AP: 3, 7, 11, 15…  a=3, d=4. 10th term = 3 + 9×4 = 39.

---

## Inserting Arithmetic Means

To insert k arithmetic means between a and b: the sequence has k+2 terms, common difference
**d = (b − a)/(k + 1)**.

---

## Geometric Progression (GP)

A sequence where each term is multiplied by a constant **r** (common ratio).

- n-th term: **aₙ = a × rⁿ⁻¹**
- Sum of first n terms (r ≠ 1): **Sₙ = a(rⁿ − 1)/(r − 1)**
- Sum to infinity (|r| < 1): **S∞ = a / (1 − r)**

> GP: 2, 6, 18, 54…  a=2, r=3. 5th term = 2 × 3⁴ = 162.

---

## AP vs GP — Quick Tests

- Differences constant → AP. Ratios constant → GP.
- Sum of first n natural numbers = n(n+1)/2.
- Sum of first n squares = n(n+1)(2n+1)/6.
- Sum of first n cubes = [n(n+1)/2]².

---

## Common Placement Patterns

1. Find missing term in a series (identify AP/GP/other).
2. Sum of a series up to n terms.
3. Number of terms between two values in AP.
4. Infinite GP sum (always check |r| < 1 first).
  `,

  formulas: [
    { name: 'AP n-th term',     formula: 'a + (n−1)d',                       example: '3,7,11… 10th = 3+9×4 = 39' },
    { name: 'AP sum',           formula: 'n/2 [2a + (n−1)d]',               example: '10 terms of 3,7… = 5×(6+36)=210' },
    { name: 'GP n-th term',     formula: 'a × rⁿ⁻¹',                         example: '2,6,18… 5th = 2×3⁴ = 162' },
    { name: 'GP sum (r≠1)',     formula: 'a(rⁿ−1)/(r−1)',                    example: '2×(3⁴−1)/2 = 80' },
    { name: 'GP sum to ∞',      formula: 'a/(1−r), |r|<1',                   example: '1/(1−1/2) = 2' },
    { name: 'Sum 1..n',         formula: 'n(n+1)/2',                         example: '1..10 = 55' },
    { name: 'Insert k means',   formula: 'd = (b−a)/(k+1)',                  example: 'between 2 and 14, k=2 → d=4' },
  ],

  shortcuts: [
    'AP: term = a+(n−1)d. Sum = n/2 × (first+last).',
    'GP: term = a·rⁿ⁻¹. Sum = a(rⁿ−1)/(r−1). Infinity only if |r|<1.',
    'Sum of 1..n = n(n+1)/2 — memorize it.',
    'Inserting k means between a,b: d = (b−a)/(k+1).',
    'If differences are constant it is AP; if ratios are constant it is GP.',
    'Sum of cubes = (sum of naturals)². Elegant identity.',
  ],

  questions: [
    { id: 'prog-q1', text: 'Find the 10th term of AP: 3, 7, 11, 15, …', options: ['37', '39', '41', '43'], answer: 1, explanation: 'a=3, d=4. a₁₀ = 3 + 9×4 = 39.', hint: 'aₙ = a+(n−1)d.', difficulty: 'easy', tags: ['ap-term'], timeLimit: 45 },
    { id: 'prog-q2', text: 'Sum of first 20 natural numbers?', options: ['200', '210', '220', '230'], answer: 1, explanation: '20×21/2 = 210.', hint: 'n(n+1)/2.', difficulty: 'easy', tags: ['sum-naturals'], timeLimit: 45 },
    { id: 'prog-q3', text: 'Find the 6th term of GP: 2, 6, 18, 54, …', options: ['162', '324', '486', '648'], answer: 2, explanation: 'a=2, r=3. a₆ = 2 × 3⁵ = 2 × 243 = 486.', hint: 'a·rⁿ⁻¹.', difficulty: 'medium', tags: ['gp-term'], timeLimit: 60 },
    { id: 'prog-q4', text: 'Sum of GP 1 + 1/2 + 1/4 + … to infinity?', options: ['1', '1.5', '2', '∞'], answer: 2, explanation: 'a=1, r=1/2. S∞ = 1/(1−1/2) = 2.', hint: 'Only valid since |r|<1.', difficulty: 'medium', tags: ['gp-infinity'], timeLimit: 60 },
    { id: 'prog-q5', text: 'Which term of AP 5, 8, 11, … is equal to 101?', options: ['31', '32', '33', '34'], answer: 2, explanation: 'aₙ = 5+(n−1)3 = 3n+2 = 101 → 3n = 99 → n = 33.', hint: 'Set aₙ = 101 and solve for n.', difficulty: 'hard', tags: ['ap-count'], timeLimit: 90 },
    { id: 'prog-q6', text: 'Sum of first 10 terms of AP 2, 5, 8, …', options: ['145', '150', '155', '160'], answer: 2, explanation: 'a=2, d=3, n=10. S = 10/2 × [2×2 + 9×3] = 5×(4+27) = 5×31 = 155.', hint: 'n/2[2a+(n−1)d].', difficulty: 'medium', tags: ['ap-sum'], timeLimit: 60 },
    { id: 'prog-q7', text: 'Insert 2 arithmetic means between 2 and 14.', options: ['6, 10', '5, 9', '7, 11', '4, 8'], answer: 0, explanation: 'd = (14−2)/(2+1) = 12/3 = 4. Means: 2+4=6, 6+4=10. Sequence: 2,6,10,14.', hint: 'd = (b−a)/(k+1).', difficulty: 'medium', tags: ['means'], timeLimit: 60 },
    { id: 'prog-q8', text: 'Sum of first 5 terms of GP 3, 6, 12, …', options: ['93', '96', '99', '102'], answer: 0, explanation: 'a=3, r=2, n=5. S = 3(2⁵−1)/(2−1) = 3×(32−1) = 3×31 = 93.', hint: 'a(rⁿ−1)/(r−1).', difficulty: 'medium', tags: ['gp-sum'], timeLimit: 60 },
  ],

  aiTutorPrompt: 'You are helping an engineering student with Arithmetic & Geometric Progressions for placement quant (TCS NQT, Infosys). Emphasize aₙ = a+(n−1)d, Sₙ = n/2[2a+(n−1)d], GP term a·rⁿ⁻¹, and the infinite-GP condition |r|<1. Use short examples.',
};
