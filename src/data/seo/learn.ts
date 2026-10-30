/**
 * Learn articles for the /learn/ hub — hand-written educational prose.
 *
 * Every fact here is mathematically certain. No fabricated statistics,
 * studies, ratings, or popularity claims.
 */

import type { LearnArticle } from './types.js';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: 'what-is-a-function',
    reviewedOn: '2026-09-29',
    title: 'What Is a Function? Domain, Range, and Notation',
    description:
      'Learn what a function really is: inputs, outputs, domain, range, and f(x) notation — with concrete examples you can graph yourself.',
    sections: [
      {
        heading: 'A function is a rule with a promise',
        body: [
          'A function is a rule that takes each input value and assigns it exactly one output value. That word "exactly" does all the work: a function can never hand the same input two different outputs. If you feed in x = 2, the function gives you back one answer, and if you feed in 2 again tomorrow, you get the same answer. Mathematicians call this requirement "well-defined," and it is what separates functions from looser kinds of relationships between quantities.',
          'Consider f(x) = x^2. The input 3 produces the output 9, and the input −3 also produces 9. That is fine — two different inputs may share an output. What would not be fine is if the rule assigned both 9 and 10 to the input 3. Then the rule would not be a function at all.',
        ],
      },
      {
        heading: 'The notation f(x) and what it means',
        body: [
          'The expression f(x) is read "f of x," and it names the output of the function f when the input is x. The letter f is just a name; you might as well use g, h, or costOf. Writing f(x) = 2*x + 1 says: the function f computes its output by doubling its input and adding one. Then f(4) = 9, f(−1) = −1, and so on.',
          'This notation becomes powerful when you compare functions. If g(x) = x^2, then f(g(2)) = f(4) = 9 — you fed the output of g into f. Chaining functions this way is called composition, and the notation makes it easy to track exactly which rule is applied to which value. It also lets you talk about the whole function at once ("f is increasing") rather than only about individual values.',
        ],
      },
      {
        heading: 'Domain: the set of allowed inputs',
        body: [
          'Every function has a domain: the set of input values it accepts. For f(x) = x^2, any real number is allowed, so the domain is all real numbers. But g(x) = sqrt(x) refuses negative inputs — there is no real number whose square is negative — so its domain is x ≥ 0.',
          'Sometimes the domain is restricted by the rule itself, and sometimes by the situation the function models. The function h(x) = 1/x excludes x = 0, because division by zero is undefined. And if a function models the price of n apples, its natural domain might be the counting numbers 1, 2, 3, …, even though the formula 2.5*n would happily accept fractional inputs. When you work with a function, always know which inputs it can actually take.',
        ],
      },
      {
        heading: 'Range: the set of produced outputs',
        body: [
          'The range is the set of output values the function actually produces as the input runs over the domain. For f(x) = x^2, squaring never gives a negative number, and every non-negative number appears as some square (the square of its square root). So the range is all numbers y ≥ 0.',
          'Domain and range answer different questions: the domain asks "what can I put in?" and the range asks "what can come out?" For f(x) = 2*x + 1 both are all real numbers, because doubling and shifting can reach any real value. For f(x) = sin(x) the domain is all real numbers but the range is only [−1, 1], since the sine wave oscillates between −1 and 1 forever. Noticing the range helps you read a graph: it is exactly the vertical extent of the curve.',
        ],
      },
      {
        heading: 'Reading all of this from a graph',
        body: [
          'A graph shows a function directly: each point (x, y) on the curve says f(x) = y. The domain is the shadow of the curve on the x-axis — the horizontal span of points that actually appear. The range is the shadow on the y-axis. If the curve breaks or stops, those breaks show up as gaps in the domain.',
          'There is a quick test, too: the vertical line test. If every vertical line you draw crosses the curve at most once, the curve represents a function — because each x has at most one y. A circle fails this test (a vertical line through its center meets it twice), which is why a full circle is not the graph of a single function. Try entering the expressions below in the graphing calculator, adjust the viewport, and read off each domain and range for yourself.',
        ],
      },
    ],
    tryExpressions: ['x^2', 'sqrt(x)', '1/x', 'sin(x)'],
    keyTakeaways: [
      'A function assigns exactly one output to each input — that single-output promise is the defining property.',
      'f(x) is "f of x": the output of f at input x. Composition f(g(x)) chains two rules.',
      'The domain is the set of allowed inputs; division by zero and square roots of negatives are the classic domain restrictions.',
      'The range is the set of outputs the function actually produces — the vertical extent of its graph.',
      'The vertical line test decides whether a curve is a function: any vertical line may cross it at most once.',
    ],
    faqs: [
      {
        q: 'Is a circle a function?',
        a: 'No — a full circle is not the graph of a function, because some vertical lines cross it twice (failing the vertical line test). However, the upper half of a circle is: y = sqrt(r^2 − x^2) assigns each x exactly one y, and so is the lower half y = −sqrt(r^2 − x^2).',
      },
      {
        q: 'What is the difference between the domain and the range?',
        a: 'The domain is the set of inputs a function accepts; the range is the set of outputs it actually produces. For sin(x) the domain is all real numbers while the range is [−1, 1].',
      },
      {
        q: 'Can two different inputs give the same output?',
        a: 'Yes. A function must give each input exactly one output, but different inputs may share an output — for example, f(x) = x^2 gives f(3) = f(−3) = 9.',
      },
    ],
    related: [
      '/learn/understanding-derivatives/',
      '/math-functions/sine/',
      '/math-functions/quadratic/',
      '/math-functions/square-root/',
      '/math-functions/reciprocal/',
      '/examples/logistic-growth/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-derivatives',
    reviewedOn: '2026-09-29',
    title: 'Derivatives: Understanding Rate of Change and Slope',
    description:
      'What a derivative measures, how it gives the slope of a curve, and how to read increasing, decreasing, and extreme points from it.',
    sections: [
      {
        heading: 'The derivative measures how fast things change',
        body: [
          'The derivative of a function is a new function that reports, at each point, how fast the original function is changing. If f(x) describes a quantity — position, price, population — then f′(x), the derivative at x, is the rate at which that quantity is changing when the input is x. A positive derivative means the quantity is growing; a negative one means it is shrinking; zero means it is momentarily flat.',
          'Concretely, f′(x) is the slope of the tangent line to the curve at x. Zoom in close enough on almost any smooth curve and it looks like a straight line — the tangent line — and its steepness is the derivative. This is why the derivative has a geometric meaning and a physical meaning at the same time: slope on the graph, rate of change in the world.',
        ],
      },
      {
        heading: 'Average vs. instantaneous rate of change',
        body: [
          'Over an interval, the average rate of change of f from x = a to x = b is (f(b) − f(a)) / (b − a) — rise over run of the secant line between the two points. That is exactly how you compute average speed: distance traveled divided by time elapsed. But it says nothing about what happened between a and b.',
          'The instantaneous rate of change is what you get when the interval shrinks to nothing: the limit of (f(a+h) − f(a)) / h as h approaches zero. That limit, when it exists, is f′(a). In practice the calculator computes derivatives numerically from this idea, and you can watch the secant line tilt into the tangent line as the interval shrinks. Instantaneous rate is what a speedometer shows; average rate is what the trip computer shows.',
        ],
      },
      {
        heading: 'Reading increasing and decreasing behavior',
        body: [
          'The sign of the derivative tells you the behavior of the function. Where f′(x) > 0, the function is increasing — the graph climbs left to right. Where f′(x) < 0, it is decreasing. Where f′(x) = 0, the tangent is horizontal, and the function is momentarily neither climbing nor falling.',
          'Take f(x) = x^2. Its derivative is f′(x) = 2*x, which is negative for x < 0 and positive for x > 0. Sure enough, the parabola descends toward the origin from the left and ascends away from it on the right. For f(x) = sin(x), the derivative is cos(x): the sine wave climbs where the cosine is positive and falls where it is negative, with flat peaks exactly where cos(x) = 0.',
        ],
      },
      {
        heading: 'Critical points and local extrema',
        body: [
          'Points where f′(x) = 0 or where the derivative does not exist are called critical points, and they are the candidates for local maxima and minima — the peaks and valleys of the curve. At x = 0, f(x) = x^2 has derivative 2*x = 0, and indeed (0, 0) is the bottom of the parabola: the function falls, flattens, then rises.',
          'But a zero derivative does not guarantee a peak or valley. For f(x) = x^3, the derivative is 3*x^2, which is zero at x = 0 — yet the function passes straight through, flattening for an instant at an inflection point and then continuing to climb. To classify a critical point, check whether the derivative changes sign around it: negative-to-positive is a local minimum, positive-to-negative is a local maximum, no change means neither.',
        ],
      },
      {
        heading: 'The second derivative and concavity',
        body: [
          'Differentiating twice gives f′′(x), the second derivative — the rate of change of the rate of change. Geometrically it describes concavity: where f′′(x) > 0 the curve bends upward like a cup (concave up), and where f′′(x) < 0 it bends downward like a frown (concave down).',
          "For f(x) = x^3, the second derivative is f′′(x) = 6*x: negative left of the origin, positive right of it. The cubic bends downward on the left, upward on the right, and switches concavity at x = 0 — that switch is an inflection point. Concavity completes the picture of a curve's shape once the first derivative has told you where it rises and falls.",
        ],
      },
    ],
    tryExpressions: ['x^3 - 3*x', 'sin(x)', 'exp(x)', 'x^2 * sin(x)'],
    keyTakeaways: [
      'The derivative f′(x) is the instantaneous rate of change of f at x — the slope of the tangent line.',
      'Positive derivative means increasing, negative means decreasing, zero means momentarily flat.',
      'Critical points (where f′ = 0 or is undefined) are the candidates for local maxima and minima; the sign change of f′ classifies them.',
      'A zero derivative does not always mark an extreme — x^3 has f′(0) = 0 but keeps climbing through an inflection point.',
      'The second derivative f′′ describes concavity: cup-up where positive, frown-down where negative.',
    ],
    faqs: [
      {
        q: 'What is the difference between average and instantaneous rate of change?',
        a: 'The average rate over [a, b] is (f(b) − f(a)) / (b − a), the slope of the secant line between the endpoints. The instantaneous rate at a is the limit of that quotient as the interval shrinks to zero — the slope of the tangent line, i.e., f′(a).',
      },
      {
        q: 'If the derivative is zero at a point, is it always a maximum or minimum?',
        a: 'No. A zero derivative only makes the point a critical point. For f(x) = x^3, f′(0) = 0 but the function continues increasing through x = 0 (an inflection point). Check whether f′ changes sign on either side to classify the point.',
      },
      {
        q: 'What does the second derivative tell you?',
        a: 'It describes concavity: where f′′(x) > 0 the curve bends upward (concave up), and where f′′(x) < 0 it bends downward (concave down). Points where concavity switches are inflection points.',
      },
    ],
    related: [
      '/learn/what-is-a-function/',
      '/learn/understanding-integrals/',
      '/math-functions/quadratic/',
      '/math-functions/cubic/',
      '/math-functions/sine/',
      '/math-functions/exponential/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-integrals',
    reviewedOn: '2026-09-29',
    title: 'Integrals and the Area Under a Curve',
    description:
      'Learn what definite integrals mean as signed area under a curve, how the Fundamental Theorem links integrals to derivatives, and when to use them.',
    sections: [
      {
        heading: 'An integral measures accumulated quantity',
        body: [
          'The definite integral ∫ₐᵇ f(x) dx measures the total accumulation of f between a and b. If f(x) is a rate — speed, rainfall per hour, dollars per item — then the integral of that rate over an interval is the total amount: total distance, total rainfall, total cost. Integration adds up infinitely many infinitesimal pieces, dx, each weighted by f(x).',
          'The most direct picture is geometric: when f(x) is positive on [a, b], the integral equals the area enclosed by the curve, the x-axis, and the vertical lines x = a and x = b. Every application of integrals is some version of this idea — area first, accumulation in general.',
        ],
      },
      {
        heading: 'Signed area: why area can be negative',
        body: [
          'When the curve dips below the x-axis, the integral counts that region as negative area. The integral is signed area: regions above the axis add, regions below subtract. So ∫₀^{2π} sin(x) dx = 0, because the positive hump from 0 to π and the negative trough from π to 2π have exactly equal areas and cancel.',
          'This cancellation is a feature, not a bug: it reflects genuine physics. If velocity is positive on the first half of a trip and negative on the second, the integral gives displacement (net change in position), which can be zero even though the odometer ran up distance. If you want total area regardless of sign, integrate |f(x)| or integrate the positive and negative parts separately.',
        ],
      },
      {
        heading: 'The Fundamental Theorem of Calculus',
        body: [
          'The Fundamental Theorem of Calculus ties integrals and derivatives together as inverses. If F is an antiderivative of f — meaning F′(x) = f(x) — then ∫ₐᵇ f(x) dx = F(b) − F(a). Instead of approximating an area with thousands of rectangles, you evaluate a single function at two points and subtract.',
          'This is why integrals are computed symbolically where possible: the antiderivative of 2*x is x^2, so ∫₀³ 2*x dx = 3² − 0² = 9, and you can verify this equals the area of a triangle with base 3 and height 6. The theorem turns the hard problem (adding up infinitely many slivers) into the easy problem (evaluating a function twice).',
        ],
      },
      {
        heading: 'Area between two curves',
        body: [
          'Integrals also measure the area trapped between two curves. If g(x) ≤ h(x) on [a, b], the region between them has area ∫ₐᵇ (h(x) − g(x)) dx. You subtract the lower curve from the upper one, turning the gap into an ordinary area-under-a-curve problem.',
          'For example, between x = 0 and x = 1 the line y = x lies above the curve y = x². The area between them is ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6. A common mistake is forgetting that the curves can cross: where they swap roles, split the integral at the crossing points and integrate |h(x) − g(x)|, or you will let signed area cancel regions that should add.',
        ],
      },
      {
        heading: 'Trying integrals in the calculator',
        body: [
          "Pick any expression below and use the calculator's integral tools to shade the area under the curve between two bounds. Watch how the shaded region flips sign when the curve crosses the axis — the tool reports signed area, so a symmetric wave like sin(x) over a full period nets to zero.",
          'Then try the antiderivative relationship: plot f(x) and its integral-derived accumulation together. Where f is positive, the accumulated curve rises; where f is negative, it falls; where f is zero, it levels off. That connection — the derivative of the accumulation is the original function — is the Fundamental Theorem in visible form.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'abs(x - 2)', 'exp(-x^2)'],
    keyTakeaways: [
      'The definite integral ∫ₐᵇ f(x) dx measures accumulated quantity — geometrically, the area under the curve when f is positive.',
      'Integrals compute signed area: regions below the x-axis count as negative and can cancel regions above.',
      'The Fundamental Theorem of Calculus: ∫ₐᵇ f(x) dx = F(b) − F(a), where F′ = f — differentiation and integration undo each other.',
      'The area between two curves is ∫ₐᵇ (upper − lower) dx; split the integral wherever the curves cross.',
      'Displacement vs. distance: the integral of velocity gives net change; integrating the absolute value gives total distance traveled.',
    ],
    faqs: [
      {
        q: 'Can a definite integral be negative?',
        a: 'Yes. The integral measures signed area, so portions of the curve below the x-axis contribute negative area. For example, ∫₀^{2π} sin(x) dx = 0 because the positive and negative humps exactly cancel.',
      },
      {
        q: 'What is the Fundamental Theorem of Calculus?',
        a: 'It states that if F′(x) = f(x), then ∫ₐᵇ f(x) dx = F(b) − F(a). In words: to integrate f, find a function whose derivative is f, evaluate it at the endpoints, and subtract.',
      },
      {
        q: 'How do I find the area between two curves?',
        a: 'Integrate the difference upper − lower over the interval: ∫ₐᵇ (h(x) − g(x)) dx where h is the upper curve. If the curves cross inside [a, b], split the integral at each crossing so nothing cancels incorrectly.',
      },
    ],
    related: [
      '/learn/understanding-derivatives/',
      '/learn/what-is-a-function/',
      '/math-functions/sine/',
      '/math-functions/quadratic/',
      '/math-functions/absolute-value/',
      '/examples/damped-oscillation/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'asymptotes-explained',
    reviewedOn: '2026-09-29',
    title: 'Asymptotes: Vertical, Horizontal, and Oblique',
    description:
      'Understand asymptotes — lines a graph approaches but never touches. Covers vertical, horizontal, and oblique asymptotes with clear examples.',
    sections: [
      {
        heading: 'What an asymptote actually is',
        body: [
          'An asymptote is a line that a curve approaches arbitrarily closely as the input goes somewhere extreme — out to infinity, or into a point where the function blows up — without ever touching the line (in the limiting sense). The key idea is approach, not contact: the curve can get as close to the line as you like, provided you go far enough.',
          "Asymptotes come in three flavors. Vertical asymptotes are vertical lines x = a where the function grows without bound near a. Horizontal asymptotes are horizontal lines y = L that the function settles toward as x → ±∞. Oblique (slant) asymptotes are diagonal lines the function tracks when it grows roughly linearly at infinity. Each type is diagnosed differently, and each tells you something about the function's long-run or near-singular behavior.",
        ],
      },
      {
        heading: 'Vertical asymptotes: where the function explodes',
        body: [
          "A vertical asymptote x = a occurs where the function's values shoot toward +∞ or −∞ as x approaches a. The classic example is f(x) = 1/x at x = 0: plug in 0.1 and get 10, plug in 0.001 and get 1000, and there is no finite value at exactly 0 because division by zero is undefined.",
          "To find them in a rational function, factor the denominator: each factor (x − a) that does not cancel with the numerator typically gives a vertical asymptote at x = a. But cancellation matters — in g(x) = (x^2 − 1)/(x − 1), the factor (x − 1) cancels, so x = 1 is a hole (a removable discontinuity), not an asymptote. When you graph f(x) = 1/x and zoom toward x = 0, the two branches fly apart vertically, and the calculator's adaptive sampling must avoid drawing a misleading streak across the gap.",
        ],
      },
      {
        heading: 'Horizontal asymptotes: the end behavior',
        body: [
          'A horizontal asymptote describes what the function tends toward as x grows large in either direction. If f(x) approaches a finite value L as x → ∞ (or x → −∞), then y = L is a horizontal asymptote. For f(x) = 1/x, values shrink toward 0 as x grows — so y = 0 is the horizontal asymptote.',
          "For a rational function p(x)/q(x), compare degrees: if the denominator's degree is higher, the horizontal asymptote is y = 0; if the degrees are equal, it is y = (leading coefficient of p) / (leading coefficient of q); if the numerator's degree is higher, there is no horizontal asymptote — the function grows without bound, and possibly follows an oblique one instead. Note that a curve may cross its horizontal asymptote for moderate x; the asymptote only constrains the far ends.",
        ],
      },
      {
        heading: 'Oblique asymptotes: tracking a diagonal line',
        body: [
          'When the numerator of a rational function is exactly one degree higher than the denominator, the function grows roughly like a line at infinity, and that line is the oblique (slant) asymptote. Take f(x) = (x^2 + 1)/x: polynomial division gives x + 1/x, and as x → ±∞, the 1/x term vanishes, leaving y = x as the asymptote the curve hugs.',
          'You can verify this visually by plotting the function and the line y = x together and zooming far out: the gap between them shrinks to nothing. Oblique asymptotes are rarer in practice than the other two types, but they appear whenever a quotient grows linearly — for instance in certain economics models with per-unit cost plus a fixed overhead divided by quantity.',
        ],
      },
      {
        heading: 'Why asymptotes matter when graphing',
        body: [
          'Asymptotes are the skeleton of a graph: they tell you where the curve must go near its trouble spots and at the extremes, before you compute a single intermediate point. Sketching the asymptotes first — vertical lines at the blow-up points, the horizontal or oblique guide at infinity — leaves you filling in well-behaved segments between them.',
          'They also warn you about domain restrictions (vertical asymptotes mark excluded inputs) and about misleading renderings. A naive plotter can draw a near-vertical line across a vertical asymptote, connecting the two branches as if the function passed through the gap. Enter 1/x in the calculator, zoom in on x = 0, and confirm you see two separate branches with a genuine gap — that gap is the asymptote made visible.',
        ],
      },
    ],
    tryExpressions: ['1/x', '(x^2 + 1)/x', '(2*x^2 + 3)/(x^2 - 1)', 'tan(x)'],
    keyTakeaways: [
      'An asymptote is a line a curve approaches arbitrarily closely — vertical (x = a), horizontal (y = L), or oblique (diagonal).',
      'Vertical asymptotes occur where the function blows up to ±∞; in rational functions, look for uncanceled denominator zeros.',
      'Horizontal asymptotes describe end behavior: compare numerator and denominator degrees for rational functions.',
      'When the numerator is one degree higher than the denominator, the graph tracks an oblique asymptote like y = x.',
      'A curve can cross a horizontal asymptote at moderate x values — the asymptote only governs the far ends.',
    ],
    faqs: [
      {
        q: 'What is the difference between a vertical asymptote and a hole?',
        a: 'A vertical asymptote x = a is where the function grows without bound near a (e.g., 1/x at x = 0). A hole (removable discontinuity) is where a canceled factor made the function undefined at a single point but the nearby values stay finite — e.g., (x^2 − 1)/(x − 1) simplifies to x + 1 with a hole at x = 1.',
      },
      {
        q: 'Can a graph cross its asymptote?',
        a: 'It can cross a horizontal asymptote for finite x — for example, f(x) = sin(x)/x crosses y = 0 repeatedly, yet y = 0 is still its horizontal asymptote since f(x) → 0 as x → ±∞. Vertical asymptotes, in the sense of crossing, are not crossed at the blow-up point itself since the function is undefined there.',
      },
      {
        q: 'How do I find the horizontal asymptote of a rational function?',
        a: "Compare degrees: if the denominator's degree is larger, the asymptote is y = 0; if degrees are equal, it is y = (leading coefficient of numerator)/(leading coefficient of denominator); if the numerator's degree is exactly one larger, there is an oblique asymptote instead (found by polynomial division).",
      },
    ],
    related: [
      '/learn/what-is-a-function/',
      '/math-functions/reciprocal/',
      '/math-functions/tangent/',
      '/math-functions/natural-logarithm/',
      '/examples/logistic-growth/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'graphing-inequalities',
    reviewedOn: '2026-09-29',
    title: 'Graphing Inequalities in Two Variables',
    description:
      'How to graph inequalities like y > x^2: boundary curves, dashed vs. solid lines, shading, and testing points — explained step by step.',
    sections: [
      {
        heading: 'From equations to inequalities',
        body: [
          'The equation y = x^2 draws a single curve: the parabola. The inequality y > x^2 asks for something bigger — every point (x, y) whose y-coordinate lies above the parabola. Instead of one curve, the solution is an entire region: the infinite area swept out above the curve. Graphing an inequality means drawing the boundary and shading the side that satisfies it.',
          'This shift from curve to region is the whole conceptual step. An equation in two variables typically describes a one-dimensional curve; an inequality describes a two-dimensional region whose edge is that curve. Every point you test either belongs to the region or does not, and the boundary curve is where equality holds.',
        ],
      },
      {
        heading: 'Boundary curves: dashed vs. solid',
        body: [
          'The first step is to graph the boundary — the equation you get by replacing the inequality sign with =. For y ≥ x^2 the boundary is the parabola y = x^2, and it is drawn solid because its points satisfy the inequality: the boundary is included in the solution.',
          'For strict inequalities (< or >), the boundary is drawn dashed, because points on the curve itself do not satisfy the inequality. y > x^2 and y ≥ x^2 differ only at the parabola itself, yet that one-point-thick difference matters in optimization problems, where an optimum lying exactly on a strict boundary is unattainable. The calculator follows this convention: dashed for strict, solid for non-strict.',
        ],
      },
      {
        heading: 'Shading and the test-point method',
        body: [
          "Once the boundary is drawn, it divides the plane into regions (usually two). Pick any point not on the boundary — a test point — plug it into the inequality, and see whether the statement is true. If it is, shade that point's entire region; if not, shade the other side.",
          'For y > x^2, the origin (0, 0) is a convenient test point — wait, it lies on the boundary. Choose (0, 1) instead: 1 > 0 is true, so shade the region above the parabola containing (0, 1). A safe habit: always verify your test point is not on the boundary before trusting the result, and double-check with a second point in the shaded region if the inequality is complicated.',
        ],
      },
      {
        heading: 'Systems of inequalities and feasible regions',
        body: [
          'Real problems usually involve several inequalities at once — a system. The solution is the set of points satisfying all of them simultaneously: the intersection of the individual shaded regions. Each new inequality can only shrink the solution, never grow it, because points must now pass one more test.',
          'This is the geometric heart of linear programming: constraints like x ≥ 0, y ≥ 0, and 2*x + 3*y ≤ 12 carve out a polygonal feasible region, and the optimum of a linear objective always sits at one of its corners. Shade each inequality in turn, keep only the overlap, and the feasible region that remains is where all constraints hold at once. Try y ≤ x^2 and y ≥ −x together to see a lens-shaped intersection bounded by two curves.',
        ],
      },
      {
        heading: 'Reading a shaded graph',
        body: [
          'A finished inequality graph communicates three things: the boundary (with its dashed/solid meaning), the shaded solution region, and implicitly everything outside the shading that fails. When you read such a graph, first identify the boundary curve and its strictness, then confirm the shading matches a quick mental test point.',
          'Common misreads: forgetting that the unshaded side is excluded (not "unknown"), mistaking a dashed boundary for an included one, and for systems, shading each inequality but never taking the intersection. Enter the expressions below, toggle strict vs. non-strict forms, and watch how the shading and boundary style change while the region\'s meaning shifts by exactly the boundary curve.',
        ],
      },
    ],
    tryExpressions: ['x^2', '2 - x', 'abs(x)', 'sin(x)'],
    keyTakeaways: [
      'An inequality in two variables describes a region of the plane; its edge is the boundary curve where equality holds.',
      'Draw the boundary dashed for strict inequalities (<, >) and solid when the boundary is included (≤, ≥).',
      'Use a test point off the boundary to decide which side to shade; re-check with a second point for complex cases.',
      'The solution of a system of inequalities is the intersection of the individual regions — each constraint can only shrink it.',
      "In linear programming, the feasible region's corner points are where the optimum of a linear objective must occur.",
    ],
    faqs: [
      {
        q: 'When do I use a dashed line instead of a solid line?',
        a: 'Use a dashed boundary for strict inequalities (< or >), because points on the boundary do not satisfy the inequality. Use a solid boundary for ≤ or ≥, where the boundary points are included in the solution.',
      },
      {
        q: 'How do I know which side of the boundary to shade?',
        a: 'Pick a test point that is not on the boundary, substitute it into the inequality, and shade the region containing the point if the statement is true — otherwise shade the other region.',
      },
      {
        q: 'What is the feasible region in a system of inequalities?',
        a: 'It is the intersection of all the individual solution regions: the set of points satisfying every inequality at once. In linear programming, the optimum of a linear objective over a polygonal feasible region always occurs at a corner (vertex) of that region.',
      },
    ],
    related: [
      '/learn/what-is-a-function/',
      '/math-functions/quadratic/',
      '/math-functions/absolute-value/',
      '/math-functions/square-root/',
      '/examples/projectile-motion/',
      '/graphing-calculator/',
    ],
  },
  {
    slug: 'parametric-vs-cartesian',
    reviewedOn: '2026-09-29',
    title: 'Parametric vs Cartesian Equations',
    description:
      'Cartesian equations y = f(x) vs parametric equations x(t), y(t): what each can express, when to use which, and how to convert between them.',
    sections: [
      {
        heading: 'Cartesian form: y as a function of x',
        body: [
          'The Cartesian form y = f(x) is the familiar one: for each x, the equation hands you the y. It is the natural language of functions — every vertical line meets the graph at most once, so the curve never doubles back on itself vertically. Input-output thinking, domain and range, and the vertical line test all belong to this form.',
          'But the form has a hard limit: it cannot describe curves that loop, self-intersect, or travel vertically. A circle needs two Cartesian equations (upper and lower halves); a curve traced twice, or traced backward, is inexpressible. Whenever position, shape, or motion is richer than "one y per x," Cartesian form runs out of room.',
        ],
      },
      {
        heading: 'Parametric form: both coordinates follow a parameter',
        body: [
          'Parametric equations introduce a third variable, the parameter t, and define x and y separately: x = x(t), y = y(t). As t runs through its range, the point (x(t), y(t)) traces the curve. The unit circle becomes x = cos(t), y = sin(t) for t in [0, 2π) — one clean pair of equations, no splitting into halves, no ± ambiguity.',
          'The parameter often carries meaning: it can be time. Then x = t, y = t^2 traces the parabola y = x^2 from left to right as t increases, while x = −t, y = t^2 traces the same parabola from right to left. Same shape, opposite journeys — a distinction Cartesian form cannot even state. Parametric form separates what the curve looks like from how it is traveled.',
        ],
      },
      {
        heading: 'Converting between the two forms',
        body: [
          'Going from parametric to Cartesian means eliminating the parameter. If x = t and y = t^2, substituting gives y = x^2 directly. For x = cos(t), y = sin(t), squaring and adding uses cos²t + sin²t = 1 to recover x² + y² = 1. Elimination is usually algebra plus a well-chosen identity.',
          'The reverse direction — parametrizing a Cartesian curve — always has at least one trivial answer: set x = t, y = f(t). The interesting parametrizations are the non-trivial ones, like the circle above or x = t^2, y = t^4 − 3*t^2 for a curve that revisits points. Note that conversion can lose information: eliminating t from x = t, y = t^2 discards the direction of travel, which only the parametric form recorded.',
        ],
      },
      {
        heading: 'When each form is the right tool',
        body: [
          'Use Cartesian form when the relationship is genuinely functional — one output per input — and when you want calculus tools (derivatives, integrals, root-finding) in their simplest setting. Most formulas in science and economics arrive this way.',
          'Use parametric form for closed curves, self-intersecting curves, and anything involving motion or tracing — projectile paths with time as the parameter, Lissajous figures, gear-like epicycles. Also reach for it when a Cartesian equation is awkward: the curve x = y^2 is a perfectly good sideways parabola, but it is not a function of x, while x = t^2, y = t parametrizes it effortlessly. If the curve loops or the journey matters, go parametric.',
        ],
      },
      {
        heading: 'Seeing the difference in the calculator',
        body: [
          'Plot y = sin(x) in Cartesian form, then plot x = t, y = sin(t) parametrically over the same window: identical curves, because the second is just a reparametrization of the first. Now try x = sin(t), y = sin(2*t) — a Lissajous figure — and ask what single Cartesian equation y = f(x) could produce it. None can: the curve crosses itself and assigns multiple y values to one x.',
          "Adjust the t-range and watch the tracing: with t from 0 to π you get half the figure, with 0 to 2π the whole thing. That control over how much of the curve is drawn, and in what order, is the parametric form's signature advantage — and the reason motion, from projectiles to planetary orbits, is modeled parametrically.",
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'cos(x)', 'sqrt(4 - x^2)'],
    keyTakeaways: [
      'Cartesian form y = f(x) gives one y per x — it cannot describe loops, vertical segments, or self-intersections.',
      'Parametric form x = x(t), y = y(t) traces a curve as t varies; t often represents time, encoding direction of travel.',
      'The unit circle needs two Cartesian equations but one parametric pair: x = cos(t), y = sin(t).',
      'Eliminating the parameter converts parametric to Cartesian, but the direction-of-travel information is lost.',
      'Use parametric form when the curve loops, self-intersects, or when the journey along it matters; use Cartesian for functional relationships.',
    ],
    faqs: [
      {
        q: 'Can every parametric curve be written as y = f(x)?',
        a: 'No. Only curves that pass the vertical line test can. A circle, a Lissajous figure, or any curve assigning two y values to one x has no single Cartesian equation y = f(x) — though pieces of it can be written that way separately.',
      },
      {
        q: 'What does the parameter t usually represent?',
        a: 'Often time: x = x(t), y = y(t) then describes a position evolving over time. But t is just a tracing variable — any interval works, and the same geometric curve can be traced by many different parametrizations, forward or backward, fast or slow.',
      },
      {
        q: 'How do I convert parametric equations to Cartesian form?',
        a: 'Eliminate the parameter: solve one equation for t (or use an identity) and substitute into the other. For x = cos(t), y = sin(t), squaring and adding gives x² + y² = 1 via cos²t + sin²t = 1.',
      },
    ],
    related: [
      '/learn/what-is-a-function/',
      '/learn/graphing-inequalities/',
      '/math-functions/sine/',
      '/math-functions/cosine/',
      '/math-functions/quadratic/',
      '/math-functions/square-root/',
      '/examples/lissajous-curve/',
      '/examples/projectile-motion/',
      '/graphing-calculator/',
    ],
  },
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
];
