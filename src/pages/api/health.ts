/**
 * Health endpoint — simple liveness check for the service.
 */
export function GET() {
  return new Response(JSON.stringify({ status: 'ok', service: 'ai-graphing-calculator' }), {
    headers: { 'content-type': 'application/json' },
  });
}
