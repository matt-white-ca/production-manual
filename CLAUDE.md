# CLAUDE.md — Production Manual (Elevation production platform)

Context for Claude Code sessions working in this repo. Read this first.

> **Renamed 2026-07-13:** this repo was `tea-production-redesign` until the v3
> expansion; it is now `production-manual` and the local folder is
> `~/Code/production-manual`. A stub repo at the old name redirects old Pages
> bookmarks. The vault record and Drive folder keep the old project name.

## What this project is

The production reference for **Elevation Canada** — every campus, every discipline, plus
a playbook for turning what Matt knows into something institutional. Two campuses are
wired up today: **Toronto East** (`tea`) and **Toronto** (`tor`).

Only one room is actually documented so far: **Toronto East video**. That campus ran on a
mobile fly pack that has been relocated into a **permanent install in Whitby** (River's
master control room — Elevation shares the venue with "River," another church). Elevation
keeps its own computers on the desk and operates in front of River's gear, keeping the two
setups cleanly separated.

The switcher (ATEM) and Videohub router both support saved-state recall, so the operating
model is: **fire a saved "Elevation start here" configuration, then run the service.**

Everything in the Domain reference section below describes **Toronto East video only**.
None of it is safe to assume about Toronto.

## What's in this repo (v3 — campus-first)

The site is a **campus × discipline** platform. Every room lives at
`<campus>/<discipline>/index.html`, hash-routed to its own subpages, sharing one
stylesheet and one JS shell — never a single monolithic file again.

**Campus codes are permanent and appear in every URL:** `tea` = Toronto East,
`tor` = Toronto.

- **`index.html`** — the campus launcher. Campus groups, each listing that campus's seats.
- **`tea/video/index.html`** — Toronto East Video Engineering. Fully ported, 10 real
  pages: Startup, Signal Flow, Sunday Run of Show, Clock Standards, Diagnose a Symptom,
  M/E Bus Map, Key Layers, Input Cross-Points, Output Cross-Points, Unverified/Gaps.
  **This is the worked example** every other room is written against.
- **`tea/audio/`, `tea/lighting/`** — scaffolds: one real hub page each, listing planned
  subpages and what to bring. **Toronto East has no camera seat** — a decision
  (2026-07-26), not a gap. Don't create one.
- **`tor/video/`, `tor/audio/`, `tor/lighting/`, `tor/cameras/`** — Toronto scaffolds.
  First capture pass landed 2026-08-25: `tor/video/` has real Resolume pages (comp map,
  timecode & MIDI, diagnostics) and `tor/audio/` has the click system and its first
  diagnostics (DiGiCo SD9 + D2-Rack head-amp recovery, SuperRack clocking). Lighting and
  cameras still empty.
- **`playbook/index.html`** — the campus-agnostic layer and the only shared content
  section: the three page shapes, capture worksheets, writing rules, blank-campus kit.
  **`#playbook-newcampus` is the authoritative procedure for adding a campus.**
- **`video/`, `audio/`, `lighting/`, `cameras/`** (repo root) — redirect stubs for
  pre-restructure bookmarks. They carry the deep-link hash across. Never put content in
  them; `/cameras/` has no equivalent and lands on the launcher.
- **`assets/production.css`** — the one shared stylesheet. Content edits never touch it.
- **`assets/app.js`** — the shared shell: a `CAMPUS` map, a `NAV` array (add a page = one
  entry here), the rail/tab-bar renderer, the hash router, breadcrumbs, the light/dark
  toggle, and the fuzzy site search (runtime-indexed from the real pages — no index file
  exists or needs regenerating; symptom accordions rank first and open on arrival).
  Content edits touch only the `NAV` array, nothing else in it.
- **`docs/MAINTENANCE.md`** — **read this before touching content.** The content-editing
  contract: what's safe to edit, recipes for common changes, writing rules, verify steps.
