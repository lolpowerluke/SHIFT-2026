import s from "./Countdown.module.css";
import "../../css/style.css";
import { useCountdown } from "../../js/countdown.js";
import Carousel from "../../components/Carousel.jsx";

export default function Countdown() {
	const { timeLeft, blinkingS } = useCountdown();

	const handleOpenMaps = () => {
		window.open(
			"https://maps.app.goo.gl/rZ8pQ7jYJph3tR3L9",
			"_blank",
			"noopener,noreferrer",
		);
	};

	return (
		<>
			<div className={s.heroContent}>
				<video autoPlay muted loop playsInline>
					<source src="/assets/heroContent/videohero.webm" type="video/webm" />
					<img
						src="/assets/heroContent/heroImg.jpg"
						alt="EhB SHIFT festival hero image"
					/>
				</video>
			</div>

			<div className={s.landingWrap}>
				<div>
					<div className={s.heroLayout}>
						<div>
							<img
								src="../../assets/logos/shift_logo.svg"
								id={s.heroLogo}
								fetchPriority="high"
								alt="SHIFT Logo"
							/>
						</div>
						<div>
							<div className={s.heroWrapper}>
								<div className={s.rotatedText}>
									<h1>Eindprojecten</h1>
									<div className={s.heroText}>
										<div className={s.courseHeroText}>
											<h1>
												OPLEIDING MULTIMEDIA
												<br />
												CREATIEVE TECHNOLOGIE
											</h1>
										</div>
										<div>&</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={`${s.timerDiv} xlarge`}>
					{timeLeft ? (
						<>
							<div className={s.cd}>
								<span>We tellen af!</span>
							</div>
							<div className={`${s.cd} ${s.smallerCd}`}>
								<span>Vrijdag 17 juni om 17:00</span>
							</div>
							<div id={s.timer}>
								<div className={s.timerBox}>
									<span className="darkText">{timeLeft.days}</span>
									<span>Dagen</span>
								</div>
								<div className={s.timerBox}>
									<span className="darkText">{timeLeft.hours}</span>
									<span>Uren</span>
								</div>
								<div className={s.timerBox}>
									<span className="darkText">{timeLeft.minutes}</span>
									<span>Minuten</span>
								</div>
								<div className={s.timerBox}>
									<span>
										<span
											className={
												blinkingS === s.seconds ? s.hidden : "darkText"
											}
										>
											{timeLeft.seconds}
										</span>
									</span>
									<span>Seconden</span>
								</div>
							</div>
							<div className={`${s.cta} section`}>
								<a
									href="https://www.erasmushogeschool.be/nl/evenementen/shiftfestival"
									className={`${s.linkBtn} linkBtn`}
									target="_blank"
									rel="noreferrer"
								>
									Schrijf je nu gratis in!
								</a>
							</div>
						</>
					) : (
						"LIVE NOW!"
					)}
				</div>
				<a href="#experience" id={s.scrollPointer}>
					<img src="/assets/icons/pointer2.svg" alt="scroll!" />
				</a>
			</div>

			<div
				id="experience"
				className={`${s.wrap} wrap ${s.topSpacer} ${s.previewSection}`}
			>
				<div className={s.section}>
					<div className={s.sectionFlexer}>
						<div className={s.projectSide}>
							<img src="/assets/sfeerbeeld.png" alt="sfeerbeeld" img />
							{/*<Carousel />*/}
						</div>
						<div className={s.shiftInfoSide}>
							<div className={s.shiftInfoNoCard}>
								<h2 className={s.infoTitle}>SHIFT festival</h2>
								<p>
									SHIFT festival is het afstudeer-evenement van de opleiding
									Multimedia & Creative Technoloiey aan Erasmus Hogeschool
									Brussel. Ontdek er de eindprojecten van studenten, waarin
									technologie, creativiteit en innovatie samenkomen. Een unieke
									blik op het werk van de nieuwe generatie digitale makers!
									<br />
									<br />
									Tijdens het festival kunnen projecten niet alleen bekeken,
									maar ook getest en beleefd worden via demo’s, presentaties en
									gesprekken met de makers. Daarnaast is er ruimte om te
									netwerken en worden de meest opvallende projecten in de kijker
									gezet. Met live awardshow!
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="altBg">
				<div className={`section wrap ${s.wrap} ${s.infoSection}`}>
					<div>
						<h2>WAAR EN WANNEER?</h2>
						<div className={s.infoPart}>
							{/* div classname word niet gevonden in pagina */}
							<div className={s.rightSideInfo}>
								<div className={s.shiftTime}>
									<div className={s.iconCalendar}>
										<img src="/assets/icons/CalendarBlue.svg" alt="Kalender" />
									</div>
									<div>
										<h3>VRIJDAG 19 JUNI</h3>
										<p>17:00 - 21:30</p>
									</div>
								</div>
							</div>
							<hr className={s.sectionDivider} />
							{/* div classname word niet gevonden in pagina */}
							<div className={s.leftSideInfo}>
								<div className={s.shiftLocation}>
									<div className={s.iconMap}>
										<img src="/assets/icons/LocationBlue.svg" alt="Locatie" />
									</div>
									<div>
										<h3>ERASMUS HOGESCHOOL CAMPUS KAAI</h3>
										<button className={s.btnMaps} onClick={handleOpenMaps}>
											Open in maps
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h2>VOOR WIE?</h2>
						<div className={s.audienceContainer}>
							<div className={s.audienceCard}>
								<div className={s.iconHeadphones}>
									<img src="/assets/icons/koptelefoon.svg" alt="Studenten" />
								</div>
								<h3>STUDENTEN</h3>
								<p>Toon je werk aan honderden bezoekers en professionals.</p>
							</div>

							<div className={s.audienceCard}>
								<div className={s.iconPaper}>
									<img src="/assets/icons/paper.svg" alt="Bedrijven" />
								</div>
								<h3>Bedrijven</h3>
								<p>Ontdek jong digitaal talent voor stages en jobs.</p>
							</div>

							<div className={s.audienceCard}>
								<div className={s.iconChatBubble}>
									<img src="/assets/icons/chat-bubble.svg" alt="Bezoekers" />
								</div>
								<h3>tech-lovers</h3>
								<p>Ontdek. Test. Laat je verrassen.</p>
							</div>

							<div className={s.audienceCard}>
								<div className={s.iconStar}>
									<img src="/assets/icons/star.svg" alt="Stemmen" />
								</div>
								<h3>bezoekers</h3>
								<p>Stem mee en bepaal de publiekswinnaar.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`${s.infoMultimediaCard} section`}>
				<div className={s.textContainer}>
					<div>
						<h2>WAT IS MULTIMEDIA & CREATIEVE TECHNOLOGIE?</h2>
						<p>
							Multimedia & Creatieve Technologie is een Bacheloropleiding op{" "}
							Erasmus Hogeschool Brussel. Hier komen design en technologie samen
							om digitale ervaringen te bouwen.
						</p>
					</div>
				</div>
				<img
					src="/assets/opleidingPlaceholder.jpg"
					alt="Multimedia & Creatieve Technologie"
				/>
				<div className={`${s.cta}`}>
					<a
						href="https://www.erasmushogeschool.be/en/programmes/multimedia-and-creative-technology"
						className={`${s.linkBtn} linkBtn`}
						target="_blank"
						rel="noreferrer"
					>
						Ontdek de richting!
					</a>
				</div>
			</div>
		</>
	);
}
