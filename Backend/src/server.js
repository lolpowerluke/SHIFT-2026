import app from "./app.js";
import env from "./utils/env.js";

app.listen(env.server.port, () => {
  console.log(`Shift backend running on port ${env.server.port}`)
})
