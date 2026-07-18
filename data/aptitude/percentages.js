/**
 * data/aptitude/percentages.js — Percentages Chapter
 * Full structured chapter: notes (Markdown), formulas, shortcuts, questions.
 */
export default {
  id: 'aptitude-percentages',
  subject: 'aptitude',
  title: 'Percentages',
  
  difficulty: 'easy',
  estimatedTime: 40,
  prerequisites: [],

  notes: `
## What is a Percentage?

A **percentage** means *per hundred*. It expresses a number as a fraction of 100, denoted by **%**.

**Formula:** Percentage = (Part / Whole) × 100

> **Quick check:** 30 out of 200 = (30/200) × 100 = **15%**

---

## Key Fraction ↔ Percentage Conversions

| Fraction | Percentage | Fraction | Percentage |
|----------|------------|----------|------------|
| 1/2      | 50%        | 1/7      | 14.28%     |
| 1/3      | 33.33%     | 2/7      | 28.57%     |
| 1/4      | 25%        | 3/7      | 42.85%     |
| 1/5      | 20%        | 1/8      | 12.5%      |
| 1/6      | 16.67%     | 1/9      | 11.11%     |
| 1/10     | 10%        | 1/11     | 9.09%      |
| 1/12     | 8.33%      | 3/4      | 75%        |
| 2/3      | 66.67%     | 2/5      | 40%        |
| 3/5      | 60%        | 4/5      | 80%        |

**Memorise these** — they appear directly in TCS/Infosys questions.

---

## Percentage Increase & Decrease

**Increase%** = (Increase / Original) × 100

**Decrease%** = (Decrease / Original) × 100

> If price goes from ₹400 to ₹500: Increase = 100, Increase% = (100/400) × 100 = **25%**

> If price goes from ₹500 to ₹400: Decrease = 100, Decrease% = (100/500) × 100 = **20%**

**Key trap:** A 25% increase followed by a 25% decrease does NOT return to the original value!

---

## Successive Percentage Changes

If a value changes by **A%** then **B%**, the net change is:

**Net% = A + B + (AB/100)**

> **Example:** Price up 20%, then down 10%.
> Net = 20 + (-10) + (20 × -10)/100 = 10 - 2 = **+8%** (net increase)

> **Example:** Two successive increases of 10% and 20%.
> Net = 10 + 20 + (10×20)/100 = 30 + 2 = **+32%**

For three successive changes A%, B%, C%:
Apply the formula twice, or use: **A + B + C + (AB + BC + CA)/100 + ABC/10000**

---

## Population / Value Change Formula

If a value **P** grows at **R%** per year for **n** years:

**Final = P × (1 + R/100)^n**

For depreciation (decrease): **Final = P × (1 − R/100)^n**

> Population 50,000, growth 5% for 3 years: 50000 × (1.05)³ = 50000 × 1.157625 = **57,881**

---

## Finding Original Value

If after an X% increase the result is N, find original:

**Original = N × 100 / (100 + X)**

If after an X% decrease the result is N:

**Original = N × 100 / (100 − X)**

> If after 25% increase price is ₹500 → Original = 500 × 100/125 = **₹400**
> If after 20% decrease price is ₹400 → Original = 400 × 100/80 = **₹500**

---

## Percentage to Fraction Shortcuts for Fast Calculation

| To find | Shortcut |
|---------|----------|
| 10% of X | X/10 (move decimal left once) |
| 1% of X | X/100 (move decimal left twice) |
| 5% of X | X/20 (half of 10%) |
| 15% of X | 10% + 5% = X/10 + X/20 |
| 25% of X | X/4 |
| 30% of X | 3X/10 |
| 33.33% of X | X/3 |
| 75% of X | 3X/4 |

---

## Expenditure / Consumption Problems

If price increases by R%, the reduction in consumption to keep expenditure same:

**Reduction% = R/(100+R) × 100**

If price decreases by R%, the increase in consumption to keep expenditure same:

**Increase% = R/(100−R) × 100**

> Price of sugar up 25% → reduce consumption by 25/125 × 100 = **20%**
> Price of sugar down 20% → increase consumption by 20/80 × 100 = **25%**

---

## Election / Voter Problems

**Winning margin%** = (Margin of votes / Total votes polled) × 100

**Votes for winner** = Total × (50 + margin/2) / 100 (for 2 candidates)

> In an election, winner gets 55% of votes. Total votes = 10,000. Winner's margin = (55-45)% × 10000 = **1,000 votes**

---

## TCS/Infosys Common Patterns

1. **A is X% more than B** → B is X/(100+X) × 100% less than A
2. **A is X% less than B** → B is X/(100−X) × 100% more than A
3. **If A% of B = B% of A** (commutative property — very useful!)
4. **Net effect of +R% and −R% = −R²/100%** (always a loss!)
  `,

  formulas: [
    { name: 'Basic %',             formula: '(Part / Whole) × 100',              example: '(30/200) × 100 = 15%' },
    { name: 'Increase %',          formula: '(Increase / Original) × 100',       example: '(50/400) × 100 = 12.5%' },
    { name: 'Decrease %',          formula: '(Decrease / Original) × 100',       example: '(50/500) × 100 = 10%' },
    { name: 'Successive Change',   formula: 'A + B + (AB/100)',                   example: '20 + (-10) + (-2) = 8%' },
    { name: 'Value after R%',      formula: 'P × (1 + R/100)^n',                 example: '1000 × 1.1^2 = 1210' },
    { name: 'Value after deprec.', formula: 'P × (1 − R/100)^n',                 example: '1000 × 0.9^2 = 810' },
    { name: 'Find Original (inc)', formula: 'N × 100 / (100 + X)',               example: '500 × 100/125 = 400' },
    { name: 'Find Original (dec)', formula: 'N × 100 / (100 − X)',               example: '400 × 100/80 = 500' },
    { name: 'Consumption change',  formula: 'R/(100±R) × 100',                   example: '25/125 × 100 = 20%' },
    { name: 'Net ±R% effect',      formula: '−R²/100%',                          example: '±20% → −4%' },
    { name: 'A% of B = B% of A',   formula: 'A% × B = B% × A',                   example: '18% of 50 = 50% of 18 = 9' },
    { name: 'Election margin',     formula: '(Margin/Total) × 100',              example: '1000/10000 × 100 = 10%' },
  ],

  shortcuts: [
    '10% of X = X/10 — just move decimal one left',
    '20% = 2 × 10%, 25% = X/4, 33.33% = X/3, 12.5% = X/8',
    'To find X% of Y: swap them! 18% of 50 = 50% of 18 = 9',
    'If price rises R%, to restore original: decrease by R/(100+R) × 100',
    'Successive 10% up then 10% down = net −1% (not 0!)',
    'Net effect of +R% and −R% is always negative: −R²/100%',
    'For "A is X% more than B": B is X/(100+X)×100% less than A',
    'Memorize fraction-percentage table up to 1/12 for instant recall',
    '15% of X = 10% + 5% = X/10 + X/20 = 3X/20',
    'For population problems: use compound interest formula directly',
    'If A% of B = C, then B = C × 100/A — reverse percentage trick',
    'Election problems: winner% + loser% = 100%, margin = winner − loser',
  ],

  questions: [
    {
      id: 'pct-q1',
      text: 'What is 15% of 800?',
      options: ['100', '110', '120', '130'],
      answer: 2,
      explanation: '15% of 800 = (15/100) × 800 = 120',
      hint: 'Find 10% first (80), then add half of that (40) = 120',
      difficulty: 'easy',
      tags: ['basic', 'direct'],
      timeLimit: 60,
    },
    {
      id: 'pct-q2',
      text: 'A number is increased by 20% and then decreased by 20%. What is the net percentage change?',
      options: ['0%', '-4%', '+4%', '-2%'],
      answer: 1,
      explanation: 'Net% = A + B + AB/100 = 20 + (-20) + (20×-20)/100 = 0 - 4 = -4%',
      hint: 'Use the successive change formula: A + B + AB/100',
      difficulty: 'medium',
      tags: ['successive', 'tricky'],
      timeLimit: 75,
    },
    {
      id: 'pct-q3',
      text: 'If 60% of a number is 150, what is 80% of that number?',
      options: ['180', '200', '220', '240'],
      answer: 1,
      explanation: 'Number = 150/0.6 = 250. 80% of 250 = 200.',
      hint: 'First find the full number, then calculate 80% of it.',
      difficulty: 'easy',
      tags: ['basic', 'reverse'],
      timeLimit: 60,
    },
    {
      id: 'pct-q4',
      text: 'The population of a town increases by 10% every year. If the current population is 10,000, what will it be after 2 years?',
      options: ['12,000', '12,100', '11,000', '12,200'],
      answer: 1,
      explanation: 'P × (1.1)^2 = 10000 × 1.21 = 12,100',
      hint: 'Use compound growth: P × (1 + R/100)^n',
      difficulty: 'medium',
      tags: ['compound', 'population'],
      timeLimit: 90,
    },
    {
      id: 'pct-q5',
      text: 'Ravi\'s salary is 20% more than Priya\'s. By what percentage is Priya\'s salary less than Ravi\'s?',
      options: ['20%', '16.67%', '25%', '15%'],
      answer: 1,
      explanation: 'If Priya = 100, Ravi = 120. Priya is less by 20/120 × 100 = 16.67%',
      hint: 'Remember: X% more does NOT mean the other is X% less!',
      difficulty: 'medium',
      tags: ['comparison', 'classic'],
      timeLimit: 75,
    },
    {
      id: 'pct-q6',
      text: 'A student needs 40% marks to pass. He scores 150 marks and fails by 50 marks. What are the maximum marks?',
      options: ['400', '450', '500', '550'],
      answer: 2,
      explanation: 'Pass marks = 150 + 50 = 200. 40% of Max = 200. Max = 200 × 100/40 = 500',
      hint: 'Pass marks = marks scored + marks by which failed. Then find total.',
      difficulty: 'easy',
      tags: ['exam', 'pass-marks'],
      timeLimit: 60,
    },
    {
      id: 'pct-q7',
      text: 'If the price of sugar increases by 25%, by what percentage should a family reduce consumption to maintain the same expenditure?',
      options: ['20%', '25%', '16.67%', '30%'],
      answer: 0,
      explanation: 'Reduction% = R/(100+R) × 100 = 25/125 × 100 = 20%',
      hint: 'Use the formula: R/(100+R) × 100 for consumption reduction',
      difficulty: 'medium',
      tags: ['expenditure', 'consumption'],
      timeLimit: 75,
    },
    {
      id: 'pct-q8',
      text: 'In an election, the winning candidate got 55% of the total votes and won by 1500 votes. What is the total number of votes?',
      options: ['10,000', '12,500', '15,000', '7,500'],
      answer: 2,
      explanation: 'Winner = 55%, Loser = 45%. Margin = 10% of Total = 1500. Total = 1500 × 100/10 = 15,000',
      hint: 'Margin% = Winner% − Loser%. Then Total = Margin votes / Margin%',
      difficulty: 'medium',
      tags: ['election', 'votes'],
      timeLimit: 75,
    },
    {
      id: 'pct-q9',
      text: 'A value is first increased by 10% and then by 20%. What is the net percentage increase?',
      options: ['30%', '32%', '33%', '35%'],
      answer: 1,
      explanation: 'Net = 10 + 20 + (10×20)/100 = 30 + 2 = 32%',
      hint: 'Use successive change formula for two increases',
      difficulty: 'easy',
      tags: ['successive', 'increase'],
      timeLimit: 60,
    },
    {
      id: 'pct-q10',
      text: 'If A\'s income is 40% less than B\'s, by what percentage is B\'s income more than A\'s?',
      options: ['40%', '60%', '66.67%', '80%'],
      answer: 2,
      explanation: 'If B = 100, A = 60. B is more by (100−60)/60 × 100 = 40/60 × 100 = 66.67%',
      hint: 'A is 40% less than B means A = 60% of B. Then find how much B is more than A.',
      difficulty: 'medium',
      tags: ['comparison', 'reverse'],
      timeLimit: 75,
    },
    {
      id: 'pct-q11',
      text: 'A machine depreciates at 10% per annum. If its present value is ₹1,00,000, what will be its value after 3 years?',
      options: ['₹72,900', '₹70,000', '₹75,000', '₹73,500'],
      answer: 0,
      explanation: 'Value = 100000 × (0.9)³ = 100000 × 0.729 = ₹72,900',
      hint: 'Use depreciation formula: P × (1 − R/100)^n',
      difficulty: 'medium',
      tags: ['depreciation'],
      timeLimit: 75,
    },
    {
      id: 'pct-q12',
      text: '80% of a number is 40 more than 50% of the same number. What is the number?',
      options: ['100', '120', '133.33', '150'],
      answer: 2,
      explanation: '80% of x − 50% of x = 40 → 30% of x = 40 → x = 40 × 100/30 = 133.33',
      hint: 'Set up: 0.8x − 0.5x = 40, solve for x',
      difficulty: 'easy',
      tags: ['algebra', 'equation'],
      timeLimit: 60,
    },
    {
      id: 'pct-q13',
      text: 'The price of a shirt is first increased by 30% and then decreased by 30%. What is the net effect?',
      options: ['No change', '9% loss', '9% gain', '6% loss'],
      answer: 1,
      explanation: 'Net = 30 + (-30) + (30×-30)/100 = 0 − 9 = −9%. Net loss of 9%.',
      hint: 'Use successive change formula. +R% and −R% always gives a loss of R²/100%.',
      difficulty: 'medium',
      tags: ['successive', 'tricky'],
      timeLimit: 60,
    },
    {
      id: 'pct-q14',
      text: 'A town\'s population was 80,000 in 2020. It increased by 5% in 2021 and then by 8% in 2022. What is the population in 2022?',
      options: ['90,720', '91,000', '89,600', '90,000'],
      answer: 0,
      explanation: '2021: 80000 × 1.05 = 84,000. 2022: 84000 × 1.08 = 90,720',
      hint: 'Apply growth year by year, or use successive formula: 5 + 8 + (5×8)/100 = 13.4%',
      difficulty: 'medium',
      tags: ['compound', 'population'],
      timeLimit: 90,
    },
    {
      id: 'pct-q15',
      text: 'If 25% of (A + B) = 40% of (A − B), what percentage of B is A?',
      options: ['200%', '300%', '433.33%', '500%'],
      answer: 2,
      explanation: '0.25(A+B) = 0.40(A−B) → 25A + 25B = 40A − 40B → 65B = 15A → A/B = 65/15 = 13/3 = 433.33%',
      hint: 'Set up the equation and solve for A/B ratio',
      difficulty: 'hard',
      tags: ['algebra', 'ratio'],
      timeLimit: 120,
    },
    {
      id: 'pct-q16',
      text: 'A reduction of 20% in the price of rice enables a person to buy 5 kg more for ₹600. What is the reduced price per kg?',
      options: ['₹20', '₹24', '₹25', '₹30'],
      answer: 1,
      explanation: '20% reduction saves ₹120 (20% of 600). This ₹120 buys 5 kg extra. Reduced price = 120/5 = ₹24/kg',
      hint: 'Money saved from the reduction = extra quantity × reduced price',
      difficulty: 'hard',
      tags: ['expenditure', 'quantity'],
      timeLimit: 120,
    },
    {
      id: 'pct-q17',
      text: 'In a class, 60% of students are boys. If 20% of boys and 25% of girls failed in an exam, what percentage of the class passed?',
      options: ['76%', '78%', '80%', '82%'],
      answer: 1,
      explanation: 'Assume 100 students: 60 boys, 40 girls. Failed boys = 20% of 60 = 12. Failed girls = 25% of 40 = 10. Total failed = 22. Passed = 78%.',
      hint: 'Assume total = 100 for easy calculation. Find failures separately.',
      difficulty: 'medium',
      tags: ['class', 'pass-fail'],
      timeLimit: 90,
    },
    {
      id: 'pct-q18',
      text: 'A number is first decreased by 25% and then increased by 40%. The result is 420. What is the original number?',
      options: ['350', '375', '400', '425'],
      answer: 2,
      explanation: 'Let original = x. x × 0.75 × 1.40 = 420 → x × 1.05 = 420 → x = 420/1.05 = 400',
      hint: 'Work backwards: divide 420 by 1.40, then divide by 0.75',
      difficulty: 'hard',
      tags: ['reverse', 'original'],
      timeLimit: 120,
    },
    {
      id: 'pct-q19',
      text: 'The value of a car depreciates by 15% each year. After how many full years will its value be less than half its original value?',
      options: ['3 years', '4 years', '5 years', '6 years'],
      answer: 2,
      explanation: 'After 3 years: 0.85³ = 0.614. After 4 years: 0.85⁴ = 0.522. After 5 years: 0.85⁵ = 0.444 < 0.5. So 5 years.',
      hint: 'Calculate (0.85)^n until it drops below 0.5',
      difficulty: 'hard',
      tags: ['depreciation', 'half-life'],
      timeLimit: 120,
    },
    {
      id: 'pct-q20',
      text: 'If x is 150% of y and y is 40% of z, what percent of z is x?',
      options: ['50%', '60%', '75%', '80%'],
      answer: 1,
      explanation: 'x = 1.5y and y = 0.4z. So x = 1.5 × 0.4z = 0.6z = 60% of z',
      hint: 'Substitute: x = 1.5 × (0.4 × z) = 0.6z',
      difficulty: 'easy',
      tags: ['chained', 'variables'],
      timeLimit: 60,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Percentages for campus placement exams (TCS, Infosys, Wipro). Focus on shortcuts, common tricks, and pattern recognition. Keep answers concise and use simple numeric examples.',
};
