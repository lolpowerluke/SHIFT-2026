import { resolve, dirname } from "path";
import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [injectHTML({ tagName: "load", sourceAttr: "file" })],
	build: {
		outDir: "dist",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				countdown: resolve(__dirname, "pages/countdown/countdown.html"),
			},
		},
	},
	base: "/",
});
