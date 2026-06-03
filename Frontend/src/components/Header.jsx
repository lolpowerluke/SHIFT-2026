import {Link, NavLink} from "react-router";
import {NavRoutes} from "../routes/constants/NavRoutes.js";


export default function Header() {
    return (
        <header>
            <script type="module" src="/src/js/language.js"></script>
            <div className="ctx flexSpaceBetween">
                <Link to="/">
                    <img
                        src="/favicon/shift_icon.svg"
                        alt="Shift Icon"
                        className="headerLogo"
                    />
                </Link>
                <div className="nav">
                    <ul>
                        {
                            NavRoutes.map((link) => <NavLink key={link.route} to={link.route}>
                                <li>{link.label}</li>
                            </NavLink>)
                        }
                    </ul>
                    {/* Code based on JoachimGautama's web2-course-project-front-end-JoachimGautama */}
                    <input type="checkbox" id="hamburgerNav"/>
                    <label htmlFor="hamburgerNav">
                        <div className="flexCtx">
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