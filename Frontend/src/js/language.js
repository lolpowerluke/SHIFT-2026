// This changes the language of all links that have the .languageLink class if this file is linked in the html file. Before doing this, be sure that both links exist.
// The links should all follow a strict structure `link/to/file/nl/`. Make sure to link them to the Dutch version by default

getLanguage();

function getLanguage() {
  const lang = navigator.language;
  console.log(lang);
  if (!lang.includes("nl")) {
    document.querySelectorAll(".languageLink").forEach((link) => {
      link.href = link.href.replace("/nl/", "/en/");
    });
  }
}
