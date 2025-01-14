import { IoSearch } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import moneyH from '../../../assets/imgs/moneyH.jpg'
import avatar from '../../../assets/imgs/avatar.jpg'
import ringb from '../../../assets/imgs/soon.jpg'
import { FaBell, FaRegBell } from "react-icons/fa"
import { useState } from "react"
function News() {
    const navigate = useNavigate()
    const [ring, setRing] = useState(false)

    const handleMobileSearch = () => navigate('/searched')
    const toggleNotification = () => setRing(!ring)
    const newsItems = [
        {
            img: moneyH,
            title: "Rewatch your favorite moments",
            description: "See what you've watched",
            time: "2 days ago",
            remind: true,
        },
        {
            img: ringb,
            title: "Netflex Lookahead",
            description: "Explore what's coming soon.",
            time: "3 days ago",
            link: "/latest",
        },
        {
            img: avatar,
            title: "Suggestions for tonight",
            description: "Explore personalized picks.",
            time: "2 days ago",
            remind: true,
        },
    ];
    return (
        <div className="bg-black absolute top-0 py-16 w-full min-h-screen xs:top-[70px] text-white font-semibold pt-3">
            <div className="flex justify-between items-center w-[90%] mx-auto pt-1 ">
                <h3> News & Hot</h3>
                <IoSearch onClick={handleMobileSearch} className="text-xl xs:hidden" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map(({ img, title, description, time, link, remind }, index) => (
                    <div
                        key={index}
                        className="pb-2 border m-3 rounded-lg border-[#444] bg-[#000000c1] hover:bg-black transition-all duration-200"
                    >
                        {link ? (
                            <Link to={link} className="flex flex-col items-start cursor-pointer">
                                <img src={img} alt="image" className="w-full h-[240px] object-cover rounded-t-md" />
                                <div className="w-[90%] pl-3">
                                    <h4 className="text-[.7rem] leading-5 py-2">{title} <br /> {description}</h4>
                                    <p className="text-xs text-[#888]">{time}</p>
                                </div>
                            </Link>
                        ) : (
                            <div className="flex flex-col items-start cursor-pointer">
                                <img src={img} alt="image" className="w-full h-[240px] object-cover rounded-t-md" />
                                <div className="w-[90%] pl-3">
                                    <h4 className="text-[.7rem] leading-5 py-2">{title} <br /> {description}</h4>
                                    <p className="text-xs text-[#888]">{time}</p>
                                </div>
                                {remind && (
                                    <button
                                        onClick={toggleNotification}
                                        className="bg-white text-black rounded-md px-5 py-2 text-sm flex items-center gap-2 mt-2 ml-2"
                                    >
                                        {ring ? <FaBell className="bell-animate" /> : <FaRegBell />} Remind Me
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div >
    )
}
export default News