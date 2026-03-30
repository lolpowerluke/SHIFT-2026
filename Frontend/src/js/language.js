getLanguage();

function getLanguage() {
  const lang = navigator.language;
  console.log(lang);
  if (!lang.includes("nl")) {
    document.querySelectorAll(".languageLink").forEach((link) => {
      link.href = link.href.replace("nl", "en");
    });
  }
}
