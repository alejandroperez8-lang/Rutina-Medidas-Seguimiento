# Rutina & Medidas — PWA

Aplicación web de seguimiento de rutina, medidas corporales y comidas, lista para GitHub Pages.

## Qué se corrigió en esta versión

1. **Ícono real (tu diseño del dumbbell)** → antes el `manifest.json` apuntaba a
   `icons/icon-192.png` y `icons/icon-512.png`, pero esos archivos nunca existieron
   como PNG reales en el repositorio. Ahora la carpeta `icons/` viene incluida con
   los PNG reales generados a partir de la imagen que compartiste, y el favicon del
   `<head>` también se actualizó para usar el mismo diseño (antes usaba uno genérico
   embebido en base64).

2. **No guardaba los datos al reabrir la app** → la app ya usaba `localStorage`
   propio (no `window.storage`), lo cual estaba bien encaminado, pero
   `localStorage` por sí solo es menos confiable en algunos navegadores/modos
   (por ejemplo, se puede llenar o limpiar más fácilmente).
   → Ahora usa **IndexedDB** como almacenamiento principal (persistente en el
   dispositivo) con **localStorage** como respaldo automático si IndexedDB no
   está disponible (por ejemplo, en modo incógnito). Mismo esquema que se usó en
   tu app de finanzas, para que ambas se comporten igual.

3. **`manifest.json` completo** → se agregaron `scope`, `display_override`,
   `lang`, `categories` y se corrigió `start_url` para que sea consistente con
   `scope` (ambos en `./`), evitando problemas de instalación en algunos
   navegadores Android.

4. **`sw.js` con estrategia de caché más robusta** → se mantiene la lógica
   "network-first" para el HTML (para que veas las actualizaciones de inmediato)
   y "cache-first" para el resto de archivos estáticos, pero ahora con manejo de
   errores más cuidadoso y versión de caché incrementada (`v3`) para forzar la
   limpieza de la caché anterior.

## Estructura

```
rutina-tracker/
├── index.html
├── manifest.json
├── sw.js
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (o usa el que ya tienes).
2. Sube **todos** los archivos de esta carpeta a la raíz del repositorio,
   **conservando la carpeta `icons/`** (no subas los PNG sueltos en la raíz).
3. Ve a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda y espera el despliegue (puede tardar 1-2 minutos).
7. Abre la URL HTTPS que te entregue GitHub Pages.

Las rutas del `manifest.json` y del `sw.js` son relativas (`./`), así que
funcionan igual si tu sitio queda en `usuario.github.io` o en
`usuario.github.io/nombre-repo/` — no hace falta cambiar nada según el nombre
del repositorio.

## Instalación en el celular

- **Android (Chrome/Edge):** abre la URL, el navegador debería ofrecer
  "Instalar app" automáticamente, o puedes buscarlo en el menú ⋮.
- **iPhone/iPad (Safari):** botón compartir → "Añadir a pantalla de inicio".

## Actualizaciones futuras

Cuando cambies `index.html` u otro archivo estático, sube de nuevo el `sw.js`
incrementando `CACHE_NAME` (por ejemplo de `v3` a `v4`). Si no lo haces,
algunos usuarios pueden seguir viendo la versión antigua cacheada por un tiempo.

## Sobre tus datos

Los datos se guardan **solo en tu dispositivo/navegador** (IndexedDB +
respaldo en localStorage). No se envían a ningún servidor. Si cambias de
celular, de navegador, o borras datos de navegación, perderás la información
a menos que uses el backup JSON (exportar/importar) dentro de la propia app,
si esa función está disponible en tu versión.
