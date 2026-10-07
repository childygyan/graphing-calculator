import type { LearnArticle } from '../../../data/seo/types.js';

export const BATCH_6: LearnArticle[] = [
  {
    slug: "reciprocal-trig-functions",
    title: "How to Graph Secant, Cosecant and Cotangent on a Graphing Calculator",
    description:
      "Graph secant, cosecant and cotangent by typing 1/cos(x), 1/sin(x) and cos(x)/sin(x) — with asymptotes, ranges and troubleshooting tips.",
    sections: [
      {
        heading: "The direct answer: type the reciprocal",
        body: [
          "There are no sec, csc, or cot buttons on this calculator — and you don't need them. Secant is the reciprocal of cosine, cosecant the reciprocal of sine, and cotangent the reciprocal of tangent. So type the reciprocal directly into a y = box: 1/cos(x) for secant, 1/sin(x) for cosecant, and cos(x)/sin(x) for cotangent. The parser accepts all three exactly as written, and like all trig here they take their input in radians.",
          "The moment you press enter you'll see the signature look of reciprocal trig: repeating U-shaped branches separated by gaps. Those gaps are not a bug — they are vertical asymptotes at the exact points where the denominator equals zero, and they are the whole story of these graphs. Everything below is about reading them correctly.",
        ],
      },
      {
        heading: "Where the graph breaks: asymptotes at the zeros",
        body: [
          "A reciprocal blows up wherever its denominator is zero. For y = 1/cos(x), that is wherever cos(x) = 0, namely x = π/2 + kπ (…, −π/2, π/2, 3π/2, …). For y = 1/sin(x) and y = cos(x)/sin(x), it is wherever sin(x) = 0, namely x = kπ (…, −π, 0, π, …). Memorize these two zero-sets and you can predict every break in all three graphs before you even plot them.",
          "On the interval [0, 2π] this is concrete: secant breaks at π/2 and 3π/2, while cosecant and cotangent break at 0, π, and 2π. Set your window to span −2π to 2π and you will see two full periods of secant and cosecant laid out with their asymptotes evenly spaced — the single best view for learning these shapes.",
          "Cotangent earns one extra feature: its zeros. Since cot(x) = cos(x)/sin(x), it equals zero wherever cos(x) = 0 — at x = π/2 + kπ, exactly where secant has its asymptotes. Plot tan(x) alongside cos(x)/sin(x) and watch them cross zero at the same points: the same relationship, viewed reciprocally.",
        ],
      },
      {
        heading: "Reading the branches: ranges and the parent curve",
        body: [
          "Compare each reciprocal with its parent and the shape explains itself. Where cos(x) = ±1, sec(x) = ±1; where cos(x) shrinks toward zero, |sec(x)| grows without bound. That forces the secant and cosecant branches to live entirely outside the strip between −1 and 1 — their range is (−∞, −1] ∪ [1, ∞), so you will never see a branch cross the x-axis. Cotangent has no such restriction: it passes through zero at every x = π/2 + kπ and its range is all real numbers.",
          "Sign follows the parent too: secant is positive exactly where cosine is positive, so its upward-opening U's sit over cosine's humps and its downward U's hang below cosine's troughs. Plot sin(x) together with 1/sin(x) and watch the mechanism directly — each U of the cosecant curve cradles a hump of the sine wave, touching it exactly where sin(x) = ±1 and flying off toward the asymptotes where sin(x) = 0.",
          "The periods carry over unchanged: secant and cosecant repeat every 2π, cotangent every π. If a branch looks stretched or compressed, check that you haven't confused cotangent's shorter period with the other two.",
        ],
      },
      {
        heading: "Try it: verify with the table of values",
        body: [
          "Don't take the picture on faith — check a few exact points. Open the table of values for y = 1/cos(x): at x = 0 you get 1, and at x = π/3 you get exactly 2, since cos(π/3) = 1/2. For y = cos(x)/sin(x), sample near x = π/2 and watch the values collapse toward zero, confirming the zero you predicted from the algebra.",
          "The table is also the fastest way to confirm an asymptote. Sample y = 1/cos(x) just left and just right of x = π/2: the values explode in opposite directions, which is exactly what a vertical asymptote means. Then zoom in close to that asymptote on the graph — from far away the curve looks like it might touch the gap, but up close you can see it never does.",
        ],
      },
      {
        heading: "Troubleshooting: when the graph looks wrong",
        body: [
          "The most common surprise is a near-vertical line segment that seems to connect two branches across an asymptote. That segment is a drawing artifact: between two sampled points on opposite sides of the asymptote, the screen joins the dots across the gap. It does not mean the function is defined there — zoom in and the break becomes visible. If the whole screen looks like a tangle of steep lines, you are simply viewing too many periods at once; narrow the x-range.",
          "A completely blank graph usually means a typo (cos without the (x), say) or a window containing no periods of the function. And remember the calculator works in radians: the asymptotes sit at multiples of π/2, not at 90°, so 1/cos(90) is a perfectly ordinary finite number, not a blow-up. Keep the window in multiples of π and the asymptotes will land where you expect.",
        ],
      },
    ],
    tryExpressions: ["1/cos(x)", "1/sin(x)", "cos(x)/sin(x)"],
    keyTakeaways: [
      "Type 1/cos(x), 1/sin(x) and cos(x)/sin(x) — there are no built-in sec, csc or cot functions.",
      "Every gap is a vertical asymptote at a zero of the denominator: x = π/2 + kπ for secant, x = kπ for cosecant and cotangent.",
      "Secant and cosecant never enter (−1, 1); cotangent crosses zero wherever cos(x) = 0 and ranges over all reals.",
      "Near-vertical connector segments across a gap are sampling artifacts — zoom in to see the true break.",
      "Trig functions take radians, so asymptotes land on multiples of π/2; a window from −2π to 2π shows two full periods.",
    ],
    images: [
      {
        src: "/images/learn/reciprocal-trig-functions/graph-1.png",
        alt: "Graphs of y = 1/cos(x), y = 1/sin(x) and y = cos(x)/sin(x) plotted together, with U-shaped branches separated by vertical asymptotes.",
        caption:
          "Secant (1/cos(x)), cosecant (1/sin(x)) and cotangent (cos(x)/sin(x)) plotted together. Every branch breaks at a vertical asymptote wherever the denominator equals zero.",
      },
      {
        src: "/images/learn/reciprocal-trig-functions/graph-2.png",
        alt: "Graph of y = 1/cos(x) alone, showing repeating U-shaped secant branches with vertical asymptotes at multiples of pi/2.",
        caption:
          "y = 1/cos(x) alone: the secant curve. Each U-shaped branch hugs the cosine wave where |cos(x)| is near 1 and shoots toward the asymptotes where cos(x) = 0.",
      },
    ],
    faqs: [
      {
        q: "Why does my secant graph have gaps in it?",
        a: "Those gaps are the point. Secant is undefined wherever cos(x) = 0 — at x = π/2 + kπ — so the calculator correctly draws nothing there. The gaps are vertical asymptotes, not missing data.",
      },
      {
        q: "Can I type 1/tan(x) for cotangent instead of cos(x)/sin(x)?",
        a: "Yes. The two expressions are equal wherever both are defined, so their graphs coincide. Writing cos(x)/sin(x) just keeps everything in sines and cosines, which makes the zeros and asymptotes easier to read.",
      },
      {
        q: "My cosecant graph shows steep lines joining the branches — is that right?",
        a: "No — that is a sampling artifact. Between two plotted points on opposite sides of an asymptote, the screen joins the dots across the gap. Zoom in on the asymptote and you will see the branches genuinely break apart.",
      },
    ],
    related: [
      "/math-functions/cosine/",
      "/math-functions/sine/",
      "/math-functions/tangent/",
      "/learn/asymptotes-explained/",
      "/learn/amplitude-period-phase-shift/",
      "/learn/how-to-use-the-table-of-values/",
      "/examples/trigonometric-interference/",
    ],
    reviewedOn: "2026-11-01",
  },
  {
    slug: "window-and-zoom-settings",
    title: "Graphing Calculator Window and Zoom Settings: A Practical Guide",
    description:
      "Master the graphing calculator window: zoom in on roots, zoom out for end behavior, fix stretched circles and sampling artifacts.",
    sections: [
      {
        heading: "The direct answer: the window is a rectangle",
        body: [
          "Everything on screen is a rectangle of the x–y plane, set by four numbers: the minimum and maximum x, and the minimum and maximum y. If a graph looks wrong — blank, flat, or cut off — the window is the first suspect, not the expression. Open the window settings and think of those four numbers as choosing which slice of the infinite plane you are looking at.",
          "Two habits cover most situations: zoom out when you want the big picture (end behavior, the full shape of a curve), and zoom in when you want detail (a root, a turning point, what happens near an asymptote). An auto-fit command — often called ZoomFit — resizes the window to frame everything you have graphed, and it is the fastest recovery when you are lost.",
          "A classic window illusion: graph y = 0.001*x^2 in the default window and it looks like the x-axis itself — a flat line. Nothing is wrong with the expression; the parabola is just so shallow that its curve is invisible at that scale. Zoom out and the true U-shape appears. Whenever a graph looks suspiciously simple, suspect the window before suspecting the math.",
        ],
      },
      {
        heading: "Zoom out: see the big picture",
        body: [
          "Take y = x^2. In the default window you see a shallow bowl bottom with the arms shooting off the top of the screen — which is correct, since both ends rise toward infinity, but you cannot see the shape. Zoom out and the full U emerges: symmetric, steepening as |x| grows, exactly the end behavior the algebra predicts.",
          "Use the same move whenever a graph looks like a straight vertical wall — you are probably seeing one steep piece of a curve whose interesting features live far outside the frame. Zoom out (or auto-fit) first, orient yourself, then zoom back into the region you care about.",
          "One honest caveat about auto-fit: it frames everything visible, so a function with vertical asymptotes can blow the y-range up to enormous values and squash the rest of the graph flat. If auto-fit produces a pancake, narrow the y-range manually around the features you actually want to study.",
        ],
      },
      {
        heading: "Zoom in: inspect the details",
        body: [
          "Zooming in is how you answer “where exactly?” questions. Center the view on a suspected root and shrink the ranges: the crossing sharpens, and you can read the zero far more precisely than from the default view. The same applies to the vertex of a parabola or the behavior of a curve near an asymptote — detail lives in small windows.",
          "A useful workflow: zoom in until the feature fills the screen, drop a root or extremum marker from the analysis panel, then zoom back out to confirm the marker sits where the big picture says it should. The two views check each other, and the marker gives you a number the picture alone cannot.",
        ],
      },
      {
        heading: "Fixing distortion: why your circle looks like an oval",
        body: [
          "If a circle comes out looking like an oval, nothing is broken — your x and y scales just differ. A unit circle drawn on a window where the x-axis spans twice the range of the y-axis will always stretch horizontally, because one x-unit and one y-unit occupy different numbers of pixels.",
          "The fix is a square aspect ratio: choose ranges so that one unit is the same length on both axes. Graph a circle — for example the parametric circle x = cos(t), y = sin(t) — and adjust the window until it looks round. That is your calibrated square view, and every angle and slope you read afterward will be honest.",
          "This matters beyond circles: on a stretched window, perpendicular lines don't look perpendicular and a 45° slope doesn't look like 45°. Whenever a geometric question depends on shape — tangency, angle measures, symmetry — verify the aspect ratio first.",
        ],
      },
      {
        heading: "When the graph lies: sampling artifacts",
        body: [
          "The calculator draws curves by evaluating the expression at discrete points and joining the dots. That works beautifully until the function oscillates faster than the sampling can follow. Try y = sin(100*x): its period is π/50, about 0.063, so a window spanning −10 to 10 holds more than 300 full waves — far more than the screen can draw one by one. The result looks like jagged noise or a solid band, and it is not the true graph.",
          "The fix is to narrow the window until a few periods fill the screen — then the clean sine wave appears. Rule of thumb: if a trig graph looks noisy or shows moiré-like banding, the window is too wide for its frequency. When in doubt, check the table of values: exact numbers never suffer from sampling artifacts, so the table tells you what the graph should look like.",
        ],
      },
    ],
    tryExpressions: ["x^2", "sin(100*x)"],
    keyTakeaways: [
      "The window is four numbers — xMin, xMax, yMin, yMax — choosing which rectangle of the plane you see.",
      "Zoom out for end behavior and the full shape; zoom in for roots, vertices and behavior near asymptotes.",
      "An auto-fit (ZoomFit-style) command frames every graph at once — the fastest recovery when you are lost.",
      "Oval-looking circles mean unequal x and y scales; set a square aspect ratio to fix them.",
      "Noisy high-frequency graphs are sampling artifacts — narrow the window and verify with the table of values.",
    ],
    images: [
      {
        src: "/images/learn/window-and-zoom-settings/graph-1.png",
        alt: "The parabola y = x^2 and the curve y = sin(100*x) shown in the calculator's default window.",
        caption:
          "The parabola y = x^2 (with y = sin(100*x) alongside) in the default window. The default view shows only the bottom of the parabola — its end behavior lies outside the frame.",
      },
      {
        src: "/images/learn/window-and-zoom-settings/graph-2.png",
        alt: "The same graphs zoomed out, revealing the full U shape of the parabola y = x^2.",
        caption:
          "The same parabola zoomed out, revealing its full U shape. Zooming out exposes end behavior; zooming in is for roots and turning points.",
      },
    ],
    faqs: [
      {
        q: "My graph is completely blank. What should I check first?",
        a: "The window. Zoom out or run auto-fit to make sure the interesting part of the graph is not sitting outside the visible rectangle. If it is still blank, check the expression for typos and check the domain — for example, asin(x) draws nothing beyond |x| > 1.",
      },
      {
        q: "How do I make a circle look round instead of stretched?",
        a: "Give x and y the same scale — a square aspect ratio. When one x-unit and one y-unit take up the same number of pixels, circles draw as circles and slopes read honestly.",
      },
      {
        q: "Why does y = sin(100*x) look like random static?",
        a: "Its period is π/50 ≈ 0.063, so a wide window packs hundreds of waves onto the screen and the sampler cannot resolve them. Narrow the x-range until a few periods fill the screen and the true sine wave appears.",
      },
    ],
    related: [
      "/learn/getting-started-graphing-calculator/",
      "/learn/find-roots-and-zeros/",
      "/learn/end-behavior-of-polynomial-graphs/",
      "/learn/parametric-vs-cartesian/",
      "/learn/how-to-use-the-table-of-values/",
      "/learn/holes-in-rational-functions/",
      "/learn/reciprocal-trig-functions/",
    ],
    reviewedOn: "2026-11-02",
  },
  {
    slug: "find-vertex-of-parabola",
    title: "How to Find the Vertex of a Parabola on a Graphing Calculator",
    description:
      "Find a parabola's vertex on a graphing calculator: read it from vertex form, compute x = -b/2a, or mark it with the extremum tool.",
    sections: [
      {
        heading: "The direct answer: the vertex is the turning point",
        body: [
          "Type the parabola — say x^2 - 4*x + 3 — into a y = box, and look for the single point where the curve turns around. That turning point is the vertex: the lowest point if the parabola opens upward, the highest if it opens downward. For x^2 − 4x + 3 it sits at (2, −1), and you can read it straight off the graph.",
          "Reading it off the graph is fast but approximate — the picture gives you the location, not exact coordinates. This article gives you two exact methods, vertex form and the −b/2a formula, plus a slider trick that makes the vertex visibly move, so you never have to guess.",
        ],
      },
      {
        heading: "Vertex form hands you the vertex directly",
        body: [
          "A parabola written as y = a(x − h)² + k has its vertex at (h, k) — no computation needed. In y = -(x - 1)^2 + 4, the vertex is (1, 4): the squared term is never positive, so the whole expression is largest exactly when the square is zero, at x = 1. The sign of a tells you which kind of vertex it is: a > 0 opens upward (the vertex is a minimum), a < 0 opens downward (a maximum).",
          "You can convert any standard-form quadratic by completing the square. For x^2 − 4x + 3: take half of −4, square it to get 4, and rewrite as (x² − 4x + 4) − 1 = (x − 2)² − 1. There is the vertex again at (2, −1). The two forms describe the same curve — vertex form just puts the answer in the open.",
        ],
      },
      {
        heading: "From standard form: x = −b/2a",
        body: [
          "For y = ax² + bx + c, the vertex's x-coordinate is always x = −b/2a, and the axis of symmetry is the vertical line through it. Take x^2 + 2*x - 3: here a = 1 and b = 2, so x = −2/2 = −1. Substitute back — f(−1) = 1 − 2 − 3 = −4 — and the vertex is (−1, −4). Two steps, no graphing required.",
          "Confirm it in the calculator with evaluate-at-a-point: evaluate your expression at x = −b/2a and check the y-value matches your hand computation. It is a ten-second sanity check that catches sign errors in the formula, which are the classic mistake here.",
          "The axis of symmetry is worth picturing too: the parabola is a mirror image across the vertical line x = −b/2a, so f(−b/2a + d) = f(−b/2a − d) for any d. You can draw that axis as a parametric expression (for example x = −1, y = t) and watch it split the curve into mirror halves.",
        ],
      },
      {
        heading: "Watch it move: slider variables",
        body: [
          "Type a*(x - h)^2 + k into a y = box. The letters a, h and k are free identifiers, so the calculator turns each into a slider you can drag. Pull h left and right and the vertex slides horizontally; pull k and it slides vertically; drag a through zero and watch the parabola flip from a minimum to a maximum — the vertex jumping from the bottom of the curve to the top as a changes sign.",
          "This is the fastest way to build intuition for transformations: the vertex of a(x − h)² + k is always (h, k), and the sliders prove it live. As a check, set a = 1, h = 2, k = −1 and confirm the curve becomes x^2 − 4x + 3 — expanding (x − 2)² − 1 gives exactly that.",
        ],
      },
      {
        heading: "Confirm with the extremum marker",
        body: [
          "A parabola's vertex is also its one local extremum — and its global one, since the arms run to infinity. So the analysis panel's local min/max markers find the vertex directly: drop a minimum marker on x^2 - 4*x + 3 and it lands on (2, −1). For upward-opening parabolas use the minimum marker; for downward-opening ones, the maximum marker.",
          "Treat the marker as a numerical confirmation and the formulas as the exact answer: the marker computes from the sampled graph, while −b/2a and vertex form are exact algebra. Note the division of labor with the general min/max workflow — that covers extrema of messier curves, but for parabolas the vertex methods above are shorter and exact.",
        ],
      },
    ],
    tryExpressions: ["x^2 - 4*x + 3", "x^2 + 2*x - 3", "-(x - 1)^2 + 4"],
    keyTakeaways: [
      "The vertex is the parabola's turning point: a minimum if a > 0, a maximum if a < 0.",
      "In vertex form a(x − h)² + k, the vertex is (h, k) — read it directly.",
      "In standard form ax² + bx + c, the vertex sits at x = −b/2a on the axis of symmetry.",
      "Type a*(x - h)^2 + k to get draggable sliders that move the vertex live.",
      "The analysis panel's min/max marker lands exactly on the vertex — a parabola's extremum is global.",
    ],
    images: [
      {
        src: "/images/learn/find-vertex-of-parabola/graph-1.png",
        alt: "Three parabolas y = x^2 - 4x + 3, y = x^2 + 2x - 3 and y = -(x-1)^2 + 4 plotted together, each with its vertex visible.",
        caption:
          "Three parabolas plotted together. The first two open upward with vertices at the bottom — (2, −1) and (−1, −4) — while the third opens downward with its vertex at the top, (1, 4).",
      },
      {
        src: "/images/learn/find-vertex-of-parabola/graph-2.png",
        alt: "The parabola y = x^2 - 4x + 3 alone, opening upward with its vertex at (2, -1).",
        caption:
          "y = x^2 − 4x + 3 alone. The vertex (2, −1) is the lowest point of the curve, sitting on the axis of symmetry x = 2.",
      },
    ],
    faqs: [
      {
        q: "Is the vertex the same thing as the local minimum or maximum?",
        a: "For a parabola, yes. Its single turning point is the vertex, and because the arms run to infinity it is also the global minimum (a > 0) or global maximum (a < 0). That is why the extremum marker finds it.",
      },
      {
        q: "My quadratic is in factored form, like (x - 1)*(x - 5). Where is the vertex?",
        a: "Use symmetry: the roots are 1 and 5, so the vertex's x-coordinate is their midpoint, 3. Then f(3) = (2)*(−2) = −4, giving the vertex (3, −4).",
      },
      {
        q: "Does −b/2a work for every quadratic?",
        a: "Yes — for any y = ax² + bx + c with a ≠ 0. But if the equation is already in vertex form a(x − h)² + k, skip the formula and read (h, k) straight off.",
      },
    ],
    related: [
      "/math-functions/quadratic/",
      "/learn/solve-quadratic-equations/",
      "/learn/find-local-minimum-and-maximum/",
      "/learn/function-transformations/",
      "/learn/evaluate-functions-at-a-point/",
      "/learn/window-and-zoom-settings/",
      "/examples/projectile-motion/",
    ],
    reviewedOn: "2026-11-03",
  },
  {
    slug: "graph-inverse-trig-functions",
    title: "How to Graph Inverse Trig Functions (arcsin, arccos, arctan)",
    description:
      "Graph arcsin, arccos and arctan with asin(x), acos(x) and atan(x): principal ranges, radians vs degrees, and domain pitfalls.",
    sections: [
      {
        heading: "The direct answer: type asin, acos, atan",
        body: [
          "Type asin(x) for arcsine, acos(x) for arccosine, and atan(x) for arctangent. The longer names arcsin, arccos and arctan work too — they are aliases for the same functions. What you get are three short, modest curves near the origin, and that is correct: each inverse trig function returns exactly one angle per input, so its graph is a single branch.",
          "One thing to settle immediately: the calculator works in radians. The outputs are angles measured in radians, so asin(1) = π/2 ≈ 1.5708, not 90. If your class works in degrees, the conversion is one multiplication — covered below.",
        ],
      },
      {
        heading: "What you'll see: three short curves",
        body: [
          "y = asin(x) is an S-shaped curve through the origin, running from (−1, −π/2) up to (1, π/2) — steep at the ends, gentle in the middle. y = acos(x) is its downward-tilted counterpart: it falls from (−1, π) to (1, 0), crossing the y-axis at (0, π/2). y = atan(x) is the stretchiest of the three — an S through the origin defined for every x, flattening toward the horizontal asymptotes y = π/2 above and y = −π/2 below without ever touching them.",
          "Anchor them with exact points: asin(−1) = −π/2, asin(0) = 0, asin(1) = π/2; acos(0) = π/2; atan(1) = π/4. Each curve is the reflection of its parent trig function — restricted to one monotonic piece — across the line y = x. That is why asin undoes sin: evaluate sin(asin(0.5)) at a point and watch the round trip come out to exactly 0.5.",
          "Choose the window to suit the family: x from −2 to 2 frames all of asin and acos comfortably, while atan deserves a wider view (say −10 to 10) so its long flattening tails read clearly. And transformations behave honestly here — graph y = asin(2*x) and the domain shrinks to [−1/2, 1/2], because |2x| ≤ 1 is what the function requires. The algebra always tells you where the curve is allowed to live.",
        ],
      },
      {
        heading: "Why the graphs stop: domains and principal values",
        body: [
          "asin and acos accept only inputs between −1 and 1, because no angle has a sine or cosine outside that range. Type asin(2) and you get nothing — not a calculator malfunction, just an empty graph, because the function genuinely has no value there. atan has no such restriction: every real input produces an angle, which is why its curve runs the full width of the screen.",
          "The “principal value” idea is why you see one curve instead of infinitely many. Infinitely many angles share the same sine, but a function must return exactly one output per input — so asin returns the angle in [−π/2, π/2], acos the one in [0, π], and atan the one in (−π/2, π/2). This is also why each parent is first restricted to an interval where it passes the horizontal line test: sin on [−π/2, π/2] is one-to-one, so it has a true inverse there.",
        ],
      },
      {
        heading: "Radians in, radians out — converting to degrees",
        body: [
          "Because the calculator's trig functions take radians, keep your inputs in radians when you compose: asin(sin(1)) is meaningful with 1 as a radian measure. The input to asin itself is a ratio — opposite over hypotenuse, say — so it carries no units at all; the units question only bites on the way out.",
          "To read an answer in degrees, multiply the output by 180/pi. Type asin(0.5)*180/pi and the calculator returns 30 — the familiar angle whose sine is 1/2. And if a problem asks for “the angle whose sine is 0.5” and expects 30°, the calculator's 0.5236 is the same answer wearing radian units.",
        ],
      },
      {
        heading: "Check yourself: the round trip",
        body: [
          "The quickest way to trust these graphs is the round trip: pick x = 0.5, evaluate asin(0.5) ≈ 0.5236, then evaluate sin of that result — you get 0.5 back. Do the same with acos and atan. If the composition returns your starting number, both the function and the graph are doing their job.",
          "One subtlety worth knowing: the round trip only cooperates in one order on the principal range. asin(sin(x)) = x holds for x in [−π/2, π/2], but outside that interval you get the equivalent angle inside the range instead — the function always lands on its principal branch. For a striking demo, graph y = asin(sin(x)): the principal-value rule folds the sine wave into a perfect triangle wave. That is not a calculator quirk; it is the definition doing its job.",
        ],
      },
    ],
    tryExpressions: ["asin(x)", "acos(x)", "atan(x)"],
    keyTakeaways: [
      "Type asin(x), acos(x), atan(x) — arcsin, arccos and arctan are aliases for the same functions.",
      "Each graph is a single principal branch: asin → [−π/2, π/2], acos → [0, π], atan → (−π/2, π/2).",
      "asin and acos are defined only for |x| ≤ 1; atan is defined everywhere, with horizontal asymptotes y = ±π/2.",
      "Outputs are in radians — multiply by 180/pi for degrees.",
      "Verify with the round trip: sin(asin(0.5)) = 0.5.",
    ],
    images: [
      {
        src: "/images/learn/graph-inverse-trig-functions/graph-1.png",
        alt: "Graphs of y = asin(x), y = acos(x) and y = atan(x) plotted together near the origin.",
        caption:
          "The three inverse trig functions together: asin rises through the origin, acos falls from (−1, π) to (1, 0), and atan stretches wide with horizontal asymptotes at y = ±π/2.",
      },
      {
        src: "/images/learn/graph-inverse-trig-functions/graph-2.png",
        alt: "Graph of y = asin(x) alone, an S-shaped curve from (-1, -pi/2) to (1, pi/2) through the origin.",
        caption:
          "y = asin(x) alone — the principal branch of arcsine. One input, one angle: the curve runs from (−1, −π/2) to (1, π/2) and stops where the domain ends.",
      },
    ],
    faqs: [
      {
        q: "Why does my arcsin graph stop at x = 1?",
        a: "Because arcsine is only defined for inputs from −1 to 1 — no angle has a sine outside that range. The graph ends where the function ends; nothing is missing.",
      },
      {
        q: "How do I get degree answers instead of radians?",
        a: "Multiply the output by 180/pi. For example, asin(0.5)*180/pi gives 30, the degree measure of the angle whose sine is 1/2.",
      },
      {
        q: "Can I see the other branches of arcsine, not just the principal one?",
        a: "Each branch is itself a function, so you can plot them separately: asin(x) + 2*pi draws the branch shifted up one full turn. They all satisfy sin(y) = x — the calculator simply defaults to the principal branch, as every standard asin does.",
      },
    ],
    related: [
      "/learn/graph-inverse-functions/",
      "/math-functions/sine/",
      "/math-functions/cosine/",
      "/math-functions/tangent/",
      "/learn/asymptotes-explained/",
      "/learn/function-transformations/",
      "/learn/amplitude-period-phase-shift/",
    ],
    reviewedOn: "2026-11-04",
  },
  {
    slug: "graph-vertical-line",
    title: "How to Graph a Vertical Line (x = a) on a Graphing Calculator",
    description:
      "Graph the vertical line x = a with a parametric expression (x = 3, y = t): why the y = box refuses, plus t-range control.",
    sections: [
      {
        heading: "The direct answer: go parametric",
        body: [
          "Type x = 3 into a y = box and the calculator refuses — correctly. Those boxes expect the right-hand side of y = f(x), and x = 3 is not one. The answer is a parametric expression: add one, set x = 3 and y = t, and give t a range like −5 to 5. Out comes a perfect vertical line at x = 3.",
          "Why does this work? A parametric expression plots the points (x(t), y(t)) as t varies. With x fixed at 3 and y = t sweeping through its range, every plotted point has x-coordinate 3 — which is exactly what the vertical line x = 3 is. In the UI this means: choose the parametric kind, type 3 in the x(t) slot, t in the y(t) slot, and set the t-range to cover the segment you want.",
        ],
      },
      {
        heading: "Why the y = box can't do it: it's not a function",
        body: [
          "A y = box graphs functions: rules that assign exactly one y-value to each x-value. The vertical line x = 3 assigns infinitely many y-values to the single x-value 3, so it fails the vertical line test spectacularly — it is the very example the test is named after. No expression of the form y = f(x) can ever draw it, on any calculator.",
          "This is mathematics, not a missing feature. The fix is to stop thinking “y in terms of x” and switch to the parametric point of view, where x and y are both described in terms of t and neither one is hostage to the other.",
        ],
      },
      {
        heading: "Controlling the length with the t-range",
        body: [
          "Your vertical line is only as long as t's journey. With y = t running from t = −5 to t = 5, the segment spans y = −5 to y = 5 — a line ten units tall centered on the x-axis. Each parametric expression carries its own t-range (tMin and tMax), so adjust those two numbers to frame exactly the segment you want.",
          "Two practical notes: if the line looks cut off, the t-range is narrower than your window — widen it (try −10 to 10) so the line fills the view. And the line is perfectly straight no matter what, because x never changes as t varies; there is no sampling artifact to worry about here. The direction of the range does not matter either: y = t from 5 down to −5 draws exactly the same segment as −5 to 5, since the set of plotted points is identical. And nothing stops you from adding several: studying tan(x) over a wide window, drop in x = -pi/2 and x = pi/2 as two separate parametric expressions and every asymptote gets its landmark.",
          "Notice the asymmetry with horizontal lines: y = 3 is a perfectly good function, so it types straight into a y = box. Vertical lines need the parametric door; horizontal lines walk through the front.",
        ],
      },
      {
        heading: "Where vertical lines earn their keep",
        body: [
          "Vertical lines are the supporting cast of graphing: asymptotes, boundaries, and symmetry axes. Studying y = tan(x)? Drop a parametric x = pi/2 beside it and the asymptote becomes a visible landmark instead of an invisible idea. Working with a parabola? Its axis of symmetry x = −b/2a draws as a parametric line that splits the curve into mirror halves.",
          "They also mark domain cutoffs when graphing piecewise functions — one parametric expression per boundary, at the x-value where the rule changes — and an inequality like x > 2 shades the half-plane a vertical boundary creates. A vertical line never steals the show, but the graphs around it become much easier to read.",
        ],
      },
      {
        heading: "Reading intersections with a vertical line",
        body: [
          "Draw x = 3 across any curve and the intersection tool will mark exactly where they meet — which is simply the function's value at x = 3. It is the graphical version of evaluating f(3), and a handy way to read a value off a crowded graph without tracing along the curve. Confirm it with the table of values at x = 3 if you like; the numbers will agree.",
          "Pair this with the inverse-functions idea: reflecting y = f(x) across the line y = x swaps the roles of the coordinates, turning vertical lines into horizontal ones and vice versa. Once you are comfortable drawing x = a parametrically, the whole family of “not a function of x” graphs — inverse relations and their kin — opens up through the same parametric door.",
        ],
      },
    ],
    tryExpressions: ["3", "t"],
    keyTakeaways: [
      "A y = box cannot graph x = a — it is not a function of x (one x, infinitely many y).",
      "The answer: a parametric expression with x = 3 and y = t.",
      "The t-range (tMin to tMax) sets the segment's length — widen it to fill the window.",
      "Use vertical lines for asymptotes, axes of symmetry (x = −b/2a) and piecewise domain boundaries.",
      "Intersecting a curve with x = a reads the function's value at x = a.",
    ],
    images: [
      {
        src: "/images/learn/graph-vertical-line/graph-1.png",
        alt: "The vertical line x = 3 drawn as a parametric expression with x = 3 and y = t.",
        caption:
          "The vertical line x = 3 drawn as a parametric expression (x = 3, y = t). No y = box could produce this — the parametric kind is what makes vertical lines possible.",
      },
      {
        src: "/images/learn/graph-vertical-line/graph-2.png",
        alt: "The parametric vertical line x = 3 spanning the visible window, with y = t running from -5 to 5.",
        caption:
          "The same parametric vertical line x = 3, with the t-range set from −5 to 5. Widening tMin and tMax lengthens the segment; the x-coordinate stays fixed at 3.",
      },
    ],
    faqs: [
      {
        q: "Why won't the calculator accept x = 3 in the y = box?",
        a: "The box expects the right-hand side of y = f(x) — one y per x. The line x = 3 gives infinitely many y-values for x = 3, so no function expression can describe it. That is why the parametric kind exists.",
      },
      {
        q: "How do I make the vertical line longer or shorter?",
        a: "Change the t-range of the parametric expression. With y = t, the line runs from y = tMin to y = tMax — so t from −10 to 10 gives a line twenty units tall.",
      },
      {
        q: "Can I find where x = 3 meets my curve?",
        a: "Yes — graph both, then use the intersection marker from the analysis panel. The meeting point is (3, f(3)), the function's value at x = 3.",
      },
    ],
    related: [
      "/learn/parametric-vs-cartesian/",
      "/learn/graph-inverse-functions/",
      "/learn/what-is-a-function/",
      "/learn/asymptotes-explained/",
      "/learn/find-intersection-of-two-graphs/",
      "/learn/find-vertex-of-parabola/",
      "/learn/graph-piecewise-functions/",
    ],
    reviewedOn: "2026-11-05",
  },
];
