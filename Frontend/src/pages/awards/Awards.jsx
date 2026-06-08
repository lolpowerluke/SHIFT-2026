import { useState } from "react";
import s from "./Awards.module.css";
import "../../css/style.css";

export default function Awards() {

    return (
        <>
            <div className={s.bodyContainer}>
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
                        <div>
                            <h3>??+</h3>
                            <h4>PROJECTEN</h4>
                        </div>
                        <div>
                            <h3>19</h3>
                            <h4>JUNI 2026</h4>
                        </div>
                        <div>
                            <h3>4</h3>
                            <h4>AWARDS</h4>
                        </div>
                    </div>
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
                        <h4>DE AWARDSHOW ZAL PLAATSNEMEN OP CAMPUS KAAI, EHB.</h4>
                    </div>
                </div>
            <div className={s.bodyContainer}>
                <div className={s.aboutAwardsContainer}>
                    <h2>WELKE AWARDS ZIJN ER?</h2>
                    <div className={s.awardsContainer}>
                        <img src="/assets/icons/StarBlue.svg" alt="star" className={s.starImg} />
                        <div className={s.infoTitle}>
                            <h3>IMPACTPRIJS</h3>
                            <h4>GROOTSTE IMPACT</h4>                       
                        </div>
                        <p>Deze gaat naar het project dat de grootste maatschappelijke impact maakt en het meest potentieel heeft om echte veranderingen te maken in de wereld.</p>
                    </div>
                    <div className={s.awardsContainer}>
                        <img src="/assets/icons/ControllerBlue.svg" alt="controller" className={s.controllerImg} />
                        <div className={s.infoTitle}>
                            <h3>INNOVATIEPRIJS</h3>
                            <h4>MEEST VERNIEUWEND</h4>
                        </div>
                        <p>De innovatieprijs bekroont het meest vernieuwende technische project. Een project dat niet alleen creatief is, maar ook technisch uitdagend. </p>
                    </div>
                    <div className={s.awardsContainer}>
                        <img src="/assets/icons/ThumbsupBlue.svg" alt="thumbs up" className={s.thumbsUpImg} />
                        <div className={s.infoTitle}>
                            <h3>JURYPRIJS</h3>
                            <h4>EXPERT KEUZE</h4>
                        </div>
                        <p>De juryprijs wordt uitgereikt door onze eigen docenten met hun jaren ervaring en kennis.</p>
                    </div>
                    <div className={s.awardsContainer}>
                        <img src="/assets/icons/SmileyBlue.svg" alt="smiley" className={s.smileyImg} />
                        <div className={s.infoTitle}>
                            <h3>PUBLIEKPRIJS</h3>
                            <h4>JIJ BESLIST</h4>
                        </div>
                        <p>De publieksprijs word bepaald door de stemmen van jullie en het publiek. Jullie krijgen allemaal de kans om te stemmen op jullie favoriete projecten.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
