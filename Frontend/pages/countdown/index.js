const API_URL = import.meta.env.VITE_API_URL;

const agree = document.getElementById("check");
const submitButton = document.getElementById("submit");
const signupForm = document.getElementById("signup");

agree.addEventListener("change", function () {
	submitButton.disabled = !this.checked;
	console.log(this.checked, "click");
	if (this.checked) submitButton.innerText = "→";
	else submitButton.innerText = "x";
});

signupForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	if (!agree.checked) return;
	console.log("submit");
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
