/**
 * queue.ts — the 30-day daily article program for graphingcalculator.online
 * (2026-10-07 → 2026-11-05).
 *
 * Each entry is a COMPLETE, reviewed article object matching the LearnArticle
 * shape in src/data/seo/types.ts (slug, title, description, sections,
 * tryExpressions, keyTakeaways, images, faqs, related, reviewedOn).
 * Screenshots are real renders of the production calculator, staged at
 * src/pages/learn/_drafts_images/<slug>/graph-{1,2}.png (NOT in public/ yet).
 *
 * THE DAILY PUBLISHER (cron `daily-article-publish-gc`) takes QUEUE[0] and,
 * in order:
 *  1. Read this file. If QUEUE is empty: the program is complete — call
 *     cron.remove with id `daily-article-publish-gc`, then report
 *     "30-day article program complete — all articles published." and stop.
 *  2. Date check FIRST: let today = current date (Asia/Kolkata, YYYY-MM-DD).
 *     - If QUEUE[0].reviewedOn is AFTER today: do NOT publish. Report
 *       "Next article '<title>' is scheduled for <reviewedOn> — nothing to
 *       publish today." and stop. (The cron may fire before a date arrives.)
 *     - If QUEUE[0].reviewedOn is more than 1 day BEFORE today (a previous
 *       run failed): update this queue entry's reviewedOn to today, so the
 *       published "Last reviewed" date stays truthful.
 *  3. Take QUEUE[0] → the full article object. Its slug is <slug>.
 *  4. Register it: append the article object to LEARN_ARTICLES in
 *     src/data/seo/learn.ts (after the last existing entry, before the
 *     closing "];").
 *  5. Delete the QUEUE[0] entry you just published from this file.
 *  6. Move the screenshots into place (run from the repo root):
 *       mkdir -p public/images/learn/<slug> &&
 *       cp src/pages/learn/_drafts_images/<slug>/graph-1.png
 *          src/pages/learn/_drafts_images/<slug>/graph-2.png
 *          public/images/learn/<slug>/
 *     The article's images[].src paths (/images/learn/<slug>/graph-N.png)
 *     then resolve. Never invent or rename image files — the cron only moves
 *     what the article references.
 *  7. public/llms.txt needs NO manual edit: src/pages/llms.txt.ts regenerates
 *     it at build time from the page registry, so the new /learn/<slug>/
 *     page is picked up automatically.
 *  8. From the repo root run: `npm run typecheck`, then `npm run build`.
 *     BOTH must pass with zero errors. If anything fails: STOP here, do NOT
 *     deploy, and report the failure plainly.
 *  9. Deploy (cwd MUST be the repo root):
 *       python3 ~/workspace/bin/cf-pages-deploy.py graphing-calc /home/hatch/workspace/graphing-calculator/dist --branch=main
 *     NEVER use the cf-wrangler wrapper. NEVER put scripts in /tmp.
 * 10. Verify: dist/learn/<slug>/index.html exists and contains the reviewedOn
 *     string; the deployment URL from step 9 returns 200 for /learn/<slug>/
 *     and /learn/ shows the new card. Also try
 *     https://graphingcalculator.online/learn/<slug>/ — report which URL
 *     verified.
 * 11. Stage and push (cwd = repo root): `git add -A` first (the push script
 *     reads tracked files from disk, so new/moved files must be staged),
 *     then
 *       python3 ~/workspace/skills/github/bin/gh_datapush.py childygyan/graphing-calculator main "Publish <slug> (<reviewedOn>)"
 *     The push token is currently 403ing — EXPECT failure, tolerate it
 *     (commit locally, the Cloudflare deploy in step 9 is what keeps the
 *     site live), report plainly, do not re-explain the issue.
 * 12. Report in Hinglish, short (2-4 lines): which article went live (title +
 *     URL + date), typecheck/build/deploy/push receipts. If QUEUE is now
 *     empty, note it was the final article.
 *
 * Rules: never publish more than one article per run. Never invent or edit
 * article content or screenshots — the queue entries and staged PNGs are
 * already written and reviewed; your job is mechanics only. Never extend the
 * program beyond these 30 runs or reorder the queue without the site owner's
 * explicit one-liner. If any step fails, stop before deploying and say what
 * failed. Do not edit MEMORY.md; you may append a line to
 * ~/memory/YYYY-MM-DD.md.
 */
import type { LearnArticle } from '../../data/seo/types.js';

