import s from "./Loading.module.css";
import Throbber from "../Throbber.jsx";

export default function Loading(){
    return(
        <>
            <div className={`ctx ${s.ctx}`}>
                <p>Even geduld</p>
                <div className={s.throbberCtx}>
                    <div className={`throbber-wrap`}>
                        <Throbber/>
                    </div>
                </div>
            </div>
        </>
    )
}