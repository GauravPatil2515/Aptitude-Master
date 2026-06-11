/**
 * data/sql/index.js — SQL Subject Manifest
 */
export default {
  id: 'sql',
  label: 'SQL',
  icon: '🗃️',
  color: 'var(--accent-green)',
  description: 'SQL from basics to window functions. Frequently tested in Infosys, TCS, Accenture technical rounds.',
  chapters: [
    { id: 'basics',       title: 'SQL Basics',              icon: '📝', difficulty: 'easy',   estimatedTime: 40 },
    { id: 'joins',        title: 'JOINs',                   icon: '🔗', difficulty: 'medium', estimatedTime: 55 },
    { id: 'aggregation',  title: 'Aggregation & GROUP BY',  icon: '📊', difficulty: 'medium', estimatedTime: 50 },
    { id: 'subqueries',   title: 'Subqueries & CTEs',       icon: '🧱', difficulty: 'hard',   estimatedTime: 65 },
    { id: 'window-fns',   title: 'Window Functions',        icon: '🪟', difficulty: 'hard',   estimatedTime: 70 },
  ]
};
