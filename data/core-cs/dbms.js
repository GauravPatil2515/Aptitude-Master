/**
 * data/core-cs/dbms.js — DBMS Chapter
 */
export default {
  id: 'core-cs-dbms',
  subject: 'core-cs',
  title: 'DBMS',
  
  difficulty: 'medium',
  estimatedTime: 80,
  prerequisites: [],

  notes: `
## What is DBMS?

A Database Management System (DBMS) is software that manages data storage, retrieval, and integrity. It provides an interface between users and databases.

**DBMS vs File System:**
| Feature | File System | DBMS |
|---------|-------------|------|
| Redundancy | High (duplicate data) | Low (normalization) |
| Concurrency | No control | ACID transactions |
| Security | OS-level only | User roles, grants |
| Data Independence | None | Physical + Logical |
| Backup/Recovery | Manual | Automated |
| Integrity | Application-level | Constraints, triggers |

**DBMS Architecture:**
- **1-tier:** DBMS and app on same machine (local SQLite)
- **2-tier:** Client-Server (desktop app → database server)
- **3-tier:** Client → Application Server → Database Server (web apps)

---

## ER Model

- **Entity:** Real-world object (Student, Course)
  - **Strong Entity:** Has its own primary key
  - **Weak Entity:** Depends on another entity (no primary key of its own)
- **Attribute:** Property of entity (Name, Roll No.)
  - **Simple:** Cannot be divided (Age)
  - **Composite:** Can be divided (Full Name → First, Last)
  - **Derived:** Computed from others (Age from DOB)
  - **Multi-valued:** Multiple values (Phone numbers)
- **Relationship:** Association between entities (enrolls, teaches)
- **Cardinality:** 1:1, 1:N, M:N
- **Participation:** Total (every entity participates) vs Partial

> **Weak entity** is represented by a double rectangle in ER diagrams. It has a partial key (discriminator) and depends on a strong entity.

---

## Relational Model

**Table = Relation, Row = Tuple, Column = Attribute**

**Keys:**
- **Super Key:** Uniquely identifies a tuple (may have extra attributes)
- **Candidate Key:** Minimal super key (no proper subset is a super key)
- **Primary Key:** Chosen candidate key (unique, not null)
- **Foreign Key:** References primary key of another table (ensures referential integrity)
- **Alternate Key:** Candidate keys not chosen as primary
- **Composite Key:** Key made of 2+ attributes

**Finding Candidate Keys:** Given functional dependencies, compute closure of attribute sets. If closure = all attributes, it's a super key. Remove attributes to find minimal ones.

**Integrity Constraints:**
- **Domain Constraint:** Values must be from defined domain
- **Entity Integrity:** Primary key cannot be NULL
- **Referential Integrity:** Foreign key must match a primary key or be NULL

---

## Normalization

**Goal:** Reduce redundancy and anomalies (insert, update, delete anomalies).

| Normal Form | Condition | Eliminates |
|-------------|-----------|------------|
| 1NF | No repeating groups, atomic values | Repeating groups |
| 2NF | 1NF + no partial dependency (non-prime attribute fully depends on candidate key) | Partial dependency |
| 3NF | 2NF + no transitive dependency (no non-prime → non-prime) | Transitive dependency |
| BCNF | Every determinant is a candidate key | All FD-based anomalies |
| 4NF | BCNF + no multi-valued dependency | Multi-valued dependency |
| 5NF | 4NF + no join dependency | Join dependency |

> A table in 3NF is usually in BCNF, but not always. Example: R(A,B,C) with FD: AB→C, C→B is in 3NF but not BCNF (C→B where C is not a candidate key).

**Decomposition:** Splitting tables to achieve higher normal forms while preserving:
- **Lossless Join:** Original table can be recovered by natural join
- **Dependency Preservation:** All functional dependencies are preserved

**Anomalies:**
- **Insert Anomaly:** Can't insert data without other data
- **Update Anomaly:** Changing data in one row requires changes in many
- **Delete Anomaly:** Deleting data loses other important information

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
**ORDER BY:** Sorts results (ASC/DESC)
**DISTINCT:** Removes duplicates

**Execution Order:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY

**Subqueries:**
- **Scalar:** Returns single value
- **Row:** Returns single row
- **Table:** Returns multiple rows (use IN, EXISTS)
- **Correlated:** References outer query (executed for each row)

**Views:** Virtual tables based on SELECT queries. Can simplify complex queries and provide security.

---

## SQL Joins

| Join | Description | Result |
|------|-------------|--------|
| INNER JOIN | Only matching rows from both tables | A ∩ B |
| LEFT JOIN | All left rows + matched right (NULL if no match) | A |
| RIGHT JOIN | All right rows + matched left | B |
| FULL OUTER JOIN | All rows from both tables | A ∪ B |
| CROSS JOIN | Cartesian product | A × B |
| SELF JOIN | Table joined with itself | — |
| NATURAL JOIN | Joins on columns with same name | — |

> LEFT JOIN + WHERE right.key IS NULL = rows in A but not in B (A − B)
> RIGHT JOIN + WHERE left.key IS NULL = rows in B but not in A (B − A)

**Set Operations:**
- **UNION:** All rows from both (no duplicates)
- **UNION ALL:** All rows (with duplicates)
- **INTERSECTION:** Common rows
- **EXCEPT/MINUS:** Rows in first but not second

---

## Transactions & ACID

**ACID Properties:**
- **Atomicity:** All or nothing (rollback on failure) — managed by UNDO log
- **Consistency:** Valid state to valid state — enforced by constraints
- **Isolation:** Concurrent transactions don't interfere — managed by locking
- **Durability:** Committed data survives failures — managed by REDO log

**Transaction States:** Active → Partially Committed → Committed | Failed → Aborted → Terminated

**Schedules:**
- **Serial:** Transactions execute one after another (no interleaving)
- **Serializable:** Equivalent to some serial schedule (correct concurrent execution)
- **Conflict Serializable:** Can be transformed to serial by swapping non-conflicting operations
- **Recoverable:** If Tj reads from Ti, Ti commits before Tj
- **Cascadeless:** No transaction reads uncommitted data

**Concurrency Problems:**
- **Dirty Read:** Reading uncommitted data
- **Non-Repeatable Read:** Same query returns different results (row updated)
- **Phantom Read:** New rows appear between queries (row inserted)
- **Lost Update:** Two transactions overwrite each other

**Isolation Levels:**
| Level | Dirty Read | Non-Repeatable | Phantom |
|-------|------------|----------------|---------|
| Read Uncommitted | Yes | Yes | Yes |
| Read Committed | No | Yes | Yes |
| Repeatable Read | No | No | Yes |
| Serializable | No | No | No |

**Locking Protocols:**
- **Shared Lock (S):** For reading — multiple S locks allowed
- **Exclusive Lock (X):** For writing — only one X lock
- **2PL (Two-Phase Locking):** Growing phase (acquire locks) → Shrinking phase (release locks)
  - **Strict 2PL:** Release all locks only after commit/abort
  - **Rigorous 2PL:** Same as strict

---

## Indexing

**Index:** Data structure for faster lookups (like book index).

| Index Type | Description |
|------------|-------------|
| Primary Index | On ordered primary key (sparse — one entry per block) |
| Secondary Index | On non-key attributes (dense — one entry per record) |
| Clustered | Data physically ordered by index (one per table) |
| Non-Clustered | Separate structure pointing to data (multiple allowed) |
| Dense | Index entry for every search key value |
| Sparse | Index entry for some search key values |

**B+ Tree:** Most common index structure.
- Balanced tree (all leaves at same level)
- All data pointers at leaf level
- Leaves linked (efficient range queries)
- Order m: max m children, min ⌈m/2⌉ children
- Insertion may cause split; deletion may cause merge/redistribution

**Hash Index:** O(1) for equality queries, bad for range queries.
- **Static Hashing:** Fixed number of buckets
- **Extendible Hashing:** Dynamic — splits buckets as needed
- **Linear Hashing:** Splits in round-robin fashion

> **Clustered index** = data sorted physically. Only ONE per table. **Non-clustered** = separate pointer structure. Multiple allowed.

---

## Query Optimization

**Cost-based optimization:** Estimates cost of different execution plans.
- **Selection:** Use index if available (index scan vs full table scan)
- **Join:** Nested loop, sort-merge, hash join
- **Projection:** Remove unnecessary columns early

**Heuristic optimization:**
- Perform selection early (reduce rows)
- Perform projection early (reduce columns)
- Combine Cartesian product with subsequent selection into join
- Execute most restrictive operations first
  `,

  formulas: [
    { name: 'Candidate Keys',       formula: 'Minimal super keys (no subset is a super key)',              example: 'AB, AC are candidate keys' },
    { name: 'Cartesian Product',    formula: '|A| × |B| rows',                                       example: '5 rows × 3 rows = 15 rows' },
    { name: 'Left Join extras',     formula: 'LEFT JOIN WHERE right IS NULL → A − B',                  example: 'Rows in A but not in B' },
    { name: 'B+ Tree order',        formula: 'Max children = order m; Min = ⌈m/2⌉',                    example: 'm=5 → max 5 children, min 3' },
    { name: 'Transactions',         formula: '2^n possible schedules (n transactions)',                example: '3 txns → 8 schedules' },
    { name: 'B+ Tree height',       formula: 'h ≤ log⌈m/2⌉(n/2) + 1 (n = leaf nodes)',                example: 'm=5, n=100 → h ≤ 4' },
    { name: 'Hash table buckets',   formula: 'N records / (fill factor × bucket size)',               example: '1000/(0.7×4) = 358 buckets' },
    { name: 'Index selectivity',    formula: 'Number of distinct values / Total rows',                example: '50/1000 = 0.05 (highly selective)' },
    { name: 'Closure of X',         formula: 'X⁺ = X; repeat: if A⊆X⁺, add B for each A→B',          example: 'X={A}, A→B, B→C → X⁺={A,B,C}' },
    { name: 'Serial schedules',     formula: 'n! (n = number of transactions)',                       example: '3 txns → 6 serial schedules' },
    { name: 'Conflict serializable',formula: 'Check precedence graph for cycles',                      example: 'No cycles → conflict serializable' },
    { name: 'Lossless join test',   formula: 'R1∩R2 must be superkey of R1 or R2',                    example: 'If A is key of R1, decomposition is lossless' },
  ],

  shortcuts: [
    '3NF = no partial dependency + no transitive dependency',
    'LEFT JOIN + WHERE right IS NULL = "in A but not in B"',
    'BCNF: Every determinant must be a candidate key',
    'INNER JOIN = only matching rows; LEFT JOIN = all left + matching',
    'HAVING filters groups; WHERE filters rows',
    'One clustered index per table; multiple non-clustered allowed',
    'SQL execution order: FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY',
    'ACID: Atomicity (UNDO), Consistency (constraints), Isolation (locks), Durability (REDO)',
    '2PL: Growing phase (acquire) → Shrinking phase (release). Strict 2PL holds locks until commit.',
    'B+ tree: all data at leaves, leaves linked for range queries',
    'Dirty read = reading uncommitted data. Phantom = new rows appearing.',
    'Index scan better when selectivity < ~10-15%; otherwise full table scan',
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
    {
      id: 'dbms-q8',
      text: 'Which normal form eliminates partial dependency?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      answer: 1,
      explanation: '2NF eliminates partial dependency — every non-prime attribute must fully depend on the entire candidate key.',
      hint: 'What does 2NF add beyond 1NF?',
      difficulty: 'easy',
      tags: ['normalization'],
      timeLimit: 30,
    },
    {
      id: 'dbms-q9',
      text: 'A table R(A,B,C,D) has functional dependencies: A→B, B→C, AB→D. What is the candidate key?',
      options: ['A', 'AB', 'AC', 'AD'],
      answer: 0,
      explanation: 'A⁺ = A → B → C, and AB → D. Since A→B, A⁺ = ABCD. So A alone is a candidate key.',
      hint: 'Compute the closure of each option.',
      difficulty: 'medium',
      tags: ['keys', 'closure'],
      timeLimit: 75,
    },
    {
      id: 'dbms-q10',
      text: 'Which of the following is NOT an ACID property?',
      options: ['Atomicity', 'Consistency', 'Availability', 'Durability'],
      answer: 2,
      explanation: 'ACID = Atomicity, Consistency, Isolation, Durability. Availability is a CAP theorem concept, not ACID.',
      hint: 'Remember the ACID acronym.',
      difficulty: 'easy',
      tags: ['acid'],
      timeLimit: 30,
    },
    {
      id: 'dbms-q11',
      text: 'In SQL, what is the correct order of execution for: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY?',
      options: ['SELECT→FROM→WHERE→GROUP BY→HAVING→ORDER BY', 'FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY', 'FROM→SELECT→WHERE→GROUP BY→HAVING→ORDER BY', 'FROM→GROUP BY→WHERE→HAVING→SELECT→ORDER BY'],
      answer: 1,
      explanation: 'SQL executes: FROM (identify tables) → WHERE (filter rows) → GROUP BY (group) → HAVING (filter groups) → SELECT (project columns) → ORDER BY (sort).',
      hint: 'WHERE comes before SELECT in execution, even though SELECT is written first.',
      difficulty: 'medium',
      tags: ['sql', 'execution-order'],
      timeLimit: 60,
    },
    {
      id: 'dbms-q12',
      text: 'Which concurrency problem occurs when a transaction reads data written by an uncommitted transaction?',
      options: ['Non-Repeatable Read', 'Phantom Read', 'Dirty Read', 'Lost Update'],
      answer: 2,
      explanation: 'Dirty Read occurs when a transaction reads uncommitted data that may later be rolled back.',
      hint: 'What type of read involves uncommitted data?',
      difficulty: 'easy',
      tags: ['concurrency'],
      timeLimit: 45,
    },
    {
      id: 'dbms-q13',
      text: 'A B+ tree of order 5 can have a maximum of how many children per node?',
      options: ['4', '5', '6', '3'],
      answer: 1,
      explanation: 'The order of a B+ tree (m) is the maximum number of children. Order 5 means max 5 children per node.',
      hint: 'Order = maximum children.',
      difficulty: 'easy',
      tags: ['b-plus-tree'],
      timeLimit: 30,
    },
    {
      id: 'dbms-q14',
      text: 'Which of the following schedules is always conflict serializable?',
      options: ['Any serial schedule', 'Any concurrent schedule', 'Any schedule with 2PL', 'Both A and C'],
      answer: 3,
      explanation: 'A serial schedule is trivially conflict serializable. 2PL guarantees conflict serializability. So both A and C are correct.',
      hint: 'What does 2PL guarantee?',
      difficulty: 'medium',
      tags: ['schedules', '2pl'],
      timeLimit: 60,
    },
    {
      id: 'dbms-q15',
      text: 'Given R(A,B,C) with FDs: A→B, B→C. Which normal form is R in?',
      options: ['1NF only', '2NF', '3NF', 'BCNF'],
      answer: 1,
      explanation: 'Candidate key is A. A→B and B→C means C transitively depends on A. So it\'s in 2NF (no partial dependency) but not 3NF (transitive dependency exists).',
      hint: 'Is there a transitive dependency?',
      difficulty: 'hard',
      tags: ['normalization', '3nf'],
      timeLimit: 75,
    },
    {
      id: 'dbms-q16',
      text: 'Which SQL operation is equivalent to LEFT JOIN WHERE right.key IS NULL?',
      options: ['INTERSECT', 'UNION', 'EXCEPT/MINUS', 'INNER JOIN'],
      answer: 2,
      explanation: 'LEFT JOIN WHERE right IS NULL gives rows in the left table that have no match in the right — this is equivalent to EXCEPT (set difference A − B).',
      hint: 'Which set operation gives elements in A but not in B?',
      difficulty: 'medium',
      tags: ['joins', 'set-operations'],
      timeLimit: 60,
    },
    {
      id: 'dbms-q17',
      text: 'In a relation R(A,B,C,D), if AB is a candidate key and A→C exists, this violates:',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      answer: 1,
      explanation: 'A→C means C partially depends on candidate key AB (only on A, not the full key AB). This violates 2NF which requires no partial dependencies.',
      hint: 'Does a non-prime attribute depend on part of the candidate key?',
      difficulty: 'hard',
      tags: ['normalization', '2nf'],
      timeLimit: 75,
    },
    {
      id: 'dbms-q18',
      text: 'Which of the following is true about a dense index?',
      options: ['Has an entry for every block', 'Has an entry for every search key value', 'Has an entry for every record', 'Both B and C'],
      answer: 3,
      explanation: 'A dense index has an entry for every search key value, which means every record (since each record has a search key). A sparse index has entries for some values/blocks.',
      hint: 'Dense = entry for every record vs Sparse = entry for some.',
      difficulty: 'medium',
      tags: ['indexing'],
      timeLimit: 45,
    },
    {
      id: 'dbms-q19',
      text: 'Two-phase locking (2PL) ensures:',
      options: ['Deadlock freedom', 'Conflict serializability', 'No cascading rollbacks', 'Strict schedules'],
      answer: 1,
      explanation: '2PL guarantees conflict serializability. It does NOT guarantee deadlock freedom (deadlocks can still occur). Strict 2PL prevents cascading rollbacks.',
      hint: 'What property does the growing/shrinking phase protocol guarantee?',
      difficulty: 'hard',
      tags: ['2pl', 'serializability'],
      timeLimit: 75,
    },
    {
      id: 'dbms-q20',
      text: 'A table has 10,000 rows. A query uses WHERE on a column with 50 distinct values. Should the optimizer use an index or full table scan?',
      options: ['Index scan', 'Full table scan', 'Depends on index type', 'Both are same'],
      answer: 1,
      explanation: 'Selectivity = 50/10000 = 0.005 (0.5%). Each value matches ~200 rows. With such low selectivity, the optimizer would likely choose a full table scan since most rows would be accessed anyway.',
      hint: 'What is the selectivity? Is it high or low?',
      difficulty: 'hard',
      tags: ['query-optimization', 'indexing'],
      timeLimit: 90,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand DBMS for placement exams. Focus on normalization (1NF-BCNF), SQL joins and execution order, ACID properties, transaction schedules and 2PL, indexing (B+ trees), and query optimization. Keep answers concise with examples, closure calculations, and common exam questions.',
};
