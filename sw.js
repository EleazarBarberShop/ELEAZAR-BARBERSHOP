const CACHE_NAME = 'mui-barber-beta-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './services.html',
    './css/global.css',
    './css/login.css',
    './css/services.css',
    './js/login.js',
    './js/services.js',
    './js/whatsapp.js',
    './assets/images/barber.webp',
    './assets/images/man.png'
];

// 1. Install Event: Cache critical assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching all assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting()) // Forces the waiting service worker to become the active service worker
    );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Takes control of all open pages immediately
    );
});

// 3. Fetch Event: Dynamic Caching Strategies
self.addEventListener('fetch', (event) => {
    // Strategy A: Network-First for HTML Navigation
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Network successful, clone response and update cache
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Network failed (offline), serve from cache
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Strategy B: Stale-While-Revalidate for Static Assets (CSS, JS, Images)
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Initiate the background fetch to update the cache
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            }).catch(() => {
                // Silently fail if offline, the cached response will suffice
            });

            // Immediately return the cached response if we have it, otherwise wait for the network
            return cachedResponse || fetchPromise;
        })
    );
});
