import "./css/style.css";
import {RouterProvider} from "react-router";
import router from "./Router.jsx";

function App() {
    return <RouterProvider router={router}/>;
}

export default App;