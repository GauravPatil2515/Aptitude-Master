/**
 * data/sql/subqueries.js — SQL Subqueries & CTEs Chapter
 */
export default {
  id: 'sql-subqueries',
  subject: 'sql',
  title: 'Subqueries & CTEs',
  
  difficulty: 'hard',
  estimatedTime: 65,
  prerequisites: ['joins', 'aggregation'],

  notes: `
## What is a Subquery?

A query nested inside another query. Can appear in SELECT, FROM, WHERE, or HAVING.

---

## Types of Subqueries

### Scalar Subquery
Returns a single value (one row, one column).
\`\`\`
SELECT name, salary,
       (SELECT AVG(salary) FROM employees) AS avg_salary
FROM employees;
\`\`\`

### Row Subquery
Returns a single row with multiple columns.
\`\`\`
SELECT * FROM employees
WHERE (dept_id, salary) = (SELECT dept_id, MAX(salary) FROM employees GROUP BY dept_id LIMIT 1);
\`\`\`

### Table Subquery
Returns a table (multiple rows). Used in FROM clause.
\`\`\`
SELECT dept_name, avg_sal
FROM (SELECT dept_id, AVG(salary) AS avg_sal
      FROM employees GROUP BY dept_id) AS dept_avg
JOIN departments d ON dept_avg.dept_id = d.id;
\`\`\`

---

## Correlated Subquery

The inner query depends on the outer query (runs once per row of outer query).

\`\`\`
SELECT e.name, e.salary
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);
\`\`\`

> This finds employees earning above their department average.

---

## EXISTS vs IN

| Operator | Description |
|----------|-------------|
| IN | Checks if value is in a list/set |
| EXISTS | Checks if subquery returns any rows (often faster) |

\`\`\`
-- Using IN
SELECT * FROM employees WHERE dept_id IN (SELECT id FROM departments WHERE location = 'Delhi');

-- Using EXISTS (usually faster for large datasets)
SELECT * FROM employees e
WHERE EXISTS (SELECT 1 FROM departments d WHERE d.id = e.dept_id AND d.location = 'Delhi');
\`\`\`

> EXISTS stops at first match; IN builds the full list first.

---

## CTEs (Common Table Expressions)

Temporary named result set. Makes complex queries readable.

\`\`\`
WITH dept_avg AS (
    SELECT dept_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY dept_id
)
SELECT e.name, e.salary, d.avg_sal
FROM employees e
JOIN dept_avg d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_sal;
\`\`\`

**Multiple CTEs:**
\`\`\`
WITH
    dept_avg AS (SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id),
    high_dept AS (SELECT dept_id FROM dept_avg WHERE avg_sal > 50000)
SELECT e.name FROM employees e
JOIN high_dept h ON e.dept_id = h.dept_id;
\`\`\`

---

## Recursive CTE

CTE that references itself. Used for hierarchical data (org charts, trees).

\`\`\`
WITH RECURSIVE org_chart AS (
    -- Base case: top-level managers
    SELECT id, name, manager_id, 1 AS level
    FROM employees WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees reporting to someone in the CTE
    SELECT e.id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, name;
\`\`\`
  `,

  formulas: [
    { name: 'Scalar subquery',    formula: 'Returns single value (1 row, 1 col)',       example: '(SELECT AVG(sal) FROM emp)' },
    { name: 'Correlated',         formula: 'Inner query references outer query',        example: 'WHERE sal > (SELECT AVG(sal) FROM emp WHERE dept=e.dept)' },
    { name: 'EXISTS',             formula: 'TRUE if subquery returns any rows',         example: 'EXISTS (SELECT 1 FROM ... WHERE ...)' },
    { name: 'CTE',                formula: 'WITH name AS (query) SELECT ...',           example: 'WITH cte AS (SELECT ...) SELECT * FROM cte' },
    { name: 'Recursive CTE',      formula: 'Base case UNION ALL recursive case',        example: 'WITH RECURSIVE cte AS (... UNION ALL ...)' },
  ],

  shortcuts: [
    'EXISTS is often faster than IN for large datasets (stops at first match)',
    'Correlated subquery runs once per row of outer query',
    'CTE = named temporary result set; makes complex queries readable',
    'Recursive CTE needs: base case + UNION ALL + recursive case',
    'Subquery in FROM = derived table; must have an alias',
  ],

  questions: [
    {
      id: 'sql-s-q1',
      text: 'A scalar subquery returns:',
      options: ['Multiple rows', 'A single value', 'A table', 'No rows'],
      answer: 1,
      explanation: 'A scalar subquery returns exactly one row with one column (a single value).',
      hint: 'What does "scalar" mean?',
      difficulty: 'easy',
      tags: ['subquery'],
      timeLimit: 30,
    },
    {
      id: 'sql-s-q2',
      text: 'Which is generally faster for checking existence?',
      options: ['IN', 'EXISTS', 'JOIN', 'Same speed'],
      answer: 1,
      explanation: 'EXISTS stops as soon as it finds a match. IN builds the full result set first. EXISTS is usually faster.',
      hint: 'Which one can stop early?',
      difficulty: 'medium',
      tags: ['exists'],
      timeLimit: 45,
    },
    {
      id: 'sql-s-q3',
      text: 'What does a CTE stand for?',
      options: ['Common Table Expression', 'Combined Table Extract', 'Conditional Table Entry', 'Complex Table Evaluation'],
      answer: 0,
      explanation: 'CTE = Common Table Expression. It creates a temporary named result set for use in a query.',
      hint: 'What is the "C" in CTE?',
      difficulty: 'easy',
      tags: ['cte'],
      timeLimit: 20,
    },
    {
      id: 'sql-s-q4',
      text: 'A correlated subquery is one where:',
      options: ['It runs independently', 'The inner query references the outer query', 'It uses CORRELATE keyword', 'It returns multiple columns'],
      answer: 1,
      explanation: 'In a correlated subquery, the inner query references a column from the outer query, so it executes once per row of the outer query.',
      hint: 'How does the inner query relate to the outer query?',
      difficulty: 'medium',
      tags: ['correlated'],
      timeLimit: 45,
    },
    {
      id: 'sql-s-q5',
      text: 'A recursive CTE requires:',
      options: ['Only a base case', 'Base case + UNION ALL + recursive case', 'Only UNION', 'GROUP BY clause'],
      answer: 1,
      explanation: 'A recursive CTE needs: a starting query (base case), UNION ALL, and a recursive part that references the CTE itself.',
      hint: 'What are the 3 parts of a recursive CTE?',
      difficulty: 'medium',
      tags: ['recursive-cte'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand SQL Subqueries and CTEs for placement exams. Focus on scalar/correlated subqueries, EXISTS vs IN, CTE syntax, and recursive CTEs. Keep answers concise with query examples.',
};
