import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { ScrollTrigger } from "./gsapInit";
import { runSiteAnimations } from "./animations";

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
		const cleanup = runSiteAnimations();

		return () => {
			cleanup();
			// Drop this route's triggers before the next page sets up its own.
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [pathname]);

	return null;
}
