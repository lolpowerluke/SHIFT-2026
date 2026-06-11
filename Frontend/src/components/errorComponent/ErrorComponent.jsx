import Throbber from "../Throbber.jsx";
import s from "./ErrorComponent.module.css"

export default function ErrorComponent({error}) {
    console.error(error);

    let msg = "Er is een onbekende fout opgetreden. Probeer het later opnieuw.";
    const fault = "Fout";

    if (error instanceof SyntaxError || (error.name === "SyntaxError")) {
        msg = "Er is een probleem met de data van de server. Probeer het later opnieuw of contacteer support.";
    } else if (error instanceof TypeError || error.name === 'TypeError') {
        msg = "Kan de server niet bereiken. Controleer je internetverbinding.";
    } else if (error.message.startsWith('HTTP')) {
        const status = error.message.split(' ')[1];
        if (status >= 500) {
            msg = `De server heeft een fout (${status}). Probeer het later opnieuw.`;
        } else if (status >= 400) {
            msg = `Er is een fout opgetreden bij het opvragen van de data (${status}). Probeer het later opnieuw.`;
        }
    } else if (error.stack) {
        msg = `Het lijkt erop dat we de projecten niet kunnen binnenhalen. Probeer het later opnieuw of contacteer support als dit blijft gebeuren. Details: ${error.message}`;
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