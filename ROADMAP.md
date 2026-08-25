# Roadmap — Elevation Canada production platform (v3)

The vision, expanded 2026-07-13: **campuses × disciplines × a documentation playbook.**
What began as the Toronto East video reference becomes the production platform for
Elevation Canada — every campus, every discipline, plus a repeatable method for turning
what Matt knows into something institutional.

Three layers:

1. **Room docs** (per campus, per discipline) — what exists today for East video:
   "what do I do at this desk, right now."
2. **The Playbook** (campus-agnostic) — how a room gets documented: the three page
   shapes, per-discipline capture worksheets, writing rules, done-criteria. This is the
   knowledge-dissemination piece — the site teaches how to make more of itself, so
   documenting the next campus doesn't require Matt in the room.
3. **The platform shell** — nav, theme, search, PWA. Built in Phase 1; needs one
   extension for the campus dimension (Phase 4).

- **Status:** Phase 1 shipped 2026-07-07. **Phases 4 and 3 shipped 2026-07-26**, in that
  order — see the sequencing note under Phase 3 for why they were swapped. Phase 2
  (room content authoring) is current and now spans two campuses. Phases 5–6 open.
- **Approved direction:** `design/mockup-v2.html` — the "lights down" design, frozen as
  a reference. The real site realizes it; the mockup file itself is never edited again.
- **Executor:** phases are written so a future Claude session (including smaller models)
  can pick up any phase cold. Phases 3 and 4 want a capable model (they touch structure);
  phases 2, 5-content, and 6 are deliberately shaped so less capable models can run them
  using `docs/MAINTENANCE.md` and `templates/`.
- **The four goals every phase is judged against:**
  1. Polished and a joy to use.
  2. Information is clear and intuitive — interactive subpages, no qualifying paragraphs.
  3. Great on mobile *and* desktop — platform-first feel on both.
  4. Future less-capable models can maintain and update it safely.

---

## Design decisions carried into v2 (from the mockup)

| Decision | Choice | Why |
|---|---|---|
| Audience | **Pros, not training.** The site documents *this room* for people who already know the craft — never explain what an M/E, crosspoint, or gain stage is. | Matt, 2026-07-07. Every page answers "what do I do at this desk, right now." |
| Theme | **Dark default + switchable light background** (toggle top-right, persisted in localStorage). | Dark is the brand stage (guide: "keep it dark") and the booth default; the light switch exists because this is a reference and readability outranks style (Matt, 2026-07-07). |
| Discipline accents | On dark: Video `#00FFFC` · Audio `#47FF91` · Lighting `#FDB2FF` · Cameras `#FFD98E` (approved). On light, mid-depth versions: `#00A8A5` · `#16AB5C` · `#C261CB` · `#BB862A`. | The three brand neons plus one extension (guide defines only three). Light set deliberately not too dark (Matt, 2026-07-07) — still reads as the neon. Accents are tally lights — dots, eyebrows, glows — **never floods, never body copy**. |
| Gradient | blue→green→pink reserved for platform-level moments (wordmark rule, home); mid-depth set on light. | Guide: "gradient as an accent". |
| Type | **Two faces, two jobs, one family underneath.** Headings & brand labels: `Eina 01` semibold, title case, falling back to `Helvetica Now Display` → `Helvetica Neue`. Body/reading text: `Helvetica Now Text` → `Helvetica Neue` at **regular weight**. Lowercase wordmark only. **No Avenir anywhere** — tried and rejected (Matt, 2026-07-07). | Light weights hampered readability at reference sizes; readability wins every tie. Eina is licensed, so never embedded. |
| Logo | Three-square logomark as inline SVG (rebuilt from `Production_Logo_Square.png`, brand hexes hard-coded) rides with the wordmark in the rail and home hero, scaled to the logotype's x-height. Mark never theme-flips; the wordmark text flips black/white with the background. | Guide: mark aligns to logotype x-height; logomark is sanctioned on both black and white. Source assets in repo root: `Production_Logo_Square.png`, `Production_Logo-01.png` (full lockup, white text). |
| Navigation | Mobile: bottom tab bar (Home + 4 disciplines). Desktop: persistent left rail with full page tree. | The "platform-first" requirement — app on the phone, console on the desk. |
| Page mechanics | Hash-routed views, card menus, symptom accordions, numbered steps — kept from v1 | The team already loved these. |

