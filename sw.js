const staticCacheName = 'site-static-v18';
const assets = ['jokenpo-game/index.html', 'jokenpo-game/img/star.png', 'jokenpo-game/img/defeat.png', 'jokenpo-game/img/coins.png', 'jokenpo-game/img/bot.png', 'jokenpo-game/img/pedra.png', 'jokenpo-game/img/papel.png', 'jokenpo-game/img/tesoura.png'];
self.addEventListener('install', evt => {
    evt.waitUntil(caches.open(staticCacheName).then((cache) => {
        console.log('Cacheando arquivos estaticos...');
        cache.addAll(assets);
    }));
});
self.addEventListener('activate', evt => { evt.waitUntil(caches.keys().then(keys => { return Promise.all(keys.filter(key => key !== staticCacheName).map(key => caches.delete(key))); })); });
self.addEventListener('fetch', evt => { evt.respondWith(caches.match(evt.request).then(cacheRes => { return cacheRes || fetch(evt.request); })); })