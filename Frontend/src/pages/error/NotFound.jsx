import { Link } from "react-router";
import Routes from "../../routes/constants/Routes";

const NotFound = () => {
    return (
        <>
            <div className="ctx flexCenter headerSpacer">
                <h1>404 - Not Found</h1>
                <p>This is definitely the page you are looking for.</p>
                <Link to={Routes.Root} className="linkBtn">Go to Homepage</Link>
                <img src="/assets/404.webp" alt="404 img" height="300" />
            </div>
        </>
    );
};

export default NotFound;
