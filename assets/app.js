/* ==========================================================================
   app.js — shared shell, v2 (2026-07-07)
   Elevation Toronto East · production platform

   One file, one job: render the rail (desktop) and tab bar (mobile) from
   the NAV array below, run the hash router for the current page's views,
   inject breadcrumbs, and handle the light/dark switch.

   docs/MAINTENANCE.md rule 2: adding a page = one NAV entry here, not five
   edited files. Everything else in this file is plumbing — leave it alone
   for a content change.

   Path model (campus-first since 2026-07-26): a page sits at one of three
   depths. Each HTML file declares depth, campus, and discipline once, on
   <html>:
     <html data-depth="0" data-disc="home">                  (root launcher)
     <html data-depth="1" data-disc="playbook">              (campus-agnostic)
     <html data-depth="2" data-campus="tea" data-disc="video">  (a room)
   That's the only per-file wiring content pages need — this script reads
   it to build correct relative links from any depth.

   Campus codes are permanent: `tea` = Toronto East, `tor` = Toronto. A
   campus lists its own disciplines, because they differ — Toronto East has
   no camera seat, and that is intentional, not a gap waiting to be filled.
   ========================================================================== */
(function () {
  "use strict";

  var ROOT = document.documentElement;
  var DEPTH = new Array(parseInt(ROOT.getAttribute("data-depth"), 10) || 0).fill("../").join("");
  var CURRENT_DISC = ROOT.getAttribute("data-disc") || "home";
  var CURRENT_CAMPUS = ROOT.getAttribute("data-campus") || "";
  var CURRENT_FILE =
    CURRENT_DISC === "home" ? "index.html" :
    CURRENT_CAMPUS ? CURRENT_CAMPUS + "/" + CURRENT_DISC + "/index.html" :
    CURRENT_DISC + "/index.html";

  /* CAMPUS — add a campus by adding one entry here (plus its folders and
     NAV rows). `discs` is the campus's real seat list, in rail order —
     main-room seats first, then perimeter rooms (eKidz etc.), whose NAV
     rows carry `section: "Perimeter"`. */
  var CAMPUS = {
    tea: { label: "Toronto East", short: "East", discs: ["video", "audio", "lighting"] },
    tor: { label: "Toronto", short: "Toronto", discs: ["video", "audio", "lighting", "cameras", "ekidz"] }
  };

  var HUB_HASH = {
    home: "home",
    playbook: "playbook",
    video: "video",
    audio: "audio",
    lighting: "lighting",
    cameras: "cameras",
    ekidz: "ekidz"
  };

  var DISC_LABEL = {
    playbook: "The Playbook",
    video: "Video Engineering",
    audio: "Audio",
    lighting: "Lighting",
    cameras: "Cameras",
    ekidz: "eKidz Elementary"
  };

  /* Bottom tab bar has room for one word; everything else derives from
     DISC_LABEL's first word. */
  var TAB_LABEL = { home: "Home", playbook: "Playbook" };

  /* NAV — single source of truth for the rail + tab bar. To add a page:
     add one entry with the right campus/file/hash/label, in the position
     you want it to appear in the rail. `pending: true` renders it dimmed
     and points it at the discipline hub — flip to a real hash once the
     page exists. Rows with no `campus` are platform-level (home, playbook)
     and show on every campus. A `section` field puts a seat under a rail
     heading — "Perimeter" for rooms outside the main auditorium. Keep a
     section's rows together, after the main-room seats. */
  var NAV = [
    { disc: "home", file: "index.html", hash: "home", label: "Home" },

    /* ---- Toronto East ---------------------------------------------- */
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video", label: "Overview" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-startup", label: "Startup Procedure" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-flow", label: "Signal Flow" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-rundown", label: "Sunday Run of Show" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-clocks", label: "Clock Standards" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-diagnostics", label: "Diagnose a Symptom" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-me-bus", label: "M/E Bus Map" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-keys", label: "Key Layers" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-inputs", label: "Input Cross-Points" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-outputs", label: "Output Cross-Points" },
    { campus: "tea", disc: "video", file: "tea/video/index.html", hash: "video-gaps", label: "Unverified / Gaps" },

    { campus: "tea", disc: "audio", file: "tea/audio/index.html", hash: "audio", label: "Overview" },
    { campus: "tea", disc: "audio", file: "tea/audio/index.html", hash: "audio", label: "Console Startup", pending: true },
    { campus: "tea", disc: "audio", file: "tea/audio/index.html", hash: "audio", label: "Patch & Gain", pending: true },
    { campus: "tea", disc: "audio", file: "tea/audio/index.html", hash: "audio", label: "Wireless & IEMs", pending: true },
    { campus: "tea", disc: "audio", file: "tea/audio/index.html", hash: "audio", label: "Diagnose a Symptom", pending: true },

    { campus: "tea", disc: "lighting", file: "tea/lighting/index.html", hash: "lighting", label: "Overview" },
    { campus: "tea", disc: "lighting", file: "tea/lighting/index.html", hash: "lighting", label: "Console Startup", pending: true },
    { campus: "tea", disc: "lighting", file: "tea/lighting/index.html", hash: "lighting", label: "Rig & Patch", pending: true },
    { campus: "tea", disc: "lighting", file: "tea/lighting/index.html", hash: "lighting", label: "Looks & Cue Stack", pending: true },
    { campus: "tea", disc: "lighting", file: "tea/lighting/index.html", hash: "lighting", label: "Diagnose a Symptom", pending: true },

    /* Toronto East has no cameras seat — intentional, not a missing row. */

    /* ---- Toronto ---------------------------------------------------- */
    { campus: "tor", disc: "video", file: "tor/video/index.html", hash: "video", label: "Overview" },
    { campus: "tor", disc: "video", file: "tor/video/index.html", hash: "video", label: "Startup Procedure", pending: true },
    { campus: "tor", disc: "video", file: "tor/video/index.html", hash: "video", label: "Signal Flow", pending: true },
    { campus: "tor", disc: "video", file: "tor/video/index.html", hash: "video", label: "Sunday Run of Show", pending: true },
    { campus: "tor", disc: "video", file: "tor/video/index.html", hash: "video-resolume", label: "Resolume Comp Map" },
    { campus: "tor", disc: "video", file: "tor/video/index.html", hash: "video-resolume-control", label: "Resolume Timecode & MIDI" },
    { campus: "tor", disc: "video", file: "tor/video/index.html", hash: "video-diagnostics", label: "Diagnose a Symptom" },

    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio", label: "Overview" },
    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio", label: "Console Startup", pending: true },
    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio", label: "Patch & Gain", pending: true },
    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio", label: "Wireless & IEMs", pending: true },
    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio-click", label: "Click System" },
    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio-diagnostics", label: "Diagnose a Symptom" },

    { campus: "tor", disc: "lighting", file: "tor/lighting/index.html", hash: "lighting", label: "Overview" },
    { campus: "tor", disc: "lighting", file: "tor/lighting/index.html", hash: "lighting", label: "Console Startup", pending: true },
    { campus: "tor", disc: "lighting", file: "tor/lighting/index.html", hash: "lighting", label: "Rig & Patch", pending: true },
    { campus: "tor", disc: "lighting", file: "tor/lighting/index.html", hash: "lighting", label: "Looks & Cue Stack", pending: true },
    { campus: "tor", disc: "lighting", file: "tor/lighting/index.html", hash: "lighting", label: "Diagnose a Symptom", pending: true },

    { campus: "tor", disc: "cameras", file: "tor/cameras/index.html", hash: "cameras", label: "Overview" },
    { campus: "tor", disc: "cameras", file: "tor/cameras/index.html", hash: "cameras", label: "Builds & Settings", pending: true },
    { campus: "tor", disc: "cameras", file: "tor/cameras/index.html", hash: "cameras", label: "Positions & Shot Sheet", pending: true },
    { campus: "tor", disc: "cameras", file: "tor/cameras/index.html", hash: "cameras", label: "Tally & Comms", pending: true },
    { campus: "tor", disc: "cameras", file: "tor/cameras/index.html", hash: "cameras", label: "Diagnose a Symptom", pending: true },

    /* ---- Toronto · Perimeter --------------------------------------- */
    { campus: "tor", section: "Perimeter", disc: "ekidz", file: "tor/ekidz/index.html", hash: "ekidz", label: "Overview" },
    { campus: "tor", section: "Perimeter", disc: "ekidz", file: "tor/ekidz/index.html", hash: "ekidz-startup", label: "Video Startup" },

    /* ---- Platform-level (no campus) --------------------------------- */
    { disc: "playbook", file: "playbook/index.html", hash: "playbook", label: "Overview" },
    { disc: "playbook", file: "playbook/index.html", hash: "playbook-shapes", label: "The Three Page Shapes" },
    { disc: "playbook", file: "playbook/index.html", hash: "playbook-capture", label: "Capture Worksheets" },
    { disc: "playbook", file: "playbook/index.html", hash: "playbook-writing", label: "Writing Rules" },
    { disc: "playbook", file: "playbook/index.html", hash: "playbook-newcampus", label: "Blank-Campus Kit" }
  ];

  var ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>',
    audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v4M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 6v2M12 16v2M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 6v0M20 12v6M20 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>',
    lighting: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.7 1 1.6 1 2.5h6c0-.9.2-1.8 1-2.5A6 6 0 0 0 12 3Z"/></svg>',
    cameras: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    ekidz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="11" rx="1.5"/><path d="M2 20h20M6 20v-2.5M18 20v-2.5"/></svg>',
    playbook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5Z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5Z"/></svg>'
  };

  var LOGOMARK = '<svg class="logomark" viewBox="0 0 3 2" aria-hidden="true">' +
    '<rect x="0" y="1" width="1" height="1" fill="#00fffc"/>' +
    '<rect x="1" y="0" width="1" height="1" fill="#47ff91"/>' +
    '<rect x="2" y="1" width="1" height="1" fill="#fdb2ff"/></svg>';

  function href(item) {
    return DEPTH + item.file + "#" + item.hash;
  }

  /* A row belongs in this rail if it is platform-level (no campus) or it
     belongs to the campus whose room we are standing in. */
  function inScope(item) {
    return !item.campus || item.campus === CURRENT_CAMPUS;
  }

  function renderRail() {
    var rail = document.getElementById("rail");
    if (!rail) return;

    var groups = [];
    var byDisc = {};
    var sectionOf = {};
    NAV.filter(inScope).forEach(function (item) {
      if (!byDisc[item.disc]) {
        byDisc[item.disc] = [];
        groups.push(item.disc);
        sectionOf[item.disc] = item.section || "";
      }
      byDisc[item.disc].push(item);
    });

    var campusLabel = CURRENT_CAMPUS && CAMPUS[CURRENT_CAMPUS] ? CAMPUS[CURRENT_CAMPUS].label : "Every Campus";
    var html = '<a class="wordmark-sm" href="' + DEPTH + 'index.html">' + LOGOMARK + "production</a>" +
      '<a class="campus" href="' + DEPTH + 'index.html#home">' + campusLabel + "</a><hr class=\"rail-rule\"><nav>";

    var section = "";
    groups.forEach(function (disc) {
      if (sectionOf[disc] !== section) {
        /* entering a section prints its heading; leaving one prints a bare
           rule, so platform rows (the playbook) never read as part of it */
        html += sectionOf[disc]
          ? '<div class="rail-section">' + sectionOf[disc] + "</div>"
          : '<div class="rail-section" aria-hidden="true"></div>';
      }
      section = sectionOf[disc];
      html += '<div class="rail-group" data-disc="' + disc + '">';
      if (disc !== "home") {
        html += '<div class="rail-head"><span class="tally"></span>' + DISC_LABEL[disc] + "</div>";
      }
      byDisc[disc].forEach(function (item) {
        var cls = "rl" + (item.pending ? " pending" : "");
        html += '<a class="' + cls + '" href="' + href(item) + '" data-file="' + item.file +
          '" data-hash="' + item.hash + '">' + item.label + "</a>";
      });
      html += "</div>";
    });

    html += "</nav>";
    rail.innerHTML = html;
  }

  function renderTabbar() {
    var bar = document.getElementById("tabbar");
    if (!bar) return;
    /* Tabs follow the campus you are standing in; off-campus (home, the
       playbook) the bar is the platform pair. */
    var order = CURRENT_CAMPUS && CAMPUS[CURRENT_CAMPUS]
      ? ["home"].concat(CAMPUS[CURRENT_CAMPUS].discs)
      : ["home", "playbook"];
    var html = "";
    order.forEach(function (disc) {
      var file =
        disc === "home" ? "index.html" :
        disc === "playbook" ? "playbook/index.html" :
        CURRENT_CAMPUS + "/" + disc + "/index.html";
      var label = TAB_LABEL[disc] || DISC_LABEL[disc].split(" ")[0];
      html += '<a class="tab" href="' + DEPTH + file + "#" + HUB_HASH[disc] + '" data-disc="' + disc + '">' +
        ICONS[disc] + label + "</a>";
    });
    bar.innerHTML = html;
    bar.querySelectorAll("a.tab").forEach(function (t) {
      if (t.dataset.disc === CURRENT_DISC) t.setAttribute("aria-current", "page");
    });
  }

  function currentHash() {
    var h = (location.hash || "").slice(1);
    return h || HUB_HASH[CURRENT_DISC];
  }

  function render() {
    var views = document.querySelectorAll("section.view");
    var id = currentHash();
    var target = document.getElementById(id);
    if (!target || !target.classList.contains("view")) {
      id = HUB_HASH[CURRENT_DISC];
      target = document.getElementById(id);
    }
    views.forEach(function (v) { v.classList.toggle("active", v === target); });

    document.querySelectorAll("#rail a.rl").forEach(function (l) {
      if (l.dataset.file === CURRENT_FILE && l.dataset.hash === id) l.setAttribute("aria-current", "page");
      else l.removeAttribute("aria-current");
    });

    if (!target) return;

    var crumbText = target.dataset.crumb || "";
    var existing = target.querySelector(":scope > .crumb");
    if (crumbText && crumbText.indexOf("/") > -1 && !existing) {
      var parts = crumbText.split("/");
      var nav = document.createElement("nav");
      nav.className = "crumb";
      var hub = document.createElement("a");
      hub.href = DEPTH + CURRENT_FILE + "#" + HUB_HASH[CURRENT_DISC];
      hub.textContent = parts[0].trim();
      var sep = document.createElement("span");
      sep.className = "sep";
      sep.textContent = "›";
      var here = document.createElement("span");
      here.textContent = parts[1].trim();
      nav.appendChild(hub);
      nav.appendChild(sep);
      nav.appendChild(here);
      target.insertBefore(nav, target.firstChild);
    }

    window.scrollTo(0, 0);
    var suffix = CURRENT_CAMPUS && CAMPUS[CURRENT_CAMPUS]
      ? "production · Elevation " + CAMPUS[CURRENT_CAMPUS].label
      : "production · Elevation Canada";
    document.title = (crumbText ? crumbText.split("/").pop().trim() + " — " : "") + suffix;

    applySearchTarget();
  }

  function initTheme() {
    var root = document.documentElement;
    var btn = document.getElementById("theme-btn");
    if (!btn) return;

    function setTheme(t) {
      root.setAttribute("data-theme", t);
      try { localStorage.setItem("tea-theme", t); } catch (e) { /* private browsing */ }
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute("content", t === "light" ? "#f4f5f6" : "#08090b");
    }

    var stored = null;
    try { stored = localStorage.getItem("tea-theme"); } catch (e) { /* private browsing */ }
    setTheme(stored === "light" ? "light" : "dark");

    btn.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
    });
  }

  /* ========================================================================
     Search — fuzzy, campus-scoped, diagnose-first.

     Runtime-indexed: the page you're standing on is indexed from its own
     DOM the moment the overlay opens; every other page in NAV is fetched
     and parsed right after, so a content edit is in the search results the
     moment it's pushed — there is no index to rebuild and nothing external
     to load. On file:// the fetches are skipped and search quietly covers
     just the current page.

     Symptom accordions are indexed individually and boosted above whole
     pages — the diagnose checklists are the site's most valuable pages and
     search exists to put a volunteer inside the right one. Results follow
     the same campus scoping as the rail: standing in a room you see that
     campus plus the playbook, never another campus's wiring.
     ======================================================================== */

  /* --- pure scoring helpers (kept side-effect free for testing) --------- */
  function sNorm(s) {
    return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
  }
  /* Grammatical filler only — "no", "down", "wrong" etc. stay, they carry
     real symptom meaning in this domain ("no click", "inputs way down"). */
  var S_STOP = {};
  ("a an and are as at be but by do does doesnt dont for from has have how i if im in into is it its my of on or our so that the then there this to was we what when why with not"
  ).split(" ").forEach(function (w) { S_STOP[w] = 1; });
  function sTokens(s) {
    var n = sNorm(s);
    if (!n) return [];
    return n.split(" ").filter(function (t) { return !S_STOP[t]; });
  }
  function sUniq(arr) {
    var seen = {}, out = [];
    arr.forEach(function (t) { if (!seen[t]) { seen[t] = 1; out.push(t); } });
    return out;
  }
  /* true if levenshtein(a, b) <= 1 — enough typo tolerance for one slip */
  function sEdit1(a, b) {
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    var i = 0, j = 0, edits = 0;
    while (i < la && j < lb) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (la > lb) i++;
      else if (lb > la) j++;
      else { i++; j++; }
    }
    return edits + (la - i) + (lb - j) <= 1;
  }
  /* how well one query word matches one document word, 0–1 */
  function sTokenScore(qt, dt) {
    if (qt === dt) return 1;
    if (dt.indexOf(qt) === 0) return 0.8;                    /* "pop" → "popping"   */
    if (qt.length >= 4 && qt.indexOf(dt) === 0) return 0.65; /* "resolume" → "reso" */
    if (qt.length >= 4 && sEdit1(qt, dt)) return 0.6;        /* one typo            */
    if (qt.length >= 3 && dt.indexOf(qt) > 0) return 0.5;    /* substring           */
    return 0;
  }
  /* score a doc against the query tokens; 0 = no match */
  function sScore(doc, qts) {
    var total = 0, matched = 0;
    qts.forEach(function (qt) {
      var best = 0, i, v;
      for (i = 0; i < doc.titleT.length; i++) {
        v = sTokenScore(qt, doc.titleT[i]) * 3;
        if (v > best) best = v;
      }
      for (i = 0; i < doc.bodyT.length && best < 3; i++) {
        v = sTokenScore(qt, doc.bodyT[i]);
        if (v > best) best = v;
      }
      if (best > 0) matched++;
      total += best;
    });
    if (!matched) return 0;
    total *= matched / qts.length;   /* stray words cost, they don't zero */
    if (doc.kind === "symptom") total *= 1.6;
    else if (doc.kind === "diagnose") total *= 1.25;
    else if (doc.kind === "hub") total *= 0.8;
    return total;
  }
  /* --- end pure helpers ------------------------------------------------- */

  var searchDocs = [];
  var searchStarted = false;
  var searchActive = 0;

  function docInScope(doc) {
    return !doc.campus || !CURRENT_CAMPUS || doc.campus === CURRENT_CAMPUS;
  }

  function indexView(view, file, campus) {
    var disc = view.getAttribute("data-disc") || "";
    var h1 = view.querySelector("h1");
    var crumb = view.getAttribute("data-crumb") || "";
    var pageTitle = h1 ? h1.textContent.trim()
      : (view.id === "home" ? "Campus launcher" : DISC_LABEL[disc] || "");
    var lead = view.querySelector("p.lead");
    var leadText = lead ? lead.textContent : "";
    var isDiag = !!view.querySelector("details.symptom");

    searchDocs.push({
      file: file, hash: view.id, sym: -1, campus: campus, disc: disc,
      kind: isDiag ? "diagnose" : (crumb ? "page" : "hub"),
      title: pageTitle, pageTitle: pageTitle,
      titleT: sUniq(sTokens(pageTitle + " " + crumb)),
      bodyT: sUniq(sTokens(view.textContent))
    });

    view.querySelectorAll("details.symptom").forEach(function (d, i) {
      var sum = d.querySelector("summary");
      var t = "";
      if (sum) {
        var c = sum.cloneNode(true);
        var lt = c.querySelector(".lane-tag");
        if (lt) lt.parentNode.removeChild(lt);
        t = c.textContent.replace(/\s+/g, " ").trim();
      }
      var body = d.querySelector(".body");
      searchDocs.push({
        file: file, hash: view.id, sym: i, campus: campus, disc: disc,
        kind: "symptom",
        title: t, pageTitle: pageTitle,
        titleT: sUniq(sTokens(t)),
        bodyT: sUniq(sTokens((body ? body.textContent : "") + " " + pageTitle + " " + leadText + " " + crumb))
      });
    });
  }

  function buildIndex() {
    if (searchStarted) return;
    searchStarted = true;

    document.querySelectorAll("section.view").forEach(function (v) {
      indexView(v, CURRENT_FILE, CURRENT_CAMPUS || "");
    });

    if (location.protocol === "file:" || typeof fetch !== "function" ||
        typeof DOMParser !== "function") return;

    var files = {};
    NAV.forEach(function (n) {
      if (n.file !== CURRENT_FILE && !(n.file in files)) files[n.file] = n.campus || "";
    });
    Object.keys(files).forEach(function (f) {
      searchActive++;
      fetch(DEPTH + f).then(function (r) { return r.text(); }).then(function (txt) {
        var doc = new DOMParser().parseFromString(txt, "text/html");
        doc.querySelectorAll("section.view").forEach(function (v) {
          indexView(v, f, files[f]);
        });
      }).catch(function () { /* offline / missing — current page still works */ })
        .then(function () { searchActive--; runQuery(); });
    });
  }

  function searchLayer() { return document.getElementById("search-layer"); }
  function searchInput() { return document.getElementById("search-input"); }

  function resultHref(doc) { return DEPTH + doc.file + "#" + doc.hash; }

  function goToResult(doc) {
    if (doc.sym >= 0) {
      try {
        sessionStorage.setItem("pp-search-sym",
          JSON.stringify({ file: doc.file, hash: doc.hash, sym: doc.sym }));
      } catch (e) { /* private browsing — page still opens, just unopened */ }
    }
    closeSearch();
    if (doc.file === CURRENT_FILE) {
      if (currentHash() === doc.hash) applySearchTarget();
      else location.hash = doc.hash;
    } else {
      location.href = resultHref(doc);
    }
  }

  /* After navigation, open + highlight the symptom a search hit pointed at.
     Called at the end of render() so it works across pages and hashes. */
  function applySearchTarget() {
    var raw = null;
    try { raw = sessionStorage.getItem("pp-search-sym"); } catch (e) { return; }
    if (!raw) return;
    var t = null;
    try { t = JSON.parse(raw); } catch (e) { t = null; }
    if (!t || t.file !== CURRENT_FILE || t.hash !== currentHash()) return;
    try { sessionStorage.removeItem("pp-search-sym"); } catch (e) { /* ignore */ }
    var view = document.getElementById(t.hash);
    if (!view) return;
    var d = view.querySelectorAll("details.symptom")[t.sym];
    if (!d) return;
    d.open = true;
    d.classList.add("search-hit");
    setTimeout(function () { d.classList.remove("search-hit"); }, 2600);
    setTimeout(function () {
      d.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function campusName(code) {
    return code && CAMPUS[code] ? CAMPUS[code].label : "";
  }

  function metaLine(doc) {
    var bits = [];
    if (!CURRENT_CAMPUS && doc.campus) bits.push(campusName(doc.campus));
    if (doc.disc && DISC_LABEL[doc.disc]) bits.push(DISC_LABEL[doc.disc]);
    if (doc.sym >= 0 || doc.title !== doc.pageTitle) bits.push(doc.pageTitle);
    return bits.join(" · ");
  }

  function renderResultRow(doc, onPick) {
    var a = document.createElement("a");
    a.className = "sr";
    a.href = resultHref(doc);
    a.setAttribute("data-disc", doc.disc || "home");
    var meta = document.createElement("div");
    meta.className = "sr-meta";
    var tally = document.createElement("span");
    tally.className = "tally";
    meta.appendChild(tally);
    var mtext = document.createElement("span");
    mtext.textContent = metaLine(doc);
    meta.appendChild(mtext);
    if (doc.kind === "symptom") {
      var tag = document.createElement("span");
      tag.className = "lane-tag";
      tag.textContent = "Symptom";
      meta.appendChild(tag);
    }
    var title = document.createElement("div");
    title.className = "sr-title";
    title.textContent = doc.title;
    a.appendChild(meta);
    a.appendChild(title);
    a.addEventListener("click", function (e) {
      e.preventDefault();
      onPick(doc);
    });
    return a;
  }

  /* Default + no-result state: put the diagnose pages one tap away. */
  function renderDiagnoseShortcuts(box, note) {
    var p = document.createElement("div");
    p.className = "search-note";
    p.textContent = note;
    box.appendChild(p);
    searchDocs.filter(function (d) {
      return d.kind === "diagnose" && d.sym === -1 && docInScope(d);
    }).forEach(function (d) {
      box.appendChild(renderResultRow(d, goToResult));
    });
  }

  function runQuery() {
    var layer = searchLayer();
    if (!layer || layer.hidden) return;
    var box = document.getElementById("search-results");
    var q = (searchInput() && searchInput().value) || "";
    var qts = sTokens(q);
    box.innerHTML = "";
    layer.querySelector(".search-panel").classList.toggle("busy", searchActive > 0);

    if (sNorm(q).length < 2 || !qts.length) {
      renderDiagnoseShortcuts(box, "Or jump straight to a Diagnose page:");
      setActiveRow(box, 0);
      return;
    }

    var hits = [];
    searchDocs.forEach(function (d) {
      if (!docInScope(d)) return;
      var s = sScore(d, qts);
      if (s >= 0.5) hits.push({ s: s, d: d });
    });
    hits.sort(function (a, b) {
      return b.s - a.s || (b.d.kind === "symptom" ? 1 : 0) - (a.d.kind === "symptom" ? 1 : 0);
    });
    hits.slice(0, 8).forEach(function (h) {
      box.appendChild(renderResultRow(h.d, goToResult));
    });

    if (!hits.length) {
      renderDiagnoseShortcuts(box,
        "Nothing close" + (searchActive > 0 ? " yet (still indexing)" : "") +
        " — try fewer words, or open a Diagnose page:");
    }
    setActiveRow(box, 0);
  }

  function activeRows() {
    var box = document.getElementById("search-results");
    return box ? Array.prototype.slice.call(box.querySelectorAll("a.sr")) : [];
  }
  function setActiveRow(box, idx) {
    var rows = activeRows();
    rows.forEach(function (r, i) { r.classList.toggle("active", i === idx); });
  }
  function moveActive(delta) {
    var rows = activeRows();
    if (!rows.length) return;
    var cur = rows.findIndex(function (r) { return r.classList.contains("active"); });
    var next = Math.min(rows.length - 1, Math.max(0, cur + delta));
    rows.forEach(function (r, i) { r.classList.toggle("active", i === next); });
    rows[next].scrollIntoView({ block: "nearest" });
  }

  function openSearch() {
    buildIndex();
    var layer = searchLayer();
    if (!layer) return;
    layer.hidden = false;
    document.body.classList.add("search-open");
    var input = searchInput();
    input.focus();
    input.select();
    runQuery();
  }
  function closeSearch() {
    var layer = searchLayer();
    if (!layer || layer.hidden) return;
    layer.hidden = true;
    document.body.classList.remove("search-open");
  }

  var MAGNIFIER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/></svg>';

  function initSearch() {
    var btn = document.createElement("button");
    btn.className = "search-btn";
    btn.id = "search-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Search — press /");
    btn.title = "Search ( / )";
    btn.innerHTML = MAGNIFIER;
    document.body.appendChild(btn);

    var placeholder = CURRENT_CAMPUS && CAMPUS[CURRENT_CAMPUS]
      ? "Search " + CAMPUS[CURRENT_CAMPUS].label + "…"
      : "Search every campus…";

    var layer = document.createElement("div");
    layer.className = "search-layer";
    layer.id = "search-layer";
    layer.hidden = true;
    layer.innerHTML =
      '<div class="search-scrim"></div>' +
      '<div class="search-panel" role="dialog" aria-modal="true" aria-label="Search">' +
        '<div class="search-box">' + MAGNIFIER +
          '<input id="search-input" type="search" placeholder="' + placeholder +
            '" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Search">' +
          '<button class="search-esc" type="button" aria-label="Close search">esc</button>' +
        "</div>" +
        '<div class="search-results" id="search-results"></div>' +
        '<div class="search-foot">Type it the way you’d say it — “resolume black screen”, “popping after restart”. Symptom checklists rank first.</div>' +
      "</div>";
    document.body.appendChild(layer);

    btn.addEventListener("click", openSearch);
    layer.querySelector(".search-scrim").addEventListener("click", closeSearch);
    layer.querySelector(".search-esc").addEventListener("click", closeSearch);

    var input = searchInput();
    input.addEventListener("input", runQuery);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeSearch(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); moveActive(1); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); moveActive(-1); return; }
      if (e.key === "Enter") {
        e.preventDefault();
        var rows = activeRows();
        var active = rows.filter(function (r) { return r.classList.contains("active"); })[0] || rows[0];
        if (active) active.click();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.defaultPrevented) return;
      var inField = e.target && e.target.closest && e.target.closest("input, textarea, select, [contenteditable]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (searchLayer() && searchLayer().hidden) openSearch(); else closeSearch();
        return;
      }
      if (e.key === "/" && !inField && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        openSearch();
      }
    });
  }

  renderRail();
  renderTabbar();
  initTheme();
  initSearch();
  window.addEventListener("hashchange", render);
  render();
})();
