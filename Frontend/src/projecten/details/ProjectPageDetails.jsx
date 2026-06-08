import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import "./index.css";

const CATEGORY_ICONS = {
	"Digital Design": "/assets/OrangeDesign.svg",
	"Experience Design": "/assets/OrangeExperience.svg",
	"XR & 3D": "/assets/Orange3D.svg",
	"Web & Mobile": "/assets/OrangeCoding.svg",
};

function getYoutubeEmbedUrl(url) {
	if (!url) return null;
	const match = url.match(/[?&]v=([^&]+)/);

	return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function ProjectPageDetails() {
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const navigate = useNavigate();
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/project/${id}`)
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then((data) => setProject(data.project))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [id]);

	useEffect(() => {
		document.documentElement.classList.add("alt-bg");
		return () => document.documentElement.classList.remove("alt-bg");
	}, []);

	if (loading) return <p className="ctx">Laden...</p>;
	if (error) return <p className="ctx">Fout: {error}</p>;
	if (!project) return null;

	const embedUrl = getYoutubeEmbedUrl(project.video?.path);
	const categoryIcon = CATEGORY_ICONS[project.course];

	return (
		<div className="ctx">
			<div className="titleDiv">
				<div className="backButton">
					<button onClick={() => navigate(-1)}>
						<img src="/assets/arrow_back.svg" alt="Back arrow Icon" />
						Back
					</button>
				</div>
				<div className="titleText">
					<h1>{project.name}</h1>
					<div className="titleNames">
						<div className="name">
							<p>
							{(project.members ?? [])
								.map((m) => `${m.firstname} ${m.lastname}`)
								.join(" & ")}
							</p>
						</div>
						<div className="subject">
							{categoryIcon && <img src={categoryIcon} alt={project.course} />}
							<p>
								<b>{project.course}</b>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="imgDiv">
				<img
					src={project.media?.[0]?.url ?? "/assets/imageCard.png"}
					alt={project.name}
				/>
			</div>

			<div>
				<p>{project.description}</p>
				<p>
					<b>Promoter</b>
				</p>
				<p className="promoterName">{project.promoter}</p>
			</div>

			<div className="studentCardDiv">
				{(project.members ?? []).map((m) => (
					<div className="studentCards" key={m.id}>
						<div className="picture">
							<img
								src={m.picture ?? "/assets/pictureForCard.jpg"}
								alt={`${m.firstname} ${m.lastname}`}
							/>
						</div>
						<div className="studentInfo">
							<div className="studentName">
								<p>
									<b>
										{m.firstname} {m.lastname}
									</b>
								</p>
								<p>Multimedia & Creatieve Technologie</p>
							</div>
							<div className="studentContact">
								<div className="icons">
									<a href={`mailto:${m.email}`}>
										<img src="/assets/mail_Icon.svg" alt="Email Icon" />
									</a>
									{m.socials?.[0] && (
										<a href={m.socials[0]} target="_blank" rel="noreferrer">
											<img
												src="/assets/linkedIn_Icon.svg"
												alt="LinkedIn Icon"
											/>
										</a>
									)}
								</div>
								{project.magazine?.url && (
									<div className="magButton">
										<a
											href={project.magazine.url}
											target="_blank"
											rel="noreferrer"
										>
											<button>
												<img src="/assets/download_icon.svg" alt="download" />
												Mijn magazine (PDF)
											</button>
										</a>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{embedUrl && (
				<div>
					<h1>Project video</h1>
					<div className="videoHolder">
						<iframe
							className="videoPlayer"
							src={embedUrl}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					</div>
				</div>
			)}
		</div>
	);
}
