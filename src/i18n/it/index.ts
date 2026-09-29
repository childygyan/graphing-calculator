/**
 * Aggregato del dizionario italiano — assembla ogni dizionario di namespace in
 * un unico `LocaleDictionary`.
 *
 * L'annotazione `: LocaleDictionary` rende una chiave mancante un errore di
 * compilazione (nota: `types.ts` non esporta un tipo `Dictionary`; si usa il
 * nome reale `LocaleDictionary`).
 */

import type { LocaleDictionary } from '../types.js';
import { chrome } from './chrome.js';
import { a11y } from './a11y.js';
import { errors } from './errors.js';
import { home } from './home.js';
import { calculator } from './calculator.js';
import { graph3d } from './graph3d.js';
import { scientific } from './scientific.js';
import { calculators } from './calculators.js';
import { functions } from './functions.js';
import { examples } from './examples.js';
import { learn } from './learn.js';
import { about } from './about.js';
import { methodology } from './methodology.js';
import { desmosAlt } from './desmosAlt.js';
import { contact } from './contact.js';
import { legal } from './legal.js';

export const it: LocaleDictionary = {
  chrome,
  a11y,
  errors,
  home,
  calculator,
  graph3d,
  scientific,
  calculators,
  functions,
  examples,
  learn,
  about,
  methodology,
  desmosAlt,
  contact,
  legal,
};
