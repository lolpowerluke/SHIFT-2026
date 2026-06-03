import React from "react";
import "./index.css";
import Footer from "../../components/Footer.jsx";
import {useCountdown} from "../../js/countdown.js";
import {Link} from "react-router";

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

    const {timeLeft, blinking} = useCountdown()

    return (
        <>
            <div className="wrap topSpacer flexSpaceBetween">
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
                                            OPLEIDING MULTIMEDIA<br/>
                                            CREATIEVE TECHNOLOGIE
                                        </h1>
                                    </div>
                                    <div>&</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="timerDiv xlarge">
                        {timeLeft? <span id="timer"
                        ><span id="days">{timeLeft.days}</span>D <span id="hours">{timeLeft.hours}</span>H <span id="minutes">{timeLeft.minutes}</span>M <span id="seconds">{timeLeft.seconds}</span>S
					</span> : "LIVE NOW!"}
                        <br/>
                        <div className="main">
                            <p>VRIJDAG 19 JUNI</p>
                            <p>17:00 - 21:30</p>
                        </div>
                    </div>
                </div>
                <a href="#copy-text">
                    <div>
                        <img id="scrollPointer" src="/assets/icons/pointer2.svg"/>
                    </div>
                </a>
                <div className="copy-text section" id="copy-text">
                    <div className="shiftCopy cardDiv">
                        <h2>Shift Festival 2026</h2>
                        <p>
                            SHIFT FESTIVAL is een jaarlijks evenement georganiseerd door
                            <a href="https://www.erasmushogeschool.be/nl">
                                Erasmushogeschool Brussel</a
                            >
                            en de opleiding
                            <a
                                href="https://www.erasmushogeschool.be/nl/opleidingen/multimedia-en-creatieve-technologie"
                            >
                                Multimedia & Creatieve Technologie</a
                            >.
                        </p>
                        <br/>
                        <p>
                            Kom de indrukwekkende eindprojecten van de derdejaars bewonderen en
                            breng je stem uit op je favoriete projecten, zodat ze tijdens de
                            awardshow een prijs kunnen winnen.
                        </p>
                    </div>
                    <div className="mctCopy cardDiv">
                        <h2>Wat is MCT?</h2>
                        <p>
                            <a
                                href="https://www.erasmushogeschool.be/nl/opleidingen/multimedia-en-creatieve-technologie"
                            >Multimedia & creatieve technologie</a
                            >
                            is een professionele bacheloropleiding aan de Erasmushogeschool
                            Brussel. Deze opleiding combineert creativiteit met techniek,
                            gericht op het ontwikkelen van digitale ervaringen, interactieve
                            toepassingen, webtechnologieën en creatieve IT-oplossingen.
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <p className="xlarge bold">
                            Wil je er zeker bij zijn? Plaats het in je agenda.
                        </p>
                    </div>
                    <br/>
                    <a className="linkBtn" id="std" onClick={handleSTDClick} title="Add this event to your calendar">
                        Save the date!
                    </a>
                </div>
            </div>
        </>
    )
}