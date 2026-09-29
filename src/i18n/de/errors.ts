/**
 * Deutsche Fehler-Wörterliste — 404-/500-Seiten, Fehlergrenzen und
 * serverseitige API-Fehlertexte. Die `api`-Texte werden serverseitig erzeugt;
 * sie bleiben vorerst am Endpunkt verdrahtet und sind hier dokumentiert, damit
 * die zukünftige Umstellung sie an einer Stelle findet.
 */

import type { ErrorsStrings } from '../types.js';

export const errors: ErrorsStrings = {
  notFound: {
    title: 'Seite nicht gefunden',
    description:
      'Die gesuchte Seite existiert nicht. Kehren Sie zum Grafikrechner oder zur Startseite zurück.',
    heading: 'Seite nicht gefunden',
    body: 'Diese Seite existiert nicht. Sie wurde möglicherweise verschoben, oder der Link ist falsch.',
    homeCta: 'Zurück zur Startseite',
  },
  serverError: {
    title: 'Etwas ist schiefgelaufen',
    description:
      'Ein unerwarteter Fehler ist aufgetreten. Kehren Sie zum Grafikrechner oder zur Startseite zurück.',
    heading: 'Etwas ist schiefgelaufen',
    body:
      'Beim Laden dieser Seite ist ein unerwarteter Fehler aufgetreten. Ihre gespeicherten Graphen ' +
      'liegen in Ihrem Browser und sind sicher — laden Sie die Seite neu, oder kehren Sie zur Startseite zurück.',
    homeCta: 'Zurück zur Startseite',
    calculatorCta: 'Rechner öffnen',
  },
  errorBoundary: {
    defaultTitle: 'Etwas ist schiefgelaufen',
    message:
      'Ein unerwarteter Fehler hat diesen Teil der Seite unterbrochen. Ihre übrigen Daten sind nicht betroffen.',
    retry: 'Erneut versuchen',
  },
  api: {
    rateLimited: 'Zu viele KI-Anfragen. Bitte warten Sie einen Moment und versuchen Sie es erneut.',
    invalidJson: 'Der Anfragekörper muss gültiges JSON sein.',
    serviceUnavailable:
      'Der KI-Dienst ist gerade nicht verfügbar. Bitte versuchen Sie es später erneut.',
    invalidResponse:
      'Die KI hat eine ungültige Antwort zurückgegeben. Bitte versuchen Sie es erneut.',
  },
};
