const API_URL = import.meta.env.VITE_API_URL;

const secondInMs = 1000;
const minuteInMs = secondInMs * 60;
const hourInMs = minuteInMs * 60;
const dayInMs = hourInMs * 24;
let previousMinute = null;

// fetch API time from /api/countdown

const APICountdownString = await backendLink("/api/countdown");
console.log(APICountdownString.date);
const countdownString = APICountdownString.date
	? APICountdownString.date
	: "2026-03-26T10:30:00";

const timer = document.getElementById("timer");

// base from W3schools
// https://www.w3schools.com/howto/howto_js_countdown.asp
const countDownDate = new Date(countdownString).getTime();

const x = setInterval(function () {
	const now = new Date().getTime();
	const distance = countDownDate - now;

	const days = Math.floor(distance / dayInMs)
		.toString()
		.padStart(2, 0);
	const hours = Math.floor((distance % dayInMs) / hourInMs)
		.toString()
		.padStart(2, 0);
	const minutes = Math.floor((distance % hourInMs) / minuteInMs)
		.toString()
		.padStart(2, 0);
	const seconds = Math.floor((distance % minuteInMs) / secondInMs)
		.toString()
		.padStart(2, 0);

	blink("seconds", 500, 2);

	if (seconds === "00") {
		blink("minutes", 500, 2);
	}

	if (minutes === "00" && seconds === "00") {
		blink("hours", 500, 2);
	}

	timer.innerHTML = `<span class="xlarge">${days}</span>D <span id="hours" class="xlarge">${hours}</span>H <span id="minutes" class="xlarge">${minutes}</span>M <span id="seconds" class="xlarge">${seconds}</span>S`;

	if (timer.classList.contains("hidden")) timer.classList.remove("hidden");

	// When countdown finishes
	if (distance <= 0) {
		clearInterval(x);
		timer.innerHTML = "EXPIRED";
	}
}, secondInMs);

const blink = (target, time, count) => {
	let blinks = 0;
	const blinking = setInterval(() => {
		document.getElementById(target).classList.toggle("hidden");
		blinks++;
		if (blinks >= count) {
			clearInterval(blinking);
			document.getElementById(target).classList.toggle("hidden");
		}
	}, time);
};

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
