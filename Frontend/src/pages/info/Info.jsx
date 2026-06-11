import s from "./info.module.css";

export default function Info() {
	return (
		<>
			<div className={s.heroContent}>
				<img src="/assets/heroContent/infoHero.jpg" alt="" aria-hidden="true" />
			</div>

			<div className={s.heroLayout}>
				<div className={s.heroTitle}>
					<div>Praktische</div>
					<div className={s.infoLine}>
						Info
						<img
							src="/assets/icons/LocationOrange.svg"
							alt=""
							aria-hidden="true"
							className={s.locationIcon}
						/>
					</div>
				</div>
				<a href="#programma" className={`linkBtn ${s.heroBtn}`}>
					Bekijk het programma
				</a>
			</div>

			<main className="ctx"></main>
		</>
	);
}
