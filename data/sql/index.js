/**
 * data/sql/index.js — SQL Subject Manifest
 */
export default {
  id: 'sql',
  label: 'SQL',
  
  color: 'var(--accent-green)',
  description: 'SQL from basics to window functions. Frequently tested in Infosys, TCS, Accenture technical rounds.',
  chapters: [
    { id: 'basics',       title: 'SQL Basics',               difficulty: 'easy',   estimatedTime: 40 },
    { id: 'joins',        title: 'JOINs',                    difficulty: 'medium', estimatedTime: 55 },
    { id: 'aggregation',  title: 'Aggregation & GROUP BY',   difficulty: 'medium', estimatedTime: 50 },
    { id: 'subqueries',   title: 'Subqueries & CTEs',        difficulty: 'hard',   estimatedTime: 65 },
    { id: 'window-fns',   title: 'Window Functions',         difficulty: 'hard',   estimatedTime: 70 },
  ]
};
