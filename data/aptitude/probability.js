/**
 * data/aptitude/probability.js — Probability Chapter
 */
export default {
  id: 'aptitude-probability',
  subject: 'aptitude',
  title: 'Probability',
  
  difficulty: 'hard',
  estimatedTime: 65,
  prerequisites: ['permutation'],

  notes: `
## Basic Definition

**Probability = Favorable Outcomes / Total Outcomes**

**0 ≤ P(E) ≤ 1**

- P = 0: Impossible event
- P = 1: Certain event

> Probability of getting a head on a coin toss = 1/2

---

## Complement Rule

**P(not E) = 1 − P(E)**

> P(at least 1 head in 3 tosses) = 1 − P(all tails) = 1 − 1/8 = **7/8**

---

## Addition Rule (OR)

**P(A or B) = P(A) + P(B) − P(A and B)**

For **mutually exclusive** events: P(A or B) = P(A) + P(B)

---

## Multiplication Rule (AND)

**P(A and B) = P(A) × P(B|A)**

For **independent** events: P(A and B) = P(A) × P(B)

> P(2 heads in 2 tosses) = 1/2 × 1/2 = **1/4**

---

## Dice Problems

- Total outcomes with 2 dice = 36
- Sum of 7 has maximum probability: 6/36 = 1/6
- Sum of 2 or 12 has minimum: 1/36 each

---

## Card Problems

- Standard deck: 52 cards (26 red, 26 black)
- 4 suits: ♠ ♥ ♦ ♣ (13 each)
- Face cards: J, Q, K (12 total)
- Aces: 4

> P(face card) = 12/52 = 3/13

---

## Balls from Bag

- **Without replacement:** Total decreases each draw
- **With replacement:** Total stays the same (independent events)

> Bag has 3 red, 2 blue. P(2 red without replacement) = 3/5 × 2/4 = **3/10**
  `,

  formulas: [
    { name: 'Basic',           formula: 'Favorable / Total',                  example: 'Head on coin = 1/2' },
    { name: 'Complement',       formula: '1 − P(E)',                           example: 'At least 1 head = 1−1/8 = 7/8' },
    { name: 'Addition',         formula: 'P(A)+P(B)−P(A∩B)',                  example: 'P(A∪B) = P(A)+P(B)−P(A∩B)' },
    { name: 'Multiplication',   formula: 'P(A) × P(B|A)',                     example: 'Independent: P(A)×P(B)' },
    { name: 'Dice (2)',         formula: 'Total outcomes = 36',                example: 'P(sum=7) = 6/36 = 1/6' },
  ],

  shortcuts: [
    'For "at least one" problems: use complement (1 − P(none))',
    'Two dice: total outcomes = 36. Sum of 7 is most likely.',
    'Cards: 52 total, 13 per suit, 12 face cards, 4 aces',
    'Without replacement: reduce total after each draw',
    'Independent events: multiply probabilities directly',
  ],

  questions: [
    {
      id: 'pb-q1',
      text: 'A coin is tossed twice. What is the probability of getting at least one head?',
      options: ['1/4', '1/2', '3/4', '1'],
      answer: 2,
      explanation: 'P(at least 1 head) = 1 − P(both tails) = 1 − 1/4 = 3/4',
      hint: 'Use complement: 1 − P(no heads)',
      difficulty: 'easy',
      tags: ['complement'],
      timeLimit: 45,
    },
    {
      id: 'pb-q2',
      text: 'Two dice are thrown. What is the probability of getting a sum of 7?',
      options: ['1/6', '1/9', '1/12', '1/18'],
      answer: 0,
      explanation: 'Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total = 36. P = 6/36 = 1/6',
      hint: 'List all pairs that sum to 7',
      difficulty: 'easy',
      tags: ['dice'],
      timeLimit: 60,
    },
    {
      id: 'pb-q3',
      text: 'A bag contains 3 red and 5 blue balls. Two balls are drawn without replacement. What is the probability both are red?',
      options: ['3/28', '9/64', '1/4', '3/20'],
      answer: 0,
      explanation: 'P = 3/8 × 2/7 = 6/56 = 3/28',
      hint: 'Without replacement: first draw 3/8, second draw 2/7',
      difficulty: 'medium',
      tags: ['without-replacement'],
      timeLimit: 75,
    },
    {
      id: 'pb-q4',
      text: 'A card is drawn from a standard deck. What is the probability it is a face card?',
      options: ['1/13', '3/13', '1/4', '1/2'],
      answer: 1,
      explanation: 'Face cards = J, Q, K in 4 suits = 12. P = 12/52 = 3/13',
      hint: 'Count face cards: J, Q, K in each of 4 suits',
      difficulty: 'easy',
      tags: ['cards'],
      timeLimit: 45,
    },
    {
      id: 'pb-q5',
      text: 'Three coins are tossed. What is the probability of getting exactly 2 heads?',
      options: ['1/4', '3/8', '1/2', '1/8'],
      answer: 1,
      explanation: 'Favorable: HHT, HTH, THH = 3 outcomes. Total = 2³ = 8. P = 3/8',
      hint: 'List all outcomes with exactly 2 heads',
      difficulty: 'medium',
      tags: ['coins', 'exactly'],
      timeLimit: 75,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Probability for placement exams. Focus on complement rule, dice/card/ball problems, and the difference between with/without replacement. Keep answers concise with examples.',
};
