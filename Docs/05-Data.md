# 📚 Data Layer (MOC)

All subject‑specific chapter data lives under `data/`. Each subject folder contains:

- `index.js` – manifest array with metadata for every chapter (id, title, icon, difficulty, estimatedTime).
- `<chapter-id>.js` – the actual chapter object exporting `{id, subject, title, icon, difficulty, estimatedTime, notes[], formulas[], shortcuts[], questions[], aiTutorPrompt}`.

## Subjects

### Aptitude
- [[data/aptitude/index.js]] – Manifest (13 chapters)
- Chapters:
  - [[data/aptitude/percentages.js]] – Percentages, increase/decrease, shortcuts.
  - [[data/aptitude/profit-loss.js]] – Profit & loss, CP/SP, discount.
  - [[data/aptitude/number-system.js]] – Divisibility, LCM/HCF, base conversion.
  - [[data/aptitude/hcf-lcm.js]] – HCF, LCM, applications.
  - [[data/aptitude/ratio-proportion.js]] – Ratios, proportions, partnership.
  - [[data/aptitude/time-work.js]] – Time & work, man‑days, pipes & cisterns.
  - [[data/aptitude/time-speed.js]] – Time, speed, distance, relative speed.
  - [[data/aptitude/simple-interest.js]] – Simple & compound interest, instalments.
  - [[data/aptitude/probability.js]] – Probability, permutations, combinations.
  - [[data/aptitude/permutation.js]] – Permutation & combination basics.
  - [[data/aptitude/logical-reasoning.js]] – Number series, coding‑decoding, blood relations.
  - [[data/aptitude/verbal-ability.js]] – Reading comprehension, grammar, vocab.
  - [[data/aptitude/data-interpretation.js]] – Tables, bar/line/pie charts, caselets.

### Core CS
- [[data/core-cs/index.js]]
- Chapters:
  - [[data/core-cs/os.js]] – Processes, threads, scheduling, memory management.
  - [[data/core-cs/dbms.js]] – Normalization, SQL, ACID, indexing.
  - [[data/core-cs/networks.js]] – OSI/TCP‑IP, subnetting, routing.
  - [[data/core-cs/oops.js]] – Encapsulation, inheritance, polymorphism, abstraction.

### DSA
- [[data/dsa/index.js]] – Manifest (topics with problems).
  * Includes Arrays & Strings, Two Pointers, Sliding Window, Binary Search, Trees, DP.
  * Each problem provides LeetCode‑style link, company tags, difficulty, importance, and a hint/pattern.

### ML
- [[data/ml/index.js]]
- Chapters:
  - [[data/ml/math-prereqs.js]] – Linear algebra, probability, calculus basics.
  - [[data/ml/core-ml.js]] – Regression, classification, clustering, evaluation metrics.
  - [[data/ml/deep-learning.js]] – Neural networks, CNN, RNN, Transformers.
  - [[data/ml/practical-ml.js]] – Data preprocessing, feature engineering, model deployment.

### SQL
- [[data/sql/index.js]]
- Chapters:
  - [[data/sql/basics.js]] – SELECT, WHERE, ORDER BY, LIMIT.
  - [[data/sql/joins.js]] – INNER, LEFT, RIGHT, FULL joins.
  - [[data/sql/aggregation.js]] – GROUP BY, HAVING, aggregate functions.
  - [[data/sql/subqueries.js]] – Scalar, correlated, EXISTS, CTE.
  - [[data/sql/window-fns.js]] – ROW_NUMBER, RANK, LAG/LEAD, window framing.

### AI Engineer
- [[data/ai-engineer/index.js]]
- Chapters:
  - [[data/ai-engineer/llm-foundations.js]] – Transformers, attention, tokenisation.
  - [[data/ai-engineer/retrieval-systems.js]] – Embedding stores, FAISS, hybrid search.
  - [[data/ai-engineer/advanced-rag.js]] – GraphRAG, CRAG, Agentic RAG.
  - [[data/ai-engineer/mcp.js]] – Model Context Protocol (JSON‑RPC 2.0, stdio/SSE).
  - [[data/ai-engineer/production-ai.js]] – Experiment tracking, evaluation, drift detection.
  - [[data/ai-engineer/local-models.js]] – Ollama, vLLM, GGUF/AWQ quantisation.
  - [[data/ai-engineer/ai-infra.js]] – FastAPI, PostgreSQL, Redis, Celery, Docker, Nginx.
  - [[data/ai-engineer/langgraph.js]] – StateGraph, persistence, human‑in‑the‑loop.
  - [[data/ai-engineer/advanced-agents.js]] – Tool use, planning, multi‑agent orchestration.

## Related

- [[00-Index]] – Main MOC.
- [[03-Pages]] – Pages that consume this data (chapter.js, practice.js, etc.).
- [[06-Styles]] – Styling for displaying notes, formulas, etc.
- [[01-API]] – AI layer that uses `aiTutorPrompt` from each chapter.

## Tags

#data #aptitude #corecs #dsa #ml #sql #ai-engineer

---