/**
 * French errors dictionary — 404/500 pages, error boundaries, and
 * server-side API error copy. Mirrors `src/i18n/en/errors.ts` exactly.
 */

import type { ErrorsStrings } from '../types.js';

export const errors: ErrorsStrings = {
  notFound: {
    title: 'Page introuvable',
    description:
      'La page que vous cherchiez n’existe pas. Revenez à la calculatrice graphique ou à l’accueil.',
    heading: 'Page introuvable',
    body: 'Cette page n’existe pas. Elle a peut-être été déplacée, ou le lien est incorrect.',
    homeCta: 'Retour à l’accueil',
  },
  serverError: {
    title: 'Un problème est survenu',
    description:
      'Une erreur inattendue s’est produite. Revenez à la calculatrice graphique ou à l’accueil.',
    heading: 'Un problème est survenu',
    body:
      'Une erreur inattendue s’est produite pendant le chargement de cette page. Vos graphes ' +
      'enregistrés sont stockés dans votre navigateur et sont en sécurité — essayez de recharger ' +
      'la page, ou revenez à l’accueil.',
    homeCta: 'Retour à l’accueil',
    calculatorCta: 'Ouvrir la calculatrice',
  },
  errorBoundary: {
    defaultTitle: 'Un problème est survenu',
    message:
      'Une erreur inattendue a interrompu cette partie de la page. Vos autres données ne sont pas affectées.',
    retry: 'Réessayer',
  },
  api: {
    rateLimited: 'Trop de requêtes IA. Veuillez patienter un moment et réessayer.',
    invalidJson: 'Le corps de la requête doit être du JSON valide.',
    serviceUnavailable:
      'Le service IA est indisponible pour le moment. Veuillez réessayer plus tard.',
    invalidResponse: 'L’IA a renvoyé une réponse invalide. Veuillez réessayer.',
  },
};
