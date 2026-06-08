import React, { useState } from "react";
import "./index.css";
import ProjectCard from "./ProjectCard.jsx";

const MOCK_PROJECTS = [
	{
		id: 1,
		title: "The Dark After The Light",
		category: "XR & 3D",
		image: "/assets/imageCard.png",
		students: [
			{ name: "Hamza El Aisati", avatar: "/assets/pictureForCard.jpg" },
		],
	},
	{
		id: 2,
		title: "The Light After The Dark",
		category: "Digital Design",
		image: "/assets/imageCard.png",
		students: [
			{ name: "Hamza El Aisati", avatar: "/assets/pictureForCard.jpg" },
			{ name: "Nolan Lamarque", avatar: "/assets/pictureForCard.jpg" },
		],
	},
	{
		id: 3,
		title: "The PNG After The JPG",
		category: "Web & Mobile",
		image: "/assets/imageCard.png",
		students: [
			{ name: "Hamza² Lamrabet", avatar: "/assets/pictureForCard.jpg" },
		],
	},
	{
		id: 4,
		title: "Kitchen Sink Experience",
		category: "XR & 3D",
		image: "/assets/imageCard.png",
		students: [
			{ name: "SpongeBob SquarePants", avatar: "/assets/pictureForCard.jpg" },
			{ name: "Ahmed Benali", avatar: "/assets/pictureForCard.jpg" },
		],
	},
	{
		id: 5,
		title: "Le Football il a changé",
		category: "Experience Design",
		image: "/assets/imageCard.png",
		students: [{ name: "Kylian Mbappe", avatar: "/assets/pictureForCard.jpg" }],
	},
	{
		id: 6,
		title: "Design IV van Grow II naar Shift",
		category: "Digital Design",
		image: "/assets/imageCard.png",
		students: [{ name: "Kobe Vermeire", avatar: "/assets/pictureForCard.jpg" }],
	},
];

const CATEGORIES = [
	"Alle Projecten",
	"Digital Design",
	"Experience Design",
	"XR & 3D",
	"Web & Mobile",
];

export default function ProjectenPage() {
	const [activeCategory, setActiveCategory] = useState("Alle Projecten");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredProjects = MOCK_PROJECTS.filter((project) => {
		const query = searchQuery.toLowerCase();
		return (
			project.title.toLowerCase().includes(query) ||
			project.students.some((s) => s.name.toLowerCase().includes(query))
		);
	});

	return (
		<main className="ctx">
			<section className="projectenHero">
				<h1>EindProjecten</h1>
				<h3>
					Ontdek de werken van onze derde jaars Multimedia & Creatieve
					technologie!
				</h3>
			</section>

			<div className="filterBar">
				<div className="searchWrapper">
					<div className="searchIconBox">
						<img src="/assets/icons/search.svg" alt="" aria-hidden="true" />
					</div>
					<input
						type="text"
						placeholder="Zoek op naam of project..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className="filterButtons">
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							className={`filterBtn ${activeCategory === cat ? "active" : ""}`}
							onClick={() => setActiveCategory(cat)}
						>
							{cat}
						</button>
					))}
				</div>
			</div>

			<p className="projectenCount">
				{activeCategory} ({filteredProjects.length} Projecten)
			</p>

			<div className="projectenGrid">
				{filteredProjects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</main>
	);
}
