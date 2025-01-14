import { MdOutlineArrowBack, MdOutlineEmojiFlags } from 'react-icons/md'
import BreakingBvideo from '../../assets/imgs/BreakingBvideo.mp4'
import BreakingBimg from '../../assets/imgs/Breakingb.webp'
import Spinner from '../../assets/imgs/loadSpinner.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
function VideoPlayer() {
    const navigate = useNavigate()
    function goBack() {
        navigate('/browse')
    }
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false)

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }
    const skipBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
        }
    }

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.min(
                videoRef.current.currentTime + 10,
                videoRef.current.duration
            )
        }
    }
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
        setOpenVolume(!openVolume)
    }

    const [showSpeedMenu, setShowSpeedMenu] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1)
    const toggleSpeedMenu = () => {
        setShowSpeedMenu((prev) => !prev)
    }
    const changeSpeed = (rate) => {
        setPlaybackRate(rate)
        if (videoRef.current) {
            videoRef.current.playbackRate = rate
        }
    }
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.()
        } else {
            document.exitFullscreen?.()
        }
    }

    const [isLoading, setIsLoading] = useState(true)
    const [isImageVisible, setIsImageVisible] = useState(false)

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false)
            setIsImageVisible(true)
        }, 2000)

        const imageTimeout = setTimeout(() => {
            setIsImageVisible(false)
        }, 4000)

        return () => {
            clearTimeout(loadingTimeout)
            clearTimeout(imageTimeout)
        }
    }, [])

    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState('00:00')
    const [duration, setDuration] = useState('00:00')
    const progressBarRef = useRef(null)
    const [isSeeking, setIsSeeking] = useState(false)
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    useEffect(() => {
        const video = videoRef.current

        const updateProgress = () => {
            if (video && video.duration && !isSeeking) {
                const progressPercentage = (video.currentTime / video.duration) * 100
                setProgress(progressPercentage)
                setCurrentTime(formatTime(video.currentTime))
                setDuration(formatTime(video.duration))
            }
        }

        video.addEventListener('timeupdate', updateProgress)
        video.addEventListener('loadedmetadata', updateProgress)

        return () => {
            video.removeEventListener('timeupdate', updateProgress)
            video.removeEventListener('loadedmetadata', updateProgress)
        }
    }, [isSeeking])

    const handleMouseDownVideo = () => {
        setIsSeeking(true)
    }

    const handleMouseMoveVideo = (e) => {
        if (isSeeking) {
            const video = videoRef.current;
            const progressBar = progressBarRef.current;
            const rect = progressBar.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const newProgress = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100);

            setProgress(newProgress);
            video.currentTime = (newProgress / 100) * video.duration;
        }
    };

    const handleMouseUpVideo = () => {
        setIsSeeking(false)
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play()
                setIsPlaying(isPlaying)
            }
        }, 4000)

        return () => clearTimeout(timer)
    }, [])
    const [openVolume, setOpenVolume] = useState(false)

    const [volume, setVolume] = useState(0.5)
    const sliderRef = useRef(null)

    const handleMouseDown = () => {
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const [showControls, setShowControls] = useState(true)
    const timerRef = useRef(null)

    const resetControlsTimer = () => {
        setShowControls(true)
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            setShowControls(false)
        }, 3000)
    }
    useEffect(() => {
        document.addEventListener('mousemove', resetControlsTimer)

        return () => {
            document.removeEventListener('mousemove', resetControlsTimer)
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    return (
        <>
            <div className='h-screen bg-black'>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-[999]">
                        <img src={Spinner} alt="spinner" className='spinner w-[50px] sm:w-auto' />
                    </div>
                )}
                {isImageVisible && (

                    <div className="text-white inset-0  z-[999] flex items-center justify-center text-center fixed">
                        <img src={BreakingBimg} alt="Video thumbnail" className="relative object-cover w-full h-full" />
                        <div className='bg-black h-full w-full absolute top-0 left-0 opacity-65'></div>
                        <div className=" absolute top-[40%] left-[10px] sm:left-[5l0px] z-50">
                            <div className='flex flex-col justify-between items-start'>
                                <h3 className='text-2xl md:text-5xl text-start text-[#efefefda] pb-6'>Breaking Bad | season 1 episode 1</h3>
                                <p className='md:w-[400px] px-2 text-lg text-start'>Bryan Cranston scored four Emmys for his portrayal of a father who sells meth to support his family in what Forbes calls the "Best. Show. Ever."</p>
                            </div>
                        </div>
                    </div>

                )}
                <MdOutlineArrowBack onClick={goBack} className='z-50 text-white absolute top-[30px] left-[20px] text-3xl xs:text-4xl cursor-pointer' />
                <div className=' z-[10]  '
                    onClick={togglePlayPause}>
                    <video onMouseMove={resetControlsTimer} ref={videoRef}
                        volume={volume}
                        preload="auto"
                        className='w-full h-screen object-cover'
                        src={BreakingBvideo}
                    />

                    <div className='absolute top-[5%] bottom-[14%] z-[20] w-full h-80% '></div>

                </div>
                <MdOutlineEmojiFlags className='text-white absolute top-[30px] right-[20px] text-3xl xs:text-4xl  z-20' />

            </div >
            {showControls && (
                <div className='absolute inset-0 z-20 text-white h-[50px] w-full ' >

                    <div className={`fixed w-full bottom-0 z-30 h-[110px] px-[18px] flex flex-col justify-between `}>
                        <div className="relative flex items-center w-full">
                            <input
                                type="range"
                                ref={progressBarRef}
                                value={progress}
                                onMouseDown={handleMouseDownVideo}
                                onMouseMove={handleMouseMoveVideo}
                                onMouseUp={handleMouseUpVideo}
                                onChange={(e) => {
                                    const newProgress = parseFloat(e.target.value);
                                    setProgress(newProgress);

                                    if (videoRef.current) {
                                        videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
                                    }
                                }}
                                min="0"
                                max="100"
                                step="0.1"
                                aria-label="Video progress bar"
                                className="w-full h-[5px] bg-gray-600 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, red ${progress}%, #4b5563 ${progress}%)`,
                                }}
                            />

                            <div className="ml-2 w-[100px] text-right text-sm text-gray-300">
                                {currentTime} / {duration}
                            </div>
                        </div>
                        <div className='h-[110px] flex justify-between items-center '>
                            <div className='flex gap-[27px]'>
                                <button onClick={togglePlayPause}>
                                    {isPlaying ? <svg
                                        className='w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]'
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="48"
                                        height="48"
                                        fill="currentColor"
                                    >
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                        : <svg
                                            className='w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]'
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="48"
                                            height="48"
                                            fill="currentColor"
                                        >
                                            <path d="M6 4l12 8-12 8V4z" />
                                        </svg>
                                    }
                                </button>
                                <button onClick={skipBackward} >
                                    <svg className='w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="Back10" aria-labelledby=":rk1:" aria-hidden={true}><path fillRule="evenodd" clipRule="evenodd" d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97066 20.8978 6.88324 21.5694 9.09717C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479973 13.5867 -0.214321 10.8238 0.0578004C8.71195 0.265799 6.70517 1.02858 5 2.2532V1H3V5C3 5.55228 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55228 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1758 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43388C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43388C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1758 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01928V15.8554H8.60395Z" fill="currentColor"></path></svg>
                                </button>
                                <button onClick={skipForward} >
                                    <svg className='w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="Forward10" aria-labelledby=":rk2:" aria-hidden={true}><path fillRule="evenodd" clipRule="evenodd" d="M6.4443 3.68532C8.36795 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55229 21 5V1H19V2.2532C17.2948 1.02859 15.2881 0.2658 13.1762 0.057802C10.4133 -0.214319 7.64154 0.479975 5.33316 2.02238C3.02478 3.56479 1.32262 5.85989 0.516718 8.51661C-0.289188 11.1733 -0.148981 14.0273 0.913451 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09718C3.10219 6.88324 4.52065 4.97067 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55229 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2078 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1759 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43389C15.2078 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43389C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1759 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.429 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.429 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01929L7 9.81956V11.1405L8.60395 10.7163Z" fill="currentColor"></path></svg>
                                </button>
                                <div className='relative'>
                                    <button
                                        onMouseEnter={() => {
                                            setOpenVolume(true)
                                        }}
                                        onMouseLeave={() => {
                                            setOpenVolume(false)
                                        }}
                                        onClick={toggleMute}
                                        className="md:text-5xl hover:scale-[1.15] text-white"
                                    >
                                        {isMuted ? (
                                            <svg
                                                className="w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M7 9v6h4l5 5V4l-5 5H7z"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="48"
                                                height="48"
                                                fill="currentColor"
                                            >
                                                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                                <path d="M14.5 8.5a4.5 4.5 0 010 6.36l1.42 1.42a6.5 6.5 0 000-9.2l-1.42 1.42zM17.5 5.5a7.5 7.5 0 010 10.6l1.42 1.42a9.5 9.5 0 000-13.44L17.5 5.5z" />
                                            </svg>
                                        )}
                                    </button>
                                    {openVolume && (
                                        <div onMouseEnter={() => setOpenVolume(true)}
                                            onMouseLeave={() => setOpenVolume(false)} ref={sliderRef} onMouseDown={handleMouseDown} className='bg-[#262626] absolute bottom-[20px] xs:bottom-[28px] md:bottom-[45px] pb-10 right-[-8px] xs:right-[0px] md:right-[10px] w-[20px] h-[100px] xs:w-[25px] xs:h-[120px]'>
                                            <input
                                                type="range"
                                                value={volume}
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                onChange={handleVolumeChange}
                                                className="w-[5px] h-[80px] xs:h-[100px] xs:w-[10px] ml-2 mt-3 bg-gray-400 rounded-lg appearance-none"
                                                style={{
                                                    writingMode: 'vertical-rl',
                                                    transform: 'rotate(180deg)',
                                                    background: `linear-gradient(to bottom, red ${volume * 100}%, #e7e7e7 ${volume * 100}%)`,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='hidden md:block'>
                                <h1><strong>Breaking Bad</strong> E1 <span className='ml-[4px]'>Episode 1</span></h1>
                            </div>
                            <div className='flex gap-[27px]'>
                                <button className='hidden md:block'>
                                    <svg className='w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="NextEpisode" aria-labelledby=":rk4:" aria-hidden={true}><path fillRule="evenodd" clipRule="evenodd" d="M22 3H20V21H22V3ZM4.28615 3.61729C3.28674 3.00228 2 3.7213 2 4.89478V19.1052C2 20.2787 3.28674 20.9977 4.28615 20.3827L15.8321 13.2775C16.7839 12.6918 16.7839 11.3082 15.8321 10.7225L4.28615 3.61729ZM4 18.2104V5.78956L14.092 12L4 18.2104Z" fill="currentColor"></path></svg>
                                </button>
                                <button onClick={() => navigate('/browse', { state: { key: 'value' } })} className='ml-[27px] xs:mr-[27px]'>
                                    <svg className='w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="Episodes" aria-labelledby=":rk5:" aria-hidden={true}><path fillRule="evenodd" clipRule="evenodd" d="M8 5H22V13H24V5C24 3.89543 23.1046 3 22 3H8V5ZM18 9H4V7H18C19.1046 7 20 7.89543 20 9V17H18V9ZM0 13C0 11.8954 0.895431 11 2 11H14C15.1046 11 16 11.8954 16 13V19C16 20.1046 15.1046 21 14 21H2C0.895431 21 0 20.1046 0 19V13ZM14 19V13H2V19H14Z" fill="currentColor"></path></svg>
                                </button>

                                <button >
                                    <svg className='w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="Subtitles" aria-labelledby=":rk6:" aria-hidden={true}><path fillRule="evenodd" clipRule="evenodd" d="M1 3C1 2.44772 1.44772 2 2 2H22C22.5523 2 23 2.44772 23 3V17C23 17.5523 22.5523 18 22 18H19V21C19 21.3688 18.797 21.7077 18.4719 21.8817C18.1467 22.0557 17.7522 22.0366 17.4453 21.8321L11.6972 18H2C1.44772 18 1 17.5523 1 17V3ZM3 4V16H12H12.3028L12.5547 16.1679L17 19.1315V17V16H18H21V4H3ZM10 9L5 9V7L10 7V9ZM19 11H14V13H19V11ZM12 13L5 13V11L12 11V13ZM19 7H12V9H19V7Z" fill="currentColor"></path></svg>
                                </button>

                                <div className="relative">
                                    <button
                                        onMouseEnter={() => {
                                            toggleSpeedMenu(true)
                                        }}
                                        onMouseLeave={() => {
                                            toggleSpeedMenu(false)
                                        }}
                                        onClick={toggleSpeedMenu} className="cursor-pointer">
                                        <svg
                                            className="w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden={true}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M19.0569 6.27006C15.1546 2.20629 8.84535 2.20629 4.94312 6.27006C1.01896 10.3567 1.01896 16.9985 4.94312 21.0852L3.50053 22.4704C-1.16684 17.6098 -1.16684 9.7454 3.50053 4.88481C8.18984 0.0013696 15.8102 0.0013696 20.4995 4.88481C25.1668 9.7454 25.1668 17.6098 20.4995 22.4704L19.0569 21.0852C22.981 16.9985 22.981 10.3567 19.0569 6.27006ZM15 14.0001C15 15.6569 13.6569 17.0001 12 17.0001C10.3431 17.0001 9 15.6569 9 14.0001C9 12.3432 10.3431 11.0001 12 11.0001C12.4632 11.0001 12.9018 11.105 13.2934 11.2924L16.2929 8.29296L17.7071 9.70717L14.7076 12.7067C14.895 13.0983 15 13.5369 15 14.0001Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </button>

                                    {showSpeedMenu && (
                                        <div onMouseEnter={() => {
                                            toggleSpeedMenu(true)
                                        }}
                                            onMouseLeave={() => {
                                                toggleSpeedMenu(false)
                                            }}
                                            className="absolute p-4 rounded bg-[#262626] w-[300px] md:w-[500px] h-[150px] bottom-[48px] right-[-50px] md:right-[-80px] z-10">
                                            <h1 className="font-[500] text-[16px] tabl:text-[27px]">Playback Speed</h1>
                                            <div className="grid w-full h-[50px] place-items-center mt-3 tabl:px-[20px]">
                                                <div className="flex justify-between w-full h-[1px] bg-gray-200">
                                                    {[
                                                        { label: '0.5x', value: 0.5 },
                                                        { label: '0.75x', value: 0.75 },
                                                        { label: '1x', value: 1 },
                                                        { label: '1.25x', value: 1.25 },
                                                        { label: '1.5x', value: 1.5 },
                                                    ].map((option, index) => (
                                                        <div key={index} className="flex flex-col items-center">
                                                            <div className="max-w-[min-content]">
                                                                <input
                                                                    type="radio"
                                                                    name="speedOption"
                                                                    id={`speed-${index}`}
                                                                    value={option.value}
                                                                    checked={playbackRate === option.value}
                                                                    onChange={() => changeSpeed(option.value)}
                                                                    className="peer hidden"
                                                                />
                                                                <label
                                                                    htmlFor={`speed-${index}`}
                                                                    className="block cursor-pointer select-none rounded-full w-[15px] h-[15px] bg-[grey] mt-[-6px] peer-checked:bg-white peer-checked:scale-150"
                                                                ></label>
                                                            </div>
                                                            <h3 className="mt-[10px] text-[18px]">{option.label}</h3>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button onClick={toggleFullscreen}>
                                    <svg className='w-[4vw] h-[4vw] max-w-[40px] max-h-[40px] hover:scale-[1.15]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="FullscreenEnter" aria-labelledby=":rk8:" aria-hidden={true} data-uia="control-fullscreen-enter"><path fillRule="evenodd" clipRule="evenodd" d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z" fill="currentColor"></path></svg>
                                </button>
                            </div>
                        </div>


                    </div>
                </div>)}
        </>
    )
}

export default VideoPlayer