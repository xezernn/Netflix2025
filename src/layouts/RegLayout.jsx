import { Link, Outlet } from "react-router-dom"
import logo from '../assets/imgs/logo.png'
import { TfiWorld } from "react-icons/tfi"
function RegLayout() {
    return (
        <>
            <header className='border-b-[1px]'>
                <nav className='md:max-w-[1200px] mx-auto px-2 py-3 md:px-6 flex flex-wrap justify-between items-center'>
                    <Link to={'/'}>
                        <div className='w-[90px] sm:w-[200px]'>
                            <img src={logo} alt="Netflix logo" />
                        </div>
                    </Link>
                    <h2 className='font-semibold text-[#2c2c2c] hover:underline cursor-pointer'>Sign In</h2>
                </nav>
            </header>
            <Outlet />
            <footer className="bg-[#f3f3f3]">
                <div className="max-w-[1100px] px-6 mx-auto">
                    <p className="hover:underline py-8 cursor-pointer text-[#747474]">Questions? Contact us.</p>
                    <div className="grid gap-3 grid-cols-2 xs:grid-cols-3 md:grid-cols-4">
                        <div className="flex text-[#747474] text-[.9rem]"><p className="hover:underline cursor-pointer ">FAQ</p></div>
                        <div className="flex text-[#747474] text-[.9rem]"><p className="hover:underline cursor-pointer">Help Center</p></div>
                        <div className="flex text-[#747474] text-[.9rem]"><p className="hover:underline cursor-pointer">Terms of Use</p></div>
                        <div className="flex text-[#747474] text-[.9rem]"><p className="hover:underline cursor-pointer">Privacy</p></div>
                        <div className="flex text-[#747474] text-[.9rem]"><p className="hover:underline cursor-pointer">Cookie Preferences</p></div>
                        <div className="flex text-[#747474] text-[.9rem]"><p className="hover:underline cursor-pointer">Corporate Information</p></div>
                    </div>
                    <div className='relative py-10'>
                        <TfiWorld className='text-[#1c1c1c] absolute top-[55px] left-2' />
                        <select className='h-[45px] w-[140px] pl-6 text-[#333] outline-none border-[#929292] border-[1px]'>
                            <option value="eng">English</option>
                            <option value="ru">Russian</option>
                            <option value="aze">Azerbaijani</option>
                        </select>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default RegLayout