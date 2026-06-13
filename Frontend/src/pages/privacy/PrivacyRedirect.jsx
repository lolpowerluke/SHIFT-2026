import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";

export default function PrivacyRedirect() {
    const navigate = useNavigate();
    const lang = navigator.language.startsWith("nl") ? "/nl" : "/en";

    useEffect(() => {
        navigate(`/privacy/${lang}`, {replace: true});
    }, [navigate]);

    return <Outlet/>
}