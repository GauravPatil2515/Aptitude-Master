/**
 * api/groq.js — Vercel Edge Function (Phase 3 / SaaS)
 * Proxies requests to Groq API, keeping the API key server-side.
 *
 * Deploy: this file auto-detected by Vercel as an API route at /api/groq
 * Environment variable: GROQ_API_KEY (set in Vercel dashboard)
 */
export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const { systemPrompt, userMessage } = await req.json();

  if (!systemPrompt || !userMessage) {
    return new Response(JSON.stringify({ error: 'Missing systemPrompt or userMessage' }), { status: 400 });
  }

  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userMessage },
      ],
      max_tokens: 600,
      temperature: 0.7,
    }),
  });

  if (!groqRes.ok) {
    const err = await groqRes.json().catch(() => ({}));
    return new Response(JSON.stringify({ error: err?.error?.message || 'Groq error' }), { status: 502 });
  }

  const data = await groqRes.json();
  const reply = data.choices?.[0]?.message?.content || '';

  return new Response(JSON.stringify({ reply }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
