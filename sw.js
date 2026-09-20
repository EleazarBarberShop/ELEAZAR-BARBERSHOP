const CACHE_NAME = 'mui-barber-beta-v1';
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

// Install Event: Cache all critical assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch Event: Serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if found
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate Event: Clean up old caches when a new version is pushed
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
