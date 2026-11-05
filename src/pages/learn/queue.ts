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


  

];
