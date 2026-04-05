const params = new URLSearchParams(window.location.search);
const paramArr = [...params.entries()];
const key = params.get("key");
const API_URL = "localhost:5173";

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
		// fetch function
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

async function emailConfirmation() {}

console.log(key);
