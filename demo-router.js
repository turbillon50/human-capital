(function () {
  const demoPages = [
    { label: "Inicio", desktopLabel: "Dashboard", href: "/dashboard/", aliases: ["dashboard", "inicio", "home"] },
    { label: "Equipo", desktopLabel: "Empleados", href: "/perfil/", aliases: ["empleados", "empleado", "perfil", "badge", "group"] },
    { label: "Exp.", desktopLabel: "Expediente", href: "/expediente/", aliases: ["expedientes", "expediente", "inventory_2", "folder_shared"] },
    { label: "Ops", desktopLabel: "Vacaciones", href: "/vacaciones/", aliases: ["vacaciones", "incidencias", "incapacidades", "actas administrativas", "ver detalles", "ver reportes", "reporte", "nuevo reporte", "event", "report_problem", "medical_services", "gavel"] },
    { label: "Firma", desktopLabel: "Firma", href: "/firma/", aliases: ["contratos", "contrato", "firma", "firmar", "description"] }
  ];

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function routeFor(value) {
    const text = normalize(value);
    if (!text) return null;

    const exact = demoPages.find((page) =>
      page.aliases.some((alias) => text === normalize(alias))
    );
    if (exact) return exact.href;

    const partial = demoPages.find((page) =>
      page.aliases.some((alias) => text.includes(normalize(alias)))
    );
    return partial ? partial.href : null;
  }

  function routeForElement(element) {
    if (!element) return null;

    const pieces = [
      element.textContent,
      element.getAttribute("aria-label"),
      element.getAttribute("title"),
      element.dataset ? element.dataset.icon : "",
      element.querySelector("[data-icon]")?.getAttribute("data-icon"),
      element.querySelector(".material-symbols-outlined")?.textContent
    ];

    return routeFor(pieces.filter(Boolean).join(" "));
  }

  function injectDemoNav() {
    if (document.getElementById("demo-nav")) return;

    const nav = document.createElement("nav");
    nav.id = "demo-nav";
    nav.setAttribute("aria-label", "Navegacion de demo");
    nav.innerHTML = demoPages
      .map((page) => {
        const active = window.location.pathname === page.href;
        return `<a href="${page.href}" data-desktop-label="${page.desktopLabel}" ${active ? 'aria-current="page"' : ""}><span>${page.label}</span></a>`;
      })
      .join("");

    const installButton = document.createElement("button");
    installButton.id = "demo-install";
    installButton.type = "button";
    installButton.hidden = true;
    installButton.textContent = "Instalar app";

    const style = document.createElement("style");
    style.textContent = `
      :root {
        color-scheme: light;
        --demo-nav-height: 60px;
        --demo-safe-bottom: env(safe-area-inset-bottom, 0px);
      }

      html {
        min-height: 100%;
        background: #f7f9fb;
        -webkit-text-size-adjust: 100%;
      }

      body {
        min-height: 100dvh;
        padding-bottom: calc(var(--demo-nav-height) + var(--demo-safe-bottom) + 10px);
        overscroll-behavior-y: none;
      }

      body > nav.md\\:hidden,
      body nav.md\\:hidden.fixed.bottom-0,
      main > nav.md\\:hidden.fixed.bottom-0 {
        display: none !important;
      }

      main.md\\:ml-\\[260px\\],
      .md\\:ml-\\[260px\\] {
        max-width: none;
      }

      button,
      a,
      input,
      textarea,
      select {
        -webkit-tap-highlight-color: transparent;
      }

      #demo-nav {
        position: fixed;
        left: 12px;
        right: 12px;
        bottom: calc(12px + var(--demo-safe-bottom));
        z-index: 99999;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 4px;
        padding: 6px;
        border: 1px solid rgba(128, 171, 254, 0.24);
        border-radius: 14px;
        background: rgba(0, 3, 12, 0.94);
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.24);
        backdrop-filter: blur(12px);
      }

      #demo-nav a {
        min-height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        border: 0;
        border-radius: 9px;
        background: transparent;
        color: #d7e3ff;
        font: 700 11px/1 Inter, Arial, sans-serif;
        letter-spacing: 0;
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
      }

      #demo-install {
        position: fixed;
        right: 14px;
        bottom: calc(var(--demo-nav-height) + var(--demo-safe-bottom) + 18px);
        z-index: 99999;
        min-height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 14px;
        border: 0;
        border-radius: 10px;
        background: #80abfe;
        color: #003d85;
        font: 700 12px/1 Inter, Arial, sans-serif;
        box-shadow: 0 12px 30px rgba(0, 3, 12, 0.26);
      }

      #demo-install[hidden] {
        display: none;
      }

      #demo-nav a[aria-current="page"] {
        background: #80abfe;
        color: #003d85;
      }

      @media (max-width: 767px) {
        #demo-install {
          display: none !important;
        }
      }

      @media (min-width: 768px) {
        body {
          padding-bottom: 0;
        }

        #demo-nav {
          top: 10px;
          right: 14px;
          bottom: auto;
          left: auto;
          display: flex;
          width: auto;
          max-width: calc(100vw - 360px);
          gap: 4px;
          padding: 5px;
          border-radius: 12px;
          background: rgba(0, 3, 12, 0.9);
        }

        #demo-nav a {
          min-width: 86px;
          min-height: 34px;
          padding: 0 12px;
          font-size: 12px;
        }

        #demo-nav a span {
          display: none;
        }

        #demo-nav a::before {
          content: attr(data-desktop-label);
        }

        #demo-install {
          top: 56px;
          right: 24px;
          bottom: auto;
          min-height: 34px;
          font-size: 12px;
        }
      }

      @media (min-width: 1200px) {
        main,
        section {
          scroll-margin-top: 84px;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(nav);
    document.body.appendChild(installButton);
  }

  function injectPwaMeta() {
    const metaTags = [
      ["theme-color", "#101d33"],
      ["apple-mobile-web-app-capable", "yes"],
      ["apple-mobile-web-app-status-bar-style", "black-translucent"],
      ["apple-mobile-web-app-title", "Human Capital"],
      ["mobile-web-app-capable", "yes"]
    ];

    metaTags.forEach(([name, content]) => {
      if (document.querySelector(`meta[name="${name}"]`)) return;
      const meta = document.createElement("meta");
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    });

    const links = [
      ["manifest", "/manifest.webmanifest"],
      ["icon", "/favicon.svg"],
      ["apple-touch-icon", "/favicon.svg"]
    ];

    links.forEach(([rel, href]) => {
      if (document.querySelector(`link[rel="${rel}"]`)) return;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    });
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }

  function wireInstallPrompt() {
    let deferredPrompt = null;
    const installButton = document.getElementById("demo-install");
    if (!installButton) return;

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredPrompt = event;
      installButton.hidden = false;
    });

    installButton.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      installButton.hidden = true;
    });
  }

  function wireLinks() {
    document.querySelectorAll('a[href="#"], a:not([href])').forEach((anchor) => {
      const href = routeForElement(anchor);
      if (href) anchor.href = href;
    });
  }

  function go(href) {
    if (!href || window.location.pathname === href) return;
    window.location.assign(href);
  }

  injectPwaMeta();
  registerServiceWorker();
  wireLinks();
  injectDemoNav();
  wireInstallPrompt();

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        go("/dashboard/");
      },
      true
    );
  }

  document.addEventListener(
    "click",
    (event) => {
      const clicked = event.target.closest("a, button, [role='button']");
      if (!clicked || clicked.closest("#demo-nav")) return;

      const nativeHref = clicked.getAttribute("href");
      const href = nativeHref && nativeHref !== "#" ? nativeHref : routeForElement(clicked);
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      event.preventDefault();
      event.stopPropagation();
      go(href);
    },
    true
  );
})();
