import {Link, NavLink} from "react-router";
import Routes from "../../routes/constants/Routes.js";
import SocialLinks from "../socialLinks/SocialLinks.jsx";
import s from "./Footer.module.css";
import {FooterRoutes} from "../../routes/FooterRoutes.js";

export default function Footer() {
    return (
        <footer>
            <div className={`ctx ${s.ctx}`}>
                <a href="https://www.erasmushogeschool.be/nl/evenementen/shiftfestival" className="linkBtn">
                    Schrijf je nu gratis in
                </a>
                <br/>
                <div className={s.textInfo}>
                    <p>
                        Erasmushogeschool Brussel <br/>
                        Campus Kaai
                        <br/>
                        Nijverheidskaai 170 <br/>
                        1070 Anderlecht
                    </p>
                    <div>
                        <ul>
                            {
                                FooterRoutes.map((link) => (<li key={link.route}>
                                    <NavLink
                                        to={link.route}
                                        className={({isActive}) => `${s.navItem} ${isActive ? s.active : ''}`}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>))
                            }
                        </ul>
                    </div>
                </div>
                <SocialLinks className={s.socialLinks}/>
                <small>
                    Jouw data blijft van jou. Check het{" "}
                    <Link to={Routes.Privacy}>Privacybeleid</Link>.
                </small>
                <small className="footerCopyright">
                    2026 SHIFT — Erasmushogeschool Brussel. <br/>
                    Alle rechten voorbehouden.
                </small>
            </div>
        </footer>
    );
}
