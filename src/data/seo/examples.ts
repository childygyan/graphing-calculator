/**
 * Curated example graphs (Phase 8).
 *
 * Each example preloads real expressions into the calculator through a
 * share-style `#s=…` link built at build time by the content engine, so the
 * "Open in calculator" button opens exactly the graph the page describes.
 * Prose is hand-written; computed values come from `content-engine.ts`.
 */
import type { ExampleGraphData } from './types.js';

export const EXAMPLE_GRAPHS: ExampleGraphData[] = [
  {
    slug: 'trigonometric-interference',
    title: 'Trigonometric Interference: sin(x) + cos(2x)',
    description:
      'See what happens when two trigonometric waves combine. Open this interactive example of sin(x) + cos(2x) in the graphing calculator.',
    expressions: [
      { kind: 'cartesian', rhs: 'sin(x)', label: 'sin(x)' },
      { kind: 'cartesian', rhs: 'cos(2*x)', label: 'cos(2x)' },
      { kind: 'cartesian', rhs: 'sin(x) + cos(2*x)', label: 'sin(x) + cos(2x)' },
    ],
    story: [
      'When two waves travel through the same medium, their displacements add together point by point — a phenomenon called superposition. Graphing sin(x), cos(2x), and their sum on the same axes makes this addition visible: at every x, the height of the combined curve is exactly the sum of the heights of the two component curves.',
      'Notice how the sum is not simply a bigger sine wave. The cos(2x) term oscillates twice as fast, so it alternately reinforces and cancels the sin(x) wave. Where both waves peak together, the sum reaches its highest points; where one is at a crest and the other at a trough, they partially cancel. This is the same mathematics behind beats in sound and interference patterns in light.',
    ],
    insights: [
      'The combined wave sin(x) + cos(2x) is periodic, but its shape is more complex than either component alone.',
      'Toggle each expression on and off in the calculator to isolate the contribution of each wave.',
      'Try changing cos(2*x) to cos(3*x) and watch how a faster second wave changes the interference pattern.',
    ],
    related: [
      '/math-functions/sine/',
      '/math-functions/cosine/',
      '/examples/damped-oscillation/',
      '/learn/what-is-a-function/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'projectile-motion',
    title: 'Projectile Motion: Graphing a Thrown Ball',
    description:
      'Model the height of a thrown ball with a quadratic function. Open this projectile-motion example and find its maximum height in the calculator.',
    expressions: [{ kind: 'cartesian', rhs: '-4.9*x^2 + 20*x + 1.5', label: 'height(x)' }],
    viewport: { xMin: -1, xMax: 5, yMin: -5, yMax: 25 },
    story: [
      "The height of a ball thrown straight up follows a quadratic function of time: gravity pulls with a constant acceleration, so height is a downward-opening parabola. Here, -4.9x² + 20x + 1.5 models a ball launched at 20 meters per second from a height of 1.5 meters (the 4.9 comes from half of Earth's gravitational acceleration, 9.8 m/s²).",
      'The vertex of the parabola is the moment the ball reaches its highest point — the instant its velocity is zero before it starts falling. Because the parabola is symmetric, the ball lands as long after the peak as it took to climb to it. The two x-intercepts mark launch (near x = 0) and landing; only the positive root is physically meaningful.',
    ],
    insights: [
      'The vertex of the parabola gives the maximum height and the time it is reached.',
      'The positive x-intercept is when the ball hits the ground — find it with the root finder.',
      'The coefficient -4.9 controls how "wide" the flight is; a larger launch speed (the 20x term) stretches the flight longer.',
    ],
    related: [
      '/math-functions/quadratic/',
      '/calculators/root-finder/',
      '/learn/what-is-a-function/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'damped-oscillation',
    title: 'Damped Oscillation: e^(-x/2) · cos(3x)',
    description:
      'Explore a decaying wave that models real springs and circuits. Open this damped oscillation example in the interactive graphing calculator.',
    expressions: [
      { kind: 'cartesian', rhs: 'exp(-x/2) * cos(3*x)', label: 'e^(-x/2)·cos(3x)' },
      { kind: 'cartesian', rhs: 'exp(-x/2)', label: 'envelope e^(-x/2)' },
      { kind: 'cartesian', rhs: '-exp(-x/2)', label: 'envelope -e^(-x/2)' },
    ],
    viewport: { xMin: -1, xMax: 15, yMin: -2, yMax: 2 },
    story: [
      'A plucked guitar string, a bouncing car suspension, and an RLC circuit all share the same mathematical shape: an oscillation whose amplitude decays over time. Multiplying cos(3x) by the decaying exponential exp(-x/2) produces exactly that — each swing is a fixed fraction of the previous one.',
      'The two envelope curves, ±exp(-x/2), are the "rails" the oscillation rides between. The wave touches the upper envelope exactly at the crests of the cosine and the lower envelope at its troughs, and the envelopes themselves never oscillate. This separation of "how fast it wiggles" (the cosine) from "how fast it dies out" (the exponential) is why engineers analyze the two factors separately.',
    ],
    insights: [
      'The oscillation never crosses outside its exponential envelopes.',
      'Increasing the 3 in cos(3x) packs more wiggles into the same decay; increasing the 1/2 in the exponent kills the motion faster.',
      'Zoom out along the x-axis to watch the wave settle toward zero — the mathematical signature of damping.',
    ],
    related: [
      '/math-functions/cosine/',
      '/math-functions/exponential/',
      '/examples/trigonometric-interference/',
      '/learn/understanding-derivatives/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'logistic-growth',
    title: 'Logistic Growth: The S-Curve of Limited Resources',
    description:
      'Graph the S-curve that models populations with limited resources. Open this logistic growth example in the graphing calculator.',
    expressions: [{ kind: 'cartesian', rhs: '10 / (1 + 9*exp(-x))', label: 'logistic' }],
    viewport: { xMin: -5, xMax: 10, yMin: -2, yMax: 12 },
    story: [
      'Unlimited growth is exponential, but real populations run into limits: food, space, or market size. The logistic function 10 / (1 + 9·exp(-x)) starts out looking exponential, then bends over and levels off at a carrying capacity — here, 10. The result is the famous S-curve seen in bacterial colonies, product adoption, and the spread of ideas.',
      'The curve has an inflection point where it switches from accelerating to decelerating — the moment growth is fastest, exactly halfway to the carrying capacity. Before that point the curve bends upward (growth feeding on itself); after it, the curve bends downward as the limit bites. Finding that inflection point is one of the most useful things calculus can do for a model.',
    ],
    insights: [
      'The horizontal asymptote y = 10 is the carrying capacity the curve approaches but never exceeds.',
      'The steepest part of the S is the inflection point — where growth is fastest.',
      'Try 10 / (1 + 9*exp(-2*x)) to see how a faster growth rate steepens the middle of the S without changing its ceiling.',
    ],
    related: [
      '/math-functions/exponential/',
      '/learn/asymptotes-explained/',
      '/learn/understanding-derivatives/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'lissajous-curve',
    title: 'Lissajous Curve: Parametric Art from Sine Waves',
    description:
      'Draw a Lissajous figure with parametric equations x = sin(3t), y = cos(2t). Open this parametric example in the graphing calculator.',
    expressions: [
      {
        kind: 'parametric',
        xOfT: 'sin(3*t)',
        yOfT: 'cos(2*t)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'Lissajous 3:2',
      },
    ],
    viewport: { xMin: -1.5, xMax: 1.5, yMin: -1.5, yMax: 1.5 },
    story: [
      'Before oscilloscopes had digital displays, physicists studied frequency ratios by feeding two sine waves into the horizontal and vertical plates of a cathode-ray tube. The glowing patterns they traced — Lissajous figures — reveal the ratio of the two frequencies at a glance. Here, x = sin(3t) oscillates three times for every two oscillations of y = cos(2t), weaving a closed, symmetric knot.',
      'What makes this curve impossible as a regular y = f(x) graph is that it fails the vertical line test dramatically: a single x can correspond to many y values as the curve loops back on itself. Parametric equations sidestep that limitation by giving x and y their own formulas in a shared parameter t — the same idea animates everything from clock hands to planetary orbits.',
    ],
    insights: [
      'The 3:2 frequency ratio determines the pattern: count the lobes touching each side of the bounding square.',
      'Change sin(3*t) to sin(4*t) for a 4:2 figure and compare the symmetry.',
      'Because t runs a full 2π, the curve closes perfectly — shorten the t-range and watch it become an open arc.',
    ],
    related: [
      '/math-functions/sine/',
      '/math-functions/cosine/',
      '/learn/parametric-vs-cartesian/',
      '/examples/polar-rose/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'polar-rose',
    title: 'Polar Rose: r = 2·cos(3θ)',
    description:
      'Plot a three-petaled rose with the polar equation r = 2cos(3θ). Open this polar graph example in the interactive calculator.',
    expressions: [
      {
        kind: 'polar',
        rOfTheta: '2*cos(3*theta)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'r = 2cos(3θ)',
      },
    ],
    viewport: { xMin: -2.5, xMax: 2.5, yMin: -2.5, yMax: 2.5 },
    story: [
      'In polar coordinates, each point is described by a distance r from the origin and an angle θ, and the equation r = 2·cos(3θ) draws a flower with exactly three petals. As θ sweeps around, r oscillates between -2 and 2 three times; negative r values plot in the opposite direction, which is what folds the petals into their symmetric arrangement.',
      'The number of petals follows a simple rule: for r = a·cos(nθ) with odd n, the rose has exactly n petals. Try even values of n in the calculator and you will get twice as many — the pattern doubles because the curve needs a full extra revolution to close. Few equations show off the power of polar coordinates as elegantly as the rose.',
    ],
    insights: [
      'An odd coefficient (3) gives 3 petals; try 2*cos(4*theta) to see the even case produce 8.',
      'The amplitude 2 sets the petal length — the farthest point from the origin.',
      'Each petal is traced exactly once as θ runs from 0 to π; the second half retraces them.',
    ],
    related: [
      '/math-functions/cosine/',
      '/learn/parametric-vs-cartesian/',
      '/examples/lissajous-curve/',
      '/graphing-calculator/',
    ],
  },
];

export function getExampleBySlug(slug: string): ExampleGraphData | undefined {
  return EXAMPLE_GRAPHS.find((example) => example.slug === slug);
}
