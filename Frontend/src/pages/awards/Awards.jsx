import { useState } from "react";
import s from "./Awards.module.css";
import "../../css/style.css";

export default function Awards() {

    return (
        <>
            <div className={s.heroContent}>
                <img src="/assets/icons/OrangeTrophy.svg" alt="awards" className={s.awardsImg} />
                <h1 className={s.heroTitle}>SHIFT AWARDS</h1>
                <div className={s.buttonsContainer}>
                    <button className={s.discoverBtn}>Bezoek het evenement</button>
                    <p>Vier categorieën die excellentie erkennen in innovatie, impact en creativiteit.</p>
                    <button className={s.projectsBtn}>Ontdek alle projecten</button>
                    <p>Bekijk de verschillende projecten </p>
                </div>
                <div className={s.heroData}>
                    <h3>??+ <br></br> PROJECTEN</h3>
                    <h3>19 <br></br> JUNI 2026</h3>
                    <h3>4 <br></br> AWARDS</h3>
                </div>
            </div>
            <div className={s.votingContainer}>
                <img src="/assets/icons/VoteOrange.svg" alt="voting" className={s.votingBoxImg} />
                <h2>HOE EN WANNEER KUNNEN JULLIE STEMMEN?</h2>
                <p>Jullie kunnen op 19 juni, tijdens de festival voor jullie favoriete projecten stemmen.</p>
                <div className={s.infoContainer}>
                    <img src="/assets/icons/PeaceBlue.svg" alt="peace" className={s.peaceSignImg} />
                    <h3>WAAR?</h3>
                    <h4>AGORA, CAMPUS KAAI</h4>
                </div>
                <div className={s.infoContainer}>
                    <img src="/assets/icons/MailBlue.svg" alt="mail" className={s.mailImg} />
                    <h3>WANNEER?</h3>
                    <h4>19 JUNI 2026</h4>
                </div>
                <div className={s.infoContainer}>
                    <img src="/assets/icons/StarBlue.svg" alt="star" className={s.starImg} />
                    <h3>DE AWARDSHOW ZAL PLAATSNEMEN OP CAMPUS KAAI, EHB.</h3>
                </div>
            </div>
            <div className={s.aboutAwardsContainer}>
                <h2>WELKE AWARDS ZIJN ER?</h2>
            </div>
        </>
    );
}
