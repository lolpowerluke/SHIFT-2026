import Routes from "./constants/Routes";
import {NavRoutes} from "./NavRoutes.js";

export const FooterRoutes = [
	...NavRoutes,
	{ route: Routes.Privacy, label: "Privacybeleid" },
];
