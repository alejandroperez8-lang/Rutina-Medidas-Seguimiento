const CACHE_NAME = 'rutina-app-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting()) // activa la nueva versión sin esperar a que se cierren todas las pestañas
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== CACHE_NAME)
             .map((name) => caches.delete(name)) // limpia versiones viejas de caché
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Para la navegación (el HTML principal) usamos "network-first": así, si
  // subes una versión nueva a GitHub Pages, el usuario la recibe de inmediato
  // en vez de quedarse atascado con la copia cacheada. Si no hay red, cae al caché.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return response;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Para el resto de assets propios (íconos, manifest) usamos "cache-first".
  event.respondWith(
    caches.match(req).then((response) => response || fetch(req))
  );
});
