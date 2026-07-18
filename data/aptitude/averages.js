/**
 * data/aptitude/averages.js — Averages Chapter
 * Structured chapter: notes (Markdown), formulas, shortcuts, questions.
 */
export default {
  id: 'aptitude-averages',
  subject: 'aptitude',
  title: 'Averages',

  difficulty: 'easy',
  estimatedTime: 40,
  prerequisites: ['percentages', 'ratio-proportion'],

  notes: `
## What is an Average?

The **average** (arithmetic mean) of n numbers is their sum divided by n.

**Average = Sum of observations / Number of observations**

If the average of n items is A, then **Sum = n × A**. This is the most useful inversion.

---

## Average of a Group Split into Sub-Groups

If group 1 has n₁ items with average A₁, and group 2 has n₂ items with average A₂:

**Combined Average = (n₁A₁ + n₂A₂) / (n₁ + n₂)**

For three groups: **(n₁A₁ + n₂A₂ + n₃A₃) / (n₁ + n₂ + n₃)**

---

## Addition / Removal of an Item

- If a new item x is added, new average A' satisfies: **A' = A + (x − A)/(n + 1)**
- If an item x is removed, new average: **A' = A − (x − A)/(n − 1)**
- Quick rule: when one item changes by Δ and average changes by d over n items, **Δ = n × d** (for the change in that one item relative to old average).

> A class of 30 students averages 60. One student's mark is corrected from 50 to 80 (+30). New average = 60 + 30/30 = **61**.

---

## Average and a Constant Shift

Adding a constant c to every item increases the average by c.
Subtracting c decreases the average by c.

This lets you "shift" numbers to a convenient base (like 50 or 100) to simplify mental math.

> Average of 98, 99, 101, 102. Shift by −100: −2, −1, +1, +2 → average 0 → real average = **100**.

---

## Average Speed (very common!)

If a distance d is covered at speed v₁ and the same distance d returned at v₂:

**Average Speed = 2v₁v₂ / (v₁ + v₂)**  (harmonic mean, NOT arithmetic mean)

If distances differ (d₁ at v₁, d₂ at v₂): **Average Speed = (d₁ + d₂) / (d₁/v₁ + d₂/v₂)**

> Go 60 km/h one way, 40 km/h back (same distance). Avg speed = 2×60×40/(60+40) = 4800/100 = **48 km/h** (not 50!).

---

## Average of First n Natural / Even / Odd Numbers

- Avg of first n natural numbers = (n + 1) / 2
- Avg of first n even numbers = n + 1
- Avg of first n odd numbers = n

> Avg of 1..10 = (10+1)/2 = **5.5**. Avg of first 5 odd (1,3,5,7,9) = **5**.
  `,

  formulas: [
    { name: 'Basic average',      formula: 'Sum / n',                         example: 'Sum 300 over 6 = 50' },
    { name: 'Find sum',           formula: 'n × Average',                     example: '20 items avg 15 → sum 300' },
    { name: 'Combined average',   formula: '(n₁A₁ + n₂A₂) / (n₁+n₂)',         example: '(10×20 + 20×30)/30 = 26.67' },
    { name: 'New avg (add item)', formula: 'A + (x − A)/(n+1)',               example: 'A=60,n=30,x=80 → 61' },
    { name: 'New avg (remove)',   formula: 'A − (x − A)/(n−1)',               example: 'remove 80 from avg 61,n=31 → 60' },
    { name: 'Avg speed (equal d)', formula: '2v₁v₂/(v₁+v₂)',                   example: '60 & 40 → 48 km/h' },
    { name: 'Avg first n naturals', formula: '(n+1)/2',                        example: 'n=10 → 5.5' },
  ],

  shortcuts: [
    'Average = Sum/n. Always be ready to invert: Sum = n × Average.',
    'Shift all numbers by a constant to a round base, average, then shift back.',
    'Average speed for equal distances = harmonic mean, never the arithmetic mean.',
    'When one value changes by Δ and avg changes by d: Δ = n × d.',
    'Combined average is weighted by group sizes — bigger group pulls more.',
    'Avg of first n odds = n; first n evens = n+1; first n naturals = (n+1)/2.',
    'If every item increases by c, average increases by exactly c.',
  ],

  questions: [
    { id: 'avg-q1', text: 'The average of 5 numbers is 40. If one number 50 is replaced by 70, what is the new average?', options: ['42', '44', '46', '48'], answer: 1, explanation: 'Sum was 5×40=200. Replace 50→70 adds 20. New sum 220. New avg=220/5=44.', hint: 'Sum = n×avg. Track the change in sum.', difficulty: 'easy', tags: ['replace'], timeLimit: 60 },
    { id: 'avg-q2', text: 'A batsman scores 80, 90, 70, 60 in four innings. What is his average?', options: ['70', '75', '80', '85'], answer: 1, explanation: 'Sum = 80+90+70+60 = 300. Avg = 300/4 = 75.', hint: 'Average = sum / number of innings.', difficulty: 'easy', tags: ['basic'], timeLimit: 45 },
    { id: 'avg-q3', text: 'The average of 10 numbers is 25. If each number is increased by 5, what is the new average?', options: ['25', '30', '35', '50'], answer: 1, explanation: 'Adding 5 to every item raises the average by 5 → 25+5 = 30.', hint: 'Constant shift adds to the average directly.', difficulty: 'easy', tags: ['shift'], timeLimit: 45 },
    { id: 'avg-q4', text: 'A car goes from A to B at 40 km/h and returns at 60 km/h over the same distance. What is the average speed?', options: ['48 km/h', '50 km/h', '52 km/h', '55 km/h'], answer: 0, explanation: 'Equal distance → harmonic mean: 2×40×60/(40+60)=4800/100=48 km/h.', hint: 'Not the arithmetic mean (which would be 50).', difficulty: 'medium', tags: ['avg-speed'], timeLimit: 75 },
    { id: 'avg-q5', text: 'The average weight of 8 men is 70 kg. A new man joins and the average becomes 71 kg. What is the new man\'s weight?', options: ['71 kg', '78 kg', '79 kg', '80 kg'], answer: 2, explanation: 'Old sum = 8×70=560. New sum = 9×71=639. New man = 639−560 = 79 kg.', hint: 'New value = new total − old total.', difficulty: 'medium', tags: ['add-item'], timeLimit: 75 },
    { id: 'avg-q6', text: 'Group A (20 students, avg 30) and Group B (30 students, avg 40). What is the combined average?', options: ['34', '35', '36', '38'], answer: 2, explanation: 'Combined = (20×30 + 30×40)/50 = (600+1200)/50 = 1800/50 = 36.', hint: 'Weight by group sizes.', difficulty: 'medium', tags: ['combined'], timeLimit: 75 },
    { id: 'avg-q7', text: 'Average of 7 consecutive even numbers is 40. What is the largest number?', options: ['44', '46', '48', '50'], answer: 1, explanation: 'Consecutive evens are symmetric around the mean. They are 34,36,38,40,42,44,46. Largest = 46.', hint: 'For symmetric sequences the mean is the middle term.', difficulty: 'medium', tags: ['consecutive'], timeLimit: 75 },
    { id: 'avg-q8', text: 'A student needs an average of 60 across 5 subjects. He scores 55, 62, 58, 64 in four. What minimum does he need in the fifth?', options: ['61', '62', '63', '65'], answer: 0, explanation: 'Total needed = 5×60 = 300. Current sum = 55+62+58+64 = 239. Fifth = 300−239 = 61.', hint: 'Work backwards from required total.', difficulty: 'medium', tags: ['target'], timeLimit: 75 },
    { id: 'avg-q9', text: 'The average of 6 numbers is 18. If one number 8 is removed, what is the new average?', options: ['19', '20', '21', '22'], answer: 1, explanation: 'Old sum = 6×18=108. Remove 8 → 100. New avg = 100/5 = 20.', hint: 'New avg = (old sum − removed)/ (n−1).', difficulty: 'hard', tags: ['remove'], timeLimit: 90 },
    { id: 'avg-q10', text: 'Average of first 20 natural numbers?', options: ['10', '10.5', '11', '11.5'], answer: 1, explanation: 'Avg of first n naturals = (n+1)/2 = 21/2 = 10.5.', hint: 'Formula (n+1)/2.', difficulty: 'easy', tags: ['series'], timeLimit: 45 },
    { id: 'avg-q11', text: 'A train covers 120 km at 60 km/h and another 120 km at 80 km/h. Average speed?', options: ['68.57 km/h', '70 km/h', '72 km/h', '75 km/h'], answer: 0, explanation: 'Equal distance: 2×60×80/(60+80)=9600/140=68.57 km/h.', hint: 'Harmonic mean again.', difficulty: 'medium', tags: ['avg-speed'], timeLimit: 75 },
    { id: 'avg-q12', text: 'The average of 3 numbers is 20. Two of them are 15 and 25. What is the third?', options: ['20', '22', '25', '30'], answer: 0, explanation: 'Sum = 3×20=60. Third = 60−15−25 = 20.', hint: 'Third = total − known two.', difficulty: 'easy', tags: ['basic'], timeLimit: 45 },
  ],

  aiTutorPrompt: 'You are helping an engineering student master Averages for campus placement quant sections (TCS, Infosys, Accenture). Emphasize the sum = n×average inversion, combined averages, and average-speed traps. Use short numeric examples.',
};
