import React from "react";
import { Outlet } from "react-router"
import Header from "../components/Header.jsx";

export default function PageLayout() {
    return (
        <>
            <Header/>
            <Outlet />
            <load file="../../htmlComponents/footer.fragment.html"/>
        </>
    )
}