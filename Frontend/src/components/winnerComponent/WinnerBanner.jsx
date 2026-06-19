import s from "./WinnerBanner.module.css";
import { } from "react";


export default function WinnerBanner() {
    return (
        <>
        <div className={s.cardWrapper}>
            <h3>Winnaars SHIFT 2026</h3>
            <div className={s.winCard}>
                <div className={s.projectCard}>
                    <p className={s.winTitle}><b>Winnaar impactprijs</b></p>
                    <div className={s.avatarWrap}>
                    <img className={s.avatarImg} src="/assets/icons/3de jaars temp.png" alt="profile" />
                    <img className={s.trophyImg} src="/assets/impact_award.svg" alt="Impact Trophy" />
                    </div>
                    <div className={s.awardBox}>
                        <img src="/assets/award_box.svg" alt="award box" />
                        <p className={s.awardBoxLabel2}><b>Stijn Bruynbroeck<br/>Qwinte De Valck</b></p>
                        <p className={s.awardBoxLabel2}>The Last Day In Lhasa</p>
                    </div>
                    <a className={s.bekijkBtn}><img src="/assets/icons/arrowLink.svg" alt="arrowLink" /></a>
                </div>
                <div className={s.projectCard}>
                    <p className={s.winTitle}><b>Winnaar innovatieprijs</b></p>
                    <div className={s.avatarWrap}>
                    <img className={s.avatarImg} src="/assets/icons/3de jaars temp.png" alt="profile" />
                    <img className={s.trophyImg} src="/assets/innovative_award.svg" alt="Impact Trophy" />
                    </div>
                    <div className={s.awardBox}>
                        <img src="/assets/award_box.svg" alt="award box" />
                        <p className={s.awardBoxLabel}><b>Name student</b></p>
                        <p className={s.awardBoxLabel}>The Last Day In Lhasa</p>
                    </div>
                    <a className={s.bekijkBtn}><img src="/assets/icons/arrowLink.svg" alt="arrowLink" /></a>
                </div>
                <div className={s.projectCard}>
                    <p className={s.winTitle}><b>Winnaar juryprijs</b></p>
                    <div className={s.avatarWrap}>
                    <img className={s.avatarImg} src="/assets/icons/3de jaars temp.png" alt="profile" />
                    <img className={s.trophyImg} src="/assets/jury_award.svg" alt="Impact Trophy" />
                    </div>
                    <div className={s.awardBox}>
                        <img src="/assets/award_box.svg" alt="award box" />
                        <p className={s.awardBoxLabel}><b>Name student</b></p>
                        <p className={s.awardBoxLabel}>The Last Day In Lhasa</p>
                    </div>
                    <a className={s.bekijkBtn}><img src="/assets/icons/arrowLink.svg" alt="arrowLink" /></a>
                </div>
                <div className={s.projectCard}>
                    <p className={s.winTitle}><b>Winnaar publieksprijs</b></p>
                    <div className={s.avatarWrap}>
                    <img className={s.avatarImg} src="/assets/icons/3de jaars temp.png" alt="profile" />
                    <img className={s.trophyImg} src="/assets/public_award.svg" alt="Impact Trophy" />
                    </div>
                    <div className={s.awardBox}>
                        <img src="/assets/award_box.svg" alt="award box" />
                        <p className={s.awardBoxLabel}><b>Name student</b></p>
                        <p className={s.awardBoxLabel}>The Last Day In Lhasa</p>
                    </div>
                    <a className={s.bekijkBtn}><img src="/assets/icons/arrowLink.svg" alt="arrowLink" /></a>
                </div>
            </div>
        </div>
        </>
    );
}