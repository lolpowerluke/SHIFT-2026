import s from "../pages/countdown/Countdown.module.css";
import { useState, useEffect } from "react";
import { getCloudinaryUrl } from "../../src/utils/cloudinary.js";

function mapProject(p) {
    return {
        id: p.id,
        title: p.name,
        image: getCloudinaryUrl(p.media?.[0]) ?? "/assets/imageCard.png",
        students: (p.members ?? []).map((m) =>
            [m.firstname, m.lastname].filter(Boolean).join(" ") || m.email || "Onbekend"
        ),
    };
}

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [touchStart, setTouchStart] = useState(null);

    function handleTouchStart(e) {
        setTouchStart(e.touches[0].clientX);
    }

    function handleTouchEnd(e) {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (diff > 50) setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1));
        if (diff < -50) setCurrentIndex((prev) => Math.max(prev - 1, 0));
        setTouchStart(null);
    }


    const handleButton = () => {
        window.open(
            "/project/",
            "_blank",
            "noopener,noreferrer",
        );
    };

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
                <div className={s.carouselImage} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ overflow: "hidden", position: "relative"}}>
                    <div
                        className={s.carouselSlideAnimation}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {projects.map((project) => (
                            <div key={project.id} className={s.carouselSlide} style={{ position: "relative", overflow: "hidden" }}>
                            <img
                                src={project.image}
                                alt={project.title}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: "1rem",
                                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                                color: "white",
                                textAlign: "left",
                            }}>
                                <h3 style={{ margin: 0 , fontSize: "1.5rem"}}>{project.title}</h3>
                                <p style={{ margin: 0, fontSize: "0.85rem" }}>{project.students.join(", ")}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className={s.carouselDots}>
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`${s.dot} ${currentIndex === index ? s.active : ""}`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
                <div className={s.projectCTA}>
                    <button onClick={handleButton}>
                        <span>Bekijk alle projecten</span>
                    </button>
                </div>
            </div>
        </>
    );
}