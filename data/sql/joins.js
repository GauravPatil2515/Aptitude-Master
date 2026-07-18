/**
 * data/sql/joins.js — SQL JOINs Chapter
 */
export default {
  id: 'sql-joins',
  subject: 'sql',
  title: 'JOINs',
  
  difficulty: 'medium',
  estimatedTime: 55,
  prerequisites: ['basics'],

  notes: `
## What is a JOIN?

JOINs combine rows from two or more tables based on a related column.

**Example tables:**
- employees: id, name, dept_id
- departments: id, dept_name

---

## Types of JOINs

### INNER JOIN
Returns only matching rows from both tables.
\`\`\`
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;
\`\`\`

### LEFT JOIN (LEFT OUTER JOIN)
Returns ALL rows from left table + matched rows from right. NULL if no match.
\`\`\`
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;
\`\`\`

### RIGHT JOIN
Returns ALL rows from right table + matched rows from left. NULL if no match.

### FULL OUTER JOIN
Returns ALL rows from both tables. NULL where no match.

### CROSS JOIN
Returns Cartesian product (every combination). M × N rows.

### SELF JOIN
Table joined with itself.
\`\`\`
SELECT e1.name AS employee, e2.name AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;
\`\`\`

---

## JOIN Tricks

**Find rows in A but not in B:**
\`\`\`
SELECT * FROM A LEFT JOIN B ON A.id = B.id WHERE B.id IS NULL;
\`\`\`

**Find rows in B but not in A:**
\`\`\`
SELECT * FROM A RIGHT JOIN B ON A.id = B.id WHERE A.id IS NULL;
\`\`\`

**Find rows in A or B but not both (symmetric difference):**
\`\`\`
(SELECT * FROM A LEFT JOIN B ON A.id=B.id WHERE B.id IS NULL)
UNION
(SELECT * FROM B LEFT JOIN A ON A.id=B.id WHERE A.id IS NULL);
\`\`\`

---

## UNION vs UNION ALL

| Operation | Description |
|-----------|-------------|
| UNION | Combines results, removes duplicates |
| UNION ALL | Combines results, keeps duplicates (faster) |

> Both require same number of columns with compatible types.

---

## ON vs WHERE in JOINs

- **ON:** Specifies how tables are related (join condition)
- **WHERE:** Filters the result after the join

For INNER JOIN, putting condition in ON or WHERE gives same result.
For LEFT JOIN, it matters — WHERE filters after join (may remove NULL rows).
  `,

  formulas: [
    { name: 'INNER JOIN',     formula: 'Only matching rows from both tables',           example: 'A ∩ B' },
    { name: 'LEFT JOIN',      formula: 'All A + matched B (NULL if no match)',          example: 'A + (A∩B complement)' },
    { name: 'A not in B',     formula: 'LEFT JOIN WHERE B.id IS NULL',                  example: 'A − B' },
    { name: 'CROSS JOIN',     formula: 'M × N rows (Cartesian product)',                example: '5 × 3 = 15 rows' },
    { name: 'UNION',          formula: 'Combines, removes duplicates',                  example: 'A ∪ B (distinct)' },
  ],

  shortcuts: [
    'INNER JOIN = only matches. LEFT JOIN = all left + matches',
    'LEFT JOIN + WHERE right IS NULL = "in A but not in B"',
    'CROSS JOIN = Cartesian product = M×N rows',
    'UNION ALL is faster than UNION (no duplicate removal)',
    'Self join: use aliases (e1, e2) to treat one table as two',
  ],

  questions: [
    {
      id: 'sql-j-q1',
      text: 'Which JOIN returns only matching rows from both tables?',
      options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL OUTER JOIN'],
      answer: 2,
      explanation: 'INNER JOIN returns only rows that have matching values in both tables.',
      hint: 'Which JOIN is the most restrictive?',
      difficulty: 'easy',
      tags: ['inner-join'],
      timeLimit: 30,
    },
    {
      id: 'sql-j-q2',
      text: 'A table has 5 rows, another has 3 rows. How many rows does a CROSS JOIN produce?',
      options: ['8', '15', '5', '3'],
      answer: 1,
      explanation: 'CROSS JOIN produces the Cartesian product: 5 × 3 = 15 rows.',
      hint: 'Multiply the row counts',
      difficulty: 'easy',
      tags: ['cross-join'],
      timeLimit: 30,
    },
    {
      id: 'sql-j-q3',
      text: 'How do you find rows that exist in table A but not in table B?',
      options: ['INNER JOIN', 'LEFT JOIN WHERE B.id IS NULL', 'RIGHT JOIN', 'FULL OUTER JOIN'],
      answer: 1,
      explanation: 'LEFT JOIN keeps all rows from A. Adding WHERE B.id IS NULL filters to only rows with no match in B.',
      hint: 'Which JOIN keeps all of A, and how do you filter out matches?',
      difficulty: 'medium',
      tags: ['left-join', 'null-check'],
      timeLimit: 45,
    },
    {
      id: 'sql-j-q4',
      text: 'What is the difference between UNION and UNION ALL?',
      options: ['UNION is faster', 'UNION ALL removes duplicates', 'UNION removes duplicates', 'No difference'],
      answer: 2,
      explanation: 'UNION removes duplicate rows. UNION ALL keeps all rows including duplicates (and is faster).',
      hint: 'Which one does extra work to remove duplicates?',
      difficulty: 'easy',
      tags: ['union'],
      timeLimit: 30,
    },
    {
      id: 'sql-j-q5',
      text: 'A SELF JOIN is used when:',
      options: ['Joining two different tables', 'A table needs to be joined with itself', 'Joining more than 2 tables', 'No join condition is needed'],
      answer: 1,
      explanation: 'A SELF JOIN joins a table with itself using aliases (e.g., finding employee-manager relationships).',
      hint: 'What if you need to compare rows within the same table?',
      difficulty: 'easy',
      tags: ['self-join'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand SQL JOINs for placement exams. Focus on INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF joins. Cover the "A not in B" pattern, UNION vs UNION ALL, and ON vs WHERE. Keep answers concise with query examples.',
};
