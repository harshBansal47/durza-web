/**
 * Savevero's service worker.
 *
 * Three responsibilities:
 *
 *  1. Push notifications — the Push API requires a service worker.
 *  2. App shell caching — cache the HTML shell and static assets so the app
 *     loads instantly and works offline.
 *  3. Offline fallback — show a friendly offline page when the network is
 *     unavailable.
 *
 * Pages with live price data are NOT cached — a stale coupon page showing
 * yesterday's price is worse than a slow page. Only the app shell (HTML,
 * CSS, JS, fonts) is cached.
 */

const CACHE_NAME = "savevero-v1";
const OFFLINE_URL = "/offline.html";

// Assets to precache on install — the app shell only.
const PRECACHE_ASSETS = [
  "/",
  "/offline.html",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

/**
 * Fetch strategy:
 * - Static assets (CSS, JS, images, fonts): cache-first, then network
 * - HTML pages: network-first, then cache, then offline fallback
 * - API requests: network-only (never cache live data)
 */
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // API requests — network only, never cache
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // HTML pages — network-first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the successful response for offline use
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // Static assets — cache-first, then network
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        // Cache successful responses for static assets
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return response;
      });
    })
  );
});

/**
 * Clicking a notification should land on the product the alert was about.
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data && event.notification.data.url;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          if (target && "navigate" in client) {
            return client.navigate(target).then((navigated) => navigated || client.focus());
          }
          return client.focus();
        }
      }
      return self.clients.openWindow(target || "/account/alerts");
    })
  );
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { title: "Savevero", body: "A new deal just landed.", url: "/account/alerts" };
  }

  const title = payload.title || "Savevero";
  const options = {
    body: payload.body || "",
    tag: payload.tag || "savevero-alert",
    renotify: true,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: { url: payload.url || "/account/alerts" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
