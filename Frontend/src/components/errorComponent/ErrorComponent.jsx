import Throbber from "../Throbber.jsx";
import s from "./ErrorComponent.module.css"

export default function ErrorComponent(error) {
    console.log(error)
    // TODO: msg needs to be tailored to type of error instead of plain error
    let msg = error.error.stack;
    let fault = "Fout";

    if (msg.toLowerCase().includes("syntaxerror")){
        msg = `Het lijkt erop dat we de projecten niet kunnen binnenhalen. Probeer het later opnieuw of contacteer support als dit blijft gebeuren.`
    }

    return (<>
        <div className={`ctx ${s.ctx}`}>
            <p>{fault}: {msg}</p>
            <div className={s.throbberCtx}>
                <div className={`throbber-wrap`}>
                    <Throbber/>
                </div>
            </div>
        </div>
    </>)
}