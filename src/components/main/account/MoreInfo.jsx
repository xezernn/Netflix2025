import { MdOutlineMessage } from "react-icons/md"
import { RiCloseLargeFill } from "react-icons/ri"
import { BsPlusLg } from "react-icons/bs"
import { IoPlaySharp } from "react-icons/io5"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import ep1 from '../../../assets/imgs/ep1.webp'
import ep2 from '../../../assets/imgs/ep2.webp'
import ep3 from '../../../assets/imgs/ep3.webp'
import ep4 from '../../../assets/imgs/ep4.webp'
import ep5 from '../../../assets/imgs/ep5.webp'
import ep6 from '../../../assets/imgs/ep6.webp'

import { DATA } from '../../../context/DataContext'
import { useContext, useEffect, useState } from "react"
import { LIST } from "../../../context/MyListContext"
import { IoMdCheckmark } from "react-icons/io"
import { useLocation, useNavigate } from "react-router-dom"
function MoreInfo({ setShowMoreInfo, image, setModal, year, overview, id, genres }) {
    const { myList, handleAddToList } = useContext(LIST)
    const { data } = useContext(DATA)
    const [onHover, setOnHover] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedSeason, setSelectedSeason] = useState(1)

    const handleClose = () => {
        if (setShowMoreInfo) {
            setShowMoreInfo(false)
        } else if (setModal) {
            setModal(false)
        }
    }
    function truncateByWords(text, maxWords) {
        const words = text.split(' ')
        if (words.length <= maxWords) return text
        return words.slice(0, maxWords).join(' ') + ' ...'
    }
    const [like, setLike] = useState(false)
    const genreMap = {
        28: "Action",
        10759: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        10751: "Family",
        99: "Documentary",
        18: "Drama",
        14: "Fantasy",
        27: "Horror",
        10402: "Musical",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        53: "Thriller",
        37: "Western",
    }

    const episodesData = {
        1: [
            {
                id: 1,
                title: "Pilot",
                duration: "58m",
                description: "Diagnosed with terminal lung cancer, a high school chemistry teacher resorts to cooking and selling methamphetamine to provide for his family.",
                imgSrc: ep1,
            },
            {
                id: 2,
                title: "The Cat's in the Bag",
                duration: "48m",
                description: "Diagnosed with terminal lung cancer, a high school chemistry teacher resorts to cooking and selling methamphetamine to provide for his family.",
                imgSrc: ep2,
            },
            {
                id: 3,
                title: "And the Bag's in the River",
                duration: "48m",
                description: "As Walt cleans up the mess that was left after his first drug deal, Skyler gets too close to the truth about his double life.",
                imgSrc: ep3,
            },
        ],
        2: [
            {
                id: 1,
                title: "Seven Thirty-Seven",
                duration: "47m",
                description: "Walt and Jesse's actions have unintended consequences as they face new challenges.",
                imgSrc: ep4,
            },
            {
                id: 2,
                title: "Grilled",
                duration: "48m",
                description: "The tension rises as Walt and Jesse encounter a dangerous adversary.",
                imgSrc: ep5,
            },
        ],
        3: [
            {
                id: 1,
                title: "No Más",
                duration: "47m",
                description: "Skyler forces Walt to move out in the wake of the airline disaster, while Jesse's rehab helps him come to grips with his role in the collision.",
                imgSrc: ep6,
            },
        ],
    }

    const handleSeasonChange = (e) => {
        setSelectedSeason(parseInt(e.target.value))
    }

    const episodes = episodesData[selectedSeason] || []

    const [showEpisodes, setShowEpisodes] = useState(false)

    useEffect(() => {
        if (decodeURIComponent(location.pathname).includes("TV Shows") || year === 2008) {
            setShowEpisodes(true)
        } else {
            setShowEpisodes(false)
        }
    }, [location])

    return (
        <div
            onClick={handleClose}
            className=" z-[999] w-full h-full fixed top-0 left-0 bg-[#0000006e]"
        >
            <div className="w-full h-full flex justify-center">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="border-[1px] max-h-[1000px] overflow-auto border-[#444] rounded-lg flex-col z-30 max-w-[800px] w-full flex "

                >
                    <div className="relative top-0 w-full rounded-lg">
                        <img className="object-cover rounded-t-lg min-h-[160px] max-h-[450px] w-full bg-[#141414]"
                            src={image} alt="image" />
                        <div className='absolute bottom-[20px] z-40 flex gap-3 justify-between px-4 xs:pl-8'>
                            <button onClick={() => navigate(`/video`)} className='w-[90px] xs:w-[120px] h-[42px] rounded-sm text-lg font-semibold bg-white transition-all duration-200 hover:bg-[#ddd] text-black flex justify-center gap-1 items-center'><IoPlaySharp className='text-3xl' /> Play</button>
                            <button
                                onClick={() => handleAddToList({ id, image, overview })}
                                className="h-[40px] w-[40px] rounded-full flex justify-center items-center transition-all duration-200 hover:bg-[#99999946] text-[#f1f1f1] text-xl border-2 border-[#999] bg-[#222]"
                            >
                                {myList.some((item) => item.id === id) ? (
                                    <IoMdCheckmark />
                                ) : (
                                    <BsPlusLg />
                                )}
                            </button>
                            <button onClick={() => setLike(!like)} className='h-[40px] w-[40px] rounded-full flex justify-center items-center transition-all duration-200 hover:bg-[#99999946] text-[#f1f1f1] text-xl border-2 border-[#999] bg-[#222]'> {like ? <AiFillLike /> : <AiOutlineLike />}</button>
                        </div>
                        <div className="absolute top-0 min-h-[160px] h-full w-full bg-gradient-to-b from-transparent z-20 to-[#141414]"></div>
                        <div
                            className="absolute top-5 right-5 rounded-full cursor-pointer flex items-center justify-center h-[35px] w-[35px]  z-30  hover:bg-[#ffffff46] transition-all duration-300"

                        >
                            <RiCloseLargeFill onClick={handleClose} className="text-white text-2xl" />
                        </div>
                    </div>
                    <div className="bg-[#141414] w-full rounded-b-lg">
                        <div className='flex justify-between w-[90%] mx-auto flex-col xs:flex-row'>
                            <div className='py-4'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-[#999]'>{year} 24 Episodes</p>
                                    <p className='border-[1px] border-white text-white text-xs text-center rounded-[3px] w-[30px] h-[17px]'>HD</p>
                                    <MdOutlineMessage className='text-[#999]' />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <p className='border-[1px] border-white text-white text-xs text-center w-[30px] h-[17px]'>18+</p>
                                    <p className='text-[#fff] text-sm'>{
                                        (genres || [])
                                            .filter(id => genreMap[id])
                                            .map(id => genreMap[id])
                                            .join(", ")
                                    }</p>
                                </div>
                                <p className='text-white text-sm leading-5 py-4 max-w-[400px]'>{overview}</p>
                            </div>
                            <div className='text-sm w-full xs:w-[260px] gap-3 flex flex-col py-4'>
                                <p className='text-white '><span className='text-[#999] pr-2'>Cast:</span>Kentaro Kumagai, Sayaka Sembogi, Asuna Tomari, <span className='italic'>more</span></p>
                                <p className='text-white '><span className='text-[#999] pr-2'>Genres:</span>Romanric TV Dramas, TV Comedies <span className='italic'>more</span></p>
                            </div>
                        </div>
                        {showEpisodes &&
                            <div className="w-[90%] mx-auto">
                                <div className="flex items-center justify-between py-5 ">
                                    <h2 className='text-white text-2xl font-semibold py-5 w-[90%] mx-auto'>Episodes</h2>
                                    <select
                                        className="bg-[#2a2a2a] text-white outline-none border border-[#969696] py-2 px-5"
                                        onChange={handleSeasonChange}
                                        value={selectedSeason}
                                    >
                                        <option value={1}>Season 1</option>
                                        <option value={2}>Season 2</option>
                                        <option value={3}>Season 3</option>
                                    </select>
                                </div>
                                <h4 className="text-[.8rem] py-3 text-white font-semibold">Season {selectedSeason}:</h4>
                                {episodes.map((episode) => (
                                    <div onClick={() => navigate(`/video`)}
                                        key={episode.id}
                                        className="text-white cursor-pointer border-b border-[#444] hover:bg-[#333] flex flex-col gap-4 xs:flex-row items-center py-6"
                                    >
                                        <p className="text-3xl p-3">{episode.id}</p>
                                        <img
                                            src={episode.imgSrc}
                                            alt={`Episode ${episode.id}`}
                                            className="w-[90px] h-[50px] object-cover rounded-[3px]"
                                        />
                                        <div className="px-3 flex-1">
                                            <div className="flex justify-between font-semibold text-xl">
                                                <h3>{episode.title}</h3>
                                                <p>{episode.duration}</p>
                                            </div>
                                            <p className="text-[.9rem] text-[#c4c4c4]">{episode.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                        <h2 className='text-white text-2xl font-semibold py-5 w-[90%] mx-auto'>More Like This</h2>
                        <div className='grid xs:grid-cols-2 md:grid-cols-3 gap-4 w-[90%] mx-auto pb-10'>
                            {data && data.map((item) => (
                                <div onMouseEnter={() => setOnHover(item.id)}
                                    onClick={() => navigate(`/video`)}
                                    onMouseLeave={() => setOnHover(null)} key={item.id} className='flex flex-col cursor-pointer'>
                                    <div className='relative'>
                                        {onHover === item.id && (
                                            <div className="h-full absolute w-full flex justify-center items-center">
                                                <IoPlaySharp className="text-white bg-[#0000006c] text-5xl rounded-full p-2" />
                                            </div>
                                        )}
                                        <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} alt='image' className='rounded-t-md' />
                                        <p className='text-white z-10 absolute top-1 right-1'>4 seasons</p>
                                        <div className="bg-gradient-to-tr rounded-md from-transparent via-transparent to-black/85 w-full h-full absolute top-0 right-0"></div>
                                        <div className='flex justify-center items-center absolute bottom-0 w-full'>
                                            <p className='bg-red-600 text-white font-semibold rounded-t-sm text-[.75rem] h-[20px] w-[120px] text-center'>Recently added</p>
                                        </div>
                                    </div>
                                    <div className='bg-[#2f2f2f] p-3 rounded-b-md flex-1'>
                                        <div className='flex justify-between'>
                                            <div className='flex items-center gap-1'>
                                                <p className='border-[1px] border-[#999] text-[#999] text-xs flex justify-center items-center w-[40px] h-[22px]'>13</p>
                                                <p className='border-[1px] border-[#999] text-[#ddd] text-xs text-center rounded-[3px] w-[30px] h-[17px]'>HD</p>
                                                <p className='text-[#999]'>{item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)}</p>
                                            </div>
                                            <button onClick={(e) => {
                                                e.stopPropagation()
                                                handleAddToList(item)
                                            }} className="w-[30px] h-[30px] rounded-full flex justify-center items-center transition-all duration-200 hover:bg-[#99999946] text-[#f1f1f1] text-xl border-2 border-[#999] bg-[#222]">
                                                {myList.includes(item) ? <IoMdCheckmark /> : <BsPlusLg />}
                                            </button>
                                        </div>
                                        <p className='text-[#ddd] py-4 text-sm leading-6'>{truncateByWords(item.overview, 19)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default MoreInfo