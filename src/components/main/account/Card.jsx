import { GoChevronDown } from "react-icons/go"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { BsPlusLg } from "react-icons/bs"
import { IoPlaySharp } from "react-icons/io5"
import { matchPath, useLocation, useNavigate } from "react-router-dom"
import { useContext, useRef, useState } from "react"
import { IoMdCheckmark } from "react-icons/io"
import { LIST } from "../../../context/MyListContext"
import { BiDislike, BiSolidDislike } from "react-icons/bi"
function Card({ type, item, handleSlideMoreInfo, handleMouseEnter, handleMouseLeave, hoveredCard }) {
    const { myList, handleAddToList } = useContext(LIST)
    const navigate = useNavigate()
    const location = useLocation()
    const timeoutRef = useRef(null)

    const [likeOpt, setLikeOpt] = useState(false)
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)

    function openVideo() {
        navigate('/video')
    }
    const isSearched =
        location.pathname === "/searched" ||
        matchPath("/:header/genre/:genreName/:genreId", location.pathname) ||
        location.pathname === "/myList"

    const handleLikeOpt = () => {
        timeoutRef.current = setTimeout(() => {
            setLikeOpt((prev) => !prev)
        }, 1000)
    }

    const cancelLikeOpt = () => {
        clearTimeout(timeoutRef.current)
        setLikeOpt(false)
    }

    function handleDislike() {
        setDislike(!dislike)
        setLike(false)
    }
    function handleLike() {
        setLike(!like)
        setDislike(false)
    }
    return (
        <div
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            className={`transition-all duration-500 ${isSearched ? 'h-[160px]' : 'h-full'} flex justify-center relative items-center`}
        >
            <img
                src={item.image ? item.image : `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                alt="movie"
                className="object-cover rounded-sm h-[130px] w-[234px]"
            />

            {hoveredCard === item.id && (
                <div className={`absolute top-[-10pxpx] ${isSearched && 'top-[-38px]'} rounded-md bg-[#141414] z-20 hover:scale-105 transition-all duration-300 delay-200 shadow-md shadow-[#000000b6]`}>
                    <img src={item.image ? item.image : `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="img" className="rounded-t-md" />
                    <div className="flex justify-between pt-3 px-4">
                        <div className="flex gap-3 mb-4">
                            <button onClick={openVideo} className="w-[30px] h-[30px] rounded-full text-lg font-semibold bg-white transition-all duration-200 hover:bg-[#ddd] text-black flex justify-center items-center">
                                <IoPlaySharp className="text-xl" />
                            </button>
                            <button onClick={() => handleAddToList(item)} className="w-[30px] h-[30px] rounded-full flex justify-center items-center transition-all duration-200 hover:bg-[#99999946] text-[#f1f1f1] text-xl border-2 border-[#999] bg-[#222]">
                                {myList.includes(item) ? <IoMdCheckmark /> : <BsPlusLg />}
                            </button>
                            <button onMouseEnter={handleLikeOpt} onMouseLeave={cancelLikeOpt} className="w-[30px] h-[30px] rounded-full flex justify-center items-center transition-all duration-200 hover:bg-[#99999946] text-[#f1f1f1] text-xl border-2 border-[#999] bg-[#222]">
                                {likeOpt ? (
                                    <div className={`flex items-center justify-center h-[30px] rounded-full transition-all duration-500 
                                        ${likeOpt ? "gap-4 p-5" : ""} 
                                        bg-[#222] text-[#f1f1f1] text-xl border-2 border-[#999]`}>
                                        <div
                                            onClick={handleDislike}
                                            className="hover:bg-[#99999946] rounded-full p-1 text-2xl"
                                        >
                                            {dislike ? <BiSolidDislike /> : <BiDislike />}
                                        </div>
                                        <div
                                            onClick={handleLike}
                                            className="hover:bg-[#99999946] rounded-full p-1 text-2xl"
                                        >
                                            {like ? <AiFillLike /> : <AiOutlineLike />}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {like ? (
                                            <AiFillLike />
                                        ) : dislike ? (
                                            <BiSolidDislike />
                                        ) : (
                                            <AiOutlineLike />
                                        )}
                                    </>
                                )}
                            </button>
                        </div>
                        <button onClick={() => handleSlideMoreInfo(item.id, type === "tv shows" ? "topTv" : type === "movies" ? "topM" : type === "data" ? "data" : "")}
                            className="w-[30px] h-[30px] rounded-full flex justify-center items-center transition-all duration-200 hover:bg-[#99999946] text-[#f1f1f1] text-xl border-2 border-[#999] bg-[#222]">
                            <GoChevronDown />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white px-4 pb-1">
                        <p className="border border-[#999] text-[#999] text-[.7rem] flex justify-center items-center w-[30px] h-[15px]">13</p>
                        <p className="border border-[#999] text-[#ddd] text-xs text-center rounded-[3px] w-[30px] h-[15px]">HD</p>
                        {item.release_date ? item.release_date.slice(0, 4) : item.first_air_date?.slice(0, 4)}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Card