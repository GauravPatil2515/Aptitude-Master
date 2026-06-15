/**
 * data/ml/core-ml.js — Core ML Algorithms Chapter
 */
export default {
  id: 'ml-core-ml',
  subject: 'ml',
  title: 'Core ML Algorithms',
  icon: '🧠',
  difficulty: 'medium',
  estimatedTime: 90,
  prerequisites: ['math-prereqs'],

  notes: `
## Types of Machine Learning

| Type | Description | Example |
|------|-------------|---------|
| Supervised | Labeled data, learn mapping | Classification, Regression |
| Unsupervised | No labels, find patterns | Clustering, Dimensionality Reduction |
| Reinforcement | Learn by trial and error | Game playing, Robotics |

---

## Supervised Learning

### Linear Regression
Predicts continuous values. Finds best-fit line: y = wx + b

**Loss:** MSE = (1/n) Σ(y_i − ŷ_i)²

**Goal:** Minimize MSE using gradient descent.

### Logistic Regression
Predicts probability (0 to 1). Uses sigmoid: σ(z) = 1/(1+e^(-z))

**Loss:** Cross-entropy = −[y·log(ŷ) + (1−y)·log(1−ŷ)]

> 💡 Despite "regression" in name, logistic regression is used for classification.

### Decision Trees
Tree-like model of decisions. Splits data based on feature values.

**Key concepts:**
- **Entropy:** Measure of impurity. H = −Σ p_i log(p_i)
- **Information Gain:** Reduction in entropy after split
- **Gini Impurity:** G = 1 − Σ p_i²

### Random Forest
Ensemble of decision trees. Each tree votes; majority wins.

**Advantages:** Reduces overfitting, handles missing data, feature importance.

### SVM (Support Vector Machine)
Finds the hyperplane that maximizes the margin between classes.

**Kernel trick:** Maps data to higher dimensions (linear, RBF, polynomial).

---

## Unsupervised Learning

### K-Means Clustering
1. Choose K centroids randomly
2. Assign each point to nearest centroid
3. Recalculate centroids
4. Repeat until convergence

**Elbow method:** Plot K vs error, choose K at the "elbow."

### PCA (Principal Component Analysis)
Reduces dimensions while preserving maximum variance.

1. Standardize data
2. Compute covariance matrix
3. Find eigenvectors (principal components)
4. Project data onto top eigenvectors

---

## Model Evaluation

### Classification Metrics

| Metric | Formula | Meaning |
|--------|---------|---------|
| Accuracy | (TP+TN)/(TP+TN+FP+FN) | Overall correctness |
| Precision | TP/(TP+FP) | Of predicted positive, how many correct |
| Recall | TP/(TP+FN) | Of actual positive, how many found |
| F1 Score | 2×P×R/(P+R) | Harmonic mean of precision and recall |

**Confusion Matrix:**
|  | Predicted + | Predicted - |
|--|-------------|-------------|
| Actual + | TP | FN |
| Actual - | FP | TN |

### Regression Metrics
- **MSE:** Mean Squared Error
- **RMSE:** Root Mean Squared Error
- **MAE:** Mean Absolute Error
- **R²:** Coefficient of determination (1 = perfect)

### Cross-Validation
**K-Fold:** Split data into K parts, train on K-1, test on 1. Repeat K times.

---

## Bias-Variance Tradeoff

| | High Bias | High Variance |
|--|-----------|---------------|
| Problem | Underfitting | Overfitting |
| Training error | High | Low |
| Test error | High | High |
| Fix | More complex model, more features | More data, regularization, simpler model |
  `,

  formulas: [
    { name: 'Sigmoid',          formula: 'σ(z) = 1/(1+e^(-z))',                     example: 'σ(0) = 0.5' },
    { name: 'MSE',              formula: '(1/n) Σ(y_i − ŷ_i)²',                    example: 'Mean of squared errors' },
    { name: 'Entropy',          formula: 'H = −Σ p_i log(p_i)',                     example: 'Measure of impurity' },
    { name: 'Precision',        formula: 'TP / (TP + FP)',                          example: 'Correct positives / predicted positives' },
    { name: 'Recall',           formula: 'TP / (TP + FN)',                          example: 'Correct positives / actual positives' },
  ],

  shortcuts: [
    'Logistic regression = classification (despite the name)',
    'Random Forest = ensemble of trees, reduces overfitting',
    'SVM finds maximum margin hyperplane',
    'K-Means: assign → recalculate → repeat',
    'PCA reduces dimensions by finding directions of maximum variance',
    'High bias = underfit, High variance = overfit',
    'Precision = "of predicted +, how many correct?" Recall = "of actual +, how many found?"',
  ],

  questions: [
    {
      id: 'ml-c-q1',
      text: 'Logistic regression is used for:',
      options: ['Regression', 'Classification', 'Clustering', 'Dimensionality reduction'],
      answer: 1,
      explanation: 'Despite its name, logistic regression is a classification algorithm. It predicts probabilities using the sigmoid function.',
      hint: 'What does the sigmoid function output?',
      difficulty: 'easy',
      tags: ['logistic-regression'],
      timeLimit: 30,
    },
    {
      id: 'ml-c-q2',
      text: 'What does Random Forest reduce compared to a single decision tree?',
      options: ['Bias', 'Variance', 'Training time', 'Feature count'],
      answer: 1,
      explanation: 'Random Forest is an ensemble method that reduces variance (overfitting) by averaging multiple decision trees.',
      hint: 'What problem does ensembling solve?',
      difficulty: 'easy',
      tags: ['random-forest'],
      timeLimit: 30,
    },
    {
      id: 'ml-c-q3',
      text: 'In a confusion matrix, what is Precision?',
      options: ['TP/(TP+FN)', 'TP/(TP+FP)', 'TN/(TN+FP)', '(TP+TN)/Total'],
      answer: 1,
      explanation: 'Precision = TP/(TP+FP). Of all predicted positives, how many are actually positive.',
      hint: 'Precision asks: "Of what I predicted as positive, how many were correct?"',
      difficulty: 'easy',
      tags: ['precision'],
      timeLimit: 30,
    },
    {
      id: 'ml-c-q4',
      text: 'PCA is used for:',
      options: ['Classification', 'Regression', 'Dimensionality reduction', 'Clustering'],
      answer: 2,
      explanation: 'PCA (Principal Component Analysis) reduces the number of features while preserving maximum variance.',
      hint: 'What does "principal component" mean?',
      difficulty: 'easy',
      tags: ['pca'],
      timeLimit: 30,
    },
    {
      id: 'ml-c-q5',
      text: 'High variance in a model leads to:',
      options: ['Underfitting', 'Overfitting', 'Low training error and low test error', 'High bias'],
      answer: 1,
      explanation: 'High variance means the model is too complex and overfits — low training error but high test error.',
      hint: 'What happens when a model is too complex?',
      difficulty: 'easy',
      tags: ['bias-variance'],
      timeLimit: 30,
    },
    {
      id: 'ml-c-q6',
      text: 'K-Means clustering minimizes:',
      options: ['Distance between clusters', 'Distance from points to their centroid', 'Number of features', 'Entropy'],
      answer: 1,
      explanation: 'K-Means minimizes the sum of squared distances from each point to its assigned centroid.',
      hint: 'What does K-Means optimize in each iteration?',
      difficulty: 'medium',
      tags: ['k-means'],
      timeLimit: 45,
    },
    {
      id: 'ml-c-q7',
      text: 'The sigmoid function outputs values in the range:',
      options: ['(-∞, +∞)', '[0, 1]', '[-1, 1]', '[0, +∞)'],
      answer: 1,
      explanation: 'The sigmoid function σ(z) = 1/(1+e^(-z)) outputs values between 0 and 1, representing probabilities.',
      hint: 'What range is needed for a probability?',
      difficulty: 'easy',
      tags: ['sigmoid'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Core ML Algorithms for placement exams. Focus on supervised vs unsupervised learning, linear/logistic regression, decision trees, random forest, SVM, K-Means, PCA, and evaluation metrics (precision, recall, F1, confusion matrix). Keep answers concise with formulas.',
};
