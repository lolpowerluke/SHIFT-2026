
function projectForm() {
    document.querySelector(".submit").addEventListener("click", function() {
        document.querySelector(".form-3de").innerHTML = 
        `
        <div class="form-wrap">
        <div class="firstHalf">
        <label>In duo gewerkt? Graag hier het e-mailadres van de tweede persoon invullen.</label>
        <div class="textWrap">
						<input
							type="email"
							name="emailDuo"
							id="emailDuo"
							placeholder="email van tweede persoon..."
              />
					</div>
          <div class="textWrap">
						<select class="courseSelect">
              <option disabled selected>Kies een kategorie</option>
              <option value="Website">Website</option>
              <option>Installatie</option>
              <option>Mobile App</option>
              <option>VR & AR</option>
              <option>3D Games</option>
              <option>Motion</option>
            </select>
					</div>
					<div class="textWrap">
						<input
							type="text"
							name="nameProject"
							id="nameStudent"
              required
							placeholder="Naam project..."
						/>
					</div>
          <div class="textWrap">
            <textarea class="projectInfo" 
            name="description" 
            id="description"
            maxlength="250"
            rows="5"
            placeholder="Project description..."
            required ></textarea>
          </div>
          </div>
          <div class="secondHalf">
          <div class="textWrap">
						<input
							type="text"
							name="imgURL"
							id="imgURL"
              required
							placeholder="Image URL..."
						/>
					</div>
          <div class="textWrap">
						<input
							type="text"
							name="videoURL"
							id="videoURL"
              required
							placeholder="Video URL..."
						/>
					</div>
          <div class="textWrap">
						<input
							type="text"
							name="magazineURL"
							id="magazineURL"
              required
							placeholder="Magazine URL..."
						/>
					</div>
          </div>
					<div class="submitDiv">
            <button class="submit" type="submit">Submit</button>
					</div>
          </div>
        `
    })
}

projectForm();



/* Code used from [https://w3collective.com/preview-selected-img-file-input-js/]
Complete source in *README*
*/

/*
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

*/