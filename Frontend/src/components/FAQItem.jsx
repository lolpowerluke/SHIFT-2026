import {useEffect, useRef, useState} from "react";

export default function FAQItem({s, title, answer}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={s.faqItem} onClick={() => setIsOpen(!isOpen)}>
            <div className={s.faqTitle}>
                <p><b>{title}</b></p>
                    <span className={s.openBtn}>
                        <img
                            src={isOpen ? "/assets/icons/minBlue.svg" : "/assets/icons/plusBlue.svg"}
                            alt={isOpen ? "Sluiten" : "Openen"}
                        />
                    </span>
            </div>
            <div className={`${s.faqAnswer} ${isOpen ? s.open : ''}`}>
                <div style={{overflow: 'hidden'}}>
                    <p>{answer}</p>
                </div>
            </div>
        </div>
    );
}