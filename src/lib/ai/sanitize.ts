/**
 * Phase 6 XSS guard: escape AI-supplied text before rendering.
 *
 * The chat UI renders assistant text as plain text (whitespace-pre-wrap),
 * never via dangerouslySetInnerHTML. `escapeHtml` is defense-in-depth for
 * any path that interpolates AI text into markup, and `stripControlChars`
 * removes invisible characters models sometimes emit.
 */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escape the five HTML-significant characters. */
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch] ?? ch);
}

/** Remove C0/C1 control characters except \n, \r, \t. */
export function stripControlChars(text: string): string {
  return text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');
}

/** Full pipeline for AI text about to be displayed: strip, trim, escape. */
export function sanitizeAiText(text: string, maxLength = 4000): string {
  const cleaned = stripControlChars(text).trim();
  const truncated = cleaned.length > maxLength ? cleaned.slice(0, maxLength) + '…' : cleaned;
  return escapeHtml(truncated);
}
