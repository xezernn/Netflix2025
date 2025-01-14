import { Outlet } from "react-router-dom"
import IntroHeader from "../components/header/IntroHeader"
import IntroFooter from "../components/footer/IntroFooter"

function IntroLayout() {
    return (
        <>
            <IntroHeader />
            <Outlet />
            <IntroFooter />
        </>
    )
}
export default IntroLayout