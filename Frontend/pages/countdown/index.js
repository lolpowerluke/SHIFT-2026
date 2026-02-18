// TODO: email submission
// email can only be submitted if keep me up to date box is also checked

const agree = document.getElementById("check");
const submitButton = document.getElementById("submit");

agree.addEventListener("change", function () {
  submitButton.disabled = !this.checked;
  console.log(this.checked, "click");
  if (this.checked) submitButton.innerText = "→";
  else submitButton.innerText = "x";
});
