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
];
