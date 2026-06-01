import env from "./env.js"
const BASE_URL = env.server.url

async function keepAlive() {
    try {
        const res = await fetch(`${BASE_URL}/health`);
        const msg = await res.text();
        console.log(msg);
    } catch (error) {
        console.log(error);
    }
}

setInterval(keepAlive, 60000);
