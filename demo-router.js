(function () {
  const routes = [
    { terms: ["dashboard", "inicio"], href: "/dashboard/" },
    { terms: ["empleados", "empleado"], href: "/perfil/" },
    { terms: ["expedientes", "expediente"], href: "/expediente/" },
    { terms: ["contratos", "firma", "firmar"], href: "/firma/" },
    { terms: ["incidencias", "incapacidades", "vacaciones", "actas administrativas", "ver detalles", "ver reportes", "reporte"], href: "/vacaciones/" },
    { terms: ["configuracion", "configuración"], href: "/dashboard/" },
    { terms: ["privacidad", "terminos", "términos", "soporte", "olvidaste"], href: "/dashboard/" }
  ];

  function normalize(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function routeFor(label) {
    const normalized = normalize(label);
    const match = routes.find((route) =>
      route.terms.some((term) => normalized.includes(normalize(term)))
    );
    return match ? match.href : null;
  }

  document.querySelectorAll('a[href="#"]').forEach((anchor) => {
    const href = routeFor(anchor.textContent || "");
    if (href) {
      anchor.href = href;
    }
  });

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener(
      "submit",
      () => {
        window.setTimeout(() => {
          window.location.href = "/dashboard/";
        }, 650);
      },
      true
    );
  }

  document.querySelectorAll("button").forEach((button) => {
    const href = routeFor(button.textContent || "");
    if (!href) return;

    button.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        window.location.href = href;
      },
      true
    );
  });
})();
