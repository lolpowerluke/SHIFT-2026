import { Link } from "react-router";
import s from "./index.module.css";
import toSlug from "../../utils/toSlug.js";

const CATEGORY_ICONS = {
	"Digital Design": "/assets/OrangeDesign.svg",
	"Experience Design": "/assets/OrangeExperience.svg",
	"XR & 3D": "/assets/Orange3D.svg",
	"Web & Mobile": "/assets/OrangeCoding.svg",
};

export default function ProjectCard({ project, onClick }) {
	const { title, category, image, students = [] } = project;
	const categoryIcon = CATEGORY_ICONS[category];

	const content = (
		<div className={s.projectCard}>
			<h3 className={s.cardTitle}>{title}</h3>
			<div className={s.cardCategory}>
				{categoryIcon && <img src={categoryIcon} alt="" aria-hidden="true" />}
				<span>{category}</span>
			</div>
			<div className={s.cardImageWrapper}>
				<img src={image} alt={title} className={s.cardImage} />
				<div className={s.cardAvatars}>
					{students.map((student) => (
						<img
							key={student.name}
							src={student.avatar}
							alt={student.name}
							className={s.avatar}
						/>
					))}
				</div>
			</div>
			<div className={s.cardStudents}>
				{students.map((student) => (
					<p key={student.name}>{student.name}</p>
				))}
			</div>
		</div>
	);

	// Mode "bouton" : déclenche onClick au lieu de naviguer (utilisé pour le vote)
	if (onClick) {
		return (
			<button type="button" onClick={onClick} className={s.projectCardBorder}>
				{content}
			</button>
		);
	}

	return (
		<Link to={`/project/${toSlug(title, project.id)}`} className={s.projectCardBorder}>
			{content}
		</Link>
	);
}