- **`docs/SITEMAP.md`** — the whole site in editable form. Matt edits it; the edits get
  applied back to the real pages. Regenerate it after any structural change.
- **`templates/`** — copy-paste-verbatim blocks for every repeating pattern (procedure
  step, symptom accordion, hub page-card, whole subpage). New content starts here.
- **`design/mockup-v2.html`** — the frozen design reference. Never edited; the approved
  direction ("lights down": dark default with a switchable light background, one
  brand-neon tally per discipline, Eina semibold headings over Helvetica Now/Neue body
  at regular weight — never Avenir — and the three-square logomark) is realized in the
  real site above, not in this file.
- **`ROADMAP.md`** — phases, target architecture, and the design-decisions log with the
  reasoning behind each call.
- **`v1/index.html`** — the retired single-file site, kept verbatim for history.
- **`Production_Logo_Square.png`, `Production_Logo-01.png`** — source logo assets; the
  site reproduces the mark as inline SVG rather than loading these.
- **`ElevationProduction_BrandGuide_v1.pdf`** — inspiration, not law.
- **`README.md`** — short repo readme with the live URL.

## Publish workflow (important)

The site is served by **GitHub Pages** from the repo root on `main` — every HTML file
above is a real path Pages serves directly (`/video/`, `/audio/`, etc. all resolve via
their `index.html`). To publish a change:

1. Edit the file(s) — see `docs/MAINTENANCE.md` for what's safe to touch and how.
2. Commit + push to `main`.
3. Pages redeploys automatically (~1 min), same URL.

**Live URL:** https://matt-white-ca.github.io/production-manual/
**GitHub repo:** https://github.com/matt-white-ca/production-manual (public)
**Old URL** (pre-2026-07-13): https://matt-white-ca.github.io/tea-production-redesign/
— still works via a stub redirect repo; don't publish it anywhere new.

Commit trailer convention used here:
```
Co-Authored-By: Claude <noreply@anthropic.com>
```
Only commit/push when the user asks.

