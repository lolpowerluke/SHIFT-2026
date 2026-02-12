const API_URL = import.meta.env.VITE_API_URL;

const secondInMs = 1000;
const minuteInMs = secondInMs * 60;
const hourInMs = minuteInMs * 60;

// fetch API time from /api/countdown
const APICountdownString = await backendLink("/api/countdown");
const countdownString = APICountdownString.date
	? APICountdownString.date
	: "2026-03-26T00:00:00";

// base from W3schools
// https://www.w3schools.com/howto/howto_js_countdown.asp
const countDownDate = new Date(countdownString).getTime();
const x = setInterval(function () {
	const now = new Date().getTime();

	const distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	const hours = Math.floor(distance / hourInMs);
	const minutes = Math.floor((distance % hourInMs) / minuteInMs);
	const seconds = Math.floor((distance % minuteInMs) / secondInMs);

	document.getElementById("timer").innerHTML = hours + ":" + minutes + ":" + seconds;

	// When countdown finishes
	if (distance <= 0) {
		clearInterval(x);
		document.getElementById("timer").innerHTML = "EXPIRED";
	}
}, secondInMs);

async function backendLink(endPoint) {
	let data;
	try {
		const response = await fetch(`${API_URL}${endPoint}`);
		data = await response.json();
	} catch (e) {
		console.log(e.message);
	}
	return data;
}
