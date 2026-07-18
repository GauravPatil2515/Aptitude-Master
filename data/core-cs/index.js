/**
 * data/core-cs/index.js — Core CS Subject Manifest
 */
export default {
  id: 'core-cs',
  label: 'Core CS',
  
  color: 'var(--accent-purple)',
  description: 'OS, DBMS, Computer Networks, OOPs — essential for TCS, Infosys, Wipro technical rounds.',
  chapters: [
    { id: 'os',       title: 'Operating Systems',        difficulty: 'medium', estimatedTime: 90 },
    { id: 'dbms',     title: 'DBMS',                     difficulty: 'medium', estimatedTime: 80 },
    { id: 'networks', title: 'Computer Networks',       difficulty: 'medium', estimatedTime: 75 },
    { id: 'oops',     title: 'OOPs Concepts',           difficulty: 'medium', estimatedTime: 70 },
  ]
};
