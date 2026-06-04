import { useState, useEffect } from "react";
import "./index.css";

const BASE_URL = import.meta.env.VITE_API_URL;

function apiFetch(path, opts = {}) {
	const token = localStorage.getItem("token");
	return fetch(`${BASE_URL}${path}`, {
		...opts,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			...(opts.headers || {}),
		},
	}).then((r) => r.json());
}

export default function ProjectForm() {
	const token = localStorage.getItem("token");
	if (!token) {
		window.location.href = "/login";
		return null;
	}

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

	// Extra person
	const [showExtra, setShowExtra] = useState(false);
	const [p2FirstName, setP2FirstName] = useState("");
	const [p2LastName, setP2LastName] = useState("");
	const [p2Email, setP2Email] = useState("");
	const [p2LinkedIn, setP2LinkedIn] = useState("");
	const [p2SelfieFile, setP2SelfieFile] = useState(null);

	// Project media
	const [projectFile, setProjectFile] = useState(null);
	const [videoURL, setVideoURL] = useState("");
	const [magazineFile, setMagazineFile] = useState(null);

	// Submit state
	const [submitState, setSubmitState] = useState("idle");
	const [submitError, setSubmitError] = useState("");

	useEffect(() => {
		prefill();
	}, []);

	async function prefill() {
		const userData = await apiFetch("/api/user");
		if (!userData.success) {
			window.location.href = "/login";
			return;
		}
		const user = userData.user;

		setFirstName(user.firstname || "");
		setLastName(user.lastname || "");
		setEmail(user.email || "");
		if (Array.isArray(user.socials) && user.socials.length) {
			setLinkedinURL(user.socials[0]);
		}

		const projData = await apiFetch("/project/");
		if (!projData.success) return;

		const myProject = projData.projects.find(
			(p) =>
				Array.isArray(p.members) && p.members.some((m) => m.id === user.id)
		);
		if (!myProject) return;

		setNameProject(myProject.name || "");
		setDescription(myProject.description || "");
		if (myProject.course) setCourse(myProject.course);

		const others = myProject.members.filter((m) => m.id !== user.id);
		if (others.length) {
			const m2 = others[0];
			setShowExtra(true);
			setP2FirstName(m2.firstname || "");
			setP2LastName(m2.lastname || "");
			setP2Email(m2.email || "");
			if (Array.isArray(m2.socials) && m2.socials.length) {
				setP2LinkedIn(m2.socials[0]);
			}
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitState("loading");
		setSubmitError("");

		let currentUserId = null;
		try {
			currentUserId = JSON.parse(atob(token.split(".")[1])).id;
		} catch { }

		const payload = {
			name: nameProject.trim(),
			description: description.trim(),
			course: course.trim(),
			memberIds: currentUserId ? [currentUserId] : [],
			mediaIds: [],
		};

		if (showExtra && p2Email.trim()) {
			try {
				const allProj = await apiFetch("/project/");
				const allMembers = (allProj.projects || []).flatMap(
					(p) => p.members || []
				);
				const match = allMembers.find((m) => m.email === p2Email.trim());
				if (match) payload.memberIds.push(match.id);
			} catch { }
		}

		try {
			const existingData = await apiFetch("/project/");
			const existing = (existingData.projects || []).find(
				(p) =>
					Array.isArray(p.members) &&
					p.members.some((m) => m.id === currentUserId)
			);

			const result = existing
				? await apiFetch(`/project/${existing.id}`, {
					method: "PUT",
					body: JSON.stringify(payload),
				})
				: await apiFetch("/project/", {
					method: "POST",
					body: JSON.stringify(payload),
				});

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
							<label htmlFor="nameProject">Project title</label>
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
							<label htmlFor="description">Description</label>
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
							<span>Specialisatie</span>
							<select
								required
								id="course"
								name="course"
								className="courseSelect"
								value={course}
								onChange={(e) => setCourse(e.target.value)}
							>
								<option disabled value="">
									Specialisatie
								</option>
								<option value="XR & 3D">XR & 3D</option>
								<option value="Experience Design">Experience Design</option>
								<option value="Web & Mobile">Web & Mobile</option>
								<option value="Digital Deisgn">Digital Deisgn</option>
							</select>
						</div>
						<div>
							<span>Promoter</span>
							<select
								required
								id="promoter"
								name="promoter"
								className="courseSelect"
								value={promoter}
								onChange={(e) => setPromoter(e.target.value)}
							>
								<option disabled value="">
									Promoter
								</option>
								{[
									"Dennis Baptist",
									"Maaike Beuten",
									"Joni De Borger",
									"Peter Dickx",
									"Bert Heyman",
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
						<h3>Personal info</h3>
						<div>
							<label htmlFor="firstName">Voornaam</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								placeholder="John"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="lastName">Achternaam</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								placeholder="Johnson"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input
								type="text"
								id="email"
								name="email"
								placeholder="john.johnson@mail.be"
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
								required
								placeholder="https://www.linkedin.com/in/john-johnson/"
								value={linkedinURL}
								onChange={(e) => setLinkedinURL(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="choose-selfieFile">Portretfoto</label>
							<input
								type="file"
								accept="image/*"
								id="choose-selfieFile"
								name="choose-selfieFile"
								onChange={(e) => setSelfieFile(e.target.files[0] ?? null)}
							/>
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
										placeholder="Sarah"
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
										placeholder="Sarahdaughter"
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
										placeholder="sarah.sarahdaughter@mail.be"
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
										placeholder="https://www.linkedin.com/in/sarah-sarahdaughter/"
										required={showExtra}
										value={p2LinkedIn}
										onChange={(e) => setP2LinkedIn(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="choose-secondselfiefile">Portretfoto</label>
									<input
										type="file"
										accept="image/*"
										id="choose-secondselfiefile"
										name="choose-secondselfiefile"
										onChange={(e) =>
											setP2SelfieFile(e.target.files[0] ?? null)
										}
									/>
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
						<div>
							<label htmlFor="choose-projectFile">Projectbeeld</label>
							<input
								type="file"
								accept="image/*"
								id="choose-projectFile"
								name="choose-projectFile"
								onChange={(e) => setProjectFile(e.target.files[0] ?? null)}
							/>
							<label className="subtext">
								Gelieve in een 16:9 aspect ratio in te dienen
							</label>
						</div>
						<div>
							<label htmlFor="videoURL">
								Plaats je video op YouTube en plaats de link hier onder (niet
								privé)
							</label>
							<input
								type="text"
								id="videoURL"
								name="videoURL"
								required
								placeholder="YouTube link van je project footage..."
								value={videoURL}
								onChange={(e) => setVideoURL(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="choose-magazineFile">Magazine (pdf)</label>
							<input
								type="file"
								accept=".pdf"
								id="choose-magazineFile"
								name="choose-magazineFile"
								onChange={(e) => setMagazineFile(e.target.files[0] ?? null)}
							/>
						</div>
						<button
							className="submit"
							type="submit"
							disabled={submitState === "loading" || submitState === "success"}
							style={
								submitState === "success" ? { background: "green" } : undefined
							}
						>
							{submitState === "loading"
								? "Bezig..."
								: submitState === "success"
									? "✓ Opgeslagen"
									: "Submit"}
						</button>
						{submitState === "error" && (
							<p style={{ color: "red" }}>Fout: {submitError}</p>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
