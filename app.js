const statusText = document.getElementById("status");
const button = document.getElementById("setReminder");
button.addEventListener("click", async () => {

  const title = document.getElementById("title").value;
  const time = document.getElementById("time").value;

  if (!title || !time) {
    alert("Please enter title and time");
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    alert("Notification permission required");
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.getSubscription();

  await fetch("https://notify-37l1.onrender.com/reminder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, time, subscription })
  });

  document.getElementById("status").innerText =
    "⏰ Reminder set successfully";
});


