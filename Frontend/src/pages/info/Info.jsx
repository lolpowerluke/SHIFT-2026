import s from "./info.module.css";
import ClockIcon from "../../components/clock/ClockIcon.jsx";
import FAQItem from "../../components/FAQItem.jsx";
import {useRef, useState} from "react";

const events = [
	{ time: { hr: 17, min: 0 }, event: "start" },
	{ time: { hr: 17, min: 30 }, event: "Foodtrucks" },
	{ time: { hr: 19, min: 30 }, event: "Sluiting stemmen" },
	{ time: { hr: 20, min: 0 }, event: "Liveshow & awards" },
	{ time: { hr: 21, min: 30 }, event: "Einde liveshow" },
];

const faq = [
	{
		title: "Is het festival gratis?",
		answer: <>Ja, SHIFT festival is gratis.</>,
	},
	{
		title: "Hoe schrijf ik mij in?",
		answer: (
			<>
				Via de{" "}
				<a
					href="https://www.erasmushogeschool.be/nl/evenementen/shiftfestival"
					target="_blank"
					rel="noreferrer"
				>
					deze website
				</a>
				.
			</>
		),
	},
	{
		title: "Voor wie is SHIFT bedoeld?",
		answer: "SHIFT is bedoeld voor toekomstige studenten die een studiekeuze willen maken, alumni, bedrijven en ouders, familie en vrienden van de derdejaarsstudenten.",
	},
	{
		title: "Is de locatie toegankelijk voor rolstoelgebruikers?",
		answer: "Ja, de locatie is toegankelijk voor rolstoelgebruikers.",
	},
	{
		title: "Kan ik ter plaatse eten of drinken?",
		answer: "Ja, er zijn gratis eet- en drinkmogelijkheden voorzien.",
	},
];

export default function Info() {
    const [isProgrammaOpen, setIsProgrammaOpen] = useState(false);
    const [isHowOpen, setIsHowOpen] = useState(false);

    const handleProgrammaClick = () => {
        setIsProgrammaOpen(!isProgrammaOpen);
    }

    const handleHowClick = () => {
        setIsHowOpen(!isHowOpen);
    }
    return (
        <>
            <div className={`${s.heroLayout}`}>
                <img
                    src="/assets/icons/LocationOrange.svg"
                    alt=""
                    aria-hidden="true"
                    className={s.locationIcon}
                />
                <div className={s.heroTitle}>
                    <span className={s.title}>PRAKTISCHE <br>
                    </br>INFORMATIE</span>
                </div>
                <a href="#programma" className={`linkBtn ${s.heroBtn} ${s.mobile}`}>
                    Bekijk het programma
                </a>
            </div>

            <div className="altBg">
                <div className="ctx">
                    <div className={`${s.infoSection}`}>
                        <div className={`${s.infoCard}`}>
                            <h2>WAAR?</h2>
                            <h4>Erasmushogeschool Brussel</h4>
                            <p>Campus Kaai<br/>
                                Nijverheidskaai 170, 1070 Anderlecht</p>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10077.60824291396!2d4.312529743524132!3d50.84223854859938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c40f19faf0f9%3A0x4ef5b683135ecb1e!2sErasmushogeschool%20Brussel!5e0!3m2!1snl!2sbe!4v1781275871945!5m2!1snl!2sbe"
                                allowFullScreen="false" referrerPolicy="no-referrer"/>
                            <a className="linkBtn" href="https://maps.app.goo.gl/JWGWbtQpvk9Era6p9" target="_blank">Open
                                in
                                Google Maps </a>
                        </div>
                        <div className={`${s.infoCard}`} id={s.programma} onClick={handleProgrammaClick}>
                            <div className={s.whereWho}>
                                <h2 className={`${s.faqTitle}`}>
                                    WANNEER? <span className={`${s.openBtn} ${s.mobile}`}>{isProgrammaOpen ? "-" : "+"}</span>
                                </h2>
                            </div>
                            <h4>Vrijdag 19 juni 2026</h4>
                            <p>17:00 - 21:30</p>
                            <div className={`${s.calendarWrap} ${isProgrammaOpen ? `${s.open}` : ''}`}>
                                <div style={{overflow: 'hidden', width: '100%', marginLeft: '0', marginRight: '0'}}>
                                    <div className={`${s.calendar}`}>
                                        {events.map((e) => (
                                            <div className={s.timeSlot}>
                                                <ClockIcon hour={e.time.hr} minute={e.time.min}/>
                                                <span
                                                    className={s.startTime}>{`${e.time.hr}:${e.time.min.toString().padStart(2, "0")}`}</span>
                                                <span className={s.event}>{e.event}</span>
                                            </div>))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${s.infoCard}`} id={s.how} onClick={handleHowClick}>
                            <div className={s.whereWho}>
                                <h2 className={`${s.faqTitle}`}>
                                    HOE? <span className={`${s.openBtn} ${s.mobile}`}>{isHowOpen ? "-" : "+"}</span>
                                </h2>
                            </div>
                            <p>Campus Kaai is vlot bereikbaar met het openbaar vervoer, per fiets, en met de auto.</p>
                            <div className={`${s.howWrap} ${isHowOpen ? `${s.open}` : ''}`}>
                                <div style={{overflow: 'hidden', width: '100%', marginLeft: '0', marginRight: '0'}}>
                                    <div className={`${s.flexRow}`}>
                                        {/*TODO: add img*/}
                                        <img src="https://placehold.co/50" alt="public transport"/>
                                        <div>
                                            <h4>OPENBAAR VERVOER</h4>
                                            <p>Metro 5 tot Aumale of tram 81 tot Conscience.<br/>Beide op 8 minuten
                                                wandelen.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`${s.flexRow}`}>
                                        {/*TODO: add img*/}
                                        <img src="https://placehold.co/50" alt="public transport"/>
                                        <div>
                                            <h4>MET DE FIETS</h4>
                                            <p>Veilige fietsenstalling aanwezig aan de hoofdingang van Campus Kaai.</p>
                                        </div>

                                    </div>
                                    <div className={`${s.flexRow} ${s.traffic}`}>
                                        {/*TODO: add img*/}
                                        <img src="https://placehold.co/50" alt="public transport"/>
                                        <div>
                                            <h4>MET DE AUTO</h4>
                                            <p>Beperkt parkeren op de campus. Gratis bezoekersparking in de buurt.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ctx">
                <h3>FAQ</h3>
                <div className={`${s.faq}`}>
                    {faq.map((q, index) => (
                        <FAQItem key={index} title={q.title} answer={q.answer} s={s}/>
                    ))}
                </div>
            </div>
        </>);
}
