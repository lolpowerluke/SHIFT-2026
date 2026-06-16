import {useEffect, useState} from "react";

const API_URL = import.meta.env.VITE_API_URL

export default function LiveVoting() {
    // check if token exists in localstorage
    // if not > GET /voting/token
    // > save token to localstorage
    // select vote
    // > POST /voting
    // expects body: {token, id}
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [hasVoted, setHasVoted] = useState(() => localStorage.getItem("hasVoted"));

    async function getToken() {
        const res = await fetch(`${API_URL}/voting/token`);
        const {token} = await res.json();
        return token
    }

    useEffect(() => {
        if (!token) getToken().then(token => {
            localStorage.setItem("token", token);
            setToken(token);
        });
    })

    return (
        <>
            TODO
        </>
    )
}