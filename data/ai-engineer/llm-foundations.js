/**
 * data/ai-engineer/llm-foundations.js — Phase 0: LLM Foundations
 */
export default {
  id: 'ai-engineer-llm-foundations',
  subject: 'ai-engineer',
  title: 'Phase 0: LLM Foundations',
  
  difficulty: 'easy',
  estimatedTime: 45,
  prerequisites: [],

  notes: `
## Phase 0: LLM Foundations Refresh

Before diving into advanced agents, you need to understand the core building blocks of Large Language Models.

---

### 1. Key Concepts

#### Transformers & Attention
*   **Transformers:** The neural network architecture that powers modern LLMs, introduced in the seminal paper *"Attention Is All You Need"* (2017). It uses self-attention mechanisms to process sequence tokens in parallel, bypassing the recurrence of RNNs.
*   **Attention (Self-Attention):** A mechanism that allows a model to calculate the relationship between different words (or tokens) in a sentence, regardless of their distance from one another. This generates dynamic, context-aware embeddings.

#### Tokens & Context Window
*   **Tokens:** Sub-word units that models read and generate. For example, the word "learning" might be split into "learn" and "ing". On average, 1 token ≈ 4 characters or 0.75 words.
*   **Context Window:** The maximum number of tokens a model can process in a single request (prompt + response). In 2026, context windows range from 128k (OpenAI GPT-4o) up to 2 million tokens (Google Gemini 1.5 Pro).

#### Embeddings
*   High-dimensional vector representations of text that capture semantic meaning. Similar concepts are close together in this vector space (measured using cosine similarity).

#### Tool Calling & Function Calling
*   **Function Calling:** A mechanism where the LLM parses the user prompt and returns a structured JSON object containing argument values to call a external API/function, rather than returning raw text.
*   **Structured Outputs:** Enforcing LLMs to respond strictly matching a JSON Schema (using features like OpenAI's \\\`response_format: { type: "json_schema", ... }\\\` or Pydantic validation).

#### Prompt Engineering & Reasoning Models
*   **Prompt Techniques:** Zero-shot, Few-shot, Chain-of-Thought (CoT), and ReAct patterns.
*   **Reasoning Models:** Next-generation LLMs (like OpenAI o1/o3 or DeepSeek R1) that perform internal Chain-of-Thought reasoning prior to returning the final output, improving performance on math, coding, and logical tasks.

#### Fine-Tuning vs. RAG
*   **Fine-Tuning:** Modifying the model weights by training it on specific examples to align tone, style, or output formatting.
*   **RAG (Retrieval-Augmented Generation):** Keeping model weights frozen and retrieving relevant facts/context from an external database, injecting them directly into the context window.

---

### 2. Provider APIs

Modern AI engineering relies on interacting with three main model providers:
1.  **OpenAI:** (\\\`gpt-4o\\\`, \\\`o1\\\`, \\\`o3-mini\\\`) — industry standard for speed and structured outputs.
2.  **Gemini (Google):** (\\\`gemini-1.5-pro\\\`, \\\`gemini-2.0-flash\\\`) — leader in large context windows (2M+) and multimodal capabilities.
3.  **Anthropic (Claude):** (\\\`claude-3-5-sonnet\\\`, \\\`claude-3-haiku\\\`) — outstanding coding capabilities and high-quality agent execution.

---

### 3. Project: Universal Chat Interface
To master these foundations, implement a unified chat backend using Python and FastAPI that abstracts the API differences and stream responses dynamically:

\\\`\\\`\\\`python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from openai import OpenAI
import os

app = FastAPI()

@app.post("/chat/stream")
async def stream_chat(prompt: str, provider: str = "openai"):
    if provider == "openai":
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        def get_stream():
            stream = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                stream=True
            )
            for chunk in stream:
                yield chunk.choices[0].delta.content or ""
        return StreamingResponse(get_stream(), media_type="text/plain")
\\\`\\\`\\\`
  `,

  formulas: [
    { name: 'Self-Attention Complexity', formula: 'O(N² · D)', example: 'N = Sequence length, D = Embedding dimension' },
    { name: 'Token Rule of Thumb',        formula: '1 Token ≈ 4 Characters', example: '100 Tokens ≈ 75 Words' },
    { name: 'Cosine Similarity',        formula: 'cos(θ) = (A · B) / (||A|| ||B||)', example: 'Ranges from -1 (opposite) to +1 (identical)' }
  ],

  shortcuts: [
    'Always use Structured Outputs (JSON Schema) when building Agent integrations.',
    'Use Chain-of-Thought (CoT) prompts to force step-by-step logic in standard LLMs.',
    'RAG is for knowledge retrieval; Fine-tuning is for tone, formatting, and style alignment.'
  ],

  questions: [
    {
      id: 'llmf-q1',
      text: 'Which neural network architecture introduced the self-attention mechanism to process sequences in parallel?',
      options: ['Recurrent Neural Network (RNN)', 'Long Short-Term Memory (LSTM)', 'Transformer', 'Convolutional Neural Network (CNN)'],
      answer: 2,
      explanation: 'The Transformer architecture, introduced in the 2017 paper "Attention Is All You Need", replaced sequential recurrence with a parallel self-attention mechanism.',
      hint: 'It is the "T" in GPT.',
      difficulty: 'easy',
      tags: ['history', 'architecture'],
      timeLimit: 45
    },
    {
      id: 'llmf-q2',
      text: 'What is the primary purpose of Function Calling in modern LLM APIs?',
      options: [
        'To write and execute Python code on the provider server',
        'To return a structured JSON object specifying arguments for a local tool/API call',
        'To speed up model text generation speed by 50%',
        'To automatically fine-tune the model on custom database schemas'
      ],
      answer: 1,
      explanation: 'Function/Tool calling allows the model to output structured JSON matching a schema provided by the developer, indicating which function to run and with what arguments.',
      hint: 'It does not run the code; it only generates the JSON arguments.',
      difficulty: 'medium',
      tags: ['apis', 'tool-calling'],
      timeLimit: 60
    },
    {
      id: 'llmf-q3',
      text: 'If you want to teach a model a highly specific custom terminology and response tone, which approach is best suited?',
      options: ['Retrieval-Augmented Generation (RAG)', 'Few-Shot Prompting', 'Fine-Tuning', 'System Prompts alone'],
      answer: 2,
      explanation: 'Fine-tuning modifies model weights to adapt the model to specific output structures, styles, formatting, or tones.',
      hint: 'RAG adds external knowledge dynamically, whereas this modifies behavior permanently.',
      difficulty: 'medium',
      tags: ['rag-vs-tuning'],
      timeLimit: 60
    },
    {
      id: 'llmf-q4',
      text: 'Approximately how many words are represented by 100 tokens?',
      options: ['40 words', '75 words', '150 words', '400 words'],
      answer: 1,
      explanation: 'A helpful rule of thumb is that 1 token is approximately 0.75 words, so 100 tokens correspond to about 75 words.',
      hint: 'Multiply the token count by 0.75.',
      difficulty: 'easy',
      tags: ['tokens'],
      timeLimit: 45
    },
    {
      id: 'llmf-q5',
      text: 'What does a Cosine Similarity of 1.0 indicate for two embedding vectors?',
      options: [
        'The vectors are perpendicular (unrelated)',
        'The vectors point in opposite directions (antonyms)',
        'The vectors point in the exact same direction (semantically identical)',
        'The vectors represent short and long texts respectively'
      ],
      answer: 2,
      explanation: 'Cosine similarity measures the cosine of the angle between two vectors. A value of 1.0 means the angle is 0, indicating they point in the exact same direction.',
      hint: 'Consider the geometric definition: cos(0) = 1.',
      difficulty: 'medium',
      tags: ['embeddings', 'math'],
      timeLimit: 60
    }
  ],

  aiTutorPrompt: 'You are an expert AI Engineer tutoring a student on LLM Foundations (Transformers, Attention, Tokens, Embeddings, Function/Tool Calling). Provide concise explanations and focus on best practices for API integration.'
};
