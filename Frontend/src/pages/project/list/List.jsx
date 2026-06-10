import { useState, useEffect } from "react";
import s from "./List.module.css";
import ProjectCard from "../../../components/projectCard/ProjectCard.jsx";
import { useFetch } from "../../../hooks/useFetch.js";
import { mapProject } from "../../../utils/member.js";
import StatusMessage from "../../../components/statusMessage/StatusMessage.jsx";
import { getCloudinaryUrl } from "../../../utils/cloudinary.js";
import Throbber from "../../../components/Throbber.jsx";
import ErrorComponent from "../../../components/errorComponent/ErrorComponent.jsx";

const CATEGORIES = [
	"Alle Projecten",
	"Digital Design",
	"Experience Design",
	"XR & 3D",
	"Web & Mobile",
];

export default function List() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [activeCategory, setActiveCategory] = useState("Alle Projecten");
	const [searchQuery, setSearchQuery] = useState("");

	const { data, loading, error } = useFetch(
		`${import.meta.env.VITE_API_URL}/project`,
	);

	const guard = StatusMessage({ loading, error });
	if (guard) return guard;

	const projects = (data?.projects ?? []).map(mapProject);

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

	if (loading) return <Throbber/>;
	if (error) return <ErrorComponent error={error}/>;

	return (
		<main className="ctx">
			<section className={s.projectenHero}>
				<h1>EindProjecten</h1>
				<h3>
					Ontdek de werken van onze derde jaars Multimedia & Creatieve
					technologie!
				</h3>
			</section>

			<div className={s.filterBar}>
				<div className={s.searchWrapper}>
					<div className={s.searchIconBox}>
						<img src="/assets/icons/search.svg" alt="" aria-hidden="true" />
					</div>
					<input
						type="text"
						placeholder="Zoek op naam of project..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className={s.filterButtons}>
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							className={`${s.filterBtn} ${activeCategory === cat ? s.active : ""}`}
							onClick={() => setActiveCategory(cat)}
						>
							{cat}
						</button>
					))}
				</div>
			</div>

			<p className={s.projectenCount}>
				{activeCategory} ({filteredProjects.length} Projecten)
			</p>

			<div className={s.projectenGrid}>
				{filteredProjects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</main>
	);
}
