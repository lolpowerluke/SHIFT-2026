import { useState, useEffect } from "react";
import s from "./List.module.css";
import ProjectCard from "../../../components/projectCard/ProjectCard.jsx";
import { useFetch } from "../../../hooks/useFetch.js";
import { mapProject } from "../../../utils/member.js";
import StatusMessage from "../../../components/statusMessage/StatusMessage.jsx";
import { getCloudinaryUrl } from "../../../utils/cloudinary.js";

const CATEGORIES = [
	"Alle Projecten",
	"Digital Design",
	"Experience Design",
	"XR & 3D",
	"Web & Mobile",
];

const normalizeText = (text) =>
	text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

export default function List() {
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
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, []);

	const filteredProjects = projects.filter((project) => {
		const query = normalizeText(searchQuery);

		const matchesSearch =
			normalizeText(project.title).includes(query) ||
			project.students.some((s) => normalizeText(s.name).includes(query));

		const matchesCategory =
			activeCategory === "Alle Projecten" ||
			project.category === activeCategory;

		return matchesSearch && matchesCategory;
	});
	const guard = StatusMessage({ loading, error });
	if (guard) return guard;

	return (
		<main className="ctx headerSpacer">
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
			<div className={s.cardWrapper}>
				<h3>WINNAARS</h3>
				<div className={s.winCard}>
					<div className={s.projectCard}>
						<div className={s.avatarWrap}>
						<img className={s.avatarImg} src="/assets/icons/3de jaars temp.png" alt="profile" />
						<img className={s.trophyImg} src="/assets/impact_award.svg" alt="Impact Trophy" />
						</div>
						<div className={s.awardBox}>
							<img src="/assets/award_box.svg" alt="award box" />
							<p className={s.awardBoxLabel}><b>Name student</b></p>
							<p className={s.awardBoxLabel}>project name</p>
						</div>
						<a className={s.bekijkBtn}><img src="/assets/icons/arrowLink.svg" alt="arrowLink" /></a>
					</div>
					<div className={s.projectCard}>
						<div className={s.avatarWrap}>
						<img className={s.avatarImg} src="/assets/icons/3de jaars temp.png" alt="profile" />
						<img className={s.trophyImg} src="/assets/innovative_award.svg" alt="Impact Trophy" />
						</div>
						<div className={s.awardBox}>
							<img src="/assets/award_box.svg" alt="award box" />
							<p className={s.awardBoxLabel}><b>Name student</b></p>
							<p className={s.awardBoxLabel}>project name</p>
						</div>
						<a className={s.bekijkBtn}><img src="/assets/icons/arrowLink.svg" alt="arrowLink" /></a>
					</div>
					<div className={s.projectCard}>
						<div className={s.avatarWrap}>
						<img className={s.avatarImg} src="/assets/icons/3de jaars temp.png" alt="profile" />
						<img className={s.trophyImg} src="/assets/jury_award.svg" alt="Impact Trophy" />
						</div>
						<div className={s.awardBox}>
							<img src="/assets/award_box.svg" alt="award box" />
							<p className={s.awardBoxLabel}><b>Name student</b></p>
							<p className={s.awardBoxLabel}>project name</p>
						</div>
						<a className={s.bekijkBtn}><img src="/assets/icons/arrowLink.svg" alt="arrowLink" /></a>
					</div>
					<div className={s.projectCard}>
						<div className={s.avatarWrap}>
						<img className={s.avatarImg} src="/assets/icons/3de jaars temp.png" alt="profile" />
						<img className={s.trophyImg} src="/assets/public_award.svg" alt="Impact Trophy" />
						</div>
						<div className={s.awardBox}>
							<img src="/assets/award_box.svg" alt="award box" />
							<p className={s.awardBoxLabel}><b>Name student</b></p>
							<p className={s.awardBoxLabel}>project name</p>
						</div>
						<a className={s.bekijkBtn}><img src="/assets/icons/arrowLink.svg" alt="arrowLink" /></a>
					</div>
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
