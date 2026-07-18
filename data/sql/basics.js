/**
 * data/sql/basics.js — SQL Basics Chapter
 */
export default {
  id: 'sql-basics',
  subject: 'sql',
  title: 'SQL Basics',
  
  difficulty: 'easy',
  estimatedTime: 40,
  prerequisites: [],

  notes: `
## What is SQL?

SQL (Structured Query Language) is used to communicate with databases. It allows you to create, read, update, and delete data.

---

## Basic Commands

**DDL (Data Definition Language):**
- CREATE — Create tables/databases
- ALTER — Modify table structure
- DROP — Delete table/database
- TRUNCATE — Remove all rows from table

**DML (Data Manipulation Language):**
- SELECT — Query data
- INSERT — Add new rows
- UPDATE — Modify existing rows
- DELETE — Remove rows

**DCL (Data Control Language):**
- GRANT — Give permissions
- REVOKE — Remove permissions

---

## SELECT Statement

\`\`\`
SELECT column1, column2 FROM table_name WHERE condition;
SELECT * FROM table_name;  -- all columns
\`\`\`

**DISTINCT:** Remove duplicates
\`\`\`
SELECT DISTINCT city FROM customers;
\`\`\`

**ORDER BY:** Sort results
\`\`\`
SELECT * FROM employees ORDER BY salary DESC;
\`\`\`

**LIMIT:** Restrict number of results
\`\`\`
SELECT * FROM products LIMIT 10;
\`\`\`

---

## WHERE Clause — Operators

| Operator | Meaning |
|----------|---------|
| = | Equal |
| != or <> | Not equal |
| >, <, >=, <= | Comparison |
| BETWEEN | Range (inclusive) |
| IN | Match any in list |
| LIKE | Pattern matching (% = any chars, _ = one char) |
| IS NULL | Check for NULL |
| AND, OR, NOT | Logical operators |

> \`WHERE name LIKE 'A%'\` finds names starting with A

---

## INSERT, UPDATE, DELETE

\`\`\`
INSERT INTO students (name, age) VALUES ('Ravi', 20);
UPDATE students SET age = 21 WHERE name = 'Ravi';
DELETE FROM students WHERE age < 18;
\`\`\`

---

## Aggregate Functions

| Function | Description |
|----------|-------------|
| COUNT() | Number of rows |
| SUM() | Total of values |
| AVG() | Average value |
| MAX() | Maximum value |
| MIN() | Minimum value |

\`\`\`
SELECT COUNT(*), AVG(salary), MAX(salary) FROM employees;
\`\`\`

---

## GROUP BY & HAVING

**GROUP BY:** Groups rows with same values
**HAVING:** Filters groups (like WHERE for aggregates)

\`\`\`
SELECT department, COUNT(*), AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
\`\`\`

> **Execution order:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
  `,

  formulas: [
    { name: 'SELECT',       formula: 'SELECT cols FROM table WHERE condition',    example: 'SELECT name FROM emp WHERE sal > 5000' },
    { name: 'GROUP BY',     formula: 'GROUP BY col + aggregate',                  example: 'SELECT dept, COUNT(*) FROM emp GROUP BY dept' },
    { name: 'HAVING',       formula: 'HAVING condition on aggregate',             example: 'HAVING AVG(sal) > 5000' },
    { name: 'ORDER BY',     formula: 'ORDER BY col ASC|DESC',                    example: 'ORDER BY salary DESC' },
    { name: 'LIKE',         formula: '% = any chars, _ = one char',              example: 'LIKE "A%" = starts with A' },
  ],

  shortcuts: [
    'SQL execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
    'HAVING filters groups; WHERE filters rows',
    'LIKE "%abc%" contains, "abc%" starts with, "%abc" ends with',
    'COUNT(*) counts all rows; COUNT(col) counts non-NULL values',
    'DISTINCT removes duplicate rows from result',
  ],

  questions: [
    {
      id: 'sql-b-q1',
      text: 'Which SQL command is used to retrieve data?',
      options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
      answer: 1,
      explanation: 'SELECT is the SQL command used to query/retrieve data from a database.',
      hint: 'Which command starts every query?',
      difficulty: 'easy',
      tags: ['basic'],
      timeLimit: 20,
    },
    {
      id: 'sql-b-q2',
      text: 'Which clause is used to filter rows before grouping?',
      options: ['HAVING', 'WHERE', 'GROUP BY', 'FILTER'],
      answer: 1,
      explanation: 'WHERE filters individual rows before any grouping. HAVING filters groups after GROUP BY.',
      hint: 'Which clause comes before GROUP BY?',
      difficulty: 'easy',
      tags: ['where'],
      timeLimit: 30,
    },
    {
      id: 'sql-b-q3',
      text: 'What does SELECT DISTINCT do?',
      options: ['Sorts results', 'Removes duplicate rows', 'Filters NULLs', 'Limits rows'],
      answer: 1,
      explanation: 'DISTINCT removes duplicate rows from the result set.',
      hint: 'What does "distinct" mean?',
      difficulty: 'easy',
      tags: ['distinct'],
      timeLimit: 20,
    },
    {
      id: 'sql-b-q4',
      text: 'Which operator is used for pattern matching in SQL?',
      options: ['MATCH', 'FIND', 'LIKE', 'REGEX'],
      answer: 2,
      explanation: 'LIKE is used for pattern matching with % (any characters) and _ (single character).',
      hint: 'Which operator uses % and _ wildcards?',
      difficulty: 'easy',
      tags: ['like'],
      timeLimit: 30,
    },
    {
      id: 'sql-b-q5',
      text: 'What is the correct order of SQL clause execution?',
      options: ['SELECT → FROM → WHERE → GROUP BY', 'FROM → WHERE → GROUP BY → SELECT', 'FROM → SELECT → WHERE → GROUP BY', 'WHERE → FROM → GROUP BY → SELECT'],
      answer: 1,
      explanation: 'Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT',
      hint: 'Which clause is processed first — the table or the selection?',
      difficulty: 'medium',
      tags: ['execution-order'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student learn SQL basics for placement exams. Focus on SELECT, WHERE, GROUP BY, HAVING, ORDER BY, aggregate functions, and the SQL execution order. Keep answers concise with query examples.',
};
