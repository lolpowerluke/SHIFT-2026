import env from "./env.js"
let BASE_URL = env.server.url
if (env.server.environment == "development") {
    BASE_URL = `${env.server.url}:${env.server.port}`
}

async function keepAlive() {
    try {
        const res = await fetch(`${BASE_URL}/health`);
        const msg = await res.text();
        console.log(msg);
    } catch (error) {
        console.log(error);
    }
}

export {
    keepAlive
}
