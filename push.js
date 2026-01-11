const VAPID_PUBLIC_KEY = "BAjfTioO3MTqlkLD3jMZoHnX89kAdQ17tSVY7pmA-QjHzSiVKmzxrnmouTqvRDSqycvUNgDPsKm7E6SY6GtZ5lk";

// Convert base64 key
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });

  console.log("📌 Push Subscription:", subscription);

  // SEND TO BACKEND
  await fetch("https://notify-backend-7i6s.onrender.com/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(subscription)
  });
}
