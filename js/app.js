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

// 2. Pestañas accesibles con flechas (vistas de la app y fragmentos de código), cada grupo por separado
document.querySelectorAll('.selector[role="tablist"]').forEach((lista) => {
  const pestanas = [...lista.querySelectorAll('[role="tab"]')];
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
});

// 3. Portada: alternar entre el plano y la vista 3D del ejemplo
(() => {
  const figura = document.querySelector('.plano');
  const img = figura.querySelector('.plano-3d');
  figura.querySelectorAll('.conmutador button').forEach((b, _, todos) => {
    b.addEventListener('click', () => {
      const en3d = b.dataset.vista === '3d';
      todos.forEach((o) => o.setAttribute('aria-pressed', o === b));
      figura.classList.toggle('en-3d', en3d);
      img.hidden = !en3d;
    });
  });
})();

// 4. Barra: marca la sección visible
(() => {
  const enlaces = [...document.querySelectorAll('.barra nav a[href^="#"]')];
  const secciones = enlaces.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      enlaces.forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === `#${e.target.id}`));
      enlaces.forEach((a) => a.hasAttribute('aria-current') && a.setAttribute('aria-current', 'true'));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secciones.forEach((s) => obs.observe(s));
})();
