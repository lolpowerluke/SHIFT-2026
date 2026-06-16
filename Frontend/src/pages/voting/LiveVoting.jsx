import { useState } from "react";
import s from "./LiveVoting.module.css";

export default function LiveVoting() {
	const [selectedProject, setSelectedProject] = useState(null);
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
	const [voteConfirmed, setVoteConfirmed] = useState(false);

	return (
		<>
			<div className="headerSpacer"></div>
			<div className={`${s.ctx} ctx`}>
				<h1>Stem hier!</h1>
				<h2>Druk op het project dat jouw stem krijgt.</h2>
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
				<div className={s.overlay} onClick={() => setSelectedProject(null)}>
					<div className={s.modal} onClick={(e) => e.stopPropagation()}>
						<div
							className={s.closeButton}
							onClick={() => {
								setSelectedProject(null);
								setVoteConfirmed(false);
							}}
						>
							<img src="/assets/icons/closeButton.svg" alt="Close modal" />
						</div>
						{!voteConfirmed ? (
							<>
								<h2>{selectedProject.name}</h2>
								<div className={s.modalImage}>
									<img src={selectedProject.image} alt={selectedProject.name} />
								</div>
								<p>{selectedProject.description}</p>
								<button
									className={s.voteButton}
									onClick={() => setVoteConfirmed(true)}
								>
									Stem voor dit project!
								</button>
							</>
						) : (
							<>
								<h2>Ben je zeker?</h2>
								<p>
									Je staat op het punt om te stemmen voor{" "}
									<b>{selectedProject.name}</b>.
								</p>
								<div>
									<button>Bevestig stem</button>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
}
