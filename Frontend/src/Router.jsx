import { createBrowserRouter } from "react-router";
import PageLayout from "./layouts/PageLayout.jsx";
import BareLayout from "./layouts/BareLayout.jsx";
import SearchLayout from "./layouts/SearchLayout.jsx";
import Countdown from "./pages/countdown/Countdown.jsx";
import Routes from "./routes/constants/Routes.js";
import PrivacyRedirect from "./pages/privacy/PrivacyRedirect.jsx";
import PrivacyEN from "./pages/privacy/pages/PrivacyEN.jsx";
import PrivacyNL from "./pages/privacy/pages/PrivacyNL.jsx";
import Login from "./pages/login/Login.jsx";
import ProjectForm from "./pages/project/ProjectForm.jsx";

// TODO: add actual page elements instead of placeholder strings
const router = createBrowserRouter(
    [
        {
            element: <PageLayout />,
            children: [
                {
                    path: Routes.Privacy, element: <PrivacyRedirect />,
                    children: [
                        { index: true, element: <PrivacyRedirect /> },
                        { path: Routes.privacyEN, element: <PrivacyEN /> },
                        { path: Routes.privacyNL, element: <PrivacyNL /> },
                    ]
                },
                { path: Routes.Root, element: <Countdown /> },
                { path: Routes.Login, element: <Login /> },
                { path: Routes.ProjectForm, element: <ProjectForm /> },
                {
                    element: <SearchLayout />, //this will hold all search logic for the projects
                    children: [
                        { path: "/projects", element: "Projects" },
                    ]
                },
            ]
        },
        {
            element: <BareLayout />, children: [] //just in case, this has no header
        }
    ]
)
export default router;
