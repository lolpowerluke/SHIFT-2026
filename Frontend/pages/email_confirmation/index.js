const confirmBtn = document.getElementById("confirmBtn");
const preConfirm = document.getElementById("preconfirmation");
const postConfirm = document.getElementById("postconfirmation");

let confirmed = false;

// TODO: add backend check
// TODO: add function to
const swapToConfirmedEmail = () => {
	preConfirm.classList.add("hidden");
	postConfirm.classList.remove("hidden");
};

confirmBtn.addEventListener("click", () => {
	confirmed = true;
	checkEmailConfirmation();
});

function checkEmailConfirmation() {
	if (confirmed) {
		swapToConfirmedEmail();
	}
}
