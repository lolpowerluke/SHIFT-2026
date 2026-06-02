import {NavLink} from "react-router";
import {NavRoutes} from "../routes/constants/NavRoutes.js";


export default function Header() {
    return (
        <header>
            <script type="module" src="/src/js/language.js"></script>
            <div className="ctx flexSpaceBetween">
                <a href="/pages/countdown/">
                    <img
                        src="/favicon/shift_icon.svg"
                        width="90"
                        alt="Shift Icon"
                        className="headerLogo"
                    />
                </a>
                <div className="nav">
                    <ul>
                        {
                            NavRoutes.map((link) => <NavLink key={link.route} to={link.route}>${link.label}</NavLink>)
                        }
                    </ul>
                // <!-- Code based on JoachimGautama's web2-course-project-front-end-JoachimGautama -->
                    <input type="checkbox" id="hamburgerNav"/>
                    <label htmlFor="hamburgerNav">
                        <div className="l1 line"></div>
                        <div className="l2 line"></div>
                        <div className="l3 line"></div>
                    </label>
                </div>
            </div>
        </header>

    )
}