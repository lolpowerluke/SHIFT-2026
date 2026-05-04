const API_URL = import.meta.env.VITE_API_URL;

document.querySelector("button").addEventListener("click", async () => {
  const response = await fetch(`${API_URL}/mail/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.querySelector("input").value,
    }),
  });
});
