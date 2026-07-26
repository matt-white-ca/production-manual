# SITEMAP.md — the site as it stands, in editable form

**Regenerated 2026-07-26** against `main` @ `a68feee`, after the campus-first restructure
and the Playbook shipped. This is a working document: edit it freely and hand it back,
and the edits get applied to the real site.

---

## How to edit this

Every page is a block with the same fields. Change the fields, not the format.

| I want to… | Do this |
|---|---|
| **Rename a page** | Edit `rail:` and/or `card:`. Leave `id:` alone unless you want the URL to change — if you do, write `id: video-clocks → video-timing` and I'll redirect the links. |
| **Reorder pages** | Move whole blocks up or down. Order in this file = order in the rail, the hub cards, and the prev/next arrows. |
| **Add a page** | Paste a new block anywhere, set `status: proposed`, fill in whatever you know. `contents:` can be a rough dump — bullets, half-sentences, a dictation paste. |
| **Delete a page** | Set `status: cut`. Don't delete the block — I need to know what to unwire. |
| **Move a page to another discipline** | Cut the block, paste it under the new discipline, add `moved from: video`. |
| **Move a page to the Playbook** | Add `promote: playbook` to the block. That's the campus-agnostic layer — only for facts true at *every* campus. |
| **Split a page in two** | Duplicate the block, add `split from: <id>` to the new one, and divide the `contents:` bullets between them. |
| **Merge two pages** | Add `merge into: <id>` to the one that disappears. |
| **Change what's on a page** | Edit the `contents:` bullets. Add, delete, reword — that's the content spec. |
| **Add or remove a whole seat** | Add or cut the discipline heading and its blocks. Say which campus. |
| **Flag something you're unsure about** | Start the line with `?` — I'll ask instead of guessing. |

Anything you write in a `notes:` line is instruction to me, not site copy.

**Field meanings**

- `id:` — the URL hash (`/tea/video/#video-clocks`) and the anchor other pages link to.
- `rail:` — label in the left rail (desktop) and the page tree. Kept short.
- `card:` — the hub tile: bold title, then the one-line "what you'll find" blurb.
- `shape:` — one of **procedure** (numbered steps) / **diagnose** (symptom accordions) /
  **reference** (tables). Every page is one of the three; a page that fits none usually
  wants splitting.
