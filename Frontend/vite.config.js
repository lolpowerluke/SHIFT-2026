import { resolve } from "path";
import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
	plugins: [injectHTML({ tagName: "load", sourceAttr: "file" })],
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
