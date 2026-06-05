import React from "react";

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
		<div className="projectCard">
			<h3 className="cardTitle">{title}</h3>
			<div className="cardCategory">
				{categoryIcon && <img src={categoryIcon} alt="" aria-hidden="true" />}
				<span>{category}</span>
			</div>
			<div className="cardImageWrapper">
				<img src={image} alt={title} className="cardImage" />
				<div className="cardAvatars">
					{students.map((student) => (
						<img
							key={student.name}
							src={student.avatar}
							alt={student.name}
							className="avatar"
						/>
					))}
				</div>
			</div>
			<div className="cardStudents">
				{students.map((student) => (
					<p key={student.name}>{student.name}</p>
				))}
			</div>
		</div>
	);
}
