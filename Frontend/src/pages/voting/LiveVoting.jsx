import {useEffect, useState} from "react";
import s from "./LiveVoting.module.css";
import {getCloudinaryUrl} from "../../utils/cloudinary.js";
import Loading from "../../components/loadingComponent/Loading.jsx";

const API_URL = import.meta.env.VITE_API_URL

const votable = [22, 34, 17];

async function getToken() {
    console.log("getToken");
    try {
        const res = await fetch(`${API_URL}/voting/token`);
        if (!res.ok) throw new Error("Failed to fetch token");
        console.log(res);
        const {token} = await res.json();
        console.log(token);
        return token;
    } catch (err) {
        console.error("Error in getToken:", err);
        return null;
    }
}

export default function LiveVoting() {

    const [token, setToken] = useState(() => localStorage.getItem("token") ?? null);
    const [hasVoted, setHasVoted] = useState(() => localStorage.getItem("hasVoted") === "true");
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [voteConfirmed, setVoteConfirmed] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [votedName, setVotedName] = useState(null);

    useEffect(() => {
        console.log("useEff getToken");
        if (!token) {
            setLoading(true);
            getToken()
                .then(fetchedToken => {
                    console.log(fetchedToken);
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
        if (hasVoted) return (
            <>
                <div className="headerSpacer"></div>
                <h2>Stem uitgebracht!</h2>
                <p>Bedankt voor je stem op <b>{votedName}</b>.</p>
            </>);

        const fetchTopProjects = async () => {
            setLoading(true);
            try {
                const promises = votable.map(id => fetch(`${API_URL}/project/${id}`)
                    .then(res => res.ok ? res.json() : null)
                    .then(data => data?.project || null)
                    .catch(() => null));
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

    async function handleVote() {
        const id = selectedProject?.id;
        if (!token || !id) {
            return;
        }

        setError(null);
        setSubmitting(true);
        try {
            const res = await fetch(`${API_URL}/voting`, {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({token, id})
            });
            if (res.ok) {
                const data = await res.json();
                const backendHasVoted = data.success;
                localStorage.setItem("hasVoted", backendHasVoted.toString());
                setVotedName(selectedProject?.name);
                setHasVoted(true);
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.message || "Fout bij het uitbrengen van je stem.");
            }
        } catch (err) {
            console.error("Error handleVote:", err);
            setError("Netwerkfout. Probeer het opnieuw.");
        } finally {
            setSubmitting(false);
            // setSelectedProject(null);
        }
    }

    if (loading) {
        return <Loading/>;
    }

    if (hasVoted) {
        return (
            <>
                <h2>Stem uitgebracht!</h2>
                <p>Bedankt voor je stem op <b>{selectedProject.name}</b>.</p>
            </>
        );
    }

    return (<>
        <div className="headerSpacer"></div>
        <div className={`${s.ctx} ctx`}>
            <h1>Stem hier!</h1>
            <h2>Kies het project dat jouw stem krijgt.</h2>
            <div className={s.projectsGrid}>
                {projects.map((project) => (<div
                    key={project.id}
                    className={s.projectCard}
                    onClick={() => setSelectedProject(project)}
                >
                    <div className={s.imageWrapper}>
                        <img
                            src={getCloudinaryUrl(project.media?.[0]) ?? getCloudinaryUrl(project.images?.[0]) ?? "/assets/imageCard.png"}
                            alt={project.name}/>
                    </div>

                    <h2>{project.name}</h2>
                </div>))}
            </div>
        </div>
        {selectedProject && (<div className={s.overlay} onClick={() => setSelectedProject(null)}>
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
                {!voteConfirmed ? (<>
                    <h2>{selectedProject.name}</h2>
                    <div className={s.modalImage}>
                        <img
                            src={getCloudinaryUrl(selectedProject.media?.[0]) ?? getCloudinaryUrl(selectedProject.images?.[0]) ?? "/assets/imageCard.png"}
                            alt={selectedProject.name}/>
                    </div>
                    <p>{selectedProject.description}</p>
                    <button
                        className={s.voteButton}
                        onClick={() => setVoteConfirmed(true)}
                    >
                        Stem voor dit project!
                    </button>
                </>) : (<>
                    <h2>Ben je zeker?</h2>
                    <p>
                        Je staat op het punt om te stemmen voor{" "}
                        <b>{selectedProject.name}</b>.
                    </p>
                    <button className={s.voteButton} onClick={handleVote} disabled={submitting}>{submitting ? "bezig..." : "Bevestig stem"}</button>
                </>)}
            </div>
        </div>)}
    </>);
}
