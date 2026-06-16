import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import s from "./Form.module.css";
import { apiFetch, getTokenPayload } from "../../../utils/apiFetch.js";
import FilePill from "../../../components/filePill/FilePill.jsx";
import ImagePreviewField from "../../../components/imagePreviewField/ImagePreviewField.jsx";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;

function isValidURL(str) {
	try {
		new URL(str);
		return true;
	} catch {
		return false;
	}
}

function validateImageFile(file) {
	if (!file) return "Missing image";
	if (file.size > MAX_IMAGE_SIZE) return "Afbeelding mag max 2MB zijn";
	return null;
}

function validateProjectImageRatio(file) {
	return new Promise((resolve, reject) => {
		if (!file) return reject("Project image ontbreekt");

		const img = new Image();
		const objectUrl = URL.createObjectURL(file);
		img.src = objectUrl;

		img.onload = () => {
			URL.revokeObjectURL(objectUrl);
			const diff = Math.abs(img.width / img.height - 16 / 9);
			if (diff > 0.01) {
				reject("Project image moet 16:9 (1920x1080) zijn");
			} else {
				resolve(true);
			}
		};

		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject("Invalid image file");
		};
	});
}

function validatePDF(file) {
	if (!file) return "PDF ontbreekt";
	if (file.size > MAX_PDF_SIZE) return "PDF mag max 10MB zijn";
	if (file.type !== "application/pdf") return "Alleen PDF bestanden toegestaan";
	return null;
}

