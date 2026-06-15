/**
 * data/core-cs/dbms.js — DBMS Chapter
 */
export default {
  id: 'core-cs-dbms',
  subject: 'core-cs',
  title: 'DBMS',
  icon: '🗄️',
  difficulty: 'medium',
  estimatedTime: 80,
  prerequisites: [],

  notes: `
## What is DBMS?

A Database Management System (DBMS) is software that manages data storage, retrieval, and integrity. It provides an interface between users and databases.

**DBMS vs File System:** No redundancy, concurrent access, data independence, ACID properties

---

## ER Model

- **Entity:** Real-world object (Student, Course)
- **Attribute:** Property of entity (Name, Roll No.)
- **Relationship:** Association between entities (enrolls, teaches)
- **Cardinality:** 1:1, 1:N, M:N

---

## Relational Model

**Table = Relation, Row = Tuple, Column = Attribute**

**Keys:**
- **Super Key:** Uniquely identifies a tuple
- **Candidate Key:** Minimal super key
- **Primary Key:** Chosen candidate key (unique, not null)
- **Foreign Key:** References primary key of another table
- **Alternate Key:** Candidate keys not chosen as primary

---

## Normalization

**Goal:** Reduce redundancy and anomalies.

| Normal Form | Condition |
|-------------|-----------|
| 1NF | No repeating groups, atomic values |
| 2NF | 1NF + no partial dependency |
| 3NF | 2NF + no transitive dependency |
| BCNF | Every determinant is a candidate key |

> 💡 A table in 3NF is usually in BCNF, but not always.

**Decomposition:** Splitting tables to achieve higher normal forms while preserving dependencies and ensuring lossless join.

---

## SQL Basics

\`\`\`sql
SELECT columns FROM table WHERE condition;
INSERT INTO table VALUES (val1, val2);
UPDATE table SET col=val WHERE condition;
DELETE FROM table WHERE condition;
\`\`\`

**Aggregate functions:** COUNT, SUM, AVG, MAX, MIN
**GROUP BY:** Groups rows with same values
**HAVING:** Filters groups (like WHERE for aggregates)

---

## SQL Joins

| Join | Description |
|------|-------------|
| INNER JOIN | Only matching rows from both tables |
| LEFT JOIN | All left rows + matched right (NULL if no match) |
| RIGHT JOIN | All right rows + matched left |
| FULL OUTER JOIN | All rows from both tables |
| CROSS JOIN | Cartesian product |
| SELF JOIN | Table joined with itself |

> 💡 LEFT JOIN + WHERE right.key IS NULL = rows in A but not in B

---

## Transactions & ACID

**ACID Properties:**
- **Atomicity:** All or nothing (rollback on failure)
- **Consistency:** Valid state to valid state
- **Isolation:** Concurrent transactions don't interfere
- **Durability:** Committed data survives failures

**Schedules:**
- **Serial:** Transactions execute one after another
- **Serializable:** Equivalent to some serial schedule
- **Conflict Serializable:** Can be transformed to serial by swapping non-conflicting operations

---

## Indexing

**Index:** Data structure for faster lookups (like book index).

- **Primary Index:** On ordered primary key
- **Secondary Index:** On non-key attributes
- **Clustered:** Data physically ordered by index (one per table)
- **Non-Clustered:** Separate structure pointing to data

**B+ Tree:** Most common index structure. Balanced tree, all data at leaf level.
  `,

  formulas: [
    { name: 'Candidate Keys',     formula: 'Minimal super keys (no subset is a super key)', example: 'AB, AC are candidate keys' },
    { name: 'Cartesian Product',  formula: '|A| × |B| rows',                             example: '5 rows × 3 rows = 15 rows' },
    { name: 'Left Join extras',   formula: 'LEFT JOIN WHERE right IS NULL',              example: 'A − B rows' },
    { name: 'B+ Tree order',      formula: 'Max children = order m',                     example: 'm=5 → max 5 children' },
    { name: 'Transactions',       formula: '2^n possible schedules (n transactions)',    example: '3 txns → 8 schedules' },
  ],

  shortcuts: [
    '3NF = no partial dependency + no transitive dependency',
    'LEFT JOIN + WHERE right IS NULL = "in A but not in B"',
    'BCNF: Every determinant must be a candidate key',
    'INNER JOIN = only matching rows; LEFT JOIN = all left + matching',
    'HAVING filters groups; WHERE filters rows',
    'One clustered index per table; multiple non-clustered allowed',
  ],

  questions: [
    {
      id: 'dbms-q1',
      text: 'Which normal form eliminates transitive dependency?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      answer: 2,
      explanation: '3NF eliminates transitive dependency. A → B → C (C transitively depends on A) is removed in 3NF.',
      hint: 'What does 3NF add beyond 2NF?',
      difficulty: 'easy',
      tags: ['normalization'],
      timeLimit: 30,
    },
    {
      id: 'dbms-q2',
      text: 'Which join returns only matching rows from both tables?',
      options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL OUTER JOIN'],
      answer: 2,
      explanation: 'INNER JOIN returns only rows that have matching values in both tables.',
      hint: 'Which join is the most restrictive?',
      difficulty: 'easy',
      tags: ['joins'],
      timeLimit: 30,
    },
    {
      id: 'dbms-q3',
      text: 'Which property of ACID ensures "all or nothing"?',
      options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
      answer: 0,
      explanation: 'Atomicity ensures that either all operations of a transaction are completed, or none are (rollback).',
      hint: 'Which property means the transaction is indivisible?',
      difficulty: 'easy',
      tags: ['acid'],
      timeLimit: 30,
    },
    {
      id: 'dbms-q4',
      text: 'What is the result of a CROSS JOIN between tables with 4 and 5 rows?',
      options: ['9 rows', '20 rows', '1 row', '0 rows'],
      answer: 1,
      explanation: 'CROSS JOIN produces the Cartesian product: 4 × 5 = 20 rows.',
      hint: 'Cartesian product = multiply the row counts',
      difficulty: 'easy',
      tags: ['cross-join'],
      timeLimit: 30,
    },
    {
      id: 'dbms-q5',
      text: 'In a LEFT JOIN, if there is no match in the right table, what value appears?',
      options: ['0', 'Empty string', 'NULL', 'Error'],
      answer: 2,
      explanation: 'LEFT JOIN fills non-matching right table columns with NULL.',
      hint: 'What does SQL use for no value?',
      difficulty: 'easy',
      tags: ['left-join'],
      timeLimit: 30,
    },
    {
      id: 'dbms-q6',
      text: 'Which SQL clause is used to filter groups?',
      options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
      answer: 1,
      explanation: 'HAVING filters groups (used with GROUP BY and aggregates). WHERE filters individual rows.',
      hint: 'Which clause works with GROUP BY and aggregate functions?',
      difficulty: 'easy',
      tags: ['sql', 'having'],
      timeLimit: 30,
    },
    {
      id: 'dbms-q7',
      text: 'How many clustered indexes can a table have?',
      options: ['Zero', 'One', 'Two', 'Unlimited'],
      answer: 1,
      explanation: 'A table can have only ONE clustered index because data can be physically sorted in only one way.',
      hint: 'How many ways can data be physically ordered?',
      difficulty: 'medium',
      tags: ['indexing'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand DBMS for placement exams. Focus on normalization (1NF-BCNF), SQL joins, ACID properties, and indexing. Keep answers concise with examples and common exam questions.',
};
