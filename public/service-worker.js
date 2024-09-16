const CACHE_NAME = 'gopro-wifi-enabler-cache-v1';
const urlsToCache = [
  '/gopro-wifi-enabler/',
  '/gopro-wifi-enabler/manifest.json',
  '/gopro-wifi-enabler/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => console.error('Failed to cache', error))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('.css') || event.request.url.endsWith('.js')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});