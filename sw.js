const CACHE_VERSION = "2024-07-07 10:20 PM";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/repo.html",
                "/style.css",
                "/sign.css",
                "/main.js",
                "/sw.js",

                "/icon.png",
                "/manifest.json",

                "/svg/add_white_24dp.svg",
                "/svg/indo_24dp.svg",
                "/svg/done_white_24dp.svg",
                "/svg/mode_edit_white_24dp.svg",
            ]);
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
