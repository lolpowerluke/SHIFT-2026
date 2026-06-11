import { Link } from "react-router";
import Routes from "../../routes/constants/Routes";

const NotFound = () => {
	return (
		<div>
			<h1>404 - Not Found</h1>
			<p>This is the page you are looking for.</p>
			<Link to={Routes.Root}>Go to Homepage</Link>
		</div>
	);
};

export default NotFound;
