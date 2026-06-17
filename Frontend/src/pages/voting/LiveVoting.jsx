import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import s from "./LiveVoting.module.css";
import { getCloudinaryUrl } from "../../utils/cloudinary.js";
import Loading from "../../components/loadingComponent/Loading.jsx";
import ProjectCard from "../../components/projectCard/ProjectCard.jsx";
import { fireVoteConfetti } from "../../utils/confetti.js";

const API_URL = import.meta.env.VITE_API_URL;

const votable = [22];

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
	const navigate = useNavigate();

	useEffect(() => {
		console.log("useEff getToken");
		if (!token) {
			setLoading(true);
			getToken()
				.then((fetchedToken) => {
					console.log(fetchedToken);
					if (fetchedToken) {
						localStorage.setItem("token", fetchedToken);
						setToken(fetchedToken);
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
				const promises = votable.map((id) =>
					fetch(`${API_URL}/project/${id}`)
						.then((res) => (res.ok ? res.json() : null))
						.then((data) => data?.project || null)
						.catch(() => null),
				);
				const topProjects = await Promise.all(promises);
				setProjects(topProjects.filter(Boolean));
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
			return;
		}

		setError(null);
		setLoading(true);
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
				setHasVoted(true);
				fireVoteConfetti();
			} else {
				const data = await res.json().catch(() => ({}));
				console.error("400 response body:", data);
				setError(data.message || "Fout bij het uitbrengen van je stem.");
			}
		} catch (err) {
			console.error("Error handleVote:", err);
			setError("Netwerkfout. Probeer het opnieuw.");
		} finally {
			setLoading(false);
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
						<ProjectCard
							key={project.id}
							onClick={() => setSelectedProject(project)}
							project={{
								id: project.id,
								title: project.name,
								category: project.course,
								image:
									getCloudinaryUrl(project.media?.[0]) ??
									getCloudinaryUrl(project.images?.[0]) ??
									"/assets/imageCard.png",
								students: (project.members ?? []).map((m) => ({
									name: `${m.firstname} ${m.lastname}`,
									avatar:
										getCloudinaryUrl(m.picture) ?? "/assets/imageCard.png",
								})),
							}}
						/>
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
