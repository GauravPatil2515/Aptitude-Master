/**
 * data/ml/practical-ml.js — Practical ML Chapter
 */
export default {
  id: 'ml-practical-ml',
  subject: 'ml',
  title: 'Practical ML',
  
  difficulty: 'medium',
  estimatedTime: 75,
  prerequisites: ['core-ml'],

  notes: `
## ML Workflow

1. **Problem Definition:** What are we predicting? Classification or regression?
2. **Data Collection:** Gather relevant data
3. **Data Preprocessing:** Clean, transform, engineer features
4. **Model Selection:** Choose appropriate algorithm
5. **Training:** Fit model to training data
6. **Evaluation:** Test on unseen data
7. **Deployment:** Put model into production

---

## Data Preprocessing

### Handling Missing Values
- **Drop:** Remove rows/columns with missing data
- **Impute:** Fill with mean, median, mode, or predictive model
- **Indicator:** Add binary column indicating missing

### Feature Scaling
- **Normalization (Min-Max):** x' = (x − min)/(max − min) → [0, 1]
- **Standardization (Z-score):** x' = (x − μ)/σ → mean=0, std=1

> Use standardization for SVM, KNN, PCA. Normalization for neural networks.

### Encoding Categorical Variables
- **Label Encoding:** Assign numbers (0, 1, 2...) — for ordinal data
- **One-Hot Encoding:** Binary columns for each category — for nominal data
- **Target Encoding:** Replace category with mean of target

### Feature Engineering
- Create new features from existing ones
- Polynomial features (x², x³)
- Interaction features (x₁ × x₂)
- Date features (day of week, month, year)

---

## Train-Test Split

**Typical splits:** 80/20 or 70/30 (train/test)

**Stratified split:** Maintains class distribution in both sets.

**Why split?** To evaluate how the model generalizes to unseen data.

---

## Hyperparameter Tuning

**Hyperparameters:** Settings you choose before training (learning rate, tree depth, K in KNN).

**Methods:**
- **Grid Search:** Try all combinations
- **Random Search:** Try random combinations (often better)
- **Bayesian Optimization:** Smart search based on previous results

**Cross-validation:** Use K-fold CV to evaluate each hyperparameter set.

---

## Ensemble Methods

### Bagging (Bootstrap Aggregating)
- Train multiple models on random subsets
- Average their predictions
- Example: Random Forest

### Boosting
- Train models sequentially, each correcting previous errors
- Examples: AdaBoost, Gradient Boosting, XGBoost, LightGBM

### Stacking
- Train multiple different models
- Use their predictions as input to a meta-model

> **XGBoost** is the most winning algorithm in Kaggle competitions.

---

## Handling Imbalanced Data

When one class dominates (e.g., 95% negative, 5% positive):

| Technique | Description |
|-----------|-------------|
| Oversampling | Duplicate minority class samples |
| Undersampling | Remove majority class samples |
| SMOTE | Synthetic minority oversampling |
| Class weights | Penalize misclassification of minority more |
| Different metrics | Use F1, AUC-ROC instead of accuracy |

---

## Model Deployment

**Steps:**
1. Save trained model (pickle, joblib, ONNX)
2. Create API (Flask, FastAPI)
3. Containerize (Docker)
4. Deploy (AWS, GCP, Azure, Heroku)

**Monitoring:** Track model performance over time, detect data drift.

---

## Common ML Libraries

| Library | Use |
|---------|-----|
| scikit-learn | Classical ML algorithms |
| XGBoost/LightGBM | Gradient boosting |
| TensorFlow | Deep learning |
| PyTorch | Deep learning (research) |
| pandas | Data manipulation |
| numpy | Numerical computing |
| matplotlib/seaborn | Visualization |
  `,

  formulas: [
    { name: 'Normalization',    formula: '(x − min) / (max − min)',                example: 'Range [0, 1]' },
    { name: 'Standardization',  formula: '(x − μ) / σ',                            example: 'Mean 0, Std 1' },
    { name: 'F1 Score',         formula: '2 × Precision × Recall / (P + R)',       example: 'Harmonic mean' },
    { name: 'AUC-ROC',          formula: 'Area under ROC curve',                   example: '1.0 = perfect, 0.5 = random' },
    { name: 'SMOTE',            formula: 'Synthetic minority oversampling',         example: 'Creates synthetic samples' },
  ],

  shortcuts: [
    'Standardization for SVM/KNN/PCA; Normalization for neural networks',
    'One-hot encoding for nominal; Label encoding for ordinal',
    'XGBoost = most winning Kaggle algorithm',
    'For imbalanced data: use F1/AUC, not accuracy',
    'Random Search often beats Grid Search for hyperparameter tuning',
    'Always use cross-validation, not just train-test split',
    'Feature engineering > model selection for improving performance',
  ],

  questions: [
    {
      id: 'ml-p-q1',
      text: 'What is the typical train-test split ratio?',
      options: ['50/50', '80/20', '95/5', '60/40'],
      answer: 1,
      explanation: 'The most common split is 80/20 or 70/30 (train/test). 80/20 is the standard default.',
      hint: 'How much data should the model learn from?',
      difficulty: 'easy',
      tags: ['split'],
      timeLimit: 20,
    },
    {
      id: 'ml-p-q2',
      text: 'Standardization transforms data to have:',
      options: ['Range [0, 1]', 'Mean 0 and standard deviation 1', 'All positive values', 'Normal distribution'],
      answer: 1,
      explanation: 'Standardization (Z-score): x\' = (x − μ)/σ. Result has mean = 0 and standard deviation = 1.',
      hint: 'What does Z-score normalization do?',
      difficulty: 'easy',
      tags: ['standardization'],
      timeLimit: 30,
    },
    {
      id: 'ml-p-q3',
      text: 'SMOTE is used for:',
      options: ['Feature selection', 'Handling imbalanced data', 'Dimensionality reduction', 'Regularization'],
      answer: 1,
      explanation: 'SMOTE (Synthetic Minority Oversampling Technique) creates synthetic samples of the minority class to balance the dataset.',
      hint: 'What problem does oversampling solve?',
      difficulty: 'medium',
      tags: ['smote'],
      timeLimit: 45,
    },
    {
      id: 'ml-p-q4',
      text: 'Which algorithm is most associated with winning Kaggle competitions?',
      options: ['Random Forest', 'SVM', 'XGBoost', 'Logistic Regression'],
      answer: 2,
      explanation: 'XGBoost (and its variants like LightGBM, CatBoost) are the most winning algorithms in structured/tabular data competitions.',
      hint: 'Which gradient boosting library is most popular?',
      difficulty: 'easy',
      tags: ['xgboost'],
      timeLimit: 30,
    },
    {
      id: 'ml-p-q5',
      text: 'One-hot encoding is used for:',
      options: ['Ordinal data', 'Nominal data', 'Continuous data', 'Time series'],
      answer: 1,
      explanation: 'One-hot encoding creates binary columns for each category. It\'s used for nominal data (no natural order).',
      hint: 'Which encoding for categories without order?',
      difficulty: 'easy',
      tags: ['encoding'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Practical ML for placement exams. Focus on the ML workflow, data preprocessing (missing values, scaling, encoding), train-test split, hyperparameter tuning, ensemble methods, handling imbalanced data, and common libraries. Keep answers concise with practical examples.',
};
