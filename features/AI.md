---
title: AI Features
type: feature-doc
tags:
  - ai
  - groq
  - tutor
  - llm
  - placement-prep
  - obsidian-doc
status: active
date: 2026-06-15
aliases:
  - AI Integration
  - AI Tutor
  - Groq Integration
cssclasses: dashboard
---

# 🤖 AI Features

All AI integration points in [[AptitudeMaster]]. The AI layer powers the full AI Tutor chat, in-chapter explanations, quiz question explanations, and dynamic question generation.

Related: [[PROJECT.md]] · [[api/ai.js]] · [[api/groq.js]] · [[pages/ai-tutor.js]]

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  Browser (Client)                                       │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  [[api/ai.js]] — Client AI Layer                 │   │
│  │  • askAI(systemPrompt, userMessage) → string     │   │
│  │  • generateSimilarQuestions(question, topic)     │   │
│  │  • Mode: 'direct' (dev) | 'proxy' (prod)        │   │
│  └──────────────┬──────────────────┬────────────────┘   │
│                  │                  │                    │
│     ┌────────────▼──────┐  ┌───────▼──────────────┐    │
│     │  Direct Mode      │  │  Proxy Mode          │    │
│     │  → api.groq.com   │  │  → /api/groq (Vercel│    │
│     │  (key from LS)    │  │    Edge Function)    │    │
│     └───────────────────┘  └──────────────────────┘    │
│                                                         │
│  Consumers:                                             │
│  • [[pages/ai-tutor.js]] — Full AI Tutor chat           │
│  • [[pages/chapter.js]]  — "Ask AI to Explain" drawer   │
│  • [[pages/practice.js]] — Post-answer AI explain       │
│  • [[modules/ai.js]]     — Smart advisor (Phase B)      │
└─────────────────────────────────────────────────────────┘
```

---

## AI Feature Matrix

| Feature | Location | User Action | AI Context | Tags |
|---|---|---|---|---|
| **Full AI Tutor** | `#/ai-tutor` → [[pages/ai-tutor.js]] | Open AI Tutor page, type or use quick prompts | Global placement prep tutor (branch + target company aware) | `#ai` `#tutor` `#chat` |
| **Chapter AI Drawer** | Any chapter page → [[pages/chapter.js]] | Click "🧠 Ask AI to Explain" button | Per-chapter system prompt (`aiTutorPrompt` from data module) | `#ai` `#chapter` `#drawer` |
| **Practice AI Explain** | Practice quiz → [[pages/practice.js]] | After answering, click "Ask AI to Explain →" | Question-specific context (text, correct answer, existing explanation) | `#ai` `#practice` `#explain` |
| **Roadmap Generator** | `#/ai-tutor` → [[pages/ai-tutor.js]] | Fill branch + target, click "Generate Roadmap ✨" | Personalized 30-day roadmap based on branch + target company | `#ai` `#roadmap` `#tutor` |
| **Quick Prompts** | `#/ai-tutor` → [[pages/ai-tutor.js]] | Click any quick prompt button | Pre-written prompts for revision plans, shortcuts, etc. | `#ai` `#quick-prompt` `#tutor` |
| **Similar Question Gen** | Backend: [[api/ai.js]] `generateSimilarQuestions()` | Programmatic (Phase B) | Generates 5 MCQs similar to a given question | `#ai` `#generation` `#practice` |
| **Weak Topic Advisor** | [[modules/ai.js]] (Phase B) | Automatic, based on quiz scores | Analyzes `mistakes[]` in state to suggest weak areas | `#ai` `#advisor` `#phase-b` |

```dataview
TABLE location, tags
FROM #ai
SORT file.name ASC
```

---

## API Modes

### Direct Mode (Default / Dev)

- `localStorage.ai_mode` is unset or `'direct'`
- Calls `https://api.groq.com/openai/v1/chat/completions` from the browser
- API key stored in `localStorage.groq_api_key`
- **Key is exposed to browser** — personal/dev use only
- Model: `llama-3.1-8b-instant`

### Proxy Mode (Phase 3 / Production)

