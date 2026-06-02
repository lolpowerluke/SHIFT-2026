import React from "react";
import {createBrowserRouter} from "react-router";
import PageLayout from "./layouts/PageLayout.jsx";
import BareLayout from "./layouts/BareLayout.jsx";
import SearchLayout from "./layouts/SearchLayout.jsx";
import Countdown from "./pages/countdown/Countdown.jsx";
import Routes from "./routes/constants/Routes.js";
import PrivacyRedirect from "./pages/privacy/PrivacyRedirect.jsx";
import PrivacyEN from "./pages/privacy/pages/PrivacyEN.jsx";
import PrivacyNL from "./pages/privacy/pages/PrivacyNL.jsx";

// TODO: add actual page elements instead of placeholder strings
const router = createBrowserRouter(
    [
        {
            element: <PageLayout/>,
            children: [
                {path: Routes.Privacy, element: <PrivacyRedirect/>,
                children: [
                    {index: true, element: <PrivacyRedirect/>},
                    {path: Routes.privacyEN, element: <PrivacyEN/>},
                    {path: Routes.privacyNL, element: <PrivacyNL/>},
                ]},
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