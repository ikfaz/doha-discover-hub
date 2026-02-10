import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// 5. Lifecycle: Activate the new worker immediately upon deployment
self.skipWaiting();
clientsClaim();

// 1. Pre-caching: Cache the App Shell (index.html, main.css, bundle.js)
// self.__WB_MANIFEST is injected by the build tool (e.g., Vite PWA plugin)
precacheAndRoute(self.__WB_MANIFEST);

// 2. Route Strategy - API/Content
// Handle dynamic content like tour data and blog posts
registerRoute(
  ({ url }) => url.pathname.includes('/api/tours') || url.pathname.startsWith('/blog/'),
  new NetworkFirst({
    cacheName: 'dynamic-content',
    networkTimeoutSeconds: 3, // Prevent hanging on slow connections (e.g., metro/desert)
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // Keep for 24 hours
      }),
    ],
  })
);

// 3. Route Strategy - Assets
// Cache images and fonts aggressively for performance
registerRoute(
  ({ request, url }) => 
    request.destination === 'image' || 
    request.destination === 'font' ||
    /\.(?:png|jpg|jpeg|webp)$/i.test(url.pathname),
  new CacheFirst({
    cacheName: 'static-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// 4. Offline Fallback
setCatchHandler(async ({ request }) => {
  if (request.mode === 'navigate') {
    // Serve the custom offline page if navigation fails
    const offlinePage = await matchPrecache('/offline.html');
    return offlinePage || Response.error();
  }
  return Response.error();
});