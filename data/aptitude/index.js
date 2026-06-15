/**
 * data/aptitude/index.js — Aptitude Subject Manifest
 */
export default {
  id: 'aptitude',
  label: 'Aptitude',
  icon: '📐',
  color: 'var(--accent-blue)',
  description: 'Quantitative aptitude and logical reasoning for campus placements (TCS, Infosys, Wipro, etc.)',
  chapters: [
    { id: 'percentages',    title: 'Percentages',          icon: '📈', difficulty: 'easy',   estimatedTime: 40 },
    { id: 'profit-loss',    title: 'Profit & Loss',        icon: '💰', difficulty: 'easy',   estimatedTime: 45 },
    { id: 'simple-interest',title: 'Simple & Compound Interest', icon: '🏦', difficulty: 'medium', estimatedTime: 50 },
    { id: 'ratio-proportion',title: 'Ratio & Proportion',  icon: '⚖️',  difficulty: 'easy',   estimatedTime: 35 },
    { id: 'time-work',      title: 'Time & Work',          icon: '⏳', difficulty: 'medium', estimatedTime: 50 },
    { id: 'time-speed',     title: 'Time, Speed & Distance', icon: '🚀', difficulty: 'medium', estimatedTime: 55 },
    { id: 'number-system',  title: 'Number System',        icon: '🔢', difficulty: 'medium', estimatedTime: 60 },
    { id: 'hcf-lcm',        title: 'HCF & LCM',            icon: '🧮', difficulty: 'easy',   estimatedTime: 40 },
    { id: 'permutation',    title: 'Permutation & Combination', icon: '🔀', difficulty: 'hard', estimatedTime: 70 },
    { id: 'probability',    title: 'Probability',          icon: '🎲', difficulty: 'hard', estimatedTime: 65 },
    { id: 'logical-reasoning', title: 'Logical Reasoning', icon: '🧩', difficulty: 'medium', estimatedTime: 60 },
    { id: 'verbal-ability', title: 'Verbal Ability',       icon: '🗣️',  difficulty: 'medium', estimatedTime: 45 },
    { id: 'data-interpretation', title: 'Data Interpretation', icon: '📊', difficulty: 'medium', estimatedTime: 90 },
  ]
};
