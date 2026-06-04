import React from "react";
import "./index.css";
import Footer from "../../components/Footer.jsx";
import { Link } from "react-router";

export default function ProjectForm() {
	return (
		<>
			<div className="wrap">
				<div className="section">
					<h1>Project formulier</h1>
					<h3>
						Vul het korte formulier in om je project op de Shift festival
						website te plaatsen.
					</h3>
					<form className="form" action="#">
						<div className="part">
							<h3>Project info</h3>
							<div>
								<label for="nameProject">Project title</label>
								<input
									type="text"
									name="nameProject"
									id="nameProject"
									required
									placeholder="Titel van het project..."
								/>
							</div>
							<div>
								<label for="description">Description</label>
								<textarea
									className="projectInfo"
									name="description"
									id="description"
									maxlength="1250"
									rows="5"
									placeholder="Projectbeschrijving..."
									required
								></textarea>
							</div>
							<div>
								<span>Specialisatie</span>
								<select
									required
									name="course"
									id="course"
									className="courseSelect"
								>
									<option disabled selected>
										Specialisatie
									</option>
									<option value="Website">Website</option>
									<option>Installatie</option>
									<option>Mobile App</option>
									<option>VR & AR</option>
									<option>3D Games</option>
									<option>Motion</option>
								</select>
							</div>
							<div>
								<span>Promoter</span>
								<select
									required
									name="promoter"
									id="promoter"
									className="courseSelect"
								>
									<option disabled selected>
										Promoter
									</option>
									<option value="Dennis Baptist">Dennis Baptist</option>
									<option value="Maaike Beuten">Maaike Beuten</option>
									<option value="Joni De Borger">Joni De Borger</option>
									<option value="Peter Dickx">Peter Dickx</option>
									<option value="Bert Heyman">Bert Heyman</option>
									<option value="Stefan Tilburgs">Stefan Tilburgs</option>
									<option value="Els Vande Kerckhove">
										Els Vande Kerckhove
									</option>
									<option value="An Vanlierde">An Vanlierde</option>
									<option value="Kobe Vermeire">Kobe Vermeire</option>
									<option value="Ben Verschooris">Ben Verschooris</option>
								</select>
							</div>
						</div>
						<div className="part">
							<h3>Personal info</h3>
							<div>
								<label for="nameStudent">Name</label>
								<input
									type="text"
									name="nameStudent"
									id="nameStudent"
									required
									placeholder="Jouw volledige naam..."
								/>
							</div>
							<div>
								<label for="email">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="E-mail..."
									autocomplete="email"
									disabled
									required
								/>
							</div>
							<div>
								<label for="linkedinURL">LinkedIn</label>
								<input
									type="text"
									name="linkedinURL"
									id="linkedinURL"
									required
									placeholder="URL naar LinkedIn profiel..."
								/>
							</div>
							<div>
								<label for="choose-file">Selfie</label>
								<input
									type="file"
									accept="image/*"
									id="choose-selfieFile"
									name="choose-selfieFile"
								/>
							</div>
						</div>
						<div className="part">
							<input type="checkbox" hidden id="extraPersonToggle" />
							<label for="extraPersonToggle" href="#">
								<h3>Extra persoon toevoegen</h3>
								<span className="addPerson">
									<div className="line"></div>
									<div className="line"></div>
								</span>
							</label>
							<div className="extraPersonForm">
								<div>
									<label for="secondnamestudent">Name</label>
									<input
										type="text"
										name="secondnamestudent"
										id="secondnamestudent"
										placeholder="jouw volledige naam..."
									/>
								</div>
								<div>
									<label for="secondemail">Email</label>
									<input
										type="email"
										name="secondemail"
										id="secondemail"
										placeholder="e-mail..."
										autocomplete="email"
									/>
								</div>
								<div>
									<label for="secondlinkedinurl">LinkedIn</label>
									<input
										type="text"
										name="secondlinkedinurl"
										id="secondlinkedinurl"
										placeholder="url naar linkedin profiel..."
									/>
								</div>
								<div>
									<label for="choose-file">Selfie</label>
									<input
										type="file"
										accept="image/*"
										id="choose-secondselfiefile"
										name="choose-secondselfiefile"
									/>
								</div>
							</div>
						</div>
						<div className="part">
							<h3>Project media</h3>
							<div>
								<label for="choose-file">Projectbeeld</label>
								<input
									type="file"
									accept="image/*"
									id="choose-projectFile"
									name="choose-projectFile"
								/>
							</div>
							<div>
								<label for="choose-file">
									Plaats je video op YouTube en plaats de link hier onder (niet
									privé)
								</label>
								<input
									type="text"
									name="videoURL"
									id="videoURL"
									required
									placeholder="YouTube link van je project footage..."
								/>
							</div>
							<div>
								<label for="choose-file">Magazine (pdf)</label>
								<input
									type="file"
									accept=".pdf/*"
									id="choose-magazineFile"
									name="choose-magazineFile"
								/>
							</div>
						</div>
						<button className="submit" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
