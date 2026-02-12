const API_URL = import.meta.env.VITE_API_URL;

const secondInMs = 1000;
const minuteInMs = secondInMs * 60;
const hourInMs = minuteInMs * 60;
const dayInMs = hourInMs * 24;

// fetch API time from /api/countdown

const APICountdownString = await backendLink("/api/countdown");
console.log(APICountdownString.date);
const countdownString = APICountdownString.date
  ? APICountdownString.date
  : "2026-03-26T10:30:00";

// base from W3schools
// https://www.w3schools.com/howto/howto_js_countdown.asp
const countDownDate = new Date(countdownString).getTime();

const x = setInterval(function () {
  const timer = document.getElementById("timer");

  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / dayInMs);
  const hours = Math.floor((distance % dayInMs) / hourInMs);
  const minutes = Math.floor((distance % hourInMs) / minuteInMs);
  const seconds = Math.floor((distance % minuteInMs) / secondInMs);

  timer.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S`;

  if (timer.classList.contains("hidden")) timer.classList.remove("hidden");

  // When countdown finishes
  if (distance <= 0) {
    clearInterval(x);
    timer.innerHTML = "EXPIRED";
  }
}, secondInMs);

async function backendLink(endPoint) {
  let data;
  try {
    const response = await fetch(`${API_URL}${endPoint}`);
    data = await response.json();
  } catch (e) {
    console.log(e.message);
    return {};
  }
  return data;
}
