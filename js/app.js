// Amoblador3D: interacción del sitio

// 1. Plano de la portada: muestra los datos del ambiente señalado
(() => {
  const ambientes = document.querySelectorAll('.ambiente');
  const campos = {
    nombre: document.getElementById('ficha-nombre'),
    area: document.getElementById('ficha-area'),
    medidas: document.getElementById('ficha-medidas'),
    costo: document.getElementById('ficha-costo'),
    muebles: document.getElementById('ficha-muebles'),
  };
  const casa = Object.fromEntries(Object.entries(campos).map(([k, el]) => [k, el.textContent]));

  const mostrar = (datos) => Object.entries(campos).forEach(([k, el]) => { el.textContent = datos[k]; });

  ambientes.forEach((g) => {
    g.setAttribute('aria-label', `${g.dataset.nombre}: ${g.dataset.area}, ${g.dataset.costo}`);
    const activar = () => {
      ambientes.forEach((o) => o.classList.toggle('activo', o === g));
      mostrar({ ...g.dataset, muebles: g.dataset.muebles });
    };
    const soltar = () => { g.classList.remove('activo'); mostrar(casa); };
    g.addEventListener('mouseenter', activar);
    g.addEventListener('focus', activar);
    g.addEventListener('click', activar);
    g.addEventListener('mouseleave', soltar);
    g.addEventListener('blur', soltar);
  });
})();

// 2. Selector de vistas (pestañas accesibles con flechas)
(() => {
  const pestanas = [...document.querySelectorAll('.selector [role="tab"]')];
  const elegir = (tab, enfocar) => {
    pestanas.forEach((t) => {
      const activa = t === tab;
      t.setAttribute('aria-selected', activa);
      t.tabIndex = activa ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !activa;
    });
    if (enfocar) tab.focus();
  };
  pestanas.forEach((t, i) => {
    t.addEventListener('click', () => elegir(t));
    t.addEventListener('keydown', (e) => {
      const paso = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (paso) elegir(pestanas[(i + paso + pestanas.length) % pestanas.length], true);
      if (e.key === 'Home') elegir(pestanas[0], true);
      if (e.key === 'End') elegir(pestanas.at(-1), true);
    });
  });
})();
