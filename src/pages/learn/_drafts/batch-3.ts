import type { LearnArticle } from '../../../data/seo/types.js';

export const BATCH_3: LearnArticle[] = [
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
];
