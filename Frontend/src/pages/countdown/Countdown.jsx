import { useState } from "react";
import s from "./Countdown.module.css";
import "../../css/style.css";
import { useCountdown } from "../../js/countdown.js";

export default function Countdown() {
    const { timeLeft, blinkingS } = useCountdown();

    const [currentIndex, setCurrentIndex] = useState(0);
    const placeholders = [
        { id: 1, title: "Project Alpha" },
        { id: 2, title: "Project Beta" },
        { id: 3, title: "Project Gamma" },
    ];

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
                    {
                        timeLeft ? (
                            <>
                                <div className={s.cd}>
                                    <span>We tellen af!</span>
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
                                            <span className={blinkingS === s.seconds ? s.hidden : "darkText"}>
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
                        )
                    }
                </div>
            </div>

            <div className={`${s.wrap} wrap ${s.topSpacer} ${s.previewSection}`}>
                <div className={s.section}>
                    <div className={s.sectionFlexer}>
                        <div className={s.projectSide}>
                            <div className={s.projectCard}>
                                <div className={s.carouselImage}>
                                    <div
                                        className={s.carouselSlideAnimation}
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        {
                                            placeholders.map((project) => (
                                                <div key={project.id} className={s.carouselSlide}>
                                                    <div className={
                                                        s.cardImagePlaceholder}>
                                                        <span>Coming Soon</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={s.carouselDots}>
                                    {
                                        placeholders.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`dot ${currentIndex === index ? "active" : ""}`}
                                                aria-label={`Slide ${index + 1}`}
                                            />
                                        ))
                                    }
                                </div>
                                <h2>SEE. EXPERIENCE. MEET.</h2>
                                <div className={s.projectCTA}>
                                    <button>
                                        <span>Coming Soon</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.shiftInfoSide}>
                            <div className={
                                s.shiftInfoNoCard}>
                                <h2 className={s.infoTitle}>Wat beleef je op SHIFT?</h2>
                                <ul className={s.infoList}>
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
            </div>
            <div className="altBg">
                <div className={`section wrap ${s.wrap}`}>
                    <h2>WAAR EN WANNEER?</h2>
                    <div className={s.infoSection}>
                        <div>
                            <div className={s.shiftTime}>
                                <div className={
                                    s.iconCalendar}>
                                    <img src="/assets/icons/CalendarBlue.svg" alt="Kalender" />
                                </div>
                                <div>
                                    <h3>VRIJDAG 19 JUNI</h3>
                                    <p>17:00 - 21:30</p>
                                </div>
                            </div>
                        </div>
                        <hr className={s.sectionDivider} />
                        <div>
                            <div className={s.shiftLocation}>
                                <div className={
                                    s.iconMap}>
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
                    <h2>VOOR WIE?</h2>
                    <div className={s.audienceContainer}>
                        <div className={
                            s.audienceCard}>
                            <div className={s.iconHeadphones}>
                                <img src="/assets/icons/koptelefoon.svg" alt="Studenten" />
                            </div>
                            <h3>STUDENTEN</h3>
                            <p>Toon je werk aan honderden bezoekers en professionals.</p>
                        </div>

                        <div className={s.audienceCard}>
                            <div className={
                                s.iconPaper}>
                                <img src="/assets/icons/paper.svg" alt="Bedrijven" />
                            </div>
                            <h3>Bedrijven</h3>
                            <p>Ontdek jong digitaal talent voor stages en jobs.</p>
                        </div>

                        <div className={s.audienceCard}>
                            <div className={
                                s.iconChatBubble}>
                                <img src="/assets/icons/chat-bubble.svg" alt="Bezoekers" />
                            </div>
                            <h3>tech-lovers</h3>
                            <p>Ontdek. Test. Laat je verrassen.</p>
                        </div>

                        <div className={s.audienceCard}>
                            <div className={
                                s.iconStar}>
                                <img src="/assets/icons/star.svg" alt="Stemmen" />
                            </div>
                            <h3>bezoekers</h3>
                            <p>Stem mee en bepaal de publiekswinnaar.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.infoMultimediaCard}>
                <div className={s.multimediaCardContent}>
                    <div className={s.textContainer}>
                        <h2>WAT IS MULTIMEDIA & CREATIEVE TECHNOLOGIE?</h2>
                        <p><a href="https://www.erasmushogeschool.be/opleidingen/multimedia-en-creatieve-technologie">Multimedia & Creatieve Technologie</a> is een Bacheloropleiding op <a href="https://www.erasmushogeschool.be/">Erasmus Hogeschool Brussel.</a> <br></br><br></br> Hier komen design en technologie samen om digitale ervaringen te bouwen.</p>
                    </div>
                    <img src="/assets/opleidingPlaceholder.jpg" alt="Multimedia & Creatieve Technologie" />
                </div>
            </div >
            {/* TODO: Fill in links and change color for them */}
        </>
    );
}
