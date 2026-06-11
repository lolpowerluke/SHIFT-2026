import { Link, NavLink, useLocation } from "react-router";
import { NavRoutes } from "../../routes/NavRoutes.js";
import SocialLinks from "../socialLinks/SocialLinks.jsx";
import {useEffect, useRef, useState} from "react";
import { useScrolled } from "../../hooks/useScrolled.js";
import s from "./Header.module.css";
import Routes from "../../routes/constants/Routes.js";

export default function Header() {
	const [pageShort, setPageShort] = useState(false)
	const hamburgerRef = useRef();
	const scrolled = useScrolled(80);
	const navLength = NavRoutes.length;
	const pathname = useLocation();

	const closeMenu = () => {
		if (hamburgerRef.current) {
			hamburgerRef.current.checked = false;
			scrollTo(top)
		}
	};

	useEffect(() => {
		function check() {
			setPageShort(document.body.scrollHeight <= window.innerHeight * 1.01);
		}

		setTimeout(check, 0);
		window.addEventListener('resize', check);

		return () => window.removeEventListener('resize', check);
	}, [pathname]);

	return (
		<header>
			<script type="module" src="/src/js/language.js"></script>
			<div className="ctx flexSpaceBetween">
				<Link to={`${Routes.Root}`} onClick={closeMenu}>
					<img
						src="/favicon/shift_icon.svg"
						alt="Shift Icon"
						className={`${s.headerLogo} ${!scrolled && !pageShort ? s.hide : ""}`}
					/>
				</Link>
				<div className={`${s.nav} ${navLength <= 1 ? "hideThisSht" : ""}`}>
					<ul className={s.navList}>
						<ul className={s.orientationSwap}>
							<li className={s.navLogo}>
								<img
									src="/assets/logos/shift_logo.svg"
									alt="SHIFT Logo"
									className={s.logo}
								/>
							</li>
							<li className={s.navLinks}>
								<ul>
									{NavRoutes.map((link) => (
										<li key={link.route}>
											<NavLink
												to={link.route}
												onClick={closeMenu}
												className={({ isActive }) =>
													`${s.navItem} ${isActive ? s.active : ""}`
												}
											>
												{link.label}
											</NavLink>
										</li>
									))}
								</ul>
							</li>
						</ul>
						<li className={s.navFooter}>
							<p>
								<span>SHIFT FESTIVAL</span> - het afstudeerevent van <br />
								Multimedia & Creatieve Technologie studenten.
							</p>
							<SocialLinks className={s.socialLinks} />
						</li>
					</ul>
					{/* Code based on JoachimGautama's web2-course-project-front-end-JoachimGautama */}
					<input type="checkbox" id={s.hamburgerNav} ref={hamburgerRef} />
					<label htmlFor={s.hamburgerNav}>
						<div className={`${s.flexCtx} btn`}>
							<div className={`${s.l1} ${s.line}`}></div>
							<div className={`${s.l2} ${s.line}`}></div>
							<div className={`${s.l3} ${s.line}`}></div>
						</div>
					</label>
				</div>
			</div>
		</header>
	);
}