- `localStorage.ai_mode = 'proxy'`
- Calls `/api/groq` (Vercel Edge Function → [[api/groq.js]])
- API key in `process.env.GROQ_API_KEY` (server-side, never exposed)
- Same model, same parameters

```bash
# Switch to proxy mode
localStorage.setItem('ai_mode', 'proxy')

# Switch back to direct
localStorage.setItem('ai_mode', 'direct')
```

---

## `askAI()` Function Reference

```js
import { askAI } from './api/ai.js';

// Basic call
const reply = await askAI(
  'You are a placement prep tutor.',   // systemPrompt
  'Explain profit and loss shortcuts.' // userMessage
);

// Returns: string (AI response text)
// Throws: Error if no API key (direct) or HTTP error
```

`'llama-3.1-8b-instant'`
- `systemRole`: system-level instructions
- `max_tokens`: 600
- `temperature`: 0.7

---

## `generateSimilarQuestions()` Function Reference

```js
import { generateSimilarQuestions } from './api/ai.js';

const questions = await generateSimilarQuestions(
  { text: '...', options: ['A','B','C','D'], answer: 0 },
  'Percentages'
);

// Returns: array of question objects (parsed from AI JSON)
// Side-effect: stores JSON in sessionStorage.ai_generated_queries
```

---

## Per-Chapter `aiTutorPrompt` Reference

Every chapter data module exports an `aiTutorPrompt` field that scopes the AI tutor to that chapter's topic. Used by [[pages/chapter.js]] and [[pages/practice.js]].

### Aptitude

| Chapter | `aiTutorPrompt` Focus | File |
|---|---|---|
| Percentages | Shortcuts, common tricks, pattern recognition | [[data/aptitude/percentages.js]] |
| Profit & Loss | CP/SP relationships, formula confusions, shortcuts | [[data/aptitude/profit-loss.js]] |
| Number System | Divisibility rules, unit digit cycles, factor counting | [[data/aptitude/number-system.js]] |
| HCF & LCM | Product formula, remainder-type problems, prime factorization | [[data/aptitude/hcf-lcm.js]] |
| Ratio & Proportion | Combining ratios, Componendo & Dividendo | [[data/aptitude/ratio-proportion.js]] |
| Time & Work | LCM efficiency method, pipes & cisterns | [[data/aptitude/time-work.js]] |
| Time, Speed & Distance | 5/18 rule, average speed traps, trains, boats & streams | [[data/aptitude/time-speed.js]] |
| Simple & Compound Interest | SI vs CI, CI−SI shortcut, exam traps | [[data/aptitude/simple-interest.js]] |
| Probability | Complement rule, dice/card/ball problems | [[data/aptitude/probability.js]] |
| Permutation & Combination | nPr vs nCr, circular permutations, complement trick | [[data/aptitude/permutation.js]] |
| Logical Reasoning | Number series, coding-decoding, blood relations | [[data/aptitude/logical-reasoning.js]] |
| Verbal Ability | RC strategy, grammar rules, vocabulary roots | [[data/aptitude/verbal-ability.js]] |
| Data Interpretation | Table/Caselet/Bar/Pie, percentage shortcuts | [[data/aptitude/data-interpretation.js]] |

### Core CS

| Chapter | `aiTutorPrompt` Focus | File |
|---|---|---|
| Operating Systems | Process management, scheduling, deadlock, memory | [[data/core-cs/os.js]] |
| DBMS | Normalization, SQL joins, ACID, indexing | [[data/core-cs/dbms.js]] |
| Computer Networks | OSI model, TCP/UDP, IP addressing, subnetting | [[data/core-cs/networks.js]] |
| OOPs | 4 pillars, access modifiers, overloading/overriding | [[data/core-cs/oops.js]] |

### SQL

| Chapter | `aiTutorPrompt` Focus | File |
|---|---|---|
| SQL Basics | SELECT, WHERE, GROUP BY, HAVING, execution order | [[data/sql/basics.js]] |
| SQL Joins | INNER, LEFT, RIGHT, FULL, CROSS, SELF joins | [[data/sql/joins.js]] |
| Aggregation & GROUP BY | Aggregate functions, HAVING vs WHERE | [[data/sql/aggregation.js]] |
| Subqueries & CTEs | Scalar/correlated, EXISTS vs IN, recursive CTEs | [[data/sql/subqueries.js]] |
| Window Functions | ROW_NUMBER, RANK, LAG/LEAD, top-N-per-group | [[data/sql/window-fns.js]] |

