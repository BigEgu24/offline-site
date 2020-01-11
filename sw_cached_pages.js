const cacheName = 'v1';

const cacheAssets = [
  'index.html',
  'main.bundle.js',
  '/js/main.js'
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName){
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        }));
    }));
});

// Call Fetch Event
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching');
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