**All open questions resolved 2026-07-07:** theme is switchable, dark default; body type
is Helvetica Now/Neue regular — light weights rejected for readability; no Avenir
anywhere; cameras accent `#FFD98E` approved; logomark added to headers as inline SVG;
old v1 archived (unchanged) at `/v1/`, linked from the new home page's footer.

## Design decisions added for v3 (2026-07-13)

| Decision | Choice | Why |
|---|---|---|
| Campus hierarchy | **Campus-first paths** (`tea/video/`, not a campus toggle inside each discipline page). Home becomes the campus launcher. | Pages document *rooms*, and an operator stands at exactly one desk — the same blast-radius logic that split disciplines into separate files. |
| Institutional ≠ training | The pro-level voice rule survives the expansion. The institutional win is that the *rooms* and the *documentation method* stop living in Matt's head — not that the site teaches the craft. | Matt's original audience decision, reaffirmed. An optional "first Sunday at this desk" page per campus may later *sequence* existing pages in reading order — it never re-explains them. |
| Shared standards | Where both campuses genuinely do something identically (vocabulary, show-calling shorthand), it lives once in the playbook layer and both campuses link to it. Only created when a fact is truly campus-agnostic — duplication is the default until proven shared. | Avoids a "standards" page that silently diverges from either room's reality. |
| Sequencing | East finishes before the campus restructure. | Institutionalizing knowledge requires one *complete* worked example, and every East capture session road-tests the templates the next campus inherits. |
| Capture mode | **Standard input = a long dictated note about the area/subject/topic, plus the relevant reference manuals handed over as resource material.** The Phase-3 worksheets formalize the prompts, but dictation is the expected form — Matt talks, the model authors. | Matt, 2026-07-13. Lowest-friction way to get what's in his head out of it; the manuals fill in what dictation skips. |
| Guides expand, don't script | Pages are **well-resourced and clear without turning volunteers into mindless robots** — include enough why and point at the source manual so the operator understands the system, never a bare button-press script. | Matt, 2026-07-13. The goal is expanding volunteers' knowledge, not controlling what they do. Coexists with "pros, not training": don't teach the craft, *do* deepen understanding of this room. |

## Design decisions added 2026-07-26 (the restructure)

| Decision | Choice | Why |
|---|---|---|
| Toronto East has no camera seat | The `cameras/` scaffold shipped in v2 was **deleted**, not moved to `tea/cameras/`. Cameras exists only under `tor/`. `/cameras/` is left as a stub that lands on the launcher rather than redirecting a Toronto East bookmark into another campus's room. | Matt, 2026-07-26. The v2 launcher advertised four seats out of symmetry; East only ever had three. A scaffold for a seat that doesn't exist is a promise the room can't keep. |
| Phase order swapped: 4 before 3 | The campus restructure ran **first**, then the playbook was extracted. | Phase 3's headline deliverable is the blank-campus kit. Written before the restructure it would have documented a path model that Phase 4 immediately invalidated. Restructuring first also cost less — three of the four rooms were 47-line scaffolds. |
| Campus scoping is enforced, not just conventional | The rail and tab bar are filtered to the campus on `<html data-campus>`; rooms never link across campuses. Anything genuinely shared lives in `playbook/` and both campuses link there. | The blast-radius argument that split disciplines into separate files, applied one level up. An operator stands at exactly one desk, at exactly one campus. |
| Clock Standards stays under `tea/video/` for now | Flagged in the sitemap as the first playbook-promotion candidate, but **not** promoted in this pass. | "Duplication is the default until proven shared" — one campus's clock standards aren't yet evidence of a shared standard. The call is Matt's, during the sitemap simplification pass. |

## Design decisions added 2026-08-25 (search)

