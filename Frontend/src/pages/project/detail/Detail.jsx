import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import s from "./Detail.module.css";
import { getCloudinaryUrl, getYoutubeEmbedUrl } from "../../../utils/cloudinary.js";
import { memberDisplayName, memberAvatar } from "../../../utils/member.js";
import { useFetch } from "../../../hooks/useFetch.js";
import { useAltBg } from "../../../hooks/useAltBg.js";
import StatusMessage from "../../../components/statusMessage/StatusMessage.jsx";

const CATEGORY_ICONS = {
	"Digital Design": "/assets/OrangeDesign.svg",
	"Experience Design": "/assets/OrangeExperience.svg",
	"XR & 3D": "/assets/Orange3D.svg",
	"Web & Mobile": "/assets/OrangeCoding.svg",
};

export default function Detail() {
	const { id: slug } = useParams();
	const id = slug.split("-").at(-1);
	const navigate = useNavigate();
	const [playing, setPlaying] = useState(false);
	const [magazineSize, setMagazineSize] = useState(null);

	useAltBg();

	const { data, loading, error } = useFetch(
		`${import.meta.env.VITE_API_URL}/project/${id}`,
	);

	const project = data?.project ?? null;

	useEffect(() => {
		if (!project?.magazine) return;
		const url =
			project.magazine.url ??
			`https://res.cloudinary.com/${project.magazine.cloud_name}/raw/upload/${project.magazine.path}`;
		fetch(url, { method: "HEAD" })
			.then((r) => {
				const bytes = parseInt(r.headers.get("content-length"));
				if (bytes) setMagazineSize((bytes / 1024 / 1024).toFixed(1) + " MB");
			})
			.catch(() => { });
	}, [project]);

	const guard = StatusMessage({ loading, error });
	if (guard) return guard;
	if (!project) return null;

	const embedUrl = getYoutubeEmbedUrl(project.video?.path);
	const categoryIcon = CATEGORY_ICONS[project.course];

	const handleMagazineOpen = async () => {
		const url = `https://res.cloudinary.com/${project.magazine?.cloud_name}/raw/upload/${project.magazine?.path}`;
		const res = await fetch(url);
		const blob = await res.blob();
		const blobUrl = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
		window.open(blobUrl, "_blank");
	};

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
									.map((m) => memberDisplayName(m))
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
									src={memberAvatar(m)}
									alt={memberDisplayName(m)}
								/>
							</div>
							<div className={s.studentInfo}>
								<div className={s.studentName}>
									<p>
										<b>{memberDisplayName(m)}</b>
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
											<button onClick={handleMagazineOpen}>
												<img src="/assets/download_icon.svg" alt="download" />
												Mijn magazine (PDF {magazineSize ? `${magazineSize}` : ""})
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
							<div className={s.videoWrapper}>
								<iframe
									src={`${embedUrl}?autoplay=1`}
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
