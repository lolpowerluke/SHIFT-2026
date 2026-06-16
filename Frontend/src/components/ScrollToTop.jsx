import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

// Stop the browser from restoring the previous scroll position on back/forward;
// we control scrolling ourselves below.
if (typeof history !== "undefined" && "scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}

// Instant jump to the top, bypassing the global `scroll-behavior: smooth`
// (otherwise this reset would animate a scroll up the page).
function jumpToTop() {
	const doc = document.documentElement;
	const body = document.body;
	const prevDoc = doc.style.scrollBehavior;
	const prevBody = body.style.scrollBehavior;
	doc.style.scrollBehavior = "auto";
	body.style.scrollBehavior = "auto";

	window.scrollTo(0, 0);
	doc.scrollTop = 0;
	body.scrollTop = 0;

	doc.style.scrollBehavior = prevDoc;
	body.style.scrollBehavior = prevBody;
}

// Resets scroll to the top whenever the route (pathname) changes. SPA
// navigations keep the previous scroll position by default, which can drop you
// at the bottom of a freshly-opened page. In-page #anchor links are left alone.
export default function ScrollToTop() {
	const { pathname, hash } = useLocation();

	useLayoutEffect(() => {
		if (hash) return; // let the browser scroll to the #anchor target

		jumpToTop();
		// Run again next frame to override anything that scrolls after layout
		// settles (e.g. ScrollTrigger.refresh, async content).
		const raf = requestAnimationFrame(jumpToTop);
		return () => cancelAnimationFrame(raf);
	}, [pathname, hash]);

	return null;
}
