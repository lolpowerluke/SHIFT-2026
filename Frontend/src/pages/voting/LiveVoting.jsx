import { useEffect, useState } from "react";
import s from "./LiveVoting.module.css";
import { getCloudinaryUrl } from "../../utils/cloudinary.js";
import Loading from "../../components/loadingComponent/Loading.jsx";
import ProjectCard from "../../components/projectCard/ProjectCard.jsx";
import { fireVoteConfetti } from "../../utils/confetti.js";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

async function getToken() {
	console.log("getToken");
	try {
		const res = await fetch(`${API_URL}/voting/token`);
		if (!res.ok) throw new Error("Failed to fetch token");
		console.log(res);
		const { token } = await res.json();
		console.log(token);
		return token;
	} catch (err) {
		console.error("Error in getToken:", err);
		return null;
	}
}

const CATEGORY_ICONS = {
	"Digital Design": "/assets/OrangeDesign.svg",
	"Experience Design": "/assets/OrangeExperience.svg",
	"XR & 3D": "/assets/Orange3D.svg",
	"Web & Mobile": "/assets/OrangeCoding.svg",
};

export default function LiveVoting() {
	const [token, setToken] = useState(
		() => localStorage.getItem("token") ?? null,
	);
	const [hasVoted, setHasVoted] = useState(
		() => localStorage.getItem("hasVoted") === "true",
	);
	const [projects, setProjects] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [votedName, setVotedName] = useState(
		() => localStorage.getItem("votedName") ?? "",
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			setLoading(true);
			getToken()
				.then((fetchedToken) => {
					console.log(fetchedToken);
					if (fetchedToken) {
						localStorage.setItem("token", fetchedToken);
						setToken(localStorage.getItem("token"));
					}
				})
				.finally(() => setLoading(false));
		}
	}, [token]);
	useEffect(() => {
		// Avoid fetching projects if user has already voted
		if (hasVoted) return;

		const fetchTopProjects = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${API_URL}/voting/projects`);
				if (!res.ok) throw new Error("Failed to fetch projects");
				const data = await res.json();
				setProjects(data);
			} catch (error) {
				console.error("Error fetching top projects:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTopProjects();
	}, [hasVoted]);

	async function handleVote() {
		const id = selectedProject?.id;
		if (!token || !id) {
			console.error("Can't identify the device for voting.");
			return;
		}

		setError(null);
		setSubmitting(true);
		try {
			const res = await fetch(`${API_URL}/voting`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token, project: id }),
			});
			if (res.ok) {
				const data = await res.json();
				const backendHasVoted = data.success;
				localStorage.setItem("hasVoted", backendHasVoted.toString());
				setVotedName(selectedProject.name);
				setHasVoted(true);
				fireVoteConfetti();
			} else {
				const data = await res.json().catch(() => ({}));
				setError(data.message || "Fout bij het uitbrengen van je stem.");
			}
		} catch (err) {
			console.error("Error handleVote:", err);
			setError("Netwerkfout. Probeer het opnieuw.");
		} finally {
			setSubmitting(false);
			// setSelectedProject(null);
		}
	}

	if (loading) {
		return <Loading />;
	}

	if (hasVoted) {
		return (
			<>
				<div className={s.afterVote}>
					<h2 className={s.voteTitle}>Je stem is geregistreerd</h2>
					<p className={s.voteText}>
						{selectedProject ? (
							<>
								Bedankt voor je stem op <b>{selectedProject.name}</b>.
							</>
						) : (
							"Bedankt voor je stem!"
						)}
					</p>
					<button onClick={() => navigate("/")}>Terug naar de site</button>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="headerSpacer"></div>
			<div className={`${s.ctx} ctx`}>
				<h1>Publieksprijs SHIFT 2026</h1>
				<h2>Breng nu je stem uit!</h2>
				<h3>(klik op je favoriete project en bevestig)</h3>
				<div className={s.projectsGrid}>
					{projects.map((project) => (
						<div
							key={project.id}
							className={s.card}
							onClick={() => setSelectedProject(project)}
						>
							<img src={getCloudinaryUrl(project.image)} alt={project.name} />
							<div>
								<span className={s.title}>{project.name}</span>
								<div className={s.course}>
									{project.course && <img src={CATEGORY_ICONS[project.course]} alt="" aria-hidden="true" />}
									<span>{project.course}</span>
								</div>
								{project.members.map((student) => (
									<span key={`${student.firstname} ${student.lastname}`}>{`${student.firstname} ${student.lastname}`}</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			{selectedProject && (
				<div className={s.overlay} onClick={() => setSelectedProject(null)}>
					<div className={s.modalBorder} onClick={(e) => e.stopPropagation()}>
						<div className={s.modal}>
							<div
								className={s.closeButton}
								onClick={() => setSelectedProject(null)}
							>
								<img src="/assets/icons/closeButton.svg" alt="Close modal" />
							</div>
							<h2 className={s.modalTitle}>Weet je het zeker?</h2>
							<button
								className={`${s.voteButton} blueBtn`}
								onClick={handleVote}
							>
								Ja, ik bevestig!
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
