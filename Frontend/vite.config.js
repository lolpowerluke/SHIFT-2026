import { resolve } from "path";
import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
	plugins: [injectHTML({ tagName: "load", sourceAttr: "file" })],
	server: {
		proxy: {
			"^/$": {
				target: "http://localhost:5173",
				rewrite: () => "./pages/countdown/index.html",
			},
		},
	},
	build: {
		outDir: "dist",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				countdown: resolve(__dirname, "pages/countdown/index.html"),
			},
		},
	},
	base: "/",
});
