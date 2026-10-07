/**
 * Batch 5 of the /learn/ daily article program — hand-written educational prose.
 *
 * Every fact here is mathematically certain. No fabricated statistics,
 * studies, ratings, or popularity claims. Calculator workflows describe only
 * features verified against the product source.
 */

import type { LearnArticle } from '../../../data/seo/types.js';

export const BATCH_5: LearnArticle[] = [
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
];
