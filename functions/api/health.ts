/**
 * Health endpoint — simple liveness check for the service.
 * Pages Function port of the former Astro endpoint (same URL, same body).
 * Previously: src/pages/api/health.ts (GET).
 */
export function onRequestGet(): Response {
  return new Response(JSON.stringify({ status: 'ok', service: 'ai-graphing-calculator' }), {
    headers: { 'content-type': 'application/json' },
  });
}
