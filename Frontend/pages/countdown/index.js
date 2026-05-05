import { icsContent } from "../../src/js/comp/calendar";
const API_URL = import.meta.env.VITE_API_URL;

const agree = document.getElementById("check");
const submitButton = document.getElementById("submit");
const signupForm = document.getElementById("signup");

signupForm.addEventListener("change", function () {
  const checkedAgreement = agree.checked;
  const validEmail = document.getElementById("email").validity.valid;
  submitButton.disabled = !(checkedAgreement && validEmail);
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  document.getElementById("warningTxt").classList.add("hidden");

  const validEmail = document.getElementById("email").validity.valid;
  if (!agree.checked || !validEmail) {
    if (!agree.checked) {
      emailFormErrors("noAgree");
    } else {
      emailFormErrors("invalidEmail");
    }
    return;
  }

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
    emailFormErrors("serverError");
  }
});

function emailFormErrors(reason) {
  const warning = document.getElementById("warningTxt");
  switch (reason) {
    case "noAgree":
      document.getElementById("warningTxt").innerText =
        "Gelieve akkoord te gaan om uw data te delen met SHIFT";
      break;
    case "invalidEmail":
      warning.innerText = "Gelieve een geldig e-mailadres in te voeren";
      break;
    case "serverError":
      warning.innerText = "Inschrijven niet gelukt. Probeer opnieuw.";
      break;
    default:
      warning.innerText =
        "Er is een onbekende fout opgetreden. Probeer later opnieuw.";
  }
  document.getElementById("warningTxt").classList.remove("hidden");
}

const pageURL = "localhost:5173/pages/countdown/";
document.getElementById("std").addEventListener("click", function () {
  const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
  if (isApple) {
    const link = document.createElement("a");
    link.href = `webcal://${pageURL}/shiftCalendar.ics`;
    link.click();
  } else {
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=SHIFT+-+Save+the+Date&dates=20260619T150000Z/20260619T190000Z&details=Our+third+year+students+are+showing+off+their+final+projects!&location=Nijverheidskaai+170,+1070+Anderlecht`;

    window.open(gcalUrl, "_blank");
  }
});

// code for ics file download so people can add the event to their own agendas if they wanna be special and don't use google or apple calendar
// document.getElementById("std").addEventListener("click", function () {
//   const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");
//   link.href = url;
//   link.download = "shiftCalendar.ics";
//   link.click();

//   URL.revokeObjectURL(url);
// });

//Scrolldown pointer
document.getElementById("scrollPointer").addEventListener("click", function () {
  const next = document.querySelector(".copy-text");

  if (next) {
    next.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});
