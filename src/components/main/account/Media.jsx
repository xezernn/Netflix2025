import { DATA, TOPMOVIES, TOPTV, TV } from "../../../context/DataContext"
import { useContext, useState } from "react"
import Carousel from "./Carousel"
import MoreInfo from "./MoreInfo"
import { useLocation } from "react-router-dom"

function Media({ type }) {
    const { data } = useContext(DATA)
    const { tv } = useContext(TV)
    const { topM } = useContext(TOPMOVIES)
    const { topTv } = useContext(TOPTV)

    const location = useLocation();
    const isHome = location.pathname === '/browse';
    const [isSwipedRight, setIsSwipedRight] = useState(false)
    const [isSwipedRight2, setIsSwipedRight2] = useState(false)
    const [isSwipedRight3, setIsSwipedRight3] = useState(false)
    const [hoveredCard, setHoveredCard] = useState(null)
    const [hoveredCard2, setHoveredCard2] = useState(null)
    const [hoveredCard3, setHoveredCard3] = useState(null)

    const swipeRight = () => {
        setIsSwipedRight(true)
    }
    const swipeRight2 = () => {
        setIsSwipedRight2(true)
    }
    const swipeRight3 = () => {
        setIsSwipedRight3(true)
    }
    const handleMouseEnter = (id) => {
        setHoveredCard(id)
    }
    const handleMouseEnter2 = (id) => {
        setHoveredCard2(id)
    }
    const handleMouseEnter3 = (id) => {
        setHoveredCard3(id)
    }
    const handleMouseLeave = () => {
        setHoveredCard(null)
    }
    const handleMouseLeave2 = () => {
        setHoveredCard2(null)
    }
    const handleMouseLeave3 = () => {
        setHoveredCard3(null)
    }

    const [selectedItem, setSelectedItem] = useState(null)
    const [modal, setModal] = useState(false)
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
            setModal(true)
        }
    }

    const carouselsData = [
        {
            title: type === "movies" ? "Action Movies" : type === "tv shows" ? "TV Dramas" : "New on Netflix",
            items: type === "movies" ? topM : type === "tv shows" ? topTv : type === "data" ? data : [],
            genreId: type === "movies" || type === "tv shows" ? 18 : 35,
            isSwipedRight: isSwipedRight,
            handleMouseEnter: handleMouseEnter,
            handleMouseLeave: handleMouseLeave,
            hoveredCard: hoveredCard,
            customClass: "",
            swipeRight: swipeRight,
        },
        {
            title: type === "movies" ? "Comedy Movies" : type === "tv shows" ? "Fantasy TV Shows" : "Worth the Wait",
            items: type === "movies" ? topM : type === "tv shows" ? topTv : type === "data" ? data : [],
            genreId: type === "movies" ? 14 : type === "tv shows" ? 35 : 14,
            isSwipedRight: isSwipedRight2,
            handleMouseEnter: handleMouseEnter2,
            handleMouseLeave: handleMouseLeave2,
            hoveredCard: hoveredCard2,
            customClass: "2",
            swipeRight: swipeRight2,
        },
        {
            title: type === "movies" ? "Thriller Movies" : type === "tv shows" ? "Adventure TV Shows" : "Coming Next Week",
            items: type === "movies" ? topM : type === "tv shows" ? topTv : type === "data" ? data : [],
            genreId: type === "movies" ? 80 : type === "tv shows" ? 10765 : 16,
            isSwipedRight: isSwipedRight3,
            handleMouseEnter: handleMouseEnter3,
            handleMouseLeave: handleMouseLeave3,
            hoveredCard: hoveredCard3,
            customClass: "3",
            swipeRight: swipeRight3,
        },
    ]
    return (
        <main>
            {modal  && (
                <MoreInfo
                    setModal={setModal}
                    image={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
                    year={selectedItem.release_date?.slice(0, 4) || selectedItem.first_air_date?.slice(0, 4)}
                    overview={selectedItem.overview}
                    genres={selectedItem.genre_ids}
                />
            )}
            <div className={`w-full py-3 ${isHome ? 'translate-y-[-180px]' : 'bg-[#141414] xs:pt-12'}`} >
                {
                    carouselsData.map((carousel, index) => (
                        <Carousel
                            key={index}
                            title={carousel.title}
                            items={carousel.items}
                            genreId={carousel.genreId}
                            type={type}
                            isSwipedRight={carousel.isSwipedRight}
                            handleMouseEnter={carousel.handleMouseEnter}
                            handleMouseLeave={carousel.handleMouseLeave}
                            handleSlideMoreInfo={handleSlideMoreInfo}
                            hoveredCard={carousel.hoveredCard}
                            customClass={carousel.customClass}
                            swipeRight={carousel.swipeRight}
                        />
                    ))
                }
            </div>

        </main >
    )
}
export default Media