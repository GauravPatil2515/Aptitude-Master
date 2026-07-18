/**
 * data/ai-engineer/local-models.js — Phase 6: Local Models & Inference
 */
export default {
  id: 'ai-engineer-local-models',
  subject: 'ai-engineer',
  title: 'Phase 6: Local Models & Inf',
  
  difficulty: 'medium',
  estimatedTime: 75,
  prerequisites: ['production-ai'],

  notes: `
## Phase 6: Local Models & Inference

Relying entirely on closed-source cloud APIs is costly and poses data privacy concerns. Production AI engineering requires hosting, routing, and running open-weights models locally or on private clouds.

---

### 1. Local Inference Engines

*   **Ollama:** A user-friendly tool to run open-weights models (like Llama 3, Mistral, Qwen) locally on macOS, Linux, and Windows. It packages model weights, configs, and dependencies into a single "Modelfile".
*   **vLLM:** A high-throughput, memory-efficient LLM serving engine built for production. It uses **PagedAttention** to optimize GPU memory allocations.
*   **SGLang:** A fast serving engine that optimizes compiler passes and structural generation (like JSON output schemas) to deliver lower latency than vLLM.
*   **LM Studio:** A desktop application with a graphical interface to download and run local GGUF models.

---

### 2. Multi-Model Proxies & Gateways

*   **LiteLLM:** A lightweight translation proxy. It exposes a single OpenAI-compatible API format (e.g. \\\`/v1/chat/completions\\\`) and translates requests on-the-fly to over 100+ providers (Ollama, Anthropic, Bedrock, Gemini, Cohere, etc.).
*   **OpenRouter:** A cloud routing API service that lets developers query hundreds of open and closed models via a single API format.

---

### 3. Core Inference Concepts

#### Quantization (Compression)
Shrinking model weights from 16-bit floating point (FP16) to lower bit representations (8-bit, 4-bit) to reduce RAM/VRAM requirements with minimal accuracy loss.
*   **GGUF:** Designed for running on CPU and consumer hardware (heavily utilized by Ollama/LM Studio).
*   **AWQ / GPTQ:** Optimized for running on dedicated NVIDIA GPUs.

#### KV Cache
Storing the key-value vectors of previously processed tokens in memory during text generation, avoiding re-calculation. This dramatically speeds up generation but consumes large amounts of GPU memory.

#### Performance Metrics
*   **Time to First Token (TTFT):** The latency from sending a prompt to receiving the first character. Highly critical for interactive UIs.
*   **Throughput:** The total number of tokens generated per second across all users. Critical for background batch jobs.

---

### 4. Build: LiteLLM Router Config
Here is how to set up a unified LiteLLM router in Python to fallback automatically if an API fails:

\\\`\\\`\\\`python
from litellm import Router

# Define model fallbacks
model_list = [
    {
        "model_name": "production-model",
        "litellm_params": {
            "model": "openai/gpt-4o",
            "api_key": "sk-..."
        }
    },
    {
        "model_name": "production-model",
        "litellm_params": {
            "model": "anthropic/claude-3-5-sonnet",
            "api_key": "sk-ant-..."
        }
    }
]

router = Router(model_list=model_list, fallbacks=[{"production-model": ["anthropic/claude-3-5-sonnet"]}])

# Calls OpenAI first, falls back to Anthropic if OpenAI is rate-limited
# response = router.completion(model="production-model", messages=[{"role": "user", "content": "Hello"}])
\\\`\\\`\\\`
  `,

  formulas: [
    { name: 'Model Memory Rule of Thumb', formula: 'RAM_Required (GB) ≈ (Parameter_Count · Bit_Width) / 8 · 1.2', example: 'Llama-3 8B at 4-bit (GGUF) ≈ 8 · 4 / 8 · 1.2 ≈ 4.8 GB RAM' },
    { name: 'Throughput', formula: 'Throughput = Total Tokens / Total Duration (sec)', example: 'Used to measure GPU serving capacity' }
  ],

  shortcuts: [
    'Use Ollama for local prototyping and developer environments.',
    'Use vLLM or SGLang for serving open-source models (like Qwen or Llama 3) on production GPU instances.',
    'Integrate LiteLLM to keep your codebase provider-agnostic — switching models becomes a 1-line config change.'
  ],

  questions: [
    {
      id: 'lcl-q1',
      text: 'Which memory optimization technique is used by vLLM to manage the KV Cache, reducing GPU memory fragmentation?',
      options: ['Gradient Accumulation', 'PagedAttention', 'FlashAttention', 'Quantization'],
      answer: 1,
      explanation: 'vLLM introduces PagedAttention, which partitions the KV cache into logical blocks, similar to virtual memory paging in operating systems, eliminating fragmentation.',
      hint: 'It shares its name with memory management techniques in Operating Systems.',
      difficulty: 'hard',
      tags: ['vllm', 'memory'],
      timeLimit: 75
    },
    {
      id: 'lcl-q2',
      text: 'What format is the standard for compressed model weights running locally on CPU and consumer hardware?',
      options: ['FP16', 'GGUF', 'AWQ', 'Safetensors'],
      answer: 1,
      explanation: 'GGUF is designed for single-file, CPU-friendly execution of quantized models. It is the core format powering Ollama and LM Studio.',
      hint: 'It replaced the older GGML format.',
      difficulty: 'easy',
      tags: ['quantization', 'formats'],
      timeLimit: 45
    },
    {
      id: 'lcl-q3',
      text: 'What is the role of LiteLLM in an agent application?',
      options: [
        'To compress prompt templates',
        'To translate the OpenAI client request schema to various cloud and local model APIs dynamically',
        'To host local open-weights vector databases',
        'To visual log execution steps'
      ],
      answer: 1,
      explanation: 'LiteLLM acts as a translation gateway. It exposes a single OpenAI-style API and adapts it to query Bedrock, Anthropic, Ollama, etc.',
      hint: 'It allows developers to use a single client structure to query over 100 model APIs.',
      difficulty: 'medium',
      tags: ['litellm', 'routing'],
      timeLimit: 60
    },
    {
      id: 'lcl-q4',
      text: 'Which metric measures the time it takes for an LLM server to output the first token of a response?',
      options: ['Throughput', 'Time to First Token (TTFT)', 'KV cache lookup time', 'Cosine distance'],
      answer: 1,
      explanation: 'Time to First Token (TTFT) is a critical user experience metric, representing the initial delay before the response starts streaming to the user.',
      hint: 'It stands for TTFT.',
      difficulty: 'easy',
      tags: ['performance', 'metrics'],
      timeLimit: 45
    },
    {
      id: 'lcl-q5',
      text: 'How much VRAM is roughly required to load an 8 Billion parameter model in 4-bit quantization (plus 20% system overhead)?',
      options: ['4.8 GB', '8.0 GB', '16.0 GB', '32.0 GB'],
      answer: 0,
      explanation: 'Using the model memory formula: (8 * 4) / 8 * 1.2 = 4.8 GB RAM/VRAM.',
      hint: 'Parameters times bit width divided by 8, then multiplied by the overhead factor.',
      difficulty: 'medium',
      tags: ['quantization', 'math'],
      timeLimit: 60
    }
  ],

  aiTutorPrompt: 'You are a Local Inference Architect tutoring a student on Phase 6: Local Models & Inference. Detail Ollama Modelfiles, vLLM PagedAttention, LiteLLM gateway integrations, GGUF/AWQ compression formats, and TTFT/Throughput metrics.'
};
