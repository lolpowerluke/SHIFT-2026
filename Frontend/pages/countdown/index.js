// TODO: email submission

const agree = document.getElementById("check");
const submitButton = document.getElementById("submit");

agree.addEventListener("change", function () {
  submitButton.disabled = !this.checked;
  console.log(this.checked, "click");
  if (this.checked) submitButton.innerText = "→";
  else submitButton.innerText = "x";
});
