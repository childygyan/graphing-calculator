import type { LearnArticle } from '../../../data/seo/types.js';

export const BATCH_1: LearnArticle[] = [
  {
    slug: 'graph-piecewise-functions',
    title: 'How to Graph Piecewise Functions on a Graphing Calculator',
    description: 'Learn the honest piecewise workflow on our graphing calculator: graph each piece as a parametric expression with its own t-range. Step-by-step guide.',
    sections: [
      {
        heading: 'The direct answer',
        body: [
          'A piecewise function is a function whose rule changes depending on where you are on the x-axis — one formula for negative x, another for x greater than 2, and so on. Our calculator does not have a native piecewise entry and no comparison or indicator expressions, so the honest workflow is this: enter each piece as its own parametric expression. Choose the parametric kind, set x = t and y = the piece’s formula, then set the t-range (tMin and tMax) to that piece’s domain interval. Repeat for every piece, and the graph shows each formula only where its rule applies.',
          'Take the classic example f(x) = x² for x < 0 and f(x) = 2x + 1 for x ≥ 0. You enter two parametric expressions: the first is x = t, y = t² with the t-range set from −5 to 0; the second is x = t, y = 2t + 1 with the t-range set from 0 to 5. Because t plays the role of x here, each piece is drawn exactly over its interval. Try the two expressions below to see this pair on one screen — the left branch is the parabola piece and the right branch is the line piece, and they meet at x = 0.',
          'Two honest notes before you start. First, endpoints are drawn as plain continuous dots — the calculator does not mark open versus closed circles, so read boundary ownership from your definition, not the picture. Second, where two pieces share a boundary, give it to the piece that owns it and verify with the table of values.',
        ],
      },
      {
        heading: 'Step by step: your first piecewise graph',
        body: [
          'Start with a clean workspace and click Add expression, then choose the parametric kind. You get an x(t) field and a y(t) field. Type t into x(t) — this makes the horizontal coordinate track the parameter directly, so t behaves exactly like x. In y(t), type the first piece’s formula, for example t^2. Open the expression’s settings and find the t-range controls: set tMin = −5 and tMax = 0 for a piece defined when x < 0.',
          'Add a second parametric expression for the next piece: x(t) = t, y(t) = 2*t + 1, with tMin = 0 and tMax = 5. Zoom out until both branches are visible. You should see the parabola on the left and the line on the right, meeting at the point (0, 1) — the value the line piece gives at the boundary. If you need a third piece, add another parametric expression the same way; there is no limit to how many pieces you can stack. If a branch does not appear, check that the t-range really covers its interval and that the expression kind is parametric, not cartesian.',
        ],
      },
      {
        heading: 'Setting each piece’s domain with the t-range',
        body: [
          'The t-range is the engine of this whole method, so it is worth understanding precisely. Because x = t, the interval you allow t to run over is exactly the interval over which that piece is drawn. A piece defined for x < 2 gets tMax = 2; a piece defined for x ≥ −3 gets tMin = −3. For a piece with no bound on one side — the outer pieces of most definitions — use a generous range such as −10 to 10, and let the graph window decide what is visible.',
          'Translate the inequality carefully. The piece x > 1 starts just above 1, so its tMin is 1. The piece x ≤ 4 runs up to and including 4, so its tMax is 4. In interval notation the piece on [−2, 3) gets tMin = −2 and tMax = 3. Write each piece’s interval next to its formula before you type anything — this translation is where most mistakes happen.',
          'When two intervals share a boundary point, only one piece may own it. For f(x) = x² when x ≤ 0 and f(x) = x when x > 0, the first piece owns the boundary: give it tMax = 0 and give the second piece tMin = 0. Your definition is the source of truth for ownership — the calculator draws no distinguishing marker.',
        ],
      },
      {
        heading: 'Endpoints: what the graph shows (and what it does not)',
        body: [
          'The one thing this method cannot do is draw open and closed circles. On paper you would mark a point with a filled dot when the piece includes it and an open circle when it does not; the calculator draws every endpoint the same way, as part of the continuous curve. The shape, the slope, and the position of each piece are all correct — only the open-versus-closed convention is absent, and you carry that information from your written definition.',
          'Because of this, always verify boundary values numerically: open the table of values for each expression and look at the row for the boundary parameter value. In the jump example f(x) = 1 for x < 0 and f(x) = 2 for x ≥ 0, the first piece’s table at t = 0 shows y = 1 and the second shows y = 2 — the jump is real, and the table proves it even though both endpoints render as plain dots. If the values disagree with your definition, adjust which piece owns the boundary.',
          'This verification habit also catches domain mistakes: a piece drawing from the wrong start means its tMin is wrong, and one ending early means its tMax is wrong. Compare the table at the boundary against your definition, and the error reveals itself.',
        ],
      },
      {
        heading: 'Worked example: the absolute value function',
        body: [
          'The absolute value function is the classic piecewise exercise: |x| equals −x when x < 0 and x when x ≥ 0. Enter two parametric expressions: x(t) = t, y(t) = -t with the t-range from −5 to 0, and x(t) = t, y(t) = t with the t-range from 0 to 5. The result is the familiar V shape with its corner exactly at the origin. You can check your work by comparing it with the built-in absolute-value expression abs(x) entered as a cartesian graph — the two should lie exactly on top of each other.',
          'The corner at the origin is a good reminder of a common mistake: the two pieces must agree at a shared boundary if the function is continuous there. At t = 0, both −t and t equal 0, so the V is seamless. If your definition makes the pieces disagree at a boundary — for instance f(x) = 1 for x < 0 and f(x) = 2 for x ≥ 0 — the graph correctly shows a jump, and you read that jump from the table, not from special markers.',
          'A jump example worth trying: f(x) = 1 for x < 0 and f(x) = 2 for x ≥ 0. Two parametric entries — x = t, y = 1 with t from −5 to 0, and x = t, y = 2 with t from 0 to 5 — produce two horizontal rays with a visible jump at x = 0. On a TI-84 you would enter pieces through the Y= menu with comparison logic; here the parametric approach replaces that logic with one expression per piece, one t-range per interval, and the table as your source of truth at every boundary.',
        ],
      },
    ],
    tryExpressions: ['t^2', '2*t + 1'],
    keyTakeaways: [
      'Graph each piece as a parametric expression x = t, y = piece(t), with the t-range set to that piece’s domain interval.',
      'Because x = t, t behaves as x — so tMin and tMax are simply the interval endpoints of the piece.',
      'Endpoints are drawn as plain dots: the calculator does not mark open versus closed circles, so read ownership from your definition.',
      'Verify every boundary value with the table of values; it shows the exact number where the pieces meet or jump.',
      'Pieces must agree at shared boundaries for continuity — the table at the boundary parameter exposes any mismatch.',
    ],
    images: [
      {
        src: '/images/learn/graph-piecewise-functions/graph-1.png',
        alt: 'Two-piece parametric graph: the parabola y = t squared for negative t and the line y = 2 t plus 1 for non-negative t, meeting at x = 0.',
        caption: 'Both try expressions plotted together as parametric pieces: y = t² for t from −5 to 0 and y = 2t + 1 for t from 0 to 5. Notice the curve changes from a parabola to a line exactly at x = 0.',
      },
      {
        src: '/images/learn/graph-piecewise-functions/graph-2.png',
        alt: 'Parametric graph of the single expression y = t squared with x = t, showing the left branch of the piecewise function.',
        caption: 'The first try expression alone: x = t, y = t² is the parabola piece that forms the left branch (x < 0) of the piecewise function.',
      },
    ],
    faqs: [
      {
        q: 'Can I type a piecewise function directly with curly braces or if/then logic?',
        a: 'No — the calculator has no native piecewise entry and no comparison or indicator expressions. The supported workflow is one parametric expression per piece: x = t, y = the piece’s formula, with a t-range matching the piece’s domain interval.',
      },
      {
        q: 'Why do my endpoints look filled in even when the definition excludes the point?',
        a: 'Endpoints are always drawn as part of the continuous curve; open versus closed circles are not rendered. Use the table of values at the boundary parameter to see the exact value and confirm which piece owns the point.',
      },
      {
        q: 'Can I graph a step function this way, with a different constant on each interval?',
        a: 'Yes — each constant step is its own piece: x = t, y = the step’s constant, with the t-range covering that step’s interval. Stack as many steps as you need and confirm each jump with the table of values.',
      },
    ],
    related: [
      '/learn/parametric-vs-cartesian/',
      '/graphing-calculator/',
      '/learn/graphing-inequalities/',
      '/math-functions/quadratic/',
      '/math-functions/absolute-value/',
      '/learn/what-is-a-function/',
    ],
    reviewedOn: '2026-10-07',
  },
  {
    slug: 'find-roots-and-zeros',
    title: 'How to Find Roots and Zeros on a Graphing Calculator',
    description: 'Find x-intercepts on our graphing calculator: enter y = f(x), open the analysis panel, and add root markers. Covers multiple, touching, and missing roots.',
    sections: [
      {
        heading: 'The direct answer',
        body: [
          'The roots (zeros) of a function are the x-values where its graph crosses or touches the x-axis — the solutions of f(x) = 0. On our calculator the direct path is: type the right-hand side of y = f(x) as a cartesian expression, then open the analysis panel and choose the root/zero tool. The calculator marks each x-intercept on the graph and reports its coordinates. For y = x² − 4, you get markers at (−2, 0) and (2, 0) — the two values that satisfy x² − 4 = 0.',
          'This is the same operation you may know from a TI-84, where you press 2nd → TRACE → 2:zero and then pick left and right bounds; here there is no bound-picking step because the analysis panel scans the visible graph and marks the roots it can see. The result is identical: x-values where the curve meets the axis.',
          'One requirement: the root must be visible in your current window. If the graph shows no x-intercepts, zoom out or pan before using the tool — it marks what it can see, not what the function hides outside the frame.',
        ],
      },
      {
        heading: 'Step by step: finding the zeros of y = x² − 4',
        body: [
          'Enter x^2 - 4 as a cartesian expression. Zoom to a standard window so both intercepts are visible — the parabola crosses the axis at x = −2 and x = 2. Open the analysis panel and select Roots. The calculator places markers on each intercept and lists their coordinates.',
          'Read the coordinates: each marker sits at y = 0 by construction, so the x-coordinate is the root. Confirm by checking the algebra: (−2)² − 4 = 0 and 2² − 4 = 0. The tool is a finder, not a prover — a quick substitution like this is good practice.',
          'Use the table of values as a second check: scroll the table until y changes sign between consecutive rows, or hits exactly 0. For x^2 - 4 the table shows y = 0 at x = −2 and x = 2 directly, which confirms both markers.',
        ],
      },
      {
        heading: 'Multiple roots, touching roots, and roots the tool misses',
        body: [
          'Polynomials can have several roots, and the tool marks all the ones it sees in the window — for x³ − 3x the markers land at x = −√3, x = 0, and x = √3 (approximately −1.732, 0, and 1.732). If you expect more roots than you see, widen the window; roots outside the visible frame are not reported.',
          'Touching roots need care: the graph of y = (x − 1)² touches the axis at x = 1 without crossing, because the value is zero at exactly one point. The tool still marks it, since it detects zeros of the function, not only sign changes. Verify with substitution: (1 − 1)² = 0.',
          'A root the tool cannot reach is one hidden by the window or by resolution — a very narrow dip that barely crosses the axis can slip past. Zoom in on suspicious regions and re-run the tool; the table, scanned with fine steps, is the reliable backup.',
        ],
      },
      {
        heading: 'Verifying a root numerically',
        body: [
          'Markers report decimal approximations, so verify them. Substitution is fastest for simple expressions: plug the reported x back into the formula and confirm the result is 0 (or within rounding of 0). For x³ − 3x at x ≈ 1.732: 1.732³ − 3 × 1.732 ≈ 5.196 − 5.196 ≈ 0.',
          'The table of values gives a systematic check. Enter the expression, open its table, and look for a row where y = 0 or where y changes sign between adjacent rows — a sign change brackets a root between those two x-values. Narrow the table step to pin it down further.',
          'For repeated checking across many expressions, keep one habit: graph, mark, then substitute. The graph finds candidates, the marker reports coordinates, and substitution proves the answer. Each step takes seconds and together they eliminate misreads.',
        ],
      },
      {
        heading: 'When there are no roots',
        body: [
          'Some functions never touch the x-axis, and the honest answer is that there are no real roots. y = x² + 1 is always at least 1, so its graph floats above the axis and the tool reports nothing. The same holds for y = exp(x), which approaches the axis but never reaches it.',
          'Distinguish “no roots” from “roots outside the window”: before concluding, zoom out generously. If a wide window still shows no intercepts, the function likely has none. A final check is the local min/max tool — if the lowest point of y = x² + 1 is at (0, 1), the graph provably stays above the axis.',
          'Remember that this tool finds real roots only. A quadratic with a negative discriminant, such as x² + 1 = 0, has no real solutions, so there is nothing to mark on a real-valued graph. That is not a failure of the tool; it is the correct answer on the real number line.',
        ],
      },
    ],
    tryExpressions: ['x^2 - 4', 'x^3 - 3*x'],
    keyTakeaways: [
      'Roots are the x-values where f(x) = 0 — the x-intercepts of the graph.',
      'Type the right-hand side as a cartesian expression, open the analysis panel, and choose Roots to mark every visible x-intercept.',
      'The tool only marks roots inside the current window — zoom out if you expect roots you cannot see.',
      'Confirm each root by substitution or with the table of values, especially where the graph only touches the axis.',
      'A graph that never meets the axis has no real roots; the correct result is an empty marker list.',
    ],
    images: [
      {
        src: '/images/learn/find-roots-and-zeros/graph-1.png',
        alt: 'Graph of y = x squared minus 4 and y = x cubed minus 3 x with root markers on every x-intercept.',
        caption: 'Both try expressions plotted together: y = x² − 4 shows roots at x = −2 and x = 2, while y = x³ − 3x shows three roots near x = −1.732, 0, and 1.732. Notice how each marker sits exactly where its curve crosses the axis.',
      },
      {
        src: '/images/learn/find-roots-and-zeros/graph-2.png',
        alt: 'Graph of the single parabola y = x squared minus 4 with root markers at its two x-intercepts.',
        caption: 'The first try expression alone: y = x² − 4 crosses the x-axis at x = −2 and x = 2, the two solutions of x² − 4 = 0.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a root and a zero?',
        a: 'They are the same thing: a zero of f is an x-value with f(x) = 0, and a root of the equation f(x) = 0 is the same x-value. Our analysis panel calls the tool Roots; both words mean the x-intercepts.',
      },
      {
        q: 'Why does the tool report a root with a tiny nonzero y value?',
        a: 'The marker coordinates are numerical approximations, so rounding can leave a microscopic nonzero y. Read it as zero — and confirm by substituting the x-value back into your expression.',
      },
      {
        q: 'Can I find where two graphs intersect?',
        a: 'Yes — use the analysis panel’s intersection markers with both graphs visible; it marks the points the two curves share. Intersections of y = f(x) with the line y = 0 are exactly the roots of f.',
      },
    ],
    related: [
      '/learn/graph-piecewise-functions/',
      '/examples/projectile-motion/',
      '/graphing-calculator/',
      '/scientific-calculator/',
      '/math-functions/quadratic/',
      '/learn/understanding-derivatives/',
    ],
    reviewedOn: '2026-10-08',
  },
  {
    slug: 'graph-polar-equations',
    title: 'How to Graph Polar Equations on a Graphing Calculator',
    description: 'Graph r = f(θ) on our calculator: switch the expression kind to polar, type the right-hand side in theta, and sweep θ over 0 to 2π.',
    sections: [
      {
        heading: 'The direct answer',
        body: [
          'A polar equation describes a curve with r = f(θ): the distance r from the origin at angle θ. To graph one on our calculator, add an expression and switch its kind from cartesian to polar, then type the right-hand side using theta as the variable — for example 2*sin(3*theta) gives r = 2 sin(3θ). The graph is drawn by sweeping θ through its range, so a full picture typically needs θ running from 0 to 2π.',
          'Try the three expressions below in polar mode: 2*sin(3*theta) draws a three-petaled rose, 1 + cos(theta) draws a cardioid (a heart-shaped curve), and the constant 3 draws a circle of radius 3 centered at the origin. Seeing all three together shows how different r(θ) formulas produce completely different shapes from the same mechanism.',
          'Remember that theta is a reserved variable on this calculator — like x and t, it cannot become a slider. That is exactly what you want here: θ is the sweeping parameter, not a value you drag. If you need a tunable parameter inside a polar formula, use a free identifier such as a, and the slider appears automatically.',
        ],
      },
      {
        heading: 'Step by step: graphing a polar rose',
        body: [
          'Click Add expression and change the expression kind to polar — this replaces the y = field with an r = field. Type 2*sin(3*theta) into the r field, using explicit multiplication between 2 and sin. If you type 2sin(3theta) without the star, the parser will not understand it, so keep the * in every product.',
          'Set the θ-range to a full sweep: θ from 0 to 2*pi. A partial range draws a partial rose — useful later for studying how the curve is traced, but for the complete flower you want the full 2π. Zoom so the window spans roughly −3 to 3 on both axes, since this rose extends 2 units from the origin in every direction.',
          'Read the result: the graph traces three identical petals. The “3” in 3θ is what makes three petals — in general, r = a sin(nθ) with odd n produces n petals, and with even n it produces 2n petals. Change the 3 to a 2 and watch the rose redraw with four petals; this is the fastest way to internalize the rule.',
        ],
      },
      {
        heading: 'Classic polar shapes to know',
        body: [
          'A small library of shapes covers most of what you will meet. Circles centered at the origin are constants: r = 3 is a circle of radius 3. Circles through the origin come from r = a cos(θ) or r = a sin(θ), which give circles of diameter |a| lying along the x-axis and y-axis respectively.',
          'Cardioids and limaçons live in the family r = a ± b cos(θ) (or sin). When a = b, as in 1 + cos(theta), you get the cardioid — a heart shape with its cusp at the origin. When a > b you get a dimpled or convex limaçon with no inner loop; when a < b the curve grows an inner loop.',
          'Roses are r = a sin(nθ) or r = a cos(nθ). The amplitude a sets the petal length; the frequency n sets the petal count (n petals for odd n, 2n for even n). Spirals like r = theta need a longer θ-range — try θ from 0 to 6*pi to see the spiral wind outward.',
        ],
      },
      {
        heading: 'Window and θ-range tips',
        body: [
          'Polar graphs punish bad windows more than cartesian ones, because the curve wraps around the origin. If your rose looks clipped, zoom out symmetrically until the whole shape fits; the default square-ish window is usually right once scaled. Because r can be negative, the curve may extend opposite to where θ points — that is normal polar behavior, not an error.',
          'The θ-range controls how much of the curve is drawn. A full 0 to 2π completes every standard shape; shorter ranges draw partial arcs, which is handy for seeing how the curve is traced. If a shape looks unfinished, the range is the first thing to check.',
          'For spirals and other curves that keep growing with θ, extend the range in multiples of 2π and zoom out between extensions. Each added turn of θ adds another loop of the spiral, and you can watch the growth pattern directly.',
        ],
      },
      {
        heading: 'Common mistakes',
        body: [
          'The most common mistake is typing a polar formula into a cartesian expression: entering 2*sin(3*theta) as y = 2 sin(3θ) draws a sine wave, not a rose, because theta is not the horizontal axis there. Always check that the expression kind badge reads polar before judging the output.',
          'The second is forgetting explicit multiplication. The engine needs 2*sin(3*theta), not 2sin(3theta); it needs cos(theta), and it needs theta spelled out — the symbol θ typed from a keyboard is not accepted. If an expression shows an error, missing * signs are the first suspect.',
          'The third is a truncated θ-range leaving a shape half-drawn, which can look like a completely different curve. A three-petaled rose drawn over only 0 to π looks like a strange blob; restore the full 0 to 2π range and the petals appear. When a polar graph looks wrong, check kind, then *, then range — in that order.',
        ],
      },
    ],
    tryExpressions: ['2*sin(3*theta)', '1 + cos(theta)', '3'],
    keyTakeaways: [
      'Switch the expression kind to polar and type r as a function of theta, e.g. 2*sin(3*theta).',
      'Use explicit * for every multiplication and spell out theta — theta is reserved and cannot become a slider.',
      'Sweep θ over a full 0 to 2π for complete standard shapes; extend the range for spirals.',
      'r = a sin(nθ) makes roses (n petals for odd n, 2n for even n); r = a ± b cos(θ) makes cardioids and limaçons.',
      'If a polar graph looks wrong, check the expression kind first, then missing * signs, then the θ-range.',
    ],
    images: [
      {
        src: '/images/learn/graph-polar-equations/graph-1.png',
        alt: 'Polar graph showing a three-petaled rose r = 2 sin(3 θ), a cardioid r = 1 + cos θ, and a circle r = 3, all centered at the origin.',
        caption: 'All three try expressions in polar mode: the rose r = 2 sin(3θ) has three petals, r = 1 + cos θ traces a cardioid, and r = 3 is a circle of radius 3. Notice how each formula produces a completely different shape from the same r(θ) mechanism.',
      },
      {
        src: '/images/learn/graph-polar-equations/graph-2.png',
        alt: 'Polar graph of the single expression r = 2 sin(3 θ), a symmetric three-petaled rose centered at the origin.',
        caption: 'The first try expression alone: r = 2 sin(3θ) sweeps θ from 0 to 2π to trace three identical petals, each 2 units long.',
      },
    ],
    faqs: [
      {
        q: 'Why does my rose have a different number of petals than I expected?',
        a: 'For r = a sin(nθ) or a cos(nθ), odd n gives n petals and even n gives 2n petals — so n = 3 gives three petals but n = 2 gives four. Also check that θ sweeps a full 0 to 2π, since a truncated range draws a partial flower.',
      },
      {
        q: 'What does it mean when r is negative?',
        a: 'A negative r plots the point in the opposite direction from the angle θ — at angle θ + π instead of θ. This is standard polar behavior and it is why roses and limaçons get their symmetric shapes; it is not an error.',
      },
      {
        q: 'Can I animate a polar graph?',
        a: 'Yes — put a free identifier such as a inside the formula (for example a*sin(3*theta)) and drag the slider that appears. The petals grow and shrink live, which is an excellent way to see what the amplitude controls.',
      },
    ],
    related: [
      '/learn/graph-piecewise-functions/',
      '/learn/find-roots-and-zeros/',
      '/examples/polar-rose/',
      '/math-functions/sine/',
      '/math-functions/cosine/',
      '/learn/parametric-vs-cartesian/',
    ],
    reviewedOn: '2026-10-09',
  },
  {
    slug: 'tangent-line-at-a-point',
    title: 'How to Graph a Tangent Line to a Curve at a Point',
    description: 'Draw the tangent line at any point on our calculator: graph y = f(x), open the analysis panel, choose the tangent tool, and read the slope.',
    sections: [
      {
        heading: 'The direct answer',
        body: [
          'The tangent line at a point on a curve is the straight line that just touches the curve there and follows its direction — its slope equals the derivative at that point. On our calculator the workflow is: graph y = f(x) as a cartesian expression, open the analysis panel, and choose the tangent-line tool. Click a point on the curve (or drag the point along it), and the calculator draws the tangent line and reports its slope.',
          'For y = x² at x = 1, the tangent line is y = 2x − 1 with slope 2 — exactly the derivative 2x evaluated at x = 1. You do not need to compute anything yourself: the tool measures the slope numerically and displays it. There is no nDeriv() formula to type on this calculator; the analysis panel is the derivative-at-a-point workflow.',
          'Try the two expressions below, y = x² and y = sin(x), and run the tangent tool on each. On the parabola the slope steepens as you move away from the vertex; on the sine wave the slope oscillates between 1 and −1, going flat at every peak and valley.',
        ],
      },
      {
        heading: 'Step by step: the tangent to y = x² at x = 1',
        body: [
          'Enter x^2 as a cartesian expression and zoom so the point (1, 1) is comfortably visible. Open the analysis panel and select the tangent-line tool. A draggable point appears on the curve — drag it until its x-coordinate reads 1.',
          'Read the result: the panel shows the tangent line and its slope at the point. For y = x² at x = 1 you should see slope 2 and the line y = 2x − 1. Verify with calculus if you know it: the derivative of x² is 2x, and 2(1) = 2. The tool and the theory agree.',
          'Drag the point along the curve and watch the slope update live. At x = 0 the slope reads 0 and the tangent is horizontal; at x = −1 the slope is −2. This live dragging is the quickest way to build intuition for how the derivative changes along a curve.',
        ],
      },
      {
        heading: 'What the slope is telling you',
        body: [
          'The slope number the tool reports is the instantaneous rate of change of the function at that point — the value of the derivative f′(x) there. A slope of 2 at x = 1 means the function is rising 2 units of y per unit of x at that instant; a slope of −0.5 would mean it is falling gently.',
          'Where the slope reads 0, the tangent is horizontal and you have found a stationary point — a local minimum, local maximum, or plateau. On y = x² the zero slope sits at the vertex (0, 0), the global minimum. Cross-check with the analysis panel’s local min/max markers: the extremum markers and the zero-slope points should coincide.',
          'For y = sin(x), drag the tangent point across a full period and watch the slope trace the shape of cos(x): 1 at x = 0, 0 at the peak π/2, −1 at x = π, 0 at the valley 3π/2. You are watching the derivative function being sampled point by point — this is the idea behind the numerical derivative plot the analysis panel can also draw.',
        ],
      },
      {
        heading: 'Tangent lines on other curves',
        body: [
          'The tool works on any smooth curve you can graph. On y = sin(x), tangents at the peaks and valleys are horizontal with slope 0, and at the zero crossings the slope is ±1 — the steepest points of the wave. On a cubic like y = x³ − 3x, you can find the two stationary points where the tangent goes flat.',
          'Steep slopes deserve a zoomed-out sanity check: a reported slope of 50 looks nearly vertical on a standard window, which is correct — the line really is that steep. If the drawn line looks wrong, zoom to fit the point’s neighborhood and it will resolve.',
          'Tangent lines are also how you linearize: near the point of tangency, the line is a good approximation of the curve. Zoom in close on the point and the curve and its tangent become visually indistinguishable — this “local linearity” is the whole reason tangent lines matter in calculus.',
        ],
      },
      {
        heading: 'Where tangents break down',
        body: [
          'The tool needs a smooth point. At a sharp corner — the vertex of y = abs(x) at x = 0, or any corner of a piecewise graph — there is no single tangent line, because the curve arrives with one slope and leaves with another. The honest answer there is that the derivative does not exist, and no tangent drawn is the right one.',
          'The same holds at discontinuities: a jump in the graph has no tangent at the jump point. And on a near-vertical stretch of curve the tangent would be vertical with undefined slope — such cases are better studied with the parametric form.',
          'When the tool behaves unexpectedly — the point jumps, or the slope flickers — zoom in on that neighborhood first. Usually the curve has a corner, cusp, or near-vertical stretch there, and the close-up reveals exactly why a single tangent cannot exist.',
        ],
      },
    ],
    tryExpressions: ['x^2', 'sin(x)'],
    keyTakeaways: [
      'Graph y = f(x), open the analysis panel, and choose the tangent-line tool; click or drag a point on the curve.',
      'The reported slope is the derivative at that point — no nDeriv() formula needed.',
      'A slope of 0 means a horizontal tangent: a local minimum, maximum, or plateau — cross-check with the min/max markers.',
      'Dragging the point along the curve shows how the derivative changes; on sin(x) it traces the shape of cos(x).',
      'Corners, cusps, and jumps have no single tangent line — the derivative does not exist there.',
    ],
    images: [
      {
        src: '/images/learn/tangent-line-at-a-point/graph-1.png',
        alt: 'Graphs of y = x squared and y = sin x on the same axes, with a tangent line drawn on each curve.',
        caption: 'Both try expressions plotted together: the parabola y = x² and the wave y = sin(x). Use the tangent tool on either curve — notice the parabola’s tangents steepen away from the vertex while the sine wave’s tangents flatten at every peak and valley.',
      },
      {
        src: '/images/learn/tangent-line-at-a-point/graph-2.png',
        alt: 'Graph of the single parabola y = x squared with a tangent line drawn at the point (1, 1).',
        caption: 'The first try expression alone: y = x² with its tangent at x = 1. The tangent has slope 2, matching the derivative 2x evaluated at x = 1.',
      },
    ],
    faqs: [
      {
        q: 'How is the tangent slope related to the derivative?',
        a: 'They are the same number: the slope of the tangent line at x = a is the derivative f′(a). The tool measures this slope numerically, so you get the derivative’s value at the point without differentiating by hand.',
      },
      {
        q: 'Can I get the tangent line’s equation, not just the slope?',
        a: 'Yes — the analysis panel reports the tangent line itself, from which you can read the equation in slope-intercept form. For y = x² at x = 1, that is y = 2x − 1.',
      },
      {
        q: 'Why does the tangent look wrong at a sharp corner?',
        a: 'A corner has two different one-sided slopes, so no single line is tangent there — the derivative does not exist at that point. Zoom in and you will see the curve arriving and leaving at different angles.',
      },
    ],
    related: [
      '/learn/understanding-derivatives/',
      '/learn/find-roots-and-zeros/',
      '/learn/graph-piecewise-functions/',
      '/math-functions/cubic/',
      '/scientific-calculator/',
      '/math-functions/quadratic/',
    ],
    reviewedOn: '2026-10-10',
  },
  {
    slug: 'function-transformations',
    title: 'How to Transform Functions: Shifts, Stretches and Reflections on a Graphing Calculator',
    description: 'Shift, stretch and reflect functions on our calculator: graph the base, add slider variables h, k and a, and watch y = a·f(x − h) + k morph as you drag.',
    sections: [
      {
        heading: 'The direct answer',
        body: [
          'Transforming a function means changing its graph in a predictable way: shifting it left, right, up, or down; stretching or compressing it; or reflecting it. The master formula is y = a · f(b(x − h)) + k applied to any base function f. On our calculator the fastest way to learn these is with sliders: type the base function, then type the transformed version using free identifiers like h, k, and a — they automatically become draggable sliders, and the graph morphs live as you drag.',
          'Start with the base y = x² from the expressions below. Add y = (x - 2)^2 and watch the parabola slide 2 units right; add y = x^2 + 3 and it slides 3 units up; add y = 2*x^2 and it narrows; add y = -x^2 and it flips upside down. Each change isolates one transformation, which is exactly how you should study them — one at a time.',
          'The slider version is even better for intuition: type (x - h)^2 with h as a free identifier, drag h from −5 to 5, and the parabola glides horizontally. The direction sometimes surprises people — (x − 2)² shifts right, not left — and seeing it move live cements the rule far better than memorizing it.',
        ],
      },
      {
        heading: 'Shifts: moving the graph with h and k',
        body: [
          'Horizontal shifts come from inside the function: y = f(x − h) moves the graph h units to the right, and y = f(x + h) moves it h units left. The counterintuitive part is the sign — (x − 2)² is the parabola shifted right by 2, because the value that used to occur at x = 0 now occurs at x = 2. Drag the h slider on (x - h)^2 and confirm: positive h moves right.',
          'Vertical shifts come from outside: y = f(x) + k moves the graph up k units, y = f(x) − k moves it down. These behave exactly as you expect — x^2 + 3 lifts the vertex from (0, 0) to (0, 3). Combine both for y = (x - h)^2 + k and drag h and k independently: the vertex lands at (h, k), which is the fastest way to read any shifted parabola.',
          'A common error is misplacing the shift: (x − 2)² is not x² − 2, and x² − 4 shifts the parabola down 4 rather than left or right. Graph both x^2 - 4 and (x - 2)^2 together to see the difference — one moves vertically, the other horizontally, and the distinction is unmistakable.',
        ],
      },
      {
        heading: 'Stretches and compressions: the multiplier a',
        body: [
          'Vertical stretching and compression come from multiplying the whole function: y = a · f(x). When |a| > 1 the graph stretches vertically away from the x-axis — 2*x^2 is narrower and steeper than x². When 0 < |a| < 1 it compresses toward the axis — 0.5*x^2 is wider and flatter. The x-intercepts do not move; only the y-values scale.',
          'Horizontal stretching and compression come from multiplying inside: y = f(bx). Here the effect is inverted relative to intuition: y = (2*x)^2 compresses the parabola horizontally (it simplifies to 4x², a vertical stretch by 4), while y = (0.5*x)^2 stretches it horizontally. The rule is that replacing x with bx scales horizontal distances by 1/b.',
          'Use a slider for a in a*x^2 and drag from 0.2 to 3 to feel the vertical scaling continuously. Notice the vertex never moves — vertical scaling pivots around the x-intercepts. Then try a*(x - h)^2 + k with all three sliders: you now control the position and shape of the parabola completely, which is the general skill behind reading any transformed quadratic.',
        ],
      },
      {
        heading: 'Reflections: flipping the graph',
        body: [
          'A reflection across the x-axis comes from negating the whole function: y = −f(x) flips every y-value, so -x^2 is the upside-down parabola with its maximum at the origin. A reflection across the y-axis comes from negating inside: y = f(−x) flips left and right — for x² this looks identical because the parabola is symmetric, so test it on an asymmetric base like x³, where (-x)^3 mirrors visibly.',
          'Reflections combine with the other transformations without interference: y = -(x - 2)^2 + 1 is the parabola shifted right 2, flipped upside down, and lifted 1 — vertex at (2, 1), opening downward. Build it up one transformation at a time with sliders to watch each step land.',
          'Sign errors are the classic pitfall: −x² (negate after squaring) is the reflection, while (−x)² equals x² and does nothing. The calculator follows standard order of operations, so -x^2 means −(x²). If your “reflection” looks unchanged, check the parentheses.',
        ],
      },
      {
        heading: 'Order matters: reading y = a·f(b(x − h)) + k',
        body: [
          'When several transformations combine, read them inside-out. In y = 2*(x - 3)^2 + 1: the (x − 3) shifts right 3, the 2 stretches vertically by 2, and the +1 shifts up 1. Work from the x outward: horizontal changes first (shifts, then horizontal scale), then vertical changes (vertical scale, then vertical shift).',
          'The factored form matters for horizontal transformations. y = (2*x - 6)^2 must be read as (2*(x - 3))^2 — a horizontal compression by 2 and a right shift of 3 — not a shift of 6. Always factor the inside multiplier out before reading the shift; graphing both the factored and unfactored forms together confirms they are identical.',
          'As a final exercise, take any base from the try expressions and predict the graph of a transformed version before typing it: choose the shift, the stretch, and the reflection, sketch mentally, then enter it and check. When your prediction matches the screen three times in a row, you have genuinely learned transformations — not memorized them.',
        ],
      },
    ],
    tryExpressions: ['x^2', '(x - 2)^2', '2*x^2', '-x^2'],
    keyTakeaways: [
      'y = f(x − h) + k shifts the graph: h moves it right (counterintuitively), k moves it up — the vertex of (x − h)² + k sits at (h, k).',
      'y = a·f(x) scales vertically (|a| > 1 stretches, |a| < 1 compresses); y = f(bx) scales horizontal distances by 1/b.',
      'y = −f(x) reflects across the x-axis; y = f(−x) reflects across the y-axis.',
      'Free identifiers like h, k, and a become draggable sliders — drag them to watch each transformation live.',
      'Read combined transformations inside-out, and factor horizontal multipliers out before reading the shift.',
    ],
    images: [
      {
        src: '/images/learn/function-transformations/graph-1.png',
        alt: 'Four parabolas: y = x squared, y = (x − 2) squared shifted right, y = 2 x squared narrowed, y = −x squared flipped.',
        caption: 'All four try expressions plotted together: the base parabola y = x² alongside its right-shifted, vertically stretched, and reflected versions. Notice each transformation changes the shape or position while keeping the parabolic character.',
      },
      {
        src: '/images/learn/function-transformations/graph-2.png',
        alt: 'Graph of the single base parabola y = x squared with its vertex at the origin.',
        caption: 'The first try expression alone: the base function y = x², the starting point for every transformation in this article.',
      },
    ],
    faqs: [
      {
        q: 'Why does (x − 2)² shift right instead of left?',
        a: 'Because the graph moves so that each y-value occurs where the inside expression equals what it used to equal: (x − 2)² is zero at x = 2, where x² was zero at x = 0 — the whole shape moved right by 2. Dragging the h slider on (x - h)^2 shows this live.',
      },
      {
        q: 'What is the difference between 2x² and (2x)²?',
        a: '2x² multiplies the output by 2 (a vertical stretch), while (2x)² squares 2x to give 4x² — equivalent to a vertical stretch by 4, or a horizontal compression by 2. The parentheses decide whether the 2 scales the input or the output.',
      },
      {
        q: 'Do transformations change the domain and range?',
        a: 'Shifts and stretches can change the range: x² has range y ≥ 0, but −x² + 3 has range y ≤ 3. Horizontal transformations never change the range, and vertical shifts never change which x-values are allowed — the domain of a polynomial stays all real numbers throughout.',
      },
    ],
    related: [
      '/learn/graph-piecewise-functions/',
      '/learn/tangent-line-at-a-point/',
      '/math-functions/cubic/',
      '/math-functions/quadratic/',
      '/scientific-calculator/',
      '/learn/parametric-vs-cartesian/',
    ],
    reviewedOn: '2026-10-11',
  },
];
