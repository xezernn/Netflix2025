import React, { useContext, useEffect, useRef, useState } from 'react'

import { IoCloseOutline, IoPauseSharp, IoPlaySharp, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5'
import { IoIosInformationCircleOutline } from 'react-icons/io'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Navigation } from 'swiper/modules'
import breakingB from '../../../assets/imgs/breakingb.webp'
import BreakingBvideo from '../../../assets/imgs/BreakingBvideo.mp4'
import breakingBLogo from '../../../assets/imgs/breakingblogo.webp'
import moneyH from '../../../assets/imgs/moneyH.jpg'
import Spinner from '../../../assets/imgs/loadSpinner.png'

import ColorThief from 'colorthief'


import { DATA, TOPMOVIES, TOPTV, TV } from '../../../context/DataContext'
import MoreInfo from './MoreInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import Media from './Media'
import { PROFILES } from '../../../context/ProfileContext'
import { TbScreenShare } from 'react-icons/tb'

function Home() {
  const { data } = useContext(DATA)
  const { tv } = useContext(TV)
  const { topM } = useContext(TOPMOVIES)
  const { topTv } = useContext(TOPTV)
  const { loading, selectedProfile, timeRemaining } = useContext(PROFILES)

  const [dominantColor, setDominantColor] = useState('')
  const [showImageBefore, setShowImageBefore] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [randomImage, setRandomImage] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [videoState, setVideoState] = useState(null)

  const imgRef = useRef()
  const videoRef = useRef(null)

  useEffect(() => {
    if (imgRef.current) {
      const colorThief = new ColorThief()
      imgRef.current.onload = () => {
        const color = colorThief.getColor(imgRef.current)
        setDominantColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`)
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImageBefore(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  function handleVideoEnd() {
    setShowImageBefore(true)
  }

  const stopVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleShowMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo)
  }

  const navigate = useNavigate()
  function openVideo() {
    navigate('/video')
  }
  
  useEffect(() => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length)
      setRandomImage(data[randomIndex])
    }
  }, [data])

  const handleSlideMoreInfo = (id, source) => {
    const sources = {
      data,
      tv,
      topM,
      topTv,
    }
    const selectedItem = sources[source]?.find((item) => item.id === id)
    if (selectedItem) {
      setSelectedItem(selectedItem)
      setShowMoreInfo(!showMoreInfo)
    }
  }

  const location = useLocation()
  useEffect(() => {
    if (location.state) {
      setVideoState(location.state)
    }
  }, [location.state])

  const handleClearState = () => {
    navigate('/browse', { state: null })
    setVideoState(false)
  }
  return (
    <>
      <main>
        {showMoreInfo && (
          <MoreInfo
            setShowMoreInfo={setShowMoreInfo}
            overview={selectedItem?.overview || 'Bryan Cranston scored four Emmys for his portrayal of a father who sells meth to support his family in what Forbes calls the "Best. Show. Ever."'}
            image={selectedItem?.backdrop_path ? `https://image.tmdb.org/t/p/original${selectedItem?.backdrop_path}` : breakingB}
            year={selectedItem?.release_date?.slice(0, 4) || selectedItem?.first_air_date?.slice(0, 4) || 2008}
            genres={selectedItem?.genre_ids || ['violence', 'nudity']}
          />
        )}

        <div className='hidden xs:block '>
          {loading && <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center bg-black z-[999]">
            <img
              className={`h-[85px] my-4 rounded-md transform transition-transform ${timeRemaining <= 1 ? 'animate-full-top-right' : ''
                }`} src={selectedProfile}
              alt="Selected Profile" />
            <img src={Spinner} alt="spinner" className='spinner w-[30px] mt-3' />
          </div>}
          <div className="absolute top-0 h-[730px] w-full bg-black">
            {showImageBefore ? (
              <img
                className="object-cover h-full w-full"
                src={breakingB}
                alt="Preview"
              />
            ) : (
              <video
                className="object-cover h-full w-full"
                src={BreakingBvideo}
                muted
                autoPlay
                ref={videoRef}
                loop
                playsInline
                preload="auto"
                onEnded={handleVideoEnd}
              />
            )}

            <div className='h-[750px] w-full  absolute top-0 bg-gradient-to-bl from-transparent to-[#141414ae]'></div>
            <div className='max-w-[1450px] px-9 mx-auto '>
              <div className="absolute top-[180px] max-w-[400px] max-h-[230px]">
                <div className="transition-all duration-500 overflow-hidden">
                  <div className="opacity-100 max-h-screen transition-opacity duration-500">
                    <img className={`object-cover  transition-all duration-500 ease-in-out ${showImageBefore ? "scale-100" : "scale-75 translate-y-6 -translate-x-14"
                      }`} src={breakingBLogo} alt="breakingBadLogo" />
                    <p
                      className={`text-white text-sm my-4 font-semibold transition-all duration-500 ease-in-out ${showImageBefore ? "opacity-100 max-h-[100px]" : "opacity-0 max-h-0"
                        }`}
                    >
                      Bryan Cranston scored four Emmys for his portrayal of a father who sells meth to support his family in what Forbes calls the "Best. Show. Ever."
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button onClick={openVideo} className='z-[60] w-[120px] cursor-pointer h-[42px] rounded-md text-lg font-semibold bg-white transition-all duration-200 hover:bg-[#ddd] text-black flex justify-center gap-1 items-center'><IoPlaySharp className='text-3xl' /> Play</button>
                      <button onClick={handleShowMoreInfo} className="z-[60] w-[150px] outline-none h-[45px] bg-[#888888a1] hover:bg-[#88888866] text-white font-semibold text-lg rounded-md flex justify-center gap-1 items-center">
                        <IoIosInformationCircleOutline className='text-3xl' /> More Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-[#14141488] w-[110px] h-[40px] flex pl-4 text-xl items-center bottom-[320px] absolute right-0 text-white border-l-[3px] border-white'>
                <p>+18</p>
              </div>
              <div className={`z-30 justify-between absolute bottom-[220px] w-[90px] right-[50px] ${showImageBefore ? "hidden" : "flex"}`}>
                <div onClick={stopVideo} className='bg-[#14141488] transition-all duration-200 hover:bg-[#5c5c5c] w-[40px] rounded-full h-[40px] flex justify-center text-xl items-center text-white'>
                  {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                </div>
                <div onClick={toggleMute} className='bg-[#14141488] transition-all duration-200 hover:bg-[#5c5c5c] w-[40px] rounded-full h-[40px] flex justify-center text-xl items-center  text-white'>
                  {isMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
                </div>
              </div>
            </div>
          </div>
          <div className='h-[730px] flex items-end relative'>
            <div className=' bg-gradient-to-b from-transparent absolute h-[150px] w-full bottom-[58px] to-[#141414]'></div>
            <div className='w-full relative top-[760px] bg-[#141414]'>
              <Media type={"data"} />
            </div>
          </div>
          <div className='w-full relative top-[760px] bg-[#141414] '>
            <Media type={"tv shows"} />
          </div>
          <div className='w-full relative top-[700px] bg-[#141414] '>
            <Media type={"movies"} />
          </div>
        </div >
        {
          videoState &&
          <div className='z-[999] bottom-[70px] right-[10px] xs:bottom-[30px] xs:right-[30px] w-[180px] xs:w-[250px] md:w-[320px] fixed shadow-xl'>
            <video
              className="object-cover peer rounded-md hover:brightness-50 transition-all duration-300"
              src={BreakingBvideo}
              onClick={openVideo}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
            <IoCloseOutline onClick={handleClearState} className='absolute text-white top-[5px] left-[5px] text-2xl' />
            <TbScreenShare className='peer absolute hidden hover:flex peer-hover:flex top-[35%] items-center w-full text-white text-2xl' />
          </div>
        }
        {/* Mobile */}
        <div className='block xs:hidden w-[90%] mx-auto ' >
          <div className='w-full pt-4'>
            <div
              className="absolute -z-10 inset-0 pointer-events-none bg-[#141414]"
              style={{ backgroundColor: dominantColor }}
            ></div>

            <img ref={imgRef} className='object-cover min-h-[440px] w-full h-[490px] rounded-xl' src={moneyH} alt="refcolor" />
          </div>
        </div >
        <div className='block xs:hidden w-full relative'>
          <div
            className="h-[240px] absolute -z-10 inset-0 pointer-events-none "
            style={{
              background: `linear-gradient(to top, black, ${dominantColor})`,
            }}
          ></div>
          <div className='w-[90%] mx-auto  text-white pt-5 px-2'>
            <p className='text-lg font-semibold'>New on Netflix</p>
            <Swiper
              cssMode={true}
              modules={[Navigation, Keyboard]}
            >
              {data && data.map((item) => {
                return (
                  <SwiperSlide onClick={() => handleSlideMoreInfo(item.id, "data")} key={item.id} className='swiper-slide-trend cursor-pointer'>
                    <div className='scale-[.94] hover:scale-[.98] transition-all duration-500'>
                      <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} className='rounded-lg h-[190px] w-[130px] md:h-[240px] md:w-[170px] lg:h-[270px] lg:w-[220px]' />
                    </div>
                  </SwiperSlide>
                )
              })
              }
            </Swiper>
          </div>
          <div className='bg-black py-4'>
            <div className='w-[90%]  mx-auto text-white pt-5 px-2'>
              <p className='text-lg font-semibold'>Award-winning Period Pieces</p>
              <Swiper
                cssMode={true}
                modules={[Navigation, Keyboard]}
              >
                {tv && tv.map((item) => {
                  return (
                    <SwiperSlide onClick={() => handleSlideMoreInfo(item.id, "tv")} key={item.id} className='swiper-slide-trend cursor-pointer'>
                      <div className='scale-[.94] hover:scale-[.98] transition-all duration-500'>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} className='rounded-lg h-[190px] w-[130px] md:h-[240px] md:w-[170px] lg:h-[270px] lg:w-[220px]' />
                      </div>
                    </SwiperSlide>
                  )
                })
                }
              </Swiper>
            </div>
            <div className='w-[90%] mx-auto text-white pt-5 px-2'>
              <p className='text-lg font-semibold'>Top-rated Tv Shows</p>
              <Swiper
                cssMode={true}
                modules={[Navigation, Keyboard]}
              >
                {topTv && topTv.map((item) => {
                  return (
                    <SwiperSlide onClick={() => handleSlideMoreInfo(item.id, "topTv")} key={item.id} className='swiper-slide-trend cursor-pointer'>
                      <div className='scale-[.94] hover:scale-[.98] transition-all duration-500'>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} className='rounded-lg h-[190px] w-[130px] md:h-[240px] md:w-[170px] lg:h-[270px] lg:w-[220px]' />
                      </div>
                    </SwiperSlide>
                  )
                })
                }
              </Swiper>
            </div>
            <div className='w-[90%] mx-auto text-white pt-5 px-2'>
              <p className='text-lg font-semibold'>Top-rated Movies</p>
              <Swiper
                cssMode={true}
                modules={[Navigation, Keyboard]}
              >
                {topM && topM.map((item) => {
                  return (
                    <SwiperSlide onClick={() => handleSlideMoreInfo(item.id, "topM")} key={item.id} className='swiper-slide-trend cursor-pointer'>
                      <div className='scale-[.94] hover:scale-[.98] transition-all duration-500'>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} className='rounded-lg h-[190px] w-[130px] md:h-[240px] md:w-[170px] lg:h-[270px] lg:w-[220px]' />
                      </div>
                    </SwiperSlide>
                  )
                })
                }
              </Swiper>
            </div>
          </div>
        </div>
      </main >
    </>

  )
}

export default Home