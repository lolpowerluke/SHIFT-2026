import React from "react";
import {SearchProvider} from "../contexts/SearchContext.jsx";
import {Outlet} from "react-router";

export default function SearchLayout() {
    return (
        <>
            <SearchProvider>
                <Outlet/>
            </SearchProvider>
        </>)
}