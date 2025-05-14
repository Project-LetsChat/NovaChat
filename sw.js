const CACHE_NAME = 'novachat-v1';
const ASSETS = [
  // Local assets
  '/',
  '/index.html',
  '/kwitter_room.html',
  '/kwitter_page.html',
  '/style.css',
  '/login.css',
  '/cookie.js',
  '/kwitter.js',
  '/kwitter_room.js',
  '/kwitter_page.js',
  
  // External assets
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME && caches.delete(key))
    ))
  );
});

// PWA
if (!navigator.onLine) {
  alert('You are offline. Some features may be limited.');
  // Handle offline state
}
