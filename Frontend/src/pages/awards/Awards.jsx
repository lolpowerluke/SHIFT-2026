import s from "./Awards.module.css";
import "../../css/style.css";
import { useNavigate } from "react-router";

export default function Awards() {
    const navigate = useNavigate();

    return (
        <>
            <div className={s.heroContainer}>
                <img src="/assets/icons/OrangeTrophy.svg" alt="award" className={s.awardImg} />
                <span className={s.title}>Award<br />show</span>
                <div className={s.landingInfo}>
                    <img src="/assets/icons/BlueVote.svg" alt="VoteBlue" className={s.voteImg} />
                    <div>
                        <span>... projecten worden getoond.</span>
                        <span>4 awards worden uitgereikt.</span>
                    </div>
                    <button onClick={() => navigate('/project')} className="blueBtn">Ontdek alle projecten</button>
                </div>
            </div>
        </>
    );
}