export default function ProjectForm() {
	// Project info
	const [nameProject, setNameProject] = useState("");
	const [description, setDescription] = useState("");
	const [course, setCourse] = useState("");
	const [promoter, setPromoter] = useState("");

	// Person 1
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [linkedinURL, setLinkedinURL] = useState("");
	const [selfieFile, setSelfieFile] = useState(null);
	const [selfieExistingPicture, setSelfieExistingPicture] = useState(null);

	// Person 2
	const [showExtra, setShowExtra] = useState(false);
	const [p2FirstName, setP2FirstName] = useState("");
	const [p2LastName, setP2LastName] = useState("");
	const [p2Email, setP2Email] = useState("");
	const [p2LinkedIn, setP2LinkedIn] = useState("");
	const [p2SelfieFile, setP2SelfieFile] = useState(null);
	const [p2ExistingPicture, setP2ExistingPicture] = useState(null);

	// Project media — new files
	const [projectFiles, setProjectFiles] = useState([]);
	const [videoURL, setVideoURL] = useState("");
	const [magazineFile, setMagazineFile] = useState(null);

	// Restored media from server
	const [existingImages, setExistingImages] = useState([]);
	const [existingMagazine, setExistingMagazine] = useState(null);
	const [existingVideo, setExistingVideo] = useState("");

	// Cleared flags
	const [imagesCleared, setImagesCleared] = useState(false);
	const [magazineCleared, setMagazineCleared] = useState(false);

	// Admin
	const [isAdmin, setIsAdmin] = useState(false);
	const [allProjects, setAllProjects] = useState([]);
	const [selectedProjectId, setSelectedProjectId] = useState(null);
	const [projectMemberIds, setProjectMemberIds] = useState([]);

	// Submit state
	const [submitState, setSubmitState] = useState("idle");
	const [submitError, setSubmitError] = useState("");
	const [urlErrors, setUrlErrors] = useState({});

	const navigate = useNavigate();
	const previewURLsRef = useRef([]);

	useEffect(() => {
		const payload = getTokenPayload();
		if (!payload) {
			navigate("/login", { state: { from: location.pathname }, replace: true });
			return;
		}

		if (payload.role === "admin") {
			setIsAdmin(true);
			loadAllProjects();
		} else {
			prefill(payload.id);
		}
	}, []);

	useEffect(() => {
		return () => {
			previewURLsRef.current.forEach((url) => URL.revokeObjectURL(url));
			previewURLsRef.current = [];
		};
	}, [projectFiles]);

	async function loadAllProjects() {
		const projData = await apiFetch("/project/admin");
		if (!projData.success) return;
		setAllProjects(projData.projects || []);
	}

	async function loadProjectForAdmin(project) {
		setSelectedProjectId(project.id);

		setNameProject(project.name || "");
		setDescription(project.description || "");
		if (project.course) setCourse(project.course);
		if (project.promoter) setPromoter(project.promoter);
		setExistingImages(
			Array.isArray(project.media) && project.media.length ? project.media : [],
		);
		setProjectFiles([]);
		setImagesCleared(false);
		setMagazineFile(null);
		setMagazineCleared(false);

		setExistingMagazine(
			project.magazine
				? `https://res.cloudinary.com/${project.magazine.cloud_name}/image/upload/${project.magazine.path}`
				: null,
		);

		if (project.video?.path) {
			setExistingVideo(project.video.path);
			setVideoURL(project.video.path);
		} else {
			setExistingVideo("");
			setVideoURL("");
		}

		const members = Array.isArray(project.members) ? project.members : [];
		setProjectMemberIds(members.map((m) => m.id));
		const p1 = members[0] ?? null;
		const p2 = members[1] ?? null;

		if (p1) {
			const p1Data = await apiFetch(`/api/user?id=${p1.id}`);
			const u = p1Data.success ? p1Data.user : p1;
			setFirstName(u.firstname || "");
			setLastName(u.lastname || "");
			setEmail(u.email || "");
			setLinkedinURL(
				Array.isArray(u.socials) && u.socials.length ? u.socials[0] : "",
			);

			const pic = u.images?.length ? u.images[0] : (p1.picture ?? null);
			setSelfieExistingPicture(
				pic
					? {
						url: `https://res.cloudinary.com/${pic.cloud_name}/image/upload/${pic.path}`,
						name: pic.path.split("/").pop(),
					}
					: null,
			);
			setSelfieFile(null);
		}

		if (p2) {
			setShowExtra(true);
			setP2FirstName(p2.firstname || "");
			setP2LastName(p2.lastname || "");
			setP2Email(p2.email || "");
			setP2LinkedIn(
				Array.isArray(p2.socials) && p2.socials.length ? p2.socials[0] : "",
			);
			setP2ExistingPicture(
				p2.picture
					? {
						url: `https://res.cloudinary.com/${p2.picture.cloud_name}/image/upload/${p2.picture.path}`,
						name: p2.picture.path.split("/").pop(),
					}
					: null,
			);
			setP2SelfieFile(null);
		} else {
			setShowExtra(false);
			setP2FirstName("");
			setP2LastName("");
			setP2Email("");
			setP2LinkedIn("");
			setP2SelfieFile(null);
			setP2ExistingPicture(null);
		}

		setSubmitState("idle");
		setSubmitError("");
		setUrlErrors({});
	}

	async function prefill(activeId) {
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
		if (user.images?.length) {
			setSelfieExistingPicture({
				url: `https://res.cloudinary.com/${user.images[0].cloud_name}/image/upload/${user.images[0].path}`,
				name: user.images[0].path.split("/").pop(),
			});
		}

		const projData = await apiFetch("/project/");
		if (!projData.success) return;

		const myProject = projData.projects.find(
			(p) =>
				Array.isArray(p.members) && p.members.some((m) => m.id === activeId),
		);
		if (!myProject) return;

		setNameProject(myProject.name || "");
		setDescription(myProject.description || "");
		if (myProject.course) setCourse(myProject.course);
		if (myProject.promoter) setPromoter(myProject.promoter);

		if (Array.isArray(myProject.media) && myProject.media.length) {
			setExistingImages(myProject.media);
		}
		if (myProject.magazine) {
			setExistingMagazine(
				`https://res.cloudinary.com/${myProject.magazine.cloud_name}/image/upload/${myProject.magazine.path}`,
			);
		}
		if (myProject.video?.path) {
			setExistingVideo(myProject.video.path);
			setVideoURL(myProject.video.path);
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
					url: `https://res.cloudinary.com/${m2.picture.cloud_name}/image/upload/${m2.picture.path}`,
					name: m2.picture.path.split("/").pop(),
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

		try {
			const projectImage = projectFiles?.[0];

			if (!projectImage && !existingImages.length) {
				setSubmitError("Project image ontbreekt");
				setSubmitState("error");
				return;
			}

			if (projectImage) {
				await validateProjectImageRatio(projectImage);
				for (const file of projectFiles) {
					const err = validateImageFile(file);
					if (err) {
						setSubmitError(err);
						setSubmitState("error");
						return;
					}
				}
			}

			if (magazineFile) {
				const pdfError = validatePDF(magazineFile);
				if (pdfError) {
					setSubmitError(pdfError);
					setSubmitState("error");
					return;
				}
			}
		} catch (err) {
			setSubmitError(
				typeof err === "string" ? err : err?.message || "Validatie fout",
			);
			setSubmitState("error");
			return;
		}

		const payload = getTokenPayload();
		const currentUserId = payload?.id ?? null;

		if (isAdmin && !selectedProjectId) {
			setSubmitState("error");
			setSubmitError("Geen project geselecteerd");
			return;
		}

		// AFTER — get p1 user id from projectMemberIds[0]
		const p1UserId = isAdmin ? projectMemberIds[0] ?? null : currentUserId;

		if (p1UserId) {
			try {
				const userFormData = new FormData();
				if (firstName) userFormData.append("firstname", firstName.trim());
				if (lastName) userFormData.append("lastname", lastName.trim());
				if (linkedinURL) userFormData.append("socials", linkedinURL.trim());
				if (selfieFile) userFormData.append("image", selfieFile);
				const endpoint = isAdmin ? `/api/user?id=${p1UserId}` : "/api/user";
				await apiFetch(endpoint, { method: "PUT", body: userFormData });
			} catch (err) {
				console.error("User update failed:", err);
			}
		}

		let memberIds;
		let p2UserId = null;

		if (isAdmin) {
			memberIds = [...projectMemberIds];
			if (p2Email.trim()) {
				try {
					const result = await apiFetch(
						`/api/user?email=${encodeURIComponent(p2Email.trim())}`,
					);
					if (result.success) p2UserId = result.user.id;
				} catch { }
			}
		} else {
			memberIds = currentUserId ? [currentUserId] : [];
			if (p2Email.trim()) {
				try {
					const result = await apiFetch(
						`/api/user?email=${encodeURIComponent(p2Email.trim())}`,
					);
					if (result.success) {
						p2UserId = result.user.id;
						memberIds.push(result.user.id);
					}
				} catch { }
			}
		}

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

		const cleanForm = new FormData();
		cleanForm.append("name", nameProject.trim());
		cleanForm.append("description", description.trim());
		cleanForm.append("course", course.trim());
		cleanForm.append("promoter", promoter.trim());
		cleanForm.append("videoURL", videoURL.trim());
		cleanForm.append("memberIds", JSON.stringify(memberIds));

		if (projectFiles.length) {
			projectFiles.forEach((f) => cleanForm.append("files", f));
		} else if (imagesCleared) {
			cleanForm.append("imageURL", "");
		}

		if (magazineFile) {
			cleanForm.append("magazine", magazineFile);
		} else if (magazineCleared) {
			cleanForm.append("magazineURL", "");
		}

		try {
			const result = selectedProjectId
				? await apiFetch(`/project/${selectedProjectId}`, {
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

	function handleProjectFilesChange(e) {
		setProjectFiles(Array.from(e.target.files));
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

	const imagePreviewURLs = projectFiles.length
		? projectFiles.map((f) => {
			const url = URL.createObjectURL(f);
			previewURLsRef.current.push(url);
			return { key: f.name, url, name: f.name };
		})
		: existingImages.map((img) => ({
			key: img.id,
			url: `https://res.cloudinary.com/${img.cloud_name}/image/upload/${img.path}`,
			name: img.path.split("/").pop(),
		}));

	const magazineLabel = magazineFile
		? magazineFile.name
		: existingMagazine
			? (() => {
				const name = existingMagazine.split("/").pop();
				return name.endsWith(".pdf") ? name : `${name}.pdf`;
			})()
			: null;

	return (
		<div className="wrap">
			<div className="section">
				<h1>Project formulier</h1>
				{isAdmin && (
					<div className={s.adminProjectList}>
						<h3>Alle projecten</h3>
						<div className={s.projectList}>
							{allProjects.map((proj) => (
								<div className={s.project} key={proj.id}>
									<span
										type="button"
										className={`${s.adminProjectItem} ${selectedProjectId === proj.id ? s.adminProjectItemActive : ""}`}
										onClick={() => loadProjectForAdmin(proj)}
									>
										<span className={s.adminProjectName}>
											{proj.name || "(geen naam)"}
										</span>
										<span className={s.adminProjectMembers}>
											{Array.isArray(proj.members) && proj.members.length
												? proj.members
													.map(
														(m) =>
															`${m.firstname || ""} ${m.lastname || ""}`.trim() ||
															m.email,
													)
													.join(", ")
												: "—"}
										</span>
									</span>
								</div>
							))}
						</div>
					</div>
				)}
				{(!isAdmin || selectedProjectId) && (
					<>
						<h3>Vul je project aan.</h3>
						<form className={s.form} onSubmit={handleSubmit}>
							{/* Project info */}
							<div className={s.part}>
								<h3>Project info</h3>
								<div>
									<label htmlFor="nameProject">Project titel *</label>
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
									<label htmlFor="description">Omschrijving *</label>
									<textarea
										className={s.projectInfo}
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
										className={s.courseSelect}
										value={course}
										onChange={(e) => setCourse(e.target.value)}
									>
										<option disabled value="">
											Specialisatie...
										</option>
										<option value="XR & 3D">XR & 3D</option>
										<option value="Experience Design">Experience Design</option>
										<option value="Web & Mobile">Web & Mobile</option>
										<option value="Digital Design">Digital Design</option>
									</select>
								</div>
								<div>
									<span>Promoter *</span>
									<select
										required
										id="promoter"
										name="promoter"
										className={s.courseSelect}
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
							<div className={s.part}>
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
										<p className={s.error}>{urlErrors.linkedinURL}</p>
									)}
								</div>
								<ImagePreviewField
									id="choose-selfieFile"
									label="Portretfoto"
									hint="Max 2MB"
									file={selfieFile}
									existingPicture={selfieExistingPicture}
									onFileChange={setSelfieFile}
									onClearFile={() => setSelfieFile(null)}
									onClearExisting={() => setSelfieExistingPicture(null)}
									subtext="Gelieve in een 1:1 aspect ratio in te dienen"
								/>
							</div>

							{/* Extra person */}
							<div className={s.part}>
								<label
									htmlFor="extraPersonToggle"
									style={{ cursor: "pointer" }}
									onClick={() => setShowExtra((v) => !v)}
								>
									<h3>Extra persoon toevoegen</h3>
									<span className={s.addPerson}>
										<div
											className={s.line}
											style={{
												transform: showExtra
													? "translateY(13px) rotate(-45deg)"
													: "translateY(13px)",
												transition: "transform 0.2s",
											}}
										/>
										<div
											className={s.line}
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
										className={s.extraPersonForm}
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 10,
										}}
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
													setUrlErrors((prev) => ({
														...prev,
														p2LinkedIn: null,
													}));
												}}
											/>
											{urlErrors.p2LinkedIn && (
												<p className={s.error}>{urlErrors.p2LinkedIn}</p>
											)}
										</div>
										<ImagePreviewField
											id="choose-secondselfiefile"
											label="Portretfoto"
											hint="Max 2MB"
											file={p2SelfieFile}
											existingPicture={p2ExistingPicture}
											onFileChange={setP2SelfieFile}
											onClearFile={() => setP2SelfieFile(null)}
											onClearExisting={() => setP2ExistingPicture(null)}
											subtext="Gelieve in een 1:1 aspect ratio in te dienen"
										/>
									</div>
								)}
							</div>

							{/* Project media */}
							<div className={s.part}>
								<h3>Project media</h3>

								<div>
									<label htmlFor="choose-projectFile">Projectbeeld *</label>
									<small>Max 2MB</small>
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
													className={s.previewImg}
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
									<label className={s.subtext}>
										Gelieve in een 16:9 aspect ratio in te dienen
									</label>
								</div>

								<div>
									<label htmlFor="videoURL">Showreel</label>
									<small>
										Plaats je showreel op Youtube (unlisted) en laat hier de
										link achter.
									</small>
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
										<p className={s.error}>{urlErrors.videoURL}</p>
									)}
								</div>

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
									className={`submit ${submitState === "success" ? s.submitSuccess : ""}`}
									type="submit"
									disabled={
										submitState === "loading" || submitState === "success"
									}
								>
									{submitState === "loading"
										? "Bezig..."
										: submitState === "success"
											? "✓ Opgeslagen"
											: "Submit"}
								</button>
								{submitState === "error" && (
									<p className={s.submitError}>Fout: {submitError}</p>
								)}
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
}
