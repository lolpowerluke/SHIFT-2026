const params = new URLSearchParams(window.location.search);
const API_URL = import.meta.env.VITE_API_URL;

const confirmBtn = document.getElementById("confirmBtn");
const preConfirm = document.getElementById("preconfirmation");
const postConfirm = document.getElementById("postconfirmation");

// TODO: add backend check

const swapToConfirmedEmail = () => {
	preConfirm.classList.add("hidden");
	postConfirm.classList.remove("hidden");
};

confirmBtn.addEventListener("click", () => {
	try {
		emailConfirmation();
	} catch (e) {
		// todo
	}

	checkEmailConfirmation();
});

function checkEmailConfirmation() {
	if (confirmed) {
		//TODO: fetch
		swapToConfirmedEmail();
	}
}

async function emailConfirmation() {
	const response = await fetch(`${API_URL}/mail/confirm`, {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: JSON.stringify(`token: ${params.get("token")}`),
	});
	const data = await response.json();

	return data;
}

console.log(key);
