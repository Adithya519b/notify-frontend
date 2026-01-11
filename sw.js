self.addEventListener("install", event => {
  console.log("🔧 Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("🚀 Service Worker Activated");
  self.clients.claim();
});
self.addEventListener("push", event => {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/assets/icon.png"
  });
});
