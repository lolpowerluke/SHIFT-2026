import { resolve } from "path";
import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
	plugins: [injectHTML({ tagName: "load", sourceAttr: "file" })],
	build: {
		outdir: "dist",
		rollupOptions: {
			input: {
				awards: resolve(__dirname, "awards/awards.html"),
			},
		},
	},
	base: "/pages",
});
