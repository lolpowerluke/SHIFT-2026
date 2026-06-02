import React from "react";
import {createBrowserRouter} from "react-router";
import PageLayout from "./layouts/PageLayout.jsx";
import BareLayout from "./layouts/BareLayout.jsx";
import SearchLayout from "./layouts/SearchLayout.jsx";
import Countdown from "./components/Countdown.jsx";
import Routes from "./routes/constants/Routes.js";

// TODO: add actual page elements instead of placeholder strings
const router = createBrowserRouter(
    [
        {
            element: <PageLayout/>,
            children: [
                {path: Routes.Privacy, element: "Privacy"},
                {path: Routes.Login3e, element: "Login3e"},
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
                {path: Routes.Root, element: <Countdown/>},
            ]
        }
    ]
)
export default router;