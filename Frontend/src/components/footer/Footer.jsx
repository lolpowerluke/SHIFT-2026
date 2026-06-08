import { Link } from "react-router";
import Routes from "../../routes/constants/Routes.js";
import SocialLinks from "../socialLinks/SocialLinks.jsx";
import s from "./Footer.module.css";

export default function Footer() {
	return (
		<footer>
			<div className={`ctx ${s.ctx}`}>
				<small>
					Jouw data blijft van jou. Check het{" "}
					<Link to={Routes.Privacy}>Privacybeleid</Link>.
				</small>
				<hr className={s.divider} />
				<div className={s.text_info}>
					<p>
						Erasmushogeschool Brussel <br />
						Campus Kaai
						<br />
						Nijverheidskaai 170 <br />
						1070 Anderlecht
					</p>
				</div>
				<SocialLinks className={s.socialLinks} />
				<small className="footerCopyright">
					2026 SHIFT — Erasmushogeschool Brussel. <br />
					Alle rechten voorbehouden.
				</small>
			</div>
		</footer>
	);
}
