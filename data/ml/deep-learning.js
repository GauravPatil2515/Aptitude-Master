/**
 * data/ml/deep-learning.js — Deep Learning Basics Chapter
 */
export default {
  id: 'ml-deep-learning',
  subject: 'ml',
  title: 'Deep Learning Basics',
  icon: '🕷️',
  difficulty: 'hard',
  estimatedTime: 100,
  prerequisites: ['core-ml'],

  notes: `
## What is Deep Learning?

Deep learning uses neural networks with multiple layers to learn hierarchical representations from data. It's a subset of machine learning.

---

## Neural Network Basics

**Neuron:** y = f(wx + b)
- w = weights, b = bias, f = activation function

**Layers:**
- **Input layer:** Receives raw data
- **Hidden layers:** Process data (can be many)
- **Output layer:** Produces prediction

**Activation Functions:**
| Function | Formula | Range | Use |
|----------|---------|-------|-----|
| Sigmoid | 1/(1+e^(-x)) | (0,1) | Binary output |
| ReLU | max(0, x) | [0,∞) | Hidden layers |
| Tanh | (e^x − e^(-x))/(e^x + e^(-x)) | (-1,1) | Hidden layers |
| Softmax | e^(x_i)/Σe^(x_j) | (0,1) | Multi-class output |

> 💡 **ReLU** is most common for hidden layers. It's simple and avoids vanishing gradient.

---

## Training a Neural Network

**Forward Pass:** Input flows through layers → produces output

**Loss Calculation:** Compare prediction with actual (e.g., cross-entropy)

**Backpropagation:** Calculate gradients of loss w.r.t. each weight using chain rule

**Weight Update:** w = w − α × (∂L/∂w)

**Epoch:** One pass through the entire training dataset

**Batch:** Subset of data processed at once
- **Batch GD:** Full dataset per update
- **SGD:** One sample per update
- **Mini-batch GD:** Small batch (32, 64, 128) per update

---

## CNN (Convolutional Neural Network)

Designed for image data.

**Key layers:**
1. **Convolution:** Apply filters to detect features (edges, textures)
2. **Pooling:** Reduce spatial dimensions (max pooling, average pooling)
3. **Fully Connected:** Final classification

**Architecture:** Input → [Conv → ReLU → Pooling] × N → FC → Output

> 💡 CNNs exploit spatial locality — nearby pixels are more related.

---

## RNN (Recurrent Neural Network)

Designed for sequential data (text, time series).

**Key idea:** Hidden state carries information from previous steps.
h_t = f(W_hh × h_(t-1) + W_xh × x_t)

**Problem:** Vanishing/exploding gradients for long sequences.

**Solutions:**
- **LSTM (Long Short-Term Memory):** Uses gates (forget, input, output) to control information flow
- **GRU (Gated Recurrent Unit):** Simplified LSTM with reset and update gates

---

## Transformers

**Attention mechanism:** Weights different parts of input differently.

**Self-attention:** Each position attends to all positions.

**Key components:**
- Multi-head attention
- Positional encoding
- Feed-forward layers
- Layer normalization

> 💡 Transformers power GPT, BERT, and most modern LLMs.

---

## Regularization in Deep Learning

| Technique | Description |
|-----------|-------------|
| Dropout | Randomly disable neurons during training |
| Batch Norm | Normalize layer inputs |
| Data Augmentation | Create modified copies of training data |
| Early Stopping | Stop when validation loss increases |
| Weight Decay | L2 regularization on weights |

---

## Optimizers

| Optimizer | Description |
|-----------|-------------|
| SGD | Basic gradient descent |
| SGD + Momentum | Uses exponential moving average of gradients |
| Adam | Adaptive learning rates (most popular) |
| RMSprop | Adaptive learning rate per parameter |

> 💡 **Adam** is the default choice for most deep learning tasks.
  `,

  formulas: [
    { name: 'ReLU',             formula: 'f(x) = max(0, x)',                        example: 'ReLU(−3) = 0, ReLU(5) = 5' },
    { name: 'Sigmoid',          formula: 'σ(x) = 1/(1+e^(-x))',                    example: 'σ(0) = 0.5' },
    { name: 'Softmax',          formula: 'e^(x_i) / Σe^(x_j)',                     example: 'Converts logits to probabilities' },
    { name: 'Weight update',    formula: 'w = w − α × ∂L/∂w',                     example: 'Gradient descent step' },
    { name: 'Cross-entropy',    formula: '−Σ y_i log(ŷ_i)',                       example: 'Loss for classification' },
  ],

  shortcuts: [
    'ReLU = most common activation for hidden layers',
    'CNN for images, RNN/LSTM for sequences, Transformers for everything',
    'Backpropagation = chain rule applied through the network',
    'Dropout = randomly disable neurons to prevent overfitting',
    'Adam optimizer = default choice for most tasks',
    'Batch normalization = normalize inputs to each layer',
    'Self-attention = each position attends to all positions',
  ],

  questions: [
    {
      id: 'ml-d-q1',
      text: 'Which activation function is most commonly used in hidden layers?',
      options: ['Sigmoid', 'Tanh', 'ReLU', 'Softmax'],
      answer: 2,
      explanation: 'ReLU (Rectified Linear Unit) is the most common activation function for hidden layers. It\'s simple, fast, and avoids the vanishing gradient problem.',
      hint: 'Which activation is simply max(0, x)?',
      difficulty: 'easy',
      tags: ['activation'],
      timeLimit: 30,
    },
    {
      id: 'ml-d-q2',
      text: 'CNNs are primarily used for:',
      options: ['Text processing', 'Image processing', 'Time series', 'Tabular data'],
      answer: 1,
      explanation: 'CNNs (Convolutional Neural Networks) are designed for image data, exploiting spatial relationships between pixels.',
      hint: 'Which data type has spatial structure?',
      difficulty: 'easy',
      tags: ['cnn'],
      timeLimit: 30,
    },
    {
      id: 'ml-d-q3',
      text: 'What problem do LSTM and GRU solve?',
      options: ['Overfitting', 'Vanishing gradient in RNNs', 'High computational cost', 'Data scarcity'],
      answer: 1,
      explanation: 'LSTM and GRU use gating mechanisms to control information flow, solving the vanishing gradient problem in standard RNNs for long sequences.',
      hint: 'What happens to gradients in long sequences?',
      difficulty: 'medium',
      tags: ['lstm'],
      timeLimit: 45,
    },
    {
      id: 'ml-d-q4',
      text: 'Dropout is a technique used for:',
      options: ['Speeding up training', 'Regularization', 'Data augmentation', 'Feature selection'],
      answer: 1,
      explanation: 'Dropout randomly disables neurons during training, which prevents overfitting (regularization).',
      hint: 'What does randomly disabling neurons prevent?',
      difficulty: 'easy',
      tags: ['dropout'],
      timeLimit: 30,
    },
    {
      id: 'ml-d-q5',
      text: 'Which optimizer is the most commonly used default?',
      options: ['SGD', 'SGD + Momentum', 'Adam', 'RMSprop'],
      answer: 2,
      explanation: 'Adam (Adaptive Moment Estimation) is the most popular default optimizer. It combines momentum with adaptive learning rates.',
      hint: 'Which optimizer adapts learning rates per parameter?',
      difficulty: 'easy',
      tags: ['optimizer'],
      timeLimit: 30,
    },
    {
      id: 'ml-d-q6',
      text: 'Backpropagation uses which mathematical rule?',
      options: ['Product rule', 'Chain rule', 'Quotient rule', 'Power rule'],
      answer: 1,
      explanation: 'Backpropagation calculates gradients using the chain rule of calculus, propagating errors backward through the network.',
      hint: 'How do you differentiate a composition of functions?',
      difficulty: 'easy',
      tags: ['backprop'],
      timeLimit: 30,
    },
    {
      id: 'ml-d-q7',
      text: 'The Transformer architecture is based on:',
      options: ['Convolution', 'Recurrence', 'Attention mechanism', 'Pooling'],
      answer: 2,
      explanation: 'Transformers are based on the attention mechanism (specifically self-attention), allowing each position to attend to all other positions.',
      hint: 'What mechanism allows weighing different parts of input differently?',
      difficulty: 'medium',
      tags: ['transformer'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Deep Learning basics for placement exams. Focus on neural networks (activation functions, backpropagation), CNN, RNN/LSTM, Transformers, regularization (dropout, batch norm), and optimizers (Adam). Keep answers concise with key formulas.',
};
