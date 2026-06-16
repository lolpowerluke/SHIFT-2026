import { Outlet } from "react-router"
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function PageLayout() {
    return (
        <>
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
