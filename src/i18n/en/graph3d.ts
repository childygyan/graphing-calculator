/**
 * English 3D dictionary — the `/3d/` page prose plus the Graph3D island
 * strings (currently unwired; see docs/I18N-CONTRACTS.md).
 */

import type { Graph3DStrings } from '../types.js';

export const graph3d: Graph3DStrings = {
  seo: {
    title: '3D Grapher — Plot z = f(x, y) Surfaces Online | Graphing Calculator',
    description:
      'Free online 3D grapher: plot surfaces z = f(x, y) with drag-to-rotate, zoom, and ' +
      'adjustable detail. Try the paraboloid, ripple, and saddle presets.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: '3D Grapher', href: '/3d/' },
  ],
  heading: '3D Grapher',
  intro: [
    'Plot any surface z = f(x, y) in your browser — no downloads, no plugins. Type an expression using x and y, then drag to orbit around it, scroll or pinch to zoom, and raise the grid detail to sharpen the mesh.',
    'The plotter uses the same expression engine as the 2D graphing calculator, so every function you already know — sin, cos, sqrt, ^, and more — works here too. Where a function is undefined, the surface shows an honest gap instead of a fake streak.',
  ],
  sections: [
    {
      heading: 'How 3D rotation works',
      body: [
        'Dragging the plot orbits a virtual camera around the surface: horizontal drags change the azimuth (the compass direction you view from) and vertical drags change the elevation (how high above the xy-plane the camera sits). Scrolling or pinching moves the camera closer or farther. If you use a keyboard, focus the plot and use the arrow keys to rotate and + / − to zoom.',
        'The surface is drawn with the painter\u2019s algorithm: every mesh quad is projected with a true perspective camera, sorted back-to-front by depth, and drawn farthest-first with depth shading. Nearer geometry therefore hides what is behind it, which is what gives the plot its sense of solid depth. Leave the plot alone for a few seconds and it slowly rotates on its own — unless you have prefers-reduced-motion enabled, in which case it stays perfectly still.',
      ],
    },
    {
      heading: 'What the presets show',
      body: [
        'Paraboloid (x²+y²) is the classic bowl: z grows with distance from the origin in every direction, with its minimum of 0 at (0, 0). It is the 3D analogue of the parabola y = x².',
        'Ripple (sin(√(x²+y²))) draws concentric waves radiating from the origin — the value depends only on the distance from the origin, so every contour is a circle. It is a good way to see what radial symmetry looks like as a surface.',
        'Saddle (x²−y²) curves upward along the x-axis and downward along the y-axis. The origin is a saddle point: a minimum in one direction and a maximum in another, the 3D version of an inflection-like critical point.',
      ],
    },
    {
      heading: 'Honest rendering: gaps and z-scaling',
      body: [
        'Undefined points become gaps, never guesses. Plot 1/(x²+y²) and you will see the mesh break apart around the singularity at the origin, exactly like the 2D grapher breaks a curve at a vertical asymptote.',
        'Very tall surfaces are uniformly shrunk in z so they fit on screen — the plotter tells you the scale factor (for example, "z-axis auto-scaled ×0.22"). The shape and the reported z minimum/maximum stay true to your expression; only the vertical proportions are compressed for viewing.',
      ],
    },
  ],
  faqs: [
    {
      question: 'What expressions can I plot in 3D?',
      answer:
        'Any expression in the variables x and y, using the same functions as the 2D ' +
        'calculator: powers (x^2), roots (sqrt), trigonometric functions (sin, cos, tan), ' +
        'exponentials, logarithms, and constants like pi. Anything else — for example a stray ' +
        'variable z — is rejected with a clear error message instead of silently plotting the ' +
        'wrong thing.',
    },
    {
      question: 'Why are there holes in my surface?',
      answer:
        'Holes are honest gaps where your function is undefined: division by zero, the square ' +
        'root of a negative number, or the logarithm of a non-positive number. The renderer ' +
        'skips those quads rather than drawing a misleading spike through the singularity.',
    },
    {
      question: 'What does the Detail setting change?',
      answer:
        'It sets the mesh resolution — how many grid divisions are sampled along each axis ' +
        '(24, 36, 48, or 64). Higher detail draws a smoother surface but evaluates the function ' +
        'more times (64² = 4,225 points per redraw), so start low on older phones.',
    },
    {
      question: 'Does the 3D grapher work on mobile?',
      answer:
        'Yes. One finger drags to rotate, two-finger pinch zooms, and a two-finger drag ' +
        'rotates at reduced sensitivity. The layout is mobile-first and the canvas is sized for ' +
        'its container with device-pixel-ratio scaling for crisp lines.',
    },
    {
      question: 'Is the 3D plot accurate?',
      answer:
        'The surface is sampled from your exact expression at each grid point — no AI ' +
        'estimation, no smoothing of the underlying math. Between grid points the mesh connects ' +
        'samples with straight quads, so very sharp features may look slightly faceted at low ' +
        'detail; raise the Detail setting to tighten the mesh.',
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/learn/'],
  island: {
    surfaceLabel: 'Surface: z = f(x, y)',
    placeholder: 'e.g. x^2 + y^2',
    plot: 'Plot',
    emptyError: 'Enter an expression in x and y, for example x^2+y^2.',
    genericError: 'Could not plot that expression.',
    parseError: 'Could not parse that expression.',
    unknownVariablesTemplate: 'Unknown variable{plural}: {names}. 3D surfaces use x and y only.',
    presetGroup: 'Preset surfaces',
    presets: [
      { label: 'Paraboloid', description: 'A bowl opening upward; minimum 0 at the origin.' },
      { label: 'Ripple', description: 'Concentric waves radiating from the origin.' },
      {
        label: 'Saddle',
        description: 'Curves up along x, down along y — a saddle point at the origin.',
      },
    ],
    detailGroup: 'Grid resolution',
    detailLabel: 'Detail:',
    hint: 'Drag to rotate · scroll or pinch to zoom · focus the plot and use arrow keys / + / −',
    zMin: 'z min',
    zMax: 'z max',
    autoScaledTemplate: '(z-axis auto-scaled ×{scale} to fit)',
    noFiniteGrid: 'No finite values on this grid — try a different expression.',
    canvasAriaTemplate:
      '3D surface plot of z equals {expression}. {stats}' +
      'Drag to rotate, scroll or pinch to zoom. When focused, arrow keys rotate and plus/minus zoom.',
    canvasAriaEmpty: '3D surface plotter. No expression plotted yet.',
    summaryTemplate: 'Surface summary: z = {expression} on x and y from -5 to 5. {stats}',
    summaryStatsTemplate: 'Minimum z {zMin}, maximum z {zMax}, computed at {count} grid points.',
    summaryNoFinite: 'No finite z values on the current grid.',
    summaryEmpty: 'No surface plotted.',
    canvasAriaStatsTemplate: 'Over x and y from -5 to 5, z ranges from {zMin} to {zMax}. ',
    canvasAriaNoFiniteStats: 'No finite values on the current grid. ',
  },
};
