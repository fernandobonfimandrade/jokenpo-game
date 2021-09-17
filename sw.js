const staticCacheName = 'site-static-v18';
const assets = ['jokenpo-game/index.html', 'jokenpo-game/img/star.png', 'jokenpo-game/img/defeat.png', 'jokenpo-game/img/coins.png', 'jokenpo-game/img/bot.png', 'jokenpo-game/img/pedra.png', 'jokenpo-game/img/papel.png', 'jokenpo-game/img/tesoura.png'];
self.addEventListener('install', evt => {
    evt.waitUntil(caches.open(staticCacheName).then((cache) => {
        console.log('Cacheando arquivos estaticos...');
        cache.addAll(assets);
    }));
});
self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key === staticCacheName) { return; }
            return caches.delete(key);
        }))
    }));
});
self.addEventListener('fetch', (e) => {
    e.respondWith((async() => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r; }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});