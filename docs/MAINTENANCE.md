# MAINTENANCE.md — how to update this site safely

You are probably a Claude session asked to add or change content on the Elevation Canada
production platform. Follow this file exactly. **You do not need design judgment for
content work — every visual decision is already made.** If a task genuinely isn't
covered here, stop and tell Matt what's missing rather than improvising.

> **Status:** Phases 1, 3, and 4 have shipped — this describes the real, built site, not
> a plan. The site is **campus-first**: every room lives at
> `<campus>/<discipline>/index.html`. Campus codes are permanent: `tea` = Toronto East,
> `tor` = Toronto.
>
> - **`tea/video/`** — fully ported, 10 real pages. The worked example.
> - **`tea/audio/`, `tea/lighting/`** — scaffolds awaiting source material.
> - **Toronto East has no camera seat.** That is a decision, not a gap. Do not create one.
> - **`tor/video/`, `tor/audio/`, `tor/lighting/`, `tor/cameras/`** — scaffolds, nothing
>   captured yet.
> - **`playbook/`** — the campus-agnostic method pages. The only shared content section.
> - `video/`, `audio/`, `lighting/`, `cameras/` at the root are **redirect stubs** left
>   behind for old bookmarks. Never put content in them.

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
| Launcher / campus groups / discipline cards | `index.html` |
| A Toronto East room | `tea/<discipline>/index.html` |
| A Toronto room | `tor/<discipline>/index.html` |
| The documentation method (shapes, worksheets, rules, new-campus kit) | `playbook/index.html` |
| Tab bar / rail entries | the `NAV` array near the top of `assets/app.js` (the one allowed JS edit) |
| Adding a whole new campus | follow `playbook/index.html#playbook-newcampus` — it is the authoritative procedure |

## Linking between pages

Each page declares its position once, on the `<html>` tag:

| Page | Tag |
|---|---|
| `index.html` (launcher) | `data-depth="0" data-disc="home"` |
| `playbook/index.html` | `data-depth="1" data-disc="playbook"` |
| any room | `data-depth="2" data-campus="tea" data-disc="video"` |

That wiring only matters for the **rail/tab bar**, which `assets/app.js` builds — you
never touch it by hand. For links **you** write in content:

- **Same file** (one video page → another video page): `href="#video-flow"`.
- **Another discipline at the same campus**: `href="../video/index.html#video-flow"` —
  one `../`, because the rooms are sibling folders inside the campus.
- **A room → the shared playbook**: `href="../../playbook/index.html#playbook-shapes"`.
- **From the root `index.html`**: `href="tea/video/index.html#video"` — no `../`.
- **Never link from one campus into another.** Rooms document rooms; if two campuses
  share a fact, it belongs in `playbook/` and both link there. See the note at the end of
  the blank-campus kit on why duplication is the default.

## Recipes

### Update a fact (a crosspoint, a step, a frequency)
1. `grep -rn "the old value" --include="*.html" .` to find every occurrence — facts often
   appear in a procedure *and* a diagnostics list.
2. **Check which campus each hit is in.** A fact about Toronto East is not automatically
   true at Toronto. Only change the room you were asked about.
3. Edit the text in place. Change nothing else.

### Add a symptom to a Diagnose page
1. Open that room's `index.html` (`<campus>/<discipline>/index.html`), find the diagnose
   view (`<section class="view" id="<disc>-diagnostics" …>`).
2. Copy `templates/symptom.html` in **above** the closing note/page-nav, in likelihood ×
   speed-to-check order relative to its neighbours.
3. Fill in: summary text, lane tag (`Lane A` / `Lane B` — video only; other disciplines
   use their own agreed tags or omit), and the ordered checklist. Steps lead with the
   action in bold.

### Add a step to a procedure
Copy `templates/startup-step.html` into the `.steps` container at the right position,
then renumber every `.idx` in the container so they stay sequential.

