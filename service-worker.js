// console.log('Service Worker:  Ready to do its thang');
// serviceWorker will let us cache things so content is available offline
// Resource guide: https://hacks.mozilla.org/2016/03/debugging-service-workers-and-push-with-firefox-devtools/
// If using Mozilla Firefox Developer Edition, page to start service worker for debugging app: about:debugging#workers
// For more reading - https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
const cacheID = 'cacheaway';

// files you want to cache
const cacheList = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/responsive.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// open name defined in cache as constant, 'cacheaway' and return the list of files defined as constant cacheFiles
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheID).then(function(cache) {
            return cache.addAll(cacheList);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log('Already got it ', e.request, ' in cache mode');
                return response;
            }
            else {
                console.log('Currently in the process of grabbing it ', e.request, ' in cache!');
                return fetch(e.request)
                .then(function(response) {
                    const clonedResponse = response.clone();
                    caches.open('cacheID').then(function(cache) {
                        cache.put(e.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});
