import { Outlet } from "react-router-dom"
import RegFooter from "../components/footer/RegFooter"
import RegHeader from "../components/header/RegHeader"

function RegLayout() {
    return (
        <>
            <RegHeader />
            <Outlet />
            <RegFooter />
        </>
    )
}
export default RegLayout