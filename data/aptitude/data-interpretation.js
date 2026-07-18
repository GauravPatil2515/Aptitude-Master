/**
 * data/aptitude/data-interpretation.js — Data Interpretation Chapter
 * Full DI course: Table DI, Caselet DI, Bar Graph DI, Pie Chart DI
 * Source: Complete placement DI curriculum with 40+ practice questions
 */
export default {
  id: 'aptitude-data-interpretation',
  subject: 'aptitude',
  title: 'Data Interpretation',
  
  difficulty: 'medium',
  estimatedTime: 90,
  prerequisites: ['percentages', 'ratio-proportion'],

  notes: `
## What is Data Interpretation?

DI is NOT a new topic. It is applying old topics quickly:
- Percentages
- Ratios
- Averages
- Profit & Loss
- Simple arithmetic

Companies test: **Speed, Accuracy, Percentage calculations, Approximation skills**

---

## DI Strategy (Always Follow)

1. **Read questions first** — know what to look for
2. **Locate data** — find the relevant numbers
3. **Calculate only required values** — don't pre-compute everything
4. **Create a working table** — convert percentages to numbers immediately
5. **Approximate** when options are far apart

---

## Types of DI

### 1. Table DI
Direct lookup from a data table. Most common in TCS, Infosys.

### 2. Bar Graph DI
Compare values, find differences, growth %, averages.

### 3. Pie Chart DI
Percentage distribution. Convert % to actual values first.

### 4. Line Graph DI
Growth over time. Focus on trends and percentage change.

### 5. Caselet DI
Data hidden inside a paragraph. No table given. You must extract and build your own table.

---

## Table DI — Example

| Year | Product A | Product B | Product C | Product D |
|------|-----------|-----------|-----------|-----------|
| 2020 | 120       | 150       | 180       | 100       |
| 2021 | 140       | 160       | 200       | 120       |
| 2022 | 180       | 190       | 240       | 150       |
| 2023 | 220       | 210       | 260       | 170       |
| 2024 | 260       | 240       | 300       | 200       |

**Direct lookup:** Product C in 2022 = 240
**Difference:** Product A vs D in 2024 = 260 − 200 = 60
**Total 2020:** 120+150+180+100 = 550
**Total 2024:** 260+240+300+200 = 1000
**Average Product B:** (150+160+190+210+240)/5 = 950/5 = 190
**Average Product C:** (180+200+240+260+300)/5 = 1180/5 = 236
**Average total sales/year:** (550+620+760+860+1000)/5 = 3790/5 = 758
**Ratio A:D (2024):** 260:200 = 13:10
**Ratio B:C (2022):** 190:240 = 19:24
**Growth A (2020→2024):** (260−120)/120 × 100 = 116.67%
**Growth D (2020→2024):** (200−100)/100 × 100 = 100%
**Growth C (2021→2024):** (300−200)/200 × 100 = 50%
**Share of C in 2024:** 300/1000 × 100 = 30%

---

## Caselet DI — Example

A company has 4 departments: HR, Finance, Sales, Technology. Total employees = 1000.

**Distribution:** HR = 20%, Finance = 15%, Sales = 35%, Technology = 30%

**Gender split:**
- HR: Male 60%, Female 40%
- Finance: Male 40%, Female 60%
- Sales: Male 70%, Female 30%
- Technology: Male 80%, Female 20%

**Step 1: Convert to numbers**
- HR: 200 (Male: 120, Female: 80)
- Finance: 150 (Male: 60, Female: 90)
- Sales: 350 (Male: 245, Female: 105)
- Technology: 300 (Male: 240, Female: 60)

**Working Table:**
| Dept | Total | Male | Female |
|------|-------|------|--------|
| HR | 200 | 120 | 80 |
| Finance | 150 | 60 | 90 |
| Sales | 350 | 245 | 105 |
| Technology | 300 | 240 | 60 |

**Key results:**
- Total Male: 120+60+245+240 = 665
- Total Female: 80+90+105+60 = 335
- HR:Finance = 200:150 = 4:3
- Sales:Technology = 350:300 = 7:6
- Male:Female (company) = 665:335 = 133:67
- Avg employees/dept = 1000/4 = 250
- Avg male/dept = 665/4 = 166.25
- Avg female/dept = 335/4 = 83.75
- Sales % of total = 350/1000 × 100 = 35%
- Female % of total = 335/1000 × 100 = 33.5%
- Male % in Technology = 240/300 × 100 = 80%
- Sales males as % of total males = 245/665 × 100 = 36.84%
- Technology +20% = 300 + 60 = 360

---

## Bar Graph DI — Example

Laptop sales (units): 2020=1200, 2021=1500, 2022=1800, 2023=2400, 2024=3000

- **Max sales:** 2024 (3000)
- **Difference 2024−2020:** 3000−1200 = 1800
- **Total:** 1200+1500+1800+2400+3000 = 9900
- **Average:** 9900/5 = 1980
- **Growth 2020→2024:** (3000−1200)/1200 × 100 = 150%
- **2024 as % of 2020:** 3000/1200 × 100 = 250%
- **Difference 2023−2021:** 2400−1500 = 900
- **Avg first 3 years:** (1200+1500+1800)/3 = 1500
- **Growth 2021→2023:** (2400−1500)/1500 × 100 = 60%
- **2022 as % of 2024:** 1800/3000 × 100 = 60%
- **Total 2022+2023:** 1800+2400 = 4200

> **Important:** Growth% and "A as % of B" are NOT the same!

---

## Pie Chart DI — Example

Total Expense: ₹20,00,000
- Salaries: 40% = ₹8,00,000
- Marketing: 25% = ₹5,00,000
- Rent: 15% = ₹3,00,000
- Transport: 10% = ₹2,00,000
- Misc: 10% = ₹2,00,000

- **Highest expense:** Salaries (₹8,00,000)
- **Difference (Salary − Marketing):** 8,00,000 − 5,00,000 = ₹3,00,000
- **Marketing as % of Salary:** 5,00,000/8,00,000 × 100 = 62.5%
- **Rent + Transport:** 3,00,000 + 2,00,000 = ₹5,00,000
- **Salary exceeds Rent by:** (8,00,000−3,00,000)/3,00,000 × 100 = 166.67%

---

## Must Memorize: Percentage ↔ Fraction Conversions

| Percentage | Fraction |
|-----------|----------|
| 50% | 1/2 |
| 25% | 1/4 |
| 20% | 1/5 |
| 10% | 1/10 |
| 12.5% | 1/8 |
| 33.33% | 1/3 |
| 66.67% | 2/3 |
| 75% | 3/4 |

> 25% of 840 = 840/4 = **210** (much faster than 0.25 × 840!)

---

## DI Master Formulas

**Increase%** = (New − Old) / Old × 100

**Decrease%** = (Old − New) / Old × 100

**Average** = Total / Count

**Share%** = Part / Total × 100

**Ratio** = a:b (simplify by GCD)

---

## DI Golden Rules

1. **Read questions first** — don't study the whole graph
2. **Create a working table** — convert % to numbers immediately
3. **Most DI questions are actually** percentage, average, and ratio questions
4. **Approximate** when options are far apart
5. **Use fraction shortcuts** — 25% = 1/4, 20% = 1/5, etc.
  `,

  formulas: [
    { name: 'Increase %',       formula: '(New − Old) / Old × 100',          example: '(500−400)/400 × 100 = 25%' },
    { name: 'Decrease %',       formula: '(Old − New) / Old × 100',          example: '(400−300)/400 × 100 = 25%' },
    { name: 'Average',          formula: 'Total / Count',                    example: '4000/5 = 800' },
    { name: 'Share %',          formula: 'Part / Total × 100',              example: '300/1000 × 100 = 30%' },
    { name: 'Ratio simplify',   formula: 'Divide both by GCD',              example: '260:200 → 13:10' },
  ],

  shortcuts: [
    'Read questions FIRST, then locate data — saves 40% time',
    'Convert all percentages to actual numbers immediately',
    'Use fraction shortcuts: 25%=1/4, 20%=1/5, 12.5%=1/8',
    'Approximate when options are far apart (e.g., 198×49 ≈ 200×50 = 10000)',
    'For caselet DI: build your own table before solving any question',
    'Growth% ≠ "A as % of B" — know the difference!',
    'Don\'t calculate unnecessary values — only compute what\'s asked',
  ],

  questions: [
    {
      id: 'di-q1',
      text: 'Study the table: Year 2020-2024, Product A sales: 120, 140, 180, 220, 260 (₹ lakhs). What is the total sales of Product A across all 5 years?',
      options: ['820', '920', '1020', '1120'],
      answer: 1,
      explanation: '120+140+180+220+260 = 920',
      hint: 'Simply add all 5 values',
      difficulty: 'easy',
      tags: ['table-di', 'total'],
      timeLimit: 60,
    },
    {
      id: 'di-q2',
      text: 'Using the same Product A data (120, 140, 180, 220, 260), what is the percentage increase from 2020 to 2024?',
      options: ['100%', '116.67%', '120%', '133.33%'],
      answer: 1,
      explanation: '(260−120)/120 × 100 = 140/120 × 100 = 116.67%',
      hint: 'Use (New−Old)/Old × 100',
      difficulty: 'easy',
      tags: ['table-di', 'growth'],
      timeLimit: 60,
    },
    {
      id: 'di-q3',
      text: 'A company has 1000 employees. HR=20%, Finance=15%, Sales=35%, Technology=30%. How many employees in Sales?',
      options: ['250', '300', '350', '400'],
      answer: 2,
      explanation: '35% × 1000 = 350',
      hint: '35% of 1000',
      difficulty: 'easy',
      tags: ['caselet', 'basic'],
      timeLimit: 30,
    },
    {
      id: 'di-q4',
      text: 'From Q3 data: HR has 60% male, 40% female. How many female employees in HR?',
      options: ['60', '80', '100', '120'],
      answer: 1,
      explanation: 'HR = 20% × 1000 = 200. Female = 40% × 200 = 80',
      hint: 'First find HR total, then find 40% of that',
      difficulty: 'easy',
      tags: ['caselet', 'gender-split'],
      timeLimit: 45,
    },
    {
      id: 'di-q5',
      text: 'Pie chart: Total expense ₹50,00,000. Salaries = 40%, Marketing = 25%. What is the difference between Salary and Marketing expenses?',
      options: ['₹5,00,000', '₹7,50,000', '₹10,00,000', '₹12,50,000'],
      answer: 1,
      explanation: 'Salary = 40% × 50,00,000 = 20,00,000. Marketing = 25% × 50,00,000 = 12,50,000. Difference = 7,50,000',
      hint: 'Find 40% and 25% of 50,00,000, then subtract',
      difficulty: 'easy',
      tags: ['pie-chart', 'difference'],
      timeLimit: 60,
    },
    {
      id: 'di-q6',
      text: 'Bar graph shows sales: 2021=1500, 2022=1800, 2023=2400. What is the percentage increase from 2021 to 2023?',
      options: ['40%', '50%', '60%', '70%'],
      answer: 2,
      explanation: '(2400−1500)/1500 × 100 = 900/1500 × 100 = 60%',
      hint: 'Difference/Original × 100',
      difficulty: 'easy',
      tags: ['bar-graph', 'growth'],
      timeLimit: 45,
    },
    {
      id: 'di-q7',
      text: 'Table: Product C sales 2020-2024: 180, 200, 240, 260, 300. What is the average sales of Product C?',
      options: ['220', '230', '236', '240'],
      answer: 2,
      explanation: '(180+200+240+260+300)/5 = 1180/5 = 236',
      hint: 'Sum all values and divide by 5',
      difficulty: 'easy',
      tags: ['table-di', 'average'],
      timeLimit: 60,
    },
    {
      id: 'di-q8',
      text: 'Caselet: 4 departments, total 1000 employees. Sales=35%, Technology=30%. What is the ratio of Sales to Technology employees?',
      options: ['6:7', '7:6', '5:6', '6:5'],
      answer: 1,
      explanation: 'Sales = 350, Technology = 300. Ratio = 350:300 = 7:6',
      hint: 'Convert percentages to numbers, then simplify the ratio',
      difficulty: 'easy',
      tags: ['caselet', 'ratio'],
      timeLimit: 45,
    },
    {
      id: 'di-q9',
      text: 'Pie chart: Total revenue ₹1,00,000. Product A=30%, Product B=25%, Product C=20%. What percentage of total revenue comes from A and C together?',
      options: ['40%', '45%', '50%', '55%'],
      answer: 2,
      explanation: '30% + 20% = 50%',
      hint: 'Simply add the two percentages',
      difficulty: 'easy',
      tags: ['pie-chart', 'combined-share'],
      timeLimit: 30,
    },
    {
      id: 'di-q10',
      text: 'Sales data: 2020=1200, 2024=3000. Sales in 2024 are what percent of sales in 2020?',
      options: ['150%', '200%', '250%', '300%'],
      answer: 2,
      explanation: '3000/1200 × 100 = 250%. Note: This is NOT the same as growth% (which would be 150%)',
      hint: 'Part/Whole × 100 — this is different from growth%',
      difficulty: 'medium',
      tags: ['bar-graph', 'percent-of'],
      timeLimit: 45,
    },
    {
      id: 'di-q11',
      text: 'Caselet: Total 1000 employees. HR=20% (M60%, F40%), Finance=15% (M40%, F60%). What is the total number of male employees in HR and Finance combined?',
      options: ['160', '170', '180', '190'],
      answer: 2,
      explanation: 'HR males = 60% × 200 = 120. Finance males = 40% × 150 = 60. Total = 180',
      hint: 'Calculate each department total, then find male percentage of each',
      difficulty: 'medium',
      tags: ['caselet', 'combined-male'],
      timeLimit: 75,
    },
    {
      id: 'di-q12',
      text: 'Table: Year totals — 2020=550, 2021=620, 2022=760, 2023=860, 2024=1000. What is the average total sales per year?',
      options: ['738', '748', '758', '768'],
      answer: 2,
      explanation: '(550+620+760+860+1000)/5 = 3790/5 = 758',
      hint: 'Add all year totals and divide by 5',
      difficulty: 'easy',
      tags: ['table-di', 'average-total'],
      timeLimit: 75,
    },
    {
      id: 'di-q13',
      text: 'Pie chart: Total ₹20,00,000. Salaries=40%, Rent=15%. By what percentage does Salary exceed Rent?',
      options: ['100%', '150%', '166.67%', '200%'],
      answer: 2,
      explanation: 'Salary = 8,00,000, Rent = 3,00,000. (8,00,000−3,00,000)/3,00,000 × 100 = 166.67%',
      hint: '(Salary−Rent)/Rent × 100 — the base is Rent, not Salary!',
      difficulty: 'medium',
      tags: ['pie-chart', 'exceeds'],
      timeLimit: 60,
    },
    {
      id: 'di-q14',
      text: 'Caselet: Sales dept has 350 employees (M70%, F30%). What percentage of total company males (665) belong to Sales?',
      options: ['30%', '36.84%', '40%', '35%'],
      answer: 1,
      explanation: 'Sales males = 70% × 350 = 245. 245/665 × 100 = 36.84%',
      hint: 'First find Sales males, then divide by total males',
      difficulty: 'medium',
      tags: ['caselet', 'share-of-total'],
      timeLimit: 75,
    },
    {
      id: 'di-q15',
      text: 'If Technology department (300 employees) increases by 20%, what is the new strength?',
      options: ['320', '340', '360', '380'],
      answer: 2,
      explanation: '20% × 300 = 60. New = 300 + 60 = 360',
      hint: 'Find 20% of 300 and add to original',
      difficulty: 'easy',
      tags: ['caselet', 'increase'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student master Data Interpretation for placement exams. Focus on the 4 DI types (Table, Caselet, Bar Graph, Pie Chart), the strategy of reading questions first, converting percentages to numbers, and using fraction shortcuts. Cover common traps like Growth% vs "A as % of B". Keep answers concise with step-by-step solutions.',
};
