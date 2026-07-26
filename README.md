# Production Manual

Production platform for **Elevation Canada** — startup procedures, signal flow, and
symptom-based diagnostics for every production seat, at every campus. Organized
campus-first: each room lives at `<campus>/<discipline>/`.

## What's here

- **`index.html`** — the campus launcher.
- **`tea/`** — **Toronto East**, the permanent install in Whitby (relocated from the
  mobile fly pack). `tea/video/` is fully built out: startup, signal flow, Sunday run of
  show, clock standards, symptom diagnostics, and the full routing/key/cross-point
  reference. `tea/audio/` and `tea/lighting/` are scaffolds awaiting source material.
  Toronto East has no camera seat, by design.
- **`tor/`** — **Toronto**: video, audio, lighting, and cameras, all scaffolds. Nothing
  captured yet.
- **`playbook/`** — how a room gets documented: the three page shapes, capture
  worksheets, writing rules, and the kit for scaffolding a campus that doesn't exist yet.
  The only campus-agnostic section.
- **`video/`, `audio/`, `lighting/`, `cameras/`** — redirect stubs for bookmarks made
  before the 2026-07-26 campus restructure. They carry deep-link hashes across.
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

- **Project record (vault):** `01_Atlas/Active/production-knowledge-base.md`
- **Drive folder (collaborative artifacts):** `01_Project_Files/tea-production-redesign` — source routing sheets, ATEM/Videohub manuals, switcher XML states, and markdown reference docs.

## Editing

Read **`docs/MAINTENANCE.md`** first — it's the contract for what's safe to edit and how.
In short: content lives in each room's `index.html`; `assets/production.css` and
`assets/app.js` are structural and shouldn't change for a content edit. Commit and push
to `main` — Pages redeploys automatically.

**`docs/SITEMAP.md`** is the whole site in editable form — rename, reorder, add, cut, or
split pages by editing that file and handing it back. Adding a whole campus has its own
procedure, on the site itself at `playbook/#playbook-newcampus`.
