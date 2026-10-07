import type { LearnArticle } from '../../../data/seo/types.js';

export const BATCH_4: LearnArticle[] = [
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
];
