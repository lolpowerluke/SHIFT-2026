import React, { useState } from "react";
import "./index.css";
import "../../css/style.css";
import { useCountdown } from "../../js/countdown.js";

export default function Countdown() {
	const pageURL = "shiftfestival.be";

	const { timeLeft, blinkingS } = useCountdown();

	const [currentIndex, setCurrentIndex] = useState(0);
	const placeholders = [
		{ id: 1, title: "Project Alpha" },
		{ id: 2, title: "Project Beta" },
		{ id: 3, title: "Project Gamma" },
	];

	return (
		<>
			<div className="heroContent">
				<video autoPlay muted loop playsInline>
					<source
						src="/assets/heroContent/videohero_test.webm"
						type="video/webm"
					/>
					<img
						src="/assets/heroContent/heroImg.jpg"
						alt="EhB SHIFT festival hero image"
					/>
				</video>
			</div>
    const {timeLeft, blinkingS} = useCountdown()

			<div className="landingWrap">
				<div>
					<div className="heroLayout">
						<div>
							<img
								src="../../assets/logos/shift_logo.svg"
								id="heroLogo"
								fetchPriority="high"
								alt="SHIFT Logo"
							/>
						</div>
						<div>
							<div className="heroWrapper">
								<div className="rotatedText">
									<h1>Eindprojecten</h1>
									<div className="heroText">
										<div className="courseHeroText">
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

				<div className="timerDiv xlarge">
					{timeLeft ? (
						<>
							<div className="cd">
								<span>We tellen af!</span>
							</div>
							<div id="timer">
								<div className="timerBox">
									<span className="darkText">{timeLeft.days}</span>
									<span>Dagen</span>
								</div>
								<div className="timerBox">
									<span className="darkText">{timeLeft.hours}</span>
									<span>Uren</span>
								</div>
								<div className="timerBox">
									<span className="darkText">{timeLeft.minutes}</span>
									<span>Minuten</span>
								</div>
								<div className="timerBox">
									<span>
										<span
											className={
												blinkingS === "seconds" ? "hidden" : "darkText"
											}
										>
											{timeLeft.seconds}
										</span>
									</span>
									<span>Seconden</span>
								</div>
							</div>
							<div className="cta section">
								<a
									href="https://www.erasmushogeschool.be/nl/evenementen/shiftfestival"
									className="linkBtn"
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
			</div>
			<div className="wrap topSpacer">
				<div className="section">
					<div className="sectionFlexer">
						<div className="projectSide">
							<div className="projectCard">
								<div className="carouselImage">
									<div
										className="carouselSlideAnimation"
										style={{ transform: `translateX(-${currentIndex * 100}%)` }}
									>
										{placeholders.map((project) => (
											<div key={project.id} className="carouselSlide">
												<div className="cardImagePlaceholder">
													<span>Coming Soon</span>
												</div>
											</div>
										))}
									</div>
								</div>
								<div className="carouselDots">
									{placeholders.map((_, index) => (
										<button
											key={index}
											onClick={() => setCurrentIndex(index)}
											className={`dot ${currentIndex === index ? "active" : ""}`}
											aria-label={`Slide ${index + 1}`}
										/>
									))}
								</div>
								<h2>SEE. EXPERIENCE. MEET.</h2>
								<div className="projectCTA">
									<button>
										<span>Coming Soon</span>
									</button>
								</div>
							</div>
						</div>
						<div className="shiftInfoSide">
							<div className="shiftInfoNoCard">
								<h2 className="infoTitle">Wat beleef je op SHIFT?</h2>
								<ul className="infoList">
									<li>Speel innovatieve games</li>
									<li>Test interactieve installaties en XR-ervaringen</li>
									<li>Ontdek hoe studenten AI gebruiken</li>
									<li>Ontmoet de makers achter de projecten</li>
									<li>Stem op jouw favoriete project</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="section">
					<h2>WAAR EN WANNEER?</h2>
					<div className="shiftTime">
						<div className="iconCalendar">
							<img src="/assets/icons/CalendarBlue.svg" alt="Kalender" />
						</div>
						<div>
							<h3>VRIJDAG 19 JUNI</h3>
							<p>17:00 - 21:30</p>
						</div>
					</div>
					<div className="shiftLocation">
						<div className="iconMap">
							<img src="/assets/icons/LocationBlue.svg" />
						</div>
						<div>
							<h3>ERASMUS HOGESCHOOL CAMPUS KAAI</h3>
							<button className="btnMaps">Open in maps</button>
						</div>
					</div>
					<hr className="sectionDivider" />
					<h2>VOOR WIE?</h2>
					<div className="audienceContainer">
						<div className="audienceCard">
							<div className="iconHeadphones">
								<img src="/assets/icons/koptelefoon.svg" />
							</div>
							<h3>STUDENTEN</h3>
							<p>Toon je werk. Deel je ideeën. Maak impact.</p>
						</div>

						<div className="audienceCard">
							<div className="iconPaper">
								<img src="/assets/icons/paper.svg" />
							</div>
							<h3>Bedrijven</h3>
							<p>Ontdek nieuwe talenten.</p>
						</div>

						<div className="audienceCard">
							<div className="iconChatBubble">
								<img src="/assets/icons/chat-bubble.svg" />
							</div>
							<h3>BEZOEKERS</h3>
							<p>Ontdek. Test. Laat je verrassen.</p>
						</div>

						<div className="audienceCard">
							<div className="iconStar">
								<img src="/assets/icons/star.svg" />
							</div>
							<h3>STEMMEN</h3>
							<p>Kies je favorieten. Bepaal de winnaars.</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
