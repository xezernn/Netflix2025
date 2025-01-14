import { useState, useEffect, useContext } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoPlaySharp } from "react-icons/io5";
import Loading from "./Loading";
import MoreInfo from "./MoreInfo";
import { DATA, TOPMOVIES, TOPTV } from "../../../context/DataContext";
import Genres from "./Genres";
import { useNavigate } from "react-router-dom";

function RandomImage({ header, genreId, genreName }) {
    const { data } = useContext(DATA)
    const { topM } = useContext(TOPMOVIES)
    const { topTv } = useContext(TOPTV)

    let selectedData = []
    if (header === 'Movies') {
        selectedData = topM
    } else if (header === 'TV Shows') {
        selectedData = topTv
    } else {
        selectedData = data
    }

    const [randomImage, setRandomImage] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showMoreInfo, setShowMoreInfo] = useState(false)

    const navigate = useNavigate()

    const filterDataByGenre = (data, genreId) => {
        return genreId ? selectedData.filter(item => item.genre_ids.includes(genreId)) : data
    }
    const setRandomImageFromData = (data, genreId) => {
        const filteredData = filterDataByGenre(data, genreId)
        if (filteredData.length === 0) {
            setRandomImage(null)
            setIsLoading(false)
            return
        }

        const randomIndex = Math.floor(Math.random() * filteredData.length)
        setTimeout(() => {
            setRandomImage(filteredData[randomIndex])
            setIsLoading(false)
        }, 1000)
    }

    useEffect(() => {
        if (selectedData.length > 0) {
            setIsLoading(true)
            setRandomImageFromData(selectedData, genreId)
        }
    }, [selectedData, genreId])

    if (isLoading) return <Loading />

    const openVideo = () => {
        navigate('/video')
    }

    const handleShowMoreInfo = () => {
        setShowMoreInfo(prev => !prev)
    }

    return (
        <>
            {randomImage ? (
                <div className="h-[600px] relative w-full hidden xs:block bg-[#141414]">
                    <img
                        className="object-cover h-[600px] w-full bg-black"
                        src={`https://image.tmdb.org/t/p/original${randomImage.backdrop_path}`}
                        alt="Preview"
                    />
                    <div className='bg-[#141414] w-[110px] h-[40px] flex pl-4 text-xl items-center bottom-[100px] absolute right-0 text-white border-l-[3px] border-white'>
                        <p>+18</p>
                    </div>

                    <div className='h-[600px] w-full absolute top-0 bg-gradient-to-bl from-transparent to-[#141414ae]' />
                    <div className='max-w-[1450px] px-9 mx-auto'>
                        <div className="absolute top-[100px] max-w-[600px]">
                            <div className="h-[190px] items-start">
                                <Genres header={header} setRandomImage={setRandomImage} genreId={genreId} genreName={genreName} />
                            </div>
                            <p className='text-white text-sm my-4 font-semibold transition-all duration-500'>
                                {randomImage.overview}
                            </p>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <button
                                    onClick={openVideo}
                                    className='w-[120px] h-[42px] rounded-md text-lg font-semibold bg-white text-black flex justify-center gap-1 items-center'
                                >
                                    <IoPlaySharp className='text-3xl' /> Play
                                </button>
                                <button
                                    onClick={handleShowMoreInfo}
                                    className="w-[150px] outline-none h-[45px] bg-[#888888a1] text-white font-semibold text-lg rounded-md flex justify-center gap-1 items-center"
                                >
                                    <IoIosInformationCircleOutline className='text-3xl' /> More Info
                                </button>
                            </div>
                        </div>
                        {showMoreInfo && (
                            <MoreInfo
                                setShowMoreInfo={setShowMoreInfo}
                                image={`https://image.tmdb.org/t/p/original${randomImage.backdrop_path}`}
                                overview={randomImage.overview}
                                id={randomImage.id}
                                genres={randomImage.genre_ids}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div className="h-[100px] bg-[#141414]">
                    <Genres header={header} setRandomImage={setRandomImage} genreId={genreId} />
                </div>
            )}

            {/* Mobile Version */}
            <div className="block xs:hidden w-[90%] mx-auto">
                <div className="w-full pt-4">
                    <div className="absolute -z-10 inset-0 pointer-events-none bg-[#141414]" />
                    {randomImage && (
                        <img className="object-cover min-h-[440px] w-full h-[490px] rounded-xl"
                            src={`https://image.tmdb.org/t/p/original${randomImage.backdrop_path}`} alt="Mobile Preview" />
                    )}
                </div>
            </div>
        </>
    )
}

export default RandomImage;