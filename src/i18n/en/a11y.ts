/**
 * English a11y dictionary — shared accessible names reused across islands
 * and content blocks. Kept separate from `chrome` because these travel with
 * the future `strings` props of the React islands.
 */

import type { A11yStrings } from '../types.js';

export const a11y: A11yStrings = {
  analysisPanel: 'Mathematical analysis',
  graphRegion: 'Graph',
  graphCanvasDefault:
    'Interactive Cartesian coordinate graph. ' +
    'Use the graph toolbar to zoom in, zoom out, or reset the view.',
  valueTableRegion: 'Table of values',
  reviewInfo: 'Review information',
};
