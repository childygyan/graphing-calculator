/**
 * Hand-written educational content for the ten notable-function pages
 * (Phase 8 SEO content architecture).
 *
 * Each `expression` is compiled by the project's own math engine at build
 * time to derive roots, extrema, and intercepts shown on the page, so
 * expressions use only engine-supported syntax. All prose states
 * mathematically certain facts only — no statistics, studies, or reviews.
 */
import type { FunctionPageData } from './types.js';

export const FUNCTION_PAGES: FunctionPageData[] = [
  {
    slug: 'sine',
    name: 'Sine',
    displayName: 'Sine Function',
    notation: 'f(x) = sin(x)',
    expression: 'sin(x)',
    tagline: 'The classic wave of trigonometry: a smooth oscillation that repeats every 2π.',
    description:
      "Graph f(x) = sin(x): explore the sine wave's period 2π, amplitude, zeros and peaks, odd symmetry, and its role in sound, light, and oscillations.",
    intro: [
      'The sine function is one of the most recognizable curves in all of mathematics: a smooth, repeating wave that oscillates forever between −1 and 1. Originally defined through right triangles — the sine of an angle is the ratio of the opposite side to the hypotenuse — it extends naturally to all real numbers by measuring angles in radians around the unit circle. On the unit circle, sin(x) is simply the y-coordinate of the point reached after rotating x radians from the positive x-axis.',
      'Because it repeats every 2π radians, sine is the prototype of every periodic phenomenon: alternating current, sound waves, light, tides, and the vibration of a guitar string can all be described with sine waves of different frequencies and amplitudes. Type sin(x) into the graphing calculator to trace the wave yourself, then shift it, stretch it, and combine it with other expressions to see how real-world oscillations are built from this one curve.',
    ],
    sections: [
      {
        heading: 'What sine is',
        body: [
          'The unit-circle definition is what lets sine accept any real input, not just angles in a triangle. Starting at (1, 0) and moving counterclockwise around the circle of radius 1, each angle x lands on a point whose height above the x-axis is sin(x). After a full turn of 2π radians you return to where you started, which is why the graph repeats — the function’s history is written into the geometry of the circle.',
          'That geometry also explains the wave’s symmetry: sine is an odd function, meaning sin(−x) = −sin(x), so the left half of the graph is the right half rotated 180° about the origin. The graph crosses the x-axis at every multiple of π, reaches its peak of 1 at π/2 plus each full turn, and bottoms out at −1 at 3π/2 plus each full turn.',
        ],
      },
      {
        heading: 'Amplitude, period, and phase',
        body: [
          'Three numbers describe any sine wave: amplitude, period, and phase. The amplitude is the wave’s height — for plain sin(x) it is 1, the distance from the midline y = 0 to each peak. Multiplying by a constant, as in 3*sin(x), stretches the wave vertically without changing its shape, which is how louder sounds and stronger signals are modeled.',
          'The period is the horizontal length of one full cycle: 2π for sin(x). Writing sin(2*x) squeezes two full waves into the same span, halving the period to π and doubling the frequency — the pitch of a note an octave higher. Adding a phase shift, sin(x − π/2), slides the whole wave sideways, which is why cosine is secretly a shifted sine: cos(x) = sin(x + π/2).',
        ],
      },
      {
        heading: 'Where sine appears',
        body: [
          'Sine waves are the building blocks of signal processing. Any repeating signal — a musical tone, a radio broadcast, the 50 or 60 Hz hum of mains electricity — can be decomposed into a sum of sine waves of different frequencies, a fact known as Fourier analysis. When two sine waves of nearly equal frequency overlap, they interfere to produce beats, the throbbing effect you hear when two slightly out-of-tune instruments play together.',
          'Beyond signals, sine governs simple harmonic motion: the back-and-forth of a mass on a spring, the swing of a small pendulum, and the up-and-down of a floating buoy all follow sinusoidal curves in time. In geometry and physics, sine projects a rotating quantity onto an axis — the vertical position of a Ferris wheel cabin over time traces exactly sin(x).',
        ],
      },
    ],
    keyFacts: [
      'Domain: all real numbers; range: −1 ≤ sin(x) ≤ 1.',
      'Period 2π: sin(x + 2π) = sin(x) for every x.',
      'Odd function: sin(−x) = −sin(x); the graph has 180° rotational symmetry about the origin.',
      'Zeros at x = nπ; maxima of 1 at x = π/2 + 2πn; minima of −1 at x = 3π/2 + 2πn.',
      'y-intercept at (0, 0); derivative is cos(x); an antiderivative is −cos(x).',
    ],
    faqs: [
      {
        q: 'Why is the sine graph a wave?',
        a: 'Because sine measures height on the unit circle as you rotate. Going around the circle makes the height rise and fall smoothly and repeat every full turn, so the graph of height versus angle is a wave. The wave is smooth because rotation is continuous — there are no corners or jumps.',
      },
      {
        q: 'What is the difference between sine and cosine?',
        a: 'They are the same wave shifted sideways: cos(x) = sin(x + π/2). On the unit circle, cosine is the x-coordinate while sine is the y-coordinate. Cosine starts at its maximum, cos(0) = 1, while sine starts at zero, sin(0) = 0.',
      },
      {
        q: 'Does sin(x) ever exceed 1?',
        a: 'No — for real x, |sin(x)| ≤ 1 always. On the unit circle, the y-coordinate can never be larger in magnitude than the radius, which is 1. (Sine of complex numbers can exceed 1 in magnitude, but the calculator’s real-valued graph stays within [−1, 1].)',
      },
    ],
    related: [
      '/functions/cosine/',
      '/functions/tangent/',
      '/examples/trigonometric-interference/',
      '/examples/damped-oscillation/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'cosine',
    name: 'Cosine',
    displayName: 'Cosine Function',
    notation: 'f(x) = cos(x)',
    expression: 'cos(x)',
    tagline:
      'The even, wave-shaped sibling of sine — cosine starts at its peak and repeats every 2π.',
    description:
      "Graph f(x) = cos(x): explore the cosine wave's period 2π, amplitude, intercepts and turning points, even symmetry, and its uses in waves and motion.",
    intro: [
      'Cosine is the horizontal counterpart of sine: on the unit circle it gives the x-coordinate of the point at angle x, while sine gives the y-coordinate. That single difference shapes everything about its graph — it starts at its maximum value of 1 when x = 0, dips to −1 at x = π, and returns to 1 at x = 2π, tracing the same smooth wave as sine but shifted a quarter-turn sideways. Like sine, it oscillates forever between −1 and 1 and repeats every 2π radians.',
      'Cosine shows up wherever something projects onto a horizontal axis or starts from a maximum: the shadow of a rotating wheel, the voltage in an AC circuit measured from its peak, or the x-coordinate of uniform circular motion. Because cos(x) = sin(x + π/2), anything you can say about sine waves applies to cosine waves with a phase shift — type cos(x) into the calculator and drag the viewport to watch it repeat.',
    ],
    sections: [
      {
        heading: 'What cosine is',
        body: [
          'Imagine a point traveling counterclockwise around the unit circle, starting at (1, 0). At angle x its position is (cos x, sin x): cosine tracks how far right or left the point is. At x = 0 the point is at the far right, so cos(0) = 1 — the y-intercept of the graph. As the angle grows the point swings left, and cosine falls smoothly through 0 at x = π/2 to −1 at x = π, the far left of the circle.',
          'Cosine is an even function, cos(−x) = cos(x), so its graph is a mirror image across the y-axis: the left side exactly reflects the right. It crosses zero at x = π/2 + nπ, halfway between each peak and trough, and its maxima of 1 occur at x = 2πn while minima of −1 occur at x = π + 2πn. The familiar wave shape comes from the same circular geometry as sine, viewed from the side.',
        ],
      },
      {
        heading: 'Cosine, sine, and phase shifts',
        body: [
          'The identity cos(x) = sin(x + π/2) says the two functions are one wave seen from two starting points: cosine is what sine looks like a quarter-period earlier. This matters when modeling real oscillations, because the choice between sine and cosine is just a choice of when you start your clock — a spring released from rest at maximum stretch follows a cosine in time, while one pushed through equilibrium follows a sine.',
          'Phase shifts also explain sums like sin(x) + cos(x): combining two waves of the same frequency always produces another wave of that frequency, here √2·sin(x + π/4), a fact that falls out of the angle-addition formulas. In the calculator, plot sin(x) and cos(x) together and add a third expression sin(x) + cos(x) to see the sum remain a perfect wave.',
        ],
      },
      {
        heading: 'Where cosine appears',
        body: [
          'In physics, cosine describes any oscillation measured from its extreme: simple harmonic motion x(t) = A·cos(ωt) for a mass released from rest, the real part of the complex exponential e^(iθ) = cos θ + i·sin θ that underpins AC circuit analysis and quantum wavefunctions, and the even basis functions of Fourier series. When engineers write a periodic signal as a sum of cosines, each term captures the symmetric part of the wave.',
          'Cosine also appears far from waves. The dot product of two vectors is |a||b|cos θ, where θ is the angle between them, so cosine measures alignment: 1 for parallel, 0 for perpendicular, −1 for opposite. The law of cosines, c² = a² + b² − 2ab·cos(C), generalizes Pythagoras to any triangle.',
        ],
      },
    ],
    keyFacts: [
      'Domain: all real numbers; range: −1 ≤ cos(x) ≤ 1.',
      'Period 2π: cos(x + 2π) = cos(x) for every x.',
      'Even function: cos(−x) = cos(x); the graph is symmetric about the y-axis.',
      'Zeros at x = π/2 + nπ; maxima of 1 at x = 2πn; minima of −1 at x = π + 2πn.',
      'y-intercept at (0, 1); derivative is −sin(x); an antiderivative is sin(x).',
    ],
    faqs: [
      {
        q: 'Is cosine just a shifted sine?',
        a: 'Exactly — cos(x) = sin(x + π/2), so the cosine graph is the sine graph moved left by a quarter period. They share the same amplitude, period, and range; only the starting point differs. On the unit circle they are the x- and y-coordinates of the same rotating point.',
      },
      {
        q: 'Why is cos(0) = 1?',
        a: 'At angle 0 the rotating point on the unit circle sits at (1, 0), the far right of the circle, so its x-coordinate — the cosine — is 1 and its y-coordinate — the sine — is 0. That is also why the cosine graph begins at its peak.',
      },
      {
        q: 'What does cosine have to do with the dot product?',
        a: 'The dot product formula a·b = |a||b|cos θ uses cosine of the angle between the vectors to measure how much they point in the same direction. Cosine is 1 when they are parallel, 0 when perpendicular, and −1 when opposite — so it acts as an alignment score between −1 and 1.',
      },
    ],
    related: [
      '/functions/sine/',
      '/functions/tangent/',
      '/examples/trigonometric-interference/',
      '/examples/damped-oscillation/',
      '/learn/what-is-a-function/',
    ],
  },
  {
    slug: 'tangent',
    name: 'Tangent',
    displayName: 'Tangent Function',
    notation: 'f(x) = tan(x)',
    expression: 'tan(x)',
    tagline:
      'A repeating curve that climbs from −∞ to +∞, with vertical asymptotes wherever cosine hits zero.',
    description:
      'Graph f(x) = tan(x): see its repeating branches, asymptotes at π/2 + nπ, period π, unbounded range, and where the tangent function shows up in math.',
    intro: [
      'The tangent function, tan(x) = sin(x)/cos(x), looks nothing like its wave-shaped siblings: instead of oscillating between −1 and 1, it sweeps upward through every real value, then jumps and starts again. Each repeating branch passes through a zero at x = nπ, climbs ever more steeply, and shoots off to infinity as x approaches π/2 + nπ — the points where cos(x) = 0 and the ratio blows up. Those are the function’s vertical asymptotes, the dashed walls the curve can approach but never touch.',
      'Tangent measures steepness: in a right triangle it is opposite over adjacent, the slope of the hypotenuse, and for an angle of inclination it gives the slope of the line directly. Because tan(x + π) = tan(x), its period is only π — half that of sine and cosine. Type tan(x) into the calculator and zoom out to see the branches tile the plane, each one a stretched S-curve between two asymptotes.',
    ],
    sections: [
      {
        heading: 'What tangent is',
        body: [
          'Geometrically, tan(x) is the slope of the ray at angle x: draw the ray from the origin at angle x and see how steeply it rises, which is rise over run — opposite over adjacent. Equivalently, it is the y-coordinate where that ray meets the vertical line x = 1 tangent to the unit circle, which is where the name comes from. As the ray swings toward straight up, the intersection point races away to infinity, and the moment the ray points exactly upward there is no intersection at all — the asymptote.',
          'Since tan(x) = sin(x)/cos(x), the function’s zeros come from sine (at x = nπ) and its asymptotes from cosine’s zeros (at x = π/2 + nπ). Tangent is an odd function, tan(−x) = −tan(x), so each branch is rotationally symmetric about its own zero, and the whole graph repeats every π because shifting both sine and cosine by π flips both signs, leaving the ratio unchanged.',
        ],
      },
      {
        heading: 'Asymptotes and unbounded behavior',
        body: [
          'The vertical asymptotes at x = π/2 + nπ are the most striking feature of tan(x): approaching from the left the curve tends to +∞, from the right to −∞. The function is continuous on each interval between asymptotes but has an unavoidable jump at every asymptote — no redefinition can fix it, because the left and right limits disagree. This makes tangent the standard classroom example of a function with infinitely many vertical asymptotes.',
          'Unlike sine and cosine, tangent is unbounded in both directions: its range is all real numbers. Near zero it behaves almost like the line y = x (the small-angle approximation tan(x) ≈ x), then steepens dramatically — at x = 1.4 radians the value is already about 5.8, and at 1.57 it is enormous. Its derivative, sec²(x) = 1 + tan²(x), is always at least 1, confirming the curve never flattens.',
        ],
      },
      {
        heading: 'Where tangent appears',
        body: [
          'Tangent converts angles to slopes, so it appears wherever inclination matters: the grade of a hill (a 45° slope is a 100% grade because tan(45°) = 1), the trajectory math of projectiles, and the angle of a sundial’s shadow. In calculus, the derivative itself is a tangent slope — the tangent line to a curve at a point — and inverse tangent, arctan, is how calculators recover angles from slopes, for instance finding a bearing from Δy/Δx.',
          'In physics, tan shows up in phase relationships: the phase angle of a driven oscillator satisfies tan(φ) = (damping term)/(stiffness term), and in optics the Brewster angle obeys tan(θ) = n₂/n₁. Anywhere a ratio of vertical to horizontal components matters, tangent is the natural language.',
        ],
      },
    ],
    keyFacts: [
      'tan(x) = sin(x)/cos(x); domain is all real x except π/2 + nπ.',
      'Range: all real numbers — tangent is unbounded above and below.',
      'Period π: tan(x + π) = tan(x); odd function, tan(−x) = −tan(x).',
      'Zeros at x = nπ; vertical asymptotes at x = π/2 + nπ.',
      'Derivative is sec²(x) = 1 + tan²(x), always ≥ 1; near 0, tan(x) ≈ x.',
    ],
    faqs: [
      {
        q: 'Why does tan(x) have asymptotes?',
        a: 'Because tan(x) = sin(x)/cos(x), and cos(x) = 0 at x = π/2 + nπ. Dividing by values closer and closer to zero makes the ratio grow without bound, so the graph shoots to ±∞ on either side of each of those points. The function is simply undefined there.',
      },
      {
        q: 'What is the period of tangent?',
        a: 'π, half the period of sine and cosine. Adding π to the angle flips the signs of both sin(x) and cos(x), and the two flips cancel in the ratio, so tan(x + π) = tan(x). The graph repeats its branch pattern every π radians.',
      },
      {
        q: 'Is tangent increasing everywhere?',
        a: 'It is increasing on each interval between consecutive asymptotes, but it is not increasing as a whole function — it jumps from +∞ back down to −∞ at every asymptote. So the statement “tan is increasing” is only true within a single branch, such as (−π/2, π/2).',
      },
    ],
    related: [
      '/functions/sine/',
      '/functions/cosine/',
      '/learn/asymptotes-explained/',
      '/learn/what-is-a-function/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'quadratic',
    name: 'Quadratic',
    displayName: 'Quadratic Function',
    notation: 'f(x) = x^2 - 4',
    expression: 'x^2 - 4',
    tagline:
      'The parabola x² − 4: a U-shaped curve with roots at ±2 and its lowest point at (0, −4).',
    description:
      'Graph f(x) = x² − 4: study the parabola’s vertex, roots at ±2, axis of symmetry, minimum value, and where quadratics appear in physics and algebra.',
    intro: [
      'The quadratic function f(x) = x² − 4 is the simplest parabola with something interesting going on: it crosses the x-axis twice, dips below it, and turns around at a single lowest point. Squaring makes every input non-negative, so x² is smallest at x = 0, and subtracting 4 slides the whole U-shape down four units. The result is a symmetric curve with vertex at (0, −4), opening upward forever.',
      'Quadratics are the workhorses of algebra: they model anything where a quantity depends on the square of another — the area of a square, the height of a thrown ball over time, the profit of a business with linear demand. The example x² − 4 is especially instructive because it factors cleanly as (x − 2)(x + 2), so its x-intercepts at 2 and −2 can be read straight off the algebra. Plot it in the calculator and watch the symmetry about the y-axis.',
    ],
    sections: [
      {
        heading: 'What this quadratic is',
        body: [
          'Every quadratic has the form ax² + bx + c, and its graph is always a parabola — the U-shape you get from squaring. Here a = 1 (positive, so the U opens upward), b = 0 (no tilt, so the vertex sits on the y-axis), and c = −4 (the y-intercept). The vertex formula x = −b/(2a) gives x = 0, and f(0) = −4, confirming the minimum at (0, −4).',
          'Factoring reveals the roots: x² − 4 = (x − 2)(x + 2), a difference of squares, so the curve crosses the x-axis exactly where each factor is zero — at x = 2 and x = −2. Between the roots the function is negative (the dip below the axis); outside them it is positive and grows without bound. Because the x² term dominates for large |x|, both arms of the parabola head to +∞.',
        ],
      },
      {
        heading: 'Symmetry, vertex, and rate of change',
        body: [
          'The y-axis is the parabola’s axis of symmetry: f(−x) = f(x), so the left half mirrors the right. The vertex is the parabola’s turning point — here the global minimum, since the arms rise forever. Any quadratic has exactly one vertex and exactly one extreme value, which is why quadratics are the go-to model for optimization: maximum profit, minimum cost, highest point of a trajectory.',
          'The derivative f′(x) = 2x tells the rest of the story: negative for x < 0 (falling into the vertex), zero at x = 0 (the flat bottom), positive for x > 0 (climbing out). The slope itself grows linearly, a constant second derivative of 2 — the signature of constant acceleration, which is why distance under gravity is quadratic in time.',
        ],
      },
      {
        heading: 'Where quadratics appear',
        body: [
          'Throw a ball and its height follows a parabola: h(t) = −4.9t² + v₀t + h₀, the same shape as x² − 4 but flipped and shifted. Areas and volumes produce quadratics and cubics naturally — doubling a square’s side quadruples its area — and the quadratic formula solves every equation of this type, including this one: x = ±√4 = ±2.',
          'In economics, profit as a function of price is often modeled as a downward-opening parabola (revenue rises then falls as price climbs), and its vertex gives the optimal price. In statistics, least-squares fitting minimizes a quadratic error function, and the normal distribution’s bell curve is e^(−x²) — a quadratic in the exponent.',
        ],
      },
    ],
    keyFacts: [
      'Factored form: x² − 4 = (x − 2)(x + 2); roots (x-intercepts) at x = 2 and x = −2.',
      'Vertex (global minimum) at (0, −4); axis of symmetry is the y-axis (x = 0).',
      'Domain: all real numbers; range: y ≥ −4.',
      'Even function: f(−x) = f(x); the graph mirrors across the y-axis.',
      'y-intercept at (0, −4); the function is negative between the roots and positive outside them.',
      'Derivative f′(x) = 2x; the slope is zero at the vertex and the second derivative is the constant 2.',
    ],
    faqs: [
      {
        q: 'How do you find the roots of x² − 4?',
        a: 'Factor it as a difference of squares: x² − 4 = (x − 2)(x + 2). A product is zero when any factor is zero, so x = 2 or x = −2. Equivalently, the quadratic formula gives x = (0 ± √(0 + 16))/2 = ±2.',
      },
      {
        q: 'What is the minimum value of x² − 4?',
        a: '−4, attained at x = 0. Since x² ≥ 0 for all real x, subtracting 4 gives x² − 4 ≥ −4, with equality only when x² = 0. The vertex (0, −4) is the parabola’s lowest point, and the function increases without bound on both sides.',
      },
      {
        q: 'Why is the graph symmetric?',
        a: 'Because only even powers of x appear: (−x)² − 4 = x² − 4, so f(−x) = f(x). Every input and its negative give the same output, which mirrors the right half of the graph across the y-axis onto the left half.',
      },
    ],
    related: [
      '/examples/projectile-motion/',
      '/functions/square-root/',
      '/functions/absolute-value/',
      '/learn/understanding-derivatives/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'cubic',
    name: 'Cubic',
    displayName: 'Cubic Function',
    notation: 'f(x) = x^3 - 3*x',
    expression: 'x^3 - 3*x',
    tagline:
      'An S-shaped cubic with three real roots, a local hill and valley, and 180° rotational symmetry.',
    description:
      'Graph f(x) = x³ − 3x: find its three real roots, local max and min, inflection point, and discover its surprising link to triple-angle trigonometry.',
    intro: [
      'The cubic f(x) = x³ − 3x traces an elongated S: it rises from −∞, crests a small hill at (−1, 2), dips through the origin into a valley at (1, −2), and climbs away to +∞. Unlike a parabola it has no global maximum or minimum — the x³ term eventually overwhelms everything, dragging the left arm down forever and the right arm up forever. Between the extremes, the curve crosses the x-axis three times, at −√3, 0, and √3.',
      'This particular cubic is a favorite in textbooks because everything about it can be computed by hand: its roots factor via x(x² − 3), its turning points come from the clean derivative 3x² − 3, and it hides a beautiful connection to triple-angle trigonometry. Cubics model volume growth, cubic equations of state, and any relationship where a quantity’s cube matters. Plot x^3 - 3*x in the calculator and zoom out to see the S straighten into its steep end behavior.',
    ],
    sections: [
      {
        heading: 'What this cubic is',
        body: [
          'Factor out x and the roots appear: x³ − 3x = x(x² − 3) = x(x − √3)(x + √3), so the graph crosses the x-axis at −√3 ≈ −1.732, 0, and √3 ≈ 1.732. Three real roots is the most a cubic can display as distinct crossings — the function’s degree sets the maximum. Between consecutive roots the curve must turn around, which is exactly what the hill and valley do.',
          'The end behavior is dictated by x³ alone: as x → +∞ the function → +∞, and as x → −∞ it → −∞. The −3x term only shapes the middle of the graph, carving out the wiggle. Every odd-degree polynomial shares this opposite-ends behavior, which guarantees at least one real root — the curve must cross the axis to get from −∞ to +∞.',
        ],
      },
      {
        heading: 'Turning points and the inflection point',
        body: [
          'The derivative f′(x) = 3x² − 3 = 3(x − 1)(x + 1) vanishes at x = ±1, marking the two turning points: a local maximum at (−1, 2) and a local minimum at (1, −2). The function rises until x = −1, falls until x = 1, then rises forever — the classic up-down-up of a cubic with two critical points. These are only local extremes; the global behavior is unbounded both ways.',
          'Halfway between them, at (0, 0), sits the inflection point, where the curve changes from concave-down to concave-up. The second derivative f″(x) = 6x confirms it: negative left of 0, positive right of 0, zero exactly at the origin. Because the cubic is an odd function, the inflection point is also the center of its 180° rotational symmetry — rotate the graph half a turn about (0, 0) and it maps onto itself.',
        ],
      },
      {
        heading: 'A hidden trigonometric identity',
        body: [
          'Here is the surprise this cubic is famous for: substituting x = 2cos θ gives x³ − 3x = 2cos(3θ). You can verify it from the triple-angle formula cos(3θ) = 4cos³θ − 3cos θ: with x = 2cos θ, the left side becomes 8cos³θ − 6cos θ = 2(4cos³θ − 3cos θ) = 2cos(3θ). The cubic is secretly a tripled angle in disguise.',
          'This identity is more than a curiosity — it is the key to solving cubic equations trigonometrically. A cubic with three real roots, like this one, can be solved by writing its roots as scaled cosines of suitable angles, a method going back to Viète. It also explains why the hill and valley have the exact heights ±2: they are 2cos(3θ) evaluated at its own peaks.',
        ],
      },
    ],
    keyFacts: [
      'Factored: x(x − √3)(x + √3); three real roots at x = −√3, 0, and √3.',
      'Local maximum at (−1, 2); local minimum at (1, −2); no global max or min.',
      'Inflection point at (0, 0); odd function with 180° rotational symmetry about the origin.',
      'Domain and range: all real numbers.',
      'End behavior: f(x) → −∞ as x → −∞ and f(x) → +∞ as x → +∞.',
      'Identity: with x = 2cos θ, x³ − 3x = 2cos(3θ).',
    ],
    faqs: [
      {
        q: 'Why does x³ − 3x cross the x-axis three times?',
        a: 'Its factored form x(x − √3)(x + √3) shows three distinct linear factors, each contributing one zero: x = 0, x = √3, and x = −√3. A degree-3 polynomial can have at most three real roots, and this one attains the maximum. Between each pair of roots the derivative’s turning points force the curve to reverse direction.',
      },
      {
        q: 'What are the local max and min?',
        a: 'Solve f′(x) = 3x² − 3 = 0 to get x = ±1. Then f(−1) = −1 + 3 = 2 is the local maximum and f(1) = 1 − 3 = −2 is the local minimum. They are “local” because the function exceeds any bound far to the right and falls below any bound far to the left.',
      },
      {
        q: 'What does this cubic have to do with trigonometry?',
        a: 'The identity x³ − 3x = 2cos(3θ) under the substitution x = 2cos θ links the cubic to triple-angle formulas. Historically this connection gave a trigonometric method for solving cubics with three real roots — the “casus irreducibilis” that puzzled 16th-century algebraists.',
      },
    ],
    related: [
      '/functions/quadratic/',
      '/learn/understanding-derivatives/',
      '/learn/what-is-a-function/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'exponential',
    name: 'Exponential',
    displayName: 'Exponential Function',
    notation: 'f(x) = e^x',
    expression: 'e^x',
    tagline:
      'The function that is its own derivative — constant relative growth, forever increasing, never touching zero.',
    description:
      'Graph f(x) = eˣ: explore constant relative growth, the horizontal asymptote y = 0, the point (0, 1), and exponential models in science and finance.',
    intro: [
      'The exponential function f(x) = eˣ is the mathematical embodiment of growth proportional to size: money earning compound interest, bacteria doubling in a dish, or a rumor spreading through a crowd. Its defining property is that its rate of change equals its current value — d/dx eˣ = eˣ — which is why it appears whenever a quantity’s growth rate is proportional to the quantity itself. The base e ≈ 2.71828 is the unique number that makes this work.',
      'The graph tells the story at a glance: it passes through (0, 1), creeps almost flat along the x-axis for large negative x (approaching but never reaching 0), then bends upward and climbs ever more steeply for positive x. At x = 1 it equals e ≈ 2.718, at x = 2 it is e² ≈ 7.389, and each unit step multiplies the value by another factor of e. Type e^x into the calculator and compare it with 2^x to see how the base controls the steepness.',
    ],
    sections: [
      {
        heading: 'What the exponential function is',
        body: [
          'Repeated multiplication is the heart of eˣ: e³ means e·e·e, and the exponent laws e^(a+b) = e^a·e^b extend this to all real powers, including fractions and negatives (e^(−x) = 1/eˣ). The number e itself can be defined as the limit of (1 + 1/n)ⁿ as n grows — the result of compounding 100% interest over infinitely many periods — or as the infinite sum 1 + 1 + 1/2! + 1/3! + ⋯.',
          'What makes e special among all bases is the derivative: d/dx aˣ = aˣ·ln(a), and only for a = e does the ln factor equal 1, leaving the function unchanged by differentiation. Equivalently, eˣ is the unique function satisfying f′ = f with f(0) = 1. That is why e is called the natural base — calculus singles it out.',
        ],
      },
      {
        heading: 'Shape, asymptote, and growth',
        body: [
          'For x < 0 the graph hugs the x-axis from above, decaying toward 0 without ever touching it — the horizontal asymptote y = 0 as x → −∞. At x = 0 the curve passes through (0, 1), its y-intercept, and for x > 0 it accelerates upward, convex everywhere (second derivative eˣ > 0) and increasing everywhere (first derivative eˣ > 0). There are no zeros, no turning points, no inflection points: just relentless, smooth, upward-curving growth.',
          'Exponential growth eventually outruns any polynomial: eˣ grows faster than x¹⁰⁰, faster than any fixed power. This is why exponentials model runaway processes — chain reactions, viral spread in its early phase — and also why their inverses, the logarithms, grow so slowly. On a log scale, eˣ becomes the straight line y = x, a handy way to spot exponential data.',
        ],
      },
      {
        heading: 'Where exponentials appear',
        body: [
          'Any differential equation of the form dy/dx = ky has the solution y = Ce^(kx): Newton’s law of cooling, radioactive decay (with k < 0), continuously compounded interest, and population growth all follow it. The normal distribution’s bell curve, (1/√(2π))e^(−x²/2), puts an exponential of a quadratic at the center of statistics. In complex analysis, Euler’s formula e^(iθ) = cos θ + i·sin θ fuses exponentials with trigonometry and powers all of AC circuit theory and quantum mechanics.',
          'In computing, exponentials cut both ways: algorithms with exponential time complexity become infeasible as inputs grow, while exponential backoff — waiting 1, 2, 4, 8… seconds between retries — is the standard cure for overloaded servers. The logistic curve, eˣ/(1 + eˣ), tames pure exponential growth with a carrying capacity and models everything from epidemics to neural network activations.',
        ],
      },
    ],
    keyFacts: [
      'Domain: all real numbers; range: y > 0 — eˣ is never zero or negative.',
      'y-intercept at (0, 1); horizontal asymptote y = 0 as x → −∞.',
      'Strictly increasing and convex everywhere; no maxima, minima, or inflection points.',
      'Its own derivative: d/dx eˣ = eˣ; an antiderivative is eˣ itself.',
      'Exponent laws: e^(a+b) = e^a·e^b, e^(−x) = 1/eˣ, (eˣ)^n = e^(nx).',
      'e ≈ 2.71828; eˣ outgrows every polynomial as x → ∞.',
    ],
    faqs: [
      {
        q: 'Why is eˣ its own derivative?',
        a: 'By definition e is the unique base for which d/dx aˣ = aˣ·ln(a) has ln(a) = 1. Differentiating eˣ via the limit definition gives eˣ times the limit of (e^h − 1)/h, and e is defined precisely as the number making that limit equal 1. So the slope of the graph at each point equals the function’s height there.',
      },
      {
        q: 'What is e, exactly?',
        a: 'An irrational number approximately 2.71828, definable as the limit of (1 + 1/n)ⁿ as n → ∞ or the sum 1 + 1 + 1/2! + 1/3! + ⋯. Like π, its decimal expansion never repeats. It is the “natural” base because calculus takes its simplest form with it.',
      },
      {
        q: 'Does eˣ ever reach zero?',
        a: 'No. For real x, eˣ > 0 always — the graph approaches the x-axis asymptotically as x → −∞ but never touches it. This follows from eˣ·e^(−x) = e^0 = 1: if eˣ were zero, the product could not be 1.',
      },
    ],
    related: [
      '/functions/natural-logarithm/',
      '/examples/logistic-growth/',
      '/learn/understanding-derivatives/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'natural-logarithm',
    name: 'Natural Logarithm',
    displayName: 'Natural Logarithm Function',
    notation: 'f(x) = log(x)',
    expression: 'log(x)',
    tagline:
      'The inverse of eˣ — it unwraps exponential growth, turning multiplication into addition.',
    description:
      'Graph f(x) = ln(x): explore its domain x > 0, the asymptote at x = 0, the log laws, its role as the inverse of eˣ, and uses from pH to algorithms.',
    intro: [
      'The natural logarithm, written ln(x) or log(x), answers the question “e to what power gives x?” It is the exact inverse of the exponential function: ln(eˣ) = x and e^(ln x) = x, so its graph is the mirror image of y = eˣ reflected across the line y = x. Where the exponential rockets upward, the logarithm climbs with agonizing slowness — ln(10) ≈ 2.303, ln(100) ≈ 4.605, ln(1,000,000) ≈ 13.816 — each tenfold increase in x adds only about 2.303 to the output.',
      'That slow growth is precisely the point: logarithms compress enormous ranges into manageable ones, which is why the Richter scale, decibels, and pH are all logarithmic. The graph passes through (1, 0), rises for x > 1, dives to −∞ as x approaches 0 from the right (the vertical asymptote at x = 0), and is undefined for x ≤ 0 — you cannot raise e to any real power and get zero or a negative number. Type log(x) into the calculator alongside e^x to see the mirror symmetry.',
    ],
    sections: [
      {
        heading: 'What the natural logarithm is',
        body: [
          'Logarithms were invented to turn multiplication into addition: ln(ab) = ln(a) + ln(b). Before electronic calculators, scientists multiplied large numbers by looking up their logarithms, adding, and converting back — the slide rule is a physical embodiment of this idea. The “natural” in the name refers to base e, the base that makes calculus clean: d/dx ln(x) = 1/x, the simplest possible derivative for an inverse-exponential.',
          'The three log laws follow from the exponent laws of its inverse: ln(ab) = ln a + ln b, ln(a/b) = ln a − ln b, and ln(a^b) = b·ln a. Together they let you dismantle complicated multiplicative expressions into sums — the reason logarithms appear in entropy formulas, likelihood calculations, and anywhere products become unwieldy.',
        ],
      },
      {
        heading: 'Domain, asymptote, and shape',
        body: [
          'The domain is x > 0 only, a direct consequence of eˣ > 0: there is no real power of e that yields zero or a negative number, so the logarithm cannot accept them. As x → 0⁺, ln(x) → −∞, giving the vertical asymptote x = 0 (the y-axis) — the mirror of the exponential’s horizontal asymptote. The x-intercept is at (1, 0) since e^0 = 1, the mirror of eˣ’s y-intercept at (0, 1).',
          'The curve is increasing everywhere (derivative 1/x > 0 for x > 0) but concave down everywhere (second derivative −1/x² < 0): it rises quickly just right of zero, then flattens relentlessly. It has no maximum and no inflection point, and it is the antiderivative of 1/x — the integral that no power rule can handle, since ∫xⁿ dx fails at n = −1.',
        ],
      },
      {
        heading: 'Where logarithms appear',
        body: [
          'Logarithmic scales measure phenomena spanning many orders of magnitude: each Richter point is about 32× the energy, each pH unit is 10× the acidity, and decibels compress sound intensities from a whisper to a jet engine into a 0–140 range. In information theory, entropy is measured in nats (natural log) or bits (log base 2), quantifying surprise and optimal code lengths.',
          'In computer science, O(log n) algorithms — binary search being the classic — halve the problem each step, so doubling the input adds just one more step; that is logarithmic growth in action. In statistics, taking logs straightens exponential data into lines, and the log-normal distribution models quantities like incomes and particle sizes that multiply rather than add.',
        ],
      },
    ],
    keyFacts: [
      'Domain: x > 0; range: all real numbers. Undefined at x ≤ 0.',
      'Inverse of eˣ: ln(eˣ) = x and e^(ln x) = x; graphs mirror across y = x.',
      'x-intercept at (1, 0); vertical asymptote x = 0 with ln(x) → −∞ as x → 0⁺.',
      'Log laws: ln(ab) = ln a + ln b; ln(a/b) = ln a − ln b; ln(a^b) = b·ln a.',
      'Derivative d/dx ln(x) = 1/x; ln is the antiderivative of 1/x.',
      'Increasing and concave down on its whole domain; no maxima, minima, or inflection points.',
    ],
    faqs: [
      {
        q: 'Why is ln(x) undefined for negative x?',
        a: 'Because ln(x) asks “e to what power equals x?”, and e raised to any real power is always positive. No real exponent produces zero or a negative number, so the logarithm has no real value there. (Complex logarithms exist but are multi-valued and beyond this real-valued graph.)',
      },
      {
        q: 'What is the difference between ln(x) and log₁₀(x)?',
        a: 'Only the base: ln uses e ≈ 2.718, log₁₀ uses 10. They are proportional — ln(x) = ln(10)·log₁₀(x) ≈ 2.303·log₁₀(x) — so their graphs have identical shapes, just different vertical scales. Natural logs give the cleanest calculus (derivative 1/x); base-10 logs suit decimal-scale measurements.',
      },
      {
        q: 'Why does the graph flatten out so much?',
        a: 'Because undoing exponential growth is inherently slow: to increase ln(x) by 1 you must multiply x by e ≈ 2.718. The derivative 1/x shrinks as x grows, so each additional unit of height requires an ever-larger multiple of x. That flattening is exactly what makes logarithms ideal for compressing huge ranges.',
      },
    ],
    related: [
      '/functions/exponential/',
      '/learn/understanding-integrals/',
      '/learn/understanding-derivatives/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'square-root',
    name: 'Square Root',
    displayName: 'Square Root Function',
    notation: 'f(x) = sqrt(x)',
    expression: 'sqrt(x)',
    tagline: 'The gentle half-parabola — the inverse of squaring, defined for x ≥ 0.',
    description:
      'Graph f(x) = √x: explore its domain x ≥ 0, the half-parabola shape, points (0,0) and (4,2), and square roots in distance and geometry problems.',
    intro: [
      'The square root function f(x) = √x answers “which non-negative number, multiplied by itself, gives x?” Its graph is the upper half of a sideways parabola: starting at the origin, it rises steeply — with a vertical tangent — then bends over and flattens, passing through (1, 1), (4, 2), and (9, 3). It is the inverse of x² restricted to x ≥ 0, so its graph is the mirror of the right half of the parabola y = x² reflected across the line y = x.',
      'Square roots appear wherever Pythagoras does: the distance formula √((Δx)² + (Δy)²) is a square root, and so are standard deviation, the quadratic formula’s discriminant term, and the root-mean-square behind AC voltage ratings. The function grows without bound but ever more slowly — √1,000,000 is only 1,000. Type sqrt(x) into the calculator and plot x^2 on [0, ∞) beside it to see the mirror symmetry.',
    ],
    sections: [
      {
        heading: 'What the square root is',
        body: [
          'The symbol √ denotes the principal (non-negative) square root: √9 = 3, not ±3, because a function must give one output per input. The equation x² = 9 has two solutions, ±3, but the function √x returns only the non-negative one — the ± belongs to solving equations, not to the function. This single-valuedness is what makes √x differentiable and graphable as one clean curve.',
          'Algebraically, √(x²) = |x|, not x — the root undoes the square but restores non-negativity, which is why the absolute-value function appears. The root also obeys √(ab) = √a·√b and √(a/b) = √a/√b for non-negative a, b, the multiplicative laws inherited from exponents since √x = x^(1/2).',
        ],
      },
      {
        heading: 'Domain, shape, and the vertical tangent',
        body: [
          'The domain is x ≥ 0: no real number squares to a negative, so the function cannot accept negative inputs (over the reals). At x = 0 the graph starts with a vertical tangent — the derivative 1/(2√x) blows up to +∞ — which you can see as the curve leaving the origin straight upward before bending right. It is increasing everywhere on its domain and concave down everywhere, flattening as x grows.',
          'The range is y ≥ 0, and notable points are perfect squares: (0, 0), (1, 1), (4, 2), (9, 3), (16, 4). Between them the curve interpolates smoothly — √2 ≈ 1.414, the famous irrational whose discovery shook Pythagorean mathematics. The function has no maximum and its only endpoint extremum is the minimum 0 at x = 0.',
        ],
      },
      {
        heading: 'Where square roots appear',
        body: [
          'Distance is the square root’s home turf: from Pythagoras’ hypotenuse to the n-dimensional distance formula to the standard deviation (the square root of variance), “square, add, root” is one of mathematics’ most repeated patterns. The quadratic formula x = (−b ± √(b² − 4ac))/(2a) puts a square root at the heart of solving quadratics — including finding where x² − 4 crosses zero.',
          'In physics, many laws involve square roots: the period of a pendulum is proportional to √(length), escape velocity to √(1/radius), and the RMS voltage of AC mains is the peak voltage divided by √2. In geometry, √2 is the diagonal of a unit square and the aspect ratio of A-series paper.',
        ],
      },
    ],
    keyFacts: [
      'Principal root: √x ≥ 0 for all x in the domain; √9 = 3, not ±3.',
      'Domain: x ≥ 0; range: y ≥ 0. Undefined for negative x (over the reals).',
      'Inverse of x² on [0, ∞): √(x²) = |x|, and (√x)² = x for x ≥ 0.',
      'Key points: (0, 0), (1, 1), (4, 2), (9, 3); vertical tangent at the origin.',
      'Increasing and concave down on its domain; minimum 0 at x = 0, no maximum.',
      'Derivative d/dx √x = 1/(2√x); laws √(ab) = √a·√b for a, b ≥ 0.',
    ],
    faqs: [
      {
        q: 'Why isn’t √9 equal to ±3?',
        a: 'Because √ denotes a function, and functions return exactly one value per input — by convention the non-negative root. The equation x² = 9 does have two solutions, x = 3 and x = −3, but only 3 is √9. Writing ±√9 recovers both solutions when solving.',
      },
      {
        q: 'Why can’t you take the square root of a negative number (in reals)?',
        a: 'Because every real number squared is non-negative: positives give positive squares, negatives give positive squares, and zero gives zero. Nothing real squares to −1, so √(−1) has no real value. Extending the number system with i, where i² = −1, gives complex square roots.',
      },
      {
        q: 'What is the derivative of √x at x = 0?',
        a: 'It doesn’t exist — the derivative 1/(2√x) tends to +∞ as x → 0⁺, so the graph has a vertical tangent at the origin. Geometrically the curve leaves (0, 0) heading straight up; there is no finite slope there, though the function itself is continuous at 0.',
      },
    ],
    related: [
      '/functions/quadratic/',
      '/functions/absolute-value/',
      '/learn/what-is-a-function/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'absolute-value',
    name: 'Absolute Value',
    displayName: 'Absolute Value Function',
    notation: 'f(x) = abs(x)',
    expression: 'abs(x)',
    tagline:
      'The V-shaped measure of distance from zero — simple, symmetric, with a corner at the origin.',
    description:
      'Graph f(x) = |x|: explore the V-shaped graph, the corner at the origin, its distance meaning, the piecewise definition, and uses in error bounds.',
    intro: [
      'The absolute value function f(x) = |x| is distance made visible: |x| is how far x sits from zero on the number line, regardless of direction. Its graph is a perfect V — the line y = −x for negative inputs meeting the line y = x for positive ones at the sharp corner (0, 0). That corner is the function’s most famous feature: the one point where it is continuous but not differentiable, where the slope jumps from −1 to 1.',
      'Absolute value turns up wherever magnitude matters more than sign: error bounds (|measured − true| < tolerance), tolerances in manufacturing, the distance between two numbers (|a − b|), and piecewise definitions throughout applied mathematics. It is also the simplest example of a function built by gluing two formulas together. Type abs(x) into the calculator, then try abs(x - 3) to watch the V slide and see distance-from-3 drawn as a graph.',
    ],
    sections: [
      {
        heading: 'What absolute value is',
        body: [
          'The definition is piecewise: |x| = x when x ≥ 0 and |x| = −x when x < 0 — the minus sign flips negatives back to positive. So |5| = 5 and |−5| = −(−5) = 5. Equivalently, |x| = √(x²), which shows why the output is never negative: squaring erases the sign and the principal root keeps it erased. Both forms say the same thing: magnitude without direction.',
          'This makes |x − a| the distance between x and a, the workhorse interpretation. The inequality |x − 3| < 2 describes all points within 2 units of 3, i.e. the open interval (1, 5) — absolute value converts distance language into algebra and back. It is an even function, |−x| = |x|, so the V mirrors perfectly across the y-axis.',
        ],
      },
      {
        heading: 'The corner at the origin',
        body: [
          'At x = 0 the two arms of the V meet at an angle, and that angle is a genuine singularity of smoothness: approaching from the left the slope is −1, from the right it is +1, so no single tangent line exists. The function is continuous at 0 — the arms join without a gap — but not differentiable there, the standard counterexample separating the two concepts in every calculus course.',
          'Away from the corner everything is tame: the derivative is −1 for x < 0 and +1 for x > 0, often written as the sign function, and the second derivative is 0 wherever it exists. The V has its global minimum of 0 at x = 0 and no maximum; both arms rise to +∞ with constant slope, never bending.',
        ],
      },
      {
        heading: 'Where absolute value appears',
        body: [
          'Error analysis runs on absolute value: “within 0.5 of the true value” is |error| < 0.5, and numerical methods stop when successive approximations satisfy |xₙ₊₁ − xₙ| < tolerance. In statistics, mean absolute deviation measures spread without squaring, staying in the original units and resisting outliers better than variance.',
          'In optimization and machine learning, the absolute value is the L1 penalty: minimizing sums of |·| encourages sparsity (many exact zeros), unlike the squared L2 penalty. Piecewise-linear models, from tax brackets to ReLU neural networks (max(0, x) = (x + |x|)/2), are built from absolute-value-like corners — the kink at zero is a feature, not a bug.',
        ],
      },
    ],
    keyFacts: [
      'Piecewise definition: |x| = x for x ≥ 0, |x| = −x for x < 0; equivalently |x| = √(x²).',
      'Domain: all real numbers; range: y ≥ 0.',
      'V-shaped graph with vertex (corner) at (0, 0); even function, symmetric about the y-axis.',
      'Continuous everywhere but not differentiable at x = 0 (slope jumps from −1 to 1).',
      '|x − a| is the distance between x and a; global minimum 0 at x = 0, no maximum.',
    ],
    faqs: [
      {
        q: 'Why is |x| not differentiable at 0?',
        a: 'Differentiability at a point requires the slopes from both sides to agree. For |x|, the left-hand slope is −1 and the right-hand slope is +1 — they disagree, so no tangent line exists at the corner. The function is still continuous there; it just has a kink.',
      },
      {
        q: 'What is the difference between |x| and √(x²)?',
        a: 'None — they are the same function. Squaring removes the sign of x and the principal square root returns the non-negative result, which is exactly the absolute value. The identity |x| = √(x²) is often used to differentiate |x| away from zero.',
      },
      {
        q: 'How do you solve |x − 3| = 5?',
        a: 'Read it as “the distance from x to 3 is 5”, giving x = 3 + 5 = 8 or x = 3 − 5 = −2. Algebraically, split into cases: x − 3 = 5 gives x = 8, and x − 3 = −5 gives x = −2. Both check out: |8 − 3| = 5 and |−2 − 3| = 5.',
      },
    ],
    related: [
      '/functions/square-root/',
      '/learn/what-is-a-function/',
      '/functions/quadratic/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'reciprocal',
    name: 'Reciprocal',
    displayName: 'Reciprocal Function',
    notation: 'f(x) = 1/x',
    expression: '1/x',
    tagline: 'The hyperbola 1/x — two mirror branches divided by asymptotes on both axes.',
    description:
      'Graph f(x) = 1/x: explore the hyperbola’s two branches, the asymptotes on both axes, odd symmetry, and inverse-proportion models in science.',
    intro: [
      'The reciprocal function f(x) = 1/x is the graph of inverse proportion: double the input, halve the output. Its graph is a hyperbola with two branches — one in the first quadrant sweeping from +∞ down toward the x-axis, one in the third quadrant rising from −∞ up toward it — separated by an uncrossable gap at x = 0. The curve never touches either axis: the y-axis (x = 0) is a vertical asymptote and the x-axis (y = 0) is a horizontal one.',
      'Wherever one quantity is divided by another, the reciprocal lurks: at fixed voltage, current is proportional to 1/R (Ohm’s law); at fixed amount of gas, pressure is proportional to 1/V (Boyle’s law); the time to complete a job is proportional to 1/(workers). The function is its own inverse — applying it twice returns x — and odd, with 180° rotational symmetry about the origin. Type 1/x into the calculator and zoom out: the branches flatten against the axes but never land.',
    ],
    sections: [
      {
        heading: 'What the reciprocal is',
        body: [
          'Taking a reciprocal means dividing 1 by the input: 1/2 = 0.5, 1/4 = 0.25, 1/0.5 = 2. Small inputs produce huge outputs and huge inputs produce tiny ones — the defining seesaw of inverse proportion. Because 1/(1/x) = x, the function is an involution: it undoes itself, so its graph is symmetric across the line y = x, the hallmark of inverse functions.',
          'The function is odd, f(−x) = −f(x): the third-quadrant branch is the first-quadrant branch rotated 180° about the origin. Notable points are (1, 1) and (−1, −1), the only points where input equals output (solving 1/x = x gives x² = 1). Everywhere else, input and output differ — dramatically so near zero.',
        ],
      },
      {
        heading: 'Two asymptotes, two branches',
        body: [
          'x = 0 is a vertical asymptote: as x → 0⁺ the values → +∞, as x → 0⁻ they → −∞, and 1/0 is undefined — division by zero has no meaning, so the branches can never join. y = 0 is a horizontal asymptote: as |x| → ∞ the values → 0, approaching the x-axis ever more closely without reaching it. The axes are walls the curve approaches but never touches.',
          'Each branch is strictly decreasing: on (0, ∞), larger x gives smaller 1/x, and the same holds on (−∞, 0). But the function as a whole is not decreasing — it jumps from −∞ up to +∞ across the gap at zero. The derivative f′(x) = −1/x² is negative wherever defined, confirming the downhill slide on each branch, and the curve is convex on (0, ∞) and concave on (−∞, 0).',
        ],
      },
      {
        heading: 'Where the reciprocal appears',
        body: [
          'Inverse proportionality is everywhere in science: Boyle’s law (P ∝ 1/V), Ohm’s law (I = V/R), the lens equation’s 1/f = 1/dₒ + 1/dᵢ, and gravitational and electrostatic forces falling as 1/r². In each case, doubling the denominator halves the result — the reciprocal’s signature. Frequency and period are reciprocals (f = 1/T): a 0.01 s period is a 100 Hz tone.',
          'In calculus, 1/x is famous as the function whose antiderivative is not a power: ∫(1/x)dx = ln|x| + C, the integral that forced the invention of the logarithm. Its improper integral from 1 to ∞ diverges (the harmonic series’ continuous cousin), yet the same shape rotated gives Gabriel’s horn — finite volume, infinite surface area.',
        ],
      },
    ],
    keyFacts: [
      'Domain: all real x ≠ 0; range: all real y ≠ 0. Undefined at x = 0.',
      'Hyperbola with two branches: (0, ∞) gives positive values, (−∞, 0) gives negative values.',
      'Vertical asymptote x = 0; horizontal asymptote y = 0.',
      'Odd function: f(−x) = −f(x); 180° rotational symmetry about the origin; its own inverse.',
      'Passes through (1, 1) and (−1, −1); strictly decreasing on each branch.',
      'Derivative f′(x) = −1/x²; antiderivative is ln|x| + C.',
    ],
    faqs: [
      {
        q: 'Why is 1/0 undefined?',
        a: 'Division asks “what times the divisor gives the dividend?” — no number times 0 gives 1, so 1/0 has no answer. On the graph this shows up as the vertical asymptote: values blow up to ±∞ near zero but never settle on a value at zero itself.',
      },
      {
        q: 'Is 1/x increasing or decreasing?',
        a: 'Decreasing on each of its two intervals — pick any two positive numbers and the larger input gives the smaller output — but not decreasing overall, because it jumps from −∞ to +∞ across x = 0. The derivative −1/x² is negative everywhere the function is defined, which only speaks about behavior within each branch.',
      },
      {
        q: 'What is the integral of 1/x?',
        a: 'ln|x| + C. The power rule ∫xⁿ dx = x^(n+1)/(n+1) fails at n = −1 (division by zero), so 1/x needs its own antiderivative — historically, this integral is how the natural logarithm was first defined. The absolute value keeps the formula valid for negative x too.',
      },
    ],
    related: [
      '/learn/asymptotes-explained/',
      '/functions/natural-logarithm/',
      '/learn/understanding-integrals/',
      '/graphing-calculator/',
    ],
  },
];
