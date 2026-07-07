# MAINTENANCE.md — how to update this site safely

You are probably a Claude session asked to add or change content on the Toronto East
production platform. Follow this file exactly. **You do not need design judgment for
content work — every visual decision is already made.** If a task genuinely isn't
covered here, stop and tell Matt what's missing rather than improvising.

> **Status:** Phase 1 shipped 2026-07-07 — this describes the real, built site, not a
> plan. Video Engineering is fully ported (9 real pages). Audio, Lighting, and Cameras
> are scaffolds: one real hub page each, waiting on source material (see each hub's
> scaffold-note for what to bring).

## The three rules

1. **Content edits touch HTML files only.** Never edit `assets/production.css` or
   `assets/app.js` to make a content change. If a content task seems to require a CSS
   change, the task is mis-shaped — stop and say so.
2. **New blocks come from `templates/`, verbatim.** Copy the whole template, then edit
   only the text inside it. Never invent classes, never restyle inline.
3. **Never edit** `design/mockup-v2.html` (frozen reference) or `v1/index.html`
   (retired site).

## Where things live

| To change… | Edit… |
|---|---|
| Home screen / discipline cards | `index.html` |
| Video content | `video/index.html` |
| Audio content | `audio/index.html` |
| Lighting content | `lighting/index.html` |
| Cameras content | `cameras/index.html` |
| Tab bar / rail entries | the `NAV` array near the top of `assets/app.js` (the one allowed JS edit) |

## Linking between pages

Each page declares `data-depth` on its `<html>` tag: `0` for `index.html` at the repo
root, `1` for every discipline file (`video/`, `audio/`, `lighting/`, `cameras/`).
That depth only matters for the **rail/tab bar**, which `assets/app.js` builds — you
never touch it by hand. For links **you** write in content:
- **Same file** (e.g. one video page linking to another video page): `href="#video-flow"`.
- **Different discipline's file**: `href="../video/index.html#video-flow"` — always
  `../`, because every discipline file lives exactly one folder below root.
- **From the root `index.html` to a discipline**: `href="video/index.html#video"` — no
  `../`, since root has no folder to climb out of.

## Recipes

### Update a fact (a crosspoint, a step, a frequency)
1. `grep -rn "the old value" *.html */index.html` to find every occurrence — facts often
   appear in a procedure *and* a diagnostics list.
2. Edit the text in place. Change nothing else.

### Add a symptom to a Diagnose page
1. Open the discipline's `index.html`, find the diagnose view
   (`<section class="view" id="<disc>-diagnostics" …>`).
2. Copy `templates/symptom.html` in **above** the closing note/page-nav, in likelihood ×
   speed-to-check order relative to its neighbours.
3. Fill in: summary text, lane tag (`Lane A` / `Lane B` — video only; other disciplines
   use their own agreed tags or omit), and the ordered checklist. Steps lead with the
   action in bold.

### Add a step to a procedure
Copy `templates/startup-step.html` into the `.steps` container at the right position,
then renumber every `.idx` in the container so they stay sequential.

### Add a whole new subpage to a discipline
1. Copy `templates/subpage-view.html` to the bottom of that discipline's `index.html`
   (before the closing `</main>`). Set a unique `id` — pattern: `<disc>-<slug>`,
   e.g. `audio-wireless`. Set `data-crumb="Discipline / Page Title"`.
2. Fill the body using the procedure / symptom / table templates.
3. Add a card on the hub view: copy `templates/page-card.html` into the hub's
   `.card-grid` (an `<a>`; if replacing a pending card, replace the whole
   `<div class="page-card">` with the `<a>` version).
4. Add one entry to the `NAV` array in `assets/app.js` (copy a neighbouring line).
5. Wire the prev/next links in the new view's `.page-nav` and its neighbours'.

### Flip a discipline from Scaffold to Live
When its hub has no pending cards left: in `index.html` (home), change that discipline's
`<span class="chip soon">Scaffold</span>` to `<span class="chip live">Live</span>` and
update the page-count chip; remove the `.scaffold-note` from its hub; remove `pending`
classes from its rail links in `assets/app.js`'s NAV array.

## Writing rules (goal 2 of the site)

- **Write for pros.** This site documents this room, not the craft. Never explain what
  an M/E, a crosspoint, DMX, or a gain stage is — the reader already knows. If a draft
  starts teaching fundamentals, cut it. Reference, not training.
- Lead with the action: "Press PROFILE, then the right arrow" — never "In order to…".
- No qualifying paragraphs. Context goes in a `.note` block or gets cut.
- Room vocabulary, exactly as the team calls it: "Resolume" means ME4, "Uplink" is the
  NC broadcast join on Resi, River vs Elevation macros. See `CLAUDE.md` § Terminology.
- Hardware buttons use `<span class="btnkey">NAME</span>`; crosspoints and IN/OUT
  numbers use `class="mono"`.
- Sentence case body, title case headings, lowercase only for the wordmark.

## Verify before saying "done" (all of it, every time)

```
python3 -m http.server 8000   # from the repo root
```
1. Open `http://localhost:8000` — home renders, all four discipline cards navigate.
2. Open the page you changed — desktop width **and** a ~390px narrow window (tab bar
   appears, nothing scrolls sideways).
3. Click every link you added or touched, including prev/next.
4. `grep -rn "http" --include="*.html" . | grep -v "localhost\|github.io\|claude.ai"` —
   no external resources may have crept in (offline requirement).
5. If anything fails and the fix isn't obvious from this file: revert, report, stop.

Then: commit + push to `main` **only when Matt asks** (that's what publishes it).
Commit trailer: `Co-Authored-By: Claude <noreply@anthropic.com>`.
