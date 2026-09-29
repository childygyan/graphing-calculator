/**
 * Deutsche Wörterlisten-Aggregation — setzt jede Namensraum-Wörterliste über
 * `defineLocale` zu einer `LocaleDictionary` zusammen.
 *
 * Deutsch ist formgleich zum Englischen: Jede andere Locale-Wörterliste muss
 * dieselben Namensräume und Felder enthalten. `defineLocale`s Parametertyp
 * erzwingt das — ein fehlender Schlüssel ist ein Compile-Fehler.
 */

import { defineLocale, type LocaleDictionary } from '../types.js';
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

export const de: LocaleDictionary = defineLocale({
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
});
