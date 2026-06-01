(function () {
  const demoPages = [
    { label: "Dashboard", href: "/dashboard/", aliases: ["dashboard", "inicio", "home"] },
    { label: "Empleados", href: "/perfil/", aliases: ["empleados", "empleado", "perfil", "badge", "group"] },
    { label: "Expediente", href: "/expediente/", aliases: ["expedientes", "expediente", "inventory_2", "folder_shared"] },
    { label: "Vacaciones", href: "/vacaciones/", aliases: ["vacaciones", "incidencias", "incapacidades", "actas administrativas", "ver detalles", "ver reportes", "reporte", "nuevo reporte", "event", "report_problem", "medical_services", "gavel"] },
    { label: "Firma", href: "/firma/", aliases: ["contratos", "contrato", "firma", "firmar", "description"] }
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
        return `<a href="${page.href}" ${active ? 'aria-current="page"' : ""}>${page.label}</a>`;
      })
      .join("");

    const style = document.createElement("style");
    style.textContent = `
      #demo-nav {
        position: fixed;
        left: 50%;
        bottom: 14px;
        z-index: 99999;
        display: flex;
        max-width: calc(100vw - 24px);
        transform: translateX(-50%);
        gap: 6px;
        padding: 8px;
        border: 1px solid rgba(186, 199, 228, 0.35);
        border-radius: 14px;
        background: rgba(0, 3, 12, 0.88);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
        backdrop-filter: blur(14px);
        overflow-x: auto;
      }

      #demo-nav a {
        flex: 0 0 auto;
        min-height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 14px;
        border-radius: 10px;
        color: #d7e3ff;
        font: 700 13px/1 Inter, Arial, sans-serif;
        text-decoration: none;
        white-space: nowrap;
      }

      #demo-nav a[aria-current="page"] {
        background: #80abfe;
        color: #003d85;
      }

      @media (min-width: 768px) {
        #demo-nav {
          top: 14px;
          right: 18px;
          bottom: auto;
          left: auto;
          transform: none;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(nav);
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

  wireLinks();
  injectDemoNav();

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
