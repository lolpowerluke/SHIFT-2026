import {useState} from "react";

export default function FAQItem({s, title, answer}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={s.faqItem}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'}}
                 onClick={() => setIsOpen(!isOpen)}>
                <p><b>{title}</b></p>
                <button style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    marginRight: '1rem'
                }}>
                    {isOpen ? '−' : '+'}
                </button>
            </div>
            {isOpen && <p className={s.faqAnswer}>{answer}</p>}
        </div>
    );
}