import {Link, NavLink} from "react-router";
import { NavRoutes } from "../routes/NavRoutes.js"
import SocialLinks from "./SocialLinks.jsx";
import {useRef} from "react";


export default function Header() {
    const hamburgerRef = useRef();

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
                        className="headerLogo"
                    />
                </Link>
                <div className="nav">
                    <ul className="navList">
                        <li className="navLogo">
                            <img src="/assets/logos/shift_logo.svg" alt="Shift Logo" className="logo"/>
                        </li>
                        <li className="navLinks">
                            <ul>
                                {
                                    NavRoutes.map((link) => (<li key={link.route}>
                                        <NavLink to={link.route} onClick={closeMenu} className="navItem">
                                            {link.label}
                                        </NavLink>
                                    </li>))
                                }
                            </ul>
                        </li>
                        <li className="navSocials">
                            <SocialLinks/>
                        </li>
                    </ul>
                    {/* Code based on JoachimGautama's web2-course-project-front-end-JoachimGautama */}
                    <input type="checkbox" id="hamburgerNav" ref={hamburgerRef}/>
                    <label htmlFor="hamburgerNav">
                        <div className="flexCtx btn">
                            <div className="l1 line"></div>
                            <div className="l2 line"></div>
                            <div className="l3 line"></div>
                        </div>
                    </label>
                </div>
            </div>
        </header>

    )
}