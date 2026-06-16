import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { runPageIntro } from "./animations";

// Routes where even the intro fade is turned off: the projects list and a
// project's detail page (but NOT the project form).
function animationsDisabled(pathname) {
	const p = pathname.replace(/\/+$/, "") || "/";
	if (p === "/project") return true; // projects list
	if (p.startsWith("/project/") && p !== "/project/form") return true; // project detail
	return false;
}

// Mount this ONCE inside a layout (it renders nothing). It plays a light fade-in
// of the page content (#page-root) on each route change.
//
// To remove the animation: delete this <SiteAnimations /> from the layout and
// delete the whole `components/animation` folder.
export default function SiteAnimations() {
	const { pathname } = useLocation();

	useLayoutEffect(() => {
		if (animationsDisabled(pathname)) return;
		return runPageIntro();
	}, [pathname]);

	return null;
}
