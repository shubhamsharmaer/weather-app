const CACHE_NAME = 'weather-app-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  '/manifest.json',
  '/offline.html',
];

// Install a service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
         .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
         })
    )
})

// Cache and return requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
         .then(() => {
            return fetch(event.request)
             .catch(() => caches.match('/offline.html'))
         })
    )
})

// Activate the service worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            Promise.all(
                cacheNames.map((cacheName) => {
                    if(!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
    
})