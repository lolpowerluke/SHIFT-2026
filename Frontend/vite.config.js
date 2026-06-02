import react from "react";
import {resolve} from "path";
import {defineConfig} from "vite";
import injectHTML from "vite-plugin-html-inject";


export default defineConfig({
    plugins: [
        react(),
        injectHTML({tagName: "load", sourceAttr: "file"}),
    ],
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                input: resolve(__dirname, "index.html"),
            },
        },
    },
    base: "/",
});
