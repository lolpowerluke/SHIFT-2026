import { Outlet } from "react-router"
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";

export default function PageLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
