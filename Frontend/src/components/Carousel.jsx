import s from "../pages/countdown/Countdown.module.css";
import { useState, useEffect } from "react";
import { getCloudinaryUrl } from "../../src/utils/cloudinary";

function mapProject(p) {
    return {
        id: p.id,
        title: p.name,
        image:
            getCloudinaryUrl(p.media?.[0]) ??
            getCloudinaryUrl(p.images?.[0]) ??
            "/assets/imageCard.png",
    };
}

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/project`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => setProjects(data.projects.map(mapProject).slice(0, 5)))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    return (
        <>
            <div className={s.projectCard}>
                <div className={s.carouselImage}>
                    <div
                        className={s.carouselSlideAnimation}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {projects.map((project) => (
                            <div key={project.id} className={s.carouselSlide}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.carouselDots}>
                    {projects.map((_, index) => (
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
    );
}