const CACHE_NAME = 'gopro-wifi-enabler-cache-v1';
const urlsToCache = [
  '/gopro-wifi-enabler/',
  '/gopro-wifi-enabler/manifest.json',
  '/gopro-wifi-enabler/favicon.ico',
  '/gopro-wifi-enabler/logo192.png',
  '/gopro-wifi-enabler/logo512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
          .catch((error) => {
            console.error('Error caching essential assets during installation:', error);
          });
      })
      .catch((error) => {
        console.error('Error opening cache during installation:', error);
      })
  );
});

// Fetch event - dynamic caching for CSS and JS files with error handling
self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;

  // Cache CSS and JS files dynamically
  if (requestUrl.endsWith('.css') || requestUrl.endsWith('.js')) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // If we have a cached response, return it
          if (cachedResponse) {
            return cachedResponse;
          }

          // Otherwise, fetch the asset and add it to the cache
          return fetch(event.request)
            .then((networkResponse) => {
              if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                console.error(`Failed to fetch ${requestUrl}:`, networkResponse.statusText);
                return networkResponse;
              }

              return caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, networkResponse.clone())
                    .catch((error) => {
                      console.error(`Failed to cache ${requestUrl}:`, error);
                    });
                  return networkResponse;
                });
            })
            .catch((error) => {
              console.error(`Network request failed for ${requestUrl}:`, error);
              // Optionally return a fallback response
            });
        })
        .catch((error) => {
          console.error(`Cache match failed for ${requestUrl}:`, error);
        })
    );
  } else {
    // For non-CSS/JS requests, use the cached response or network fallback
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          return cachedResponse || fetch(event.request);
        })
        .catch((error) => {
          console.error(`Error fetching ${requestUrl}:`, error);
        })
    );
  }
});