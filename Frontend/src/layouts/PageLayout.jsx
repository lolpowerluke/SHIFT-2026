import { Outlet } from "react-router"

export default function PageLayout() {
    return (
        <>
            <load file="../../htmlComponents/header.fragment.html"/>
            <Outlet />
            <load file="../../htmlComponents/footer.fragment.html"/>
        </>
    )
}