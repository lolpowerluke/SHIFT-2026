import s from "./Awards.module.css";
import { useNavigate } from "react-router";

export default function Awards() {
    const navigate = useNavigate();

    return (
        <>
            <div className={s.heroContainer}>
                <div className={s.landingTop}>
                    <img src="/assets/icons/OrangeTrophy.svg" alt="award" className={s.awardImg} />
                    <span className={s.title}>AWARD<br />SHOW</span>
                </div>
                <div className={s.landingBottom}>
                    <img src="/assets/icons/BlueVote.svg" alt="Blue Vote" className={s.voteImg} />
                    <div>
                        <span>... projecten worden getoond.</span>
                        <span>4 awards worden uitgereikt.</span>
                    </div>
                    <button onClick={() => navigate('/project')} className="blueBtn">Ontdek alle projecten</button>
                </div>
            </div>
            <div className={s.awardContainer}>
                <div className={s.awardTop}>
                    <img src="/assets/icons/OrangeTrophy.svg" alt="award" className={s.awardImg} />
                    <span>4 AWARDS</span>
                </div>
                <div className={s.awardBottom}>
                    <div className={s.awardCard}>
                        <img src="/assets/icons/StarBlue.svg" alt="Blue Star" className={s.cardImg} />
                        <span className={s.cardTitle}>IMPACTPRIJS</span>
                        <span className={s.cardSubTitle}>GROOTSTE IMPACT</span>
                        <span className={s.cardDesc}>Deze gaat naar het project dat de grootste maatschapelijke impact maakt en het meest potentieel maakt om echte veranderingen te maken in de wereld.</span>
                    </div>
                    <div className={s.awardCard}>
                        <img src="/assets/icons/ControllerBlue.svg" alt="Blue Controller" className={s.cardImg} />
                        <span className={s.cardTitle}>INNOVATIEPRIJS</span>
                        <span className={s.cardSubTitle}>MEEST VERNIEUWEND</span>
                        <span className={s.cardDesc}>De innovatieprijs bekroont het meest vernieuwende technische project. Een project dat niet alleen creatief is, maar ook technisch uitdagend.</span>
                    </div>
                    <div className={s.awardCard}>
                        <img src="/assets/icons/ThumbsupBlue.svg" alt="Blue Thumbs Up" className={s.cardImg} />
                        <span className={s.cardTitle}>JURYPRIJS</span>
                        <span className={s.cardSubTitle}>EXPERT KEUZE</span>
                        <span className={s.cardDesc}>De juryprijs wordt uitgereikt door onze eigen docenten met hun jaren ervaring en kennis.</span>
                    </div>
                </div>
            </div>
            <div className={`${s.publicPrize} altBg`}>
                <img src="/assets/icons/VoteOrange.svg" alt="Orange Vote" className={s.voteImg} />
                <span className={s.title}>BRENG JE STEM UIT</span>
                <span className={s.subTitle}>Jij bepaalt wie de publiekprijs verdient.</span>
                <img src="/assets/icons/OrangeTrophy.svg" alt="award" className={s.awardImg} />
                <span className={s.time}>UITREIKING OM 20:00 TIJDENS DE AWARD SHOW</span>
                <button>Praktische info <img src="" alt="arrow up right" /></button>
            </div>
        </>
    );
}
