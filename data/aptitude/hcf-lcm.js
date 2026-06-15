/**
 * data/aptitude/hcf-lcm.js — HCF & LCM Chapter
 */
export default {
  id: 'aptitude-hcf-lcm',
  subject: 'aptitude',
  title: 'HCF & LCM',
  icon: '🧮',
  difficulty: 'easy',
  estimatedTime: 40,
  prerequisites: ['number-system'],

  notes: `
## Definitions

- **HCF (Highest Common Factor):** Greatest number that divides all given numbers
- **LCM (Lowest Common Multiple):** Smallest number divisible by all given numbers

---

## Key Formula

**For any two numbers: HCF × LCM = Product of the two numbers**

> 💡 If HCF(12,18) = 6 and LCM(12,18) = 36, then 6 × 36 = 12 × 18 = 216 ✓

⚠️ This formula works **only for two numbers**, not three or more.

---

## Finding HCF

**Prime Factorization Method:** Take the **lowest power** of common primes.

> 💡 24 = 2³×3, 36 = 2²×3² → HCF = 2²×3 = **12**

**Division Method (Euclidean):** Repeatedly divide until remainder is 0.

---

## Finding LCM

**Prime Factorization Method:** Take the **highest power** of all primes.

> 💡 24 = 2³×3, 36 = 2²×3² → LCM = 2³×3² = **72**

---

## HCF & LCM of Fractions

**HCF of fractions = HCF of numerators / LCM of denominators**

**LCM of fractions = LCM of numerators / HCF of denominators**

---

## Applications

- **Largest number dividing a,b,c with remainder r:** HCF(a−r, b−r, c−r)
- **Smallest number divisible by a,b,c leaving remainder r:** LCM(a,b,c) + r
- **Greatest number that divides a,b,c leaving remainders r₁,r₂,r₃:** HCF(a−r₁, b−r₂, c−r₃)

> 💡 Find greatest number that divides 24, 36, 48 leaving remainder 3: HCF(21,33,45) = **3**
  `,

  formulas: [
    { name: 'HCF × LCM',       formula: 'HCF(a,b) × LCM(a,b) = a × b',      example: '6 × 36 = 12 × 18 = 216' },
    { name: 'HCF (fractions)',  formula: 'HCF(num) / LCM(den)',              example: 'HCF(2/3, 4/5) = 2/15' },
    { name: 'LCM (fractions)',  formula: 'LCM(num) / HCF(den)',              example: 'LCM(2/3, 4/5) = 4/1' },
    { name: 'Remainder type 1', formula: 'HCF(a−r, b−r, c−r)',              example: 'HCF(21,33,45) = 3' },
    { name: 'Remainder type 2', formula: 'LCM(a,b,c) + r',                  example: 'LCM(3,4,5)+2 = 62' },
  ],

  shortcuts: [
    'HCF × LCM = product (for 2 numbers only!)',
    'For remainder problems: subtract remainder, then find HCF',
    'For "smallest number leaving remainder r": find LCM, then add r',
    'HCF is always ≤ smallest number; LCM is always ≥ largest number',
    'If HCF(a,b) = 1, a and b are co-prime → LCM = a×b',
  ],

  questions: [
    {
      id: 'hl-q1',
      text: 'Find the HCF of 24, 36, and 48.',
      options: ['6', '8', '12', '24'],
      answer: 2,
      explanation: '24 = 2³×3, 36 = 2²×3², 48 = 2⁴×3. HCF = 2²×3 = 12',
      hint: 'Take the lowest power of common prime factors',
      difficulty: 'easy',
      tags: ['basic', 'hcf'],
      timeLimit: 45,
    },
    {
      id: 'hl-q2',
      text: 'Find the LCM of 12, 15, and 20.',
      options: ['40', '50', '60', '120'],
      answer: 2,
      explanation: '12=2²×3, 15=3×5, 20=2²×5. LCM = 2²×3×5 = 60',
      hint: 'Take the highest power of all primes present',
      difficulty: 'easy',
      tags: ['basic', 'lcm'],
      timeLimit: 45,
    },
    {
      id: 'hl-q3',
      text: 'The HCF of two numbers is 12 and their LCM is 180. If one number is 60, find the other.',
      options: ['24', '30', '36', '48'],
      answer: 2,
      explanation: 'HCF × LCM = a × b → 12 × 180 = 60 × b → b = 2160/60 = 36',
      hint: 'Use HCF × LCM = product of two numbers',
      difficulty: 'easy',
      tags: ['product-formula'],
      timeLimit: 60,
    },
    {
      id: 'hl-q4',
      text: 'Find the greatest number that divides 126, 210, and 294 leaving remainder 6 in each case.',
      options: ['12', '24', '36', '42'],
      answer: 1,
      explanation: 'HCF(126−6, 210−6, 294−6) = HCF(120, 204, 288) = 12',
      hint: 'Subtract the remainder from each number, then find HCF',
      difficulty: 'medium',
      tags: ['remainder'],
      timeLimit: 75,
    },
    {
      id: 'hl-q5',
      text: 'The product of two numbers is 2160 and their HCF is 12. Find their LCM.',
      options: ['120', '150', '180', '200'],
      answer: 2,
      explanation: 'LCM = Product / HCF = 2160 / 12 = 180',
      hint: 'LCM = Product / HCF',
      difficulty: 'easy',
      tags: ['product-formula'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand HCF & LCM for placement exams. Focus on the product formula, remainder-type problems, and prime factorization method. Keep answers concise with examples.',
};
