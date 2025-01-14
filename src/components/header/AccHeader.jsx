import { BiSolidVideos } from 'react-icons/bi'
import logo from '../../assets/imgs/logo.png'
import { FaCaretDown, FaRegBell } from 'react-icons/fa'
import moneyH from '../../assets/imgs/moneyH.jpg'
import avatarImg from '../../assets/imgs/avatar.jpg'
import ringb from '../../assets/imgs/ringb.png'
import { FaChromecast } from 'react-icons/fa6'
import { HiMiniHome } from 'react-icons/hi2'
import { IoPersonOutline, IoSearch, IoSearchSharp } from 'react-icons/io5'
import { MdOutlineSaveAlt } from 'react-icons/md'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { GrEdit } from 'react-icons/gr'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { PROFILES } from '../../context/ProfileContext'
import Genres from '../main/account/Genres'
import { DATA, TOPMOVIES, TOPTV } from '../../context/DataContext'

function AccHeader({ bgColor, showHeader }) {
    const { profiles, selectedProfile, setSelectedProfile } = useContext(PROFILES)
    const { data } = useContext(DATA)
    const { topM } = useContext(TOPMOVIES)
    const { topTv } = useContext(TOPTV)

    const [scroll, setScroll] = useState(0)
    const [onRingBell, setOnRingBell] = useState(false)
    const [onProfile, setOnProfile] = useState(false)
    const [menu, setMenu] = useState(false)
    const [search, setSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [categMenu, setCategMenu] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    function openList() {
        setMenu(!menu)
    }
    function searchBar() {
        setSearch(!search)
    }
    function startSearch(e) {
        const val = e.target.value
        setSearchTerm(val)
        if (val) {
            navigate('/searched', { state: { searchTerm: val } })
        } else {
            navigate('/browse')
        }
    }
    function handleMobileSearch() {
        navigate('/searched')
    }

    const handleProfileClick = (imageUrl) => {
        setSelectedProfile(imageUrl)
    }

    function toggleCateg() {
        setCategMenu(!categMenu)
    }

    const header = decodeURIComponent(window.location.pathname.split('/').filter(Boolean)[0])

    let selectedData = []
    if (header === 'Movies') {
        selectedData = topM
    } else if (header === 'TV Shows') {
        selectedData = topTv
    } else {
        selectedData = data
    }
    return (
        <header>
            {showHeader && (
                <>
                    <div
                        className={`hidden xs:flex h-[70px] fixed z-[65] top-0 w-full ${bgColor} bg-gradient-to-b from-[#060606] to-transparent  transition-all duration-500 ${scroll > 5 ? 'bg-[#141414]' : ''
                            }`}>
                        <div className='max-w-[1450px] w-full mx-auto  px-8 pt-2 flex justify-between items-center'>
                            <div className='flex gap-3'>
                                <Link to={'/browse'} className='max-w-[130px]'>
                                    <img src={logo} alt="logo" />
                                </Link>
                                <div onClick={openList} className='flex relative justify-center cursor-pointer gap-2 items-center text-white lg:hidden'>
                                    Browse <FaCaretDown />
                                    {menu &&
                                        <ul className='absolute top-[60px] flex gap-5 flex-col items-center bg-[#000000cb] border-t-2 border-white w-[250px] py-[20px]'>
                                            <Link to={'/browse'}>Home</Link>
                                            <Link to={'/TV Shows'}>Tv Shows
                                            </Link>
                                            <Link to={'/movies'}>Movies
                                            </Link>
                                            <Link to={'/latest'}>Latest
                                            </Link>
                                            <Link to={'/myList'}>My List
                                            </Link>
                                        </ul>
                                    }
                                </div>
                                <ul className=' hidden lg:flex justify-center items-center text-white gap-4'>
                                    <Link to={'/browse'}>Home
                                    </Link>
                                    <Link to={'/TV Shows'}>Tv Shows
                                    </Link>
                                    <Link to={'/Movies'}>Movies
                                    </Link>
                                    <Link to={'/latest'}>Latest
                                    </Link>
                                    <Link to={'/myList'}>My List
                                    </Link>
                                </ul>
                            </div>
                            <div className='flex items-center text-white ml-2 text-2xl gap-4'>
                                <div className={`${search ? 'w-[290px] bg-[#000000be] border pl-2 sm:static absolute top-[70px] right-[180px]' : ' justify-center w-[40px]'} h-[40px] sm:width sm:duration-300 ease-in-out flex items-center`}>
                                    <IoSearchSharp onClick={searchBar} />
                                    <input value={searchTerm} onChange={startSearch}
                                        placeholder='Titles ...' type="text" className={`${search ? 'flex' : 'hidden'} outline-none bg-transparent text-sm pl-3`} />
                                </div>
                                <div className='relative p-2'
                                    onMouseLeave={() => setOnRingBell(false)}>
                                    <div
                                        className='cursor-pointer p-2 rounded-full'
                                        onMouseEnter={() => setOnRingBell(true)}
                                    >
                                        <FaRegBell />
                                    </div>

                                    {onRingBell && (
                                        <div onMouseEnter={() => setOnRingBell(true)} className='absolute overflow-y-scroll h-[250px] right-0 mt-2 w-[350px] md:w-[400px] border-x-[1px] border-t-2 border-t-white border-x-[#5f5f5f] text-white shadow-lg z-10'>
                                            <div className='p-4 border-b-[1px] border-[#444] bg-[#000000c1] hover:bg-black transition-all duration-200'>
                                                <div className='flex w-full justify-between px-3 cursor-pointer'>
                                                    <img className='w-[100px] h-[60px] object-cover rounded-md' src={moneyH} alt="moneyheist" />
                                                    <div className='w-[250px] pl-3'>
                                                        <h4 className='text-[.9rem] leading-5'>Rewatch your favorite moments <br /> See what you've watched</h4>
                                                        <p className='text-xs text-[#888]'>2 days ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='p-4 border-b-[1px] border-[#444] bg-[#000000c1] hover:bg-black transition-all duration-200'>
                                                <Link to={'/latest'} className='flex w-full justify-between px-3 cursor-pointer'>
                                                    <img className='w-[100px] h-[60px] object-cover rounded-md' src={ringb} alt="Img" />
                                                    <div className='w-[250px] pl-3'>
                                                        <h4 className='text-[.9rem] leading-5'>Netflex Lookahead <br /> Explore what's coming soon.</h4>
                                                        <p className='text-xs text-[#888]'>3 days ago</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className='p-4 border-b-[1px] border-[#444] bg-[#000000c1] hover:bg-black transition-all duration-200'>
                                                <div className='flex w-full justify-between px-3 cursor-pointer'>
                                                    <img className='w-[100px] h-[60px] object-cover rounded-md' src={avatarImg} alt="Avatar" />
                                                    <div className='w-[250px] pl-3'>
                                                        <h4 className='text-[.9rem] leading-5'>Suggestions for tonight <br /> Explore personalized picks.</h4>
                                                        <p className='text-xs text-[#888]'>2 days ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div onMouseLeave={() => setOnProfile(false)} className='flex items-center'>
                                    <div className='relative flex items-center'>
                                        <img onMouseEnter={() => setOnProfile(true)} className='h-[35px] my-4 rounded-md' src={selectedProfile}
                                            alt="Selected Profile" />
                                        <IoMdArrowDropdown />
                                        {onProfile && (
                                            <div onMouseEnter={() => setOnProfile(true)} className='absolute top-[56px] right-0 mt-2 w-[230px] border-[1px] border-[#5f5f5f] text-white shadow-lg'>
                                                {profiles
                                                    .sort((a, b) =>
                                                        (a.avatar === selectedProfile ? -1 : 1)
                                                    )
                                                    .map(profile => (
                                                        <div key={profile.id} onClick={() => handleProfileClick(profile.avatar)} className="p-2 group bg-black flex items-center gap-4">
                                                            <img
                                                                className="h-[32px] rounded-md"
                                                                src={profile.avatar}
                                                                alt={profile.name}
                                                            />
                                                            <h4 className={`text-[.8rem] ${profile.avatar === selectedProfile ?
                                                                'group-hover:no-underline cursor-default'
                                                                : 'group-hover:underline cursor-pointer'
                                                                }`}>
                                                                {profile.name}
                                                            </h4>
                                                        </div>
                                                    ))}
                                                <Link to={'/account'} className='group p-2 bg-black flex items-center gap-4'>
                                                    <GrEdit className='pl-1' />
                                                    <h4 className='text-[.8rem] group-hover:underline cursor-pointer'>Manage Profiles</h4>
                                                </Link>
                                                <div className='p-2 group bg-black flex items-center gap-4'>
                                                    <IoPersonOutline className='pl-1' />
                                                    <h4 className='text-[.8rem] group-hover:underline cursor-pointer'>Account</h4>
                                                </div>
                                                <div className='p-2 group border-b-[1px] border-b-[#444] bg-black flex items-center gap-4'>
                                                    <AiOutlineQuestionCircle className='pl-1' />
                                                    <h4 className='text-[.8rem] hover:underline cursor-pointer'>Help Centre</h4>
                                                </div>
                                                <div className='p-2 bg-black text-center'>
                                                    <Link to={'/login'} className='text-[.8rem] hover:underline cursor-pointer'>Sign out of Netflix</Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile */}
                    <nav className='h-full'>
                        <div className='block xs:hidden w-[90%] mx-auto sticky top-0'>
                            <div className='text-white py-3 text-xl flex justify-between items-center mx-auto'>
                                <h1>For sabina</h1>
                                <div className='flex gap-3'>
                                    <FaChromecast />
                                    <MdOutlineSaveAlt />
                                    <IoSearch onClick={handleMobileSearch} />
                                </div>
                            </div>
                            <div>
                                <ul className='flex gap-2 text-white'>
                                    <Link to={'/TV Shows'} className='w-[90px] h-[26px] hover:scale-95 transition-all duration-200 text-[#ddd] flex justify-center items-center text-sm border-[1px] rounded-full border-[#ffffff58]'>Tv Shows</Link>
                                    <Link to={'/Movies'} className='w-[90px] h-[26px] hover:scale-95 transition-all duration-200 text-[#ddd] flex justify-center items-center text-sm border-[1px] rounded-full border-[#ffffff58]'>Movies</Link>
                                    <li onClick={toggleCateg} className='cursor-pointer w-[90px] h-[26px] hover:scale-95 transition-all duration-200 text-[#ddd] flex justify-center items-center text-sm border-[1px] rounded-full border-[#ffffff58]'>Categories</li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <nav className='block xs:hidden fixed bottom-0 bg-[#141414] text-[#888] w-full z-50'>
                        {categMenu && (
                            <Genres selectedData={selectedData}  header={header} />
                        )}
                        <div className='w-[90%] mx-auto flex justify-between items-center h-[60px]'>
                            <NavLink to={'/browse'} className={({ isActive }) =>
                                `flex flex-col items-center ${isActive ? 'text-white' : 'text-gray-500'
                                }`
                            }>
                                <HiMiniHome className='text-2xl' />
                                <p className='text-[.6rem]'>Home</p>
                            </NavLink>
                            <NavLink to={'/news'} className={({ isActive }) =>
                                `flex flex-col items-center ${isActive ? 'text-white' : 'text-gray-500'
                                }`
                            }>
                                <BiSolidVideos className='text-2xl' />
                                <p className='text-[.6rem]'>News & Hot</p>
                            </NavLink>
                            <NavLink to={'/myList'} className={({ isActive }) => `  ${isActive ? 'text-white' : 'text-gray-500'} flex flex-col items-center`} >
                                <img onMouseEnter={() => setOnProfile(true)} className='h-[25px] rounded-md' src={selectedProfile}
                                    alt="Selected Profile" />
                                <p className='text-[.6rem]'>My Netflix</p>
                            </NavLink>
                        </div>
                    </nav>
                </>
            )
            }
        </header >
    )
}
export default AccHeader