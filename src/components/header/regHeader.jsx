import { Link } from 'react-router-dom'
import logo from '../../assets/imgs/logo.png'

function RegHeader() {
    return (
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
    )
}
export default RegHeader