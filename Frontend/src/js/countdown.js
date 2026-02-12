// base from W3schools
// https://www.w3schools.com/howto/howto_js_countdown.asp

const countdownString = "2026-03-26T00:00:00";
const countDownDate = new Date(countdownString).getTime();
const secondInMs = 1000;
const minuteInMs = secondInMs * 60;
const hourInMs = minuteInMs * 60;
const dayInMs = hourInMs * 24;

// Update the count down every 1 second
const x = setInterval(function () {
	const now = new Date().getTime();

	const distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	const days = Math.floor(distance / dayInMs);
	const hours = Math.floor((distance % dayInMs) / hourInMs);
	const minutes = Math.floor((distance % hourInMs) / minuteInMs);
	const seconds = Math.floor((distance % minuteInMs) / secondInMs);

	document.getElementById("timer").innerHTML =
		days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

	// When countdown finishes
	if (distance <= 0) {
		clearInterval(x);
		document.getElementById("timer").innerHTML = "EXPIRED";
	}
}, secondInMs);