| Decision | Choice | Why |
|---|---|---|
| Search ships, diagnose-first | Fuzzy site search in the shell (`/` or `Cmd+K`, magnifier button injected by `app.js`). Symptom accordions are indexed **individually**, boosted above whole pages, and a hit opens + highlights the exact accordion. | Matt, 2026-08-25: the diagnose pages are the most valuable part of the site and need pushing forward — a volunteer types "resolume black screen" and lands inside the right checklist. |
| Runtime index, not a static one | The Phase-5 sketch ("static index in the NAV array") was dropped. The current page is indexed from its own DOM; every other page is fetched and DOM-parsed when search first opens. No build step, no index file, nothing external — on `file://` it degrades to current-page-only. | An index that must be regenerated **will** drift from hand-authored HTML. Fetching the real pages means a content push is searchable the moment Pages deploys, and the maintenance contract ("content edits touch HTML only") survives untouched. |
| Search respects campus scoping | Standing in a room, results cover that campus + the playbook only; the launcher searches everything, labelled by campus. Same filter as the rail. | The no-cross-campus rule exists so an operator never follows another room's wiring — search must not become the back door around it. |
| Fuzzy = token-level tolerance, no library | Per-word exact/prefix/substring/one-typo matching with field weights (title ×3) and kind boosts (symptom ×1.6), grammatical stopwords dropped ("no"/"down"/"wrong" kept — they carry symptom meaning here). ~80 lines, dependency-free. | Volunteers type fast and inexactly; a full search library would be the site's first dependency for a corpus of a few dozen documents. |

## Design decisions added 2026-07-14 (readability pass)

| Decision | Choice | Why |
|---|---|---|
| Type size & weight | Reading sizes moved up one notch (`--t-1/2/3`: 13/15/17 → **14/16/18px**, step text follows body, line-height 1.55 → 1.6). Dropped `-webkit-font-smoothing: antialiased` so Helvetica's regular weight renders with full stems. Secondary inks run hotter (dark `--ink-1/2`: 0.66/0.40 → **0.78/0.52**; light: 0.70/0.46 → **0.80/0.56**). Overlines/chips stay 11px — labels, not copy. | Matt, 2026-07-14: the type read too light to scan quickly at the desk. Same "readability wins every tie" rule that killed the light weights in v2 — this time applied to size, rendered stroke weight, and muted-text contrast. Verified at 390px: no wrap/overflow regressions. |

**Open questions for v3 (Matt decides, before Phase 4 starts):**
- ~~**Campus 2's name and rooms**~~ — **resolved 2026-07-13:** campus codes are `tea`
  (Toronto East) and `tor` (Toronto). Both have Supacode worktrees per discipline —
  `tea/{video,audio,lighting}` and `tor/{video,audio,lighting,camera}`; Toronto East
  has no camera discipline (intentional, not a gap to fill).
- ~~**Repo/URL rename**~~ — **resolved 2026-07-13:** renamed to `production-manual`
  (live URL `matt-white-ca.github.io/production-manual/`). A stub repo left at
  `tea-production-redesign` redirects the old URL, deep links included (its `404.html`
  rewrites the path). Optional later upgrade: a custom domain (CNAME from
  elevationchurch.ca DNS) would make the repo name permanently irrelevant to operators.

---

## Target architecture

### Today — campus-first, shipped 2026-07-26

One room = one HTML file. Shared skin = one CSS file. Shared shell = one JS file.

```
index.html              campus launcher (campus groups, one card per seat)
tea/video/index.html    hub + all 10 video subpages (hash-routed views) — LIVE
tea/audio/index.html    hub only — SCAFFOLD
tea/lighting/index.html hub only — SCAFFOLD
                        (no tea/cameras — East has no camera seat, by decision)
tor/video/…             ┐
tor/audio/…             │ Toronto rooms, hub only — SCAFFOLD
tor/lighting/…          │ (video/audio/lighting/cameras — all four)
tor/cameras/…           ┘
playbook/index.html     the campus-agnostic layer — LIVE: page shapes, capture
                        worksheets, writing rules, blank-campus kit
video/ audio/ lighting/ cameras/   redirect stubs for pre-restructure bookmarks;
                        they carry the deep-link hash across. /cameras/ has no
                        equivalent and lands on the launcher.
assets/production.css   ALL design tokens + components. Content edits never touch this.
assets/app.js           router + injects tab bar & rail from one CAMPUS map + NAV array
templates/              copy-paste blocks for every repeating pattern
docs/MAINTENANCE.md     the future-model contract (recipes + verify checklist)
docs/SITEMAP.md         the whole site in editable form; regenerate after any
                        structural change
design/mockup-v2.html   the approved mockup (frozen reference, never edited)
v1/index.html           the retired single-page site (frozen)
```

