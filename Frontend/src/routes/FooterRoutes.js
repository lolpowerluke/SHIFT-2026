import Routes from "./constants/Routes";
import {NavRoutes} from "./NavRoutes.js";

export const FooterRoutes = [
	...NavRoutes,
	{ route: "https://www.erasmushogeschool.be/nl/privacyverklaring", label: "Privacybeleid", external: true },
];
