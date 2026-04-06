import { resolve } from "path";
import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";
import fs from "fs";
import path from "path";

// script built with claude.ai
// add link when sharing works again (in readme too)
function removePagesSegment() {
	return {
		name: "remove pages segment",
		apply: "build",

		transformIndexHtml(html) {
			return html.replaceAll("/pages/", "/");
		},
		writeBundle(options, bundle) {
			const outDir = options.dir || "dist";

			for (const key of Object.keys(bundle)) {
				if (key.startsWith("pages/")) {
					const newKey = key.slice("pages/".length);
					const oldPath = path.join(outDir, key);
					const newPath = path.join(outDir, newKey);

					fs.mkdirSync(path.dirname(newPath), { recursive: true });
					fs.renameSync(oldPath, newPath);
				}
			}

			// Clean up the now-empty pages/ dir
			fs.rmSync(path.join(outDir, "pages"), {
				recursive: true,
				force: true,
			});
		},
	};
}

export default defineConfig({
	plugins: [
		injectHTML({ tagName: "load", sourceAttr: "file" }),
		removePagesSegment(),
	],
	build: {
		outDir: "dist",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				countdown: resolve(__dirname, "pages/countdown/index.html"),
				privacyEN: resolve(__dirname, "pages/privacy/en/index.html"),
				privacyNL: resolve(__dirname, "pages/privacy/nl/index.html"),
				emailConfirm: resolve(__dirname, "pages/confirm/index.html"),
			},
		},
	},
	base: "/",
});
