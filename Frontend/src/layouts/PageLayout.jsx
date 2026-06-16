import { Outlet } from "react-router"
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import { SiteAnimations } from "../components/animation"; // GSAP — remove this line + the components/animation folder to disable all animations

export default function PageLayout() {
    return (
        <>
            <SiteAnimations />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
