
function projectForm() {
    document.querySelector(".submit").addEventListener("click", function() {
        document.querySelector(".form-3de").innerHTML = 
        `
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
							placeholder="Naam project..."
              required
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
          <div class="imageSelector">
            <label for="choose-file">Kies een foto van je project</label>
            <input type="file" accept="image/*" id="choose-projectFile" name="choose-projectFile" multiple/>
            <div id="file-list"></div>
          </div>
          <div class="videoSelector">
            <label for="choose-file">Laad hier een video van je project showreal op</label>
            <input type="file" accept=".mp4" id="choose-videoFile" name="choose-videoFile" multiple/>
          </div>
          <div class="documentSelector">
            <label for="choose-file">Laad hier uw magazine op (optioneel)</label>
            <input type="file" accept=".pdf" id="choose-docFile" name="choose-docFile" multiple/>
          </div>
					<div class="submitDiv">
            <button class="submit" type="submit">Submit</button>
					</div>
        `
    })
}

projectForm();


// Code used from Claude conversation: [https://claude.ai/share/c02ead92-f949-4440-8a09-0c1276af52e9]
// Source also in README

let allFiles = [];

document.addEventListener('change', (e) => {
  if (e.target.id !== 'choose-projectFile') return;

  const existing = new Set(allFiles.map(f => f.name + f.size));
  Array.from(e.target.files).forEach(f => {
    if (!existing.has(f.name + f.size)) allFiles.push(f);
  });

  e.target.value = '';
  renderFileList();
});

function renderFileList() {
  const fileList = document.getElementById('file-list');
  if (!fileList) return;
  fileList.innerHTML = allFiles
    .map((f, i) => `<p>${f.name} <button class="removeFile" type="button" data-index="${i}">✕</button></p>`)
    .join('');
}

document.addEventListener('click', (e) => {
  if (!e.target.matches('#file-list button')) return;
  const i = parseInt(e.target.dataset.index);
  allFiles.splice(i, 1);
  renderFileList();
});


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