# Rutina & Medidas — PWA

Aplicación web de seguimiento de rutina de ejercicio y medidas, lista para GitHub Pages.

## Qué se corrigió en esta versión

1. **Persistencia de datos** → la app usaba `window.storage`, que es exclusivo del
   entorno donde se construyó y no existe en un sitio publicado normalmente.
   → Ahora usa **IndexedDB** como almacenamiento principal (persistente en el
   dispositivo) con **localStorage** como respaldo automático. Tus registros de
   entrenamientos, medidas y comidas ahora sí sobreviven al cerrar y reabrir la app.

2. **Íconos** → los `icon-192.png` / `icon-512.png` que tenías eran archivos de
   texto de marcador de posición (placeholders), no imágenes reales — por eso el
   manifest no podía usarlos. Se generaron íconos reales (mancuerna en verde
   lima sobre fondo oscuro, mismo estilo que el resto de tus apps) en los
   tamaños correctos.

3. **Manifest incompleto** → le faltaban campos recomendados (`scope`,
   `description`, `display_override`, `purpose: any maskable` en los íconos,
   etiquetas para iOS). Se completó siguiendo el mismo patrón que tu app de
   finanzas.

4. **Recomendación con IA** → la app le pide un plan a la API de Anthropic
   directamente desde el navegador. Eso funciona en el entorno de Claude, pero
   **no funcionará en GitHub Pages** porque no hay clave de API configurada
   ahí. Si esa llamada falla, ahora la app genera automáticamente una
   recomendación local básica (con tu racha actual y consejos generales), en
   vez de mostrar un error.

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

1. Crea un repositorio en GitHub (o usa uno existente).
2. Sube **todos** los archivos de esta carpeta a la raíz del repositorio,
   **conservando la carpeta `icons/`**.
3. Ve a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda y espera el despliegue (1-2 minutos).
7. Abre la URL HTTPS que te entregue GitHub Pages.

Las rutas son relativas (`./`), así que funcionan igual si el sitio queda en
`usuario.github.io` o en `usuario.github.io/nombre-repo/`.

## Instalación en el celular

- **Android (Chrome/Edge):** abre la URL, debería aparecer "Instalar app"
  automáticamente o en el menú ⋮.
- **iPhone/iPad (Safari):** botón compartir → "Añadir a pantalla de inicio".

Si ya habías instalado una versión anterior, desinstálala antes de instalar
esta, para que no quede el ícono o la caché vieja.

## Actualizaciones futuras

Cuando cambies `index.html` u otro archivo estático, incrementa `CACHE_NAME`
en `sw.js` (por ejemplo de `v1` a `v2`) para forzar que los usuarios reciban
la versión nueva.

## Sobre tus datos

Se guardan **solo en tu dispositivo/navegador** (IndexedDB + respaldo en
localStorage). No se envían a ningún servidor propio. Si cambias de celular
o navegador, perderás la información a menos que la app tenga una opción de
exportar/importar backup.
