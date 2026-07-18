/**
 * data/ml/math-prereqs.js — Math Prerequisites for ML Chapter
 */
export default {
  id: 'ml-math-prereqs',
  subject: 'ml',
  title: 'Math Prerequisites',
  icon: '∑',
  difficulty: 'medium',
  estimatedTime: 60,
  prerequisites: [],

  notes: `
## Linear Algebra

**Vectors:** Ordered list of numbers. v = [1, 2, 3]

**Matrix:** 2D array of numbers. A = [[1,2],[3,4]]

**Matrix Multiplication:** (m×n) × (n×p) = (m×p)
\`\`\`
[a b]   [e f]   [ae+bg af+bh]
[c d] × [g h] = [ce+dg cf+dh]
\`\`\`

**Transpose:** Rows become columns. A^T

**Inverse:** A × A^(-1) = I (identity matrix). Only square matrices can have inverses.

**Dot Product:** a·b = Σ(a_i × b_i) = |a||b|cos(θ)

> Dot product = 0 means vectors are perpendicular (orthogonal)

---

## Calculus

**Derivative:** Rate of change. f'(x) = lim(h→0) [f(x+h)−f(x)]/h

**Common derivatives:**
- d/dx (x^n) = nx^(n-1)
- d/dx (e^x) = e^x
- d/dx (ln x) = 1/x
- d/dx (sin x) = cos x

**Partial Derivative:** Derivative with respect to one variable, treating others as constants.

**Gradient:** Vector of partial derivatives. Points in direction of steepest ascent.

> **Gradient descent:** Move opposite to gradient to minimize a function.

---

## Probability & Statistics

**Bayes' Theorem:** P(A|B) = P(B|A) × P(A) / P(B)

**Mean:** μ = Σx_i / n

**Variance:** σ² = Σ(x_i − μ)² / n

**Standard Deviation:** σ = √(variance)

**Normal Distribution:** Bell curve. 68% within 1σ, 95% within 2σ, 99.7% within 3σ.

**Correlation:** Measures linear relationship between two variables. Range: -1 to 1.

---

## Key Concepts for ML

**Loss Function:** Measures how wrong the model is (e.g., MSE, Cross-Entropy)

**Gradient Descent:** Update weights: w = w − α × (∂L/∂w)
- α = learning rate
- Too high → overshoot; Too low → slow convergence

**Overfitting:** Model memorizes training data, fails on new data
**Underfitting:** Model too simple to capture patterns

**Regularization:** L1 (Lasso) adds |w| penalty, L2 (Ridge) adds w² penalty
  `,

  formulas: [
    { name: 'Matrix mult',      formula: '(m×n) × (n×p) = (m×p)',                    example: '(2×3) × (3×2) = (2×2)' },
    { name: 'Dot product',      formula: 'a·b = Σ(a_i × b_i)',                        example: '[1,2]·[3,4] = 3+8 = 11' },
    { name: 'Bayes',            formula: 'P(A|B) = P(B|A)×P(A)/P(B)',                example: 'Posterior = Likelihood×Prior/Evidence' },
    { name: 'Gradient descent', formula: 'w = w − α × ∂L/∂w',                       example: 'Update weights opposite to gradient' },
    { name: 'Normal dist',      formula: '68-95-99.7 rule (1σ, 2σ, 3σ)',             example: '95% data within 2 std devs' },
  ],

  shortcuts: [
    'Dot product = 0 → vectors are orthogonal (90°)',
    'Gradient points uphill; gradient descent goes downhill',
    'L1 regularization → sparse weights (feature selection)',
    'L2 regularization → small weights (prevents overfitting)',
    'Normal distribution: 68-95-99.7 rule',
    'Bayes: Posterior ∝ Likelihood × Prior',
  ],

  questions: [
    {
      id: 'ml-m-q1',
      text: 'What is the dot product of [1, 2, 3] and [4, 5, 6]?',
      options: ['15', '32', '24', '18'],
      answer: 1,
      explanation: '1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32',
      hint: 'Multiply corresponding elements and sum',
      difficulty: 'easy',
      tags: ['linear-algebra'],
      timeLimit: 45,
    },
    {
      id: 'ml-m-q2',
      text: 'In gradient descent, we move:',
      options: ['In the direction of the gradient', 'Opposite to the gradient', 'Perpendicular to the gradient', 'Randomly'],
      answer: 1,
      explanation: 'Gradient points in the direction of steepest ascent. To minimize, we move opposite to the gradient.',
      hint: 'Gradient points uphill. What do we want to do?',
      difficulty: 'easy',
      tags: ['gradient-descent'],
      timeLimit: 30,
    },
    {
      id: 'ml-m-q3',
      text: 'What percentage of data lies within 2 standard deviations in a normal distribution?',
      options: ['68%', '95%', '99.7%', '50%'],
      answer: 1,
      explanation: 'The 68-95-99.7 rule: 95% of data lies within 2 standard deviations of the mean.',
      hint: 'Remember the empirical rule',
      difficulty: 'easy',
      tags: ['statistics'],
      timeLimit: 30,
    },
    {
      id: 'ml-m-q4',
      text: 'L1 regularization (Lasso) tends to produce:',
      options: ['Large weights', 'Sparse weights (many zeros)', 'Negative weights', 'Equal weights'],
      answer: 1,
      explanation: 'L1 regularization adds a penalty proportional to |w|, which drives many weights to exactly zero (sparse).',
      hint: 'Which regularization performs feature selection?',
      difficulty: 'medium',
      tags: ['regularization'],
      timeLimit: 45,
    },
    {
      id: 'ml-m-q5',
      text: 'Bayes\' theorem states P(A|B) equals:',
      options: ['P(B|A) × P(B) / P(A)', 'P(B|A) × P(A) / P(B)', 'P(A) × P(B)', 'P(A) + P(B)'],
      answer: 1,
      explanation: 'Bayes theorem: P(A|B) = P(B|A) × P(A) / P(B). Posterior = Likelihood × Prior / Evidence.',
      hint: 'Posterior = Likelihood × Prior / Evidence',
      difficulty: 'easy',
      tags: ['bayes'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Math Prerequisites for ML. Focus on linear algebra (vectors, matrices, dot product), calculus (derivatives, gradient), probability (Bayes, normal distribution), and key ML concepts (gradient descent, regularization). Keep answers concise with formulas and examples.',
};
