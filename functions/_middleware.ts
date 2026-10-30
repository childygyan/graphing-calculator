// Cloudflare Pages Function: canonical-domain enforcement for graphingcalculator.online.
//
// Server-side 301 for the production pages.dev hostname (the 2026-09-29
// inline script in BaseLayout only bounces real browsers; bots and curl
// still got a 200 from graphing-calc.pages.dev):
//
//   https://graphing-calc.pages.dev/learn/  ->  301  https://graphingcalculator.online/learn/
//
// Also consolidates www onto the apex host (same outcome as the existing
// edge redirect, kept here as belt-and-suspenders).
//
// SCOPE — deliberately narrower than the height-calculator middleware:
// ONLY the exact production hostname is redirected. Preview deployments
// (<hash>.graphing-calc.pages.dev) pass straight through with 200, so the
// daily publish job can keep verifying deploy-preview URLs. A redirect
// loop is impossible: requests already on graphingcalculator.online
// always hit `context.next()`, and the apex is never redirected.
//
// Path and query string are preserved (Response.redirect keeps url.search;
// hash fragments are never sent to the server, browsers re-attach them).
//
// NOTE: this file only runs because the site is fully static (no Astro
// adapter, no dist/_worker.js). With the Cloudflare adapter in place,
// static pages bypassed the worker and this middleware never fired.
interface PagesMiddlewareContext {
  request: Request;
  next: () => Promise<Response>;
}

export async function onRequest(context: PagesMiddlewareContext): Promise<Response> {
  const url = new URL(context.request.url);

  if (
    url.hostname === 'graphing-calc.pages.dev' ||
    url.hostname === 'www.graphingcalculator.online'
  ) {
    url.protocol = 'https:';
    url.hostname = 'graphingcalculator.online';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
