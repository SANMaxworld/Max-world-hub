self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (e) => {
  // Isse app offline load hone mein madad milti hai
  e.respondWith(fetch(e.request));
});
