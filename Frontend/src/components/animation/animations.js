import { gsap } from "./gsapInit";

// Strict-minimum animation: a single, visible-but-cheap fade-in of the page
// content on each navigation. No scroll triggers, no per-element work, no DOM
// scanning, no MutationObserver — so it costs nothing while scrolling and stays
// smooth even on a slow school network with lots of people on the site at once.
//
// Opacity only (no transform) so it can't create a containing block that would
// shift any `position: fixed` element — it won't break existing pages.
//
// Returns a cleanup function.
export function runPageIntro() {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return () => {};
	}

	const el = document.getElementById("page-root");
	if (!el) return () => {};

	const tween = gsap.from(el, {
		opacity: 0,
		duration: 0.5,
		ease: "power2.out",
		clearProps: "opacity",
	});

	return () => tween.kill();
}
