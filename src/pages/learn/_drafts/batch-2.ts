import type { LearnArticle } from '../../../data/seo/types.js';

export const BATCH_2: LearnArticle[] = [
  {
    slug: 'find-local-minimum-and-maximum',
    title: 'How to Find Local Minimum and Maximum Values on a Graphing Calculator',
    description:
      "Plot your function, open the analysis panel's extrema tool, and read off exact local min and max coordinates — a step-by-step guide for students.",
    reviewedOn: '2026-10-12',
    tryExpressions: ['x^3 - 3*x', 'x^4 - 4*x^2'],
    sections: [
      {
        heading: 'The direct answer: plot, open the analysis panel, pick the extrema tool',
        body: [
          "A local maximum is the highest point of a graph in its immediate neighborhood — a peak. A local minimum is the lowest point in its neighborhood — a valley. On this graphing calculator, the fastest way to find them is the analysis panel's extrema tool: type your function (for example x^3 - 3*x), open the analysis panel, choose the local minimum/maximum marker, and click near the peak or valley. A marker drops onto the exact point and reports its coordinates — for x^3 - 3*x you will see a local maximum at (-1, 2) and a local minimum at (1, -2).",
          "This is the built-in equivalent of the minimum and maximum features on a handheld calculator: on a TI-84 you would press 2nd → TRACE → 3:minimum or 4:maximum and trace toward each point; here you simply open the analysis panel, choose the extrema tool, and the marker finds the extremum for you once you click nearby. The rest of this article walks through the full workflow, how to read the result correctly, and how to double-check it with the derivative.",
        ],
      },
      {
        heading: 'Step by step in this calculator',
        body: [
          "1. Enter the function. Type the right-hand side into a new cartesian expression — for this walkthrough use x^3 - 3*x. Use ^ for powers and explicit * for multiplication. The graph draws immediately. 2. Frame the point. If the peak or valley is off-screen, adjust the window (zoom out or pan) until you can see it. The marker needs a visible extremum to snap to. 3. Open the analysis panel and choose the local min/max (extrema) tool. Click on the graph near the peak you want. The marker snaps to the highest nearby point and displays its x- and y-coordinates. 4. Repeat for the valley. For x^3 - 3*x you should read a local maximum of y = 2 at x = -1 and a local minimum of y = -2 at x = 1.",
          "Why clicking nearby matters: the tool searches outward from where you click and locks onto the first extremum it finds. If a graph has several peaks, zoom in a little and click close to the one you want, or the marker may snap to a neighboring peak instead.",
        ],
      },
      {
        heading: 'Local vs. global: read the marker correctly',
        body: [
          "A local maximum is the tallest point near it — not necessarily the tallest point on the whole graph. The extrema tool reports local extrema, so read each marker with that in mind. For example, x^4 - 4*x^2 has a local maximum of 0 at x = 0, but its local minima are -4 at x ≈ ±1.414, and the graph reaches down to -4. The global minimum here is -4, found at the two local minima — and a marker on the peak alone would never tell you that.",
          "If you only care about a closed interval, say [-2, 2], remember the tool will not flag the endpoints: the global maximum on a closed interval can sit at an endpoint, where there is no peak for the marker to find. Open the table of values, read the y-values at the endpoints, and compare them against the marked extrema before declaring a global winner.",
        ],
      },
      {
        heading: 'The derivative check: horizontal tangents and sign changes',
        body: [
          "Every interior local extremum sits where the tangent line goes flat. Open the analysis panel's tangent-line tool, drop a tangent at the marked point, and you will see a horizontal line — the derivative is zero there. For x^3 - 3*x the tangent at x = -1 and at x = 1 is perfectly flat, confirming both markers.",
          "You can also plot the derivative itself. Enter 3*x^2 - 3 (the derivative of x^3 - 3*x) as a second expression: it is negative between x = -1 and x = 1 and positive outside, crossing zero exactly at the marked extrema. That sign change — from rising to falling at a maximum, from falling to rising at a minimum — is the mathematical signature of a local extremum, and seeing the derivative cross zero exactly where your marker sits is the strongest confirmation available.",
        ],
      },
      {
        heading: 'When the marker misses (and how to fix it)',
        body: [
          "Three situations confuse the tool. First, a sharp corner or cusp — think abs(x) at x = 0 — is a genuine local minimum, but the marker may not snap to it because the tool looks for a smooth peak; the table of values settles it instead. Second, a flat stretch: a constant segment has no single highest point, so expect no marker there. Third, a window problem: if the extremum sits outside the visible window, the tool has nothing to find — zoom out or pan until the peak or valley is on screen, then click near it.",
          "If two extrema sit close together, zoom in before clicking so the marker locks onto the intended one. And if a marker lands somewhere unexpected, check the y-values in the table of values at nearby x-values; a quick numeric check takes seconds and catches mis-clicks.",
        ],
      },
    ],
    keyTakeaways: [
      'A local maximum is a peak and a local minimum is a valley in its neighborhood; the analysis panel’s extrema tool finds them.',
      'Click near the peak or valley — the marker snaps on and reports exact x- and y-coordinates.',
      'Markers report local extrema; on a closed interval, compare with the endpoint values for a global answer.',
      'A horizontal tangent and a derivative sign change confirm every genuine extremum.',
      'Zoom so the point is visible, and use the table of values for corners, cusps, and flat stretches.',
    ],
    images: [
      {
        src: '/images/learn/find-local-minimum-and-maximum/graph-1.png',
        alt: 'Graphs of x^3 - 3x and x^4 - 4x^2 on a coordinate plane, each with visible peaks and valleys',
        caption:
          'The functions x^3 - 3x and x^4 - 4x^2 plotted together. Notice each curve’s peaks and valleys — these are the local extrema that the analysis panel’s marker tool locates.',
      },
      {
        src: '/images/learn/find-local-minimum-and-maximum/graph-2.png',
        alt: 'Graph of x^3 - 3x showing a local maximum at (-1, 2) and a local minimum at (1, -2)',
        caption:
          'x^3 - 3x on its own. The local maximum sits at (-1, 2) and the local minimum at (1, -2) — click near either point with the extrema tool to mark it.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a local maximum and a global maximum?',
        a: 'A local maximum is the tallest point in its neighborhood; a global maximum is the tallest point anywhere on the domain or interval you care about. The extrema tool finds local extrema. For a global answer on a closed interval, also check the y-values at the endpoints with the table of values.',
      },
      {
        q: 'The tool says there is no minimum, but I can see a valley. Why?',
        a: 'Most likely the valley is outside the visible window — zoom out or pan until it is on screen, then click near it. If the valley is a sharp corner (like the vertex of abs(x)), the marker may not snap to it; use the table of values instead.',
      },
      {
        q: 'Can a function have a local maximum and a local minimum at the same x-value?',
        a: 'No — a single point cannot be both a peak and a valley. But different x-values can share the same y-value, as with the two minima of x^4 - 4*x^2, both at y = -4.',
      },
    ],
    related: [
      '/learn/understanding-derivatives/',
      '/learn/find-roots-and-zeros/',
      '/learn/tangent-line-at-a-point/',
      '/learn/graphing-inequalities/',
      '/math-functions/cubic/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'graph-inverse-functions',
    title: 'How to Graph Inverse Functions on a Graphing Calculator',
    description:
      'Graph a function, its inverse, and the line y = x to see the reflection symmetry. Learn the swap-and-solve workflow and the horizontal line test.',
    reviewedOn: '2026-10-13',
    tryExpressions: ['x^3', 'cbrt(x)', 'x'],
    sections: [
      {
        heading: 'The direct answer: reflect the graph across the line y = x',
        body: [
          'The inverse of a function undoes it: if a function turns 2 into 8, its inverse turns 8 back into 2. Graphically, the inverse is the mirror image of the original graph across the diagonal line y = x. So to graph an inverse on this calculator, enter the function (say x^3), enter x as a second expression to draw the mirror line, and enter the inverse formula — here cbrt(x) — as a third expression. You will see two curves that are perfect reflections of each other across the diagonal.',
          'To get the inverse formula, swap x and y and solve for y. For y = x^3, swapping gives x = y^3, so y = cbrt(x) — enter cbrt(x). For y = 2*x + 1, swapping gives x = 2*y + 1, so y = (x - 1)/2 — enter (x - 1)/2. The calculator does the graphing; you do the one line of algebra.',
        ],
      },
      {
        heading: 'Step by step in this calculator',
        body: [
          '1. Enter the original function as a cartesian expression, e.g. x^3. 2. Enter x in a new expression slot. This draws the line y = x — the mirror your eye needs to judge the reflection. 3. Enter the inverse formula: cbrt(x). Watch the two curves: pick any point on x^3, like (2, 8), and check that (8, 2) sits on cbrt(x). That coordinate swap — (a, b) becomes (b, a) — is exactly what reflection across y = x does.',
          'For a linear example, enter 2*x + 1, then x, then (x - 1)/2. The two lines cross on the diagonal y = x and mirror each other across it. If they do not look symmetric, recheck your swapped algebra — most inverse-graphing errors are algebra errors, not calculator errors.',
        ],
      },
      {
        heading: 'When a function has no inverse: the horizontal line test',
        body: [
          'A function has an inverse only if it never repeats a y-value: every horizontal line must cross its graph at most once. Enter x^2, then enter 4 as another expression to draw the horizontal line y = 4 — it crosses the parabola twice, at x = -2 and x = 2. No inverse exists for all of x^2, because undoing 4 would have to give two answers at once.',
          'The fix is a domain restriction: keep only half the parabola and it becomes invertible. Enter the restricted half as a parametric expression — x = t, y = t^2 — with the t-range set to [0, 10], which draws only the right half. Then enter sqrt(x) as a cartesian expression. The half-parabola and sqrt(x) mirror each other cleanly across y = x.',
        ],
      },
      {
        heading: 'Checking your work with the table of values',
        body: [
          'Open the table of values for both expressions and compare columns. For x^3 and cbrt(x), the table shows x^3 turning 2 into 8 while cbrt(x) turns 8 into 2 — each table is the other with its columns swapped. If your two tables do not show this swap, the formula you entered is not the inverse.',
          'A second check is composition. Enter (cbrt(x))^3 as a test expression — it equals x, so its graph should lie exactly on top of the line y = x you already drew. If it does, your inverse is correct.',
        ],
      },
      {
        heading: 'Pitfalls: domains, principal values, and the skipped swap',
        body: [
          'Three mistakes show up again and again. First, forgetting to swap: entering the original formula a second time instead of the solved-for-y version gives two copies of the same curve, not a reflection. Second, domain: sqrt(x) and log(x) are undefined for non-positive x in this calculator, so their graphs simply stop there — the missing half is correct behavior, not a bug. Third, inverse trig: asin, acos, and atan return principal values only — asin(0.5) is π/6, not every angle with sine 0.5 — so the inverse you graph covers a single branch.',
          'Pair the reflection view with the table of values whenever a function’s domain or range is restricted, and the graph will always tell the truth.',
        ],
      },
    ],
    keyTakeaways: [
      'An inverse graph is the mirror image of the original across the line y = x.',
      'Swap x and y, solve for y, and enter that formula — x^3 becomes cbrt(x).',
      'Enter x as its own expression to draw the mirror line and judge the symmetry.',
      'A function that fails the horizontal line test, like x^2, has no full inverse — restrict the domain first.',
      'Verify with the table of values: the input and output columns should be swapped.',
    ],
    images: [
      {
        src: '/images/learn/graph-inverse-functions/graph-1.png',
        alt: 'Graphs of x^3, its inverse cbrt(x), and the diagonal line y = x, symmetric across the diagonal',
        caption:
          'x^3, cbrt(x), and the line y = x plotted together. Notice the two curves mirror each other across the diagonal — the signature look of a function and its inverse.',
      },
      {
        src: '/images/learn/graph-inverse-functions/graph-2.png',
        alt: 'Graph of x^3, a strictly increasing cubic curve passing through the origin',
        caption:
          'x^3 on its own. Because it passes the horizontal line test, it has a full inverse — the reflection you see when cbrt(x) is added.',
      },
    ],
    faqs: [
      {
        q: 'Do I need to graph the line y = x too?',
        a: 'Not strictly — the inverse graphs fine without it. But the diagonal makes the reflection visible at a glance and helps you catch algebra mistakes in the swapped formula.',
      },
      {
        q: 'Why does my inverse graph look like only half a curve?',
        a: 'Domain restrictions. sqrt(x) and log(x) are undefined for non-positive x, so their graphs stop at the y-axis. That missing half is the correct graph, not an error.',
      },
      {
        q: 'Can I graph the inverse of x^2?',
        a: 'Not all of it — x^2 fails the horizontal line test, so no single inverse exists. Restrict the domain first: enter the right half as the parametric expression x = t, y = t^2 with t-range [0, 10], and graph its inverse sqrt(x).',
      },
    ],
    related: [
      '/learn/function-transformations/',
      '/learn/what-is-a-function/',
      '/learn/graphing-inequalities/',
      '/learn/graph-piecewise-functions/',
      '/math-functions/cubic/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'find-intersection-of-two-graphs',
    title: 'How to Find the Intersection of Two Graphs on a Graphing Calculator',
    description:
      'Solve equations graphically: plot both sides of f(x) = g(x), use the intersection markers in the analysis panel, and read the solutions off the graph.',
    reviewedOn: '2026-10-14',
    tryExpressions: ['x^2', '-x + 3', '8'],
    sections: [
      {
        heading: 'The direct answer: intersection points are graphical solutions',
        body: [
          'Where two graphs cross, both functions share the same x and the same y — so each intersection point is a solution of the equation f(x) = g(x). On this calculator: enter both functions as separate expressions (for example x^2 and -x + 3), open the analysis panel, choose the intersection tool, and click near the crossing. A marker reports the coordinates. Here you will find two intersections: approximately (1.303, 1.697) and (-2.303, 5.303).',
          'Each marked point is a complete solution: plug x ≈ 1.303 into either formula and you get y ≈ 1.697. If you only need the x-values — the usual goal when solving an equation — read the marker’s x-coordinate and ignore the y.',
        ],
      },
      {
        heading: 'Step by step in this calculator',
        body: [
          '1. Enter each side as its own expression: x^2 in one slot, -x + 3 in the next. Both graphs draw in different colors. 2. Frame both crossings. Pan or zoom until each intersection is visible; the marker can only snap to what is on screen. 3. Open the analysis panel and choose the intersection tool. Click near the first crossing — the marker locks on and shows the coordinates. Repeat near the second. 4. Record the results: (≈1.303, 1.697) and (≈-2.303, 5.303).',
          'If the graphs cross more than twice, work through them one at a time, clicking near each. Zoom in on crowded regions so the marker grabs the crossing you intend rather than its neighbor.',
        ],
      },
      {
        heading: 'Solving equations the graphical way',
        body: [
          'Any equation in one variable can be solved this way: put the left side in one expression slot and the right side in another, then intersect them. To solve 2*x + 1 = 8, enter 2*x + 1 and enter 8 (a constant expression draws a horizontal line). The single intersection sits at (3.5, 8) — and x = 3.5 is the solution, since 2(3.5) + 1 = 8.',
          'This framing is the honest way to use a graphing calculator as an equation solver: you are not typing the equation into a solver box, you are finding where two graphs meet. Confirm with the table of values: at x = 3.5 both expressions read 8.',
        ],
      },
      {
        heading: 'Reading tricky cases: touches, misses, and extra graphs',
        body: [
          'Not every pair of graphs behaves neatly. Tangent graphs touch at one point without crossing — the intersection tool still marks it, and it still counts as a solution (a repeated root, like x^2 meeting y = 0 at the origin). Parallel lines never meet: no marker appears, which correctly reports no solution. And if two graphs coincide everywhere, every point is an intersection — infinitely many solutions.',
          'With three or more graphs on screen, the tool intersects pairs: click near the crossing of the two curves you mean. If the marker keeps grabbing the wrong pair, hide the extra expressions temporarily and work with just the two you need.',
        ],
      },
      {
        heading: 'Getting accurate coordinates every time',
        body: [
          'The marker is a numerical method, so give it good conditions. First, zoom in: a marker placed on a wide window is approximate, while zooming close to the crossing before clicking sharpens the reported coordinates. Second, check against algebra or the table of values when precision matters — the exact intersections of x^2 and -x + 3 come from solving x^2 + x - 3 = 0, which gives x = (-1 ± √13)/2, i.e. x ≈ 1.303 and x ≈ -2.303.',
          'Third, watch the window: intersections outside the visible window are never found, so a “no intersection” result on a zoomed-in view may only mean the crossing is off-screen. Zoom out, pan around, and try again before concluding the graphs never meet.',
        ],
      },
    ],
    keyTakeaways: [
      'An intersection point satisfies both functions at once — it is a graphical solution of f(x) = g(x).',
      'Enter both sides separately, open the analysis panel, choose the intersection tool, and click near the crossing.',
      'To solve a one-variable equation, graph each side and intersect; the x-coordinate is the solution.',
      'A touch still counts as a solution (repeated root); no marker means no solution.',
      'Zoom in for accuracy, and verify with the table of values or algebra when precision matters.',
    ],
    images: [
      {
        src: '/images/learn/find-intersection-of-two-graphs/graph-1.png',
        alt: 'Graphs of x^2, -x + 3, and the horizontal line y = 8 on a coordinate plane',
        caption:
          'x^2, -x + 3, and the line y = 8 plotted together. The parabola and the slanted line cross twice — each crossing is a solution of x^2 = -x + 3.',
      },
      {
        src: '/images/learn/find-intersection-of-two-graphs/graph-2.png',
        alt: 'Graph of the parabola x^2 opening upward with its vertex at the origin',
        caption:
          'x^2 on its own. Adding a second expression, like -x + 3, turns the picture into a graphical equation solver.',
      },
    ],
    faqs: [
      {
        q: 'What if the graphs intersect more than once?',
        a: 'Mark them one at a time: click near each crossing separately and record each marker’s coordinates. Zoom in on crowded regions so the marker locks onto the intended crossing.',
      },
      {
        q: 'The tool found nothing, but the graphs clearly cross. Why?',
        a: 'The crossing is probably outside the visible window. Zoom out or pan until the intersection is on screen, then click near it.',
      },
      {
        q: 'Is the intersection’s y-value ever useful, or only the x?',
        a: 'For pure equation solving, the x-coordinate is the solution. The y-value matters when both coordinates carry meaning — for example, the break-even point where a cost graph meets a revenue graph.',
      },
    ],
    related: [
      '/learn/find-roots-and-zeros/',
      '/learn/graphing-inequalities/',
      '/learn/parametric-vs-cartesian/',
      '/math-functions/quadratic/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'increasing-and-decreasing-intervals',
    title: 'How to Find Increasing and Decreasing Intervals on a Graphing Calculator',
    description:
      'Find where a function rises and falls: use the derivative plot and local min/max markers to split the domain into increasing and decreasing intervals.',
    reviewedOn: '2026-10-15',
    tryExpressions: ['x^3 - 3*x', '3*x^2 - 3'],
    sections: [
      {
        heading: 'The direct answer: find the extrema, then read between them',
        body: [
          'A function is increasing on an interval when its graph rises from left to right, and decreasing when it falls. The quickest way to find those intervals on this calculator: mark the local extrema (peaks and valleys) with the analysis panel’s extrema tool — they are the boundary points where rising turns into falling and back again. For x^3 - 3*x the markers land at x = -1 (maximum) and x = 1 (minimum), which splits the number line into three pieces: increasing on (-∞, -1), decreasing on (-1, 1), and increasing on (1, ∞).',
          'That is the whole method in one sentence: the extrema are the fences, and the intervals between them are the fields. Read whether the graph climbs or drops inside each field, and you have your answer.',
        ],
      },
      {
        heading: 'Step by step in this calculator',
        body: [
          '1. Enter the function, e.g. x^3 - 3*x. 2. Open the analysis panel, choose the extrema tool, and mark every local maximum and minimum in view. Note their x-coordinates: -1 and 1. 3. List the x-coordinates in order and read the graph between consecutive ones. Between -1 and 1 the curve falls, so the function is decreasing on (-1, 1); outside them it climbs, so it is increasing on (-∞, -1) and (1, ∞).',
          'Write the intervals with open endpoints at the extrema — (-1, 1), not [-1, 1] — because at the exact peak or valley the function is momentarily neither increasing nor decreasing. That open-interval convention is what textbooks and exams expect.',
        ],
      },
      {
        heading: 'Confirming with the derivative plot',
        body: [
          'A rising graph has a positive slope and a falling graph a negative one, so the sign of the derivative is a second, independent witness. Enter 3*x^2 - 3 — the derivative of x^3 - 3*x — as a second expression. Where this curve sits above the x-axis, the original function is increasing; where it sits below, the original is decreasing. You will see it positive outside [-1, 1] and negative inside, exactly matching the intervals found from the extrema.',
          'Alternatively, use the analysis panel’s numerical derivative plot, which draws the derivative without you typing the formula. Either way, the derivative crosses zero precisely at the marked extrema — rising-to-falling at a maximum, falling-to-rising at a minimum — tying the two views together.',
        ],
      },
      {
        heading: 'A numeric sanity check with the table of values',
        body: [
          'Open the table of values and read down the y-column. Pick two x-values inside (-1, 1), say 0 and 0.5: y goes from 0 to -1.375, falling — decreasing, confirmed. Pick 2 and 3, both right of 1: y goes from 2 to 18, rising — increasing, confirmed.',
          'The table is also your backup when the graph is ambiguous: for a function that wiggles many times, the extrema markers give the boundaries and the table confirms the direction inside each one. Two x-values per interval are enough for a sanity check.',
        ],
      },
      {
        heading: 'Edge cases: flat spots, corners, and monotone functions',
        body: [
          'Constant stretches are neither increasing nor decreasing — the derivative plot sits on zero there, and the extrema tool finds no marker, which is the correct answer. A sharp corner, like the vertex of abs(x), can still separate a decreasing interval from an increasing one even though no smooth peak exists; the table of values resolves the direction on each side.',
          'Some functions never change direction. x^3 is increasing everywhere — on (-∞, ∞) — and -x^3 is decreasing everywhere. If the extrema tool finds nothing on the whole visible graph, check the derivative: a derivative that never changes sign means a single interval covering the whole domain.',
        ],
      },
    ],
    keyTakeaways: [
      'Extrema are the boundary points: the increasing and decreasing intervals lie between them.',
      'Mark all local extrema, order their x-coordinates, and read the graph’s direction in each gap.',
      'A positive derivative means increasing, a negative derivative means decreasing — plot the derivative to confirm.',
      'Write intervals with open endpoints at the extrema: (-1, 1), not [-1, 1].',
      'Flat stretches are neither increasing nor decreasing; corner points can still split intervals — check with the table of values.',
    ],
    images: [
      {
        src: '/images/learn/increasing-and-decreasing-intervals/graph-1.png',
        alt: 'Graphs of x^3 - 3x and its derivative 3x^2 - 3 on a coordinate plane',
        caption:
          'x^3 - 3x with its derivative 3x^2 - 3 plotted together. Notice the derivative sits above the x-axis exactly where the cubic rises, and below it where the cubic falls.',
      },
      {
        src: '/images/learn/increasing-and-decreasing-intervals/graph-2.png',
        alt: 'Graph of x^3 - 3x rising, falling between x = -1 and x = 1, then rising again',
        caption:
          'x^3 - 3x on its own. The peak at x = -1 and the valley at x = 1 split the graph into increasing and decreasing intervals.',
      },
    ],
    faqs: [
      {
        q: 'Should the interval endpoints be open or closed at the extrema?',
        a: 'Open. At the exact peak or valley the function is momentarily neither increasing nor decreasing, so the standard convention writes (-1, 1) rather than [-1, 1].',
      },
      {
        q: 'What if the derivative is zero over a whole interval?',
        a: 'Then the function is constant there — neither increasing nor decreasing. The derivative plot will sit on the x-axis across that stretch.',
      },
      {
        q: 'Can I find these intervals without calculus?',
        a: 'Yes. The extrema markers plus the table of values are enough: the markers give the boundary x-values and the table confirms whether y-values rise or fall between them. The derivative plot is confirmation, not a requirement.',
      },
    ],
    related: [
      '/learn/understanding-derivatives/',
      '/learn/find-local-minimum-and-maximum/',
      '/learn/tangent-line-at-a-point/',
      '/learn/graphing-inequalities/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'end-behavior-of-polynomial-graphs',
    title: 'End Behavior of Polynomial Graphs: How to Determine It on a Graphing Calculator',
    description:
      "Predict where a polynomial's ends go using the leading-coefficient test, then confirm with a zoomed-out view of the graph on a graphing calculator.",
    reviewedOn: '2026-10-16',
    tryExpressions: ['x^3 - 2*x', '-x^4 + 3*x^2'],
    sections: [
      {
        heading: 'The direct answer: the leading term decides both ends',
        body: [
          'End behavior is where the two ends of a graph head as x → -∞ and x → +∞. For a polynomial, only two things matter: whether the degree is odd or even, and whether the leading coefficient is positive or negative. The four combinations cover everything: odd degree with a positive leading coefficient falls to the left and rises to the right; odd with a negative coefficient does the reverse; even degree with a positive coefficient rises on both ends; even with a negative coefficient falls on both ends.',
          'So for x^3 - 2*x (odd degree, positive leading coefficient) the answer is down on the left, up on the right — before you ever touch the calculator. The calculator’s job is to confirm the prediction, not to replace it.',
        ],
      },
      {
        heading: 'Step by step in this calculator',
        body: [
          '1. Enter the polynomial, e.g. x^3 - 2*x — odd degree, positive leading coefficient. 2. Zoom out: widen the window on both axes until the middle wiggles shrink and the ends dominate the picture. You will see the left end diving down and the right end climbing up — down-left, up-right, exactly as the test predicts. 3. Now enter -x^4 + 3*x^2 — even degree, negative leading coefficient. Zoomed out, both ends plunge downward. 4. Predict before you look: say the two directions out loud, then zoom out to confirm. That habit turns the calculator from an answer key into a teacher.',
          'Use the window and zoom settings deliberately here: a default window is sized for the middle of the graph, not the ends, and judging end behavior without zooming out is the single most common mistake.',
        ],
      },
      {
        heading: 'Why only the highest-degree term matters',
        body: [
          'Far from the origin, the highest-degree term dwarfs everything else. Take x^3 - 2*x at x = 100: x^3 equals 1,000,000 while -2*x is just -200 — the -200 barely nudges the total. At x = -100, x^3 equals -1,000,000 and again dominates. So for large |x| the graph behaves like its leading term alone: x^3 dives on the left and climbs on the right, and -x^4 dives on both sides.',
          'This is also why the middle terms can be ignored for the ends but not for the middle: -x^4 + 3*x^2 wiggles near the origin because of the 3*x^2 term, yet both ends still fall, because -x^4 wins the tug-of-war at scale.',
        ],
      },
      {
        heading: 'Confirming end behavior with the table of values',
        body: [
          'The table of values gives a numeric confirmation that no picture can argue with. Open it for x^3 - 2*x and look at large |x|: at x = 100, y ≈ 999,800; at x = -100, y ≈ -999,800 — down on the left, up on the right. For -x^4 + 3*x^2: at x = 100 and x = -100, y ≈ -99,999,700 on both sides — down, down.',
          'Check a second, larger pair of x-values too: if the y-values keep growing in the same direction, the ends are settled. The table is especially useful when the graph is too steep to read comfortably at high zoom-out.',
        ],
      },
      {
        heading: 'Mistakes to avoid',
        body: [
          'First, the too-small window: on a default window a polynomial’s ends may look flat or get cut off, and x^3 - 2*x can even look like it levels out. Always zoom out before judging the ends. Second, the wrong “leading” term: the leading term is the highest-degree one, not the first one written — in -x^4 + 3*x^2 it is -x^4, and in x^2 - 3*x^5 it is -3*x^5, which is odd degree with a negative coefficient, so up on the left and down on the right.',
          'Third, do not confuse ends with intercepts: the leading-coefficient test says nothing about where the graph crosses the axes. Zeros and intercepts are a different question for a different tool — the root markers in the analysis panel.',
        ],
      },
    ],
    keyTakeaways: [
      'End behavior is where the graph heads as x → ±∞; degree parity plus the leading-coefficient sign decide it.',
      'Odd/positive: down-left, up-right. Odd/negative: up-left, down-right. Even/positive: up-up. Even/negative: down-down.',
      'Zoom out until the ends dominate before judging — a default window misleads.',
      'The highest-degree term dominates at large |x|; middle terms only shape the middle of the graph.',
      'Confirm numerically with the table of values at large positive and negative x.',
    ],
    images: [
      {
        src: '/images/learn/end-behavior-of-polynomial-graphs/graph-1.png',
        alt: 'Zoomed-out graphs of x^3 - 2x and -x^4 + 3x^2 showing their opposite end behaviors',
        caption:
          'x^3 - 2x and -x^4 + 3x^2 plotted together, zoomed out. Notice the cubic dives left and climbs right while the quartic falls on both ends — the leading-coefficient test in action.',
      },
      {
        src: '/images/learn/end-behavior-of-polynomial-graphs/graph-2.png',
        alt: 'Zoomed-out graph of x^3 - 2x with its left end falling and its right end rising',
        caption:
          'x^3 - 2x on its own, zoomed out. The middle wiggles shrink away and the ends take over: down on the left, up on the right.',
      },
    ],
    faqs: [
      {
        q: 'Does end behavior tell me the y-intercept or the zeros?',
        a: 'No — end behavior describes only the far left and far right of the graph. Use the analysis panel’s root markers to find zeros and intercepts.',
      },
      {
        q: 'Why do the ends of my polynomial look flat on the screen?',
        a: 'The window is too small. Widen the window on both axes (zoom out) until the ends dominate the picture; a default window is sized for the middle of the graph, not its ends.',
      },
      {
        q: 'What is the leading coefficient of x^2 - 3*x^5?',
        a: '-3. The leading term is the highest-degree term, -3*x^5, not the first term written. It is odd degree with a negative coefficient, so the graph rises on the left and falls on the right.',
      },
    ],
    related: [
      '/learn/find-local-minimum-and-maximum/',
      '/learn/find-roots-and-zeros/',
      '/learn/parametric-vs-cartesian/',
      '/math-functions/quadratic/',
      '/math-functions/cubic/',
      '/graphing-calculator/',
    ],
  },
];
