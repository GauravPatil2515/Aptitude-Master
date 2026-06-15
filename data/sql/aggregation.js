/**
 * data/sql/aggregation.js — SQL Aggregation & GROUP BY Chapter
 */
export default {
  id: 'sql-aggregation',
  subject: 'sql',
  title: 'Aggregation & GROUP BY',
  icon: '📊',
  difficulty: 'medium',
  estimatedTime: 50,
  prerequisites: ['basics'],

  notes: `
## Aggregate Functions

Functions that operate on a set of values and return a single value.

| Function | Description | Example |
|----------|-------------|---------|
| COUNT(*) | Count all rows | COUNT(*) → 100 |
| COUNT(col) | Count non-NULL values | COUNT(email) → 95 |
| SUM(col) | Total of values | SUM(salary) → 500000 |
| AVG(col) | Average value | AVG(salary) → 50000 |
| MAX(col) | Maximum value | MAX(salary) → 150000 |
| MIN(col) | Minimum value | MIN(salary) → 25000 |

> 💡 COUNT(*) counts all rows including NULLs. COUNT(col) ignores NULLs in that column.

---

## GROUP BY

Groups rows that have the same values in specified columns. Used with aggregate functions.

\`\`\`
SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_sal
FROM employees
GROUP BY department;
\`\`\`

**Rules:**
- Every column in SELECT must either be in GROUP BY or in an aggregate function
- GROUP BY can have multiple columns

\`\`\`
SELECT department, city, COUNT(*)
FROM employees
GROUP BY department, city;
\`\`\`

---

## HAVING Clause

Filters groups (like WHERE but for aggregates). Comes after GROUP BY.

\`\`\`
SELECT department, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
\`\`\`

> 💡 **WHERE filters rows, HAVING filters groups.**

---

## Complete Query Order

\`\`\`
SELECT column, aggregate(column)    -- 5. Select columns
FROM table                         -- 1. From table
WHERE condition                    -- 2. Filter rows
GROUP BY column                    -- 3. Group rows
HAVING aggregate_condition         -- 4. Filter groups
ORDER BY column                    -- 6. Sort results
LIMIT n;                           -- 7. Limit results
\`\`\`

---

## Common Patterns

**Find duplicates:**
\`\`\`
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
\`\`\`

**Top N per group:**
\`\`\`
SELECT department, MAX(salary)
FROM employees
GROUP BY department;
\`\`\`

**Total and percentage:**
\`\`\`
SELECT department,
       COUNT(*) AS dept_count,
       COUNT(*) * 100.0 / (SELECT COUNT(*) FROM employees) AS percentage
FROM employees
GROUP BY department;
\`\`\`
  `,

  formulas: [
    { name: 'COUNT(*)',       formula: 'Counts all rows including NULLs',           example: '100 rows → COUNT(*) = 100' },
    { name: 'COUNT(col)',     formula: 'Counts non-NULL values only',               example: '5 NULLs → COUNT(col) = 95' },
    { name: 'AVG',            formula: 'SUM(col) / COUNT(col)',                     example: 'SUM=500K, COUNT=10 → AVG=50K' },
    { name: 'HAVING',         formula: 'HAVING aggregate_condition',                example: 'HAVING COUNT(*) > 5' },
    { name: 'Percentage',     formula: 'part * 100.0 / total',                      example: '25 * 100.0 / 100 = 25%' },
  ],

  shortcuts: [
    'COUNT(*) counts all rows; COUNT(col) skips NULLs',
    'WHERE filters rows BEFORE grouping; HAVING filters groups AFTER',
    'Every SELECT column must be in GROUP BY or an aggregate',
    'Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
    'Use HAVING COUNT(*) > 1 to find duplicates',
  ],

  questions: [
    {
      id: 'sql-a-q1',
      text: 'What is the difference between COUNT(*) and COUNT(column)?',
      options: ['No difference', 'COUNT(*) counts NULLs, COUNT(col) skips NULLs', 'COUNT(col) counts NULLs, COUNT(*) skips NULLs', 'COUNT(*) is faster'],
      answer: 1,
      explanation: 'COUNT(*) counts all rows including those with NULL values. COUNT(column) counts only non-NULL values in that column.',
      hint: 'How do they handle NULL values?',
      difficulty: 'easy',
      tags: ['count'],
      timeLimit: 30,
    },
    {
      id: 'sql-a-q2',
      text: 'Which clause filters groups in SQL?',
      options: ['WHERE', 'HAVING', 'FILTER', 'GROUP BY'],
      answer: 1,
      explanation: 'HAVING filters groups (used after GROUP BY with aggregate conditions). WHERE filters individual rows.',
      hint: 'Which clause works with aggregate functions on grouped data?',
      difficulty: 'easy',
      tags: ['having'],
      timeLimit: 30,
    },
    {
      id: 'sql-a-q3',
      text: 'Which query finds duplicate emails?',
      options: ['SELECT email FROM users WHERE email = email', 'SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1', 'SELECT DISTINCT email FROM users', 'SELECT email FROM users ORDER BY email'],
      answer: 1,
      explanation: 'GROUP BY email groups identical emails. HAVING COUNT(*) > 1 keeps only groups with more than 1 row (duplicates).',
      hint: 'How do you group and count to find duplicates?',
      difficulty: 'medium',
      tags: ['duplicates'],
      timeLimit: 45,
    },
    {
      id: 'sql-a-q4',
      text: 'What is the result of AVG(salary) if salaries are 10000, 20000, NULL, 30000?',
      options: ['20000', '15000', '25000', 'NULL'],
      answer: 0,
      explanation: 'AVG ignores NULL. (10000+20000+30000)/3 = 60000/3 = 20000',
      hint: 'AVG ignores NULL values — how many values are being averaged?',
      difficulty: 'easy',
      tags: ['avg', 'null'],
      timeLimit: 45,
    },
    {
      id: 'sql-a-q5',
      text: 'In a GROUP BY query, a column in SELECT must:',
      options: ['Always be in GROUP BY', 'Be in GROUP BY or an aggregate function', 'Always be an aggregate', 'Be a primary key'],
      answer: 1,
      explanation: 'Every column in SELECT must either appear in the GROUP BY clause or be used in an aggregate function.',
      hint: 'What are the two valid options for SELECT columns in a grouped query?',
      difficulty: 'medium',
      tags: ['group-by-rule'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand SQL Aggregation and GROUP BY for placement exams. Focus on aggregate functions (COUNT, SUM, AVG, MAX, MIN), GROUP BY rules, HAVING vs WHERE, and the SQL execution order. Keep answers concise with query examples.',
};
