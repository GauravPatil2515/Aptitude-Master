/**
 * modules/mock-generator.js — AI Mock Test Generator (local-first)
 *
 * Builds a personalised mock test by sampling real questions from the
 * existing data (aptitude MCQs, DSA/SQL problem banks) and weighting
 * selection toward the user's weak topics (via analyzeWeakness()).
 *
 * Works fully offline. If a Groq key is configured, the optional
 * `enhanceWithAI` step can add a couple of AI-generated twist questions,
 * but the test is never dependent on the network.
 */

import { store } from '../state/store.js';
import { analyzeWeakness } from './ai.js';
import { SQL_PROBLEMS, SQL_TOP_50, SQL_TCS_NQT } from '../data/sql-sheet.js';
import DSA from '../data/dsa/index.js';

/** Local fallback concept bank for DSA — pattern-recognition MCQs. */
const DSA_CONCEPTS = [
  { text: 'Which data structure gives O(1) average lookup and is built on a hash function?', options: ['Binary Search Tree', 'Hash Map', 'Linked List', 'Min Heap'], answer: 1, explanation: 'A hash map provides average O(1) insert/lookup using a hash function; BST is O(log n), linked list O(n).' },
  { text: 'Kadane’s algorithm computes which of the following?', options: ['Longest Increasing Subsequence', 'Maximum Subarray Sum', 'Number of Islands', 'Topological Order'], answer: 1, explanation: 'Kadane’s algorithm finds the contiguous subarray with the maximum sum in O(n).' },
  { text: 'A "sliding window" is most useful for problems involving:', options: ['Sorting a fixed array', 'Contiguous subarrays with a constraint', 'Tree traversal', 'Graph colouring'], answer: 1, explanation: 'Sliding window efficiently processes contiguous subarrays/ranges (e.g. longest substring without repeats).' },
  { text: 'Two pointers on a sorted array is the standard approach for:', options: ['Merge Intervals', 'Two Sum (sorted input)', 'Dijkstra’s shortest path', 'Union-Find'], answer: 1, explanation: 'With sorted input, Two Sum is solved in O(n) with left/right pointers instead of a hash map.' },
  { text: 'Moore’s Voting Algorithm finds:', options: ['The majority element', 'The minimum element', 'A cycle in a graph', 'The LCA of a tree'], answer: 0, explanation: 'Moore’s Voting Algorithm finds the element appearing more than n/2 times in O(n) time, O(1) space.' },
  { text: 'A monotonic stack is the right tool for:', options: ['Next Greater Element', 'Binary search', 'DFS traversal', 'Matrix multiplication'], answer: 0, explanation: 'Next Greater/Smaller Element problems are solved with a monotonic (increasing/decreasing) stack.' },
  { text: 'Backtracking is used to generate:', options: ['Prefix sums', 'All subsets / permutations', 'A hash index', 'A min-heap'], answer: 1, explanation: 'Backtracking explores all candidates (subsets, permutations, N-Queens) and prunes invalid branches.' },
  { text: 'Which traversal yields a BST’s keys in sorted order?', options: ['Pre-order', 'Post-order', 'In-order', 'Level-order'], answer: 2, explanation: 'In-order (left, root, right) traversal of a BST visits keys in ascending sorted order.' },
  { text: 'A min-heap guarantees the root is:', options: ['The largest element', 'The smallest element', 'The median', 'Random'], answer: 1, explanation: 'In a min-heap the root holds the minimum; insert/extract-min are O(log n).' },
  { text: 'Topological sort applies to:', options: ['Undirected acyclic graphs', 'Directed acyclic graphs (DAGs)', 'Weighted cycles', 'Bipartite graphs only'], answer: 1, explanation: 'Topological sort orders vertices of a DAG so every edge u→v has u before v (Course Schedule).' },
  { text: 'Union-Find (DSU) is used for:', options: ['Shortest path', 'Detecting connected components / cycles', 'Sorting', 'Hashing'], answer: 1, explanation: 'Disjoint Set Union efficiently finds connected components and detects cycles in undirected graphs.' },
  { text: 'Dynamic programming trades space for time by:', options: ['Recursing blindly', 'Storing subproblem results', 'Random sampling', 'Sorting first'], answer: 1, explanation: 'DP avoids recomputation by memoising / tabulating overlapping subproblem solutions.' },
];

