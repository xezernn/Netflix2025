import { Outlet, useLocation } from "react-router-dom"
import AccHeader from "../components/header/AccHeader"
import { useEffect, useState } from "react"
import AccFooter from "../components/footer/AccFooter"

function AccLayout() {
    const location = useLocation()
    const isHomePage = location.pathname === "/browse"
    const [showHeader, setShowHeader] = useState(true)
    const [showFooter, setShowFooter] = useState(true)
    useEffect(() => {
        if (location.pathname === "/video") {
            setShowHeader(false)
            setShowFooter(false)
        } else {
            setShowHeader(true)
            setShowFooter(true)
        }
    }, [location])
    return (
        <>
            <AccHeader showHeader={showHeader} bgColor={isHomePage ? "" : "bg-[#141414]"} />
            <Outlet />
            <AccFooter showFooter={showFooter} translateX={isHomePage ? "xs:translate-y-[600px]" : ""} />
        </>
    )
}
export default AccLayout