import s from "./WinnerBanner.module.css";
import {} from "react";

export default function WinnerBanner() {
	return (
		<>
			<div className={s.cardWrapper}>
				<h3>Winnaars SHIFT 2026</h3>
				<div className={s.winCard}>
					<div className={s.projectCard}>
						<p className={s.winTitle}>
							<b>Winnaar impactprijs</b>
						</p>
						<div className={s.avatarWrap}>
							<img
								className={s.avatarImg}
								src="/assets/ARNO.jpg"
								alt="profile"
							/>
							<img
								className={s.trophyImg}
								src="/assets/impact_award.svg"
								alt="Impact Trophy"
							/>
						</div>
						<div className={s.awardBox}>
							<img src="/assets/award_box.svg" alt="award box" />
							<p className={s.awardBoxLabel3}>
								<b>Arno Baeck</b>
							</p>
							<p className={s.awardBoxLabel2}>KAMIL</p>
						</div>
						<a
							href="https://www.shiftfestival.be/project/kamil-10"
							className={s.bekijkBtn}
						>
							<img src="/assets/icons/arrowLink.svg" alt="arrowLink" />
						</a>
					</div>
					<div className={s.projectCard}>
						<p className={s.winTitle}>
							<b>Winnaar innovatieprijs</b>
						</p>
						<div className={s.avatarWrap}>
							<img
								className={s.avatarImg}
								src="/assets/MATTEO.webp"
								alt="profile"
							/>
							<img
								className={s.trophyImg}
								src="/assets/innovative_award.svg"
								alt="Impact Trophy"
							/>
						</div>
						<div className={s.awardBox}>
							<img src="/assets/award_box.svg" alt="award box" />
							<p className={s.awardBoxLabel}>
								<b>Matteo Giambarresi</b>
							</p>
							<p className={s.awardBoxLabel2}>AWAY</p>
						</div>
						<a
							href="https://www.shiftfestival.be/project/away-9"
							className={s.bekijkBtn}
						>
							<img src="/assets/icons/arrowLink.svg" alt="arrowLink" />
						</a>
					</div>
					<div className={s.projectCard}>
						<p className={s.winTitle}>
							<b>Winnaar juryprijs</b>
						</p>
						<div className={s.avatarWrap}>
							<img
								className={s.avatarImg}
								src="/assets/BEATRICE.webp"
								alt="profile"
							/>
							<img
								className={s.trophyImg}
								src="/assets/jury_award.svg"
								alt="Impact Trophy"
							/>
						</div>
						<div className={s.awardBox}>
							<img src="/assets/award_box.svg" alt="award box" />
							<p className={s.awardBoxLabel2}>
								<b>Beatrice Bjoko</b>
							</p>
							<p className={s.awardBoxLabel2}>LUME</p>
						</div>
						<a
							href="https://www.shiftfestival.be/project/lume-29"
							className={s.bekijkBtn}
						>
							<img src="/assets/icons/arrowLink.svg" alt="arrowLink" />
						</a>
					</div>
					<div className={s.projectCard}>
						<p className={s.winTitle}>
							<b>Winnaar publieksprijs</b>
						</p>
						<div className={s.avatarWrap}>
							<img
								className={s.avatarImg}
								src="/assets/KAORTZ.webp"
								alt="profile"
							/>
							<img
								className={s.trophyImg}
								src="/assets/public_award.svg"
								alt="Impact Trophy"
							/>
						</div>
						<div className={s.awardBox}>
							<img src="/assets/award_box.svg" alt="award box" />
							<p className={s.awardBoxLabel2}>
								<b>Sarah El Fraihi</b>
							</p>
							<p className={s.awardBoxLabel3}>KAORTZ</p>
						</div>
						<a
							href="https://www.shiftfestival.be/project/kaortz-41"
							className={s.bekijkBtn}
						>
							<img src="/assets/icons/arrowLink.svg" alt="arrowLink" />
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
