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
  // COUNTING NOTE (2026-10-08): all 30 commissioned articles are present in this
  // file (2 already published + 28 below). The final 5 entries (2026-11-01 →
  // 2026-11-05) were written in a different pass using double-quoted strings and
  // 2-space indent, so a naive `grep -c "slug: '"` undercounts them. When counting
  // entries, match slug headers regardless of quote style or indent — do NOT
  // report the queue as short.


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
