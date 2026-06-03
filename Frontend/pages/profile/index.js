function setupDynamicInputs(container) {
  container.querySelectorAll('input').forEach(input => observe(input));
}

function observe(input) {
  input.addEventListener('input', function () {
    const parent = this.parentElement;
    const inputs = [...parent.querySelectorAll('input')];
    const last = inputs[inputs.length - 1];

    if (this === last) {
      if (this.value.trim() !== '') {
        const newInput = this.cloneNode();
        newInput.value = '';
        newInput.removeAttribute('id');
        parent.appendChild(newInput);
        observe(newInput);
      }
    } else {
      const secondToLast = inputs[inputs.length - 2];
      if (this === secondToLast && this.value.trim() === '' && last.value.trim() === '') {
        last.remove();
      }
    }
  });
}

document.querySelectorAll('.img-upload-zone, .social-zone').forEach(setupDynamicInputs);
document.querySelector("button").addEventListener("click", async () => {
  let firstName = document.querySelector(".firstName").value;
  let lastName = document.querySelector(".lastName").value;
  let imgElements = document.querySelectorAll(".img");
  let imgArray = [];
  for (const i of imgElements) {
    try {
      if (i.value != "") {
        const url = new URL(i.value);
        if (url.protocol === "http:" || url.protocol === "https:") {
          imgArray.push(i.value);
        }
      }
    } catch {
      console.log("invalid url");
    }
  }
  let socialElements = document.querySelectorAll(".social");
  let socialArray = [];
  for (const i of socialElements) {
    try {
      if (i.value != "") {
        const url = new URL(i.value);
        if (url.protocol === "http:" || url.protocol === "https:") {
          socialArray.push(i.value);
        }
      }
    } catch {
      console.log("invalid url");
    }
  }
  let body = {
    firstName: firstName,
    lastName: lastName,
    media: imgArray,
    socials: socialArray
  }
  const req = await fetch(import.meta.env.VITE_API_URL + "/api/user", {
    method: "PUT",
    body: body
  });
  const res = await req.json();
  console.log(res);
});
