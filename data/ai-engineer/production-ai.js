/**
 * data/ai-engineer/production-ai.js — Phase 5: Production AI Engineering
 */
export default {
  id: 'ai-engineer-production-ai',
  subject: 'ai-engineer',
  title: 'Phase 5: Production AI Eng',
  icon: '🚀',
  difficulty: 'medium',
  estimatedTime: 90,
  prerequisites: ['mcp'],

  notes: `
## Phase 5: Production AI Engineering

Most tutorials stop at building simple prototypes. Production AI engineering focuses on tracing execution, auditing costs, evaluating output metrics, and designing robust user interfaces.

---

### 1. Tracing & Debugging with LangSmith

When agents execute complex cycles, debugging stdout is impossible. **LangSmith** provides a centralized tracing platform:
*   **Traces:** Full step-by-step logs of node executions, prompt inputs, model outputs, and tool calls.
*   **Token Usage & Costs:** Metrics showing token counts (prompt, completion) and financial costs per run.
*   **Failure Analysis:** Pinpointing exactly where a tool failed or which step triggered an API rate limit.

---

### 2. LLM-Assisted Evaluation (Eval)

Instead of manual reviews, production systems run automated evaluation pipelines (using frameworks like **DeepEval** or **RAGAS**):
*   **Faithfulness:** Measures whether the LLM answer is grounded *only* in the retrieved context (checking for hallucinations).
*   **Answer Relevance:** Measures if the response directly addresses the user question.
*   **Groundedness:** Verifies if every fact in the response can be traced back to a source document.
*   **Tool Success Rate:** Audits how often the agent generates correct tool parameters and handles tool errors.

---

### 3. Agent UI Design

Modern Enterprise AI has evolved beyond standard, linear chat boxes. Production UIs require specialized views:
*   **Task View:** Displays the sub-task breakdown and execution status.
*   **Reasoning View:** Displays the model's internal thoughts (e.g. Chain-of-Thought or reasoning traces).
*   **Tool Calls:** Lists which tools were triggered, their arguments, and JSON outputs.
*   **Memory View:** Shows the user profile details and episoidic facts the agent is retaining.
*   **Approval View:** A modal that halts the interface and requests human review for pending actions.

---

### 4. Capstone Architecture
The ultimate production-ready system connects every piece of the stack:

\\\`\\\`\\\`
[ React Frontend ]
       │  (Task View, Reasoning View, Chat)
       ▼
[ FastAPI App ] ──(LangGraph Supervisor)
       │
       ├─► [ Research Agent ] ─► [ GraphRAG / Neo4j ] 
       │
       ├─► [ Coding Agent ] ───► [ MCP Server (Docker Sandbox) ]
       │
       ▼
[ LangSmith (Tracing & Latency) ]  <──► [ DeepEval CI/CD Pipeline ]
\\\`\\\`\\\`
  `,

  formulas: [
    { name: 'Faithfulness Score', formula: 'Faithfulness = (Number of Grounded Statements) / (Total Statements in Output)', example: 'Score ranges from 0.0 (full hallucination) to 1.0 (perfectly grounded)' },
    { name: 'Rerank Selection Condition', formula: 'Keep Top-K where Relevance Score ≥ 0.7', example: 'Filters poor semantic matches' }
  ],

  shortcuts: [
    'Integrate LangSmith tracing on Day 1 of development; debugging agent state without it is extremely slow.',
    'Always run evaluation sets on CI/CD pipelines before deploying new prompt templates or system schemas.',
    'Render intermediate agent reasoning to users (e.g., collapsible thoughts accordion) to make long latencies feel engaging.'
  ],

  questions: [
    {
      id: 'prd-q1',
      text: 'What primary problem does LangSmith trace logging solve during agent development?',
      options: [
        'It speeds up local model compilation times',
        'It maps, visualizes, and audits step-by-step executions, prompts, tool calls, and costs in complex nested graph runs',
        'It host vector indexes for faster document retrievals',
        'It compiles Cypher queries for Neo4j'
      ],
      answer: 1,
      explanation: 'LangSmith traces every call, nested step, and tool execution in a graph. This lets developers pinpoint where outputs drift or tool calls fail.',
      hint: 'It acts as a debugger for asynchronous, multi-step agent actions.',
      difficulty: 'easy',
      tags: ['langsmith', 'debugging'],
      timeLimit: 45
    },
    {
      id: 'prd-q2',
      text: 'In LLM evaluation frameworks (like DeepEval or RAGAS), what does the "Faithfulness" metric specifically check?',
      options: [
        'If the response contains grammatically correct English',
        'Whether the LLM output is strictly grounded in the retrieved context documents, preventing hallucinated answers',
        'If the model provider remains active',
        'The latency speed of the embedding model'
      ],
      answer: 1,
      explanation: 'Faithfulness evaluates if the claims made in the LLM response are supported by the provided source documents. A low score implies hallucination.',
      hint: 'It measures output truthfulness relative only to the retrieved source facts.',
      difficulty: 'medium',
      tags: ['evaluation', 'metrics'],
      timeLimit: 60
    },
    {
      id: 'prd-q3',
      text: 'Which UI design element is most critical for letting users verify an agent\'s complex plan before it acts?',
      options: ['A simple scrollbar', 'A task view showing the sub-task list, reasoning thoughts, and pending tool approvals', 'A dark/light theme toggle', 'A file upload button'],
      answer: 1,
      explanation: 'Exposing the sub-task tree and intermediate logic paths (reasoning/thoughts) helps users trust the agent and supervise its actions.',
      hint: 'It shows what the agent is planning and doing behind the scenes.',
      difficulty: 'easy',
      tags: ['ui', 'ux'],
      timeLimit: 45
    },
    {
      id: 'prd-q4',
      text: 'Why should evaluations be part of a CI/CD pipeline for AI applications?',
      options: [
        'To compile CSS styles before hosting',
        'To automatically verify that changes to system prompts, database schemas, or models do not degrade output accuracy or safety metrics',
        'To speed up model context windows',
        'To compress database payloads'
      ],
      answer: 1,
      explanation: 'A tiny prompt edit can break structural JSON schemas or introduce regressions. CI/CD evaluation runs pre-defined test cases to ensure safety and quality are maintained.',
      hint: 'It acts as unit testing for prompt engineering and model outputs.',
      difficulty: 'medium',
      tags: ['cicd', 'evaluation'],
      timeLimit: 60
    },
    {
      id: 'prd-q5',
      text: 'Which metric is calculated as the ratio of supported claims in the LLM answer to the total claims in that answer?',
      options: ['Groundedness / Faithfulness', 'Cosine Similarity', 'RRF rank score', 'Latency throughput'],
      answer: 0,
      explanation: 'Groundedness (or Faithfulness) counts the number of claims in the generated text that are explicitly present in the source chunks, divided by the total claims.',
      hint: 'It measures how well the claims are grounded in source text.',
      difficulty: 'hard',
      tags: ['evaluation', 'math'],
      timeLimit: 75
    }
  ],

  aiTutorPrompt: 'You are a Production AI Engineer tutoring a student on Phase 5: Production AI Engineering. Detail the use of LangSmith tracing, evaluation pipelines (DeepEval, RAGAS), grounding/faithfulness metrics, and advanced Agent UI configurations.'
};