Why this shape (it exists to serve goal 4):
- **Blast radius.** An audio edit physically cannot break video; an East edit physically
  cannot break campus 2. v1's single file was already 2,000 lines — per-room files keep
  every file small enough for a small model.
- **One source of truth for chrome.** Tab bar + rail are injected by `app.js` from a
  single `NAV` array — adding a page means adding one array entry, not editing files
  across campuses. `<noscript>` fallback: plain links at the top of each file.
- **Still offline, still no CDNs.** All assets are relative-path local files; GitHub
  Pages serves them; the folder works from disk. (True offline-after-first-visit
  arrives with the PWA in Phase 5.) The "one self-contained file" property was traded
  away deliberately — the maintainability win is bigger, and the PWA restores offline
  properly.
- Same publish workflow: edit → commit → push to `main` → Pages redeploys.

---

## Phase 1 — Build the platform shell + port video — ✅ SHIPPED 2026-07-07

Turned the mockup into the real site. The live URL serves the v2 platform with video
fully ported and nothing lost:

1. Moved `index.html` → `v1/index.html` unchanged (bookmark safety net on the home page).
2. Extracted the mockup's CSS → `assets/production.css`; its router → `assets/app.js`
   with the `NAV` config array and chrome injection.
3. Built `index.html` (home) and `video/index.html` from the mockup.
4. Ported all v1 video content — Startup · Signal Flow · Run of Show · Diagnostics ·
   M/E Bus Map · Key Layers · Input Cross-Points · Output Cross-Points · Unverified/Gaps.
5. Created `audio/ lighting/ cameras/` hub pages in scaffold state.
6. Wrote `templates/*.html` from the final markup.
7. Updated `docs/MAINTENANCE.md`, `CLAUDE.md`, `README.md` to match reality.

## Phase 2 — Toronto East content, one discipline at a time (current; small-model friendly)

Each discipline ships independently; order = whatever Matt has source material for.
**Standard capture mode:** Matt dictates a long note about the area/subject/topic and
hands over any relevant reference manuals as resource material; the model authors from
that using `templates/` + `docs/MAINTENANCE.md` recipes only. The capture lists below
are the prompts for what the dictation should cover, not a form to fill in.
**This phase deliberately precedes the campus restructure** — East is the complete
worked example the playbook (Phase 3) is extracted from, and every capture session
here road-tests the worksheets campus 2 will inherit.

**Capture lists (what Matt brings, per discipline):**
- **Audio:** console model + show file name & recall steps · power order · patch sheet /
  input list · gain structure notes · wireless frequencies & battery routine · IEM mix
  assignments · Sonifex de-embed hand-off (link across to video Signal Flow) · top 5
  Sunday failures with fixes.
- **Lighting:** console model + show file · power order · River-vs-Elevation rig split ·
  universes / addresses / fixture schedule · service looks & when to fire them · house
  light control · the hand-back-to-River routine · top 5 failures.
- **Cameras:** models & counts · per-camera build cards (lens, paint, frame rate,
  SDI return) · positions & shot vocabulary · tally source & comms channels · Cam 1 =
  ME1→Makito constraint (already documented in video) · top 5 failures.

**Authoring rule of thumb:** every page is one of three shapes — *numbered procedure*
(startup), *symptom accordions* (diagnose), or *reference table* (patch, builds).
All three have templates. If content doesn't fit a shape, it probably needs splitting.

Each discipline is **done when**: hub cards all link to real pages, its "Diagnose a
Symptom" page exists, its rail/tab entries drop the pending state, and its home-screen
chip flips from *Scaffold* to *Live*.

## Phase 3 — Extract the Playbook — ✅ SHIPPED 2026-07-26 (ran *after* Phase 4)

Live at `playbook/`, four pages: The Three Page Shapes · Capture Worksheets · Writing
Rules · Blank-Campus Kit. Promoted what was internal tooling (`templates/`,
`docs/MAINTENANCE.md`, the capture lists above) into a first-class, visible site section.
This is the knowledge-dissemination deliverable — documenting the *method*, not inventing
one.

