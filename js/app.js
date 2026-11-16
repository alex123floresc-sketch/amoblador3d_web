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

// 5. Menú en pantallas chicas
(() => {
  const boton = document.querySelector('.menu-boton');
  const lista = document.getElementById('menu-principal');
  if (!boton || !lista) return;
  const poner = (abierto) => {
    boton.setAttribute('aria-expanded', abierto);
    lista.classList.toggle('abierto', abierto);
  };
  boton.addEventListener('click', () => poner(boton.getAttribute('aria-expanded') !== 'true'));
  lista.addEventListener('click', (e) => { if (e.target.closest('a')) poner(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') poner(false); });
})();

// 6. Ampliar capturas
(() => {
  const visor = document.querySelector('.visor');
  if (!visor || typeof visor.showModal !== 'function') return;
  const img = visor.querySelector('img');
  document.querySelectorAll('.ampliable').forEach((b) => {
    b.addEventListener('click', () => {
      const original = b.querySelector('img');
      img.src = b.dataset.src;
      img.alt = original.alt;
      visor.showModal();
    });
  });
  // Clic fuera de la imagen cierra el visor
  visor.addEventListener('click', (e) => { if (e.target === visor) visor.close(); });
})();

// 7. Copiar fragmentos de código (sin los números de línea)
document.querySelectorAll('.copiar').forEach((b) => {
  b.addEventListener('click', async () => {
    const code = b.closest('.codigo-panel').querySelector('pre.codigo code').cloneNode(true);
    code.querySelectorAll('.ln').forEach((n) => n.remove());
    try {
      await navigator.clipboard.writeText(code.textContent);
      b.textContent = 'Copiado';
      b.classList.add('listo');
    } catch {
      b.textContent = 'No se pudo copiar';
    }
    setTimeout(() => { b.textContent = 'Copiar'; b.classList.remove('listo'); }, 1800);
  });
});

// 8. Botón para volver arriba
(() => {
  const arriba = document.querySelector('.arriba');
  if (!arriba) return;
  const revisar = () => arriba.classList.toggle('visible', window.scrollY > 900);
  window.addEventListener('scroll', revisar, { passive: true });
  revisar();
})();
