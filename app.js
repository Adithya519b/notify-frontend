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

  // ✅ STEP 1: Subscribe FIRST
  await subscribeToPush();

  // ✅ STEP 2: Send reminder (NO subscription here)
  const res = await fetch(
    "https://notify-backend-7i6s.onrender.com/reminder",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, time })
    }
  );

  if (!res.ok) {
    const err = await res.json();
    alert("Error: " + err.error);
    return;
  }

  statusText.innerText = "⏰ Reminder set successfully";
});
