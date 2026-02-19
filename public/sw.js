self.addEventListener('install', () => {
    // Force immediate update
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    // Unregister and reload all clients to purge the ghost cache
    self.registration.unregister().then(() => {
        self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
                client.navigate(client.url);
            });
        });
    });
});
