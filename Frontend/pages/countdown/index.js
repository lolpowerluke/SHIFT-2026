// TODO: email submission
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
  const email = Object.fromEntries(new FormData(signupForm));
  //   const result = await fetch(`${API_URL}/mail/signup`);
  console.log(email);
});
