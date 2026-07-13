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

- **Status:** Phase 1 shipped 2026-07-07 (see the record below). Phase 2 (Toronto East
  content authoring) is current. Phases 3–6 defined 2026-07-13.
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
| Campus hierarchy | **Campus-first paths** (`east/video/`, not a campus toggle inside each discipline page). Home becomes the campus launcher. | Pages document *rooms*, and an operator stands at exactly one desk — the same blast-radius logic that split disciplines into separate files. |
| Institutional ≠ training | The pro-level voice rule survives the expansion. The institutional win is that the *rooms* and the *documentation method* stop living in Matt's head — not that the site teaches the craft. | Matt's original audience decision, reaffirmed. An optional "first Sunday at this desk" page per campus may later *sequence* existing pages in reading order — it never re-explains them. |
| Shared standards | Where both campuses genuinely do something identically (vocabulary, show-calling shorthand), it lives once in the playbook layer and both campuses link to it. Only created when a fact is truly campus-agnostic — duplication is the default until proven shared. | Avoids a "standards" page that silently diverges from either room's reality. |
| Sequencing | East finishes before the campus restructure. | Institutionalizing knowledge requires one *complete* worked example, and every East capture session road-tests the templates the next campus inherits. |
| Capture mode | **Standard input = a long dictated note about the area/subject/topic, plus the relevant reference manuals handed over as resource material.** The Phase-3 worksheets formalize the prompts, but dictation is the expected form — Matt talks, the model authors. | Matt, 2026-07-13. Lowest-friction way to get what's in his head out of it; the manuals fill in what dictation skips. |
| Guides expand, don't script | Pages are **well-resourced and clear without turning volunteers into mindless robots** — include enough why and point at the source manual so the operator understands the system, never a bare button-press script. | Matt, 2026-07-13. The goal is expanding volunteers' knowledge, not controlling what they do. Coexists with "pros, not training": don't teach the craft, *do* deepen understanding of this room. |

**Open questions for v3 (Matt decides, before Phase 4 starts):**
- **Campus 2's name and rooms** — needed to plan paths (`east/` + what?) and worksheets.
- **Repo/URL rename** — `tea-production-redesign` stops being accurate at Phase 4.
  Either a new repo (e.g. `elevation-production`) with a redirect page left behind, or
  keep the URL and live with the name. Decide before campus-2 bookmarks exist.

---

## Target architecture

### Today (Phase 1 shipped — one campus, implicit)

One discipline = one HTML file. Shared skin = one CSS file. Shared shell = one JS file.

```
index.html              home / platform launcher
video/index.html        hub + all 9 video subpages (hash-routed views, like v1) — LIVE
audio/index.html        hub only — SCAFFOLD
lighting/index.html     hub only — SCAFFOLD
cameras/index.html      hub only — SCAFFOLD
assets/production.css   ALL design tokens + components. Content edits never touch this.
assets/app.js           router + injects tab bar & rail from one NAV config array
templates/              copy-paste blocks for every repeating pattern
docs/MAINTENANCE.md     the future-model playbook (recipes + verify checklist)
design/mockup-v2.html   the approved mockup (frozen reference, never edited)
v1/index.html           the retired single-page site (frozen)
```

### End state (after Phase 4 — campus-first)

```
index.html              home / campus launcher + platform-level pages
east/video/index.html   ┐
east/audio/index.html   │ Toronto East rooms (today's video/ audio/ lighting/ cameras/,
east/lighting/…         │ moved one level down; stub redirects left at the old paths)
east/cameras/…          ┘
<campus2>/…             campus 2 rooms, same four-discipline shape
playbook/index.html     the campus-agnostic layer: page shapes, capture worksheets,
                        writing rules, blank-campus kit (Phase 3 promotes docs/ +
                        templates/ content into this visible section)
assets/ templates/ docs/ design/ v1/   as today — still one CSS, one JS, one NAV array
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

## Phase 3 — Extract the Playbook (after ≥2 East disciplines are live; capable model, ~1 session)

Promote what Phase 2 proved from internal tooling (`templates/`, `docs/MAINTENANCE.md`,
the capture lists above) into a first-class, visible site section: `playbook/`. This is
the knowledge-dissemination deliverable — documenting the *method*, not inventing one.

Contents:
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
- **Shared standards** (only as they prove out): show-calling vocabulary and anything
  else genuinely identical across campuses, linked from both rather than duplicated.

**Done when:** a capture visit at a room Matt has never documented could proceed from
the printed worksheets alone, and a fresh Claude session pointed at the blank-campus
kit scaffolds a correct new campus without further instruction.

## Phase 4 — The campus dimension (capable model, ~1 session structure + capture visits)

Prerequisites: Phase 3 done; Matt has named campus 2 and decided the rename question.

1. **Restructure campus-first:** move `video/ audio/ lighting/ cameras/` →
   `east/video/` etc. Leave stub redirect pages at the old paths so bookmarks survive.
2. **Extend the shell:** `assets/app.js` learns depth 2 and a campus level in `NAV`;
   home becomes the campus launcher; breadcrumbs and the rail become campus-aware.
   This is the only structural JS change in the whole roadmap — verify against every
   existing East page before touching campus 2.
3. **Scaffold campus 2** using the blank-campus kit — the kit's first real test.
4. **Capture campus 2's rooms** — one discipline at a time, Phase-2 style, from the
   playbook worksheets. Authored by small models; Matt (or a delegate with the
   worksheets) supplies the facts.
5. Update `docs/MAINTENANCE.md`, `templates/`, and `CLAUDE.md` for the two-level path
   model in the same commits that change it.

## Phase 5 — Platform polish (after Phase 4 structure, or earlier if East wants it)

- **PWA:** `manifest.webmanifest` + icons + a minimal cache-first service worker →
  add-to-home-screen launches full-screen and **works fully offline in the booth**.
  The biggest remaining "platform-first" win; restores the offline guarantee.
- **Quick-jump search:** client-side filter over a static page index (title + keywords
  per view), spanning campuses. No dependencies; the index lives in the `NAV` array.
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
