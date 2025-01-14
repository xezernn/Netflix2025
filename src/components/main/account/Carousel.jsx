import { Swiper, SwiperSlide } from "swiper/react"
import Card from "./Card"
import { GoChevronLeft, GoChevronRight } from "react-icons/go"
import { Keyboard, Navigation } from "swiper/modules"

function Carousel({ type, title, items, genreId, handleSlideMoreInfo, isSwipedRight, handleMouseEnter, handleMouseLeave, hoveredCard, customClass, swipeRight }) {
    return (
        <>
            <div className='hidden xs:block max-w-[1600px] mx-auto overflow-hidden '>
                <div className="hidden xs:flex flex-col justify-end ">
                    <div className="text-white text-xl font-semibold">
                        <div className='flex items-end group pl-10 translate-y-9 '>
                            <h3>{title}</h3>
                            <span
                                className="w-0 text-sm font-semibold text-cyan-500 translate-x-0 group-hover:translate-x-2 whitespace-nowrap opacity-0 transition-all delay-300 duration-200 group-hover:opacity-100 group-hover:w-[100px] ml-2 flex items-center"
                            >
                                Explore All
                            </span>
                        </div>

                    </div>
                </div>
                <div className={`hidden relative min-h-[150px] xs:flex items-center transition-all duration-500 ${isSwipedRight ? 'pl-0' : 'pl-10'}`}>
                    <Swiper
                        className='h-[245px]'
                        cssMode={true}
                        navigation={{ nextEl: `.custom-next${customClass}`, prevEl: `.custom-prev${customClass}` }}
                        keyboard={true}
                        modules={[Navigation, Keyboard]}
                    >
                        {items
                            .filter((item) => item.genre_ids.includes(genreId))
                            .map((item) => (
                                <SwiperSlide key={item.id} className="swiper-slide-trend2 cursor-pointer">
                                    <Card type={type} handleSlideMoreInfo={handleSlideMoreInfo} item={item} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} hoveredCard={hoveredCard} />
                                </SwiperSlide>
                            ))}
                    </Swiper>

                    <div className="flex justify-center w-[70px] items-center transform -translate-y-1/2 absolute top-1/2 -left-1 z-20">
                        <div className={`custom-prev${customClass} flex items-center justify-center h-[131px] w-[65px] bg-gradient-to-r from-[#000000c2] hover:from-[#000000e5] to-transparent text-white cursor-pointer transition-all duration-150`}>
                            <GoChevronLeft className='text-4xl' />
                        </div>
                    </div>
                    <div className="w-[70px] flex justify-center items-center transform -translate-y-1/2 absolute top-1/2 -right-1 z-20">
                        <div onClick={swipeRight} className={`custom-next${customClass} flex items-center justify-center h-[131px] w-[65px] bg-gradient-to-l from-[#000000c2] hover:from-[#000000e5] to-transparent text-white cursor-pointer transition-all duration-150`}>
                            <GoChevronRight className='text-4xl' />
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className='xs:hidden w-[90%] mx-auto text-white pt-4 px-2'>
                <p className='text-lg font-semibold'>{title}</p>
                <Swiper
                    cssMode={true}
                    modules={[Navigation, Keyboard]}
                >
                    {items
                        .filter((item) => item.genre_ids.includes(genreId))
                        .map((item) => {
                            return (
                                <SwiperSlide key={item.id} className='swiper-slide-trend cursor-pointer'>
                                    <div onClick={() => handleSlideMoreInfo(item.id, type === "tv shows" ? "topTv" : type === "movies" ? "topM" : type === "data" ? "data" : "")} className='scale-[.94] hover:scale-[.98] transition-all duration-500'>
                                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} className='rounded-lg h-[190px] w-[130px] md:h-[240px] md:w-[170px] lg:h-[270px] lg:w-[220px]' />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                        
                    }
                </Swiper>
            </div>
        </>
    )
}
export default Carousel