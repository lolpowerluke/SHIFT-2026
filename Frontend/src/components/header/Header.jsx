import { Link, NavLink } from "react-router";
import { NavRoutes } from "../../routes/NavRoutes.js"
import SocialLinks from "../socialLinks/SocialLinks.jsx";
import { useRef } from "react";
import { useScrolled } from "../../hooks/useScrolled.js";
import s from "./Header.module.css";


export default function Header() {
    const hamburgerRef = useRef();
    const scrolled = useScrolled(80)

    const closeMenu = () => {
        if (hamburgerRef.current) {
            hamburgerRef.current.checked = false;
        }
    }

    return (
        <header>
            <script type="module" src="/src/js/language.js"></script>
            <div className="ctx flexSpaceBetween">
                <Link to="/" onClick={closeMenu}>
                    <img
                        src="/favicon/shift_icon.svg"
                        alt="Shift Icon"
                        className={`${s.headerLogo} ${!scrolled ? s.hide : ""}`}
                    />
                </Link>
                <div className={s.nav}>
                    <ul className={s.navList}>
                        <li className={s.navLogo}>
                            <img src="/assets/logos/shift_logo.svg" alt="Shift Logo" className={s.logo} />
                        </li>
                        <li className={s.navLinks}>
                            <ul>
                                {
                                    NavRoutes.map((link) => (<li key={link.route}>
                                        <NavLink to={link.route} onClick={closeMenu} className={s.navItem}>
                                            {link.label}
                                        </NavLink>
                                    </li>))
                                }
                            </ul>
                        </li>
                        <li className={s.navFooter}>
                            <p><span>SHIFT FESTIVAL</span> - het afstudeerevent van Multimedia & Creatieve Technologie studenten.</p>
                            <SocialLinks className={s.socialLinks} />
                        </li>
                    </ul>
                    {/* Code based on JoachimGautama's web2-course-project-front-end-JoachimGautama */}
                    <input type="checkbox" id={s.hamburgerNav} ref={hamburgerRef} />
                    <label htmlFor={s.hamburgerNav}>
                        <div className="flexCtx btn">
                            <div className={`${s.l1} ${s.line}`}></div>
                            <div className={`${s.l2} ${s.line}`}></div>
                            <div className={`${s.l3} ${s.line}`}></div>
                        </div>
                    </label>
                </div>
            </div>
        </header>
    )
}
