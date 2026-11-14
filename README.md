# Amoblador3D: sitio web

Página de presentación y descargas de [Amoblador3D](https://github.com/alex123floresc-sketch/amoblador3d),
aplicación de escritorio para diseñar interiores en 3D con medidas reales y estimar el presupuesto.

Es HTML, CSS y JavaScript sin dependencias: abre `index.html` en el navegador para verla.

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | La página: qué hace, cómo usarla, atajos y descargas |
| `css/estilos.css` | Estilos |
| `js/app.js` | Plano interactivo de la portada y selector de vistas |
| `img/` | Capturas de la aplicación e ícono |
| `descargas/` | Archivos que se descargan desde la página (PDF) |

## Publicar con GitHub Pages

*Settings → Pages → Source: Deploy from a branch → `main` / `(root)`*. La página queda en
`https://alex123floresc-sketch.github.io/amoblador3d_web/`.

## El instalador

No se guarda en este repositorio (pesa demasiado). Se crea con `packaging\crear-instalador.cmd`
en el repo de la aplicación y se sube como archivo de un **Release** allí; la página enlaza a
`releases/latest`.
