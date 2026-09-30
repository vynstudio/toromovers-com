/**
 * Homepage-only behavior. The page is static HTML; this file does not
 * hydrate React. Video and the cookie notice wait until the browser is idle.
 */

const CLOSE_ICON =
  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const MENU_ICON =
  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

function setupNav() {
  const header = document.querySelector<HTMLElement>(".site-header");
  const button = document.querySelector<HTMLButtonElement>(".nav-menu-btn");
  const sheet = document.querySelector<HTMLElement>(".nav-sheet");
  const icon = button?.querySelector<HTMLElement>(".nav-menu-icon");
  const backdrop = sheet?.querySelector<HTMLButtonElement>(".nav-sheet-backdrop");
  const bar = document.querySelector<HTMLElement>(".sticky-cta-bar");
  if (!header || !button || !sheet || !icon || !bar) return;

  const mobile = window.matchMedia("(max-width: 767px)");
  let menuOpen = false;

  const setMenu = (open: boolean) => {
    menuOpen = open;
    sheet.classList.toggle("is-open", open);
    sheet.setAttribute("aria-hidden", open ? "false" : "true");
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    icon.innerHTML = open ? CLOSE_ICON : MENU_ICON;
    if (backdrop) backdrop.tabIndex = open ? 0 : -1;
    document.body.style.overflow = open ? "hidden" : "";
    onScroll();
  };

  const onScroll = () => {
    if (!mobile.matches) {
      header.classList.remove("site-header--hidden");
      header.dataset.mobileNav = "visible";
      bar.classList.remove("is-visible", "translate-y-0");
      bar.classList.add("pointer-events-none", "translate-y-[120%]");
      bar.setAttribute("aria-hidden", "true");
      return;
    }
    const pastHero = window.scrollY > 24;
    const hide = pastHero && !menuOpen;
    header.classList.toggle("site-header--hidden", hide);
    header.dataset.mobileNav = hide ? "hidden" : "visible";
    const quote = document.getElementById("quote");
    const nearQuote =
      quote != null && quote.getBoundingClientRect().top < window.innerHeight * 0.88;
    const showBar = pastHero && !nearQuote;
    bar.classList.toggle("is-visible", showBar);
    bar.classList.toggle("translate-y-0", showBar);
    bar.classList.toggle("translate-y-[120%]", !showBar);
    bar.classList.toggle("pointer-events-none", !showBar);
    bar.setAttribute("aria-hidden", showBar ? "false" : "true");
  };

  button.addEventListener("click", () => setMenu(!menuOpen));
  backdrop?.addEventListener("click", () => setMenu(false));
  sheet.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOpen) setMenu(false);
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  mobile.addEventListener("change", onScroll);
  onScroll();
}

function setupHeroVideo() {
  const skyline = document.querySelector(".hero-skyline--video");
  if (!skyline) return;
  const desktop = window.matchMedia("(min-width: 1024px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mount = () => {
    if (!desktop.matches || reduced.matches || skyline.querySelector("video")) return;
    const video = document.createElement("video");
    video.className = "hero-skyline-video";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.poster = "/images/hero-video-poster.webp";
    video.src = "/videos/hero-desktop.mp4";
    skyline.insertBefore(video, skyline.firstChild);
  };
  const schedule = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(mount, { timeout: 1800 });
    } else {
      window.setTimeout(mount, 600);
    }
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  desktop.addEventListener("change", () => {
    if (!desktop.matches) skyline.querySelector("video")?.remove();
    else schedule();
  });
}

function setupCookies() {
  const key = "toro_cookie_prefs";
  try {
    if (localStorage.getItem(key)) return;
  } catch {
    return;
  }
  const show = () => {
    if (document.querySelector(".cookie-banner")) return;
    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie notice");
    banner.innerHTML =
      '<div class="cookie-banner-inner"><p class="cookie-banner-text">We use cookies to run the site and, with your OK, measure traffic. See our <a href="/cookies" class="underline underline-offset-2">Cookie Policy</a> and <a href="/privacy" class="underline underline-offset-2">Privacy Policy</a>.</p><div class="cookie-banner-actions"><button type="button" class="btn-primary tap-target rounded-full px-4 text-sm" data-cookie="all">Accept</button><button type="button" class="btn-outline tap-target rounded-full px-4 text-sm" data-cookie="essential">Essential only</button><a href="/cookies" class="tap-target text-sm font-medium text-foreground underline underline-offset-2">Preferences</a></div></div>';
    const save = (all: boolean) => {
      try {
        localStorage.setItem(
          key,
          JSON.stringify({
            analytics: all,
            marketing: all,
            updatedAt: new Date().toISOString(),
          }),
        );
      } catch {
        /* ignore */
      }
      banner.remove();
    };
    banner.querySelector('[data-cookie="all"]')?.addEventListener("click", () => save(true));
    banner.querySelector('[data-cookie="essential"]')?.addEventListener("click", () => save(false));
    document.body.appendChild(banner);
  };
  const start = () => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(show, { timeout: 2500 });
    else window.setTimeout(show, 1200);
  };
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}

setupNav();
setupHeroVideo();
setupCookies();
