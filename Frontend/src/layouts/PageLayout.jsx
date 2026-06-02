import React from "react";
import {Outlet} from "react-router"
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function PageLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}