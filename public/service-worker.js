const CACHE_NAME = 'gopro-wifi-enabler-cache-v1';
const urlsToCache = [
  '/501ac2b9-ebbf-4c84-8547-ff56c93880cc',
  '/index-Bf6tBU-m.css',
  '/index-DzkS1RDX.js',
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
