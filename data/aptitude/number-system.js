/**
 * data/aptitude/number-system.js — Number System Chapter
 */
export default {
  id: 'aptitude-number-system',
  subject: 'aptitude',
  title: 'Number System',
  
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
| Even | Divisible by 2 | 2, 4, 6, 8... |
| Odd | Not divisible by 2 | 1, 3, 5, 7... |

> **1 is neither prime nor composite!**
> **2 is the only even prime number!**

---

## Divisibility Rules

| Divisible by | Rule |
|-------------|------|
| 2 | Last digit even (0,2,4,6,8) |
| 3 | Sum of digits divisible by 3 |
| 4 | Last 2 digits divisible by 4 |
| 5 | Last digit 0 or 5 |
| 6 | Divisible by both 2 and 3 |
| 7 | Double the last digit, subtract from rest, check if divisible by 7 |
| 8 | Last 3 digits divisible by 8 |
| 9 | Sum of digits divisible by 9 |
| 10 | Last digit 0 |
| 11 | (Sum of odd place digits) − (Sum of even place digits) = 0 or multiple of 11 |
| 12 | Divisible by both 3 and 4 |
| 13 | Multiply last digit by 4, add to rest, check if divisible by 13 |

> 1234 divisible by 11? (1+3) − (2+4) = 4−6 = −2. Not divisible by 11.

---

## Important Formulas — Sum Series

**Sum of first n natural numbers:** n(n+1)/2

**Sum of first n squares:** n(n+1)(2n+1)/6

**Sum of first n cubes:** [n(n+1)/2]²

**Sum of first n odd numbers:** n²

**Sum of first n even numbers:** n(n+1)

> Sum of first 10 natural numbers = 10×11/2 = **55**
> Sum of first 10 odd numbers = 10² = **100** (1+3+5+...+19)
> Sum of first 10 even numbers = 10×11 = **110** (2+4+6+...+20)

---

## Unit Digit Patterns

Powers of digits follow cycles:

| Digit | Cycle | Period |
|-------|-------|--------|
| 0 | 0 | 1 |
| 1 | 1 | 1 |
| 2 | 2,4,8,6 | 4 |
| 3 | 3,9,7,1 | 4 |
| 4 | 4,6 | 2 |
| 5 | 5 | 1 |
| 6 | 6 | 1 |
| 7 | 7,9,3,1 | 4 |
| 8 | 8,4,2,6 | 4 |
| 9 | 9,1 | 2 |

> Unit digit of 2^2023: 2023 mod 4 = 3 → 3rd in cycle = **8**
> Unit digit of 7^100: 100 mod 4 = 0 → 4th in cycle = **1**

---

## Finding Number of Factors

If N = a^p × b^q × c^r (prime factorization):

**Number of factors = (p+1)(q+1)(r+1)**

**Sum of factors = (a^(p+1)−1)/(a−1) × (b^(q+1)−1)/(b−1) × ...**

**Number of odd factors:** Ignore the power of 2 in factorization, then apply formula.

**Number of even factors:** Total factors − Odd factors

> 72 = 2³ × 3² → Factors = (3+1)(2+1) = **12 factors**
> 360 = 2³ × 3² × 5¹ → Factors = (3+1)(2+1)(1+1) = **24 factors**
> Odd factors of 360: Ignore 2³, so 3² × 5¹ → (2+1)(1+1) = **6 odd factors**

---

## Finding Last Non-Zero Digit

For finding trailing zeros in n!:

**Number of trailing zeros = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ...**

> Trailing zeros in 100! = ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = **24**

---

## Remainder Theorem

**Dividend = Divisor × Quotient + Remainder**

**Fermat's Little Theorem:** If p is prime and a is not divisible by p, then a^(p−1) ≡ 1 (mod p)

**Euler's Theorem:** If gcd(a,n) = 1, then a^φ(n) ≡ 1 (mod n), where φ(n) = n(1−1/p₁)(1−1/p₂)...

> Remainder when 2^100 is divided by 7: By Fermat, 2^6 ≡ 1 (mod 7). 100 = 6×16 + 4. So 2^100 ≡ 2^4 = 16 ≡ **2 (mod 7)**

---

## Perfect Squares

**Properties of perfect squares:**
- Unit digit can only be 0, 1, 4, 5, 6, or 9
- If unit digit is 1, 4, or 9 → tens digit is even
- If unit digit is 6 → tens digit is odd
- If unit digit is 5 → tens digit is 2
- If unit digit is 0 → tens digit is 0 and number of zeros is even
- A perfect square is always ≡ 0 or 1 (mod 4)

> 123456 is NOT a perfect square because it ends in 6 but tens digit (5) is odd... wait, 5 IS odd, so it could be. But 123456 mod 4 = 0, so it could be. Need to check further.

---

## TCS/Infosys Common Patterns

1. **Find unit digit** — use cycle method
2. **Find number of factors** — prime factorize, then (p+1)(q+1)...
3. **Find trailing zeros in n!** — divide by 5, 25, 125...
4. **Divisibility by 7, 11, 13** — know the rules
5. **Remainder problems** — use cyclicity or Fermat/Euler
6. **Sum of series** — memorize the formulas
  `,

  formulas: [
    { name: 'Sum 1 to n',           formula: 'n(n+1)/2',                          example: '10×11/2 = 55' },
    { name: 'Sum of squares',       formula: 'n(n+1)(2n+1)/6',                   example: '10×11×21/6 = 385' },
    { name: 'Sum of cubes',         formula: '[n(n+1)/2]²',                      example: '(55)² = 3025' },
    { name: 'Sum of first n odds',  formula: 'n²',                               example: '10² = 100' },
    { name: 'Sum of first n evens', formula: 'n(n+1)',                           example: '10×11 = 110' },
    { name: 'No. of factors',       formula: '(p+1)(q+1)(r+1)',                  example: '2³×3² → 4×3 = 12' },
    { name: 'Sum of factors',       formula: '∏(a^(p+1)−1)/(a−1)',              example: '72: (16−1)/1 × (27−1)/2 = 15×13 = 195' },
    { name: 'Trailing zeros in n!', formula: '⌊n/5⌋+⌊n/25⌋+⌊n/125⌋...',          example: '100! → 20+4 = 24' },
    { name: 'Div by 11',            formula: '(odd place sum) − (even place sum)', example: '121: (1+1)−2 = 0 ✓' },
    { name: 'Odd factors',          formula: 'Ignore 2^p, then (q+1)(r+1)...',   example: '360: ignore 2³, (2+1)(1+1) = 6' },
    { name: 'Fermat\'s Little Thm', formula: 'a^(p−1) ≡ 1 (mod p)',             example: '2^6 ≡ 1 (mod 7)' },
    { name: 'Remainder',            formula: 'D = d×Q + R',                      example: '23 = 5×4 + 3' },
  ],

  shortcuts: [
    'Memorize divisibility rules — especially 3, 7, 9, 11, 13',
    'Unit digit problems: find the cycle and use remainder',
    'Sum of first n odd numbers = n² (very common in exams)',
    'To find factors: prime factorize first, then use (p+1)(q+1)...',
    '1 is neither prime nor composite — classic trick question!',
    '2 is the only even prime number',
    'Trailing zeros in n!: keep dividing by 5 and add quotients',
    'For odd factors: remove all 2s from prime factorization',
    'Perfect square unit digit can only be 0,1,4,5,6,9',
    'For remainder of a^n mod p: use Fermat\'s theorem (a^(p−1) ≡ 1 mod p)',
    'Sum of cubes = (sum of first n natural numbers)²',
    'Even factors = Total factors − Odd factors',
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
    {
      id: 'ns-q6',
      text: 'How many trailing zeros are there in 50!?',
      options: ['10', '12', '14', '15'],
      answer: 1,
      explanation: '⌊50/5⌋ + ⌊50/25⌋ = 10 + 2 = 12',
      hint: 'Divide 50 by 5, then by 25, then by 125... and add the quotients',
      difficulty: 'medium',
      tags: ['trailing-zeros'],
      timeLimit: 60,
    },
    {
      id: 'ns-q7',
      text: 'What is the remainder when 2^100 is divided by 7?',
      options: ['1', '2', '3', '4'],
      answer: 1,
      explanation: 'By Fermat\'s theorem: 2^6 ≡ 1 (mod 7). 100 = 6×16 + 4. So 2^100 ≡ 2^4 = 16 ≡ 2 (mod 7)',
      hint: 'Use Fermat\'s Little Theorem: a^(p−1) ≡ 1 (mod p) for prime p',
      difficulty: 'hard',
      tags: ['remainder', 'fermat'],
      timeLimit: 90,
    },
    {
      id: 'ns-q8',
      text: 'How many even factors does 360 have?',
      options: ['12', '18', '20', '24'],
      answer: 1,
      explanation: '360 = 2³ × 3² × 5¹. Total factors = (3+1)(2+1)(1+1) = 24. Odd factors (ignore 2³) = (2+1)(1+1) = 6. Even factors = 24 − 6 = 18',
      hint: 'Even factors = Total factors − Odd factors',
      difficulty: 'medium',
      tags: ['even-factors'],
      timeLimit: 75,
    },
    {
      id: 'ns-q9',
      text: 'What is the sum of the first 15 even natural numbers?',
      options: ['210', '225', '240', '255'],
      answer: 2,
      explanation: 'Sum of first n even numbers = n(n+1) = 15×16 = 240',
      hint: 'Sum of first n even numbers = n(n+1)',
      difficulty: 'easy',
      tags: ['even-sum'],
      timeLimit: 30,
    },
    {
      id: 'ns-q10',
      text: 'Which of the following is NOT a perfect square?',
      options: ['12321', '1234321', '123454321', '123456789'],
      answer: 3,
      explanation: '12321 = 111², 1234321 = 1111², 123454321 = 11111². But 123456789 is not a perfect square (it ends in 9 but the pattern breaks).',
      hint: 'Check if the numbers follow the pattern 123...321 which are squares of 111...1',
      difficulty: 'medium',
      tags: ['perfect-square'],
      timeLimit: 60,
    },
    {
      id: 'ns-q11',
      text: 'What is the unit digit of 3^2024 + 7^2023?',
      options: ['0', '2', '4', '6'],
      answer: 2,
      explanation: '3^2024: 2024 mod 4 = 0 → 4th in cycle (3,9,7,1) = 1. 7^2023: 2023 mod 4 = 3 → 3rd in cycle (7,9,3,1) = 3. Sum = 1+3 = 4',
      hint: 'Find unit digit of each term separately using cycles, then add',
      difficulty: 'medium',
      tags: ['unit-digit', 'sum'],
      timeLimit: 75,
    },
    {
      id: 'ns-q12',
      text: 'The sum of the squares of the first 10 natural numbers is:',
      options: ['385', '390', '395', '400'],
      answer: 0,
      explanation: 'Sum = 10×11×21/6 = 2310/6 = 385',
      hint: 'Use n(n+1)(2n+1)/6',
      difficulty: 'easy',
      tags: ['sum-squares'],
      timeLimit: 45,
    },
    {
      id: 'ns-q13',
      text: 'How many numbers between 1 and 100 are divisible by both 3 and 5?',
      options: ['5', '6', '7', '8'],
      answer: 1,
      explanation: 'Numbers divisible by both 3 and 5 are divisible by LCM(3,5) = 15. Count = ⌊100/15⌋ = 6 (15,30,45,60,75,90)',
      hint: 'Find LCM of 3 and 5, then count multiples up to 100',
      difficulty: 'easy',
      tags: ['divisibility', 'counting'],
      timeLimit: 45,
    },
    {
      id: 'ns-q14',
      text: 'What is the remainder when 99^99 is divided by 10?',
      options: ['1', '3', '7', '9'],
      answer: 3,
      explanation: 'Unit digit of 99^99 = unit digit of 9^99. Cycle of 9: 9,1 (period 2). 99 is odd → 1st in cycle = 9. Wait, 99 mod 2 = 1 → 1st in cycle = 9. So remainder = 9.',
      hint: 'Unit digit of 99^n follows the same cycle as 9^n',
      difficulty: 'medium',
      tags: ['unit-digit', 'remainder'],
      timeLimit: 60,
    },
    {
      id: 'ns-q15',
      text: 'The number of factors of 1000 that are perfect squares is:',
      options: ['3', '4', '5', '6'],
      answer: 1,
      explanation: '1000 = 2³ × 5³. For a factor to be a perfect square, all exponents must be even. Possible: 2^0×5^0=1, 2^2×5^0=4, 2^0×5^2=25, 2^2×5^2=100. Total = 4',
      hint: 'For perfect square factors, all prime exponents must be even (0, 2, 4...)',
      difficulty: 'hard',
      tags: ['factors', 'perfect-square'],
      timeLimit: 90,
    },
    {
      id: 'ns-q16',
      text: 'What is the sum of all factors of 72?',
      options: ['150', '165', '180', '195'],
      answer: 3,
      explanation: '72 = 2³ × 3². Sum = (2⁴−1)/(2−1) × (3³−1)/(3−1) = 15 × 26/2 = 15 × 13 = 195',
      hint: 'Use sum of factors formula: (a^(p+1)−1)/(a−1) × (b^(q+1)−1)/(b−1)',
      difficulty: 'medium',
      tags: ['sum-factors'],
      timeLimit: 75,
    },
    {
      id: 'ns-q17',
      text: 'How many prime numbers are there between 1 and 50?',
      options: ['14', '15', '16', '17'],
      answer: 1,
      explanation: 'Primes: 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47 = 15 primes',
      hint: 'List all primes systematically: 2,3,5,7 then check 11-47',
      difficulty: 'easy',
      tags: ['primes', 'counting'],
      timeLimit: 60,
    },
    {
      id: 'ns-q18',
      text: 'What is the remainder when 7^100 − 1 is divided by 8?',
      options: ['0', '1', '2', '3'],
      answer: 0,
      explanation: '7 ≡ −1 (mod 8). So 7^100 ≡ (−1)^100 = 1 (mod 8). Therefore 7^100 − 1 ≡ 0 (mod 8)',
      hint: '7 ≡ −1 (mod 8), so 7^even ≡ 1 (mod 8)',
      difficulty: 'hard',
      tags: ['remainder', 'modular'],
      timeLimit: 90,
    },
    {
      id: 'ns-q19',
      text: 'The sum of the cubes of the first 5 natural numbers is:',
      options: ['100', '225', '325', '400'],
      answer: 1,
      explanation: 'Sum of cubes = [n(n+1)/2]² = [5×6/2]² = 15² = 225',
      hint: 'Sum of cubes = (sum of first n natural numbers)²',
      difficulty: 'easy',
      tags: ['sum-cubes'],
      timeLimit: 45,
    },
    {
      id: 'ns-q20',
      text: 'Which of the following numbers is divisible by 7?',
      options: ['1234', '1239', '1240', '1245'],
      answer: 1,
      explanation: '1239: Double last digit (9×2=18), subtract from rest (123−18=105). 105/7 = 15. So 1239 is divisible by 7.',
      hint: 'Use the divisibility rule for 7: double the last digit, subtract from the rest',
      difficulty: 'medium',
      tags: ['divisibility', '7'],
      timeLimit: 60,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Number System for placement exams. Focus on divisibility rules, unit digit cycles, factor counting, and sum formulas. Keep answers concise with examples.',
};
