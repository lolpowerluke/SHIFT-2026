import { useState } from "react";
import s from "./LiveVoting.module.css";
import Loading from "../../components/loadingComponent/Loading.jsx";

export default function LiveVoting() {
	const [selectedProject, setSelectedProject] = useState(null);
	const [voteConfirmed, setVoteConfirmed] = useState(false);
	const [voteFinished, setVoteFinished] = useState(false);

	const projects = [
		{
			id: 1,
			name: "Project 1",
			image: "/assets/opleidingPlaceholder.jpg",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			id: 2,
			name: "Project 2",
			image: "/assets/opleidingPlaceholder.jpg",
			description:
				"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		},
		{
			id: 3,
			name: "Project 3",
			image: "/assets/opleidingPlaceholder.jpg",
			description:
				"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		},
	];

	const handleConfirmVote = () => {
		setVoteConfirmed(true);
		setVoteFinished(true);
		setSelectedProject(null);
	};

	const handleCloseModal = () => {
		setSelectedProject(null);
		setVoteConfirmed(false);
	};

	if (voteFinished) {
		return (
			<>
				<div className="headerSpacer"></div>
				<div className={`${s.ctx} ${s.successContainer}`}>
					<h1>JOUW STEM IS OPGENOMEN!</h1>
					<Loading />
					<p className={s.redirectText}>REDIRECTING</p>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="headerSpacer"></div>
			<div className={`${s.ctx} ctx`}>
				<h1>STEM HIER!</h1>
				<h2>DRUK OP HET PROJECT DIE JOUW STEM KRIJGT.</h2>
				<div className={s.projectsGrid}>
					{projects.map((project) => (
						<div
							key={project.id}
							className={s.projectCard}
							onClick={() => setSelectedProject(project)}
						>
							<div className={s.imageWrapper}>
								<img src={project.image} alt={project.name} />
							</div>
							<h2>{project.name}</h2>
						</div>
					))}
				</div>
			</div>
			{selectedProject && (
				<div className={s.overlay} onClick={handleCloseModal}>
					<div className={s.modal} onClick={(e) => e.stopPropagation()}>
						<div className={s.closeButton} onClick={handleCloseModal}>
							<img src="/assets/icons/closeButton.svg" alt="Close modal" />
						</div>
						{!voteConfirmed ? (
							<>
								<h2 className={s.modalTitle}>{selectedProject.name}</h2>

								<div className={s.modalImage}>
									<img src={selectedProject.image} alt={selectedProject.name} />
								</div>
								<p className={s.modalDescription}>
									{selectedProject.description}
								</p>
								<button
									className={s.voteButton}
									onClick={() => setVoteConfirmed(true)}
								>
									Stem voor dit project!
								</button>
							</>
						) : (
							<div className={s.confirmWrapper}>
								<h2 className={s.confirmTitle}>BEN JE ZEKER?</h2>
								<button className="blueBtn" onClick={handleConfirmVote}>
									Ja, ik ben zeker
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
