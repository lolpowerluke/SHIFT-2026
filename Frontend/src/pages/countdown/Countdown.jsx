import React from "react";
import "./index.css";
import "../../css/style.css"
import {useCountdown} from "../../js/countdown.js";

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

    const {timeLeft, blinkingS} = useCountdown()

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
                        {timeLeft ? <div id="timer">
                            <div className="timerBox">
                                <span>{timeLeft.days}</span>
                                <span>Dagen</span>
                            </div>
                            <div className="timerBox">
                            <span>{timeLeft.hours}</span>
                                <span>Uren</span>
                            </div>
                            <div className="timerBox">
                            <span>
                                {timeLeft.minutes}
                            </span>
                                <span>Minuten</span>
                            </div>
                            <div className="timerBox">
                            <span>
                                <span className={blinkingS === "seconds" ? "hidden" : ""}>{timeLeft.seconds}</span>
                            </span>
                                <span>Seconden</span>
                            </div>
                        </div> : "LIVE NOW!"}
                        <br/>
                        <div className="main">
                            <p>VRIJDAG 19 JUNI</p>
                            <p>17:00 - 21:30</p>
                        </div>
                        <br/>
                        <a href="https://www.erasmushogeschool.be/nl/evenementen/shiftfestival" className="btn" target="_blank">Schrijf je gratis in!</a>
                    </div>
                </div>
                <div className="copy-text section darkText" id="copy-text">
                    <div className="shiftCopy cardDiv">
                        <h2>SHIFT Festival 2026</h2>
                        <p>
                            SHIFT FESTIVAL is een jaarlijks evenement georganiseerd door <a href="https://www.erasmushogeschool.be/nl">Erasmushogeschool Brussel</a> en de opleiding <a href="https://www.erasmushogeschool.be/nl/opleidingen/multimedia-en-creatieve-technologie">Multimedia & Creatieve Technologie</a>.
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
                            <a href="https://www.erasmushogeschool.be/nl/opleidingen/multimedia-en-creatieve-technologie">Multimedia & creatieve technologie</a> is een professionele bacheloropleiding aan de Erasmushogeschool
                            Brussel.<br/><br/>Deze opleiding combineert creativiteit met techniek,
                            gericht op het ontwikkelen van digitale ervaringen, interactieve
                            toepassingen, webtechnologieën en creatieve IT-oplossingen.
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <p className="xlarge bold">
                            Wil je er zeker bij zijn?<br/>Plaats het nu al in je agenda!
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