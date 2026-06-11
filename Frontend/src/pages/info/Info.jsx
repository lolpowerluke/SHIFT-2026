import s from "./info.module.css";

export default function Info() {
	return (
		<>
			<div className={s.heroContent}>
				<img src="/assets/heroContent/infoHero.jpg" alt="" aria-hidden="true" />
			</div>

			<div className={s.heroLayout}>
				<h1 className={s.heroTitle}>
					Praktische <br /> Info
					<img
						src="/assets/icons/LocationOrange.svg"
						alt=""
						aria-hidden="true"
						className={s.locationIcon}
					/>
				</h1>
				<a href="#programma" className={`linkBtn ${s.heroBtn}`}>
					Bekijk het programma
				</a>
			</div>

			<main className="ctx"></main>
		</>
	);
}
