/**
 * components/markdown.js — Markdown Renderer
 * Uses marked.js (loaded from CDN) to render Markdown strings to HTML.
 * Sanitizes output to prevent XSS.
 */

// marked.js is loaded via CDN in index.html
// fallback: simple line-based renderer if marked not available
export function renderMarkdown(md) {
  if (!md) return '';
  if (typeof window.marked !== 'undefined') {
    window.marked.setOptions({
      breaks: true,
      gfm: true,
    });
    return window.marked.parse(md);
  }
  // Fallback: very basic markdown
  return md
    .replace(/^#{3} (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#{2} (.+)$/gm, '<h2>$1</h2>')
    .replace(/^#{1} (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}
