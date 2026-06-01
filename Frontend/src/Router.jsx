import {createBrowserRouter} from "react-router";
import PageLayout from "./layouts/PageLayout.jsx";
import BareLayout from "./layouts/BareLayout.jsx";

const router = createBrowserRouter(
    [
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