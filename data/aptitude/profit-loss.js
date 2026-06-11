/**
 * data/aptitude/profit-loss.js — Profit & Loss Chapter
 */
export default {
  id: 'aptitude-profit-loss',
  subject: 'aptitude',
  title: 'Profit & Loss',
  icon: '💰',
  difficulty: 'easy',
  estimatedTime: 45,
  prerequisites: ['percentages'],

  notes: `
## What is Profit?

**Profit** occurs when Selling Price (SP) > Cost Price (CP).

**Profit = SP - CP**

**Profit% = (Profit / CP) × 100**

---

## What is Loss?

**Loss** occurs when SP < CP.

**Loss = CP - SP**

**Loss% = (Loss / CP) × 100**

> 💡 Always calculate % on **CP**, not SP!

---

## Key Formulas

| Find | Formula |
|------|---------|
| SP (given profit%) | CP × (100 + P%) / 100 |
| SP (given loss%)   | CP × (100 - L%) / 100 |
| CP (given profit%) | SP × 100 / (100 + P%) |
| CP (given loss%)   | SP × 100 / (100 - L%) |

---

## Discount

**Discount = Marked Price (MP) - SP**

**Discount% = (Discount / MP) × 100**

SP after discount = MP × (100 - Discount%) / 100

---

## Successive Discount

Two discounts d1% and d2% → net discount:

**Net = d1 + d2 - (d1 × d2)/100**
  `,

  formulas: [
    { name: 'Profit%',  formula: '(SP - CP) / CP × 100',           example: '(500-400)/400 × 100 = 25%' },
    { name: 'SP',       formula: 'CP × (100 + P%) / 100',          example: '400 × 125/100 = 500' },
    { name: 'CP',       formula: 'SP × 100 / (100 + P%)',          example: '500 × 100/125 = 400' },
    { name: 'Discount%',formula: '(MP - SP) / MP × 100',          example: '(600-500)/600 × 100 = 16.7%' },
    { name: 'Net Disc', formula: 'd1 + d2 - d1×d2/100',           example: '20+10 - 2 = 28%' },
  ],

  shortcuts: [
    'Profit/Loss% is ALWAYS on CP in standard problems',
    'If SP = 125% of CP → profit is 25%',
    'MP = CP × (100 + markup%) / 100',
    'Dishonest trader using false weights: Profit% = (True - False)/False × 100',
  ],

  questions: [
    {
      id: 'pl-q1',
      text: 'A shopkeeper buys an item for ₹400 and sells it for ₹500. What is his profit percentage?',
      options: ['20%', '25%', '15%', '30%'],
      answer: 1,
      explanation: 'Profit = 500-400 = 100. Profit% = (100/400) × 100 = 25%',
      hint: 'Profit% = (Profit / CP) × 100',
      difficulty: 'easy',
      tags: ['basic'],
      timeLimit: 60,
    },
    {
      id: 'pl-q2',
      text: 'An article is sold at a 20% profit. If the SP is ₹600, what is the CP?',
      options: ['480', '500', '520', '450'],
      answer: 1,
      explanation: 'CP = SP × 100 / (100 + P%) = 600 × 100/120 = 500',
      hint: 'Use: CP = SP × 100 / (100 + Profit%)',
      difficulty: 'easy',
      tags: ['reverse', 'find-cp'],
      timeLimit: 75,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Profit & Loss for placement exams. Focus on CP/SP relationships, common formula confusions, and shortcut tricks.',
};
