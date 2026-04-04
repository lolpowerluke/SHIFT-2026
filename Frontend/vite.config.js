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
				main: resolve(__dirname, "index.html"),
				countdown: resolve(__dirname, "pages/countdown/index.html"),
				privacyEN: resolve(__dirname, "pages/privacy/en/index.html"),
				privacyNL: resolve(__dirname, "pages/privacy/nl/index.html"),
				emailConfirm: resolve(
					__dirname,
					"pages/email_confirmation/index.html",
				),
			},
		},
	},
	base: "/",
});
