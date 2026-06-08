import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import "./index.css";

const BASE_URL = import.meta.env.VITE_API_URL;

async function apiFetch(path, opts = {}) {
	const token = localStorage.getItem("token");
	const isFormData = opts.body instanceof FormData;
	return fetch(`${BASE_URL}${path}`, {
		...opts,
		headers: {
			...(!isFormData ? { "Content-Type": "application/json" } : {}),
			Authorization: `Bearer ${token}`,
			...(opts.headers || {}),
		},
	}).then((r) => r.json());
}

function isValidURL(str) {
	try {
		new URL(str);
		return true;
	} catch {
		return false;
	}
}

/** Filename pill with ×-button */
function FilePill({ name, onClear }) {
	return (
		<span className="file-pill">
			{name}
			<button
				type="button"
				onClick={onClear}
				className="file-pill__clear"
				aria-label="Verwijder"
			>
				×
			</button>
		</span>
	);
}

export default function ProjectForm() {
	const navigate = useNavigate();
	const location = useLocation();

	// Project info
	const [nameProject, setNameProject] = useState("");
	const [description, setDescription] = useState("");
	const [course, setCourse] = useState("");
	const [promoter, setPromoter] = useState("");

	// Personal info
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [linkedinURL, setLinkedinURL] = useState("");
	const [selfieFile, setSelfieFile] = useState(null);
	const [selfieExistingPicture, setSelfieExistingPicture] = useState(null); // {url, name} | null

	// Extra person
	const [showExtra, setShowExtra] = useState(false);
	const [p2FirstName, setP2FirstName] = useState("");
	const [p2LastName, setP2LastName] = useState("");
	const [p2Email, setP2Email] = useState("");
	const [p2LinkedIn, setP2LinkedIn] = useState("");
	const [p2SelfieFile, setP2SelfieFile] = useState(null);
	const [p2ExistingPicture, setP2ExistingPicture] = useState(null); // {url, name} | null

	// Project media — new files
	const [projectFiles, setProjectFiles] = useState([]); // File[]
	const [videoURL, setVideoURL] = useState("");
	const [magazineFile, setMagazineFile] = useState(null); // File

	// Restored media from server
	const [existingImages, setExistingImages] = useState([]); // [{id, url}]
	const [existingMagazine, setExistingMagazine] = useState(null); // {id, url} | null
	const [existingVideo, setExistingVideo] = useState("");

	// Cleared flags (send empty string to backend to delete)
	const [imagesCleared, setImagesCleared] = useState(false);
	const [magazineCleared, setMagazineCleared] = useState(false);

	// Submit state
	const [submitState, setSubmitState] = useState("idle");
	const [submitError, setSubmitError] = useState("");
	const [urlErrors, setUrlErrors] = useState({});

	// useEffect(() => {
	// 	const token = localStorage.getItem("token");
	// 	if (!token) {
	// 		navigate("/login", { state: { from: location.pathname }, replace: true });
	// 		return;
	// 	}
	// 	prefill(token);
	// }, []);

	async function prefill(token) {
		const userData = await apiFetch("/api/user");
		if (!userData.success) {
			navigate("/login", { state: { from: location.pathname }, replace: true });
			return;
		}
		const user = userData.user;

		setFirstName(user.firstname || "");
		setLastName(user.lastname || "");
		setEmail(user.email || "");
		if (Array.isArray(user.socials) && user.socials.length) {
			setLinkedinURL(user.socials[0]);
		}
		if (user.picture) {
			setSelfieExistingPicture({
				url: user.picture,
				name: user.picture.split("/").pop(),
			});
		}

		const projData = await apiFetch("/project/");
		if (!projData.success) return;

		let currentUserId = null;
		try {
			currentUserId = JSON.parse(atob(token.split(".")[1])).id;
		} catch {}

		const activeId = currentUserId ?? user.id;

		const myProject = projData.projects.find(
			(p) =>
				Array.isArray(p.members) && p.members.some((m) => m.id === activeId),
		);
		if (!myProject) return;
		console.log(myProject);

		setNameProject(myProject.name || "");
		setDescription(myProject.description || "");
		if (myProject.course) setCourse(myProject.course);
		if (myProject.promoter) setPromoter(myProject.promoter);

		// Restore media
		if (Array.isArray(myProject.media) && myProject.media.length) {
			setExistingImages(myProject.media);
		}
		if (myProject.magazine?.url) {
			setExistingMagazine(myProject.magazine);
		}
		if (myProject.video?.url) {
			setExistingVideo(myProject.video.url);
			setVideoURL(myProject.video.url);
		}

		const others = myProject.members.filter((m) => m.id !== activeId);
		if (others.length) {
			const m2 = others[0];
			setShowExtra(true);
			setP2FirstName(m2.firstname || "");
			setP2LastName(m2.lastname || "");
			setP2Email(m2.email || "");
			if (Array.isArray(m2.socials) && m2.socials.length) {
				setP2LinkedIn(m2.socials[0]);
			}
			if (m2.picture) {
				setP2ExistingPicture({
					url: m2.picture,
					name: m2.picture.split("/").pop(),
				});
			}
		}
	}

	function validateURLFields() {
		const errors = {};
		if (videoURL && !isValidURL(videoURL)) errors.videoURL = "Geen geldige URL";
		if (linkedinURL && !isValidURL(linkedinURL))
			errors.linkedinURL = "Geen geldige URL";
		if (p2LinkedIn && !isValidURL(p2LinkedIn))
			errors.p2LinkedIn = "Geen geldige URL";
		return errors;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitError("");

		const errors = validateURLFields();
		if (Object.keys(errors).length) {
			setUrlErrors(errors);
			return;
		}
		setUrlErrors({});
		setSubmitState("loading");

		const token = localStorage.getItem("token");
		let currentUserId = null;
		try {
			currentUserId = JSON.parse(atob(token.split(".")[1])).id;
		} catch {}

		// 1. Update current user
		try {
			const userFormData = new FormData();
			if (firstName) userFormData.append("firstname", firstName.trim());
			if (lastName) userFormData.append("lastname", lastName.trim());
			if (linkedinURL) userFormData.append("socials", linkedinURL.trim());
			if (selfieFile) userFormData.append("image", selfieFile);

			await apiFetch("/api/user", { method: "PUT", body: userFormData });
		} catch (err) {
			console.error("User update failed:", err);
		}

		// 2. Find p2 by email
		const memberIds = currentUserId ? [currentUserId] : [];
		let p2UserId = null;
		if (p2Email.trim()) {
			try {
				const result = await apiFetch(
					`/api/user?email=${encodeURIComponent(p2Email.trim())}`,
				);
				if (result.success) {
					p2UserId = result.user.id;
					memberIds.push(result.user.id);
				}
			} catch {}
		}

		// 2b. Update p2
		if (p2UserId) {
			try {
				const p2FormData = new FormData();
				if (p2FirstName) p2FormData.append("firstname", p2FirstName.trim());
				if (p2LastName) p2FormData.append("lastname", p2LastName.trim());
				if (p2LinkedIn) p2FormData.append("socials", p2LinkedIn.trim());
				if (p2SelfieFile) p2FormData.append("image", p2SelfieFile);

				await apiFetch(`/api/user?id=${p2UserId}`, {
					method: "PUT",
					body: p2FormData,
				});
			} catch (err) {
				console.error("P2 user update failed:", err);
			}
		}

		// 3. Build project form
		const cleanForm = new FormData();
		cleanForm.append("name", nameProject.trim());
		cleanForm.append("description", description.trim());
		cleanForm.append("course", course.trim());
		cleanForm.append("promoter", promoter.trim());
		cleanForm.append("videoURL", videoURL.trim());
		cleanForm.append("memberIds", JSON.stringify(memberIds));

		// Images: new files take priority; otherwise signal clear or keep
		if (projectFiles.length) {
			projectFiles.forEach((f) => cleanForm.append("files", f));
		} else if (imagesCleared) {
			cleanForm.append("imageURL", ""); // explicit delete
		}

		// Magazine: new file takes priority; otherwise signal clear or keep
		if (magazineFile) {
			cleanForm.append("magazine", magazineFile);
		} else if (magazineCleared) {
			cleanForm.append("magazineURL", ""); // explicit delete
		}

		try {
			const existingData = await apiFetch("/project/");
			const existing = (existingData.projects || []).find(
				(p) =>
					Array.isArray(p.members) &&
					p.members.some((m) => m.id === currentUserId),
			);

			const result = existing
				? await apiFetch(`/project/${existing.id}`, {
						method: "PUT",
						body: cleanForm,
					})
				: await apiFetch("/project/", { method: "POST", body: cleanForm });

			if (result.success) {
				setSubmitState("success");
			} else {
				setSubmitState("error");
				setSubmitError(result.message || "Onbekende fout");
			}
		} catch (err) {
			setSubmitState("error");
			setSubmitError("Netwerk fout: " + err.message);
		}
	}

	// ── helpers ──────────────────────────────────────────────────────────────

	function handleProjectFilesChange(e) {
		const files = Array.from(e.target.files);
		setProjectFiles(files);
		setImagesCleared(false);
	}

	function clearImages() {
		setProjectFiles([]);
		setExistingImages([]);
		setImagesCleared(true);
	}

	function handleMagazineChange(e) {
		setMagazineFile(e.target.files[0] ?? null);
		setMagazineCleared(false);
	}

	function clearMagazine() {
		setMagazineFile(null);
		setExistingMagazine(null);
		setMagazineCleared(true);
	}

	// Displayed image list: new local files (object URLs) or existing URLs
	const imagePreviewURLs = projectFiles.length
		? projectFiles.map((f) => ({
				key: f.name,
				url: URL.createObjectURL(f),
				name: f.name,
			}))
		: existingImages.map((img) => ({
				key: img.id,
				url: img.url,
				name: img.url.split("/").pop(),
			}));

	// Displayed magazine label
	const magazineLabel = magazineFile
		? magazineFile.name
		: existingMagazine
			? existingMagazine.url.split("/").pop()
			: null;

	return (
		<div className="wrap">
			<div className="section">
				<h1>Project formulier</h1>
				<h3>
					Vul het korte formulier in om je project op de Shift festival website
					te plaatsen.
				</h3>
				<form className="form" onSubmit={handleSubmit}>
					{/* Project info */}
					<div className="part">
						<h3>Project info</h3>
						<div>
							<label htmlFor="nameProject">Project title *</label>
							<input
								type="text"
								id="nameProject"
								name="nameProject"
								required
								placeholder="Titel van het project..."
								value={nameProject}
								onChange={(e) => setNameProject(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="description">Descriptie *</label>
							<textarea
								className="projectInfo"
								id="description"
								name="description"
								maxLength={1250}
								rows={5}
								placeholder="Projectbeschrijving..."
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div>
							<span>Specialisatie *</span>
							<select
								required
								id="course"
								name="course"
								className="courseSelect"
								value={course}
								onChange={(e) => setCourse(e.target.value)}
							>
								<option disabled value="">
									Specialisatie...
								</option>
								<option value="XR & 3D">XR & 3D</option>
								<option value="Experience Design">Experience Design</option>
								<option value="Web & Mobile">Web & Mobile</option>
								<option value="Digital Deisgn">Digital Deisgn</option>
							</select>
						</div>
						<div>
							<span>Promoter *</span>
							<select
								required
								id="promoter"
								name="promoter"
								className="courseSelect"
								value={promoter}
								onChange={(e) => setPromoter(e.target.value)}
							>
								<option disabled value="">
									Promoter...
								</option>
								{[
									"Dennis Baptist",
									"Maaike Beuten",
									"Joni De Borger",
									"Peter Dickx",
									"Jan Everaert",
									"Bert Heyman",
									"Jan Snoekx",
									"Stefan Tilburgs",
									"Els Vande Kerckhove",
									"An Vanlierde",
									"Kobe Vermeire",
									"Ben Verschooris",
								].map((name) => (
									<option key={name} value={name}>
										{name}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Personal info */}
					<div className="part">
						<h3>Persoonlijke info</h3>
						<div>
							<label htmlFor="firstName">Voornaam *</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								placeholder="Voornaam..."
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor="lastName">Achternaam *</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								placeholder="Achternaam..."
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input
								type="text"
								id="email"
								name="email"
								placeholder="Email..."
								disabled
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="linkedinURL">LinkedIn</label>
							<input
								type="text"
								id="linkedinURL"
								name="linkedinURL"
								placeholder="LinkedIn URL..."
								value={linkedinURL}
								onChange={(e) => {
									setLinkedinURL(e.target.value);
									setUrlErrors((prev) => ({ ...prev, linkedinURL: null }));
								}}
							/>
							{urlErrors.linkedinURL && (
								<p className="error">{urlErrors.linkedinURL}</p>
							)}
						</div>
						<div>
							<label htmlFor="choose-selfieFile">Portretfoto</label>
							{selfieFile ? (
								<>
									<FilePill
										name={selfieFile.name}
										onClear={() => setSelfieFile(null)}
									/>
									<img
										src={URL.createObjectURL(selfieFile)}
										alt={selfieFile.name}
										className="preview-img"
									/>
								</>
							) : selfieExistingPicture ? (
								<>
									<FilePill
										name={selfieExistingPicture.name}
										onClear={() => setSelfieExistingPicture(null)}
									/>
									<img
										src={selfieExistingPicture.url}
										alt={selfieExistingPicture.name}
										className="preview-img"
									/>
								</>
							) : (
								<input
									type="file"
									accept="image/*"
									id="choose-selfieFile"
									name="choose-selfieFile"
									onChange={(e) => setSelfieFile(e.target.files[0] ?? null)}
								/>
							)}
							<label className="subtext">
								Gelieve in een 1:1 aspect ratio in te dienen
							</label>
						</div>
					</div>

					{/* Extra person */}
					<div className="part">
						<label
							htmlFor="extraPersonToggle"
							style={{ cursor: "pointer" }}
							onClick={() => setShowExtra((v) => !v)}
						>
							<h3>Extra persoon toevoegen</h3>
							<span className="addPerson">
								<div
									className="line"
									style={{
										transform: showExtra
											? "translateY(13px) rotate(-45deg)"
											: "translateY(13px)",
										transition: "transform 0.2s",
									}}
								/>
								<div
									className="line"
									style={{
										transform: showExtra
											? "translateY(13px) rotate(45deg)"
											: "translateY(13px) rotate(90deg)",
										transition: "transform 0.2s",
									}}
								/>
							</span>
						</label>
						{showExtra && (
							<div
								className="extraPersonForm"
								style={{ display: "flex", flexDirection: "column", gap: 10 }}
							>
								<div>
									<label htmlFor="2ndStudentFirstName">Voornaam</label>
									<input
										type="text"
										id="2ndStudentFirstName"
										name="2ndStudentFirstName"
										placeholder="Voornaam..."
										required={showExtra}
										value={p2FirstName}
										onChange={(e) => setP2FirstName(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="2ndStudentLastName">Achternaam</label>
									<input
										type="text"
										id="2ndStudentLastName"
										name="2ndStudentLastName"
										placeholder="Achternaam..."
										required={showExtra}
										value={p2LastName}
										onChange={(e) => setP2LastName(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="secondemail">Email</label>
									<input
										type="email"
										id="secondemail"
										name="secondemail"
										placeholder="Email..."
										autoComplete="email"
										required={showExtra}
										value={p2Email}
										onChange={(e) => setP2Email(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="secondlinkedinurl">LinkedIn</label>
									<input
										type="text"
										id="secondlinkedinurl"
										name="secondlinkedinurl"
										placeholder="LinkedIn URL..."
										value={p2LinkedIn}
										onChange={(e) => {
											setP2LinkedIn(e.target.value);
											setUrlErrors((prev) => ({ ...prev, p2LinkedIn: null }));
										}}
									/>
									{urlErrors.p2LinkedIn && (
										<p className="error">{urlErrors.p2LinkedIn}</p>
									)}
								</div>
								<div>
									<label htmlFor="choose-secondselfiefile">Portretfoto</label>
									{p2SelfieFile ? (
										<>
											<FilePill
												name={p2SelfieFile.name}
												onClear={() => setP2SelfieFile(null)}
											/>
											<img
												src={URL.createObjectURL(p2SelfieFile)}
												alt={p2SelfieFile.name}
												className="preview-img"
											/>
										</>
									) : p2ExistingPicture ? (
										<>
											<FilePill
												name={p2ExistingPicture.name}
												onClear={() => setP2ExistingPicture(null)}
											/>
											<img
												src={p2ExistingPicture.url}
												alt={p2ExistingPicture.name}
												className="preview-img"
											/>
										</>
									) : (
										<input
											type="file"
											accept="image/*"
											id="choose-secondselfiefile"
											name="choose-secondselfiefile"
											onChange={(e) =>
												setP2SelfieFile(e.target.files[0] ?? null)
											}
										/>
									)}
									<label className="subtext">
										Gelieve in een 1:1 aspect ratio in te dienen
									</label>
								</div>
							</div>
						)}
					</div>

					{/* Project media */}
					<div className="part">
						<h3>Project media</h3>

						{/* Images */}
						<div>
							<label htmlFor="choose-projectFile">Projectbeeld</label>
							{imagePreviewURLs.length > 0 ? (
								<>
									<FilePill
										name={
											projectFiles.length
												? `${projectFiles.length} bestand(en)`
												: imagePreviewURLs[0].name
										}
										onClear={clearImages}
									/>
									{imagePreviewURLs.map(({ key, url, name }) => (
										<img
											key={key}
											src={url}
											alt={name}
											className="preview-img"
										/>
									))}
								</>
							) : (
								<input
									type="file"
									accept="image/*"
									multiple
									id="choose-projectFile"
									name="choose-projectFile"
									onChange={handleProjectFilesChange}
								/>
							)}
							<label className="subtext">
								Gelieve in een 16:9 aspect ratio in te dienen
							</label>
						</div>

						{/* Video URL */}
						<div>
							<label htmlFor="videoURL">
								Plaats je video op YouTube en plaats de link hier onder (niet
								privé)
							</label>
							<input
								type="text"
								id="videoURL"
								name="videoURL"
								placeholder="YouTube link van je project footage..."
								value={videoURL}
								onChange={(e) => {
									setVideoURL(e.target.value);
									setUrlErrors((prev) => ({ ...prev, videoURL: null }));
								}}
							/>
							{urlErrors.videoURL && (
								<p className="error">{urlErrors.videoURL}</p>
							)}
						</div>

						{/* Magazine */}
						<div>
							<label htmlFor="choose-magazineFile">Magazine (pdf)</label>
							{magazineLabel ? (
								<FilePill name={magazineLabel} onClear={clearMagazine} />
							) : (
								<input
									type="file"
									accept=".pdf"
									id="choose-magazineFile"
									name="choose-magazineFile"
									onChange={handleMagazineChange}
								/>
							)}
						</div>

						<button
							className={`submit${submitState === "success" ? " submit-success" : ""}`}
							type="submit"
							disabled={submitState === "loading" || submitState === "success"}
						>
							{submitState === "loading"
								? "Bezig..."
								: submitState === "success"
									? "✓ Opgeslagen"
									: "Submit"}
						</button>
						{submitState === "error" && (
							<p className="submit-error">Fout: {submitError}</p>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
