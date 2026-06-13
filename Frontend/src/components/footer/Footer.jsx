import { Link, NavLink } from "react-router";
import Routes from "../../routes/constants/Routes.js";
import SocialLinks from "../socialLinks/SocialLinks.jsx";
import s from "./Footer.module.css";
import { FooterRoutes } from "../../routes/FooterRoutes.js";

export default function Footer() {
	return (
		<footer>
			<div className={`${s.ctx}`}>
				<div className={s.footerLogo}>
					<img
						src="../../assets/logos/shift_logo.svg"
						id={s.heroLogo}
						fetchPriority="high"
						alt="SHIFT Logo"
					/>
				</div>
				<div className={s.textInfo}>
					<div>
						<ul>
							{FooterRoutes.map((link) => (
								<li key={link.route}>
									<NavLink
										to={link.route}
										className={({ isActive }) =>
											`${s.navItem} ${isActive ? s.active : ""}`
										}
									>
										{link.label}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
					<p>
						Erasmushogeschool Brussel
						<br />
						Campus Kaai
						<br />
						Nijverheidskaai 170
						<br />
						1070 Anderlecht
					</p>
				</div>
				<div className={s.footerSection2}>
					<a
						href="https://www.erasmushogeschool.be/nl/evenementen/shiftfestival"
						className="linkBtn blueBtn"
						target="_blank"
						rel="noreferrer"
					>
						Schrijf je nu gratis in
					</a>
					<SocialLinks className={s.socialLinks} />
				</div>
				<small className={s.footerCopyright}>
					Jouw data blijft van jou. Check het{" "}
					<Link to={"https://www.erasmushogeschool.be/nl/privacyverklaring"}>Privacybeleid</Link>. 2026 SHIFT —
					Erasmushogeschool Brussel. <br />
					Alle rechten voorbehouden.
				</small>
			</div>
		</footer>
	);
}
