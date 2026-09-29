/**
 * Dizionario italiano errors — pagine 404/500, error boundary e copy degli
 * errori API lato server.
 */

import type { ErrorsStrings } from '../types.js';

export const errors: ErrorsStrings = {
  notFound: {
    title: 'Pagina non trovata',
    description: 'La pagina che cercavi non esiste. Torna alla calcolatrice grafica o alla home.',
    heading: 'Pagina non trovata',
    body: 'Questa pagina non esiste. Potrebbe essere stata spostata, o il link potrebbe essere sbagliato.',
    homeCta: 'Torna alla home',
  },
  serverError: {
    title: 'Qualcosa \u00e8 andato storto',
    description:
      'Si \u00e8 verificato un errore imprevisto. Torna alla calcolatrice grafica o alla home.',
    heading: 'Qualcosa \u00e8 andato storto',
    body:
      'Si \u00e8 verificato un errore imprevisto durante il caricamento di questa pagina. I tuoi grafici ' +
      'salvati sono nel tuo browser e sono al sicuro — prova a ricaricare, oppure torna alla home.',
    homeCta: 'Torna alla home',
    calculatorCta: 'Apri la calcolatrice',
  },
  errorBoundary: {
    defaultTitle: 'Qualcosa \u00e8 andato storto',
    message:
      'Un errore imprevisto ha interrotto questa parte della pagina. Gli altri tuoi dati non sono stati toccati.',
    retry: 'Riprova',
  },
  api: {
    rateLimited: 'Troppe richieste AI. Attendi un momento e riprova.',
    invalidJson: 'Il corpo della richiesta deve essere JSON valido.',
    serviceUnavailable: 'Il servizio AI non \u00e8 disponibile al momento. Riprova pi\u00f9 tardi.',
    invalidResponse: 'L\u2019AI ha restituito una risposta non valida. Riprova.',
  },
};
