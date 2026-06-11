/**
 * data/core-cs/index.js — Core CS Subject Manifest
 */
export default {
  id: 'core-cs',
  label: 'Core CS',
  icon: '💻',
  color: 'var(--accent-purple)',
  description: 'OS, DBMS, Computer Networks, OOPs — essential for TCS, Infosys, Wipro technical rounds.',
  chapters: [
    { id: 'os',       title: 'Operating Systems',      icon: '⚙️',  difficulty: 'medium', estimatedTime: 90 },
    { id: 'dbms',     title: 'DBMS',                   icon: '🗄️',  difficulty: 'medium', estimatedTime: 80 },
    { id: 'networks', title: 'Computer Networks',      icon: '🌐', difficulty: 'medium', estimatedTime: 75 },
    { id: 'oops',     title: 'OOPs Concepts',          icon: '🔧', difficulty: 'medium', estimatedTime: 70 },
  ]
};
