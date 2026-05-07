const BASE = import.meta.env.DEV ? "/pages" : "";

const path = window.location.pathname;
const isPrivacy = path === `${BASE}/privacy` || path === `${BASE}/privacy/`;

function rerouting() {
	if (path.includes("/confirm/")) return;

	if (!path.endsWith("/")) {
		window.location.replace(path + "/");
	} else if (isPrivacy) {
		const lang = navigator.language.slice(0, 2);
		const supported = ["en", "nl"];
		const target = supported.includes(lang) ? lang : "en";
		window.location.href = `${BASE}/privacy/${target}/`;
	} else {
		window.location.href = `${BASE}/countdown/`;
	}
}

rerouting();