**Two gates were deliberately overridden, both Matt's call 2026-07-26:**

1. *"After ≥2 East disciplines are live"* — only `tea/video` is live. The method was
   therefore extracted from **one** worked example. The shapes and writing rules are
   solid (they describe rules already applied across 10 pages); the **audio, lighting,
   and cameras worksheets are the weakest part** — they're derived from the Phase-2
   capture lists rather than road-tested against a real capture session. Expect to
   revise them after the first audio capture.
2. *"Phase 3 before Phase 4"* — reversed. See the design-decisions table above.

Contents as shipped:
- **The three page shapes**, each shown with a filled example lifted from East.
- **Capture worksheets, one per discipline** — the questions to ask a room, printable,
  written so someone who is not Matt can run a capture visit and hand the answers to a
  model for authoring.
- **The writing rules** — pro-level voice, "what do I do at this desk, right now,"
  no qualifying paragraphs, when to split a page. Guides expand knowledge rather than
  script behaviour: enough why for the operator to understand the system, with the
  source manual cited/linked — never a bare button-press sequence.
- **The blank-campus kit** — step-by-step instructions a future session can follow to
  scaffold a new campus cold: folders, hub pages, NAV entries, done-criteria.
- **Shared standards** — *not created yet.* Clock Standards is the flagged candidate and
  deliberately stayed under `tea/video/`. Duplication is still the default.

**Still open against "done when":** the blank-campus kit has not yet been run cold by a
session that didn't write it, and no capture visit has been run from the worksheets alone.
Both are real tests and neither has happened.

## Phase 4 — The campus dimension — ✅ STRUCTURE SHIPPED 2026-07-26

Ran *before* Phase 3. Structure is done; the capture visits are not.

1. ✅ **Restructured campus-first:** `video/ audio/ lighting/` → `tea/*`. The `cameras/`
   scaffold was **deleted**, not moved — East has no camera seat. Redirect stubs left at
   all four old paths, carrying the deep-link hash across.
2. ✅ **Extended the shell:** `assets/app.js` gained a `CAMPUS` map and a `campus` field
   in `NAV`; depth is now 0/1/2; the rail and tab bar filter to the current campus; the
   launcher renders campus groups. Verified against every page context — depth, campus
   scoping, and per-campus tab lists all check out.
3. ✅ **Scaffolded Toronto** — `tor/{video,audio,lighting,cameras}`, hub pages only.
   Note this was built *alongside* the blank-campus kit rather than *from* it, so it is
   not the clean test the kit still needs.
4. ⬜ **Capture Toronto's rooms** — nothing captured. One discipline at a time, Phase-2
   style, from the playbook worksheets.
5. ✅ Updated `docs/MAINTENANCE.md`, `templates/`, and `CLAUDE.md` for the campus-first
   path model in the same commit that changed it.

## Phase 5 — Platform polish (after Phase 4 structure, or earlier if East wants it)

- **PWA:** `manifest.webmanifest` + icons + a minimal cache-first service worker →
  add-to-home-screen launches full-screen and **works fully offline in the booth**.
  The biggest remaining "platform-first" win; restores the offline guarantee.
- ~~**Quick-jump search**~~ — **✅ SHIPPED 2026-08-25**, upgraded from the sketch: fuzzy,
  diagnose-first, runtime-indexed from the real pages instead of a static index (see the
  2026-08-25 design-decisions table).
- **All-team Sunday page, per campus:** one cross-discipline run-of-show — who fires
  what, in order, across all four seats. Possible once a campus has audio + lighting live.
- **Print styles:** a laminated-card `@media print` pass for startup procedures and the
  playbook capture worksheets.

## Phase 6 — Maintenance mode (ongoing, smallest models)

Steady state: facts change (a crosspoint, a frequency, a step), models apply them.
`docs/MAINTENANCE.md` is the contract; keep it ruthlessly current. Any session that
changes markup patterns must update the matching template — and, once Phase 3 ships,
the matching playbook page — in the same commit.

---

## Explicitly out of scope (unless Matt asks)

Build tools, frameworks, npm, Markdown-to-HTML pipelines, analytics, CMS, auth.
The platform is hand-authored static files on Pages — that simplicity *is* goal 4.
