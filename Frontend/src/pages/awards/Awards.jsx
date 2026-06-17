import { useEffect, useState } from "react";
import s from "./Awards.module.css";
import { Link, useNavigate } from "react-router";
import { apiFetch } from "../../utils/apiFetch";
import Routes from "../../routes/constants/Routes.js";

export default function Awards() {
	const navigate = useNavigate();

	const [projectAmount, setProjectAmount] = useState(0);

	useEffect(() => {
		loadProjectCount();
	});

	async function loadProjectCount() {
		const projData = await apiFetch("/project/");
		if (!projData.success) return;
		setProjectAmount(projData.projects.length);
	}

	return (
		<>
			<div className={`${s.heroContainer} headerSpacer`}>
				<div className={s.landingTop}>
					<img
						src="/assets/icons/OrangeTrophy.svg"
						alt="award"
						className={s.awardImg}
					/>
					<span className={`${s.title}`}>
						LIVESHOW &<br />
						AWARDS
					</span>
				</div>
				<div className={`${s.landingBottom} ${s.desktop}`}>
					<img
						src="/assets/icons/BlueVote.svg"
						alt="Blue Vote"
						className={s.voteImg}
					/>
					<div>
						<span>{projectAmount} projecten worden getoond.</span>
						<span>4 awards worden uitgereikt.</span>
					</div>
					<button onClick={() => navigate("/project")} className="blueBtn">
						Ontdek alle projecten
					</button>
				</div>
			</div>
			<div className={s.awardContainer}>
				<div className={s.awardTop}>
					<img
						src="/assets/icons/OrangeTrophy.svg"
						alt="award"
						className={s.awardImg}
					/>
					<span>PRIJZEN</span>
				</div>
				<div className={s.awardBottom}>
					<div className={s.awardCard}>
						<img
							src="/assets/icons/StarBlue.svg"
							alt="Blue Star"
							className={s.cardImg}
						/>
						<span className={s.cardTitle}>IMPACTPRIJS</span>
						<span className={s.cardSubTitle}>GROOTSTE IMPACT</span>
						<span className={s.cardDesc}>
							Deze prijs gaat naar een project dat een reëel probleem aanpakt en een positieve impact kan hebben op mensen, organisaties of de samenleving.
						</span>
					</div>
					<div className={s.awardCard}>
						<img
							src="/assets/icons/ControllerBlue.svg"
							alt="Blue Controller"
							className={s.cardImg}
						/>
						<span className={s.cardTitle}>INNOVATIEPRIJS</span>
						<span className={s.cardSubTitle}>MEEST VERNIEUWEND</span>
						<span className={s.cardDesc}>
							Deze prijs bekroont een project dat op een creatieve manier nieuwe technologieën gebruikt of verkent en zo nieuwe mogelijkheden laat zien.
						</span>
					</div>
					<div className={s.awardCard}>
						<img
							src="/assets/icons/ThumbsupBlue.svg"
							alt="Blue Thumbs Up"
							className={s.cardImg}
						/>
						<span className={s.cardTitle}>JURYPRIJS</span>
						<span className={s.cardSubTitle}>EXPERTKEUZE</span>
						<span className={s.cardDesc}>
							Deze prijs gaat naar het project dat het volledige MCT-DNA uitstraalt: een sterk concept, een doordachte uitwerking en een uitstekende uitvoering.
						</span>
					</div>
				</div>
				<div className={`${s.publicPrize} ${s.awardCard}`}>
					<img
						src="/assets/icons/VoteOrange.svg"
						alt="Orange Vote"
						className={s.voteImg}
					/>
					<span className={`${s.title} ${s.desktop}`}>PUBLIEKSPRIJS</span>
					<span className={`${s.subTitle} ${s.desktop}`}>
						Jij bepaalt wie de publiekprijs verdient.
					</span>
					<span className={`${s.subTitle} ${s.mobile}`}>
						Jij mag mee bepalen wie de publiekprijs verdient.
					</span>
					<img
						src="/assets/icons/OrangeTrophy.svg"
						alt="award"
						className={s.awardImg}
					/>
					<span className={s.time}>
						UITREIKING OM 20:00 TIJDENS DE AWARD SHOW
					</span>
					<button onClick={() => navigate("/info")}>Praktische info<span className={s.mobile}></span> <img src="/assets/icons/arrowLink.svg" alt="arrow up right" className={s.arrowUp} /></button>
				</div>
			</div>
		</>
	);
}
