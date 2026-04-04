import { icsContent } from "../../src/js/comp/calendar";
const API_URL = import.meta.env.VITE_API_URL;

const agree = document.getElementById("check");
const submitButton = document.getElementById("submit");
const signupForm = document.getElementById("signup");

signupForm.addEventListener("change", function () {
	const checkedAgreement = agree.checked;
	const validEmail = document.getElementById("email").validity.valid;
	submitButton.disabled = !(checkedAgreement && validEmail);
});

signupForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	if (!agree.checked) return;
	const { email } = Object.fromEntries(new FormData(signupForm));

	try {
		const result = await fetch(`${API_URL}/mail/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		});

		if (!result.ok) throw new Error(result.statusText);
	} catch (e) {
		console.error(e.message);
	}
});

window.addEventListener("load", () =>
	window.scrollTo({ top: 100, behavior: "smooth" }),
);

const pageURL = "localhost:5173/pages/countdown/";
document.getElementById("std").addEventListener("click", function () {
	const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
	if (isApple) {
		const link = document.createElement("a");
		link.href = `webcal://${pageURL}/shiftCalendar.ics`;
		link.click();
	} else {
		const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=SHIFT+-+Save+the+Date&dates=20260619T150000Z/20260619T190000Z&details=Our+third+year+students+are+showing+off+their+final+projects!&location=Nijverheidskaai+170,+1070+Anderlecht`;

		window.open(gcalUrl, "_blank");
	}
});

// code for ics file download so people can add the event to their own agendas if they wanna be special and don't use google or apple calendar
// document.getElementById("std").addEventListener("click", function () {
//   const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");
//   link.href = url;
//   link.download = "shiftCalendar.ics";
//   link.click();

//   URL.revokeObjectURL(url);
// });
