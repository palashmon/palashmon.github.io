/**
 * The name of the current cache
 * @type {String}
 */
const version = 'v2';

/**
 * Files to cache
 * @type {Array}
 */
const fileCache = ['/', '/index.html', '/css/style.min.css', '/css/montserrat.css', '/css/varela-round.css'];

this.oninstall = event => {
  event.waitUntil(
    caches.open(`static-${version}`).then(cache => {
      return cache.addAll(fileCache);
    })
  );
};

this.onfetch = event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(res => {
        const r = res.clone();
        caches.open(`static-${version}`).then(cache => {
          cache.put(event.request, r);
        });
        return res; // Don't wait for the request to cache
      });
    })
  );
};
