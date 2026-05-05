
/* Code used from [https://w3collective.com/preview-selected-img-file-input-js/]
Complete source in *README*
*/

const choose_projectFile = document.getElementById("choose-projectFile");
const choose_selfieFile = document.getElementById("choose-selfieFile");
const imgPreview = document.getElementById("img-preview");
const selfiePreview = document.getElementById("selfie-preview");


choose_projectFile.addEventListener("change", function () {
  getImgData();
});

choose_selfieFile.addEventListener("change", function () {
  getSelfieData();
});


function getImgData() {
  const files = choose_projectFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img src="' + this.result + '" />';
    });    
  }
}

function getSelfieData() {
  const files = choose_selfieFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      selfiePreview.style.display = "block";
      selfiePreview.innerHTML = '<img src="' + this.result + '" />';
    });    
  }
}