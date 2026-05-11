/* Belgien 2026 — Service Worker
   Cached files work offline. Bump CACHE_VERSION to invalidate. */
const CACHE_VERSION = "belgien-2026-v9";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./camper.jpg"
];

// Hosts whose responses we want to cache for offline use
// (Leaflet library + CartoDB map tiles)
const EXTERNAL_HOSTS = [
  "unpkg.com",
  "basemaps.cartocdn.com",
  "a.basemaps.cartocdn.com",
  "b.basemaps.cartocdn.com",
  "c.basemaps.cartocdn.com",
  "d.basemaps.cartocdn.com"
];

const isCacheable = (url) => {
  try {
    const u = new URL(url);
    if (u.origin === location.origin) return true;
    return EXTERNAL_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith("." + h));
  } catch (e) {
    return false;
  }
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  // Network-first for navigations, cache-first for assets
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("./index.html"))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res.ok && isCacheable(req.url)) {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
