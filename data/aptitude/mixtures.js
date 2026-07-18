/**
 * data/aptitude/mixtures.js — Mixtures & Alligations Chapter
 * Structured chapter: notes (Markdown), formulas, shortcuts, questions.
 */
export default {
  id: 'aptitude-mixtures',
  subject: 'aptitude',
  title: 'Mixtures & Alligations',

  difficulty: 'medium',
  estimatedTime: 55,
  prerequisites: ['averages', 'ratio-proportion'],

  notes: `
## The Rule of Alligation

Alligation finds the ratio in which two ingredients at different concentrations must be mixed to get a desired concentration.

**Rule of Alligation:**

\`\`\`
      Cheaper (C)          Dearer (D)
            \\              /
             \\            /
          Mean Price (M)
             /            \\
            /              \\
  (D − M) : (M − C)
\`\`\`

So the ratio **Cheaper : Dearer = (D − M) : (M − C)**.

> Mix rice at ₹20/kg and ₹30/kg to get ₹25/kg. Ratio = (30−25):(25−20) = 5:5 = **1:1**.

---

## Weighted Average Concentration

If you mix q₁ units at concentration c₁ with q₂ units at c₂:

**Final concentration = (q₁c₁ + q₂c₂) / (q₁ + q₂)**

This is just the combined-average idea applied to mixtures.

---

## Replacement / Repeated Dilution

When a vessel contains liquid and r units are taken out and replaced with water, repeatedly:

**Quantity of pure liquid left after n operations = Initial × (1 − r/Capacity)ⁿ**

> 40 L of milk, 4 L removed and replaced with water, done 2 times.
> Milk left = 40 × (1 − 4/40)² = 40 × (0.9)² = 40 × 0.81 = **32.4 L**.

---

## Mixing Two Mixtures

If mixture A has concentration a (ratio x:y) and mixture B has concentration b (ratio p:q), and you mix them in ratio m:n, the final concentration is the weighted average of a and b by total quantity.

---

## Common Trap

"Average price" problems are alligation in disguise. Always identify the **mean price** (the target) first.
  `,

  formulas: [
    { name: 'Alligation ratio',  formula: 'Cheaper:Dearer = (D−M):(M−C)',     example: '20 & 30 → mean 25: ratio 1:1' },
    { name: 'Final concentration', formula: '(q₁c₁ + q₂c₂)/(q₁+q₂)',          example: '(10×20+20×30)/30 = 26.67' },
    { name: 'Repeated dilution', formula: 'Initial × (1 − r/Cap)ⁿ',           example: '40×(0.9)² = 32.4 L milk' },
    { name: 'Mean price',        formula: 'M = target concentration',          example: 'desired % / price' },
  ],

  shortcuts: [
    'Alligation: ratio = (Dearer − Mean) : (Mean − Cheaper). Draw the cross.',
    'Mean price is the TARGET, not one of the ingredients.',
    'Repeated dilution: pure left = Initial × (1 − r/Capacity)ⁿ. The (1−r/Cap) factor repeats.',
    'Mixture final concentration is just a weighted average by quantity.',
    'If mixing equal quantities, final = simple average of the two concentrations.',
    'For "how much water to add to dilute": use alligation with water at 0%.',
  ],

  questions: [
    { id: 'mix-q1', text: 'In what ratio should rice at ₹20/kg be mixed with rice at ₹30/kg to get a mixture worth ₹25/kg?', options: ['1:1', '2:1', '1:2', '3:2'], answer: 0, explanation: 'Alligation: (30−25):(25−20) = 5:5 = 1:1.', hint: 'Draw the alligation cross.', difficulty: 'easy', tags: ['alligation'], timeLimit: 60 },
    { id: 'mix-q2', text: 'A 40 L vessel of milk has 4 L removed and replaced with water, twice. How much milk remains?', options: ['32.4 L', '34 L', '36 L', '38 L'], answer: 0, explanation: 'Milk left = 40 × (1−4/40)² = 40 × 0.81 = 32.4 L.', hint: 'Repeated dilution formula.', difficulty: 'medium', tags: ['dilution'], timeLimit: 75 },
    { id: 'mix-q3', text: 'Mix 10 L of 20% solution with 20 L of 30% solution. Final concentration?', options: ['25%', '26.67%', '27%', '28%'], answer: 1, explanation: '(10×20 + 20×30)/30 = (200+600)/30 = 800/30 = 26.67%.', hint: 'Weighted average by quantity.', difficulty: 'medium', tags: ['weighted'], timeLimit: 75 },
    { id: 'mix-q4', text: 'How much water must be added to 60 L of 40% alcohol to make it 30%?', options: ['10 L', '15 L', '20 L', '25 L'], answer: 2, explanation: 'Alcohol = 60×0.4 = 24 L stays. Final 30% → total = 24/0.3 = 80 L. Add 80−60 = 20 L water.', hint: 'Alcohol quantity is constant; only volume grows.', difficulty: 'medium', tags: ['dilute'], timeLimit: 75 },
    { id: 'mix-q5', text: 'Two alloys: A is 2:3 gold:silver, B is 3:2. In what ratio mix A and B to get 1:1?', options: ['1:1', '2:3', '3:2', 'Equal only if same total'], answer: 0, explanation: 'A has 40% gold, B has 60% gold. Want 50%: ratio = (60−50):(50−40)=10:10=1:1.', hint: 'Convert ratios to % gold, then alligate.', difficulty: 'hard', tags: ['alloy'], timeLimit: 90 },
    { id: 'mix-q6', text: 'A man buys 2 kg at ₹40/kg and 3 kg at ₹50/kg. Average price per kg?', options: ['₹44', '₹45', '₹46', '₹47'], answer: 2, explanation: '(2×40 + 3×50)/5 = (80+150)/5 = 230/5 = ₹46/kg.', hint: 'Weighted by kg.', difficulty: 'easy', tags: ['weighted'], timeLimit: 60 },
    { id: 'mix-q7', text: 'From a 50 L milk vessel, 10 L is taken out and replaced with water. This is done 3 times. Milk left?', options: ['25.6 L', '29 L', '32 L', '36 L'], answer: 0, explanation: 'Milk left = 50 × (1−10/50)³ = 50 × (0.8)³ = 50 × 0.512 = 25.6 L.', hint: 'Repeated dilution: 0.8³.', difficulty: 'hard', tags: ['dilution'], timeLimit: 90 },
    { id: 'mix-q8', text: 'In what ratio mix tea at ₹60/kg with tea at ₹90/kg for a ₹75/kg blend?', options: ['1:1', '2:1', '1:2', '3:1'], answer: 0, explanation: 'Alligation: (90−75):(75−60) = 15:15 = 1:1.', hint: 'Cross method.', difficulty: 'easy', tags: ['alligation'], timeLimit: 60 },
  ],

  aiTutorPrompt: 'You are helping an engineering student with Mixtures & Alligations for placement quant (TCS, Infosys). Focus on the rule of alligation (cross method), repeated dilution formula, and identifying the mean price. Use concise numeric examples.',
};
