# Clínica Dental Jerusalén Shefa — Sitio web

Sitio estático bilingüe (español / inglés) para turismo dental. No requiere instalación: abre `index.html` en el navegador o publícalo en GitHub Pages, Netlify o cualquier hosting.

## Estructura
- `index.html` — contenido y secciones
- `css/styles.css` — diseño (azul marino + dorado)
- `js/config.js` — **precios, fotos de antes/después y WhatsApp** (lo que más vas a editar)
- `js/i18n.js` — todos los textos en español e inglés
- `js/main.js` — funcionamiento (idioma, deslizador, calculadora, scroll)
- `img/` — coloca aquí tus fotos

## Cómo poner tus precios reales
Edita `js/config.js` → `treatments`. Cada tratamiento tiene `us` (precio promedio EE. UU.) y `clinic` (tu precio). `travelEstimate` es el costo estimado del boleto de avión (el paciente organiza su propio viaje).

## Cómo poner tus fotos
1. Copia tus fotos a `img/`.
2. **Antes/después:** en `js/config.js` → `beforeAfter`, cambia `before` y `after` por tus rutas (ej. `img/caso1-antes.jpg`) y pon `simulate: false`.
3. **Otras fotos (portada y "Tu viaje de sonrisa"):** en `index.html` busca `REEMPLAZAR` y cambia el `src`.

## Cambiar textos
Edita `js/i18n.js` (sección `es` y sección `en`).

## Fotos de "Descubre El Salvador"
Están en `images/turismo/`. Para cambiar una foto, reemplaza el archivo con el mismo nombre:
`playas.jpg`, `centro-historico.jpg`, `navidad.jpg`, `ruta-flores.jpg`, `volcanes.jpg`, `comida.jpg` (pendiente: foto de pupusas), `moderno.jpg`.
Las fotos `extra-*.jpg` son la galería deslizable "Más de El Salvador".

## Video del escáner intraoral
En `js/config.js` cambia `scannerVideo`:
- Si subes el archivo a la carpeta `videos/`: `scannerVideo: "videos/escaner-intraoral-future-bass.mp4"`
- Si está en YouTube: `scannerVideo: "https://www.youtube.com/watch?v=..."`
Mientras esté vacío se muestra el aviso "Video próximamente".

## Casos clínicos (antes y después)
Fotos en `images/casos/` (casoN-antes.jpg, casoN-despues.jpg y casoN-completo.jpg).
Los nombres y descripciones de cada caso están en `js/config.js` → `beforeAfter`.