- `status:` — `live` · `scaffold` (tile exists, page doesn't) · `proposed` (your addition) ·
  `cut`.
- `contents:` — what's actually on the page, in order.

---

## Site-wide

- **Live:** https://matt-white-ca.github.io/production-manual/ — GitHub Pages off `main`, repo root.
- **Structure:** campus-first. Every room is `<campus>/<discipline>/index.html`,
  hash-routed to its subpages. Campus codes are permanent: **`tea`** = Toronto East,
  **`tor`** = Toronto. Plus `/` for the launcher and `/playbook/` for the shared layer.
- **Chrome:** left rail (desktop) + bottom tab bar (mobile), both generated from one
  `CAMPUS` map and one `NAV` array in `assets/app.js`. **Both filter to the campus you're
  standing in** — a Toronto East page never shows a Toronto seat. Breadcrumbs and page
  titles come from each view's `data-crumb`.
- **Shared:** one stylesheet (`assets/production.css`), one script, no external anything —
  every page opens offline.
- **Voice:** written for pros who know the craft. Documents *this room*, not the discipline.
- **Cross-campus linking is forbidden.** Rooms document rooms. A fact shared by both
  campuses belongs in `/playbook/`, linked from both — and only once it's *proven* shared.
- **Frozen, not in the map:** `/v1/` (retired single-page site, linked from the launcher
  footer) and `design/mockup-v2.html`.
- **Redirect stubs, not in the map:** `/video/`, `/audio/`, `/lighting/` forward to their
  `tea/` equivalents carrying the hash; `/cameras/` forwards to the launcher.

---

## Level 0 — Launcher

`index.html` · rail label **Home** · `id: home`

- **Hero:** "Elevation Canada" → `production` wordmark → *"Every seat in every booth, one
  reference. Pick your campus, then your desk."*
- **Quickstart banner:** "Sunday at Toronto East? Start here." → jumps to `tea` Video
  Startup Procedure.
  ? This is campus-specific on a cross-campus launcher. Options: leave it (East is the
  only live room, so it's honest), drop it once Toronto goes live, or make it two banners.
- **Campus groups:** Toronto East (3 seats) · Toronto (4 seats) · Every Campus (Playbook).
- **Footer:** scaffold explainer, the no-camera-seat note, and the `/v1/` archive link.

| Group | Card | Tagline | Status |
|---|---|---|---|
| Toronto East | Video Engineering | Switch, route, capture | Live · 10 pages |
| Toronto East | Audio | Console, patch, monitors | Scaffold · 4 planned |
| Toronto East | Lighting | Rig, looks, cues | Scaffold · 4 planned |
| Toronto | Video Engineering | Switch, route, capture | Scaffold · 4 planned |
| Toronto | Audio | Console, patch, monitors | Scaffold · 4 planned |
| Toronto | Lighting | Rig, looks, cues | Scaffold · 4 planned |
| Toronto | Cameras | Builds, shots, comms | Scaffold · 4 planned |
| Every Campus | The Playbook | How a room gets documented | Live · 4 pages |

---

# Campus: Toronto East (`tea`)

Three seats. **No camera seat** — a decision, not a gap.

## Video Engineering · `/tea/video/` · **LIVE**

Hub: `id: video` · h1 **Switch, Route, Capture** · lead *"The permanent install in River's
master control room. Fire the saved Elevation state, then run the service."*
Hub also carries the numbered **start-here** banner pointing at Startup Procedure.

### 1. Startup Procedure
- `id:` video-startup
- `rail:` Startup Procedure
- `card:` Startup Procedure — Run this first, every service — power, connect, Profile 44, macros, verify.
- `shape:` procedure · `status:` live
- `contents:`
  1. Power the racks & the ATEM panel — Furman → Middle Atlantic → Resi decoder + console interface → physically reconnect ATEM panel power (no power switch)
  2. Connect the Elevation Macbooks — SDI colour table (white → Resolume/IN 35, yellow → CG2/IN 36, orange → CG1/IN 37) + note that box labels are pending
  3. Restore ATEM Profile 44 — PROFILE → right arrow → knob → RESTORE + the "manual says 10 profiles, trust 44" note
  4. Recall Videohub macros — STREAM → TAKE, CAM → TAKE + the after-a-dicey-rental River-first note (MON / DECK / EDIT)
  5. Verify on the Videohub display — confirm each Macbook landed on IN 35/36/37

### 2. Signal Flow
- `id:` video-flow
- `rail:` Signal Flow
- `card:` Signal Flow — Lane A / Lane B — which paths touch the ATEM, which never do.
- `shape:` reference · `status:` live
- `contents:`
  - Lane A (switched): ME1 → Makito · ME2 → Lobby · ME3 → Main Screen · ME4 utility/DVE
  - Lane B (direct crosspoint): Resolume → Ground Panels · CG2 → top confidence · Clock Mac → bottom confidence · Resi → DEMBED 1 · CG1 → DEMBED 2
  - Closing note: "is the broken destination Lane A or Lane B?" as the first triage question
- `linked from:` tea Audio hub, Playbook (page shapes, as the worked reference example)

### 3. Sunday Run of Show
- `id:` video-rundown
- `rail:` Sunday Run of Show
- `card:` Sunday Run of Show — Expected ME1/2/3 state at each point in the service.
- `shape:` reference · `status:` live
- `contents:`
  - Terminology note — "Resolume" = ME4 · "Uplink" = Resi join · "CG1 full screen" = cut, not keyed
  - 9-row table: segment × ME1 (Makito) × ME2 (Lobby) × ME3 (Main Screen) × notes, from
    pre-experience slides through uplink and closing, looping back to slides
  - Loop note: ME1 never leaves Cam 1; ME2's post-uplink state is unconfirmed

### 4. Clock Standards & Transitions
- `id:` video-clocks
- `rail:` Clock Standards
- `card:` Clock Standards & Transitions — Director's notes — what's on the clock, and when not to touch it.
- `shape:` procedure · `status:` live
- `contents:`
  - Standing rule: time of day is the default for anything unnoted
  - Reference table of the six clock states (count-to · time of day · hosting segment ·
    30-to-transition · sermon · UPLINK SAFE/EXTEND)
  - 8 steps: set the count-to → fire at zero, go to time of day → hosting clocks on the
    downbeat (never trim for overrun) → uplink = time of day → SAFE/EXTEND buffer call at
    2:00 → 30-seconds-to-transition → sermon counts up → reset between experiences
- `notes:` **Still the top promotion candidate.** Deliberately campus-agnostic — no room
  wiring in it. Left under Video in the restructure because duplication is the default
  until a fact is *proven* shared, and Toronto hasn't been captured yet. Add
  `promote: playbook` here if you want it moved now; the alternative is to wait until
  Toronto's capture confirms the same standards apply.

### 5. Diagnose a Symptom
- `id:` video-diagnostics
- `rail:` Diagnose a Symptom
- `card:` Diagnose a Symptom — Symptom-based checklists, worked top to bottom.
- `shape:` diagnose · `status:` live
- `contents:` 9 accordions, ordered by likelihood × speed-to-check —
  1. Main Screen black / frozen / wrong source *(Lane A)*
  2. Lyrics missing, wrong, or mispositioned *(Lane A)*
  3. Ground Panels wrong / frozen / dark *(Lane B)*
  4. Resolume graphic looks small — raw source cut instead of ME4 *(Lane A)*
  5. Lobby TVs wrong or dark *(Lane A)*
  6. Makito capture blank or wrong *(Lane A)*
  7. Top confidence monitor wrong *(Lane B)*
  8. Bottom confidence monitor / clock not showing Sunday *(Lane B)*
  9. No console audio from Resi or CG1 *(Lane B)*

### 6. M/E Bus Map
- `id:` video-me-bus · `rail:` M/E Bus Map
- `card:` M/E Bus Map — What each M/E is for and where it routes.
- `shape:` reference · `status:` live
- `contents:` 4-row table — ME1 capture / ME2 lobby / ME3 live switch / ME4 utility, with panel position, destination, purpose

### 7. Key Layers
- `id:` video-keys · `rail:` Key Layers
- `card:` Key Layers — ME3 / ME4 keyer assignments.
- `shape:` reference · `status:` live
- `contents:` 3-row table — ME3 Key 1 (luma, centre lyrics) · ME3 Key 2 (luma, top-right, used under Uplink) · ME4 Key 1 (DVE, full-screen Resolume)

### 8. Input Cross-Points
- `id:` video-inputs · `rail:` Input Cross-Points
- `card:` Input Cross-Points — Physical sources landing on the Videohub / ATEM.
- `shape:` reference · `status:` live
- `contents:` 6-row table, IN 13 / 34 / 35 / 36 / 37 / 38 → device, label, ATEM destination, note

### 9. Output Cross-Points
- `id:` video-outputs · `rail:` Output Cross-Points
- `card:` Output Cross-Points — Where each Videohub output physically goes.
- `shape:` reference · `status:` live
- `contents:` 11-row table, OUT 18–38 → destination, device, source. Three rows read "not filled in"

### 10. Unverified / Gaps
- `id:` video-gaps · `rail:` Unverified / Gaps
- `card:` Unverified / Gaps — Not yet documented — can't diagnose these paths yet.
- `shape:` reference · `status:` live
- `contents:` OUT 21 Side Screens · OUT 32–37 Control Room TVs 1–6 · OUT 38 ASUS ProArt (TD1)
- `notes:` This page shrinks as gaps close. When it's empty, it goes.

## Audio · `/tea/audio/` · **SCAFFOLD**

Hub: `id: audio` · h1 **Console, Patch, Monitors** · lead *"Front of house, broadcast,
wireless, and the de-embed paths that hand audio to video."*
Scaffold note says what to bring; cross-links to `tea` Video Signal Flow for the Sonifex
de-embeds.

### 1. Console Startup
- `id:` audio-startup *(not yet created)* · `rail:` Console Startup
- `card:` Console Startup — Power order, show file recall, and the first line check.
- `shape:` procedure · `status:` scaffold
- `contents:` ? console model & show file name · power order · first line check

### 2. Patch & Gain
- `id:` audio-patch *(not yet created)* · `rail:` Patch & Gain
- `card:` Patch & Gain — Input list, gain structure, and where every stage source lands.
- `shape:` reference · `status:` scaffold
- `contents:` ? input list / patch sheet · gain structure notes · stage source map

### 3. Wireless & IEMs
- `id:` audio-wireless *(not yet created)* · `rail:` Wireless & IEMs
- `card:` Wireless & IEMs — Frequencies, battery routine, and mix assignments.
- `shape:` reference · `status:` scaffold
- `contents:` ? frequency coordination · battery routine · IEM mix assignments

### 4. Diagnose a Symptom
- `id:` audio-diagnostics *(not yet created)* · `rail:` Diagnose a Symptom
- `card:` Diagnose a Symptom — No FOH, no broadcast, no ears — symptom-based checklists.
- `shape:` diagnose · `status:` scaffold
- `contents:` ? top five Sunday failures · "no broadcast audio" links across to Video Lane B

## Lighting · `/tea/lighting/` · **SCAFFOLD**

Hub: `id: lighting` · h1 **Rig, Looks, Cues** · lead *"Console startup, the shared-venue
rig, and the looks that carry a Sunday."*
Scaffold note flags the River-vs-Elevation split as the story that matters most here.

### 1. Console Startup
- `id:` lighting-startup *(not yet created)* · `rail:` Console Startup
- `card:` Console Startup — Power order, show file, and handing the rig back to River after.
- `shape:` procedure · `status:` scaffold
- `contents:` ? console model & show file · power order · the hand-back-to-River routine

### 2. Rig & Patch
- `id:` lighting-rig *(not yet created)* · `rail:` Rig & Patch
- `card:` Rig & Patch — What's ours vs the venue's, universes, and fixture addresses.
- `shape:` reference · `status:` scaffold
- `contents:` ? ours-vs-venue split · universes & addresses · fixture schedule

### 3. Looks & Cue Stack
- `id:` lighting-looks *(not yet created)* · `rail:` Looks & Cue Stack
- `card:` Looks & Cue Stack — Worship, message, uplink — the looks and when to fire them.
- `shape:` reference · `status:` scaffold
- `contents:` ? service looks and their trigger points · house light control

### 4. Diagnose a Symptom
- `id:` lighting-diagnostics *(not yet created)* · `rail:` Diagnose a Symptom
- `card:` Diagnose a Symptom — Dark rig, stuck look, house lights — checklists.
- `shape:` diagnose · `status:` scaffold
- `contents:` ? top five failures

---

# Campus: Toronto (`tor`)

Four seats, all scaffolds. **Nothing here has been captured** — every hub is a promise of
structure, not a description of the room. The pages below exist as tiles only.

## Video Engineering · `/tor/video/` · **SCAFFOLD**

Hub: `id: video` · h1 **Switch, Route, Capture** · lead *"The switcher, the router, and
where every source lands at Toronto."*
Scaffold note warns that Toronto East's video pages document a different room — read them
for the *shape* of the answer, never as this room's wiring.

- **Startup Procedure** — `procedure` — Power order, saved-state recall, and the verify pass.
- **Signal Flow** — `reference` — Which paths run through the switcher, and which never do.
- **Sunday Run of Show** — `reference` — Expected bus state at each point in the service.
- **Diagnose a Symptom** — `diagnose` — Symptom-based checklists, worked top to bottom.

## Audio · `/tor/audio/` · **SCAFFOLD**

Hub: `id: audio` · h1 **Console, Patch, Monitors** · lead *"Front of house, broadcast,
wireless, and the hand-off to video."*

- **Console Startup** — `procedure` — Power order, show file recall, and the first line check.
- **Patch & Gain** — `reference` — Input list, gain structure, and where every stage source lands.
- **Wireless & IEMs** — `reference` — Frequencies, battery routine, and mix assignments.
- **Diagnose a Symptom** — `diagnose` — No FOH, no broadcast, no ears.

## Lighting · `/tor/lighting/` · **SCAFFOLD**

Hub: `id: lighting` · h1 **Rig, Looks, Cues** · lead *"Console startup, the rig, and the
looks that carry a Sunday."*
Scaffold note asks whether Toronto shares its venue the way East shares with River.

- **Console Startup** — `procedure` — Power order, show file, and the state you leave behind.
- **Rig & Patch** — `reference` — What's ours, universes, and fixture addresses.
- **Looks & Cue Stack** — `reference` — The looks and when to fire them.
- **Diagnose a Symptom** — `diagnose` — Dark rig, stuck look, house lights.

## Cameras · `/tor/cameras/` · **SCAFFOLD**

Hub: `id: cameras` · h1 **Builds, Shots, Comms** · lead *"Camera settings, positions and
shot language, tally and talkback."*
Scaffold note flags that East has no camera seat, so this one has no sibling to borrow from.

- **Builds & Settings** — `reference` — Per-camera build: lens, paint, frame rate, SDI return.
- **Positions & Shot Sheet** — `reference` — Where each op stands and the shot vocabulary.
- **Tally & Comms** — `reference` — Tally source, talkback channels, who hears whom.
- **Diagnose a Symptom** — `diagnose` — No signal, no tally, no comms.

---

# Every Campus — The Playbook · `/playbook/` · **LIVE**

Hub: `id: playbook` · h1 **How a Room Gets Documented** · lead *"The only campus-agnostic
section on this site."* Hub carries a note describing capture mode: Matt dictates, hands
over the manuals, a model authors.

### 1. The Three Page Shapes
- `id:` playbook-shapes · `rail:` The Three Page Shapes
- `card:` The Three Page Shapes — Procedure, diagnose, reference — and the rule that a page fitting none of them wants splitting.
- `shape:` reference · `status:` live
- `contents:` shape-selection table (use it when / ordered by / template) · a section per
  shape with a worked example linked into `tea/video` · the "tag trick generalizes" note ·
  when a page fits none of them

### 2. Capture Worksheets
- `id:` playbook-capture · `rail:` Capture Worksheets
- `card:` Capture Worksheets — What to ask a room, per discipline. Take these into the booth.
- `shape:` reference · `status:` live
- `contents:` "ask for specifics, not summaries" note · six questions every discipline
  answers first · per-discipline lists for video, audio, lighting, cameras · the
  not-every-campus-has-every-seat note
- `notes:` **Weakest page on the site.** The video list is derived from a real documented
  room; audio, lighting, and cameras are derived from the roadmap's capture lists and have
  never been road-tested against an actual capture visit. Expect to rewrite after the
  first audio session.

### 3. Writing Rules
- `id:` playbook-writing · `rail:` Writing Rules
- `card:` Writing Rules — The voice: pros not trainees, expand knowledge, never script behaviour.
- `shape:` reference · `status:` live
- `contents:` six rules — write for pros · expand knowledge don't script behaviour · lead
  with the action · no qualifying paragraphs · use the room's vocabulary exactly · mark up
  consistently (table) · the "readability wins every tie" note
- `notes:` `docs/MAINTENANCE.md` carries a short form of this list. If the two disagree,
  this page wins and the doc gets corrected in the same commit.

### 4. Blank-Campus Kit
- `id:` playbook-newcampus · `rail:` Blank-Campus Kit
- `card:` Blank-Campus Kit — Scaffold a campus that doesn't exist yet — folders, rows, hubs, done-criteria.
- `shape:` procedure · `status:` live
- `contents:` 7 steps — register the campus in `CAMPUS` → create folders → copy a hub per
  seat → add NAV rows → add the launcher group → verify before capture → capture one seat
  at a time · "a seat is done when" list · the duplication-is-the-default note
- `notes:` Not yet run cold. Toronto was scaffolded alongside this page rather than from
  it, so the kit's real test hasn't happened.

---

## Cross-links between pages (the graph, not the tree)

The tree above is navigation. These are the sideways links that make it a reference.
All of them stay inside one campus, or point at the Playbook.

| From | To | Why |
|---|---|---|
| Launcher quickstart | tea Video → Startup Procedure | The Sunday entry point |
| tea Video Diagnose (Main Screen) | tea Video → Input Cross-Points | "if PGM is wrong, go upstream" |
| tea Audio hub | tea Video → Signal Flow | Sonifex de-embeds live on Lane B |
| Playbook → Shapes | tea Video → Startup / Diagnose / Outputs / Gaps | The worked examples of each shape |
| Every `tor` hub | Playbook → Capture Worksheets | What to bring before this room can be written |

? Still worth adding, if you agree: Clock Standards ↔ Sunday Run of Show (the run of show
says what's on the screens, the clock page says what's on the clock at the same moments).
Carried over unanswered from the last sitemap.

---

## For the simplification pass

You said you wanted to look at a simplified structure. Here's where the fat actually is,
ranked by how much it would simplify:

1. **`tea/video` is 10 pages, and four of them are one-table lookups.** M/E Bus Map (4
   rows), Key Layers (3 rows), Input Cross-Points (6 rows), Output Cross-Points (11 rows).
   That's four rail entries and four clicks for 24 rows of reference. A single **Routing
   Reference** page with four tables would cut the video rail by three entries and put
   every lookup on one scrollable page — which is what someone at the desk actually wants.
   `merge into:` is the field for this.
2. **Unverified / Gaps duplicates rows that already exist elsewhere.** The three unfilled
   outputs are already visible as "not filled in" in Output Cross-Points. The gaps page
   exists so they're findable — but if the tables merge per (1), it stops earning a page.
3. **Every scaffold seat plans exactly four pages, and three of the four names repeat
   across disciplines** (Console Startup / … / Diagnose a Symptom). That symmetry was
   assumed, not captured. Worth deciding *before* Toronto's capture whether a room really
   needs four pages, or whether two — Startup + Diagnose, with reference tables folded in
   — is the honest minimum.
4. **The launcher now lists 8 cards across 3 groups.** Fine on desktop; on a phone it's a
   long scroll before the one live room. Options: collapse a campus group by default, put
   live rooms first regardless of campus, or let the quickstart banner carry more.
5. **`tor` mirrors `tea`'s page names before anyone has seen the room.** Cheapest fix is
   to cut `tor` back to hub-only — no planned page tiles — until capture, so the site
   stops advertising a structure nobody has confirmed.

? Tell me which of these you want and I'll apply them. If you'd rather work top-down,
just edit the blocks above and I'll reconcile.

---

## Planned but not built

From `ROADMAP.md` — included so you can re-map *into* them.

- **Phase 5 — PWA:** manifest + icons + cache-first service worker, so add-to-home-screen
  launches full-screen and works offline in the booth.
- **Phase 5 — Quick-jump search:** client-side filter over the page index, spanning
  campuses. The index is already the `NAV` array.
- **Phase 5 — All-team Sunday page, per campus:** one cross-discipline run of show — who
  fires what, in order, across all four seats. Possible once a campus has audio + lighting.
- **Phase 5 — Print styles:** a laminated-card `@media print` pass for startup procedures
  and the capture worksheets.
- **Shared standards in the Playbook:** beyond the method pages, the genuinely identical
  facts. Clock Standards is candidate #1; show-calling vocabulary is candidate #2. Neither
  moves until Toronto's capture confirms it's actually shared.
- **Off GitHub Pages:** the vault record wants this on something like Cloudflare with a
  general password, so the site isn't publicly indexed. Not in `ROADMAP.md` yet, not
  started, and it's a hosting change rather than a structural one.

? If you want a fifth seat (Directing / Show Calling, ProPresenter / Graphics), add it
here as a block and say which campus — I'll scaffold it from the blank-campus kit.
