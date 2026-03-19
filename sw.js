const CACHE_NAME = 'ps-lounge-v1';

const PRE_CACHE = [
  '/',
  '/index.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRE_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  // ✅ تجاهل الـ requests مش GET
  if(event.request.method !== 'GET') return;

  // ✅ تجاهل الـ API calls
  if(event.request.url.includes('/api/')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // حدث الكاش في الخلفية بس لو status 200
        fetch(event.request).then((networkResponse) => {
          if(networkResponse && networkResponse.status === 200){
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(()=>{});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        // ✅ سيف بس لو status 200 مش partial
        if(networkResponse && networkResponse.status === 200){
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch(()=> cachedResponse);
    })
  );
});