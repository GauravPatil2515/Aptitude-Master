/**
 * data/ai-engineer/advanced-rag.js — Phase 2: Advanced RAG
 */
export default {
  id: 'ai-engineer-advanced-rag',
  subject: 'ai-engineer',
  title: 'Phase 2: Advanced RAG',
  icon: '🕸️',
  difficulty: 'hard',
  estimatedTime: 90,
  prerequisites: ['retrieval-systems'],

  notes: `
## Phase 2: Advanced RAG & Context Architecture

Standard vector RAG fails when query answering requires connecting multi-hop relationships or summarizing global document themes. This is where Knowledge Graphs and GraphRAG come in.

---

### 1. Knowledge Graphs & Neo4j

*   **Knowledge Graph (KG):** A network of nodes (entities like People, Concepts, Companies) and directed edges (relationships like WORKED_AT, IS_A, RELATED_TO) representing structured factual data.
*   **Neo4j:** The leading graph database. It stores graph data natively as nodes and relationships.
*   **Cypher:** The graph query language used by Neo4j to query relational patterns.
    *   *Example Cypher query:*
        \\\`\\\`\\\`cypher
        MATCH (p:Person {name: "Gaurav"})-[:WORKED_AT]->(c:Company)
        RETURN c.name
        \\\`\\\`\\\`

---

### 2. GraphRAG

GraphRAG combines the semantic search of vector embeddings with structured graph networks. The pipeline consists of:
1.  **Entity Extraction:** Parsing unstructured documents using an LLM to extract entities and their relationships.
2.  **Graph Construction:** Saving the extracted entities and relationships as nodes and edges in a graph database (Neo4j).
3.  **Graph Retrieval:** Using the graph structure to retrieve connected entities and multi-hop context.
    *   **Text2Cypher:** An LLM generates a Cypher query from a user's natural language question, executes it against Neo4j, and answers the question with the structured query results.

---

### 3. Hybrid Retrieval & Advanced Pipelines

#### Hybrid Retrieval (Vector + Graph)
Combining dense semantic search (vector database like Qdrant) with relational link search (graph database like Neo4j) to fetch both global concepts and exact relational patterns.

#### Self-Correcting Retrieval (Corrective RAG - CRAG)
Adding validation loops to the retrieval process:
1.  **Context Validation:** Assessing if retrieved chunks are relevant.
2.  **Query Rewriting:** If context is insufficient, rewrite the query to perform a web search or retrieve from a different index.
3.  **Reflection Loop:** Evaluate generated answers against the source documents (hallucination checks).

#### Agentic RAG
Moving away from a static "Retrieve then Generate" pipeline. Instead, an LLM agent determines the routing at runtime: it analyzes the question and selects whether to call a Vector database tool, a Web Search tool, a Graph query tool, or a combination.

---

### 4. Build: Text2Cypher Agent
An agent pattern in Python that executes a text-to-graph search:

\\\`\\\`\\\`python
from neo4j import GraphDatabase

class Text2CypherAgent:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def run_query(self, cypher_query):
        with self.driver.session() as session:
            result = session.run(cypher_query)
            return [record.data() for record in result]

# User asks: "Find all papers written by Author X"
# LLM converts it to: "MATCH (a:Author {name: 'Author X'})-[:WROTE]->(p:Paper) RETURN p.title"
# Agent runs query on Neo4j and returns titles.
\\\`\\\`\\\`
  `,

  formulas: [
    { name: 'Multi-Hop Complexity', formula: 'O(D^k)', example: 'D = Average node degree, k = Graph path hop distance' },
    { name: 'Self-Correction Condition', formula: 'Score(Chunk) < Threshold ➔ Trigger Query Rewrite', example: 'Prevents garbage-in garbage-out LLM generation' }
  ],

  shortcuts: [
    'Use GraphRAG when the user needs to answer complex multi-hop questions ("How is A related to C through B?").',
    'Generate Cypher queries using strict System Prompts with schema definitions to avoid syntax errors.',
    'Always validate Cypher queries against a read-only transaction user in Neo4j to prevent SQL/Cypher injections.'
  ],

  questions: [
    {
      id: 'adr-q1',
      text: 'What query language is natively used to query relationships and entities in a Neo4j database?',
      options: ['SQL', 'Cypher', 'GraphQL', 'SPARQL'],
      answer: 1,
      explanation: 'Cypher is Neo4j\'s declarative graph query language, designed to match visual graph patterns using ASCII-art syntax.',
      hint: 'It shares its name with a character from The Matrix.',
      difficulty: 'easy',
      tags: ['neo4j', 'cypher'],
      timeLimit: 45
    },
    {
      id: 'adr-q2',
      text: 'Which type of retrieval is specifically designed to solve "multi-hop" questions where facts are spread across multiple unrelated documents?',
      options: ['Standard Vector RAG', 'Hybrid Keywords + Vectors', 'GraphRAG', 'Static Keyword Filtering'],
      answer: 2,
      explanation: 'GraphRAG links concepts and entities as nodes and edges, allowing algorithms to traverse relations across different documents in a multi-hop fashion.',
      hint: 'It leverages entity connections (graphs) instead of flat vector similarity alone.',
      difficulty: 'medium',
      tags: ['graphrag', 'architecture'],
      timeLimit: 60
    },
    {
      id: 'adr-q3',
      text: 'In a Self-Correcting RAG pipeline, what happens if the retrieved document chunks fail relevance validation checks?',
      options: [
        'The pipeline crashes immediately with an error',
        'The query is rewritten and sent to web search or secondary databases',
        'The model is forced to fine-tune on the spot',
        'The pipeline bypasses retrieval and answers from pre-trained weights'
      ],
      answer: 1,
      explanation: 'Self-correcting RAG evaluates candidate documents, and if they are judged irrelevant, it rewrites the user query and tries alternative retrieval sources (like Google search or fallback databases).',
      hint: 'It takes corrective action by searching elsewhere or rewriting the prompt.',
      difficulty: 'medium',
      tags: ['crag', 'self-correction'],
      timeLimit: 60
    },
    {
      id: 'adr-q4',
      text: 'What is the main difference between standard RAG and Agentic RAG?',
      options: [
        'Agentic RAG runs entirely offline without APIs',
        'Agentic RAG uses an LLM to dynamically select which databases, tools, or web sources to query at runtime',
        'Agentic RAG does not use vector embeddings',
        'Agentic RAG is twice as cheap as standard RAG'
      ],
      answer: 1,
      explanation: 'Agentic RAG introduces dynamic decision-making. The LLM acts as an agent deciding whether it needs to fetch info, from which tool (Vector DB, Web, Graph), and repeats until it has sufficient facts.',
      hint: 'Think of the difference between a static sequential script and a decision-making agent.',
      difficulty: 'medium',
      tags: ['agentic-rag'],
      timeLimit: 60
    },
    {
      id: 'adr-q5',
      text: 'How can you protect a Neo4j database from malicious database modifications when using LLM-generated Cypher queries (Text2Cypher)?',
      options: [
        'By disabling the database entirely during requests',
        'By executing Cypher queries using a read-only user session',
        'By storing the database credentials in the LLM system prompt',
        'By using L2 normalization on Cypher keywords'
      ],
      answer: 1,
      explanation: 'To prevent Text2Cypher agents from executing destructive commands (like DELETE or DETACH DELETE), queries must run under read-only user credentials with strict access controls.',
      hint: 'Ensure the credentials can only retrieve (read) data, not write or delete it.',
      difficulty: 'hard',
      tags: ['security', 'neo4j'],
      timeLimit: 75
    }
  ],

  aiTutorPrompt: 'You are an AI Engineer tutoring a student on Phase 2: Advanced RAG. Focus on Neo4j, Cypher querying, GraphRAG extraction, self-correcting loops (CRAG), and runtime tool routing in Agentic RAG. Explain with practical architectural examples.'
};
