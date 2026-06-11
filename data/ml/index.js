/**
 * data/ml/index.js — ML & AI Subject Manifest
 */
export default {
  id: 'ml',
  label: 'ML & AI',
  icon: '🤖',
  color: 'var(--accent-amber)',
  description: 'Machine learning fundamentals, deep learning basics, and practical ML for placements and interviews.',
  chapters: [
    { id: 'math-prereqs',   title: 'Math Prerequisites',     icon: '∑',  difficulty: 'medium', estimatedTime: 60 },
    { id: 'core-ml',        title: 'Core ML Algorithms',     icon: '🧠', difficulty: 'medium', estimatedTime: 90 },
    { id: 'deep-learning',  title: 'Deep Learning Basics',   icon: '🕷️', difficulty: 'hard',   estimatedTime: 100 },
    { id: 'practical-ml',   title: 'Practical ML',           icon: '🛠️',  difficulty: 'medium', estimatedTime: 75 },
  ]
};
