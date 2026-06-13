import {useEffect, useRef, useState} from "react";

export default function FAQItem({s, title, answer}) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <div className={s.faqItem} onClick={() => setIsOpen(!isOpen)}>
            <div className={s.faqTitle}>
                <p><b>{title}</b></p>
                <button className={s.openBtn}>
                    <span>{isOpen ? '−' : '+'}</span>
                </button>
            </div>
            <div className={`${s.faqAnswer} ${isOpen ? s.open : ''}`}>
                <div style={{overflow: 'hidden'}}>
                    <p ref={contentRef}>{answer}</p>
                </div>
            </div>
        </div>
    );
}