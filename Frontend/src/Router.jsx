import {createBrowserRouter} from "react-router";
import PageLayout from "./layouts/PageLayout.jsx";
import BareLayout from "./layouts/BareLayout.jsx";
import SearchLayout from "./layouts/SearchLayout.jsx";

// TODO: add actual page elements instead of placeholder strings
const router = createBrowserRouter(
    [
        {
            element: <PageLayout/>,
            children: [
                {path: Routes.Home, element: "Home"},
                {path: Routes.Privacy, element: "Privacy"},
                {
                    element: <SearchLayout/>,
                    children: [
                        {path: "/projects", element: "Projects"},
                    ]
                },
            ]
        },
        {
            element: <BareLayout/>, children: [
                {path: Routes.CountDown, element: "CountDown"},
            ]
        }
    ]
)
export default router;