export const QUEUE: LearnArticle[] = [
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
{
    slug: 'graph-3d-functions',
    title: 'How to Graph 3D Functions on an Online Graphing Calculator',
    description:
      'Graph 3D functions online: type z = f(x, y), rotate the view, and explore surfaces like paraboloids and saddles right in your browser.',
    sections: [
      {
        heading: 'The short answer: open the 3D grapher and type z',
        body: [
          'To graph a 3D function, open the 3D grapher at /3d/, click the expression entry, and type a z-expression such as (x^2 + y^2)/10. The surface appears immediately: for (x^2 + y^2)/10 you get a bowl-shaped paraboloid opening upward. (I scaled it down by 10 because the plotter draws steep surfaces best when they stay near the middle of its z-range; the shape is the same paraboloid.) Then drag the surface to rotate the view and scroll or pinch to zoom in and out.',
          'That is the whole workflow. Everything else on this page is about reading what you see: rotating the view to understand the shape, zooming to inspect a region, and connecting the surface back to the 2D graphs you already know. If you can type x^2 in the 2D calculator, you already know the syntax for the 3D one.',
        ],
      },
      {
        heading: 'Typing a 3D expression: the same syntax, plus y',
        body: [
          'A 3D expression is a formula for z in terms of x and y, written exactly the way you would write a 2D expression, just with y added. Use ^ for powers and always write multiplication explicitly: type (x^2 + y^2)/10, 2*x*y, or sin(x)*cos(y), never 2xy or x2. The same function library applies: sin, cos, tan, exp, log, sqrt, abs, and the constants pi and e all work inside a z-expression.',
          'Watch the domain, because parts of a surface can legitimately be missing. The expression sqrt(9 - x^2 - y^2) describes the top half of a sphere of radius 3, but it is undefined wherever x^2 + y^2 is larger than 9, so those parts of the surface simply are not drawn. A blank patch on a surface is usually a domain issue, not a bug: the calculator refuses to plot points where the formula has no value.',
        ],
      },
      {
        heading: 'Rotating and reading the surface',
        body: [
          'A surface can look confusing from the default angle, so rotate it. Drag the view to the side and look straight at the paraboloid z = (x^2 + y^2)/10: from the side it looks like the familiar parabola z = x^2/10. That is no coincidence. Slicing a surface with a vertical plane (here, fixing y = 0) leaves a 2D curve, and that curve is exactly the kind of graph you already know how to read. Rotation is how you hunt for these cross-sections.',
          'Now graph z = x^2 - y^2 and rotate it. Along the x-axis the surface curves upward like a parabola, but along the y-axis it curves downward like an upside-down parabola. The point at the origin is a saddle point: a minimum in one direction and a maximum in another. No 2D view of this surface shows the full story, which is why the 3D grapher earns its keep: rotation reveals structure that a single fixed angle hides.',
        ],
      },
      {
        heading: 'Exploring parameters with sliders',
        body: [
          'Free identifiers such as a, b, h, and k automatically become slider variables you can drag. On the 3D page this is a powerful way to explore families of surfaces. Enter z = a*x^2 + b*y^2 and drag the sliders: with a and b both positive you see a paraboloid, and the moment one of them goes negative the surface morphs into a saddle. You are watching the algebra turn into geometry in real time.',
          'Sliders also handle shifts. The expression z = (x - h)^2 + y^2 is the paraboloid with its lowest point moved to x = h, and dragging h slides the whole bowl left and right. This is the same shift idea you may know from 2D parabolas, now acting on a surface. Change one parameter at a time, rotate the view, and say out loud what changed: that habit builds the connection between formulas and shapes.',
        ],
      },
      {
        heading: 'Three exercises to build 3D intuition',
        body: [
          'First, graph z = (x^2 + y^2)/10, rotate to a side view, and confirm that the silhouette is the parabola z = x^2/10, the 2D analog listed below as a try-it expression. Then look straight down from above: the surface is perfectly circular, symmetric in every direction. Second, graph z = x^2 - y^2 and find the saddle at the origin by rotating until you can see the upward curve one way and the downward curve the other.',
          'Third, graph z = sin(x)*cos(y) and zoom out. You will see a repeating pattern of hills and valleys, the 3D version of the sine wave you know from 2D. Notice how each of these exercises moves between a 2D curve and its 3D counterpart: paraboloid to parabola, saddle to two opposite parabolas, wavy surface to sine wave. That 2D-to-3D connection is the real skill the 3D grapher teaches.',
        ],
      },
    ],
    tryExpressions: ['x^2', 'sin(x)', 'x^2 - 2*x'],
    keyTakeaways: [
      'The 3D grapher plots surfaces z = f(x, y): type the expression, drag to rotate, scroll to zoom.',
      'Use ^ for powers and write multiplication explicitly, e.g. 2*x*y; the 2D function library works in 3D too.',
      'Blank patches on a surface mean the expression is undefined there, for example sqrt of a negative number.',
      'Free identifiers like a, b, and h become draggable sliders, so you can morph a paraboloid into a saddle.',
      'Rotate to a side view to read a surface as its 2D cross-sections, which you already know how to interpret.',
    ],
    images: [
      {
        src: '/images/learn/graph-3d-functions/graph-1.png',
        alt: '3D surface of z = (x^2 + y^2)/10, a paraboloid opening upward, viewed at an angle',
        caption:
          'The surface z = (x^2 + y^2)/10: a paraboloid opening upward, scaled down so it fits the plotter z-range. Drag to rotate the view and scroll to zoom in on the lowest point.',
      },
      {
        src: '/images/learn/graph-3d-functions/graph-2.png',
        alt: '3D surface of z = x^2 - y^2, a saddle that curves up along x and down along y',
        caption:
          'The surface z = x^2 - y^2: a saddle. It curves upward along the x-axis and downward along the y-axis, with a saddle point at the origin.',
      },
    ],
    faqs: [
      {
        q: 'Why does my 3D surface have missing patches?',
        a: 'The expression is undefined in those regions, so nothing is drawn there. For example, sqrt(9 - x^2 - y^2) has no values where x^2 + y^2 exceeds 9, which leaves the surface as a half-sphere. Rotate the view to check whether the missing patch matches the domain you expect.',
      },
      {
        q: 'Can the 3D grapher find minimums, maximums, or integrals?',
        a: 'No. The 3D grapher covers entering a z-expression, rotating the view, and zooming. The analysis tools (roots, extrema, tangent lines, integral shading) belong to the 2D calculator. For 3D, read shapes visually: rotate to a side view and interpret the cross-section.',
      },
      {
        q: 'How is a 3D surface related to the 2D graphs I already know?',
        a: 'Fixing one variable turns a surface into a 2D curve. Setting y = 0 in z = (x^2 + y^2)/10 leaves z = x^2/10, an ordinary parabola, which is why rotating a paraboloid to a side view shows a parabola silhouette.',
      },
    ],
    related: [
      '/3d/',
      '/graphing-calculator/',
      '/learn/function-transformations/',
      '/learn/parametric-vs-cartesian/',
      '/learn/graph-polar-equations/',
      '/examples/lissajous-curve/',
      '/math-functions/quadratic/',
    ],
    reviewedOn: '2026-10-17',
  },
  {
    slug: 'holes-in-rational-functions',
    title: 'How to Find Holes in Rational Functions (Graphing Calculator)',
    description:
      'Find holes in rational functions with a graphing calculator: factor, simplify, then let the table of values reveal the undefined point.',
    sections: [
      {
        heading: 'The short answer: the graph lies, the table tells the truth',
        body: [
          'A hole in a rational function is a single missing point where a factor canceled out of both the numerator and denominator. Enter (x^2 - 1)/(x - 1) in the calculator and it draws what looks like a perfectly solid line. But open the table of values and scroll to x = 1: that row is undefined. The graph looks continuous, yet the function has a hole at the point (1, 2).',
          'That is the key lesson of this article. The graph alone will not reliably show you a hole, because a one-point gap is usually invisible at normal zoom. The reliable calculator workflow is: factor the expression, simplify it, and confirm the hole in the table of values where the undefined row appears.',
        ],
      },
      {
        heading: 'The algebra behind a hole',
        body: [
          'Factor the numerator of (x^2 - 1)/(x - 1) and you get (x - 1)*(x + 1). The factor (x - 1) appears in both the numerator and the denominator, so it cancels, leaving the simplified form x + 1. But the cancellation is only valid when the canceled factor is nonzero: at x = 1 the original expression divides by zero, so x = 1 is excluded from the domain even though the simplified form x + 1 is defined there.',
          'The rule generalizes: whenever the same factor cancels from top and bottom, the original function has a hole at the x-value that makes that factor zero, and the hole sits on the graph of the simplified function. Here the simplified function is y = x + 1, so the hole is the point (1, 2), because 1 + 1 = 2. To find any hole: factor completely, cancel common factors, and plug the canceled x-value into the simplified expression for the y-coordinate.',
        ],
      },
      {
        heading: 'The calculator workflow, step by step',
        body: [
          'First, enter (x^2 - 1)/(x - 1) as a cartesian expression. Second, enter x + 1 as a second expression. The two graphs lie exactly on top of each other everywhere except at x = 1. Seeing the overlap confirms your factoring: the rational function behaves like the simplified line at every x where it is defined, which is exactly what a removable discontinuity means.',
          'Third, open the table of values from the analysis panel and find the row for x = 1. It shows undefined, while the rows on either side show values approaching 2. Fourth, zoom in around x = 1 to convince yourself that nothing dramatic happens nearby: no jump, no asymptote, just a smooth line with one point missing. If you can see the overlap, the undefined row, and the calm neighborhood, you have found the hole three independent ways.',
        ],
      },
      {
        heading: 'Hole versus vertical asymptote: do not mix them up',
        body: [
          'A hole and a vertical asymptote both come from division by zero, but they are different animals. A hole appears when the zero factor cancels from both numerator and denominator. A vertical asymptote appears when a factor remains in the denominator after simplifying, as in (x + 1)/(x - 1): at x = 1 the denominator is zero and nothing cancels, so the graph shoots off toward positive and negative infinity instead of passing calmly through.',
          'The table of values distinguishes them cleanly. Near a hole, the neighboring rows approach a finite number (here, values near 2). Near a vertical asymptote, the neighboring rows grow enormous in magnitude. If the neighbors stay calm, it is a hole; if they blow up, it is an asymptote. Keep the two ideas in separate boxes, and see the dedicated article on asymptotes for the full treatment of the second case.',
        ],
      },
      {
        heading: 'Three holes to practice on',
        body: [
          'Try (x^2 - 4)/(x - 2). Factoring gives (x - 2)*(x + 2) over (x - 2), which simplifies to x + 2 with x not equal to 2, so the hole is at (2, 4). Next try (x^2 + 2*x)/x: the numerator factors as x*(x + 2), the x cancels, and the hole is at (0, 2). In each case, overlay the simplified expression and check the table for the undefined row.',
          'Then try one you have not been told the answer to: ((x - 3)*(x + 3))/(x - 3). Work out the canceled factor and the hole yourself, then verify with the overlay and the table. The habit to build is skepticism toward smooth-looking rational graphs: whenever you see a rational function that graphs as a clean line or curve, check the table before declaring it hole-free.',
        ],
      },
    ],
    tryExpressions: ['(x^2 - 1)/(x - 1)', 'x + 1'],
    keyTakeaways: [
      'A hole appears where a factor cancels from both numerator and denominator; the x-value is excluded from the domain.',
      'The graph of a rational function with a hole looks continuous, so the graph alone is not a reliable test.',
      'The table of values reveals the hole as an undefined row, with neighboring rows approaching a finite value.',
      'The hole sits on the simplified function: plug the canceled x-value into the simplified expression for the y-coordinate.',
      'A hole is not a vertical asymptote: near an asymptote the neighboring values blow up instead of staying calm.',
    ],
    images: [
      {
        src: '/images/learn/holes-in-rational-functions/graph-1.png',
        alt: 'Graphs of (x^2 - 1)/(x - 1) and y = x + 1 overlapping, with a hole at (1, 2)',
        caption:
          'The expressions (x^2 - 1)/(x - 1) and x + 1 plotted together. They coincide everywhere except at x = 1, where the rational function has a hole at (1, 2).',
      },
      {
        src: '/images/learn/holes-in-rational-functions/graph-2.png',
        alt: 'Graph of (x^2 - 1)/(x - 1), a straight line with a single missing point at (1, 2)',
        caption:
          'The expression (x^2 - 1)/(x - 1) alone. It looks exactly like the line y = x + 1, but the point (1, 2) is missing.',
      },
    ],
    faqs: [
      {
        q: 'Will the graphing calculator show the hole as a visible gap?',
        a: 'Usually not. A hole is a single missing point, and at normal zoom the line looks solid. That is why the workflow in this article relies on the table of values, where the hole appears as an undefined row, rather than on spotting a gap visually.',
      },
      {
        q: 'What is the difference between a hole and a vertical asymptote?',
        a: 'A hole is one missing point where a factor canceled from both numerator and denominator; the graph passes calmly through the neighborhood. A vertical asymptote comes from a denominator factor that does not cancel, and the graph shoots toward infinity on either side. The table tells them apart: finite neighbors mean a hole, exploding neighbors mean an asymptote.',
      },
      {
        q: 'Can a rational function have a hole if nothing cancels?',
        a: 'No. If no factor cancels between numerator and denominator, there is no removable discontinuity and therefore no hole. In that case, look for vertical asymptotes at the denominator zeros instead.',
      },
    ],
    related: [
      '/learn/asymptotes-explained/',
      '/learn/find-roots-and-zeros/',
      '/learn/graph-piecewise-functions/',
      '/scientific-calculator/',
      '/graphing-calculator/',
      '/learn/graph-3d-functions/',
      '/math-functions/reciprocal/',
    ],
    reviewedOn: '2026-10-18',
  },
  {
    slug: 'even-and-odd-functions',
    title: 'How to Tell If a Function Is Even or Odd (Algebraically and From the Graph)',
    description:
      'Check even and odd functions two ways: the algebraic f(−x) test, and a graphing calculator overlay that makes the symmetry visible.',
    sections: [
      {
        heading: 'The short answer: overlay three curves and watch them coincide',
        body: [
          'A function is even if f(-x) equals f(x) for every x, which means its graph is a mirror image across the y-axis. It is odd if f(-x) equals -f(x) for every x, which means its graph has 180-degree rotational symmetry about the origin. If neither equality holds, the function is neither even nor odd.',
          'The calculator makes this a visual test. Enter f(x) = x^3 - x, then enter f(-x) as (-x)^3 - (-x), and -f(x) as -(x^3 - x). Two of the three curves will lie exactly on top of each other: here the f(-x) curve and the -f(x) curve coincide, which proves the function is odd. If the first two coincided instead, the function would be even.',
        ],
      },
      {
        heading: 'The algebraic test, worked out',
        body: [
          'Take f(x) = x^2 + 3. Replacing x with -x gives f(-x) = (-x)^2 + 3 = x^2 + 3, because squaring removes the negative sign. Since f(-x) equals f(x), the function is even. Now take g(x) = x^3 - x. Then g(-x) = (-x)^3 - (-x) = -x^3 + x, which equals -(x^3 - x), so g(-x) equals -g(x) and the function is odd.',
          'Finally, h(x) = x^3 + x^2 gives h(-x) = -x^3 + x^2. That is neither equal to h(x) nor to -h(x), so h is neither even nor odd. Notice the pattern: terms with only even powers tend to be even, terms with only odd powers tend to be odd, and mixing the two usually destroys both symmetries.',
        ],
      },
      {
        heading: 'The overlay method, step by step',
        body: [
          'Enter your function as the first expression, for example x^3 - x. Then enter the second expression with every x replaced by (-x), including the parentheses: (-x)^3 - (-x). The parentheses matter, because -x^3 means -(x^3) while (-x)^3 means the negative quantity cubed, and confusing them will give you a wrong verdict. Enter the third expression as the negative of the whole function: -(x^3 - x).',
          'Now read the overlap. If curves 1 and 2 coincide, the function is even. If curves 2 and 3 coincide, it is odd. If nothing coincides, it is neither. Try the triple on x^2: the first two curves overlap, confirming even. Try it on x^2 + x: no overlap anywhere, confirming neither. The overlay turns an algebraic identity into something you can see, and seeing it once makes the definitions stick.',
        ],
      },
      {
        heading: 'What the symmetry looks like on the graph',
        body: [
          'An even function is symmetric about the y-axis: fold the graph along the vertical axis and the two halves match. Cosine and x^2 are the classic examples. An odd function has rotational symmetry about the origin: rotate the graph 180 degrees and it lands on itself, which means every point (a, b) on the graph is matched by (-a, -b). Sine and x^3 are the classic examples.',
          'One consequence worth knowing: an odd function that is defined at x = 0 must pass through the origin, because oddness forces f(0) to equal -f(0), and only zero satisfies that. So if you graph an odd function and it does not cross (0, 0), something is wrong with either the function or the classification. Even functions have no such requirement; x^2 + 3 never touches the x-axis at all.',
        ],
      },
      {
        heading: 'Try it: five functions to classify',
        body: [
          'Run the overlay test on x^4 - 2*x^2 (even: only even powers), x^5 (odd: a single odd power), and x^2 + x (neither: mixed powers). Then try the trigonometric pair: sin(x) is odd, because sin(-x) = -sin(x), while cos(x) is even, because cos(-x) = cos(x). Overlay sin(x) with sin(-x) written as sin(-x)... written properly as sin(-x) needs no extra parentheses, but -sin(x) for the third curve.',
          'After the verdict, connect it to the picture. For each even result, fold the graph mentally along the y-axis; for each odd result, check the (a, b) to (-a, -b) pairing on two points of your choice. The algebraic test gives the answer and the graph gives the understanding, and the calculator lets you do both side by side.',
        ],
      },
    ],
    tryExpressions: ['x^3 - x', '(-x)^3 - (-x)', '-(x^3 - x)'],
    keyTakeaways: [
      'Even means f(-x) = f(x): mirror symmetry across the y-axis. Odd means f(-x) = -f(x): 180-degree rotational symmetry about the origin.',
      'The overlay test: graph f(x), f(-x), and -f(x); whichever two coincide tells you the classification.',
      'Write f(-x) with parentheses, as (-x)^3 - (-x): -x^3 means something different and will flip your verdict.',
      'Only-even powers usually give even functions, only-odd powers give odd functions, and mixing them usually gives neither.',
      'An odd function defined at x = 0 always passes through the origin; the zero function is the only function that is both even and odd.',
    ],
    images: [
      {
        src: '/images/learn/even-and-odd-functions/graph-1.png',
        alt: 'Curves x^3 - x, (-x)^3 - (-x), and -(x^3 - x); the second and third overlap exactly, proving the function is odd',
        caption:
          'f(x) = x^3 - x with f(-x) and -f(x) overlaid. The f(-x) and -f(x) curves coincide exactly, which proves the function is odd.',
      },
      {
        src: '/images/learn/even-and-odd-functions/graph-2.png',
        alt: 'Graph of y = x^3 - x, an S-shaped curve with rotational symmetry about the origin',
        caption:
          'f(x) = x^3 - x alone. Notice the rotational symmetry about the origin: every point (a, b) is matched by (-a, -b).',
      },
    ],
    faqs: [
      {
        q: 'Can a function be both even and odd?',
        a: 'Only one: the zero function, f(x) = 0. It satisfies f(-x) = f(x) and f(-x) = -f(x) simultaneously because 0 equals -0. Every other function is even, odd, or neither, but not both.',
      },
      {
        q: 'Do I really need all three expressions for the overlay test?',
        a: 'Two are enough in principle: comparing f(x) with f(-x) tells you whether it is even, and comparing f(-x) with -f(x) tells you whether it is odd. The three-curve version just makes the verdict instant, because you read it off whichever pair overlaps.',
      },
      {
        q: 'Is an even function the same as an increasing or symmetric-about-a-line function?',
        a: 'No. Even and odd describe specific symmetries: mirror symmetry about the y-axis for even, rotational symmetry about the origin for odd. A function can be symmetric about some other vertical line, like a shifted parabola, without being even.',
      },
    ],
    related: [
      '/learn/function-transformations/',
      '/learn/graph-inverse-functions/',
      '/learn/find-local-minimum-and-maximum/',
      '/learn/holes-in-rational-functions/',
      '/scientific-calculator/',
      '/math-functions/sine/',
      '/math-functions/cosine/',
    ],
    reviewedOn: '2026-10-19',
  },
  {
    slug: 'graph-ellipses-and-hyperbolas',
    title: 'How to Graph Ellipses and Hyperbolas on a Graphing Calculator',
    description:
      'Graph ellipses and hyperbolas on a graphing calculator: solve for y, enter both plus/minus halves, and keep the view square.',
    sections: [
      {
        heading: 'The short answer: solve for y and enter both halves',
        body: [
          'The calculator draws functions of the form y = f(x), but an ellipse or hyperbola is not a function: most x-values pair with two y-values. The fix is to solve the equation for y, which gives a plus/minus pair, and enter each half as its own expression. For the circle x^2 + y^2 = 9, solving gives y = ±sqrt(9 - x^2), so you enter sqrt(9 - x^2) for the top half and -sqrt(9 - x^2) for the bottom half. Together they draw the complete circle.',
          'That one trick, entering both halves, handles every ellipse and hyperbola in this article. Each section below applies it to a new shape, adds the calculator steps for reading key points, and ends with the view setting that keeps your shapes honest.',
        ],
      },
      {
        heading: 'Graphing an ellipse',
        body: [
          'Take the ellipse x^2/25 + y^2/9 = 1. Solving for y gives y = ±(3/5)*sqrt(25 - x^2), so enter 0.6*sqrt(25 - x^2) and -0.6*sqrt(25 - x^2). The two halves meet at the ends of the domain, x = -5 and x = 5, and together they trace the full ellipse, wider than it is tall.',
          'Now read the key points. The root markers in the analysis panel mark where each half crosses the x-axis: (-5, 0) and (5, 0), the vertices. For the top and bottom points, evaluate either half at x = 0: the table of values gives ±3, so the co-vertices are (0, 3) and (0, -3). Vertices, co-vertices, and the center at the origin fully describe this ellipse, and every one of them came from the two half-expressions.',
        ],
      },
      {
        heading: 'Graphing a hyperbola',
        body: [
          'The same trick works for hyperbolas, with one difference you should expect: the halves split into separate branches. For x^2 - y^2 = 1, solving gives y = ±sqrt(x^2 - 1), so enter sqrt(x^2 - 1) and -sqrt(x^2 - 1). The domain is |x| ≥ 1, because the expression under the root is negative between -1 and 1, so the calculator draws two branches opening left and right, with a gap in the middle. That gap is real mathematics, not a rendering problem.',
          'The branches approach the lines y = x and y = -x as guides. Enter x and -x as two more expressions to see these asymptotes: the hyperbola arms get closer and closer to the lines without ever touching them. The vertices, where each branch turns around, are at (1, 0) and (-1, 0); the root markers confirm them. Notice the contrast with the ellipse: the ellipse halves joined into one closed curve, while the hyperbola halves stay apart forever.',
        ],
      },
      {
        heading: 'Keep the view square, or circles become ovals',
        body: [
          'If your circle looks like an oval, the math is fine and the viewing window is not. When the x-axis and y-axis use different scales, a true circle renders as an ellipse and a true ellipse renders with the wrong proportions. Open the window and zoom settings and choose a square or 1:1 aspect so that one unit looks the same length on both axes.',
          'Make this a habit for every conic: after entering both halves, square the view before judging the shape. It is the single most common reason a correct ellipse entry looks wrong, and it takes five seconds to fix. Zoom in or out afterward as needed, but keep the axes equally scaled while you do it.',
        ],
      },
      {
        heading: 'Shortcuts: parametric form and slider shifts',
        body: [
          'If you prefer a single expression, the parametric kind draws a full ellipse in one entry: x = 5*cos(t), y = 3*sin(t), with the t-range from 0 to 2*pi, traces the ellipse x^2/25 + y^2/9 = 1 completely, no plus/minus needed. Each kind in the calculator has its own t-range fields, so set them when you add the parametric expression.',
          'For shifted conics, free identifiers become sliders you can drag. Enter sqrt(9 - (x - h)^2) and -sqrt(9 - (x - h)^2): the letter h becomes a slider, and dragging it slides the whole circle left and right, drawing the family (x - h)^2 + y^2 = 9. The same idea shifts a hyperbola or stretches an ellipse, and it is the fastest way to build intuition for how the center and size parameters in the standard-form equations control the picture.',
        ],
      },
    ],
    tryExpressions: ['sqrt(9 - x^2)', '-sqrt(9 - x^2)', 'sqrt(x^2 - 1)', '-sqrt(x^2 - 1)'],
    keyTakeaways: [
      'The calculator draws y = f(x), so solve the conic for y and enter the + and - halves as two expressions.',
      'Ellipse x^2/25 + y^2/9 = 1 becomes 0.6*sqrt(25 - x^2) and -0.6*sqrt(25 - x^2); the halves join into one closed curve.',
      'Hyperbola x^2 - y^2 = 1 becomes sqrt(x^2 - 1) and -sqrt(x^2 - 1), with two separate branches and asymptotes y = ±x.',
      'Square the viewing window (1:1 aspect) before judging any conic, or circles will render as ovals.',
      'A parametric expression like x = 5*cos(t), y = 3*sin(t) draws a full ellipse in one entry; sliders like h shift conics.',
    ],
    images: [
      {
        src: '/images/learn/graph-ellipses-and-hyperbolas/graph-1.png',
        alt: 'Circle x^2 + y^2 = 9 and hyperbola x^2 - y^2 = 1 drawn from four square-root halves',
        caption:
          'All four halves together: sqrt(9 - x^2) and -sqrt(9 - x^2) form the circle, while sqrt(x^2 - 1) and -sqrt(x^2 - 1) form the hyperbola.',
      },
      {
        src: '/images/learn/graph-ellipses-and-hyperbolas/graph-2.png',
        alt: 'Upper half of the circle x^2 + y^2 = 9: a semicircle of radius 3',
        caption:
          'sqrt(9 - x^2) alone: the top half of the circle. Enter -sqrt(9 - x^2) as a second expression to complete the shape.',
      },
    ],
    faqs: [
      {
        q: 'Why is only half of my ellipse showing?',
        a: 'You entered only one of the two halves. A square root gives the top half (positive y) or the bottom half (negative y); the full conic needs both. Add the matching negative expression and the halves join into the complete shape.',
      },
      {
        q: 'Why does my circle look like an oval?',
        a: 'Your x-axis and y-axis are scaled differently. Open the window and zoom settings and switch to a square, 1:1 view so one unit measures the same on both axes, and the oval will snap back into a circle.',
      },
      {
        q: 'Can I type x^2/9 + y^2/4 = 1 directly into the calculator?',
        a: 'No. Expression entry takes the right-hand side of y = ..., so equations in x and y must be solved for y first. Rearrange to y = ±sqrt form and enter each half, or use the parametric kind as a one-expression alternative.',
      },
    ],
    related: [
      '/learn/parametric-vs-cartesian/',
      '/learn/find-roots-and-zeros/',
      '/learn/even-and-odd-functions/',
      '/graphing-calculator/',
      '/learn/graph-polar-equations/',
      '/learn/function-transformations/',
      '/math-functions/square-root/',
    ],
    reviewedOn: '2026-10-20',
  },
  {
    slug: 'how-to-use-the-table-of-values',
    title: 'How to Use the Table of Values on a Graphing Calculator',
    description:
      'How to use the table of values on a graphing calculator: evaluate functions, spot holes, and estimate limits with step-by-step examples.',
    sections: [
      {
        heading: 'The short answer: exact x/y pairs for every expression',
        body: [
          'The table of values, found in the analysis panel, lists x-values alongside the y-value of each graphed expression at that x. It answers the question the graph only approximates: what exactly is f(3)? For x^2 - 4, the table shows the row x = 3, y = 5, no estimation required. Every expression you have entered gets its own column, so you can compare several functions at the same x-values side by side.',
          'This article covers the four jobs the table does best: evaluating a function at a point, finding zeros between sign changes, exposing holes and domain gaps, and estimating limits. If you only learn one analysis tool beyond the graph itself, make it this one.',
        ],
      },
      {
        heading: 'Reading and navigating the table',
        body: [
          'Open the table and choose a starting x and a step size. With start -10 and step 1, you get integer x-values from -10 upward; scroll to move through them. For x^2 - 4, scan the column until the sign changes: y is -3 at x = 1 and 0 at x = 2, and exactly 0 at x = 2 in the row itself. A sign change between consecutive rows means a zero lies between them, which you can then pin down with the root markers.',
          'Shrink the step to get finer detail. With step 0.5, the x-values land on halves, and with step 0.1 on tenths. The right step size depends on the question: integers for a quick overview, small steps when you are hunting a zero, a hole, or a limit. There is no single correct setting, so adjust it to the job.',
        ],
      },
      {
        heading: 'Evaluating a function at a specific point',
        body: [
          'The most common use is the simplest: find f(a) for a specific a. Scroll the table to the row for your x-value, or set the step so the table lands on it, and read across. For x^2 - 4, the row x = 2 reads y = 0 and the row x = 3 reads y = 5. For sin(x), the row x = 0 reads y = 0 and the row near x = 1.57 reads y close to 1, since sin reaches its maximum at pi/2.',
          'This beats reading values off the graph, where you are always guessing between gridlines. Whenever a homework question asks for an exact function value, the table is the honest tool: the graph shows the shape, the table gives the numbers. Use them together rather than treating the graph as the whole answer.',
        ],
      },
      {
        heading: 'Spotting holes and estimating limits',
        body: [
          'The table shines where the graph goes quiet. For (x^2 - 1)/(x - 1), the row at x = 1 shows undefined while the neighboring rows read values approaching 2, which exposes the hole at (1, 2) that the graph renders as a solid line. An undefined row with calm, finite neighbors is the signature of a removable discontinuity; an undefined row with neighbors exploding in magnitude points to a vertical asymptote instead.',
          'The same technique estimates limits. For sin(x)/x, which is undefined at x = 0, set a small step around zero: at x = 0.1 the value is about 0.9983, at x = 0.01 about 0.99998, so the values are clearly approaching 1, and the limit as x approaches 0 is 1. The table suggests the limit; it does not prove it. Treat the estimate as a conjecture to confirm with algebra or a graph, not as a finished proof.',
        ],
      },
      {
        heading: 'What the table cannot do',
        body: [
          'A table can mislead if the step size skips over the interesting behavior. A function that spikes between your sampled x-values will look tame in the table, so a coarse table is never evidence that nothing happens between the rows. When the table and the graph disagree, zoom the graph in and shrink the step before trusting either one.',
          'Also remember that undefined in the table means the expression has no value at that x, not that the calculator made an error. It is telling you about the domain: holes, asymptotes, and square roots of negative numbers all show up as undefined rows. Read those rows as information, pair the table with the graph and the algebra, and you have a complete picture that no single view gives on its own.',
        ],
      },
    ],
    tryExpressions: ['x^2 - 4', 'sin(x)', '(x^2 - 1)/(x - 1)'],
    keyTakeaways: [
      'The table of values lists exact y-values for each expression at chosen x-values; open it from the analysis panel.',
      'Choose the start and step to fit the question: integers for an overview, small steps for zeros, holes, and limits.',
      'A sign change between rows locates a zero; confirm it with the root markers.',
      'An undefined row with finite neighbors exposes a hole; neighbors blowing up point to a vertical asymptote.',
      'The table suggests limits but never proves them: shrink the step, check the graph, and confirm with algebra.',
    ],
    images: [
      {
        src: '/images/learn/how-to-use-the-table-of-values/graph-1.png',
        alt: 'Three graphs: the parabola y = x^2 - 4, a sine wave, and the line-like graph of (x^2 - 1)/(x - 1)',
        caption:
          'The three expressions x^2 - 4, sin(x), and (x^2 - 1)/(x - 1) plotted together. The table of values compares exact points across all three at once.',
      },
      {
        src: '/images/learn/how-to-use-the-table-of-values/graph-2.png',
        alt: 'Parabola y = x^2 - 4 with vertex at (0, -4) and x-intercepts at (-2, 0) and (2, 0)',
        caption:
          'x^2 - 4 alone. Its table reads exact values such as f(3) = 5 and f(2) = 0, with a sign change marking each zero.',
      },
    ],
    faqs: [
      {
        q: 'How do I get the table to show a specific x-value like 2.5?',
        a: 'Adjust the step size so the table lands on it: with start 0 and step 0.5, the rows include 2.5. In general, pick a step that divides the distance from your start value to the x-value you want.',
      },
      {
        q: 'Why does a table row show undefined?',
        a: 'The expression has no value at that x. That happens at holes in rational functions, at vertical asymptotes, and wherever a square root or logarithm receives an input outside its domain. Check the neighboring rows: finite neighbors suggest a hole, exploding neighbors suggest an asymptote.',
      },
      {
        q: 'Does the table prove what a limit equals?',
        a: 'No. A table can strongly suggest a limit, as the rows for sin(x)/x approaching 1 show, but finitely many samples never constitute a proof. Use the table to form the conjecture, then confirm it with algebra or a zoomed-in graph.',
      },
    ],
    related: [
      '/learn/holes-in-rational-functions/',
      '/learn/understanding-derivatives/',
      '/scientific-calculator/',
      '/learn/find-roots-and-zeros/',
      '/learn/graph-ellipses-and-hyperbolas/',
      '/learn/graph-3d-functions/',
      '/learn/increasing-and-decreasing-intervals/',
    ],
    reviewedOn: '2026-10-21',
  },
{
    slug: 'getting-started-graphing-calculator',
    title: "How to Graph on a Graphing Calculator: A Beginner's Guide",
    description:
      "New to graphing calculators? Learn how to type your first function, adjust the view, and add more expressions step by step in this beginner's guide.",
    sections: [
      {
        heading: 'The short answer',
        body: [
          'To graph a function on our graphing calculator, type just the right-hand side of the equation into an expression line. For y = x², type x^2 and the graph appears immediately — no equals sign needed.',
          'Use ^ for powers and * for multiplication, so y = 2x + 1 becomes 2*x + 1. Every supported function — sin, cos, log, sqrt, and more — works the same way: just type the expression and watch the curve appear.',
          'The expression line also gives you the standard math keys. For y = √x, type sqrt(x); for y = sin x, type sin(x). Constants work too: pi and e are recognized, so sin(pi/2) plots correctly and e^x can be typed as e^x or exp(x). If you can type it on a scientific calculator, you can type it here — the syntax is deliberately the same.',
        ],
      },
      {
        heading: 'Typing your first function',
        body: [
          'Click into the first expression line and type x^2. The calculator reads this as a cartesian expression, y = x², and draws the familiar upward parabola. The parentheses keys are your best friend: for something like y = (x + 1)^2, the parentheses tell the calculator exactly what the power applies to.',
          'If you type something the calculator cannot understand, it will say so rather than guess — check that every opening parenthesis has a partner and that multiplication uses *. You can edit any expression by clicking it; the graph updates live as you type.',
          'Two mistakes cause most first-day errors. One is the missing multiplication sign: 2(x + 1) looks right on paper, but the calculator needs 2*(x + 1). The other is unbalanced parentheses — count your opening and closing brackets before hunting for bigger problems. When an expression shows an error, the fix is almost always one of these two.',
        ],
      },
      {
        heading: 'Adjusting the view: pan and zoom',
        body: [
          'The part of the graph you see is called the window. Drag the graph with your mouse (or finger on touch screens) to pan left, right, up, or down, and use the zoom controls — or scroll — to zoom in on a detail or zoom out to see the big picture.',
          'A good habit when something looks wrong: zoom out. A graph that seems to be a straight line might be a zoomed-in curve, and a "missing" graph is often just outside the current window. Zooming is how you match the view to the question you are asking.',
          'Think of the window as a camera. For y = sin(x), a window from x = −10 to x = 10 shows about three full waves — enough to see the repeating pattern — while zooming in on the origin shows a single crest in detail. There is no single correct window; the right one is the one that answers your question, so pan and zoom freely until the feature you need is clear.',
        ],
      },
      {
        heading: 'Adding a second (and third) expression',
        body: [
          'Each expression line holds one graph, so add a new line for every new function. Try typing sin(x) below your x^2 line — now both curves share the axes, which makes comparisons like "where does the sine wave cross the parabola?" easy to see at a glance.',
          'Beyond the default cartesian form, the calculator also supports parametric expressions, polar equations, inequalities, points, and tables of values. You do not need these on day one, but knowing they exist helps you recognize the right tool later.',
          'You can also mix kinds on one screen. Plot the inequality y > x^2 alongside the parabola x^2 itself to see exactly which region gets shaded, or add a point at (2, 4) to mark a location on the curve. Layering kinds like this turns the calculator from a graphing tool into a full workspace for exploring a problem.',
        ],
      },
      {
        heading: 'Where to go next',
        body: [
          'Once you can type, pan, and zoom, the natural next skills are reading key features off a graph: finding roots and zeros, marking local minima and maxima, and finding where two graphs intersect. Those are all covered in this learning hub.',
          'If your class is working with a specific family of functions, the hub also has guides for quadratics, polar equations, piecewise functions, and the table of values — pick the one that matches tonight\'s homework.',
          'The fastest way to get comfortable is ten minutes of play: graph x^2, then change it to x^3, then to (x - 2)^2 + 1, watching how each edit moves the curve. You will build an intuition for the syntax and the window that no manual can give you — and every later guide in this hub assumes exactly this level of comfort.',
        ],
      },
    ],
    tryExpressions: ['x^2', '2*x + 1', 'sin(x)'],
    keyTakeaways: [
      'Type only the right-hand side of the equation — no equals sign needed.',
      'Use ^ for powers and * for multiplication, e.g. 2*x + 1.',
      'Drag to pan and scroll to zoom so the window matches your question.',
      'Each new expression line adds another graph on the same axes.',
      'Cartesian is the default; parametric, polar, and inequality forms exist too.',
    ],
    images: [
      {
        src: '/images/learn/getting-started-graphing-calculator/graph-1.png',
        alt: 'Clean default-viewport plot showing x^2 as a parabola, 2*x + 1 as a straight line, and sin(x) as a wave, all on one set of axes',
        caption:
          'Three expressions — x^2, 2*x + 1, and sin(x) — plotted together in the default view. Notice how each new expression line adds another graph on the same axes, so curves can be compared directly.',
      },
      {
        src: '/images/learn/getting-started-graphing-calculator/graph-2.png',
        alt: 'Clean default-viewport plot of the single parabola y = x^2 centered on the origin',
        caption:
          'Your first graph: typing x^2 alone produces the familiar upward parabola. This default-viewport view is the starting point for every graph — pan and zoom from here to explore.',
      },
    ],
    faqs: [
      {
        q: 'Do I type the equals sign when entering a function?',
        a: 'No. Type only the right-hand side of the equation. For y = x², type x^2 — the calculator already knows each expression line is a y = ... equation.',
      },
      {
        q: 'Why is my graph not showing?',
        a: 'The most common reason is that the graph lies outside the current window. Zoom out to widen the view, and drag to pan around. Also check for typos, such as a missing parenthesis or a forgotten * for multiplication.',
      },
      {
        q: 'How do I write 2x so the calculator understands it?',
        a: 'Type 2*x with an explicit multiplication sign. The calculator does not accept implied multiplication like 2x or 3(x + 1) — always write 2*x and 3*(x + 1).',
      },
    ],
    related: [
      '/learn/what-is-a-function/',
      '/learn/how-to-use-the-table-of-values/',
      '/learn/find-roots-and-zeros/',
      '/learn/graph-piecewise-functions/',
      '/learn/graph-polar-equations/',
      '/learn/parametric-vs-cartesian/',
      '/graphing-calculator/',
    ],
    reviewedOn: '2026-10-22',
  },
  {
    slug: 'solve-quadratic-equations',
    title: 'How to Solve Quadratic Equations on a Graphing Calculator',
    description:
      "Solve quadratic equations on a graphing calculator: graph y = the quadratic, mark the x-intercepts, and check the discriminant by eye. Step-by-step guide.",
    sections: [
      {
        heading: 'The short answer',
        body: [
          'To solve a quadratic equation on our graphing calculator, move everything to one side so it reads ax² + bx + c = 0, then type the right-hand side — for example x^2 - 4 — into an expression line. The solutions are the x-values where the parabola crosses the x-axis.',
          'Use the analysis panel\'s root/zero markers to pinpoint each intercept precisely. Where the parabola crosses the x-axis is where y = 0, which is exactly what "solve the equation" means.',
          'This works because every point on the graph is a pair (x, y) satisfying y = ax² + bx + c. At an x-intercept, y = 0, so the x-value satisfies ax² + bx + c = 0 — the very equation you were asked to solve. The graph is not just a picture of the answer; the crossings are the answer.',
        ],
      },
      {
        heading: 'Put it in standard form first',
        body: [
          'A quadratic equation can arrive in many outfits: x² + 5 = 6x, (x + 1)² = 9, or x² = 4. Move every term to one side before graphing, so each equation reads something = 0. The three examples above become x^2 - 6*x + 5, x^2 + 2*x - 8, and x^2 - 4.',
          'This step is not optional: the x-intercepts of the graph are the solutions only when you graph the whole expression equal to zero. If you graph x² on one line and 4 on another instead, use the intersection tool on the two graphs — the x-coordinates of the intersection points are the same solutions.',
          'Vertex form needs the same treatment. For (x + 1)² = 9, move terms to get x^2 + 2*x - 8 = 0 before graphing. If expanding by hand feels error-prone, graph the two sides separately — (x+1)^2 on one line and 9 on the next — and read the intersections. Both routes end at the same x-values; pick the one where you are least likely to slip.',
        ],
      },
      {
        heading: 'Find the zeros with the analysis tools',
        body: [
          'With the quadratic graphed, open the analysis panel and choose the root/zero marker. Place it near an x-intercept and it snaps to the exact zero. For x^2 - 4 you will get x = 2 and x = −2; check both by substituting back: 2² − 4 = 0 and (−2)² − 4 = 0.',
          'Zoom in on an intercept first if the marker lands somewhere unexpected. Near a root, the parabola crosses the axis at a shallow angle, and a closer view helps the tool lock onto the right point.',
          'Cross-check with the table of values: find the rows where y changes sign, and the zero lies between them. For x^2 - 4, the table shows y = −3 at x = 1 and y = 0 at x = 2 — the sign change brackets the root. When the marker and the table agree, you can trust the answer.',
        ],
      },
      {
        heading: 'Read the discriminant by eye',
        body: [
          'Before you even mark the roots, the graph tells you how many real solutions exist. A parabola that crosses the x-axis twice means two real solutions (positive discriminant). One that just touches the axis at its vertex — like x^2 + 2*x + 1, which touches at x = −1 — means exactly one repeated solution (discriminant zero).',
          'A parabola that never touches the x-axis, like x^2 + 1, means no real solutions (negative discriminant). This is the fastest sanity check in algebra: the equation x² = −1 has no real solution, and the graph shows the curve floating entirely above the axis.',
          'The graph also shows where the quadratic is positive or negative — the stretches above the axis versus below it. For x^2 - 4, the parabola dips below the axis between x = −2 and x = 2, so the inequality x² − 4 < 0 holds exactly there. Solving equations and inequalities is the same picture read two ways.',
        ],
      },
      {
        heading: 'Connect the graph to factoring',
        body: [
          'The intercepts are the factored form made visible. The parabola x^2 - 3*x + 2 crosses at x = 1 and x = 2, and indeed the quadratic factors as (x − 1)(x − 2). Each intercept is one factor\'s root: the graph crosses the axis exactly where a factor equals zero.',
          'Use this as a checking habit: factor the quadratic on paper, then graph to confirm the intercepts match your factors. When they disagree, the graph usually reveals which step went wrong.',
          'You can also predict the root count before graphing with the discriminant b² − 4ac. For x^2 - 3*x + 2, that is 9 − 8 = 1, positive, so expect two distinct roots — and the graph confirms crossings at x = 1 and x = 2. Prediction on paper, confirmation on screen: that loop turns the calculator into a checking tool rather than a crutch.',
        ],
      },
    ],
    tryExpressions: ['x^2 - 4', 'x^2 - 3*x + 2', 'x^2 + 2*x + 1', 'x^2 + 1'],
    keyTakeaways: [
      'Rewrite the equation as ax² + bx + c = 0, then graph the left side.',
      'The solutions are the x-intercepts — mark them with the root/zero tool.',
      'Two crossings = two real solutions; one touch = one repeated solution; none = no real solutions.',
      'Each x-intercept corresponds to a factor (x − intercept) in the factored form.',
      'Zoom in near an intercept before placing a marker for best precision.',
    ],
    images: [
      {
        src: '/images/learn/solve-quadratic-equations/graph-1.png',
        alt: 'Four parabolas: two crossing the x-axis twice, one touching at x = -1, and one floating above the axis',
        caption:
          'All four try expressions plotted together. From left to right you can read the three discriminant cases: two crossings (two real solutions), a single touch at x = −1 (one repeated solution), and no contact with the axis (no real solutions).',
      },
      {
        src: '/images/learn/solve-quadratic-equations/graph-2.png',
        alt: 'The parabola y = x^2 - 4 alone, a symmetric U-shape crossing the x-axis at x = -2 and x = 2',
        caption:
          'The parabola y = x^2 − 4 plotted alone. It crosses the x-axis at x = −2 and x = 2 — exactly the two solutions of x² − 4 = 0.',
      },
    ],
    faqs: [
      {
        q: 'What if the parabola never crosses the x-axis?',
        a: 'Then the equation has no real solutions — the discriminant is negative. For example, x² + 1 = 0 has no real solution, and its graph floats entirely above the x-axis. The solutions are complex numbers, which the graph alone cannot show.',
      },
      {
        q: 'Do I graph y = x² and y = 4 separately, or y = x² − 4?',
        a: 'Both work. Graphing x^2 - 4 and reading its zeros is the most direct route. Graphing x^2 and 4 as two expressions and finding their intersection points gives the same answers — the x-coordinates of the intersections are the solutions.',
      },
      {
        q: 'What does it mean when the parabola just touches the axis?',
        a: 'That is a repeated (double) root: the discriminant equals zero. The quadratic x^2 + 2*x + 1 touches the axis at x = −1, so the solution is x = −1 twice over, and the factored form is (x + 1)².',
      },
    ],
    related: [
      '/learn/getting-started-graphing-calculator/',
      '/learn/find-roots-and-zeros/',
      '/examples/projectile-motion/',
      '/learn/function-transformations/',
      '/learn/how-to-use-the-table-of-values/',
      '/math-functions/quadratic/',
      '/graphing-calculator/',
    ],
    reviewedOn: '2026-10-23',
  },
  {
    slug: 'derivative-at-a-point',
    title: 'How to Find the Derivative at a Point on a Graphing Calculator',
    description:
      "Find the derivative at a point on a graphing calculator with the tangent line tool: place it at your x-value and read the slope. Worked examples.",
    sections: [
      {
        heading: 'The short answer',
        body: [
          'To find the derivative of a function at a point on our graphing calculator, graph the function and open the analysis panel\'s tangent line tool. Place the tangent at the x-value you care about — the slope of that tangent line is the derivative at that point.',
          'For example, graph x^3 - 3*x, put the tangent at x = 2, and read the slope: it is 9, matching the calculus rule f\'(x) = 3x² − 3 evaluated at x = 2. No formula to type — the tool measures the slope of the curve for you.',
          'The idea behind the tool is the same definition you meet in class: the derivative is the limit of secant-line slopes as the two points merge. The tangent tool skips the limit and measures the final slope directly. That is why its number agrees with the differentiation rules — it computes the same quantity, just numerically instead of symbolically. It helps to think of the derivative as a speedometer reading. On a distance-versus-time graph, the tangent slope at a moment is the speed at that instant; on a profit curve, it is the marginal profit of one more unit. The tangent tool turns any "how fast right now" question into a number you can read off the screen.',
        ],
      },
      {
        heading: 'Step by step with the tangent tool',
        body: [
          'First, type the function into an expression line — use x^3 - 3*x as your practice curve. Next, open the analysis panel and select the tangent line tool, then choose (or type) the x-value where you want the derivative. A line appears hugging the curve at that point, labeled with its slope.',
          'The slope label is your answer: it is f\'(a), the instantaneous rate of change at x = a. Move the tangent along the curve and watch the slope change — where the curve is steep the slope is large, where it flattens the slope shrinks to zero.',
          'If your x-value is not a round number, type it exactly rather than dragging the point. For the derivative of sin(x) at x = pi/2, enter pi/2 as the point — the tangent lies flat and the slope reads 0, confirming the sine wave peaks there. Typing the point avoids the wobble of dragging and gives the cleanest reading. Make sure the tangent is attached to the right expression when several are graphed. With x^3 - 3*x, x^2, and sin(x) all on screen, select the curve first and then the point — otherwise the slope you read may belong to the wrong function. When in doubt, hide the other expressions temporarily so only your target curve is visible.',
        ],
      },
      {
        heading: 'See the whole derivative with the derivative plot',
        body: [
          'If instead of one point you want the derivative everywhere, use the numerical derivative plot in the analysis panel. It draws a new curve showing f\'(x) across the visible window — the slope function itself.',
          'Read the plot the same way you would read any graph: its height at x = a is the derivative at a. For the practice curve x^3 - 3*x, the derivative plot is the upward parabola 3x² − 3, dipping below the axis between x = −1 and x = 1 where the original curve slopes downward. Hovering over the derivative plot at any x gives that point\'s derivative numerically.',
          'The derivative plot is also the quickest way to see where a function increases or decreases: wherever the derivative curve sits above the axis, the original is rising; wherever it sits below, the original is falling. The zeros of the derivative plot are the turning points of the original — one picture answers three questions. The plot also settles a common confusion: the derivative is not the tangent line itself, but the slope of that line. The plot draws each slope as a height, converting "steepness" into an ordinary y-value you can read, compare, and even analyze further. That reframing is the whole idea of calculus in one picture.',
        ],
      },
      {
        heading: 'A worked example to check your understanding',
        body: [
          'Take f(x) = x². Its derivative is f\'(x) = 2x, so at x = 3 the derivative should be 6. Graph x^2, place the tangent at x = 3, and confirm the tool reports a slope of 6. This check builds trust: whenever the tool\'s number matches the power rule you learned in class, you know you are using it correctly.',
          'Now try a point where the answer is zero. On the same graph, move the tangent to x = 0 — the bottom of the parabola. The tangent lies flat, slope 0, which is exactly where the function\'s minimum sits. Zero derivative marks the turning points of a smooth curve.',
          'Try the same check on a trigonometric function. The derivative of sin(x) is cos(x), so at x = 0 the derivative should be cos(0) = 1. Graph sin(x), place the tangent at x = 0, and confirm the slope reads 1 — the wave crosses the origin at 45 degrees. One confirmed example per function family builds the habit of verifying before trusting. Keep a small library of verified examples: x^2 at x = 3 gives 6, sin(x) at x = 0 gives 1, and e^x at x = 0 gives 1, since the derivative of e^x is itself. Whenever a new answer looks suspicious, re-run one of these checks — if the tool agrees with the known value, the method is sound and the surprise is in your algebra, not the tool.',
        ],
      },
      {
        heading: 'Where the derivative does not exist',
        body: [
          'The tangent tool also exposes where calculus breaks down. Graph abs(x) — the V-shaped absolute value function — and place the tangent at x = 0. The tool cannot settle on a single slope because the curve has a sharp corner there; the slope coming from the left is −1 and from the right is +1.',
          'This is honest mathematics, not a tool failure: the derivative at a corner or cusp genuinely does not exist. If the slope readout jumps or refuses to stabilize as you nudge the point, look at the graph — you have likely found a sharp point.',
          'The same warning applies at vertical tangents. Near one, the slope readout grows without bound as you approach the point — the graph goes nearly vertical, and no finite number is the right answer. Whenever the readout behaves wildly, stop and look at the shape: the geometry always explains the number.',
        ],
      },
    ],
    tryExpressions: ['x^3 - 3*x', 'x^2', 'sin(x)'],
    keyTakeaways: [
      'The derivative at a point equals the slope of the tangent line there.',
      'Use the analysis panel\'s tangent line tool — place it at your x-value and read the slope.',
      'The numerical derivative plot draws the whole slope function f\'(x) at once.',
      'Check against the power rule on a known function (x² at x = 3 → slope 6).',
      'Sharp corners like abs(x) at x = 0 have no derivative — the tool cannot settle on one slope.',
    ],
    images: [
      {
        src: '/images/learn/derivative-at-a-point/graph-1.png',
        alt: 'Three curves: x^3 - 3*x with a wave-like shape, the parabola x^2, and the wave sin(x), plotted together on one set of axes',
        caption:
          'The three practice curves — x^3 − 3x, x^2, and sin(x) — plotted together. Place the tangent tool on any of them and the slope readout gives the derivative at that point.',
      },
      {
        src: '/images/learn/derivative-at-a-point/graph-2.png',
        alt: 'The curve y = x^3 - 3*x alone, dipping to a local minimum near x = 1 and rising to a local maximum near x = -1',
        caption:
          'The curve y = x³ − 3x plotted alone. The derivative is zero at the two turning points (x = −1 and x = 1), positive where the curve rises, and negative where it falls — the tangent tool makes this visible point by point.',
      },
    ],
    faqs: [
      {
        q: 'Can I just type a derivative formula like nDeriv?',
        a: 'Our calculator has no nDeriv() function to type. Instead, use the analysis panel: the tangent line tool gives the derivative at a single point, and the numerical derivative plot draws f\'(x) across the whole window. The results are the same — only the method differs.',
      },
      {
        q: 'How accurate is the slope the tool reports?',
        a: 'It is a numerical estimate of the true derivative, accurate to several decimal places for smooth functions. For homework and checking your work it is effectively exact; if you need the symbolic answer, differentiate on paper and use the tool to verify.',
      },
      {
        q: 'Why does the tangent tool act strange at a corner?',
        a: 'Because the derivative does not exist there. At the corner of abs(x) at x = 0, the slope from the left is −1 and from the right is +1, so no single tangent slope is correct. The tool\'s refusal to settle is the right answer.',
      },
    ],
    related: [
      '/learn/understanding-derivatives/',
      '/learn/tangent-line-at-a-point/',
      '/learn/getting-started-graphing-calculator/',
      '/learn/solve-quadratic-equations/',
      '/learn/find-local-minimum-and-maximum/',
      '/learn/increasing-and-decreasing-intervals/',
      '/math-functions/cubic/',
    ],
    reviewedOn: '2026-10-24',
  },
  {
    slug: 'graph-step-functions',
    title: 'How to Graph Step Functions and the Greatest Integer Function',
    description:
      "Graph step functions on a graphing calculator with floor(x): the greatest integer function draws a staircase. Syntax, shifts, and tables explained.",
    sections: [
      {
        heading: 'The short answer',
        body: [
          'To graph the greatest integer function on our graphing calculator, type floor(x) into an expression line. The floor function rounds each x down to the nearest integer, and the graph comes out as a staircase: flat steps that jump up by 1 at every integer.',
          'What you will see is a series of horizontal segments — floor(2.7) = 2, floor(3) = 3, floor(3.2) = 3 — with a jump discontinuity at each whole number. That staircase shape is the signature of every step function.',
          'Step functions show up wherever a quantity jumps at thresholds: postage rates by weight, tax brackets by income, grading cutoffs by score. The calculator treats them like any other function — type floor(x) and you get the staircase — which makes it easy to model these situations and read values off the steps.',
        ],
      },
      {
        heading: 'What the greatest integer function does',
        body: [
          'The greatest integer function, written ⌊x⌋ and also called the floor function, returns the largest integer less than or equal to x. So floor(4.9) = 4, floor(4) = 4, and — the tricky one — floor(−1.2) = −2, because −2 is the largest integer that is still less than or equal to −1.2.',
          'Each output value holds across a whole interval: floor(x) = 2 for every x from 2 up to (but not including) 3. That is why the graph is flat between integers and jumps at the integers themselves — the function is constant on each interval [n, n + 1).',
          'The negative side is where students get surprised, so test it in the table: floor(−0.3) = −1, not 0. Rounding down means toward negative infinity, not toward zero. The staircase keeps its shape, but the labels shift: the step at height −1 spans [−1, 0), just as the step at height 2 spans [2, 3).',
        ],
      },
      {
        heading: 'Reading the staircase on the graph',
        body: [
          'Look closely at what the calculator draws at a jump, say at x = 2. The segment coming from the left sits at height 1, and the segment starting at x = 2 sits at height 2. There is a genuine gap between them — a jump discontinuity — which the calculator shows as a break in the staircase, not a slanted connector.',
          'At the exact integer, the function takes the higher value: floor(2) = 2, since the interval [2, 3) includes its left endpoint. Each step therefore includes its left endpoint and excludes its right endpoint, a detail you can confirm in the table of values below.',
          'Compare with ceil(x), the ceiling function, to sharpen the picture. Where floor jumps up at the integer, ceil has already jumped: ceil(2) = 2 but ceil(1.9) = 2 as well, so its steps sit one unit higher on each open interval. Graphing floor(x) and ceil(x) together shows two staircases offset by exactly one — the visual difference between rounding down and rounding up.',
        ],
      },
      {
        heading: 'Shifting and scaling the steps',
        body: [
          'The same transformations that move smooth graphs also move staircases. Typing floor(x) + 2 lifts every step up by 2, and floor(x - 3) shifts the whole staircase 3 units right. To make the steps narrower or wider, scale inside: floor(2*x) puts two jumps per unit, while floor(x/2) stretches each step to width 2.',
          'You can also change the step height. floor(2*x)/2 produces steps of height 0.5 instead of 1 — the jumps still land at multiples of 0.5, just half as tall. Experiment by combining shifts and scales until you can predict the staircase before the calculator draws it.',
          'Sliders make this exploration fast. Type floor(x - h) + k and the calculator turns h and k into draggable sliders — drag h and the staircase slides left and right; drag k and it climbs or descends. Watching the jumps move as you drag connects the algebra of transformations to the picture instantly.',
        ],
      },
      {
        heading: 'Checking values with the table',
        body: [
          'At a jump, the graph alone cannot tell you which endpoint value the function actually takes — so open the table of values. A table for floor(x) shows 1.99 → 1, 2 → 2, 2.01 → 2, confirming that the jump at x = 2 lands on the higher value.',
          'The table is also how you read one-sided behavior near a step: the values just left of the integer approach the lower step, while the integer itself and everything just right of it sit on the upper step. For piecewise-style questions about "what is f(2)?" versus "what does f approach near 2?", the graph plus the table give the complete answer.',
          'One caution: never read a limit at a jump from the graph alone. As x approaches 2 from the left, floor(x) approaches 1; from the right, it approaches 2 — so the two-sided limit does not exist. The table shows this cleanly with rows at 1.99 and 2.01, while the graph shows the gap. Step functions are the classic example of why one-sided behavior matters.',
        ],
      },
    ],
    tryExpressions: ['floor(x)', 'floor(2*x)/2', 'ceil(x)'],
    keyTakeaways: [
      'floor(x) is the greatest integer function — type it directly; the graph is a staircase.',
      'Each step spans [n, n + 1): it includes the left endpoint, excludes the right.',
      'The jumps at integers are discontinuities — the calculator draws breaks, not connectors.',
      'floor(x) + 2 shifts up, floor(x - 3) shifts right, floor(2*x) narrows the steps.',
      'Use the table of values to confirm which value the function takes exactly at a jump.',
    ],
    images: [
      {
        src: '/images/learn/graph-step-functions/graph-1.png',
        alt: 'Three staircase graphs: floor(x) with unit steps, floor(2*x)/2 with half-height steps, and ceil(x) with steps offset to the right',
        caption:
          'All three try expressions together. floor(x) gives the classic unit staircase, floor(2*x)/2 gives steps half as tall, and ceil(x) — the ceiling function — shows the mirror-image staircase that rounds up instead of down.',
      },
      {
        src: '/images/learn/graph-step-functions/graph-2.png',
        alt: 'The staircase graph of y = floor(x) alone, flat steps rising by 1 at each integer with visible breaks at the jumps',
        caption:
          'The greatest integer function y = floor(x) plotted alone. Each horizontal step spans one unit and the function jumps by 1 at every integer — the defining shape of a step function.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between floor(x) and ceil(x)?',
        a: 'floor(x) rounds down to the nearest integer (floor(2.7) = 2), while ceil(x) rounds up (ceil(2.1) = 3). On the graph, ceil\'s staircase is the mirror image: its steps sit one unit higher, since ceil(x) equals floor(x) + 1 for every non-integer x.',
      },
      {
        q: 'Why are there gaps in the graph instead of vertical lines connecting the steps?',
        a: 'Because the function genuinely has no values between the steps at the jump — the graph goes from height 1 just left of x = 2 to height 2 at x = 2, with nothing in between. Drawing the break honestly shows the jump discontinuity; a connecting line would imply values that do not exist.',
      },
      {
        q: 'Can I graph a custom step function, like a shipping-cost schedule?',
        a: 'Yes, using the parametric workaround for piecewise functions: graph one parametric expression per flat piece (x = t, y = <price>, with the t-range set to that piece\'s interval). Each piece draws its own horizontal segment, building the schedule step by step.',
      },
    ],
    related: [
      '/learn/graph-piecewise-functions/',
      '/learn/what-is-a-function/',
      '/learn/how-to-use-the-table-of-values/',
      '/learn/graphing-inequalities/',
      '/learn/getting-started-graphing-calculator/',
      '/math-functions/absolute-value/',
      '/graphing-calculator/',
    ],
    reviewedOn: '2026-10-25',
  },
  {
    slug: 'evaluate-functions-at-a-point',
    title: 'How to Evaluate a Function at a Point on a Graphing Calculator',
    description:
      "Evaluate a function at a point on a graphing calculator: use the table of values or trace the graph to answer f(3) = ?. Quick workflow explained.",
    sections: [
      {
        heading: 'The short answer',
        body: [
          'To evaluate a function at a point — to answer "f(3) = ?" — type the function into an expression line and open the table of values. Find the row for your x-value and read the corresponding y: that number is the function\'s value at that point.',
          'For f(x) = x² + 1, the table row for x = 3 reads 10, so f(3) = 10. The table does the substitution for you, exactly and instantly, with no arithmetic mistakes.',
          'Substitution is all the calculator is doing — it replaces x with 3 in x² + 1 and computes 9 + 1 = 10. Knowing this keeps you in charge: the table is doing fast substitution, not magic. For simple functions, try the mental arithmetic first and use the table to confirm; for messy ones like 2.7*sin(1.3) + sqrt(5), let the table do the work.',
        ],
      },
      {
        heading: 'Using the table of values',
        body: [
          'The table of values lists x on one side and the computed f(x) on the other. Type x^2 + 1 into an expression line, open the table, and scroll or jump to x = 3 — the table shows 10. Many tables let you enter a specific x directly, which is the fastest route when you only need one value.',
          'The table shines when you need several values at once: f(−2), f(−1), f(0), f(1), f(2) appear as five neat rows. That is exactly the data you need to sketch a graph by hand or to fill in a homework table, computed without touching a single arithmetic step.',
          'Most tables let you set the step size — the gap between consecutive x rows. A step of 1 gives the integer lattice; a step of 0.5 fills in the halves. When hunting for where a function crosses zero, shrink the step around the sign change: rows at 1.9, 2.0, 2.1 pin the crossing far better than rows at 1, 2, 3. The step size is a zoom control for the table.',
        ],
      },
      {
        heading: 'Tracing the point on the graph',
        body: [
          'If you want to see the value on the curve itself, hover over or trace along the graph. As you move along x^2 + 1, a marker follows the curve and displays the (x, y) coordinates live — stop at x = 3 and the readout confirms (3, 10).',
          'Tracing is especially useful for points between the nice integers, where the table might not have a row. Slide the marker to x = 2.5 on x^2 + 1 and read y = 7.25 directly: the graph gives you values the table skipped.',
          'Tracing has one more trick: the marker sticks to the curve, so you cannot accidentally read a point that is off the graph. On paper sketches students often misread heights; the trace readout (2.5, 7.25) guarantees the point is exactly on the function. Use it whenever a question asks for a value "from the graph."',
        ],
      },
      {
        heading: 'Exact values and special inputs',
        body: [
          'Some inputs deserve exact answers rather than decimals. Type sin(x), open the table, and look at x = pi/2: the value is 1, exactly what the unit circle predicts. The calculator understands pi as a constant, so sin(pi/2) evaluates symbolically-aware input to the clean answer.',
          'Watch for domain restrictions the same way. Graph sqrt(x) and check the table at x = −4: there is no real value, because the square root of a negative number is not real. The table\'s blank or error entry is the calculator telling you −4 is outside the function\'s domain — a fact worth noting before you assume every x has an answer.',
          'Fractions work as inputs too. Evaluate sin(x) at x = pi/6 in the table and you get 0.5 — the exact value from the unit circle, no decimal dust. Because pi is stored as a true constant rather than 3.14159, special-angle evaluations come out clean. This makes the table a legitimate tool for checking trig homework, not just decimal approximations.',
        ],
      },
      {
        heading: 'Why this matters: function notation',
        body: [
          'Every "f(3) = ?" question is the same idea wearing function notation: the 3 goes into the rule, the output comes out. Evaluating on the calculator reinforces this — the expression line holds the rule f, and the table or trace feeds it inputs.',
          'This is the skill underneath bigger topics: checking whether a point lies on a graph (does the table give y = 10 at x = 3?), testing candidate solutions to equations, and building the ordered pairs (3, 10) that become dots on a hand-drawn sketch. Master evaluation and the rest of function work gets easier.',
          'Evaluation is also the engine inside equation solving. To check whether x = 2 solves x² − 3x + 2 = 0, evaluate x^2 - 3*x + 2 at x = 2: the table reads 0, so 2 is confirmed as a solution. Every "plug it back in" step your teacher asks for is an evaluation — and now you have a fast, reliable way to do it.',
        ],
      },
    ],
    tryExpressions: ['x^2 + 1', 'sin(x)', 'sqrt(x)'],
    keyTakeaways: [
      'Type the function, open the table of values, and read f(x) at your x.',
      'Enter a specific x directly in the table for the fastest single-value lookup.',
      'Trace or hover along the graph to read values between table rows.',
      'Constants like pi work in the table — sin(pi/2) evaluates to exactly 1.',
      'A blank or error entry in the table means the x is outside the function\'s domain.',
    ],
    images: [
      {
        src: '/images/learn/evaluate-functions-at-a-point/graph-1.png',
        alt: 'Three curves plotted together: the parabola x^2 + 1, the wave sin(x), and the square-root curve sqrt(x) starting at the origin',
        caption:
          'All three try expressions plotted together: the parabola x² + 1, the sine wave sin(x), and the half-curve of sqrt(x) starting at the origin. Open the table with any of these graphed to evaluate it at any x.',
      },
      {
        src: '/images/learn/evaluate-functions-at-a-point/graph-2.png',
        alt: 'The parabola y = x^2 + 1 alone, a U-shape with its lowest point at (0, 1)',
        caption:
          'The parabola y = x² + 1 plotted alone. Its table reads f(3) = 10 — find the x = 3 row and the y column gives the evaluated value directly.',
      },
    ],
    faqs: [
      {
        q: 'How do I evaluate f(3) if my function uses function notation?',
        a: 'The calculator does not need the f(x) = part — type just the rule, x^2 + 1, into an expression line. Then the table of values or the trace readout gives you f(3) at x = 3.',
      },
      {
        q: 'What if the x-value I need is not in the table?',
        a: 'Enter it directly if your table allows custom x-values, or trace along the graph: hover the marker to your x and read the live (x, y) readout. Tracing works for any x in the visible window, including decimals the table skipped.',
      },
      {
        q: 'Can the calculator show exact answers like √2 instead of 1.414?',
        a: 'The table and trace give decimal values. For exact forms like sin(pi/2) = 1, the input uses the exact constant pi and the result is the clean value; for irrational outputs such as sqrt(2), you get the decimal approximation.',
      },
    ],
    related: [
      '/learn/what-is-a-function/',
      '/learn/how-to-use-the-table-of-values/',
      '/learn/getting-started-graphing-calculator/',
      '/learn/solve-quadratic-equations/',
      '/learn/find-roots-and-zeros/',
      '/math-functions/cubic/',
      '/graphing-calculator/',
    ],
    reviewedOn: '2026-10-26',
  },
{
    slug: 'estimate-limits-with-table',
    title: 'How to Estimate Limits with a Graphing Calculator (Table Method)',
    description:
      'Estimate limits with the table-of-values method: sample x-values from both sides, work three classic examples, and learn what a table can and cannot prove.',
    reviewedOn: '2026-10-27',
    sections: [
      {
        heading: 'The direct answer: build a table on both sides',
        body: [
          'A limit asks what value a function approaches as x approaches some number — and a graphing calculator estimates it by evaluating the function at x-values that get closer and closer to that number from both the left and the right. If the outputs settle toward the same number from both sides, that number is your estimate of the limit.',
          'The tool for this is the table of values: instead of guessing from the graph, you read actual computed numbers. Open the analysis panel, choose the table of values, and enter x-values like 0.9, 0.99, 0.999 on the left side of x = 1 and 1.001, 1.01, 1.1 on the right side. When the y-values converge to the same value from both directions, you have a trustworthy estimate — but an estimate, not a proof, as section 4 explains.',
        ],
      },
      {
        heading: 'Step by step: the classic (x^2 − 1)/(x − 1) example',
        body: [
          'Type (x^2-1)/(x-1) as a cartesian expression. Try evaluating it at x = 1 and the calculator refuses — division by zero is undefined there, so the function has a hole at x = 1. But the limit asks what the function approaches near x = 1, not what it equals at x = 1, and those are two different questions.',
          'Open the table of values and enter 0.9, 0.99, 0.999, then 1.001, 1.01, 1.1. The outputs read 1.9, 1.99, 1.999, 2.001, 2.01, 2.1 — closing in on 2 from both sides. Algebra confirms it: for x ≠ 1 the expression simplifies to x + 1. So the limit as x approaches 1 is 2, even though the function itself is undefined there. This is the whole point of limits: behavior near a point, independent of behavior at the point.',
          'A second classic belongs in your toolkit: sin(x)/x as x approaches 0. The function is undefined at 0, but the table at 0.1, 0.01, 0.001 reads 0.9983, 0.99998, 0.9999998 — homing in on 1. This limit is famous because no algebra simplifies it; the table is genuinely how most students first meet it, and the graph confirms the smooth peak at (0, 1).',
        ],
      },
      {
        heading: 'Why both sides matter',
        body: [
          'A two-sided limit exists only when the left-hand and right-hand approaches agree. Graph abs(x)/x and build a table around x = 0: from the right (0.1, 0.01, 0.001) every output is 1, and from the left (−0.1, −0.01, −0.001) every output is −1. The two sides refuse to agree, so the limit as x approaches 0 does not exist.',
          'This is the step beginners skip: reading one side and declaring victory. Always sample both. In our calculator the table lets you mix x-values freely, so put left-side and right-side values in the same table and watch whether the outputs march toward one shared number or split into two camps. A split means there is no two-sided limit — and that is a real answer, not a failure of the method.',
          'One-sided limits deserve the same care. Sometimes a problem asks specifically for the limit from the right (written with a small + superscript) or from the left — for example, the right-hand limit of abs(x)/x at 0 is 1, while the left-hand limit is −1. In the table, that just means reading only the values on the requested side. Two-sided limits require both one-sided limits to exist and agree; when a textbook asks for a one-sided limit, half the table is the whole answer.',
        ],
      },
      {
        heading: 'What a table cannot prove',
        body: [
          'A calculator evaluates finitely many points; a limit is a claim about infinitely many. For 1/x near x = 0, the table shows outputs like 10, 100, 1000 on the right and −10, −100, −1000 on the left — the function blows up in opposite directions, so there is no finite limit. The table strongly suggests this, but the conclusion that it grows without bound is your mathematical judgment, not something the table proved.',
          'Worse, tables can mislead for oscillating functions like sin(1/x) near 0, which swings between −1 and 1 forever — a few sampled points might accidentally suggest a pattern that is not there. Treat the table as evidence, pair it with the graph, and reserve the word prove for algebra: the calculator estimates, and you conclude.',
        ],
      },
      {
        heading: 'Pair the table with the graph',
        body: [
          'The strongest workflow uses both views. Graph (x^2-1)/(x-1) alongside the horizontal line y = 2 (try the expressions below): the curve hugs the line everywhere except the hole at x = 1, which the graph reveals and the table alone hides. Meanwhile sin(x)/x shows a smooth peak of 1 at x = 0 on both views, confirming the table numerically.',
          'A practical habit: whenever a table suggests a limit, zoom the graph around that point and check that the picture agrees — no hidden asymptote, no oscillation, no split behavior. When both views tell the same story, your estimate is as solid as numerical evidence gets. For the asymptote side of this story, see the article on asymptotes.',
          'One practical tip: choose your x-values geometrically, not arithmetically. Values like 0.9, 0.99, 0.999 approach the target ten times faster with each step, so three entries reveal the trend that ten evenly spaced values would blur. If the outputs stabilize to the decimal places you care about, stop — more digits cost time without adding insight. And when a limit involves infinity itself, such as 1/x as x grows large, the same method works in reverse: table x = 10, 100, 1000 and watch the outputs 0.1, 0.01, 0.001 settle toward 0.',
        ],
      },
    ],
    tryExpressions: ['(x^2-1)/(x-1)', '2', 'sin(x)/x'],
    keyTakeaways: [
      'A limit is estimated by evaluating the function at x-values approaching the target from both the left and the right.',
      'For (x^2-1)/(x-1), the table values 1.9, 1.99, 1.999, … and 2.001, 2.01, 2.1, … converge to 2 — the limit at x = 1.',
      'A two-sided limit exists only if both sides agree; abs(x)/x approaches 1 from the right and −1 from the left, so its limit at 0 does not exist.',
      'Tables suggest but never prove: 1/x blows up near 0 and sin(1/x) oscillates forever, cases where sampling alone can mislead.',
      'Always cross-check the table against the graph — the table gives precision, the graph reveals holes, asymptotes, and oscillation.',
    ],
    images: [
      {
        src: '/images/learn/estimate-limits-with-table/graph-1.png',
        alt: 'Graph of (x^2-1)/(x-1) with the line y = 2 and sin(x)/x, showing both functions approaching their limits',
        caption:
          'The expressions (x^2-1)/(x-1), y = 2, and sin(x)/x plotted together. Notice the first curve hugging y = 2 except for the hole at x = 1, and sin(x)/x peaking at (0, 1).',
      },
      {
        src: '/images/learn/estimate-limits-with-table/graph-2.png',
        alt: 'Graph of (x^2-1)/(x-1) alone, a line-like curve with a hole at x = 1',
        caption:
          'The function (x^2-1)/(x-1) on its own. The curve follows y = x + 1 everywhere except the hole at (1, 2), which the table method detects numerically.',
      },
    ],
    faqs: [
      {
        q: 'Can a function have a limit at a point where it is undefined?',
        a: 'Yes — the limit describes behavior near the point, not at it. (x^2-1)/(x-1) is undefined at x = 1, yet its limit there is 2, because the nearby values on both sides all approach 2.',
      },
      {
        q: 'How many table values are enough?',
        a: 'There is no magic number. Use several on each side, each roughly ten times closer than the last (0.9, 0.99, 0.999, …), and stop when the outputs stabilize to the precision you need. If they never stabilize, that itself is information.',
      },
      {
        q: 'Why not just read the limit off the graph?',
        a: 'You can, and you should cross-check — but graphs have limited pixel resolution, while a table gives exact computed values like 1.999 versus 2.001. The table is the more precise instrument; the graph is the better overview.',
      },
    ],
    related: [
      '/learn/how-to-use-the-table-of-values/',
      '/learn/asymptotes-explained/',
      '/learn/holes-in-rational-functions/',
      '/learn/evaluate-functions-at-a-point/',
      '/math-functions/reciprocal/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'line-of-best-fit',
    title: 'How to Find the Line of Best Fit on a Graphing Calculator',
    description:
      'No regression button here — plot your data as points, add y = m*x + b, and drag the sliders until the line fits. An honest hands-on workflow.',
    reviewedOn: '2026-10-28',
    sections: [
      {
        heading: 'The direct answer — and an honest limitation',
        body: [
          'A line of best fit is the straight line that best summarizes the trend in a scatter of data points. On some calculators you compute it with a regression command (STAT, then CALC, then LinReg); our calculator has no statistics or regression module, so it cannot compute that line for you. What it can do is better for learning: you plot your data as points, add the expression m*x + b, and drag the m and b sliders until the line threads the middle of the points by eye.',
          'The result is a fitted line, not the least-squares line — fitting by eye is an estimate, and two people may land on slightly different lines. That honesty is the point: you see exactly what best means (the line that balances the points above and below it) instead of trusting a black-box number. For data that is roughly linear, the by-eye line and the true regression line usually end up close.',
        ],
      },
      {
        heading: 'What best fit actually means',
        body: [
          'The formal definition: the line of best fit, or least-squares line, is the line that minimizes the sum of the squared vertical distances — the residuals — between the line and the data points. Squaring punishes large misses more than small ones, so the line follows the overall trend rather than chasing any single outlier.',
          'You do not need the formula to use the idea. A good fit means the points scatter evenly above and below the line with no obvious curve left over. If the points form a curve, no straight line fits well — and that is your cue that a linear model is the wrong model, something a regression button would never tell you.',
          'The two numbers you read off the sliders have plain meanings. The slope m is the predicted change in y for each one-unit increase in x — in the study example, about 6.5 test points per study hour. The intercept b is the predicted y when x = 0, which is only meaningful if x = 0 sits near your data; predicting scores for zero study hours from this line is extrapolation, and extrapolation is where linear models most often go wrong.',
        ],
      },
      {
        heading: 'The workflow other calculators use (background knowledge)',
        body: [
          'On a TI-style calculator the classic workflow is: enter your data as two lists under STAT EDIT, open STAT CALC, choose LinReg(ax+b), and read off the slope a, the intercept b, and the correlation coefficient r. It is worth knowing this exists, because textbooks and exams often assume it, and the comparison helps you understand what our slider workflow replaces.',
          'But notice what the button hides: the machine picks the line, and students copy the numbers without asking whether a line was appropriate. Our slider workflow keeps that judgment with you — you decide the fit looks right, you read m and b off the sliders, and you can immediately see when the data refuses to be straight.',
        ],
      },
      {
        heading: 'Fitting by eye in our calculator, step by step',
        body: [
          'First, enter your data as point expressions — one point expression per (x, y) pair. Take five students with study hours and test scores: (1, 52), (2, 58), (3, 65), (4, 71), (5, 78). The points appear as a scatter plot. Then add the cartesian expression m*x + b: because m and b are free identifiers, they automatically become slider variables you can drag.',
          'Drag m to set the steepness and b to set the height until the line runs through the middle of the cloud, with roughly as many points above as below and no systematic curve remaining. Read the final m and b values off the sliders — those are your fitted slope and intercept. For the study-hours data above, a careful by-eye fit lands near m = 6.5 and b = 45: each extra hour of study predicts about 6.5 extra points, starting from a baseline near 45.',
          'Two practical tips. First, start with the sliders at m = 1 and b = 0, and adjust m before b: get the tilt right, then lift or lower the line into place. Second, set the window to fit your data before fitting — if the points are squeezed into a corner, every line looks the same. A good window shows the full cloud with a little margin, which makes the by-eye judgment dramatically easier.',
        ],
      },
      {
        heading: 'Judging the fit with residuals',
        body: [
          'After fitting, open the table of values for your line at the data x-values and compare each predicted y with the measured y. The differences — measured minus predicted — are the residuals. Good residuals are small and show no pattern: plus, minus, plus, minus in no particular order.',
          'A concrete residual check on the study data: with m = 6.5 and b = 45, the predictions at x = 1, 2, 3, 4, 5 are 51.5, 58, 64.5, 71, 77.5, against measured 52, 58, 65, 71, 78 — residuals 0.5, 0, 0.5, 0, 0.5. They are tiny and show no pattern, which is exactly what a trustworthy linear fit looks like. If your residuals are ten times larger or march in a clear sequence, keep adjusting the sliders.',
          'If the residuals start negative, turn positive, then go negative again, the data curves and a straight line is the wrong model — try a quadratic instead. This residual check is the same diagnostic professional statisticians use, and it works just as well on a by-eye fit. Remember the limitation: your line is a visual estimate, so report it as an approximation (about 6.5 points per hour), not as a computed statistic.',
        ],
      },
    ],
    tryExpressions: ['m*x + b', '2*x + 1'],
    keyTakeaways: [
      'Our calculator has no regression command; the honest workflow is to plot the points, add y = m*x + b, and drag the m and b sliders until the line fits by eye.',
      'The line of best fit (least squares) minimizes the sum of the squared vertical distances — the residuals — between the line and the points.',
      'A good fit has points scattered evenly above and below the line; m is the predicted change in y per unit of x, and b is the predicted y when x = 0.',
      'Check residuals — measured minus predicted — in the table of values; a pattern in the residuals means a straight line is the wrong model.',
      'By-eye fits are estimates: report them as approximations, and use proper statistics software when precision matters.',
    ],
    images: [
      {
        src: '/images/learn/line-of-best-fit/graph-1.png',
        alt: 'Scatter plot of data points with a fitted line y = m*x + b running through the middle of the points',
        caption:
          'Data points plotted with the fitted line y = m*x + b. Drag the m and b sliders until the line threads the middle of the cloud, balancing points above and below.',
      },
      {
        src: '/images/learn/line-of-best-fit/graph-2.png',
        alt: 'The line y = m*x + b shown alone with its slope and intercept sliders',
        caption:
          'The slider line y = m*x + b on its own. Adjusting m changes the steepness and b changes the height — the two controls of any linear fit.',
      },
    ],
    faqs: [
      {
        q: 'Why does the calculator not just compute the regression line?',
        a: 'Our calculator is a graphing tool, not a statistics package — it has no LinReg or list-statistics module. The slider workflow replaces the button with judgment: you fit the line by eye, which teaches what best fit means instead of hiding it.',
      },
      {
        q: 'Is fitting by eye accurate enough?',
        a: 'For roughly linear data, a careful by-eye fit usually lands close to the least-squares line — close enough for homework estimates and for deciding whether a linear model makes sense. For published analysis, use proper statistics software and report the method.',
      },
      {
        q: 'What if the points form a curve?',
        a: 'Then no straight line fits well, and the residuals will show a pattern — for example, negative, then positive, then negative again. That pattern is telling you to try a curved model like a quadratic; do not force a line through curved data.',
      },
    ],
    related: [
      '/learn/estimate-limits-with-table/',
      '/learn/how-to-use-the-table-of-values/',
      '/learn/evaluate-functions-at-a-point/',
      '/learn/function-transformations/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'amplitude-period-phase-shift',
    title: 'Amplitude, Period and Phase Shift: Graphing Sine and Cosine Transformations',
    description:
      'Type A*sin(B*(x − C)) + D and drag four sliders to see exactly what amplitude, period, phase shift, and vertical shift do to sine and cosine waves.',
    reviewedOn: '2026-10-29',
    sections: [
      {
        heading: 'The direct answer: one expression, four sliders',
        body: [
          'Type A*sin(B*(x - C)) + D as a cartesian expression. Because A, B, C, and D are free identifiers, each automatically becomes a slider you can drag — and each slider controls exactly one feature of the wave: A the height, B the frequency, C the horizontal position, D the vertical position. Drag one at a time and watch what changes; that single experiment teaches more than any definition.',
          'The four numbers have standard names: the amplitude is |A| (half the total height of the wave), the period is 2*π/|B| (the length of one full cycle), the phase shift is C (how far the wave slides left or right), and D is the vertical shift (the midline the wave oscillates around). Everything below is just unpacking those four facts.',
        ],
      },
      {
        heading: 'Amplitude and vertical shift: A and D',
        body: [
          'The amplitude |A| measures how far the wave swings above and below its midline. With D = 0, the graph of 2*sin(x) reaches y = 2 and y = −2 — twice as tall as sin(x). A negative A, like −2*sin(x), flips the wave upside down; the amplitude is still |−2| = 2, because amplitude is a distance and is never negative.',
          'D slides the whole wave up or down: the midline moves from y = 0 to y = D, and the wave oscillates between D − |A| and D + |A|. So 2*sin(x) + 1 swings between −1 and 3. Drag the D slider and notice the shape never changes — vertical shift is pure translation, independent of everything else.',
          'Try reading one cold: for y = 3*sin(x) − 2, the amplitude is 3, the midline is y = −2, and the wave swings between −5 and 1. Enter it, then drag A from 3 down to 1 and watch the band shrink toward the midline — the midline itself never moves, because A and D are independent controls. This independence is the whole reason the four-parameter form is worth learning: each slider does exactly one job.',
        ],
      },
      {
        heading: 'Period: B squeezes and stretches',
        body: [
          'The period of sin(x) is 2π — one full wave every 2π units. Multiplying the input by B squeezes (|B| > 1) or stretches (|B| < 1) the wave horizontally, and the new period is 2*π/|B|. For 2*sin(3*x) the period is 2π/3, so three full waves fit into the space where one used to be.',
          'Watch the B slider: as B grows, more waves crowd into the same window while the height never changes. A negative B, like sin(−x), mirrors the wave left to right — which for sine equals −sin(x) — and the period formula uses |B| because a period, like an amplitude, is always positive.',
          'A frequent confusion: B is not quite the number of waves per 2π units — the precise statement is that exactly |B| full cycles fit into every 2π-wide window. For B = 3, three waves occupy 0 to 2π; for B = 0.5, a single wave stretches across 0 to 4π. If you want a wave that completes exactly 5 cycles between 0 and 2π, set B = 5 — and the period formula 2π/5 confirms each cycle is 2π/5 wide.' ,
        ],
      },
      {
        heading: 'Phase shift: C slides the wave sideways',
        body: [
          'The expression sin(B*(x − C)) shifts the wave horizontally by C: a positive C moves it right, a negative C moves it left. This is the same inside-the-parentheses reversal from general function transformations — what looks like subtraction moves the graph to the right. In 2*sin(3*(x − π/4)) + 1, the phase shift is π/4 to the right.',
          'Putting it together on that example: amplitude 2, period 2π/3, phase shift π/4 right, midline y = 1, so the wave oscillates between −1 and 3. Read any transformed sine this way — A, B, C, D in order — and you can sketch it without touching the calculator.',
          'Be careful with the factored form: the phase shift is only C when the expression is written as B*(x − C). In 2*sin(3*x − π/4), the shift is not π/4 — factor out the 3 first to get 2*sin(3*(x − π/12)), revealing a right shift of π/12. This is the single most common algebra slip with phase shifts, and the slider form A*sin(B*(x - C)) + D exists precisely to keep you in the safe factored form.',
        ],
      },
      {
        heading: 'Cosine follows the same rules',
        body: [
          'Everything above applies to cosine: A*cos(B*(x − C)) + D has amplitude |A|, period 2π/|B|, phase shift C, and midline y = D. The only difference is the starting shape — cosine begins at its maximum while sine begins at its midline climbing.',
          'In fact, a phase shift turns one into the other: cos(x) = sin(x + π/2). If your data starts at a peak, reach for cosine; if it starts mid-climb, reach for sine — then tune A, B, C, D exactly the same way. Compare your transformed wave against the parent sin(x) using the expressions below to see each parameter effect in isolation.',
          'You can also work backwards: given a graphed wave, measure the parameters. The midline D is halfway between the maximum and minimum; the amplitude A is the distance from the midline to either extreme; the period is the horizontal distance between two adjacent peaks, giving B = 2π/period; and the phase shift is how far the first peak sits from where sin(x) peaks. Use the analysis panel min and max markers to read the extremes precisely, and you can reconstruct the whole formula from the picture.',
        ],
      },
    ],
    tryExpressions: ['A*sin(B*(x - C)) + D', 'sin(x)'],
    keyTakeaways: [
      'y = A*sin(B*(x − C)) + D puts each wave feature on its own slider: A amplitude, B frequency, C phase shift, D vertical shift.',
      'Amplitude = |A|, half the peak-to-trough height; period = 2π/|B|, the length of one full cycle.',
      'Positive C shifts the wave right and negative C shifts it left; D moves the midline to y = D, so the wave spans D − |A| to D + |A|.',
      'Cosine follows identical rules — cos(x) = sin(x + π/2), so a phase shift converts one into the other.',
      'Read any transformed sine in A, B, C, D order to sketch amplitude, period, shift, and midline without the calculator.',
    ],
    images: [
      {
        src: '/images/learn/amplitude-period-phase-shift/graph-1.png',
        alt: 'The transformed wave A*sin(B*(x - C)) + D plotted with the parent function sin(x) for comparison',
        caption:
          'A*sin(B*(x - C)) + D alongside sin(x). Drag the A, B, C, D sliders one at a time to isolate the effect of amplitude, period, phase shift, and vertical shift.',
      },
      {
        src: '/images/learn/amplitude-period-phase-shift/graph-2.png',
        alt: 'The expression A*sin(B*(x - C)) + D graphed alone as a transformed sine wave',
        caption:
          'A*sin(B*(x - C)) + D on its own. Amplitude |A| sets the height, 2π/|B| sets the period, C sets the phase shift, and D sets the midline.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between phase shift and period?',
        a: 'The period (2π/|B|) is the length of one wave cycle — how squeezed the wave is. The phase shift (C) is where the wave starts — how far it slides left or right. Changing B never moves the wave sideways; changing C never changes its width.',
      },
      {
        q: 'Can the amplitude be negative?',
        a: 'No — amplitude is defined as |A|, a distance, so it is always non-negative. A negative A flips the wave vertically (2*sin(x) versus −2*sin(x) are mirror images), but both have amplitude 2.',
      },
      {
        q: 'Why does (x − C) shift the graph right instead of left?',
        a: 'Because the shift asks where the wave reaches the value it used to reach at 0. For sin(x − π/4) to equal sin(0), you need x = π/4 — a point to the right. Inside the parentheses, the horizontal direction always feels reversed.',
      },
    ],
    related: [
      '/learn/line-of-best-fit/',
      '/learn/function-transformations/',
      '/math-functions/sine/',
      '/math-functions/cosine/',
      '/examples/trigonometric-interference/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'solve-systems-of-equations',
    title: 'How to Solve a System of Equations on a Graphing Calculator',
    description:
      'Convert standard form to slope-intercept, graph both lines, and let the intersection markers solve the system — parallel and coincident cases included.',
    reviewedOn: '2026-10-30',
    sections: [
      {
        heading: 'The direct answer: graph both, read the intersection',
        body: [
          'A system of equations asks for the point or points that satisfy every equation at once — and on a graph, that is exactly where the curves cross. Enter each equation solved for y as its own cartesian expression, then open the analysis panel and use the intersection markers: every marker is a solution to the system.',
          'For example, enter 2*x + 1 and -x + 4. The lines cross at (1, 3), and the intersection marker reads it off: x = 1, y = 3 satisfies both equations, since 2*1 + 1 = 3 and −1 + 4 = 3. Graphing turns the algebraic chore of solving simultaneously into the visual question of where the graphs meet.',
        ],
      },
      {
        heading: 'First convert to slope-intercept form',
        body: [
          'The calculator graphs y = expressions, so an equation in standard form like 3*x + 2*y = 12 needs one rearrangement first: subtract 3*x from both sides to get 2*y = -3*x + 12, then divide by 2 to get y = -1.5*x + 6. Enter that. The solution set is unchanged — you only rewrote the same line in a graphable form.',
          'Slope-intercept form has a bonus: it exposes the slope immediately, which tells you which of the three cases you are in before you even graph. Same slope with a different intercept means parallel lines and no solution. Same slope with the same intercept means the same line twice and infinitely many solutions. Different slopes mean exactly one crossing and exactly one solution.',
          'Fractions are the usual stumbling block in the conversion. Take 2*x + 3*y = 7: subtract 2*x to get 3*y = -2*x + 7, then divide every term by 3 — including the constant — to get y = (-2/3)*x + 7/3. Forgetting to divide the constant term is the classic error, and it produces a parallel line with the wrong intercept, which silently changes the solution. Convert slowly, then let the graph confirm the line sits where you expect.' ,
        ],
      },
      {
        heading: 'Step by step in the calculator',
        body: [
          'Add one cartesian expression per equation — for the system y = 2*x + 1 and y = -x + 4, that is two expressions. Adjust the window so the crossing is visible; here the default view works, since the lines cross at (1, 3). Then open the analysis panel and select the intersection tool, which places a marker at every point where two graphs meet.',
          'Read the marker coordinates — those are your solution. Verify by substitution: does 3 equal 2*1 + 1? Yes. Does 3 equal −1 + 4? Yes. For a second check, open the table of values at x = 1 and confirm that both expressions output 3. Two independent checks, one answer.',
          'The same method handles curves, where algebra gets painful: for the system y = x^2 and y = 2*x + 1, enter both expressions and place intersection markers at each crossing. The markers find every solution — including ones the quadratic formula would make you work for — because the tool does not care whether the graphs are straight.',
        ],
      },
      {
        heading: 'The two special cases: no solution and infinitely many',
        body: [
          'Graph 2*x + 1 and 2*x - 3 together (both are in the expressions below). The lines run side by side forever — same slope 2, different intercepts — so the intersection tool finds nothing, correctly: a system of parallel lines has no solution, because no point lies on both lines.',
          'The opposite case: the system y = 2*x + 1 and 2*y = 4*x + 2. Divide the second equation by 2 and it becomes y = 2*x + 1 — the identical line. Every point on the line satisfies both equations, so there are infinitely many solutions. Rule of thumb: if simplifying makes one equation identical to the other, stop — the system is dependent, and no further solving is needed.',
          'Dependent systems often hide behind different-looking equations. The pair 3*x + 2*y = 12 and 6*x + 4*y = 24 looks like two constraints, but the second is just the first doubled — one line wearing a disguise. The tell: every coefficient and the constant scale by the same factor. When you spot that, you know immediately there are infinitely many solutions without graphing anything.',
        ],
      },
      {
        heading: 'Checking your answer the careful way',
        body: [
          'A marker on a graph is convincing, but build the habit of verifying algebraically. Substitute the coordinates back into each original equation — not the rearranged versions — and confirm both sides match. For (1, 3) in the system above, both equations check out exactly.',
          'The table of values gives a second verification path: enter the solution x-value and confirm every expression in the system outputs the same y. If the outputs disagree, you misread the marker or mistyped an expression — the table catches both mistakes. When all three views (graph, substitution, table) agree, the solution is certain.',
          'A final note on word problems: systems usually arrive disguised, with x and y standing for quantities like tickets sold or liters mixed. Define your variables first, write one equation per sentence of the problem, and only then start converting and graphing. The calculator solves the system you give it — making sure it is the right system is the human part.',
        ],
      },
    ],
    tryExpressions: ['2*x + 1', '-x + 4', '2*x - 3'],
    keyTakeaways: [
      'A system\u2019s solutions are the graphs\u2019 intersection points — enter each equation as y = an expression and use the analysis panel\u2019s intersection markers.',
      'Convert standard form to slope-intercept first (3*x + 2*y = 12 becomes y = -1.5*x + 6); the slope then reveals which case you are in.',
      'y = 2*x + 1 and y = -x + 4 cross at (1, 3) — one crossing means exactly one solution.',
      'Same slope with a different intercept means parallel lines and no solution; identical lines mean infinitely many solutions.',
      'Always verify: substitute the coordinates into both original equations, or compare both outputs in the table of values.',
    ],
    images: [
      {
        src: '/images/learn/solve-systems-of-equations/graph-1.png',
        alt: 'The lines y = 2*x + 1 and y = -x + 4 crossing at (1, 3), with y = 2*x - 3 running parallel to the first',
        caption:
          '2*x + 1, -x + 4, and 2*x - 3 plotted together. The first two cross at (1, 3) — the solution — while 2*x - 3 stays parallel to 2*x + 1 forever: no solution.',
      },
      {
        src: '/images/learn/solve-systems-of-equations/graph-2.png',
        alt: 'The line y = 2*x + 1 graphed alone',
        caption:
          '2*x + 1 on its own: slope 2, y-intercept 1. Each equation in a system becomes one such line before the intersection tool finds where they meet.',
      },
    ],
    faqs: [
      {
        q: 'How is this different from the intersection-finder article?',
        a: 'The intersection article is about the tool itself; this article is about the algebra workflow — converting standard form to slope-intercept, recognizing the parallel and coincident cases, and verifying solutions. Use the two together.',
      },
      {
        q: 'Can I solve systems with three equations?',
        a: 'Graphically, yes, for two unknowns: graph all three lines and look for a single common point. But three lines in a plane rarely meet at one point — usually there is no exact solution, and the graph shows you why instantly.',
      },
      {
        q: 'The intersection tool found nothing — did I do something wrong?',
        a: 'Probably not: no marker usually means no solution. Check the slopes — if both lines share a slope but have different intercepts, they are parallel and never meet. If the equations simplify to the same line, every point is a solution instead.',
      },
    ],
    related: [
      '/learn/find-intersection-of-two-graphs/',
      '/learn/amplitude-period-phase-shift/',
      '/learn/solve-quadratic-equations/',
      '/learn/graphing-inequalities/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'graph-logarithmic-functions',
    title: 'How to Graph Logarithmic Functions on a Graphing Calculator',
    description:
      'Type log(x) for the natural log, log10(x) for base 10, and log(x)/log(2) for any other base — with the vertical asymptote at x = 0 explained.',
    reviewedOn: '2026-10-31',
    sections: [
      {
        heading: 'The direct answer: type log(x)',
        body: [
          'To graph the natural logarithm, enter log(x) as a cartesian expression. One naming honesty up front: on this calculator, log means the natural logarithm (base e) — the function many textbooks write as ln. If you type ln(x), it works too, because ln is aliased to log. There is no separate natural-log button to hunt for.',
          'The curve rises steeply just right of the y-axis, passes through (1, 0) — because log(1) = 0 in every base — then flattens as it climbs: log(e) = 1, log(e^2) = 2, each extra unit of height demanding a multiplicatively larger x. That relentless flattening is the signature shape of every logarithm.',
        ],
      },
      {
        heading: 'log, log10, and ln — which is which',
        body: [
          'Three names, two functions on this calculator: log(x) and ln(x) are both the natural logarithm (base e, about 2.718), while log10(x) is the common logarithm (base 10). So log10(100) = 2 and log10(1000) = 3 — the common log counts digits, which is why scientists use it for pH, decibels, and earthquake magnitudes.',
          'This naming differs from some textbooks and calculators where log means base 10 — a classic source of wrong answers. On our calculator, if you want base 10 you must type log10 explicitly. When in doubt, test: log(e) should equal 1, and log10(10) should equal 1. Both are true here.',
          'The confusion is historical: on handheld calculators, the LOG button traditionally meant base 10 while LN meant base e, but in higher mathematics log alone almost always means the natural logarithm. Our calculator follows the mathematical convention. If you are working from a textbook that uses log for base 10, translate every one of its log(x) examples into log10(x) here — a one-word change that prevents an entire category of wrong answers.',
        ],
      },
      {
        heading: 'Any other base via change of base',
        body: [
          'There is no log2 button, and none is needed: the change-of-base formula says log_b(x) = log(x)/log(b) for any base b. To graph log base 2, enter log(x)/log(2). To graph log base 5, enter log(x)/log(5). The formula works with our log because any logarithm base can play the role of the common base in the fraction.',
          'Check it: log(8)/log(2) = 3, since 2^3 = 8. On the graph, log(x)/log(2) passes through (2, 1), (4, 2), and (8, 3) — each doubling of x adds exactly 1, which is precisely what base 2 means. Try the three expressions below together to see how the base controls the steepness.',
          'Verify the formula numerically before trusting it: open the table of values for log(x)/log(2) at x = 2, 4, 8 and confirm the outputs 1, 2, 3. This two-second check catches the classic mistake of writing log(2)/log(x) — the fraction upside down — which would give reciprocals instead of logarithms.',
        ],
      },
      {
        heading: 'The domain and the asymptote at x = 0',
        body: [
          'Logarithms are defined only for positive x — no power of e or 10 can produce zero or a negative number, so log(x) refuses every x ≤ 0. As x approaches 0 from the right, log(x) plunges toward negative infinity: the y-axis (x = 0) is a vertical asymptote, and the curve hugs it ever more tightly without ever touching it.',
          'This makes logarithms the perfect companion to the asymptotes article: zoom in near x = 0 and watch the table of values output −2.3, −4.6, −6.9 at x = 0.1, 0.01, 0.001 — dropping by equal steps as x shrinks tenfold. Contrast this with 1/x, whose right-hand asymptote climbs to positive infinity; log(x) dives to negative infinity instead.',
          'There is a subtlety worth noticing: near the asymptote the logarithm dives slowly compared with 1/x. At x = 0.001, 1/x has already reached 1000 while log(x) sits at only −6.9. The logarithm still blows up, but lazily — it is the slowest-growing unbounded function you will meet, which is exactly why log scales can compress enormous ranges onto one readable axis.',
        ],
      },
      {
        heading: 'Comparing bases and meeting the inverse',
        body: [
          'Graph log(x), log10(x), and log(x)/log(2) together: all three pass through (1, 0) and share the asymptote x = 0, but the larger the base, the flatter the climb — base 10 rises slowest because each unit of y demands a tenfold x. For a base between 0 and 1 the graph flips: log(x)/log(0.5) decreases, because log(0.5) is negative.',
          'That decreasing case deserves a concrete picture: log(x)/log(0.5) passes through (1, 0) like the others, but at x = 2 it reads −1 and at x = 4 it reads −2 — each doubling of x subtracts 1 instead of adding it. The curve is the mirror image of log(x)/log(2) across the x-axis, which makes sense: log(0.5) = −log(2), so dividing by it flips every sign. Bases below 1 are rare in practice, but recognizing the flip keeps the change-of-base formula feeling like one coherent idea.',
          'Finally, note the partnership: log and exp are inverse functions — exp(log(x)) = x for x > 0 — and their graphs mirror each other across the line y = x. Graphing them together is the clearest way to see what an inverse function really is. Logarithms grow more slowly than any power of x, which is why log scales tame quantities that span many orders of magnitude.',
        ],
      },
    ],
    tryExpressions: ['log(x)', 'log10(x)', 'log(x)/log(2)'],
    keyTakeaways: [
      'On this calculator log(x) is the natural logarithm (ln(x) is an alias); log10(x) is base 10 — never assume log means base 10.',
      'Any base works via change of base: log_b(x) = log(x)/log(b), so log base 2 is log(x)/log(2).',
      'Every logarithm passes through (1, 0), is defined only for x > 0, and has a vertical asymptote at x = 0.',
      'Larger bases climb more slowly; bases between 0 and 1 make the graph decrease instead of increase.',
      'log and exp are inverse functions: exp(log(x)) = x, and their graphs mirror across the line y = x.',
    ],
    images: [
      {
        src: '/images/learn/graph-logarithmic-functions/graph-1.png',
        alt: 'The curves log(x), log10(x), and log(x)/log(2) together, all passing through (1, 0) with a vertical asymptote at x = 0',
        caption:
          'log(x), log10(x), and log(x)/log(2) plotted together. All three pass through (1, 0) and share the asymptote x = 0; larger bases climb more slowly.',
      },
      {
        src: '/images/learn/graph-logarithmic-functions/graph-2.png',
        alt: 'The natural logarithm log(x) graphed alone, rising steeply near x = 0 and flattening as x grows',
        caption:
          'log(x) on its own — the natural logarithm. Notice the steep rise just right of the y-axis, the point (1, 0), and the relentless flattening as x grows.',
      },
    ],
    faqs: [
      {
        q: 'Is log(x) the natural log or base 10 on this calculator?',
        a: 'The natural log (base e). The name ln(x) works as an alias for the same function. For base 10, type log10(x) explicitly — unlike some textbooks, our log never means base 10.',
      },
      {
        q: 'How do I graph log base 2 (or any other base)?',
        a: 'Use the change-of-base formula: log_b(x) = log(x)/log(b). For base 2, enter log(x)/log(2); it passes through (2, 1), (4, 2), and (8, 3), since each doubling of x adds exactly 1.',
      },
      {
        q: 'Why does the graph stop at the y-axis?',
        a: 'The logarithm is defined only for x > 0 — no power of the base can produce zero or a negative number. The y-axis is a vertical asymptote: the curve dives toward negative infinity as x approaches 0 from the right.',
      },
    ],
    related: [
      '/learn/solve-systems-of-equations/',
      '/learn/asymptotes-explained/',
      '/learn/graph-inverse-functions/',
      '/math-functions/natural-logarithm/',
      '/math-functions/exponential/',
      '/examples/logistic-growth/',
      '/graphing-calculator/',
    ],
  },
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
  }
];
