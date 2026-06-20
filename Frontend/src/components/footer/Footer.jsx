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
						src="/assets/logos/shift_logo.svg"
						id={s.heroLogo}
						fetchPriority="high"
						alt="SHIFT Logo"
						loading="lazy"
					/>
				</div>
				<div className={s.textInfo}>
					<div>
						<ul>
							{FooterRoutes.map((link) => (
								<li key={link.route}>
									{link.external ? (
										<a
											href={link.route}
											target="_blank"
											rel="noopener noreferrer"
											className={s.navItem}
										>
											{link.label}
										</a>
									) : (
										<NavLink
											to={link.route}
											className={({ isActive }) =>
												`${s.navItem} ${isActive ? s.active : ""}`
											}
										>
											{link.label}
										</NavLink>
									)}
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
						href="/project"
						className="linkBtn blueBtn"
						rel="noreferrer"
					>
						Ontdek alle projecten
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
