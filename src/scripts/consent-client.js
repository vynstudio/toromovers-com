(function () {
  var configEl = document.getElementById("toro-track-config");
  var config = {};
  try {
    config = configEl ? JSON.parse(configEl.textContent || "{}") : {};
  } catch (e) {
    config = {};
  }
  var gaId = /^G-[A-Z0-9]+$/.test(config.gaId || "") ? config.gaId : "";
  var pixel = /^[0-9]+$/.test(config.pixel || "") ? config.pixel : "";
  var searchable = /^[A-Za-z0-9_]+$/.test(config.searchable || "") ? config.searchable : "";
  var storageKey = "toro_cookie_prefs";
  var analyticsLoaded = false;
  var marketingLoaded = false;
  var untrap = null;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });

  function readPrefs() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "null");
    } catch (e) {
      return null;
    }
  }

  function loadAnalytics() {
    if (analyticsLoaded || !gaId) return;
    analyticsLoaded = true;
    window.gtag("js", new Date());
    window.gtag("config", gaId, { send_page_view: true });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + gaId;
    document.head.appendChild(script);
    if (searchable && !document.querySelector("script[data-toro-searchable]")) {
      var tracker = document.createElement("script");
      tracker.async = true;
      tracker.src = "https://searchable-tracker.searchable.workers.dev/s.js";
      tracker.setAttribute("data-domain", "toromovers.com");
      tracker.setAttribute("data-site-token", searchable);
      tracker.setAttribute("data-toro-searchable", "1");
      document.body.appendChild(tracker);
    }
  }

  function loadMarketing() {
    if (marketingLoaded || !pixel) return;
    marketingLoaded = true;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixel);
    window.fbq("track", "PageView");
  }

  function apply(prefs) {
    if (!prefs) return;
    var analytics = !!prefs.analytics;
    var marketing = !!prefs.marketing;
    window.gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: marketing ? "granted" : "denied",
      ad_user_data: marketing ? "granted" : "denied",
      ad_personalization: marketing ? "granted" : "denied",
    });
    if (analytics) loadAnalytics();
    if (marketing) loadMarketing();
  }

  window.addEventListener("toro-cookie-prefs", function (event) {
    apply(event.detail);
  });

  function whenIdle(fn) {
    if (window.requestIdleCallback) window.requestIdleCallback(fn, { timeout: 4000 });
    else window.setTimeout(fn, 1500);
  }

  if (document.readyState === "complete") whenIdle(function () { apply(readPrefs()); });
  else window.addEventListener("load", function () { whenIdle(function () { apply(readPrefs()); }); }, { once: true });

  function closeModal() {
    var modal = document.querySelector(".ck-modal");
    if (untrap) untrap();
    untrap = null;
    if (modal) modal.remove();
    var card = document.querySelector(".ck-card");
    if (card) card.removeAttribute("aria-hidden");
    var custom = document.querySelector("[data-ck='custom']");
    if (custom) custom.focus();
  }

  function closeBanner() {
    closeModal();
    var card = document.querySelector(".ck-card");
    if (card) card.remove();
    document.documentElement.classList.remove("has-cookie-banner");
  }

  function save(analytics, marketing) {
    var detail = {
      analytics: !!analytics,
      marketing: !!marketing,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(detail));
    } catch (e) {
      /* private mode */
    }
    window.dispatchEvent(new CustomEvent("toro-cookie-prefs", { detail: detail }));
    closeBanner();
  }

  function openModal() {
    if (document.querySelector(".ck-modal")) return;
    var card = document.querySelector(".ck-card");
    if (card) card.setAttribute("aria-hidden", "true");
    var modal = document.createElement("div");
    modal.className = "ck-modal";
    modal.innerHTML =
      '<div class="ck-modal-card" role="dialog" aria-modal="true" aria-labelledby="ck-modal-title">' +
      '<h2 id="ck-modal-title">Cookie preferences</h2>' +
      '<p class="ck-modal-lead">Choose optional cookies. Essential cookies stay on so the site can work.</p>' +
      '<ul class="ck-toggles">' +
      '<li><div><p id="ck-essential-label">Essential</p><p>Required for security, forms, and storing this choice.</p></div>' +
      '<button type="button" class="ck-switch" role="switch" aria-checked="true" aria-labelledby="ck-essential-label" disabled><span class="ck-sr">Essential, always on</span></button></li>' +
      '<li><div><p id="ck-analytics-label">Analytics</p><p>Helps us understand how the site is used.</p></div>' +
      '<button type="button" class="ck-switch" role="switch" aria-checked="false" aria-labelledby="ck-analytics-label" data-ck-toggle="analytics"></button></li>' +
      '<li><div><p id="ck-marketing-label">Marketing</p><p>Measures ads after you allow them.</p></div>' +
      '<button type="button" class="ck-switch" role="switch" aria-checked="false" aria-labelledby="ck-marketing-label" data-ck-toggle="marketing"></button></li>' +
      "</ul>" +
      '<p class="ck-links"><a href="/cookies">Cookie Policy</a><a href="/privacy">Privacy Policy</a></p>' +
      '<div class="ck-actions">' +
      '<button type="button" class="ck-accept" data-ck="save">Save choices</button>' +
      '<button type="button" class="ck-essential" data-ck="cancel">Cancel</button>' +
      "</div></div>";
    document.body.appendChild(modal);
    var dialog = modal.querySelector(".ck-modal-card");
    modal.querySelectorAll("[data-ck-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var on = button.getAttribute("aria-checked") !== "true";
        button.setAttribute("aria-checked", on ? "true" : "false");
      });
    });
    modal.querySelector("[data-ck='save']").addEventListener("click", function () {
      var analytics = modal.querySelector("[data-ck-toggle='analytics']").getAttribute("aria-checked") === "true";
      var marketing = modal.querySelector("[data-ck-toggle='marketing']").getAttribute("aria-checked") === "true";
      save(analytics, marketing);
    });
    modal.querySelector("[data-ck='cancel']").addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });
    var focusable = dialog.querySelectorAll("button:not(:disabled), a[href]");
    function onKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== "Tab" || !focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    dialog.addEventListener("keydown", onKey);
    untrap = function () {
      dialog.removeEventListener("keydown", onKey);
    };
    var saveBtn = modal.querySelector("[data-ck='save']");
    if (saveBtn) saveBtn.focus();
  }

  function showBanner() {
    if (readPrefs() || document.querySelector(".ck-card")) return;
    document.documentElement.classList.add("has-cookie-banner");
    var card = document.createElement("div");
    card.className = "ck-card";
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-labelledby", "ck-title");
    card.setAttribute("aria-describedby", "ck-body");
    card.innerHTML =
      '<div class="ck-head">' +
      '<span class="ck-well" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2C687B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/></svg></span>' +
      "<div><p id=\"ck-title\" class=\"ck-title\">Your privacy, handled with care</p>" +
      "<p id=\"ck-body\" class=\"ck-body\">We use cookies to keep the site running and, with your OK, to improve your experience.</p></div></div>" +
      '<p class="ck-links"><a href="/cookies">Cookie Policy</a><a href="/privacy">Privacy Policy</a></p>' +
      '<div class="ck-actions">' +
      '<button type="button" class="ck-accept" data-ck="all">Accept all</button>' +
      '<button type="button" class="ck-essential" data-ck="essential">Essential only</button>' +
      '<button type="button" class="ck-custom" data-ck="custom">Customize</button>' +
      "</div>";
    card.querySelector("[data-ck='all']").addEventListener("click", function () { save(true, true); });
    card.querySelector("[data-ck='essential']").addEventListener("click", function () { save(false, false); });
    card.querySelector("[data-ck='custom']").addEventListener("click", openModal);
    document.body.appendChild(card);
  }

  if (!readPrefs()) window.setTimeout(showBanner, 1500);
})();
