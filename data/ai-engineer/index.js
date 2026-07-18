/**
 * data/ai-engineer/index.js — AI Engineer Roadmap 2026 Subject Manifest
 */
export default {
  id: 'ai-engineer',
  label: 'AI Engineer',
  
  color: 'var(--accent-cyan)',
  description: 'AI Engineer Roadmap 2026 — Placement, Internship, and Production Ready curriculum covering LLMs, Advanced RAG, LangGraph, MCP, and Agent Architecture.',
  chapters: [
    { id: 'llm-foundations',    title: 'Phase 0: LLM Foundations',       difficulty: 'easy',   estimatedTime: 45 },
    { id: 'retrieval-systems',  title: 'Phase 1: Retrieval Systems',     difficulty: 'medium', estimatedTime: 60 },
    { id: 'advanced-rag',       title: 'Phase 2: Advanced RAG',          difficulty: 'hard',   estimatedTime: 90 },
    { id: 'langgraph',          title: 'Phase 3: LangGraph',             difficulty: 'hard',   estimatedTime: 100 },
    { id: 'mcp',                title: 'Phase 4: Model Context Protocol', difficulty: 'hard',   estimatedTime: 85 },
    { id: 'production-ai',      title: 'Phase 5: Production AI Eng',      difficulty: 'medium', estimatedTime: 90 },
    { id: 'local-models',       title: 'Phase 6: Local Models & Inf',    difficulty: 'medium', estimatedTime: 75 },
    { id: 'ai-infra',           title: 'Phase 7: AI Infrastructure',     difficulty: 'medium', estimatedTime: 80 },
    { id: 'advanced-agents',    title: 'Phase 8: Advanced Agent Systems', difficulty: 'hard',   estimatedTime: 95 }
  ]
};
