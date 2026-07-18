# 📡 API Module (MOC)

This note lists all files in the `api/` directory, which contain the client‑side AI layer and the Vercel Edge Function that proxies Groq requests.

## Files

- [[api/ai.js]] – Client‑side wrapper for `askAI()` and `generateSimilarQuestions()`. Handles direct vs proxy mode.
  * `askAI(systemPrompt, userMessage)` → sends request either directly to Groq (dev) or via `/api/groq` (prod).
  * `generateSimilarQuestions(question, topic)` → asks the LLM to create 5 similar MCQs, stores result in `sessionStorage`.
  * Uses `GROQ_MODEL = 'llama-3.1-8b-instant'`.
  * Reads/writes API key and mode from `localStorage` (`groq_api_key`, `ai_mode`).

- [[api/groq.js]] – Vercel Edge Function that hides the Groq API key; called from `api/ai.js` when `localStorage.ai_mode === 'proxy'`.
  * Expects POST JSON `{systemPrompt, userMessage}`.
  * Calls Groq with the server‑side `GROQ_API_KEY` env var.
  * Returns JSON `{reply}`.
  * Configured as Edge function for low latency.

## Related

- [[00-Index]] – Return to the main Map of Content.
- [[02-Modules]] – Optional AI advisor module (`modules/ai.js`) that builds on this layer.
- [[03-Pages]] – AI Tutor page (`pages/ai-tutor.js`) consumes this API.

## Tags

#api #ai #groq

---