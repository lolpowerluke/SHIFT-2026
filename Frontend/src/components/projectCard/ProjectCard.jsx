import { Link } from "react-router";
import s from "./index.module.css";

function toSlug(title, id) {
	return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${id}`;
}

const CATEGORY_ICONS = {
	"Digital Design": "/assets/OrangeDesign.svg",
	"Experience Design": "/assets/OrangeExperience.svg",
	"XR & 3D": "/assets/Orange3D.svg",
	"Web & Mobile": "/assets/OrangeCoding.svg",
};

export default function ProjectCard({ project }) {
	const { title, category, image, students } = project;
	const categoryIcon = CATEGORY_ICONS[category];

	return (
		<Link to={`/project/${toSlug(title, project.id)}`} className={s.projectCardBorder}>
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
		</Link>
	);
}
