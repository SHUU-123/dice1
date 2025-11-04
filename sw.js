const CACHE_NAME = 'sw25-dice-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // 必要ならアイコンを追加
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // ネットワーク優先、失敗したらキャッシュ
  e.respondWith(
    fetch(e.request).catch(()=> caches.match(e.request))
  );
});
