/* ==========================================================================
   app.js — shared shell, v2 (2026-07-07)
   Elevation Toronto East · production platform

   One file, one job: render the rail (desktop) and tab bar (mobile) from
   the NAV array below, run the hash router for the current page's views,
   inject breadcrumbs, and handle the light/dark switch.

   docs/MAINTENANCE.md rule 2: adding a page = one NAV entry here, not five
   edited files. Everything else in this file is plumbing — leave it alone
   for a content change.

   Path model: every page is either at the repo root (index.html) or one
   folder deep (video/index.html, audio/index.html, ...). Each HTML file
   declares its own depth and discipline once, on <html>:
     <html data-depth="0" data-disc="home">   (root)
     <html data-depth="1" data-disc="video">  (a discipline file)
   That's the only per-file wiring content pages need — this script reads
   it to build correct relative links from either depth.
   ========================================================================== */
(function () {
  "use strict";

  var DEPTH = document.documentElement.getAttribute("data-depth") === "1" ? "../" : "";
  var CURRENT_DISC = document.documentElement.getAttribute("data-disc") || "home";
  var CURRENT_FILE = CURRENT_DISC === "home" ? "index.html" : CURRENT_DISC + "/index.html";

  var HUB_HASH = {
    home: "home",
    video: "video",
    audio: "audio",
    lighting: "lighting",
    cameras: "cameras"
  };

  var DISC_LABEL = {
    video: "Video Engineering",
    audio: "Audio",
    lighting: "Lighting",
    cameras: "Cameras"
  };

  /* NAV — single source of truth for the rail + tab bar. To add a page:
     add one entry with the right file/hash/label, in the position you want
     it to appear in the rail. `pending: true` renders it dimmed and points
     it at the discipline hub — flip to a real hash once the page exists. */
  var NAV = [
    { disc: "home", file: "index.html", hash: "home", label: "Home" },

    { disc: "video", file: "video/index.html", hash: "video", label: "Overview" },
    { disc: "video", file: "video/index.html", hash: "video-startup", label: "Startup Procedure" },
    { disc: "video", file: "video/index.html", hash: "video-flow", label: "Signal Flow" },
    { disc: "video", file: "video/index.html", hash: "video-rundown", label: "Sunday Run of Show" },
    { disc: "video", file: "video/index.html", hash: "video-diagnostics", label: "Diagnose a Symptom" },
    { disc: "video", file: "video/index.html", hash: "video-me-bus", label: "M/E Bus Map" },
    { disc: "video", file: "video/index.html", hash: "video-keys", label: "Key Layers" },
    { disc: "video", file: "video/index.html", hash: "video-inputs", label: "Input Cross-Points" },
    { disc: "video", file: "video/index.html", hash: "video-outputs", label: "Output Cross-Points" },
    { disc: "video", file: "video/index.html", hash: "video-gaps", label: "Unverified / Gaps" },

    { disc: "audio", file: "audio/index.html", hash: "audio", label: "Overview" },
    { disc: "audio", file: "audio/index.html", hash: "audio", label: "Console Startup", pending: true },
    { disc: "audio", file: "audio/index.html", hash: "audio", label: "Patch & Gain", pending: true },
    { disc: "audio", file: "audio/index.html", hash: "audio", label: "Wireless & IEMs", pending: true },
    { disc: "audio", file: "audio/index.html", hash: "audio", label: "Diagnose a Symptom", pending: true },

    { disc: "lighting", file: "lighting/index.html", hash: "lighting", label: "Overview" },
    { disc: "lighting", file: "lighting/index.html", hash: "lighting", label: "Console Startup", pending: true },
    { disc: "lighting", file: "lighting/index.html", hash: "lighting", label: "Rig & Patch", pending: true },
    { disc: "lighting", file: "lighting/index.html", hash: "lighting", label: "Looks & Cue Stack", pending: true },
    { disc: "lighting", file: "lighting/index.html", hash: "lighting", label: "Diagnose a Symptom", pending: true },

    { disc: "cameras", file: "cameras/index.html", hash: "cameras", label: "Overview" },
    { disc: "cameras", file: "cameras/index.html", hash: "cameras", label: "Builds & Settings", pending: true },
    { disc: "cameras", file: "cameras/index.html", hash: "cameras", label: "Positions & Shot Sheet", pending: true },
    { disc: "cameras", file: "cameras/index.html", hash: "cameras", label: "Tally & Comms", pending: true }
  ];

  var ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>',
    audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v4M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 6v2M12 16v2M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 6v0M20 12v6M20 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>',
    lighting: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.7 1 1.6 1 2.5h6c0-.9.2-1.8 1-2.5A6 6 0 0 0 12 3Z"/></svg>',
    cameras: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>'
  };

  var LOGOMARK = '<svg class="logomark" viewBox="0 0 3 2" aria-hidden="true">' +
    '<rect x="0" y="1" width="1" height="1" fill="#00fffc"/>' +
    '<rect x="1" y="0" width="1" height="1" fill="#47ff91"/>' +
    '<rect x="2" y="1" width="1" height="1" fill="#fdb2ff"/></svg>';

  function href(item) {
    return DEPTH + item.file + "#" + item.hash;
  }

  function renderRail() {
    var rail = document.getElementById("rail");
    if (!rail) return;

    var groups = [];
    var byDisc = {};
    NAV.forEach(function (item) {
      if (!byDisc[item.disc]) {
        byDisc[item.disc] = [];
        groups.push(item.disc);
      }
      byDisc[item.disc].push(item);
    });

    var html = '<a class="wordmark-sm" href="' + DEPTH + 'index.html">' + LOGOMARK + "production</a>" +
      '<div class="campus">Toronto East</div><hr class="rail-rule"><nav>';

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
    var order = ["home", "video", "audio", "lighting", "cameras"];
    var html = "";
    order.forEach(function (disc) {
      var file = disc === "home" ? "index.html" : disc + "/index.html";
      var label = disc === "home" ? "Home" : DISC_LABEL[disc].split(" ")[0];
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
    document.title = (crumbText ? crumbText.split("/").pop().trim() + " — " : "") +
      "production · Elevation Toronto East";
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
