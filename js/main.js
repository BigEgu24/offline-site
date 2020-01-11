// Make sure sw are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/offline-site.github.io/sw_cached_pages.js', {
        scope: '/offline-site.github.io/sw_cached_pages.js'
      })
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}
