import {StrictMode} from "react"
import reactDOM from "react-dom/client"
import "./css/style.css"
import Router from "./Router.jsx";
import {RouterProvider} from "react-router";

reactDOM.render(<Router/>, document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)