### Add a whole new subpage to a room
1. Copy `templates/subpage-view.html` to the bottom of that room's `index.html`
   (before the closing `</main>`). Set a unique `id` — pattern: `<disc>-<slug>`,
   e.g. `audio-wireless`. Set `data-crumb="Discipline / Page Title"`.
2. Fill the body using the procedure / symptom / table templates.
3. Add a card on the hub view: copy `templates/page-card.html` into the hub's
   `.card-grid` (an `<a>`; if replacing a pending card, replace the whole
   `<div class="page-card">` with the `<a>` version).
4. Add one entry to the `NAV` array in `assets/app.js` (copy a neighbouring line). It
   needs `campus:` as well as `disc:`, and `file:` is the full path from the repo root.
5. Wire the prev/next links in the new view's `.page-nav` and its neighbours'.

### Flip a room from Scaffold to Live
When its hub has no pending cards left: in `index.html` (launcher), find that campus's
`.campus-group` and change the room's `<span class="chip soon">Scaffold</span>` to
`<span class="chip live">Live</span>`, and update the page-count chip; remove the
`.scaffold-note` from its hub; remove `pending` from its NAV rows in `assets/app.js`.

### Add a whole new campus
Don't improvise it — follow `playbook/index.html#playbook-newcampus`, which is the
authoritative seven-step procedure and is kept current with the shell.

## Search (and what it means for content work)

The site has fuzzy search (the magnifier next to the theme switch; `/` or `Cmd+K`).
It's part of the shell in `assets/app.js` and **indexes the real pages at runtime** —
the current page from its own DOM, every other page by fetching it. There is **no index
file to regenerate**: ship a content edit and it's searchable.

Two things content authors should know:

- **Symptom summaries are the search surface.** Every `details.symptom` is indexed as
  its own result and ranked above whole pages, and a hit opens that exact accordion.
  Phrase the `<summary>` the way an operator would say the problem out loud — that was
  already the writing rule; search is now the reason it pays.
- **Results are campus-scoped** like the rail: standing in a room you get that campus
  plus the playbook, never another campus's wiring. From the launcher, everything,
  labelled by campus. Nothing to do per page — scoping comes from the NAV entry.

## Writing rules (goal 2 of the site)

These are the short form. The full version, with worked examples, is a real page on the
site: `playbook/index.html#playbook-writing`. If the two ever disagree, the playbook wins
and this list should be corrected in the same commit.

- **Write for pros.** This site documents this room, not the craft. Never explain what
  an M/E, a crosspoint, DMX, or a gain stage is — the reader already knows. If a draft
  starts teaching fundamentals, cut it. Reference, not training.
- **Expand knowledge; don't script behaviour.** Enough *why* that the operator can
  improvise when reality differs, with the source manual pointed at — never a bare
  press-this-then-that sequence.
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
1. Open `http://localhost:8000` — the launcher renders and every campus card navigates.
2. Open the page you changed — desktop width **and** a ~390px narrow window (tab bar
   appears, nothing scrolls sideways).
3. Check the rail and tab bar on that page show **only that campus's** seats.
4. Click every link you added or touched, including prev/next.
5. `grep -rn "http" --include="*.html" . | grep -v "localhost\|github.io\|claude.ai"` —
   no external resources may have crept in (offline requirement).
6. Confirm the old-path redirect stubs still work: `/video/`, `/audio/`, `/lighting/`
   land on their `tea/` equivalents; `/cameras/` lands on the launcher.
7. If you added or renamed content: press `/`, type a phrase from it (a symptom the way
   an operator would say it), and confirm the result lands — a symptom hit must open
   and highlight its accordion.
7. If anything fails and the fix isn't obvious from this file: revert, report, stop.

Then: commit + push to `main` **only when Matt asks** (that's what publishes it).
Commit trailer: `Co-Authored-By: Claude <noreply@anthropic.com>`.
