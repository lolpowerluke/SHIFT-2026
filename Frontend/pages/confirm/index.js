const params = new URLSearchParams(window.location.search);
const API_URL = import.meta.env.VITE_API_URL;

const confirmBtn = document.getElementById("confirmBtn");
const preConfirm = document.getElementById("preconfirmation");
const postConfirm = document.getElementById("postconfirmation");
const previouslyConfirmed = document.getElementById("previouslyconfirmed");
const error = document.getElementById("error");
const throbber = document.getElementById("throbber");

const swapContent = (result) => {
  switch (result) {
    case "success":
      preConfirm.classList.add("hidden");
      postConfirm.classList.remove("hidden");
      break;
    case "confirmed":
      preConfirm.classList.add("hidden");
      previouslyConfirmed.classList.remove("hidden");
      break;
    case "error":
      preConfirm.classList.add("hidden");
      error.classList.remove("hidden");
      break;
    default:
      console.warn(`unhandled case: ${result}`);
  }
};

confirmBtn.addEventListener("click", async () => {
  confirmBtn.disabled = true;
  let response;
  throbber.showModal();
  try {
    response = await emailConfirmation();
  } catch (e) {
    console.error("unsuccessful:", e.message);
  } finally {
    throbber.close();
  }
  swapContent(response.short);
});

async function emailConfirmation() {
  if (!params.get("token")) {
    swapContent("error");
    return;
  }

  const response = await fetch(
    `${API_URL}/mail/confirm?token=${params.get("token")}`,
  );

  if (!response.ok) {
    swapContent("error");
    return;
  }

  const data = await response.json();
  console.log(data);
  return data;
}
