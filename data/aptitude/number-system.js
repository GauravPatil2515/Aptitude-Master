/**
 * data/aptitude/number-system.js — Number System Chapter
 */
export default {
  id: 'aptitude-number-system',
  subject: 'aptitude',
  title: 'Number System',
  icon: '🔢',
  difficulty: 'medium',
  estimatedTime: 60,
  prerequisites: [],

  notes: `
## Types of Numbers

| Type | Description | Examples |
|------|-------------|---------|
| Natural | Counting numbers | 1, 2, 3, ... |
| Whole | Natural + 0 | 0, 1, 2, 3, ... |
| Integers | ...−2, −1, 0, 1, 2... | −3, 0, 5 |
| Rational | p/q form (q≠0) | 1/2, 0.75, −4 |
| Irrational | Non-repeating, non-terminating | √2, π |
| Real | All rational + irrational | All above |
| Prime | Exactly 2 factors (1, itself) | 2, 3, 5, 7, 11... |
| Composite | More than 2 factors | 4, 6, 8, 9, 10... |

> 💡 **1 is neither prime nor composite!**

---

## Divisibility Rules

| Divisible by | Rule |
|-------------|------|
| 2 | Last digit even |
| 3 | Sum of digits divisible by 3 |
| 4 | Last 2 digits divisible by 4 |
| 5 | Last digit 0 or 5 |
| 6 | Divisible by both 2 and 3 |
| 8 | Last 3 digits divisible by 8 |
| 9 | Sum of digits divisible by 9 |
| 11 | (Sum of odd place digits) − (Sum of even place digits) = 0 or multiple of 11 |

---

## Important Formulas

**Sum of first n natural numbers:** n(n+1)/2

**Sum of first n squares:** n(n+1)(2n+1)/6

**Sum of first n cubes:** [n(n+1)/2]²

**Sum of first n odd numbers:** n²

> 💡 Sum of first 10 natural numbers = 10×11/2 = **55**

---

## Unit Digit Patterns

Powers of digits follow cycles:

| Digit | Cycle | Period |
|-------|-------|--------|
| 2 | 2,4,8,6 | 4 |
| 3 | 3,9,7,1 | 4 |
| 4 | 4,6 | 2 |
| 7 | 7,9,3,1 | 4 |
| 8 | 8,4,2,6 | 4 |
| 9 | 9,1 | 2 |

> 💡 Unit digit of 2^2023: 2023 mod 4 = 3 → 3rd in cycle = **8**

---

## Finding Number of Factors

If N = a^p × b^q × c^r (prime factorization):

**Number of factors = (p+1)(q+1)(r+1)**

**Sum of factors = (a^(p+1)−1)/(a−1) × (b^(q+1)−1)/(b−1) × ...**

> 💡 72 = 2³ × 3² → Factors = (3+1)(2+1) = **12 factors**
  `,

  formulas: [
    { name: 'Sum 1 to n',       formula: 'n(n+1)/2',                          example: '10×11/2 = 55' },
    { name: 'Sum of squares',   formula: 'n(n+1)(2n+1)/6',                   example: '10×11×21/6 = 385' },
    { name: 'Sum of cubes',     formula: '[n(n+1)/2]²',                      example: '(55)² = 3025' },
    { name: 'No. of factors',   formula: '(p+1)(q+1)(r+1)',                  example: '2³×3² → 4×3 = 12' },
    { name: 'Div by 11',        formula: '(odd place sum) − (even place sum)', example: '121: (1+1)−2 = 0 ✓' },
  ],

  shortcuts: [
    'Memorize divisibility rules — especially 3, 9, 11',
    'Unit digit problems: find the cycle and use remainder',
    'Sum of first n odd numbers = n² (very common in exams)',
    'To find factors: prime factorize first, then use (p+1)(q+1)...',
    '1 is neither prime nor composite — classic trick question!',
  ],

  questions: [
    {
      id: 'ns-q1',
      text: 'What is the sum of the first 50 natural numbers?',
      options: ['1225', '1275', '1250', '1300'],
      answer: 1,
      explanation: 'Sum = 50×51/2 = 1275',
      hint: 'Use n(n+1)/2',
      difficulty: 'easy',
      tags: ['sum'],
      timeLimit: 30,
    },
    {
      id: 'ns-q2',
      text: 'How many factors does 144 have?',
      options: ['12', '15', '18', '10'],
      answer: 1,
      explanation: '144 = 12² = 2⁴ × 3². Factors = (4+1)(2+1) = 5×3 = 15',
      hint: 'Prime factorize 144, then use (p+1)(q+1)...',
      difficulty: 'medium',
      tags: ['factors'],
      timeLimit: 75,
    },
    {
      id: 'ns-q3',
      text: 'What is the unit digit of 7^2023?',
      options: ['7', '9', '3', '1'],
      answer: 2,
      explanation: 'Cycle of 7: 7,9,3,1 (period 4). 2023 mod 4 = 3. 3rd in cycle = 3',
      hint: 'Find the cycle of unit digits for powers of 7',
      difficulty: 'medium',
      tags: ['unit-digit'],
      timeLimit: 60,
    },
    {
      id: 'ns-q4',
      text: 'Which of the following is divisible by 11?',
      options: ['1234', '1331', '1442', '1553'],
      answer: 1,
      explanation: '1331: (1+3) − (3+1) = 4−4 = 0. Divisible by 11!',
      hint: 'Use the 11 rule: (odd place sum) − (even place sum) should be 0 or multiple of 11',
      difficulty: 'easy',
      tags: ['divisibility'],
      timeLimit: 45,
    },
    {
      id: 'ns-q5',
      text: 'The sum of the first 20 odd numbers is:',
      options: ['400', '380', '420', '361'],
      answer: 0,
      explanation: 'Sum of first n odd numbers = n² = 20² = 400',
      hint: 'Sum of first n odd numbers = n²',
      difficulty: 'easy',
      tags: ['odd-sum'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Number System for placement exams. Focus on divisibility rules, unit digit cycles, factor counting, and sum formulas. Keep answers concise with examples.',
};
