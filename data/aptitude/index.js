/**
 * data/aptitude/index.js — Aptitude Subject Manifest
 */
export default {
  id: 'aptitude',
  label: 'Aptitude',
  
  color: 'var(--accent-blue)',
  description: 'Quantitative aptitude and logical reasoning for campus placements (TCS, Infosys, Wipro, etc.)',
  chapters: [
    { id: 'percentages',    title: 'Percentages',           difficulty: 'easy',   estimatedTime: 40 },
    { id: 'profit-loss',    title: 'Profit & Loss',         difficulty: 'easy',   estimatedTime: 45 },
    { id: 'simple-interest',title: 'Simple & Compound Interest',  difficulty: 'medium', estimatedTime: 50 },
    { id: 'ratio-proportion',title: 'Ratio & Proportion',    difficulty: 'easy',   estimatedTime: 35 },
    { id: 'time-work',      title: 'Time & Work',           difficulty: 'medium', estimatedTime: 50 },
    { id: 'time-speed',     title: 'Time, Speed & Distance',  difficulty: 'medium', estimatedTime: 55 },
    { id: 'number-system',  title: 'Number System',         difficulty: 'medium', estimatedTime: 60 },
    { id: 'hcf-lcm',        title: 'HCF & LCM',             difficulty: 'easy',   estimatedTime: 40 },
    { id: 'permutation',    title: 'Permutation & Combination',  difficulty: 'hard', estimatedTime: 70 },
    { id: 'probability',    title: 'Probability',           difficulty: 'hard', estimatedTime: 65 },
    { id: 'logical-reasoning', title: 'Logical Reasoning',  difficulty: 'medium', estimatedTime: 60 },
    { id: 'verbal-ability', title: 'Verbal Ability',         difficulty: 'medium', estimatedTime: 45 },
    { id: 'data-interpretation', title: 'Data Interpretation',  difficulty: 'medium', estimatedTime: 90 },
  ]
};
