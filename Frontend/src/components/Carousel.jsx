import s from "../pages/countdown/Countdown.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { getCloudinaryUrl } from "../../src/utils/cloudinary.js";
import toSlug from "../../src/utils/toSlug.js";
import { useNavigate } from "react-router";

export function mapProject(p) {
    return {
        id: p.id,
        title: p.name,
        image: getCloudinaryUrl(p.media?.[0]) ?? "/assets/imageCard.png",
        students: (p.members ?? []).map((m) =>
            [m.firstname, m.lastname].filter(Boolean).join(" ") || m.email || "Onbekend"
        ),
    };
}

/* Rework of carousel sytem for IOS devices (https://claude.ai/share/0f21fec9-8cdb-4047-b0b4-ecb2bdcc76cf) */

export default function Carousel() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const isDraggingHorizontal = useRef(false);
    const carouselRef = useRef(null);

    const navigate = useNavigate();

    function handleTouchStart(e) {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        isDraggingHorizontal.current = false;
    }

    function handleTouchEnd(e) {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1));
        if (diff < -50) setCurrentIndex((prev) => Math.max(prev - 1, 0));
        touchStartX.current = null;
        touchStartY.current = null;
        isDraggingHorizontal.current = false;
    }

    const handleTouchMove = useCallback((e) => {
        if (touchStartX.current === null) return;
        const diffX = Math.abs(e.touches[0].clientX - touchStartX.current);
        const diffY = Math.abs(e.touches[0].clientY - touchStartY.current);

        if (!isDraggingHorizontal.current && (diffX > 5 || diffY > 5)) {
            isDraggingHorizontal.current = diffX > diffY;
        }
        if (isDraggingHorizontal.current) {
            e.preventDefault();
        }
    }, []);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        el.addEventListener("touchmove", handleTouchMove, { passive: false });
        return () => el.removeEventListener("touchmove", handleTouchMove);
    }, [handleTouchMove]);

    const handleButton = () => {
        navigate("/project/");
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/project/random/5`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => setProjects(data.projects.map(mapProject)))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    return (
        <>
            <div className={s.projectCard}>
                <div
                    ref={carouselRef}
                    className={s.carouselImage}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className={s.carouselSlideAnimation}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={s.carouselSlide}
                                onClick={() => navigate(`/project/${toSlug(project.title, project.id)}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                />
                                <div className={s.slideOverlay}>
                                    <h3>{project.title}</h3>
                                    <p>{project.students.join(", ")}</p>
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
