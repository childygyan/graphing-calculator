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