### ML

| Chapter | `aiTutorPrompt` Focus | File |
|---|---|---|
| Math Prerequisites | Linear algebra, calculus, probability, gradient descent | [[data/ml/math-prereqs.js]] |
| Core ML Algorithms | Supervised/unsupervised, regression, trees, SVM, K-Means | [[data/ml/core-ml.js]] |
| Deep Learning | Neural networks, CNN, RNN, Transformers, Adam | [[data/ml/deep-learning.js]] |
| Practical ML | ML workflow, preprocessing, ensembles, imbalanced data | [[data/ml/practical-ml.js]] |

### AI Engineer

| Chapter | `aiTutorPrompt` Focus | File |
|---|---|---|
| LLM Foundations | Transformers, Attention, Tokens, Embeddings | [[data/ai-engineer/llm-foundations.js]] |
| Retrieval Systems | Embeddings, Qdrant, hybrid search, reranking | [[data/ai-engineer/retrieval-systems.js]] |
| Advanced RAG | Neo4j, GraphRAG, CRAG, Agentic RAG | [[data/ai-engineer/advanced-rag.js]] |
| MCP (Model Context Protocol) | JSON-RPC 2.0, Stdio vs SSE, FastMCP, Docker sandboxing | [[data/ai-engineer/mcp.js]] |
| Production AI Engineering | LangSmith, DeepEval, RAGAS, grounding metrics | [[data/ai-engineer/production-ai.js]] |
| Local Models & Inference | Ollama, vLLM, GGUF/AWQ, TTFT/Throughput | [[data/ai-engineer/local-models.js]] |
| AI Infrastructure | FastAPI, PostgreSQL, Redis, Celery, Docker, Nginx | [[data/ai-engineer/ai-infra.js]] |
| LangGraph | StateGraphs, TypedDict, Persistence, Human-in-the-loop | [[data/ai-engineer/langgraph.js]] |

```dataview
TABLE subject, chapter
FROM #ai-tutor-prompt
SORT subject ASC
```

---

## AI Tutor Page — Quick Prompts

Defined in [[pages/ai-tutor.js]]:

| Prompt | Purpose |
|---|---|
| "Give me a 7-day revision plan for aptitude" | 📅 Revision planning |
| "What are the top 5 aptitude shortcuts for TCS NQT?" | ⚡ TCS-specific shortcuts |
| "Explain time and work problems with examples" | ⏱ Concept deep-dive |
| "Give me 5 hard SQL interview questions with answers" | 🗃️ Interview prep |

---

## State Fields Used by AI

From [[state/store.js]]:

```js
{
  profile: {
    branch: 'CSE',        // Used in AI Tutor roadmap generation
    target: 'TCS',        // Used in AI Tutor roadmap generation
    name: '',             // Displayed in greeting
  },
  mistakes: [],           // Used by Phase B weak-topic advisor
  scores: {               // Used by Phase B weak-topic advisor
    'aptitude/percentages': 85,
  },
}
```

---

## Adding AI to a New Chapter

1. Add `aiTutorPrompt` to the chapter data module:
   ```js
   export default {
     // ... other fields
     aiTutorPrompt: 'You are a tutor for [TOPIC]. Focus on [KEY CONCEPTS]. Keep answers concise with examples.',
   };
   ```
2. The [[pages/chapter.js]] AI drawer picks it up automatically.
3. The [[pages/practice.js]] AI explain uses question-level context (no prompt needed).

---

## Error Handling

| Error | Cause | User Sees |
|---|---|---|
| `No Groq API key found` | `localStorage.groq_api_key` is empty (direct mode) | "AI unavailable. Check your API key in settings." |
| `Groq API error: 401` | Invalid API key | Error message from Groq |
| `Proxy error: 502` | Edge Function failed | "AI unavailable" |
| JSON parse failure in `generateSimilarQuestions()` | AI returned non-JSON | Empty array (console warning) |

---

```dataview
LIST FROM #ai
SORT file.name ASC
```
