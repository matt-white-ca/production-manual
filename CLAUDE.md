# CLAUDE.md — Toronto East Production Redesign

Context for Claude Code sessions working in this repo. Read this first.

## What this project is

Video production reference for **Elevation Toronto East**. The campus ran on a mobile
fly pack that has been relocated into a **permanent install in Whitby** (River's master
control room — Elevation shares the venue with "River," another church). Elevation keeps
its own computers on the desk and operates in front of River's gear, keeping the two
setups cleanly separated.

The switcher (ATEM) and Videohub router both support saved-state recall, so the operating
model is: **fire a saved "Elevation start here" configuration, then run the service.**

## What's in this repo

- **`index.html`** — the deliverable. A self-contained (no external deps, works offline)
  operator reference covering: **startup procedure, signal flow, Sunday run of show, and
  symptom-based diagnostics**. This file **is the single source of truth** for the
  published page.
- **`README.md`** — short repo readme with the live URL.

## Publish workflow (important)

The page is served by **GitHub Pages** from `index.html` on `main`. To publish a change:

1. Edit `index.html`
2. Commit + push to `main`
3. Pages redeploys automatically (~1 min), same URL

**Live URL:** https://matt-white-ca.github.io/tea-production-redesign/
**GitHub repo:** https://github.com/matt-white-ca/tea-production-redesign (public)

Commit trailer convention used here:
```
Co-Authored-By: Claude <noreply@anthropic.com>
```
Only commit/push when the user asks.

### History note — the old claude.ai Artifact
This page began life as a claude.ai Artifact (URL:
https://claude.ai/code/artifact/109f4847-39e6-443d-8167-80d4e241fae6) and there was once
a copy of the HTML in the Drive folder. Both are now **downstream / superseded** — the
repo `index.html` is authoritative. The Drive folder holds a `.webloc` shortcut that just
points at the live Pages URL. Don't try to keep the old artifact in sync unless asked.

## Related locations (outside the repo)

- **Vault project record:** `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/mattOS Vault/01_Atlas/Active/tea-production-redesign.md`
  (the project's Why/Outcome, Log, and cross-links live here)
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

Full detail is in `index.html`. Quick primer:

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

### Startup procedure (5 steps, in `index.html`)
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

- **Deliverable = `index.html`.** Edit it directly; it's hand-authored HTML/CSS with
  inline styles, theme-aware (light/dark), and a top nav that jumps to each section.
- **Keep it self-contained** — no external fonts/scripts/CDNs; it must open offline.
- When content changes, that's a repo edit + push (which republishes), not an artifact
  update.
- The user (Matt White, mwhite@elevationchurch.ca) is the church's production lead and
  knows this gear deeply — write at that level; use the room's vocabulary.
