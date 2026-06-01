import {createBrowserRouter} from "react-router";
import PageLayout from "./layouts/PageLayout.jsx";
import BareLayout from "./layouts/BareLayout.jsx";
import SearchLayout from "./layouts/SearchLayout.jsx";

const router = createBrowserRouter(
    [
        {
            element: <SearchLayout/>,
            children: [
                {path: "/projects", element: "Projects"},
            ]
        },
        {
            element: <PageLayout/>,
            children: [
                {path: Routes.Home, element: "Home"},
                {path: Routes.Privacy, element: "Privacy"},
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