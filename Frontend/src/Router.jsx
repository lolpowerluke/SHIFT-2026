import { createBrowserRouter, Navigate } from "react-router";
import PageLayout from "./layouts/PageLayout.jsx";
import BareLayout from "./layouts/BareLayout.jsx";
import Countdown from "./pages/countdown/Countdown.jsx";
import Routes from "./routes/constants/Routes.js";
import PrivacyRedirect from "./pages/privacy/PrivacyRedirect.jsx";
import PrivacyEN from "./pages/privacy/pages/PrivacyEN.jsx";
import PrivacyNL from "./pages/privacy/pages/PrivacyNL.jsx";
import Login from "./pages/login/Login.jsx";
import Form from "./pages/project/form/Form.jsx";
import List from "./pages/project/list/List.jsx";
import Detail from "./pages/project/detail/Detail.jsx";
import Info from "./pages/info/Info.jsx";
import Awards from "./pages/awards/Awards.jsx";
import NotFound from "./pages/error/NotFound.jsx";

const router = createBrowserRouter([
    {
        element: <PageLayout />,
        children: [
            {
                path: Routes.Privacy,
                element: <PrivacyRedirect />,
                children: [
                    { index: true, element: <PrivacyRedirect /> },
                    { path: Routes.privacyEN, element: <PrivacyEN /> },
                    { path: Routes.privacyNL, element: <PrivacyNL /> },
                ],
            },
            { path: "*", element: <Navigate to={Routes.NotFound} replace /> },
            { path: Routes.Root, element: <Countdown /> },
            { path: Routes.Login, element: <Login /> },
            { path: Routes.ProjectForm, element: <Form /> },
            { path: Routes.ProjectFormOld, element: <Navigate to={Routes.ProjectForm} replace /> },
            { path: Routes.Awards, element: <Awards /> },
            { path: Routes.ProjectenPage, element: <List /> },
            { path: Routes.ProjectenPageOld, element: <Navigate to={Routes.ProjectenPage} replace /> },
            { path: Routes.ProjectenPageDetails, element: <Detail /> },
            { path: Routes.uMoeder, element: "is dik" }, //same as {path: "/uMoeder", element: "isDik"
            { path: Routes.NotFound, element: <NotFound /> },
            { path: Routes.Info, element: <Info /> },

        ],
    },
]);
export default router;
