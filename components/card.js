/**
 * components/card.js — Reusable Card Primitive
 * Creates a standard card element with optional title, icon, and body.
 */
export function createCard({ title, icon, body, className = '' } = {}) {
  const card = document.createElement('div');
  card.className = `card ${className}`;
  if (title) {
    const header = document.createElement('div');
    header.className = 'card-title';
    header.innerHTML = `${icon ? `<span>${icon}</span>` : ''}${title}`;
    card.appendChild(header);
  }
  if (body) {
    const content = document.createElement('div');
    content.className = 'card-body';
    if (typeof body === 'string') content.innerHTML = body;
    else content.appendChild(body);
    card.appendChild(content);
  }
  return card;
}
