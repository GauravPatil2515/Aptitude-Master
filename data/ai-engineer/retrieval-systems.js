/**
 * data/ai-engineer/retrieval-systems.js — Phase 1: Retrieval Systems
 */
export default {
  id: 'ai-engineer-retrieval-systems',
  subject: 'ai-engineer',
  title: 'Phase 1: Retrieval Systems',
  icon: '🔍',
  difficulty: 'medium',
  estimatedTime: 60,
  prerequisites: ['llm-foundations'],

  notes: `
## Phase 1: Retrieval Systems

Before building advanced GraphRAG or Agentic structures, a solid mastery of vector retrieval systems is critical.

---

### 1. Embeddings & Search Pipeline

#### Embedding Models
*   **OpenAI Embeddings:** (\\\`text-embedding-3-small\\\`, \\\`text-embedding-3-large\\\`) — standard cloud model with dynamic dimension scaling.
*   **BGE (Beijing Academy of AI):** (\\\`bge-large-en-v1.5\\\`) — top-tier open-weight models optimized for retrieval.
*   **E5 (Microsoft):** Excellent multilingual open-source embeddings.
*   **Nomic Embeddings:** Outstanding open-source, long-context (8k+) embedding models.

#### Pipeline Mechanics
The basic embedding retrieval flow is:
1.  **Ingestion:** Split documents into chunks → Generate embedding vectors → Save in Vector Database.
2.  **Querying:** Embed user query → Compute similarity against chunk vectors → Return Top-K chunks → Inject into Prompt.

---

### 2. Vector Databases

*   **Qdrant (Primary):** Built in Rust, highly scalable, supports fast payload metadata filtering, and is the preferred open-source vector database in 2026.
*   **Pinecone:** Fully-managed cloud-native vector database, ideal for serverless and zero-ops environments.
*   **Weaviate:** Multi-modal vector database with native schema management.

---

### 3. Core Search Concepts

#### Similarity Metrics
*   **Cosine Similarity:** Measures the angle between vectors. Ideal when text lengths vary.
*   **Dot Product:** Faster calculation but requires vectors to be normalized.
*   **Euclidean Distance (L2):** Measures straight-line distance; lower is more similar.

#### Metadata Filters
Pre-filtering or post-filtering matches on attributes (e.g., \\\`userId\\\`, \\\`documentDate\\\`) to narrow search before similarity calculation, ensuring data isolation.

#### Hybrid Search
Combining sparse keyword search (BM25) with dense vector search to get the benefits of both exact keyword matching and semantic understanding.

#### Reranking
Retrieving a larger candidate pool (e.g., Top-50 chunks) via vector search, then using a specialized cross-encoder reranker model (like Cohere Rerank or BGE Reranker) to evaluate the query-chunk pairs, outputting a high-accuracy Top-5 chunks for the LLM.

---

### 4. Build: PDF Chatbot & Multi-PDF Assistant
Here is an example setup using Qdrant client in Python to index and query document chunks:

\\\`\\\`\\\`python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

# Init client in-memory
client = QdrantClient(":memory:")

# Create Collection
client.create_collection(
    collection_name="pdf_docs",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
)

# Insert Chunk
client.upsert(
    collection_name="pdf_docs",
    points=[
        PointStruct(
            id=1,
            vector=[0.02] * 1536, # Example embedding vector
            payload={"text": "LangGraph is used for agentic workflows.", "doc_id": "pdf_1"}
        )
    ]
)

# Search
results = client.search(
    collection_name="pdf_docs",
    query_vector=[0.02] * 1536,
    limit=1
)
print(results[0].payload["text"])
\\\`\\\`\\\`
  `,

  formulas: [
    { name: 'Dot Product', formula: 'A · B = ∑ A_i B_i', example: 'Fastest calculation for normalized vectors' },
    { name: 'BM25 Score (TF-IDF evolved)', formula: 'Score(D, Q) = ∑ IDF(q_i) · [f(q_i, D)(k_1 + 1)] / [f(q_i, D) + k_1(1 - b + b · |D|/avgdl)]', example: 'Matches term frequency and document length scaling' },
    { name: 'Reciprocal Rank Fusion (RRF)', formula: 'RRF_Score(d ∈ D) = ∑ 1 / (k + r_i(d))', example: 'Fuses ranks from vector search and BM25' }
  ],

  shortcuts: [
    'Always use hybrid search (Dense Vector + Sparse BM25) with Reranking in production.',
    'Use metadata filtering to enforce user access control at the database level instead of filtering in memory.',
    'Chunk sizes of 512 to 1024 tokens with 10% overlap are the most common starting baselines.'
  ],

  questions: [
    {
      id: 'rets-q1',
      text: 'Which vector similarity metric is best suited for comparing texts of widely different lengths because it measures orientation rather than magnitude?',
      options: ['Euclidean Distance (L2)', 'Cosine Similarity', 'Manhattan Distance (L1)', 'Dot Product without normalization'],
      answer: 1,
      explanation: 'Cosine similarity calculates the cosine of the angle between two vectors, focusing on orientation rather than magnitude, making it ideal for variable length text embeddings.',
      hint: 'It measures the angle θ between vectors.',
      difficulty: 'easy',
      tags: ['similarity', 'math'],
      timeLimit: 45
    },
    {
      id: 'rets-q2',
      text: 'What is the primary role of a Reranker model in a retrieval pipeline?',
      options: [
        'To generate faster embeddings for the user query',
        'To dynamically re-chunk documents in the vector store',
        'To re-evaluate top-k candidate chunks using a high-precision cross-encoder to select the most relevant ones',
        'To translate the user query into multiple languages before searching'
      ],
      answer: 2,
      explanation: 'Rerankers act as a second-stage retrieval step. They take coarse candidates from dense search and run a cross-encoder model to determine exact relevance, improving the final context quality.',
      hint: 'It takes a large set of candidates and narrows them down to a highly accurate small set.',
      difficulty: 'medium',
      tags: ['reranking', 'architecture'],
      timeLimit: 60
    },
    {
      id: 'rets-q3',
      text: 'In Qdrant, which approach ensures that a query search is restricted to a specific user\'s documents without retrieving and filtering in application memory?',
      options: ['Cosine Post-Filtering', 'Vector payload metadata filters', 'Creating a separate collection for every single document', 'Adding the user\'s name directly to the embedding vector'],
      answer: 1,
      explanation: 'Qdrant supports metadata payloads and filtering during the vector search phase (pre-filtering), which is efficient and preserves vector index structural search.',
      hint: 'Filtering is done via payload attributes during the index lookup.',
      difficulty: 'medium',
      tags: ['qdrant', 'filtering'],
      timeLimit: 60
    },
    {
      id: 'rets-q4',
      text: 'What does RRF (Reciprocal Rank Fusion) solve in hybrid search systems?',
      options: [
        'It speeds up the generation of token embeddings',
        'It merges and scores ranks from different search methods (e.g., BM25 and Vector Search) without normalizing raw scores',
        'It compresses vector dimensions from 1536 to 128',
        'It automatically updates document database entries'
      ],
      answer: 1,
      explanation: 'RRF is an algorithm to combine the rank lists of multiple retrieval systems (like keyword BM25 and dense vector search) into a single unified ranked list.',
      hint: 'It sums up the reciprocals of the ranks of documents from each list.',
      difficulty: 'hard',
      tags: ['hybrid-search', 'scoring'],
      timeLimit: 75
    },
    {
      id: 'rets-q5',
      text: 'Which open-source embedding model family is developed by the Beijing Academy of AI (BAAI) and regularly tops retrieval benchmarks?',
      options: ['OpenAI text-embedding', 'E5', 'BGE', 'Nomic'],
      answer: 2,
      explanation: 'BGE (BAAI General Embedding) is a family of highly performant retrieval-optimized models widely used in production RAG systems.',
      hint: 'BGE stands for BAAI General Embedding.',
      difficulty: 'easy',
      tags: ['models'],
      timeLimit: 45
    }
  ],

  aiTutorPrompt: 'You are an AI Engineer tutoring a student on Phase 1: Retrieval Systems. Explain embeddings, vector databases (Qdrant), similarity scoring, metadata filtering, hybrid search, and reranking. Provide code snippets and architectural tips.'
};
