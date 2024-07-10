const CACHE_VERSION = "2024-07-19 9:30 PM";
const cf = [
    "/",
    "/index.html",
    "/repo.html",
    "/style.css",
    "/sign.css",
    "/main.js",
    "/markdown-it.min.js",
    "/sw.js",

    "/icon.png",
    "/manifest.json",

    "/svg/add_white_24dp.svg",
    "/svg/add_black_24dp.svg",
    "/svg/indo_24dp.svg",
    "/svg/done_white_24dp.svg",
    "/svg/mode_edit_white_24dp.svg",
];
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then(async (cache) => {
            console.log("ServiceWorker: Caching files:", cf.length, cf);
            try {
                cachedResult = await cache.addAll(cf);
            } catch (err) {
                console.error("sw: cache.addAll");
                for (let f of cf) {
                    try {
                        cachedResult = await cache.add(f);
                    } catch (err) {
                        console.warn("sw: cache.add", f);
                    }
                }
            }
            return cachedResult;
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_VERSION) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