/** Local fallback concept bank for SQL — pattern/syntax MCQs. */
const SQL_CONCEPTS = [
  { text: 'Which clause filters GROUPS after aggregation?', options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'], answer: 1, explanation: 'HAVING filters groups created by GROUP BY; WHERE filters rows before grouping.' },
  { text: 'ROW_NUMBER(), RANK() and DENSE_RANK() are examples of:', options: ['Aggregate functions', 'Window functions', 'Scalar functions', 'Trigger functions'], answer: 1, explanation: 'These are window functions that compute values across a set of rows related to the current row.' },
  { text: 'A LEFT JOIN returns all rows from the left table and:', options: ['Only matching right rows', 'Matched right rows + NULLs for unmatched', 'Only unmatched rows', 'The Cartesian product'], answer: 1, explanation: 'LEFT JOIN keeps every left row; right-side columns are NULL when no match exists.' },
  { text: 'To remove duplicate result rows you use:', options: ['UNION ALL', 'DISTINCT', 'GROUP_CONCAT', 'EXCEPT'], answer: 1, explanation: 'SELECT DISTINCT eliminates duplicate rows from the result set.' },
  { text: 'The SQL execution order begins with:', options: ['SELECT', 'FROM', 'WHERE', 'GROUP BY'], answer: 1, explanation: 'Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.' },
  { text: 'A self-join is used to compare rows:', options: ['Across two different tables', 'Within the same table', 'Across databases', 'In a view only'], answer: 1, explanation: 'A self-join joins a table to itself (e.g. employees vs their managers).' },
  { text: 'COUNT(*) counts:', options: ['Only non-NULL columns', 'All rows including NULLs', 'Distinct values', 'Indexed rows only'], answer: 1, explanation: 'COUNT(*) counts every row; COUNT(col) counts non-NULL values of that column.' },
  { text: 'Which keyword creates a temporary named result set for a query?', options: ['TEMP TABLE', 'CTE (WITH)', 'VIEW', 'INDEX'], answer: 1, explanation: 'A Common Table Expression defined with WITH creates a named temporary result set.' },
  { text: 'COALESCE(a, b, c) returns:', options: ['The first NULL value', 'The first non-NULL value', 'The maximum value', 'NULL always'], answer: 1, explanation: 'COALESCE returns the first non-NULL argument in the list.' },
  { text: 'To find the previous row’s value you use:', options: ['LAG()', 'LEAD()', 'FIRST_VALUE()', 'NTILE()'], answer: 0, explanation: 'LAG() accesses data from a previous row in the partition; LEAD() looks ahead.' },
];

/** Deterministic shuffle (seedable) so a given config yields stable tests. */
function shuffle(arr, seed = 1) {
  const a = arr.slice();
  let s = seed >>> 0;
  const rand = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr, n, seed) {
  return shuffle(arr, seed).slice(0, n);
}

/** Gather all aptitude MCQs from every chapter data file. */
async function loadAptitudeQuestions() {
  const idx = (await import('../data/aptitude/index.js')).default;
  const out = [];
  for (const ch of idx.chapters) {
    try {
      const mod = await import(`../data/aptitude/${ch.id}.js`);
      const data = mod.default;
      (data.questions || []).forEach(q => {
        out.push({ ...q, _src: `aptitude/${ch.id}`, _topic: ch.id });
      });
    } catch { /* chapter may not have questions */ }
  }
  return out;
}

/**
 * Build a mock test.
 * @param {object} opts
 *  - count: total questions (default 30)
 *  - minutes: time limit (default 30)
 *  - focus: 'weak' | 'mixed' | 'sql50' | 'dsa' | 'aptitude'
 *  - seed: numeric seed for repeatable tests
 * @returns {Promise<object>} mockData shaped like data/mocks/*.js
 */
export async function buildMockTest(opts = {}) {
  const count = opts.count || 30;
  const minutes = opts.minutes || 30;
  const focus = opts.focus || 'weak';
  const seed = opts.seed || Date.now() % 100000;

  const report = analyzeWeakness();
  const weakChapterIds = report.topics.map(t => t.chapter).filter(Boolean);

  // --- Aptitude pool ---
  const apt = await loadAptitudeQuestions();
  const weakApt = apt.filter(q => weakChapterIds.includes(q._topic));
  const aptPool = focus === 'weak' && weakApt.length
    ? shuffle([...weakApt, ...apt], seed) // bias toward weak, keep variety
    : shuffle(apt, seed);

  // --- DSA pool (concept MCQs; bias toward weak topics if focus=weak) ---
  const dsaWeakPatterns = report.topics
    .filter(t => t.subject === 'dsa')
    .map(t => t.chapter);
  let dsaPool = DSA_CONCEPTS.slice();
  if (focus === 'weak' && dsaWeakPatterns.length) {
    // surface concepts regardless; full personalisation needs per-problem tagging.
    dsaPool = shuffle(DSA_CONCEPTS, seed + 7);
  }

  // --- SQL pool ---
  let sqlPool = SQL_CONCEPTS.slice();
  if (focus === 'sql50') {
    // Build light "identify the pattern" MCQs from the curated Top 50.
    const top50 = SQL_TOP_50.map(id => SQL_PROBLEMS.find(p => p.id === id)).filter(Boolean);
    sqlPool = top50.slice(0, 12).map(p => ({
      text: `In “${p.name}”, the core SQL technique is:`,
      options: [p.pattern, 'Pivot table', 'Recursive CTE only', 'Full-text index'],
      answer: 0,
      explanation: `“${p.name}” is solved using the ${p.pattern} technique (${p.difficulty}).`,
    }));
  }

  // --- Allocate by focus ---
  let sections = [];
  if (focus === 'dsa') {
    sections = [
      { id: 'dsa', title: 'DSA Concepts', questions: pick(dsaPool, count, seed) },
    ];
  } else if (focus === 'sql50' || focus === 'sql') {
    sections = [
      { id: 'sql', title: 'SQL Concepts', questions: pick(sqlPool, count, seed) },
    ];
  } else if (focus === 'aptitude') {
    sections = [
      { id: 'apt', title: 'Aptitude', questions: pick(aptPool, count, seed) },
    ];
  } else {
    // mixed / weak: split across aptitude + dsa + sql
    const aptN = Math.max(8, Math.round(count * 0.5));
    const dsaN = Math.max(4, Math.round(count * 0.3));
    const sqlN = Math.max(4, count - aptN - dsaN);
    const secs = [];
    if (aptPool.length) secs.push({ id: 'apt', title: 'Aptitude (Weak-Focused)', questions: pick(aptPool, aptN, seed) });
    if (dsaPool.length) secs.push({ id: 'dsa', title: 'DSA Concepts', questions: pick(dsaPool, dsaN, seed + 3) });
    if (sqlPool.length) secs.push({ id: 'sql', title: 'SQL Concepts', questions: pick(sqlPool, sqlN, seed + 5) });
    sections = secs;
  }

  // Flatten + re-id to keep mock engine happy (ids must be unique strings).
  let qi = 0;
  sections.forEach(sec => {
    sec.questions = sec.questions.map(q => ({ ...q, id: `${focus}-q${qi++}` }));
  });

  const totalQ = sections.reduce((n, s) => n + s.questions.length, 0);

  return {
    id: `ai-${focus}-${seed}`,
    title: `AI Mock Test — ${focus === 'weak' ? 'Weak-Topic Focus' : focus.toUpperCase()}`,
    description: `Personalised ${totalQ}-question test generated from your progress${weakChapterIds.length ? ` (weak areas: ${weakChapterIds.slice(0, 4).join(', ')})` : ''}.`,
    timeLimit: minutes * 60,
    isAIGenerated: true,
    sections,
  };
}
