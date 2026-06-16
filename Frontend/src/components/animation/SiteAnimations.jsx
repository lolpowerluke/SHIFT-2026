import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { ScrollTrigger } from "./gsapInit";
import { runSiteAnimations } from "./animations";

// Routes where animations are turned off. Currently: the projects list and a
// project's detail page (but NOT the project form).
function animationsDisabled(pathname) {
	const p = pathname.replace(/\/+$/, "") || "/";
	if (p === "/project") return true; // projects list
	if (p.startsWith("/project/") && p !== "/project/form") return true; // project detail
	return false;
}

// Mount this ONCE inside a layout (it renders nothing). It re-runs the
// site-wide GSAP animations every time the route changes.
//
// To remove every animation from the site: delete this <SiteAnimations /> from
// the layout and delete the whole `components/animation` folder.
export default function SiteAnimations() {
	const { pathname } = useLocation();

	// useLayoutEffect runs before paint, so the "hidden" start state is applied
	// without a flash of the content first appearing then jumping.
	useLayoutEffect(() => {
		if (animationsDisabled(pathname)) return; // no animations on project pages

		const cleanup = runSiteAnimations();

		return () => {
			cleanup();
			// Drop this route's triggers before the next page sets up its own.
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [pathname]);

	return null;
}
