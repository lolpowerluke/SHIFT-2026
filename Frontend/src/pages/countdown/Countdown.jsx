import React from "react";
import "./index.css";
import "../../css/style.css";
import { useCountdown } from "../../js/countdown.js";

export default function Countdown() {
	const pageURL = "shiftfestival.be";

	function handleSTDClick() {
		const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
		if (isApple) {
			window.location.href = `webcal://${pageURL}/shiftCalendar.ics`;
		} else {
			const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=SHIFT+-+Save+the+Date&dates=20260619T150000Z/20260619T190000Z&details=Our+third+year+students+are+showing+off+their+final+projects!&location=Nijverheidskaai+170,+1070+Anderlecht`;

			window.open(gcalUrl, "_blank");
		}
	}

	const { timeLeft, blinkingS } = useCountdown();

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
			<div className="landingWrap">
				<div>
					<div className="heroLayout">
						<div>
							<img
								src="../../assets/logos/shift_logo.svg"
								id="heroLogo"
								fetchPriority="high"
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
			{/*TODO: J past aan tot hier*/}
			<div className="wrap topSpacer flexSpaceBetween"></div>
		</>
	);
}
