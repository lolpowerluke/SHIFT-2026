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

// A "box": a framed panel/card — has a visible border OR a box-shadow.
function isBox(el) {
	const cs = getComputedStyle(el);
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
		if (isBackgroundMedia(el)) return false;
		return true;
	}
	for (const node of el.childNodes) {
		if (node.nodeType === 3 && node.textContent.trim()) return true;
	}
	return false;
}

/**
 * Animates essentially everything on the page as you scroll, and keeps doing so
 * for content added after load (carousels, project lists, …).
 *
 * Tuned for smooth scrolling on iOS Safari: ScrollTrigger ignores the address
 * bar resize (see gsapInit), only newly-added DOM subtrees are processed (not
 * the whole page), and refreshes are batched.
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
	let processTimer = 0;
	let refreshTimer = 0;
	const pending = [];

	const inExcluded = (el) => el.closest && el.closest(EXCLUDE);

	const scheduleRefresh = () => {
		clearTimeout(refreshTimer);
		refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
	};

	function collect(root) {
		const els = [];
		if (root.nodeType === 1) els.push(root);
		if (root.querySelectorAll) els.push(...root.querySelectorAll("*"));

		const clean = els.filter(
			(el) =>
				el.nodeType === 1 &&
				!processed.has(el) &&
				!SKIP_TAGS.has(el.tagName) &&
				!inExcluded(el),
		);

		const boxesAll = clean.filter(isBox);
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

	// Returns how many elements it set up (0 = nothing new).
	function process(root) {
		let count = 0;
		try {
			const { boxes, leaves } = collect(root);
			const vh = window.innerHeight;
			let nowCount = 0;

			const reveal = (el, from, to, start) => {
				if (processed.has(el)) return;
				processed.add(el);
				gsap.set(el, from);
				hidden.push(el);
				count++;

				const top = el.getBoundingClientRect().top;
				if (top < vh * 0.92) {
					gsap.to(el, {
						...to,
						delay: Math.min(nowCount, 12) * 0.04,
						overwrite: true,
						clearProps: "transform",
					});
					nowCount++;
				} else {
					triggers.push(
						ScrollTrigger.create({
							trigger: el,
							start,
							once: true,
							onEnter: () =>
								gsap.to(el, { ...to, overwrite: true, clearProps: "transform" }),
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
		} catch (err) {
			console.error("SiteAnimations process error:", err);
		}
		return count;
	}

	// Process only the subtrees that were just added to the DOM.
	function flushPending() {
		let created = 0;
		const nodes = pending.splice(0);
		for (const node of nodes) {
			if (node.nodeType === 1 && node.isConnected && !inExcluded(node)) {
				created += process(node);
			}
		}
		if (created) scheduleRefresh();
	}

	try {
		// Initial pass (runs before paint via useLayoutEffect → no flash).
		process(document.body);
		ScrollTrigger.refresh();

		// Re-run only for content added later (fetched lists, carousels…).
		observer = new MutationObserver((mutations) => {
			let added = false;
			for (const m of mutations) {
				for (const n of m.addedNodes) {
					if (n.nodeType === 1) {
						pending.push(n);
						added = true;
					}
				}
			}
			if (added) {
				clearTimeout(processTimer);
				processTimer = setTimeout(flushPending, 150);
			}
		});
		observer.observe(document.body, { childList: true, subtree: true });

		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener("load", onLoad);
		const lateRefresh = setTimeout(onLoad, 600);

		return () => {
			if (observer) observer.disconnect();
			clearTimeout(processTimer);
			clearTimeout(refreshTimer);
			clearTimeout(lateRefresh);
			window.removeEventListener("load", onLoad);
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
