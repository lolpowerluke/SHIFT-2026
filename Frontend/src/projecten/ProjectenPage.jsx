import React, { useState } from "react";
import "./index.css";

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
		</main>
	);
}
