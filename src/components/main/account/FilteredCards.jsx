import { useContext, useEffect, useState } from "react"
import Card from "./Card"
import MoreInfo from "./MoreInfo"
import { DATA, TOPMOVIES, TOPTV } from "../../../context/DataContext"

function FilteredCards({ genreId, header, genreName }) {
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
    useEffect(() => {
        if (selectedData && selectedData.length > 0) {
            const filteredData = genreId
                ? selectedData.filter(item => item.genre_ids.includes(genreId))
                : selectedData
        }
    }, [selectedData, genreId])
    
    const [hoveredCard, setHoveredCard] = useState(null)
    const handleMouseEnter = (id) => setHoveredCard(id)
    const handleMouseLeave = () => setHoveredCard(null)

    const [selectedItem, setSelectedItem] = useState(null)
    const [modal, setModal] = useState(false)

    function handleSlideMoreInfo(itemId) {
        const selectedItem = selectedData.find((item) => item.id === itemId)
        if (selectedItem) {
            setSelectedItem(selectedItem)
            setModal(!modal)
        }
    }

    return (
        <div className="relative">
            <h1 className="xs:hidden text-[#f8f8f8cc] px-6 text-xl absolute top-[-60px] pt-6 w-full h-[60px] flex justify-center bg-gradient-to-b from-transparent to-[#141414]">{genreName}</h1>
            <div className="flex xs:grid grid-cols-2 overflow-x-auto px-6 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 xs:py-[140px]">
                {
                    selectedData
                        .filter(item => genreId ? item.genre_ids.includes(parseInt(genreId)) : true)
                        .map(item => (
                            <div key={item.id}>
                                <div className="hidden xs:flex" >
                                    <div
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={handleMouseLeave}
                                        className="text-white"
                                    >
                                        <Card
                                            type={selectedData}
                                            item={item}
                                            handleSlideMoreInfo={handleSlideMoreInfo}
                                            handleMouseEnter={handleMouseEnter}
                                            handleMouseLeave={handleMouseLeave}
                                            hoveredCard={hoveredCard}
                                        />
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleSlideMoreInfo(item.id)}
                                    className="xs:hidden scale-[.94] hover:scale-[.98] transition-all duration-500"
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        alt={item.title}
                                        className="rounded-lg h-[190px] min-w-[130px] md:h-[240px] md:w-[170px] lg:h-[270px] lg:w-[220px]"
                                    />
                                </div>
                            </div >
                        ))
                }
            </div >
            {modal && selectedItem && (
                <MoreInfo
                    setModal={setModal}
                    image={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
                    year={selectedItem.release_date?.slice(0, 4) || selectedItem.first_air_date?.slice(0, 4)}
                    overview={selectedItem.overview}
                    genres={selectedItem.genre_ids} />
            )
            }
        </div>
    )
}
export default FilteredCards