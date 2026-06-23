import s from "./Countdown.module.css";
import Carousel from "../../components/Carousel.jsx";
import Throbber from "../../components/Throbber.jsx";
import { useState } from "react";
import IframePopup from "../../components/afterShow/videoPopup.jsx";
import WinnerBanner from "../../components/winnerComponent/WinnerBanner.jsx";
import { useNavigate } from "react-router";

export default function Countdown() {
	const navigate = useNavigate();
	const handleOpenMaps = () => {
		window.open(
			"https://maps.app.goo.gl/rZ8pQ7jYJph3tR3L9",
			"_blank",
			"noopener,noreferrer",
		);
	};

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className={s.heroContent} id="home">
				<video autoPlay muted loop playsInline>
					<source
						src="/assets/heroContent/videoheroMobile.webm"
						media="(max-width: 1024px)"
						type="video/webm"
					/>
					<source
						media="(min-width: 1023px)"
						src="/assets/heroContent/videohero.webm"
						type="video/webm"
					/>
					<img
						srcSet="/assets/heroContent/heroImg.png"
						alt="EhB SHIFT festival hero image"
					/>
				</video>
				<div className={s.heroGradient} />
			</div>
			<div className={s.landingWrap}>
				<div>
					<div className={s.heroLayout}>
						<img
							src="../../assets/logos/shift_logo.svg"
							id={s.heroLogo}
							fetchPriority="high"
							alt="SHIFT Logo"
						/>
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
					<div className={`${s.cd}`}>
						<a
						onClick={() => window.open("/project")}
						className={`${s.linkBtn} linkBtn`}
						rel="noreferrer"
						
						><p>Dit was SHIFT 2026!</p></a>
					</div>
					<div className={`${s.cta}`}>
						<a
							onClick={() => window.open("https://www.erasmushogeschool.be/nl/vond-je-shift-festival-tof")}
							className={`${s.linkBtn} linkBtn`}
							rel="noreferrer"
						>
							<p>Blijf op de hoogte van SHIFT 2027</p>
						</a>
					</div>
					<div className={`${s.cta}`}>
						<a
							onClick={() => setIsOpen(true)}
							className={`${s.linkBtn} linkBtn`}
							rel="noreferrer"
						>
							<img src="/assets/play-button.svg" alt="play video button" />
							<p>Bekijk de aftermovie</p>
						</a>
						{isOpen && (
							<IframePopup
								src="https://example.com"
								title="Aftermovie"
								onClose={() => setIsOpen(false)}
							/>
						)}
					</div>
				</div>
				<a href="#experience" id={s.scrollPointer}>
					<img src="/assets/icons/pointer2.svg" alt="scroll!" />
				</a>
			</div>

			<div id="experience" className={`${s.wrap} wrap`}>
				<div className={s.section}>
					<div className={s.sectionFlexer}>
						<div className={s.shiftInfoSide}>
							<div className={s.shiftInfoNoCard}>
								<h2 className={s.infoTitle}>SHIFT FESTIVAL</h2>
								<p>
									SHIFT FESTIVAL is de eindejaarsexpo van Multimedia & Creatieve
									Technologie aan Erasmushogeschool Brussel.
									<br /> Onze laatstejaarsstudenten tonen het beste van zichzelf
									met hun eindwerken van XR/3D‑ervaringen tot interactieve
									installaties. Ze duiken ook in thema’s die ertoe doen, zoals
									verbinding, mantelzorg, de strijd tegen phishing en
									vrouwengeweld. Daarnaast mag je de liveshow en awards zeker
									niet missen!
								</p>
							</div>
						</div>
						<div className={s.projectSide}>
							{/*<img src="/assets/sfeerbeeld.png" alt="sfeerbeeld"/>*/}
							<div className={s.section}>
								<Carousel />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="altBg">
				<div className={s.centerDiv}>
					<WinnerBanner />
				</div>
			</div>
			<br />
			<div className={`${s.infoMultimediaCard} section`}>
				<div className={s.textContainer}>
					<div className={s.orange}>
						<h2>WAT IS MULTIMEDIA & CREATIEVE TECHNOLOGIE?</h2>
					</div>
					<div className={s.beige}>
						<p>
							Multimedia & Creatieve Technologie is een bacheloropleiding aan
							Erasmushogeschool Brussel.
						</p>
						<p>
							In deze opleiding worden innovatieve digitale ervaringen
							gecreëerd.
						</p>
						<img
							src="/assets/picture_ehb.png"
							alt="Multimedia & Creatieve Technologie"
							loading="lazy"
						/>
					</div>
				</div>
				<div className={`${s.cta}`}>
					<a
						href="https://www.erasmushogeschool.be/nl/opleidingen/multimedia-en-creatieve-technologie"
						className={`${s.linkBtn} linkBtn`}
						target="_blank"
						rel="noreferrer"
					>
						Ontdek de richting
					</a>
				</div>
			</div>
		</>
	);
}
