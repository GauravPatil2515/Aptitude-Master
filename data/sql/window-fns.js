/**
 * data/sql/window-fns.js — SQL Window Functions Chapter
 */
export default {
  id: 'sql-window-fns',
  subject: 'sql',
  title: 'Window Functions',
  icon: '🪟',
  difficulty: 'hard',
  estimatedTime: 70,
  prerequisites: ['aggregation', 'subqueries'],

  notes: `
## What are Window Functions?

Window functions perform calculations across a set of rows related to the current row (a "window"). Unlike GROUP BY, they don't collapse rows.

**Syntax:**
\`\`\`
function_name() OVER (PARTITION BY col ORDER BY col ROWS/RANGE frame)
\`\`\`

---

## Ranking Functions

### ROW_NUMBER()
Unique sequential number for each row within partition.
\`\`\`
SELECT name, department, salary,
       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num
FROM employees;
\`\`\`

### RANK()
Same rank for ties, next rank skips. (1, 1, 3, 4)

### DENSE_RANK()
Same rank for ties, next rank doesn't skip. (1, 1, 2, 3)

### NTILE(n)
Divides rows into n roughly equal groups.
\`\`\`
SELECT name, salary,
       NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM employees;
\`\`\`

> 💡 **ROW_NUMBER vs RANK vs DENSE_RANK:** For values 100, 100, 90 → ROW_NUMBER: 1,2,3 | RANK: 1,1,3 | DENSE_RANK: 1,1,2

---

## Aggregate Window Functions

Same as regular aggregates but with OVER clause.

\`\`\`
SELECT name, department, salary,
       SUM(salary) OVER (PARTITION BY department) AS dept_total,
       AVG(salary) OVER (PARTITION BY department) AS dept_avg,
       COUNT(*) OVER (PARTITION BY department) AS dept_count
FROM employees;
\`\`\`

### Running Total
\`\`\`
SELECT date, amount,
       SUM(amount) OVER (ORDER BY date) AS running_total
FROM sales;
\`\`\`

### Moving Average
\`\`\`
SELECT date, amount,
       AVG(amount) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3day
FROM sales;
\`\`\`

---

## Value Functions

### LAG(col, n, default)
Accesses data from a previous row.
\`\`\`
SELECT month, revenue,
       LAG(revenue, 1) OVER (ORDER BY month) AS prev_month_revenue
FROM monthly_sales;
\`\`\`

### LEAD(col, n, default)
Accesses data from a next row.

### FIRST_VALUE(col)
First value in the window frame.

### LAST_VALUE(col)
Last value in the window frame.

---

## Common Patterns

**Top N per group:**
\`\`\`
SELECT * FROM (
    SELECT name, department, salary,
           ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
) ranked WHERE rn <= 3;
\`\`\`

**Year-over-Year growth:**
\`\`\`
SELECT year, revenue,
       LAG(revenue) OVER (ORDER BY year) AS prev_revenue,
       (revenue - LAG(revenue) OVER (ORDER BY year)) * 100.0 / LAG(revenue) OVER (ORDER BY year) AS yoy_growth
FROM annual_sales;
\`\`\`

**Percent of total:**
\`\`\`
SELECT department, salary,
       salary * 100.0 / SUM(salary) OVER () AS pct_of_total
FROM employees;
\`\`\`
  `,

  formulas: [
    { name: 'ROW_NUMBER',     formula: 'ROW_NUMBER() OVER (PARTITION BY col ORDER BY col)',  example: 'Unique: 1,2,3,4' },
    { name: 'RANK',           formula: 'RANK() OVER (ORDER BY col)',                         example: 'Ties skip: 1,1,3' },
    { name: 'DENSE_RANK',     formula: 'DENSE_RANK() OVER (ORDER BY col)',                   example: 'Ties no skip: 1,1,2' },
    { name: 'LAG',            formula: 'LAG(col, offset, default) OVER (ORDER BY col)',      example: 'Previous row value' },
    { name: 'Running total',  formula: 'SUM(col) OVER (ORDER BY col)',                       example: 'Cumulative sum' },
  ],

  shortcuts: [
    'ROW_NUMBER = always unique. RANK = ties skip next. DENSE_RANK = ties don\'t skip',
    'Window functions don\'t collapse rows (unlike GROUP BY)',
    'LAG = look back, LEAD = look forward',
    'PARTITION BY = group, ORDER BY = sort within group',
    'Top N per group: ROW_NUMBER in subquery, filter WHERE rn <= N',
  ],

  questions: [
    {
      id: 'sql-w-q1',
      text: 'What does ROW_NUMBER() return for salaries 50000, 50000, 40000?',
      options: ['1, 1, 2', '1, 2, 3', '1, 1, 3', '1, 2, 2'],
      answer: 1,
      explanation: 'ROW_NUMBER always assigns unique sequential numbers: 1, 2, 3 regardless of ties.',
      hint: 'Does ROW_NUMBER handle ties?',
      difficulty: 'easy',
      tags: ['row-number'],
      timeLimit: 30,
    },
    {
      id: 'sql-w-q2',
      text: 'What does RANK() return for values 100, 100, 90?',
      options: ['1, 2, 3', '1, 1, 2', '1, 1, 3', '1, 2, 2'],
      answer: 2,
      explanation: 'RANK gives same rank to ties and skips the next rank: 1, 1, 3 (skips 2).',
      hint: 'What happens to the next rank after a tie?',
      difficulty: 'easy',
      tags: ['rank'],
      timeLimit: 30,
    },
    {
      id: 'sql-w-q3',
      text: 'LAG(column, 1) accesses data from:',
      options: ['Next row', 'Previous row', 'First row', 'Last row'],
      answer: 1,
      explanation: 'LAG accesses data from a previous row. LEAD accesses data from a next row.',
      hint: 'LAG = look back, LEAD = look forward',
      difficulty: 'easy',
      tags: ['lag'],
      timeLimit: 30,
    },
    {
      id: 'sql-w-q4',
      text: 'How do you find the top 3 earners per department?',
      options: ['GROUP BY + LIMIT 3', 'ROW_NUMBER in subquery WHERE rn <= 3', 'ORDER BY + LIMIT 3', 'HAVING COUNT(*) <= 3'],
      answer: 1,
      explanation: 'Use ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) in a subquery, then filter WHERE rn <= 3.',
      hint: 'Which window function gives unique row numbers within each group?',
      difficulty: 'medium',
      tags: ['top-n'],
      timeLimit: 60,
    },
    {
      id: 'sql-w-q5',
      text: 'What is the key difference between GROUP BY and window functions?',
      options: ['Window functions are faster', 'GROUP BY collapses rows; window functions keep all rows', 'Window functions can\'t use aggregates', 'No difference'],
      answer: 1,
      explanation: 'GROUP BY collapses rows into groups. Window functions perform calculations across rows but keep all individual rows in the result.',
      hint: 'What happens to the number of rows?',
      difficulty: 'medium',
      tags: ['window-vs-group'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand SQL Window Functions for placement exams. Focus on ROW_NUMBER vs RANK vs DENSE_RANK, LAG/LEAD, running totals, moving averages, and the top-N-per-group pattern. Keep answers concise with query examples.',
};
