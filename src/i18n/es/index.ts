/**
 * Agregado del diccionario español — reúne los 16 diccionarios de espacios de
 * nombres en un `LocaleDictionary` mediante `defineLocale`.
 *
 * NOTA: la plantilla del encargo pedía `import type { Dictionary }` y
 * exportaciones `as const`, pero `Dictionary` no existe en `../types.js` y
 * los arreglos `readonly` de `as const` son incompatibles con los campos
 * mutables de `LocaleDictionary`. Esta forma compila hoy y conserva la misma
 * garantía: `defineLocale` exige cada espacio de nombres con su forma
 * exacta, así que una clave faltante es un error de compilación.
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

export const es: LocaleDictionary = defineLocale({
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
