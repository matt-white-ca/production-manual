# SITEMAP.md — the site as it stands, in editable form

**Generated 2026-07-25** against `main` @ `8cd0c54`. This is a working document: edit it
freely and hand it back, and the edits get applied to the real site.

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
| **Split a page in two** | Duplicate the block, add `split from: <id>` to the new one, and divide the `contents:` bullets between them. |
| **Change what's on a page** | Edit the `contents:` bullets. Add, delete, reword — that's the content spec. |
| **Flag something you're unsure about** | Start the line with `?` — I'll ask instead of guessing. |

Anything you write in a `notes:` line is instruction to me, not site copy.

**Field meanings**

- `id:` — the URL hash (`/video/#video-clocks`) and the anchor other pages link to.
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
- **Structure:** one HTML file per discipline, hash-routed to its subpages. `/video/`,
  `/audio/`, `/lighting/`, `/cameras/`, plus `/` for home.
- **Chrome:** left rail (desktop) + bottom tab bar (mobile), both generated from one `NAV`
  array in `assets/app.js`. Breadcrumbs and page titles come from each view's `data-crumb`.
- **Shared:** one stylesheet (`assets/production.css`), one script, no external anything —
  every page opens offline.
- **Voice:** written for pros who know the craft. Documents *this room*, not the discipline.
- **Frozen, not in the map:** `/v1/` (retired single-page site, linked from the home footer)
  and `design/mockup-v2.html`.

---

## Level 0 — Home

`index.html` · rail label **Home** · `id: home`

- **Hero:** "Elevation Toronto East" → `production` wordmark → *"Every seat in the booth, one
  reference. Startup, signal flow, and symptom-based fixes for the whole team."*
- **Quickstart banner:** "Sunday? Start here." → jumps to Video Startup Procedure.
  ? This points at video only. If Sunday should start somewhere cross-discipline, say so.
- **Launcher:** four discipline cards, each with a status chip and page count.
- **Footer:** scaffold explainer + the `/v1/` archive link.

| Card | Tagline | Blurb | Status |
|---|---|---|---|
| Video Engineering | Switch, route, capture | ATEM, Videohub, graphics computers, Resi — the switched paths and the direct crosspoints. | Live · 10 pages |
| Audio | Console, patch, monitors | Front of house and broadcast mix, wireless, IEMs, and the Sonifex de-embed paths. | Scaffold · 4 planned |
| Lighting | Rig, looks, cues | Console startup, the shared-venue rig, service looks, and house light control. | Scaffold · 4 planned |
| Cameras | Builds, shots, comms | Camera settings and builds, positions and shot language, tally and talkback. | Scaffold · 4 planned |

---

## Level 1 — Video Engineering · `/video/` · **LIVE**

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
- `linked from:` Audio hub, Cameras hub

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
- `notes:` Deliberately campus-agnostic — no room wiring in it. Candidate to promote into
  the shared playbook layer rather than living under Video forever.

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

---

## Level 1 — Audio · `/audio/` · **SCAFFOLD**

Hub: `id: audio` · h1 **Console, Patch, Monitors** · lead *"Front of house, broadcast,
wireless, and the de-embed paths that hand audio to video."*
Scaffold note on the hub says what to bring; cross-links to Video Signal Flow for the
Sonifex de-embeds.

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

---

## Level 1 — Lighting · `/lighting/` · **SCAFFOLD**

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

## Level 1 — Cameras · `/cameras/` · **SCAFFOLD**

Hub: `id: cameras` · h1 **Builds, Shots, Comms** · lead *"Camera settings, positions and
shot language, tally and talkback."*
Scaffold note anchors on the existing constraint: Cam 1 is always the ME1 → Makito source.

### 1. Builds & Settings
- `id:` cameras-builds *(not yet created)* · `rail:` Builds & Settings
- `card:` Builds & Settings — Per-camera build: lens, paint, frame rate, and SDI return.
- `shape:` reference · `status:` scaffold
- `contents:` ? models & counts · per-camera build cards

### 2. Positions & Shot Sheet
- `id:` cameras-positions *(not yet created)* · `rail:` Positions & Shot Sheet
- `card:` Positions & Shot Sheet — Where each op stands and the shot vocabulary the director calls.
- `shape:` reference · `status:` scaffold
- `contents:` ? positions · shot vocabulary as the director calls it

### 3. Tally & Comms
- `id:` cameras-tally *(not yet created)* · `rail:` Tally & Comms
- `card:` Tally & Comms — Tally source, talkback channels, and who hears whom.
- `shape:` reference · `status:` scaffold
- `contents:` ? tally source · comms channels · who hears whom

### 4. Diagnose a Symptom
- `id:` cameras-diagnostics *(not yet created)* · `rail:` Diagnose a Symptom
- `card:` Diagnose a Symptom — No signal, no tally, no comms — checklists.
- `shape:` diagnose · `status:` scaffold
- `contents:` ? top five failures

---

## Cross-links between pages (the graph, not the tree)

The tree above is navigation. These are the sideways links that make it a reference:

| From | To | Why |
|---|---|---|
| Home quickstart | Video → Startup Procedure | The Sunday entry point |
| Video Diagnose (Main Screen) | Video → Input Cross-Points | "if PGM is wrong, go upstream" |
| Audio hub | Video → Signal Flow | Sonifex de-embeds live on Lane B |
| Cameras hub | Video → Signal Flow | Cam 1 = ME1 → Makito constraint |

? Worth adding, if you agree: Clock Standards ↔ Sunday Run of Show (the run of show says
what's on the screens, the clock page says what's on the clock at the same moments).

---

## Levels that don't exist yet

Planned in `ROADMAP.md`, not built. Included so you can re-map *into* them.

- **Level 0 becomes a campus launcher.** Paths gain a campus segment —
  `east/video/`, `<campus2>/video/`. Every discipline above moves down one level;
  redirects stay behind at the old paths. Blocked on: naming campus 2 and its rooms.
- **A playbook layer** (`playbook/`) — campus-agnostic: the three page shapes, capture
  worksheets, the writing rules, the blank-campus kit. Anything genuinely identical across
  campuses lives here once and both campuses link to it. **Clock Standards is the first
  real candidate.**
- **An all-team Sunday page, per campus** — one cross-discipline run of show: who fires
  what, in order, across all four seats. Possible once a campus has audio + lighting live.
- **Search and PWA** — quick-jump filter over the page index; offline install for the booth.

? If you want a fifth discipline seat (Directing / Show Calling, ProPresenter / Graphics),
add it here as a block and I'll scaffold it the same way as the other three.
