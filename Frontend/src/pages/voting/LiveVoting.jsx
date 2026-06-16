import {useEffect, useState} from "react";
import s from "./LiveVoting.module.css";
import {getCloudinaryUrl} from "../../utils/cloudinary.js";

const API_URL = import.meta.env.VITE_API_URL

const votable = [22, 34, 17];

async function getToken() {
    try {
        const res = await fetch(`${API_URL}/voting/token`);
        if (!res.ok) throw new Error("Failed to fetch token");
        const {token} = await res.json();
        return token;
    } catch (err) {
        console.error("Error in getToken:", err);
        return null;
    }
}

export default function LiveVoting() {
    // check if token exists in localstorage
    // if not > GET /voting/token
    // > save token to localstorage
    // select vote
    // > POST /voting
    // expects body: {token, id}
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [hasVoted, setHasVoted] = useState(() => localStorage.getItem("hasVoted") === "true");
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [voteConfirmed, setVoteConfirmed] = useState(false);


    useEffect(() => {
        if (!token) {
            setLoading(true);
            getToken()
                .then(fetchedToken => {
                    if (fetchedToken) {
                        localStorage.setItem("token", fetchedToken);
                        setToken(fetchedToken);
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [token]);

    useEffect(() => {
        // Avoid fetching projects if user has already voted
        if (hasVoted) return;

        const fetchTopProjects = async () => {
            setLoading(true);
            try {
                const promises = votable.map(id =>
                    fetch(`${API_URL}/project/${id}`)
                        .then(res => res.ok ? res.json() : null)
                        .then(data => data?.project || null)
                        .catch(() => null)
                );
                const topProjects = await Promise.all(promises);
                setProjects(topProjects.filter(Boolean));
            } catch (error) {
                console.error("Error fetching top projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopProjects();
    }, [hasVoted]);

    async function handleVote(id) {
        if (!token) {
            return;
        }

        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/voting`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token, id})
            });
            if (res.ok) {
                const data = await res.json();
                const backendHasVoted = data.hasVoted;
                localStorage.setItem("hasVoted", backendHasVoted.toString());
                setHasVoted(backendHasVoted);
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.message || "Fout bij het uitbrengen van je stem.");
            }
        } catch (err) {
            console.error("Error handleVote:", err);
            setError("Netwerkfout. Probeer het opnieuw.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Laden...</p>;
    }

    if (hasVoted) {
        return <p>Je hebt al gestemd!</p>;
    }

    return (
        <>
            <div className="headerSpacer"></div>
            <div className={`${s.ctx} ctx`}>
                <h1>Stem hier!</h1>
                <h2>Druk op het project dat jouw stem krijgt.</h2>
                <div className={s.projectsGrid}>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={s.projectCard}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className={s.imageWrapper}>
                                <img src={getCloudinaryUrl(project.media?.[0]) ??
                                    getCloudinaryUrl(project.images?.[0]) ??
                                    "/assets/imageCard.png"} alt={project.name}/>
                            </div>

                            <h2>{project.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
            {selectedProject && (
                <div className={s.overlay} onClick={() => setSelectedProject(null)}>
                    <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                        <div
                            className={s.closeButton}
                            onClick={() => {
                                setSelectedProject(null);
                                setVoteConfirmed(false);
                            }}
                        >
                            <img src="/assets/icons/closeButton.svg" alt="Close modal"/>
                        </div>
                        {!voteConfirmed ? (
                            <>
                                <h2>{selectedProject.name}</h2>
                                <div className={s.modalImage}>
                                    <img src={selectedProject.image} alt={selectedProject.name}/>
                                </div>
                                <p>{selectedProject.description}</p>
                                <button
                                    className={s.voteButton}
                                    onClick={() => setVoteConfirmed(true)}
                                >
                                    Stem voor dit project!
                                </button>
                            </>
                        ) : (
                            <>
                                <h2>Ben je zeker?</h2>
                                <p>
                                    Je staat op het punt om te stemmen voor{" "}
                                    <b>{selectedProject.name}</b>.
                                </p>
                                <button className={s.voteButton}>Bevestig stem</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}