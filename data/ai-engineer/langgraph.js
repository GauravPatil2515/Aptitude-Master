/**
 * data/ai-engineer/langgraph.js — Phase 3: LangGraph
 */
export default {
  id: 'ai-engineer-langgraph',
  subject: 'ai-engineer',
  title: 'Phase 3: LangGraph',
  icon: '⛓️',
  difficulty: 'hard',
  estimatedTime: 100,
  prerequisites: ['advanced-rag'],

  notes: `
## Phase 3: LangGraph & Agentic Orchestration

For complex, cyclic processes (such as iterative coding, editing, and planning), standard linear pipelines fail. LangGraph, developed by LangChain, allows building stateful, multi-agent systems with cycles and graph structures.

---

### 1. State Management & Graphs

*   **State Schema:** The central data structure shared and mutated by nodes in a graph, typically defined using Pydantic or Python's \`TypedDict\`.
*   **Reducers:** Functions that define how to merge updates into a state field (e.g., appending new messages to a list rather than overwriting it).
*   **Persistence:** Storing the graph state in a database (like SQLite or Postgres) at every step, enabling history traversal, error recovery, and short-term memory.

---

### 2. Human In The Loop (HITL)

Agent autonomy must be constrained for high-risk actions. LangGraph enables:
*   **Interrupts:** Pausing graph execution *before* running a specific node (e.g., \`send_email_node\`).
*   **Approval Flow:** A human reviews the pending state, modifies it if necessary, and signals the graph to resume or abort.

---

### 3. Multi-Agent Topologies

*   **Supervisor Pattern:** A single manager LLM routes tasks to worker agents (e.g., Coder, Researcher), aggregates their results, and determines when the overall task is complete.
*   **Swarm Pattern (Choreography):** Agents interact dynamically without a central supervisor, transitioning to other agents based on local output logic.
*   **Hierarchical Pattern:** Multiple supervisor-worker teams nested inside a top-level organization.

---

### 4. Reflection & Memory Systems

#### Reflection Loops (Self-Correction)
An agent generates a draft (e.g., code or essay), a **Critic Agent** reviews it against criteria, and a **Rewrite Agent** updates it. This iterative loop runs until the critic approves or a maximum cycle count is reached.

#### Long-Term Memory
Modern agents in 2026 separate memory into:
*   **Working Memory:** The active context of the current conversation.
*   **Episodic Memory:** Recalling past interaction episodes (e.g., "The user mentioned yesterday that they prefer Python").
*   **Semantic Memory:** General factual concepts learned over time.
*   **Mem0:** A specialized open-source long-term memory layer that updates user profiles dynamically.

---

### 5. Build: Stateful Reflection Agent
Here is a simplified LangGraph script showing state updates and conditional edges:

\\\`\\\`\\\`python
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

# 1. State definition
class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    needs_review: bool

# 2. Nodes
def call_model(state: AgentState):
    # Call LLM and generate text...
    return {"messages": ["Draft response"], "needs_review": True}

def human_check(state: AgentState):
    # Trigger an interrupt in real execution
    return state

# 3. Graph compilation
workflow = StateGraph(AgentState)
workflow.add_node("agent", call_model)
workflow.add_node("human_check", human_check)

workflow.add_edge(START, "agent")
workflow.add_edge("agent", "human_check")
workflow.add_edge("human_check", END)

app = workflow.compile()
# app.invoke({"messages": [("user", "Write an email")]})
\\\`\\\`\\\`
  `,

  formulas: [
    { name: 'State Aggregator (add_messages)', formula: 'State_new = State_old + Message_delta', example: 'Appends delta lists to maintain chat history' },
    { name: 'Reflection Criterion', formula: 'Iterate until Score(Output) ≥ Threshold OR Iteration = Max_Cycles', example: 'Guarantees execution halts' }
  ],

  shortcuts: [
    'Use LangGraph instead of LangChain/LlamaIndex pipelines if your agent needs loops (cycles).',
    'Enable checkpointers (persistence) to support chat history, session restoration, and human approval interrupts.',
    'Always set a recursion limit (e.g. 50 steps) on graph execution to avoid infinite loops that drain API tokens.'
  ],

  questions: [
    {
      id: 'lng-q1',
      text: 'What is the role of a "Reducer" in a LangGraph State Schema?',
      options: [
        'To reduce the token usage of the messages array by 50%',
        'To define how state updates are merged or accumulated into an existing state key',
        'To compress the model weights for local execution',
        'To convert Python dictionaries to JSON-RPC strings'
      ],
      answer: 1,
      explanation: 'Reducers specify how updates are integrated. For example, add_messages is a reducer that appends new messages instead of overwriting the previous list.',
      hint: 'Think of Redux or array reduce functions; it combines old state with new updates.',
      difficulty: 'medium',
      tags: ['state', 'reducers'],
      timeLimit: 60
    },
    {
      id: 'lng-q2',
      text: 'Which LangGraph capability is used to halt execution before a high-risk node (e.g., executing shell command) and wait for human confirmation?',
      options: ['State Schemas', 'Interrupts / Human-in-the-loop', 'Reflection Nodes', 'Checkpointers alone'],
      answer: 1,
      explanation: 'Interrupts pause graph execution before a specific node is run. The graph\'s state is saved, and execution is resumed after human approval.',
      hint: 'It interrupts the normal autonomous flow of the agent.',
      difficulty: 'medium',
      tags: ['hitl', 'interrupts'],
      timeLimit: 60
    },
    {
      id: 'lng-q3',
      text: 'In multi-agent systems, what is the "Supervisor" pattern?',
      options: [
        'A system where agents vote democratically on the next action',
        'A pattern where a central manager agent decides which specialist worker agent to call next and when the task is done',
        'An offline agent that monitors token cost and errors',
        'A compiler that parses Cypher queries for Neo4j'
      ],
      answer: 1,
      explanation: 'The supervisor pattern uses a central orchestrator model that receives user input, delegates sub-tasks to downstream specialist agents, and compiles the final answer.',
      hint: 'One boss directing multiple specialized workers.',
      difficulty: 'medium',
      tags: ['multi-agent', 'topologies'],
      timeLimit: 60
    },
    {
      id: 'lng-q4',
      text: 'Which memory type is used to recall facts across different chat sessions, such as a user\'s coding style preferences?',
      options: ['Working Memory', 'Short-Term Checkpointer Memory', 'Episodic/Long-Term Memory (e.g., Mem0)', 'KV Cache'],
      answer: 2,
      explanation: 'Episodic and long-term memory systems (like Mem0) store and recall user preferences, facts, and profile updates across multiple unrelated chat sessions.',
      hint: 'It persists across different conversation instances.',
      difficulty: 'medium',
      tags: ['memory', 'mem0'],
      timeLimit: 60
    },
    {
      id: 'lng-q5',
      text: 'What happens if a LangGraph agent enters an infinite loop without a recursion limit set?',
      options: [
        'The database automatically self-corrects the logic error',
        'The graph throws an error immediately on the second cycle',
        'The loop continues indefinitely, potentially consuming thousands of dollars in LLM API tokens',
        'The LLM switches providers automatically to save costs'
      ],
      answer: 2,
      explanation: 'Without a configured recursion limit, logical loop bugs can cause the graph to execute nodes and query LLM endpoints endlessly, exhausting API quotas and budgets.',
      hint: 'Unlimited API calls lead to massive token consumption.',
      difficulty: 'easy',
      tags: ['best-practices', 'debugging'],
      timeLimit: 45
    }
  ],

  aiTutorPrompt: 'You are an AI Orchestration expert tutoring a student on LangGraph. Explain StateGraphs, TypedDict state, Reducers, Persistence (SQLite/Postgres), Human-in-the-loop interrupts, Multi-Agent routing patterns, and Long-Term Memory (Mem0).'
};
