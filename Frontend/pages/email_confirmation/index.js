const params = new URLSearchParams(window.location.search);
const API_URL = import.meta.env.VITE_API_URL;

const confirmBtn = document.getElementById("confirmBtn");
const preConfirm = document.getElementById("preconfirmation");
const postConfirm = document.getElementById("postconfirmation");
const previouslyConfirmed = document.getElementById("previouslyconfirmed");

// TODO: add backend check
const swapContent = (result) => {
	switch (result) {
		case "success":
			preConfirm.classList.add("hidden");
			postConfirm.classList.remove("hidden");
			break;
		case "previously confirmed":
			preConfirm.classList.add("hidden");
			previouslyConfirmed.classList.remove("hidden");
			break;
		case "error":
			// todo: add smth went wrong
			break;
		default:
			console.warn(`unhandled case: ${result}`);
	}
};

confirmBtn.addEventListener("click", () => {
	let response;
	try {
		response = emailConfirmation();
	} catch (e) {
		console.error(e.message);
	}
});

async function emailConfirmation() {
	const response = await fetch(
		`${API_URL}/mail/confirm?token${params.get("token")}`,
	);
	const data = await response.json();

	return data;
}

console.log(key);
