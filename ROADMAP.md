# Roadmap — production platform v2

Expansion of the Toronto East reference site from a single video-engineering page
into a four-discipline team platform: **Video Engineering · Audio · Lighting · Cameras**.

- **Status: Phase 1 shipped 2026-07-07.** The site described below as "target
  architecture" is now the real, built site — see `CLAUDE.md`'s file map. Phase 2
  (content authoring for Audio/Lighting/Cameras) is next, whenever Matt has source
  material for a discipline.
- **Approved direction:** `design/mockup-v2.html` — the "lights down" design, frozen as
  a reference. The real site realizes it; the mockup file itself is never edited again.
- **Executor:** phases below are written so a future Claude session (including smaller
  models) can pick up any phase cold. Phase 1 wants a capable model; phases 2+ are
  deliberately shaped so less capable models can run them using `docs/MAINTENANCE.md`
  and `templates/`.
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

---

## Target architecture (the "works well before investing" answer)

One discipline = one HTML file. Shared skin = one CSS file. Shared shell = one JS file.
**This is now the real, built layout** — not a plan:

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

Why this shape (it exists to serve goal 4):
- **Blast radius.** An audio edit physically cannot break video. v1's single file is
  already 2,000 lines; ×4 disciplines it becomes un-editable by a small model.
- **One source of truth for chrome.** Tab bar + rail are injected by `app.js` from a
  single `NAV` array — adding a page means adding one array entry, not editing five files.
  `<noscript>` fallback: plain links at the top of each file.
- **Still offline, still no CDNs.** All assets are relative-path local files; GitHub
  Pages serves them; the folder works from disk. (True offline-after-first-visit
  arrives with the PWA in Phase 3.) The "one self-contained file" property is traded
  away deliberately — the maintainability win is bigger, and the PWA restores offline
  properly.
- Same publish workflow: edit → commit → push to `main` → Pages redeploys.

---

## Phase 1 — Build the platform shell + port video (capable model, ~1 session)

Turn the mockup into the real site. **Done when the live URL serves the v2 platform
with video fully ported and nothing lost.**

1. Move current `index.html` → `v1/index.html` unchanged (bookmark safety net: keep a
   redirect note on the home page for one month).
2. Extract the mockup's CSS → `assets/production.css`; its router → `assets/app.js`
   with the `NAV` config array and chrome injection.
3. Build `index.html` (home) and `video/index.html` from the mockup.
4. **Port all v1 video content** — every section, table, symptom, and gap note:
   Startup · Signal Flow · Run of Show · Diagnostics (all symptoms) · M/E Bus Map ·
   Key Layers · Input Cross-Points · Output Cross-Points · Unverified/Gaps.
   Content is already written — this is re-skinning, not re-authoring.
5. Create `audio/ lighting/ cameras/` hub pages in scaffold state (from mockup).
6. Write `templates/*.html` from the final markup (they exist in draft now — reconcile).
7. Update `docs/MAINTENANCE.md` paths/selectors to match reality; update `CLAUDE.md`
   (new file map, v2 conventions); update `README.md`.
8. Verify per the checklist in `docs/MAINTENANCE.md`, then commit + push **only when
   Matt says go**.

## Phase 2 — Content capture & authoring, one discipline at a time (small-model friendly)

Each discipline ships independently; order = whatever Matt has source material for.
Matt gathers, model authors using `templates/` + `docs/MAINTENANCE.md` recipes only.

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

## Phase 3 — Platform polish (after ≥2 disciplines are live)

- **PWA:** `manifest.webmanifest` + icons + a minimal cache-first service worker →
  add-to-home-screen launches full-screen and **works fully offline in the booth**.
  This is the biggest remaining "platform-first" win and restores the offline guarantee.
- **Quick-jump search:** client-side filter over a static page index (title + keywords
  per view). No dependencies; the index lives in the `NAV` array.
- **All-team Sunday page:** one cross-discipline run-of-show — who fires what, in order,
  across all four seats. Only possible once audio + lighting content exists.
- **Print styles:** a laminated-card `@media print` pass for the startup procedures.

## Phase 4 — Maintenance mode (ongoing, smallest models)

Steady state: facts change (a crosspoint, a frequency, a step), models apply them.
`docs/MAINTENANCE.md` is the contract; keep it ruthlessly current. Any session that
changes markup patterns must update the matching template in the same commit.

---

## Explicitly out of scope (unless Matt asks)

Build tools, frameworks, npm, Markdown-to-HTML pipelines, analytics, CMS, auth.
The platform is hand-authored static files on Pages — that simplicity *is* goal 4.
