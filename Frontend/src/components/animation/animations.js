import { gsap, ScrollTrigger } from "./gsapInit";

// Chrome / background layers that should stay put. `[class*="heroContent"]` is
// the homepage's full-screen background layer (video + poster + gradient).
const EXCLUDE = 'header, footer, nav, [class*="heroContent"]';

const SKIP_TAGS = new Set([
	"SCRIPT", "STYLE", "HEAD", "META", "LINK", "TITLE", "NOSCRIPT",
	"HTML", "BODY", "BR", "HR", "OPTION", "VIDEO", "SOURCE",
]);

const MEDIA_TAGS = new Set(["IMG", "SVG", "IFRAME", "CANVAS", "PICTURE"]);

// Tiny decorative icons are skipped so things don't feel busy.
function keepImage(el) {
	if (el.tagName !== "IMG") return true;
	const w = el.getBoundingClientRect().width;
	return w === 0 || w >= 64;
}

// Full-bleed media (hero background image/video) — should never animate.
function isBackgroundMedia(el) {
	const r = el.getBoundingClientRect();
	return r.width >= window.innerWidth * 0.9 && r.height >= window.innerHeight * 0.7;
}

// A "box": a framed panel/card — has a visible border OR a box-shadow. This is
// what tells real cards/frames apart from full-bleed page backgrounds (which
// only have a background colour/image and shouldn't animate).
function isBox(el) {
	const cs = getComputedStyle(el);
	// Skip full-bleed photo backgrounds — a background image should never animate.
	if (cs.backgroundImage && cs.backgroundImage !== "none") return false;
	const border =
		(parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== "none") ||
		(parseFloat(cs.borderRightWidth) > 0 && cs.borderRightStyle !== "none") ||
		(parseFloat(cs.borderBottomWidth) > 0 && cs.borderBottomStyle !== "none") ||
		(parseFloat(cs.borderLeftWidth) > 0 && cs.borderLeftStyle !== "none");
	return border || (cs.boxShadow && cs.boxShadow !== "none");
}

// Worth animating on its own: it's media, or it holds text directly.
function isAnimatable(el) {
	const tag = el.tagName.toUpperCase();
	if (SKIP_TAGS.has(tag)) return false;
	if (MEDIA_TAGS.has(tag)) {
		if (tag === "IMG" && !keepImage(el)) return false;
		if (isBackgroundMedia(el)) return false; // full-bleed hero background
		return true;
	}
	for (const node of el.childNodes) {
		if (node.nodeType === 3 && node.textContent.trim()) return true;
	}
	return false;
}

/**
 * Animates essentially everything on the page as you scroll, and keeps doing so
 * for content that is fetched / added after load (carousels, project lists, …).
 *
 *   - Boxes / framed panels (border or shadow): rise + fade + soft scale.
 *   - Every other text element / image / media: gentle fade up.
 *
 * Returns a cleanup function.
 */
export function runSiteAnimations() {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return () => {};
	}

	const processed = new WeakSet();
	const triggers = [];
	const hidden = [];
	let observer = null;
	let debounce = 0;

	const inExcluded = (el) => el.closest && el.closest(EXCLUDE);

	function collect(root) {
		const els = [];
		if (root.nodeType === 1) els.push(root);
		if (root.querySelectorAll) els.push(...root.querySelectorAll("*"));

		const clean = els.filter(
			(el) =>
				el.nodeType === 1 && !SKIP_TAGS.has(el.tagName) && !inExcluded(el),
		);

		const boxesAll = clean.filter(isBox);
		// Only the outermost box of each nested group.
		const boxes = boxesAll.filter(
			(b) => !boxesAll.some((o) => o !== b && o.contains(b)),
		);
		const insideBox = (el) => boxes.some((b) => b === el || b.contains(el));

		const leavesAll = clean.filter((el) => isAnimatable(el) && !insideBox(el));
		const leaves = leavesAll.filter(
			(el) => !leavesAll.some((o) => o !== el && o.contains(el)),
		);

		return { boxes, leaves };
	}

	function process(root) {
		try {
			const { boxes, leaves } = collect(root);
			const vh = window.innerHeight;
			let nowCount = 0;

			const reveal = (el, from, to, start) => {
				if (processed.has(el)) return;
				processed.add(el);
				gsap.set(el, from);
				hidden.push(el);

				const top = el.getBoundingClientRect().top;
				if (top < vh * 0.92) {
					// already in view → reveal now, lightly staggered
					gsap.to(el, {
						...to,
						delay: Math.min(nowCount, 12) * 0.04,
						overwrite: true,
						clearProps: "transform",
					});
					nowCount++;
				} else {
					// below the fold → reveal when scrolled to
					triggers.push(
						ScrollTrigger.create({
							trigger: el,
							start,
							once: true,
							onEnter: () =>
								gsap.to(el, {
									...to,
									overwrite: true,
									clearProps: "transform",
								}),
						}),
					);
				}
			};

			boxes.forEach((el) =>
				reveal(
					el,
					{ opacity: 0, y: 34, scale: 0.97 },
					{ opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
					"top 88%",
				),
			);
			leaves.forEach((el) =>
				reveal(
					el,
					{ opacity: 0, y: 18 },
					{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
					"top 92%",
				),
			);

			ScrollTrigger.refresh();
		} catch (err) {
			console.error("SiteAnimations process error:", err);
		}
	}

	const schedule = () => {
		clearTimeout(debounce);
		debounce = setTimeout(() => process(document.body), 120);
	};

	try {
		// Initial pass (runs before paint via useLayoutEffect → no flash).
		process(document.body);

		// Re-run for content added later (fetched lists, carousels, etc.).
		observer = new MutationObserver((mutations) => {
			for (const m of mutations) {
				if (m.addedNodes && m.addedNodes.length) {
					schedule();
					break;
				}
			}
		});
		observer.observe(document.body, { childList: true, subtree: true });

		const refresh = () => ScrollTrigger.refresh();
		window.addEventListener("load", refresh);
		const lateRefresh = setTimeout(refresh, 600);

		return () => {
			if (observer) observer.disconnect();
			clearTimeout(debounce);
			clearTimeout(lateRefresh);
			window.removeEventListener("load", refresh);
			triggers.forEach((t) => t.kill && t.kill());
			gsap.set(hidden, { clearProps: "all" });
		};
	} catch (err) {
		console.error("SiteAnimations error:", err);
		if (observer) observer.disconnect();
		triggers.forEach((t) => t.kill && t.kill());
		gsap.set(hidden, { clearProps: "all" });
		return () => {};
	}
}
