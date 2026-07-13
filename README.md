# Production Manual

Production platform for **Elevation Toronto East** — the permanent install in Whitby
(relocated from the mobile fly pack). Covers Video Engineering, Audio, Lighting, and
Cameras: startup procedures, signal flow, and symptom-based diagnostics for the whole
production team.

## What's here

- **`index.html`** — home / platform launcher.
- **`video/`** — Video Engineering: startup, signal flow, Sunday run of show, symptom
  diagnostics, and the full routing/key/cross-point reference. Fully built out.
- **`audio/`, `lighting/`, `cameras/`** — scaffolds, awaiting source material.
- **`assets/`** — the one shared stylesheet and JS shell every page uses.
- **`v1/`** — the retired single-file version of this site, kept for history.

Self-contained across every page (no external dependencies), works offline, deployable
as a static site.

## Published page

This repo publishes the site as-is (GitHub Pages, served from the repo root on `main`).
The live URL is the single, no-login link operators can open on any device in the venue:

**https://matt-white-ca.github.io/production-manual/**

(The repo was renamed from `tea-production-redesign` on 2026-07-13; a stub repo at the
old name redirects old bookmarks — including deep links — to the URL above.)

## Related

- **Project record (vault):** `01_Atlas/Active/tea-production-redesign.md`
- **Drive folder (collaborative artifacts):** `01_Project_Files/tea-production-redesign` — source routing sheets, ATEM/Videohub manuals, switcher XML states, and markdown reference docs.

## Editing

Read **`docs/MAINTENANCE.md`** first — it's the contract for what's safe to edit and how.
In short: content lives in each discipline's `index.html`; `assets/production.css` and
`assets/app.js` are structural and shouldn't change for a content edit. Commit and push
to `main` — Pages redeploys automatically.
