import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import "./index.css";
import {
	getCloudinaryUrl,
	getYoutubeEmbedUrl,
} from "../../utils/cloudinary.js";

const CATEGORY_ICONS = {
	"Digital Design": "/assets/OrangeDesign.svg",
	"Experience Design": "/assets/OrangeExperience.svg",
	"XR & 3D": "/assets/Orange3D.svg",
	"Web & Mobile": "/assets/OrangeCoding.svg",
};

const handleMagazineOpen = async () => {
    const url = `https://res.cloudinary.com/${project.magazine?.cloud_name}/raw/upload/${project.magazine?.path}`;
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    window.open(blobUrl, "_blank");
};

export default function ProjectPageDetails() {
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const navigate = useNavigate();
	const [project, setProject] = useState(null);
	const [playing, setPlaying] = useState(false);
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
					src={
						getCloudinaryUrl(project.media?.[0]) ??
						getCloudinaryUrl(project.images?.[0]) ??
						"/assets/imageCard.png"
					}
					alt={project.name}
				/>
			</div>

			<div>
				<p className="description">{project.description}</p>
				<p className="promoterTitle">
					<b>Promoter</b>
				</p>
				<p className="promoterName">{project.promoter}</p>
			</div>

			<div className="studentCardDiv">
				{(project.members ?? []).map((m) => (
					<div className="studentCards" key={m.id}>
						<div className="picture">
							<img
								src={getCloudinaryUrl(m.picture) ?? "/assets/user.png"}
								alt={`${m.firstname ?? ""} ${m.lastname ?? ""}`.trim()}
							/>
						</div>
						<div className="studentInfo">
							<div className="studentName">
								<p>
									<b>
										{[m.firstname, m.lastname].filter(Boolean).join(" ") ||
											m.email ||
											"Onbekend"}
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
								{project.magazine && (
									<div className="magButton">
										<button
											onClick={handleMagazineOpen}
										>
											<img src="/assets/download_icon.svg" alt="download" />
											Mijn magazine (PDF)
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{embedUrl && (
				<div>
					<h1 className="videoTitle">Project video</h1>
					<div className="videoHolder">
						{!playing ? (
							<div className="videoThumb" onClick={() => setPlaying(true)}>
								<img
									src={`https://img.youtube.com/vi/${embedUrl.split("/embed/")[1]}/maxresdefault.jpg`}
									alt="Video thumbnail"
									className="videoPlayer"
								/>
								<img
									src="/assets/play-button.png"
									alt="Play"
									className="playBtn"
								/>
							</div>
						) : (
							<iframe
								className="videoPlayer"
								src={`${embedUrl}?autoplay=1`}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