### History note — the old claude.ai Artifact
This page began life as a claude.ai Artifact (URL:
https://claude.ai/code/artifact/109f4847-39e6-443d-8167-80d4e241fae6) and there was once
a copy of the HTML in the Drive folder. Both are now **downstream / superseded** — the
repo is authoritative (see `v1/index.html` for the single-file version that superseded
the Artifact, and the file map above for the current v2 platform). The Drive folder
holds a `.webloc` shortcut that just points at the live Pages URL. Don't try to keep the
old artifact in sync unless asked.

## Related locations (outside the repo)

- **Vault project record:** `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/mattOS Vault/01_Atlas/Active/production-knowledge-base.md`
  (the successor project record — Why/Outcome, Log, cross-links. The original
  `tea-production-redesign.md` record is archived under `01_Atlas/Archive/2026/`.)
- **Drive folder (source materials & collaborative artifacts):**
  `~/My Drive/01_Project_Files/tea-production-redesign` — contains the routing sheets,
  the ATEM/Videohub manuals, the "Elevation Start Here" switcher XML states, `VideoHub
  Macros.png`, and two standalone markdown docs (`Signal Flow & Diagnostic Reference.md`,
  `Loading Profile 44 - ATEM Advanced Panel.md`). These markdown docs are earlier
  standalone versions of content now consolidated in `index.html`.

### Reading the manuals
The Drive folder has large PDF manuals (ATEM Constellation ~2250 pages, Videohub 12G ~755
pages). `pdftotext`/`mutool` are not installed. To search them, use a Python venv with
pymupdf:
```
python3 -m venv /tmp/pdfvenv && /tmp/pdfvenv/bin/pip install pymupdf
/tmp/pdfvenv/bin/python -c "import fitz; ..."   # load_page(i).get_text()
```

## Domain reference (so you understand what you're editing)

Full detail is in `tea/video/index.html`. Quick primer:

### Terminology (show-calling shorthand)
- **"Resolume"** always means **ME4** — the full-screen DVE-expanded version of the raw
  Resolume feed. Never the raw EC2 source.
- **"Uplink"** = the broadcast join with the North Carolina main campus, carried on
  **Resi**, cut in full-screen (no DVE step).
- **"CG1 full screen"** = CG1 cut directly as the ME3 source, not keyed.
- **Elevation vs River** = the two churches sharing the venue. "River macros" restore
  River's general state; "Elevation macros" apply our specific routing.

### Two signal-flow lanes
- **Lane A — switched:** source → ATEM M/E → Videohub loopback → destination.
  ME1→Makito (capture, always Cam 1), ME2→Lobby (top bus), ME3→Main Screen (bottom bus,
  live switch), ME4 = utility bus that expands raw Resolume full-screen via DVE Key 1.
- **Lane B — direct crosspoint (ATEM not involved):** Ground Panels (raw Resolume IN 35),
  confidence monitors, and the Sonifex audio de-embeds go straight through the Videohub.
  Fastest triage question: *which lane is the broken destination on?*

### Keys on ME3 / ME4
- ME3 **Key 1** = luma, CG1 lyrics centre screen (local worship).
- ME3 **Key 2** = luma, CG1 lyrics top-right (used during Uplink so lyrics stay visible).
- ME4 **Key 1** = DVE, expands raw Resolume to full screen.

### Startup procedure (5 steps, in `tea/video/index.html#video-startup`)
1. **Power** — Furman (venue devices) → Middle Atlantic conditioner → boot Resi decoder +
   console interface. **Also physically reconnect power to the ATEM Advanced Panel** —
   the venue disconnects it and it has **no power switch** (boots on connection).
2. **Connect** — HDMI from each **Elevation Macbook** to its AJA ROI converter (stacked
   under the desk). Match by SDI cable colour (labels pending): **white → Resolume /
   IN 35, yellow → CG2 / IN 36, orange → CG1 / IN 37**.
3. **ATEM** — restore **Profile 44** on the Advanced Panel (PROFILE → right arrow → knob
   to 44 → RESTORE). Profile 44 was saved on the physical panel; trust it exists even
   though the published manual claims a 10-profile limit (firmware exceeds it).
4. **Videohub macros** — on the 40x40 12G front panel each macro button lights green,
   then press **TAKE**. Standard startup = **STREAM → TAKE, CAM → TAKE** (Elevation ×2).
   After a dicey rental, run **MON / DECK / EDIT** (River ×3) first, then the Elevation
   macros on top.
5. **Verify** — use the Videohub front-panel video preview to confirm each Macbook landed
   on the right input (IN 35/36/37).

### Known gaps (in the routing sheet, not yet resolved)
- OUT 21 **Side Screens** — source crosspoint not filled in.
- OUT 32–37 **Control Room TVs 1–6** — sources unfilled (likely a multiview out).
- OUT 38 **ASUS ProArt (TD1)** — source unfilled.

## Working conventions

- **Content changes go through `docs/MAINTENANCE.md` + `templates/`.** Read the
  maintenance doc before editing any discipline file — it has the rules, recipes, and
  verify checklist. Don't hand-roll new markup patterns; copy from `templates/`.
- **`assets/production.css` and `assets/app.js` are structural, not content.** The only
  content-shaped edit allowed in either is adding one line to the `NAV` array in
  `assets/app.js` when a new page ships.
- **Keep it self-contained** — no external fonts/scripts/CDNs across any file; every
  page must open offline.
- When content changes, that's a repo edit + push (which republishes), not an artifact
  update.
- The user (Matt White, mwhite@elevationchurch.ca) is the church's production lead and
  knows this gear deeply — write at that level; use the room's vocabulary.
- **The site is a resource for pros, not ground-up training.** It documents this room,
  not the craft: never explain what an M/E, crosspoint, DMX universe, or gain stage is.
  Every page answers "what do I do at this desk, right now."
