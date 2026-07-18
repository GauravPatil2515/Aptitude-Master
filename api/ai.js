/**
 * api/ai.js — AI API Layer
 *
 * In development/personal mode: calls Groq directly from client.
 * In SaaS/production (Phase 3): calls /api/groq Vercel Edge Function
 * so the API key is never exposed to the browser.
 *
 * To switch to production mode, set:
 *   localStorage.setItem('ai_mode', 'proxy')
 */

const GROQ_MODEL = 'llama-3.1-8b-instant';

/**
 * Main AI call function used by all pages.
 * @param {string} systemPrompt - Context/role for the AI
 * @param {string} userMessage  - The user's question
 * @returns {Promise<string>}   - AI response text
 */
export async function askAI(systemPrompt, userMessage) {
  const mode = localStorage.getItem('ai_mode') || 'direct';

  if (mode === 'proxy') {
    // Phase 3: call Vercel Edge Function (API key hidden server-side)
    return callProxy(systemPrompt, userMessage);
  }

  // Phase 1/2: direct call (personal use only — key from localStorage)
  return callDirect(systemPrompt, userMessage);
}

async function callDirect(systemPrompt, userMessage) {
  const apiKey = localStorage.getItem('groq_api_key');
  if (!apiKey) {
    throw new Error('No Groq API key found. Add it via Settings or set localStorage.groq_api_key.');
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system',  content: systemPrompt },
        { role: 'user',    content: userMessage },
      ],
      max_tokens: 600,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq API error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'No response from AI.';
}

async function callProxy(systemPrompt, userMessage) {
  // Vercel Edge Function — /api/groq.js in project root
  const res = await fetch('/api/groq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userMessage }),
  });
  if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
  const data = await res.json();
  return data.reply || 'No response.';
}

/**
 * Generate 5 similar questions for a given question (AI practice generator).
 * Stores in sessionStorage, not persisted.
 */
export async function generateSimilarQuestions(question, topic) {
  const prompt = `You are a placement exam question generator. Generate exactly 5 multiple-choice questions similar to this one:

Topic: ${topic}
Question: ${question.text}
Correct Answer: ${question.options[question.answer]}

Format each as JSON: { "text": "...", "options": ["A","B","C","D"], "answer": 0, "explanation": "..." }
Return a JSON array only, no extra text.`;

  const raw = await askAI('You are a placement exam question generator. Return only valid JSON arrays.', prompt);
  try {
    const parsed = JSON.parse(raw);
    sessionStorage.setItem('ai_generated_questions', JSON.stringify(parsed));
    return parsed;
  } catch(e) {
    console.warn('Failed to parse AI-generated questions:', e);
    return [];
  }
}
