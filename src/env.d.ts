/// <reference types="astro/client" />

/**
 * Minimal server-env typing for API routes. The project does not depend
 * on @types/node; this covers the `process.env` reads in server-only
 * route files (the key is never referenced from client code).
 */
declare const process:
  | {
      env: Record<string, string | undefined>;
    }
  | undefined;
