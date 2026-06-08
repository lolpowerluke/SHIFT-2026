import React, { useState, useEffect } from "react";
import "./index.css";
import ProjectCard from "./ProjectCard.jsx";

const CATEGORIES = [
	"Alle Projecten",
	"Digital Design",
	"Experience Design",
	"XR & 3D",
	"Web & Mobile",
];

function mapProject(p) {
	return {
		id: p.id,
		title: p.name,
		category: p.course,
		image: p.media?.[0]?.url ?? "/assets/imageCard.png",
		students: (p.members ?? []).map((m) => ({
			name: `${m.firstname} ${m.lastname}`,
			avatar: m.picture ?? "/assets/pictureForCard.jpg",
		})),
	};
}

export default function ProjectenPage() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [activeCategory, setActiveCategory] = useState("Alle Projecten");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/project`)
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then((data) => setProjects(data.projects.map(mapProject)))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	const filteredProjects = projects.filter((project) => {
		const query = searchQuery.toLowerCase();
		const matchesSearch =
			project.title.toLowerCase().includes(query) ||
			project.students.some((s) => s.name.toLowerCase().includes(query));

		const matchesCategory =
			activeCategory === "Alle Projecten" ||
			project.category === activeCategory;
		return matchesSearch && matchesCategory;
	});

	if (loading) return <p className="ctx">Laden...</p>;
	if (error) return <p className="ctx">Fout: {error}</p>;

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
