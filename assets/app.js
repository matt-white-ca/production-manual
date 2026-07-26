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
     NAV rows). `discs` is the campus's real seat list, in rail order. */
  var CAMPUS = {
    tea: { label: "Toronto East", short: "East", discs: ["video", "audio", "lighting"] },
    tor: { label: "Toronto", short: "Toronto", discs: ["video", "audio", "lighting", "cameras"] }
  };

  var HUB_HASH = {
    home: "home",
    playbook: "playbook",
    video: "video",
    audio: "audio",
    lighting: "lighting",
    cameras: "cameras"
  };

  var DISC_LABEL = {
    playbook: "The Playbook",
    video: "Video Engineering",
    audio: "Audio",
    lighting: "Lighting",
    cameras: "Cameras"
  };

  /* Bottom tab bar has room for one word; everything else derives from
     DISC_LABEL's first word. */
  var TAB_LABEL = { home: "Home", playbook: "Playbook" };

  /* NAV — single source of truth for the rail + tab bar. To add a page:
     add one entry with the right campus/file/hash/label, in the position
     you want it to appear in the rail. `pending: true` renders it dimmed
     and points it at the discipline hub — flip to a real hash once the
     page exists. Rows with no `campus` are platform-level (home, playbook)
     and show on every campus. */
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
    { campus: "tor", disc: "video", file: "tor/video/index.html", hash: "video", label: "Diagnose a Symptom", pending: true },

    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio", label: "Overview" },
    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio", label: "Console Startup", pending: true },
    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio", label: "Patch & Gain", pending: true },
    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio", label: "Wireless & IEMs", pending: true },
    { campus: "tor", disc: "audio", file: "tor/audio/index.html", hash: "audio", label: "Diagnose a Symptom", pending: true },

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
    NAV.filter(inScope).forEach(function (item) {
      if (!byDisc[item.disc]) {
        byDisc[item.disc] = [];
        groups.push(item.disc);
      }
      byDisc[item.disc].push(item);
    });

    var campusLabel = CURRENT_CAMPUS && CAMPUS[CURRENT_CAMPUS] ? CAMPUS[CURRENT_CAMPUS].label : "Every Campus";
    var html = '<a class="wordmark-sm" href="' + DEPTH + 'index.html">' + LOGOMARK + "production</a>" +
      '<a class="campus" href="' + DEPTH + 'index.html#home">' + campusLabel + "</a><hr class=\"rail-rule\"><nav>";

    groups.forEach(function (disc) {
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

  renderRail();
  renderTabbar();
  initTheme();
  window.addEventListener("hashchange", render);
  render();
})();
