// This optional code is used to register a service worker.
// register() is not called by default.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.[0-9]+){0,2}\.[0-9]+$/)
);

type Config = {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(
      (process as { env: { [key: string]: string } }).env.PUBLIC_URL,
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      console.warn('Public URL origin does not match window location origin.');
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `https://ajlunis.github.io/gopro-wifi-enabler/service-worker.js`;

      if (isLocalhost) {
        // Check service worker validity in localhost environment
        checkValidServiceWorker(swUrl, config);
      } else {
        // Register the service worker in production
        registerValidSW(swUrl, config);
      }

      // Force a reload if the service worker is not controlling the page
      if (!navigator.serviceWorker.controller) {
        console.log('Service worker is not controlling the page. Reloading...');
        window.location.reload();
      } else {
        console.log('Service worker already controlling the page.');
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl, { scope: '/gopro-wifi-enabler/' }) // Ensure correct scope
    .then((registration) => {
      console.log('Service worker registered successfully with scope:', registration.scope);

      // Check for updates to the service worker
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          console.log('New service worker is being installed.');

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content available; handle update logic
                console.log('New content available, service worker updated.');
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // Content is cached for offline use
                console.log('Content is cached for offline use.');
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        }
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
      alert('Service Worker registration failed. Please check the console for details.');
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  fetch(swUrl)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Service worker not found, unregister old service workers
        console.warn('Service worker not found. Unregistering old service workers.');
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            console.log('Old service worker unregistered. Reloading...');
            window.location.reload();
          });
        });
      } else {
        // Register valid service worker
        console.log('Service worker found. Proceeding with registration.');
        registerValidSW(swUrl, config);
      }
    })
    .catch((error) => {
      console.error('Error fetching service worker:', error);
      alert('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
          .then(() => {
            console.log('Service worker unregistered successfully.');
          })
          .catch((error) => {
            console.error('Error during service worker unregistration:', error);
          });
      })
      .catch((error) => {
        console.error('Error getting service worker registration:', error);
      });
  }
}
