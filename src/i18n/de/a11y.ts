/**
 * Deutsche a11y-Wörterliste — gemeinsame zugängliche Namen, die über Inseln
 * und Inhaltsblöcke hinweg wiederverwendet werden. Getrennt von `chrome`,
 * weil sie mit den zukünftigen `strings`-Props der React-Inseln reisen.
 */

import type { A11yStrings } from '../types.js';

export const a11y: A11yStrings = {
  analysisPanel: 'Mathematische Analyse',
  graphRegion: 'Graph',
  graphCanvasDefault:
    'Interaktives kartesisches Koordinatensystem. ' +
    'Nutzen Sie die Symbolleiste des Graphen, um zu vergrößern, zu verkleinern oder die Ansicht zurückzusetzen.',
  valueTableRegion: 'Wertetabelle',
  reviewInfo: 'Informationen zur Überprüfung',
};
