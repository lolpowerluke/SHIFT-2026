import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import s from "./Detail.module.css";
import {
	getCloudinaryUrl,
	getYoutubeEmbedUrl,
} from "../../../utils/cloudinary.js";

const CATEGORY_ICONS = {
	"Digital Design": "/assets/OrangeDesign.svg",
	"Experience Design": "/assets/OrangeExperience.svg",
	"XR & 3D": "/assets/Orange3D.svg",
	"Web & Mobile": "/assets/OrangeCoding.svg",
};

async function downloadPdf(url, filename) {
	const res = await fetch(url);
	const blob = await res.blob();
	const blobUrl = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = blobUrl;
	a.download = `${filename}-Magazine.pdf`;
	a.click();
	URL.revokeObjectURL(blobUrl);
}

export default function Detail() {
	const { id } = useParams();
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
				<div className={s.backButton}>
					<button onClick={() => navigate(-1)}>
						<img src="/assets/arrow_back.svg" alt="Back arrow Icon" />
						Back
					</button>
				</div>
				<div className={s.titleText}>
					<h1>{project.name}</h1>
					<div className="titleNames">
						<div className={s.name}>
							<p>
								{(project.members ?? [])
									.map((m) => `${m.firstname} ${m.lastname}`)
									.join(" & ")}
							</p>
						</div>
						<div className={s.subject}>
							{categoryIcon && <img src={categoryIcon} alt={project.course} />}
							<p>
								<b>{project.course}</b>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className={s.imgDiv}>
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
				<p className={s.description}>{project.description}</p>
				<p className={s.promoterTitle}>
					<b>Promoter</b>
				</p>
				<p className="promoterName">{project.promoter}</p>
			</div>

			<div className={s.studentCardDiv}>
				{(project.members ?? []).map((m) => (
					<div className={s.studentCards} key={m.id}>
						<div className={s.studentTop}>
							<div className={s.picture}>
								<img
									src={getCloudinaryUrl(m.picture) ?? "/assets/user.png"}
									alt={`${m.firstname ?? ""} ${m.lastname ?? ""}`.trim()}
								/>
							</div>
							<div className={s.studentInfo}>
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
								<div className={s.studentContact}>
									<div className={s.icons}>
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
										<div className={s.magButton}>
											<button
												onClick={() =>
													downloadPdf(
														project.magazine?.url ??
														`https://res.cloudinary.com/${project.magazine?.cloud_name}/raw/upload/${project.magazine?.path}`,
														project.name,
													)
												}
											>
												<img src="/assets/download_icon.svg" alt="download" />
												Mijn magazine (PDF)
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{embedUrl && (
				<div>
					<h1 className={s.videoTitle}>Project video</h1>
					<div className={s.videoHolder}>
						{!playing ? (
							<div className={s.videoThumb} onClick={() => setPlaying(true)}>
								<img
									src={`https://img.youtube.com/vi/${embedUrl.split("/embed/")[1]}/maxresdefault.jpg`}
									alt="Video thumbnail"
									className={s.videoPlayer}
								/>
								<img
									src="/assets/play-button.png"
									alt="Play"
									className={s.playBtn}
								/>
							</div>
						) : (
							<iframe
								className={s.videoPlayer}
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
