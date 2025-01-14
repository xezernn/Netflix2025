import { HiLanguage } from "react-icons/hi2"
import logo from '../../assets/imgs/logo.png'
import { Link, useLocation } from "react-router-dom"

function IntroHeader() {
    const location = useLocation()
    return (
        <header>
            <nav className='w-[96%] xl:max-w-[1400px] mx-auto pt-6 md:pt-2 px-6 flex flex-wrap gap-4  justify-between items-center'>
                <div className='w-[130px] lg:w-[180px]'>
                    <Link to={'/'}>
                        <svg className="w-[18px] md:hidden " focusable="false" viewBox="225 0 552 1000" aria-hidden={true} data-uia="n-logo"><defs><radialGradient id=":R2d6l9kl4l:-a" r="75%" gradientTransform="matrix(.38 0 .5785 1 .02 0)"><stop offset="60%" stopOpacity=".3"></stop><stop offset="90%" stopOpacity=".05"></stop><stop offset="100%" stopOpacity="0"></stop></radialGradient></defs><path d="M225 0v1000c60-8 138-14 198-17V0H225" fill="#b1060e"></path><path d="M579 0v983c71 3 131 9 198 17V0H579" fill="#b1060e"></path><path d="M225 0v200l198 600V557l151 426c76 3 136 9 203 17V800L579 200v240L423 0H225" fill="url(#:R2d6l9kl4l:-a)"></path><path d="M225 0l349 983c76 3 136 9 203 17L423 0H225" fill="#e50914"></path></svg>
                    </Link>
                    <Link to={'/'}>
                        <img src={logo} alt="Netflix logo" className="hidden md:block" />
                    </Link>
                </div>
                <div className='w-[130px] sm:w-[240px] flex justify-between'>
                    <div className='flex relative h-[30px]'>
                        <HiLanguage className='text-white absolute top-2 left-2' />
                        <select className='w-[40px] sm:w-[140px] rounded-full pl-6 bg-[#191919b2] text-white outline-none border-[#dddddd4c] border-[1px]'>
                            <option value="eng">English</option>
                            <option value="ru">Russian</option>
                            <option value="aze">Azerbaijani</option>
                        </select>
                    </div>
                    {location.pathname !== "/login" && (
                        <Link to={"/login"}>
                            <button className='bg-white w-[80px] font-semibold h-[32px] rounded-full hover:bg-[#bbb] transition-all duration-300'>
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            </nav>
        </header >
    )
}
export default IntroHeader