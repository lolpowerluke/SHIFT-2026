import {Link} from "react-router";
import Routes from "../../routes/constants/Routes";

const NotFound = () => {
    return (
        <>
            <div className="ctx flexCenter">
                <h1>404 - Not Found</h1>
                <p>This is not the page you are looking for.</p>
                <Link to={Routes.Root} className="linkBtn">Go to Homepage</Link>
            </div>
        </>
    );
};

export default NotFound;