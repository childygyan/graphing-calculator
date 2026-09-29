/**
 * English errors dictionary — 404/500 pages, error boundaries, and
 * server-side API error copy. The `api` strings are server-generated;
 * they stay wired to the endpoint for now and are documented here so the
 * future refactor has them in one place.
 */

import type { ErrorsStrings } from '../types.js';

export const errors: ErrorsStrings = {
  notFound: {
    title: 'Page not found',
    description:
      "The page you were looking for doesn't exist. Head back to the graphing calculator or homepage.",
    heading: 'Page not found',
    body: "This page doesn't exist. It may have been moved, or the link may be wrong.",
    homeCta: 'Go back home',
  },
  serverError: {
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Return to the graphing calculator or homepage.',
    heading: 'Something went wrong',
    body:
      'An unexpected error occurred while loading this page. Your saved graphs are stored in ' +
      'your browser and are safe — try reloading, or head back home.',
    homeCta: 'Go back home',
    calculatorCta: 'Open the calculator',
  },
  errorBoundary: {
    defaultTitle: 'Something went wrong',
    message:
      'An unexpected error interrupted this part of the page. Your other data is unaffected.',
    retry: 'Try again',
  },
  api: {
    rateLimited: 'Too many AI requests. Please wait a moment and try again.',
    invalidJson: 'Request body must be valid JSON.',
    serviceUnavailable: 'The AI service is unavailable right now. Please try again later.',
    invalidResponse: 'The AI returned an invalid response. Please try again.',
  },
};
