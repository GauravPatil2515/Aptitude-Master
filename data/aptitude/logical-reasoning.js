/**
 * data/aptitude/logical-reasoning.js — Logical Reasoning Chapter
 */
export default {
  id: 'aptitude-logical-reasoning',
  subject: 'aptitude',
  title: 'Logical Reasoning',
  icon: '🧩',
  difficulty: 'medium',
  estimatedTime: 60,
  prerequisites: [],

  notes: `
## Number Series

Find the pattern and the next term.

**Common patterns:**
- Arithmetic: +2, +3, +5... (constant difference)
- Geometric: ×2, ×3, ×2... (constant ratio)
- Squares: 1, 4, 9, 16, 25...
- Cubes: 1, 8, 27, 64...
- Fibonacci: each term = sum of previous two
- Mixed: +1, +2, +3, +4... or ×2, +1, ×2, +1...

> 💡 2, 6, 18, 54, ? → ×3 each time → **162**

---

## Coding-Decoding

**Letter shifting:** Each letter is shifted by a fixed number.

> 💡 If CAT = FDW (each +3), then DOG = GRJ

**Reverse alphabet:** A↔Z, B↔Y, C↔X...

> 💡 MZNV = NAME (M↔N, Z↔A, N↔M, V↔E)

---

## Blood Relations

Key terms:
- **Paternal:** Related through father
- **Maternal:** Related through mother
- **Siblings:** Brothers and sisters
- **Cousin:** Uncle/aunt's child

> 💡 "A is the brother of B, B is the mother of C" → A is C's **maternal uncle**

---

## Direction Sense

**Standard directions:** N, S, E, W, NE, NW, SE, SW

**Turns:**
- Right turn: clockwise (N→E→S→W)
- Left turn: anticlockwise (N→W→S→E)

> 💡 Facing North, turn right → East. Turn left from East → North.

---

## Syllogism

Use **Venn diagrams** to solve:
- "All A is B" → A circle inside B circle
- "Some A is B" → Overlapping circles
- "No A is B" → Separate circles

---

## Seating Arrangement

**Linear:** Left/right positioning
**Circular:** Clockwise/anticlockwise

Tips:
- Draw a diagram
- Fix one person's position
- Place others relative to fixed positions
  `,

  formulas: [
    { name: 'Arithmetic series', formula: 'a, a+d, a+2d, a+3d...',           example: '2,5,8,11 → d=3' },
    { name: 'Geometric series',  formula: 'a, ar, ar², ar³...',              example: '3,6,12,24 → r=2' },
    { name: 'Letter shift',      formula: 'New = Old + k (mod 26)',          example: 'CAT + 3 = FDW' },
    { name: 'Reverse alpha',     formula: 'New = 27 − Old position',        example: 'M(13)→N(14)' },
    { name: 'Direction turn',    formula: 'Right: +90°, Left: −90°',        example: 'N →right→ E' },
  ],

  shortcuts: [
    'For number series: check difference first, then ratio, then squares/cubes',
    'Coding: check if it\'s a simple shift, reverse, or pattern',
    'Blood relations: draw a family tree with symbols (□=male, ○=female)',
    'Direction: always mark North on top, track turns step by step',
    'Syllogism: Venn diagrams are faster than logical deduction',
  ],

  questions: [
    {
      id: 'lr-q1',
      text: 'Find the next term: 2, 6, 18, 54, ?',
      options: ['108', '162', '72', '216'],
      answer: 1,
      explanation: 'Each term is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162',
      hint: 'Check the ratio between consecutive terms',
      difficulty: 'easy',
      tags: ['series', 'geometric'],
      timeLimit: 45,
    },
    {
      id: 'lr-q2',
      text: 'If APPLE is coded as BQQMF, how is MANGO coded?',
      options: ['NBOHP', 'NB OHP', 'NBOGP', 'OBNHP'],
      answer: 0,
      explanation: 'Each letter is shifted by +1: M→N, A→B, N→O, G→H, O→P = NBOHP',
      hint: 'Check the shift pattern: A→B (+1), P→Q (+1)...',
      difficulty: 'easy',
      tags: ['coding'],
      timeLimit: 45,
    },
    {
      id: 'lr-q3',
      text: 'A is facing North. He turns right, walks 10m, then turns left and walks 5m. Which direction is he facing now?',
      options: ['North', 'East', 'West', 'South'],
      answer: 1,
      explanation: 'Facing North → turn right → facing East → turn left → facing North. Wait: right from North = East, left from East = North. Answer: North',
      hint: 'Track each turn step by step',
      difficulty: 'easy',
      tags: ['direction'],
      timeLimit: 45,
    },
    {
      id: 'lr-q4',
      text: 'Find the next term: 1, 1, 2, 3, 5, 8, ?',
      options: ['11', '12', '13', '10'],
      answer: 2,
      explanation: 'Fibonacci series: each term = sum of previous two. 5+8 = 13',
      hint: 'Check if each term is the sum of the two before it',
      difficulty: 'easy',
      tags: ['series', 'fibonacci'],
      timeLimit: 45,
    },
    {
      id: 'lr-q5',
      text: 'Pointing to a man, Seema said "He is the son of my father\'s only daughter." How is the man related to Seema?',
      options: ['Brother', 'Son', 'Nephew', 'Father'],
      answer: 1,
      explanation: 'Seema\'s father\'s only daughter = Seema herself. So the man is Seema\'s son.',
      hint: 'Break down: "my father\'s only daughter" = who?',
      difficulty: 'medium',
      tags: ['blood-relation'],
      timeLimit: 60,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Logical Reasoning for placement exams. Focus on number series patterns, coding-decoding tricks, blood relation shortcuts, and direction sense. Keep answers concise with examples.',
};
