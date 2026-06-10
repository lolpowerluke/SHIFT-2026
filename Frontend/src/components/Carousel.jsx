import s from "../pages/countdown/Countdown.module.css";
import {useState} from "react";

export default function Carousel(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const placeholders = [
        { id: 1, title: "Project Alpha" },
        { id: 2, title: "Project Beta" },
        { id: 3, title: "Project Gamma" },
    ];
    return(
        <>
            <div className={s.projectCard}>
                <div className={s.carouselImage}>
                    <div
                        className={s.carouselSlideAnimation}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {placeholders.map((project) => (
                            <div key={project.id} className={s.carouselSlide}>
                                <div className={s.cardImagePlaceholder}>
                                    <span>Coming Soon</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.carouselDots}>
                    {placeholders.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`dot ${currentIndex === index ? "active" : ""}`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
                <h2>SEE. EXPERIENCE. MEET.</h2>
                <div className={s.projectCTA}>
                    <button>
                        <span>Coming Soon</span>
                    </button>
                </div>
            </div>
        </>
    )
}