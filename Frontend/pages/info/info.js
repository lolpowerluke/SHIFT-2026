document.querySelector(".button-program").addEventListener('click', (e) => {
  e.preventDefault();

  setTimeout(() => {
    window.location.href = "../programma/";
  }, 400);
});