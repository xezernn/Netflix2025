import { useContext, useEffect, useState } from "react"
import { DATA, TOPMOVIES, TOPTV, TV } from "../../../context/DataContext"
import { useLocation } from "react-router-dom"
import { IoSearchSharp } from "react-icons/io5"
import Card from "./Card"
import MoreInfo from "./MoreInfo"

function Searched() {
    const { data } = useContext(DATA)
    const { tv } = useContext(TV)
    const { topM } = useContext(TOPMOVIES)
    const { topTv } = useContext(TOPTV)

    const combinedData = [...data, ...tv, ...topM, ...topTv]
    const location = useLocation()

    const initialSearchTerm = location.state?.searchTerm || ""
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

    const filteredResults = combinedData.filter((item) =>
        item.original_title?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        if (initialSearchTerm) {
            setSearchTerm(initialSearchTerm)
        }
    }, [initialSearchTerm])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const [hoveredCard, setHoveredCard] = useState(null)
    const handleMouseEnter = (id) => setHoveredCard(id)
    const handleMouseLeave = () => setHoveredCard(null)

    const [selectedItem, setSelectedItem] = useState(null)
    const [modal, setModal] = useState(false)

    function handleSlideMoreInfo(itemId) {
        const selectedItem = combinedData.find((item) => item.id === itemId)
        if (selectedItem) {
            setSelectedItem(selectedItem)
            setModal(!modal)
        }
    }

    return (
        <div className="h-full min-h-screen bg-[#141414]">
            <div className="absolute -z-10 inset-0 pointer-events-none bg-[#141414]"></div>
            <div className="xs:hidden w-[80%] bg-[#000000be] border pl-2 h-[40px] flex justify-start ml-5 mt-6">
                <IoSearchSharp />
                <input
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Titles ..."
                    type="text"
                    className="text-white outline-none bg-transparent text-sm pl-3"
                />
            </div>

            {filteredResults.length > 0 ? (
                <div className="grid grid-cols-2 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-[100px] xs:py-[150px]">
                    {filteredResults.map((item) => (
                        <div>
                            <div
                                onMouseEnter={() => handleMouseEnter(item.id)}
                                onMouseLeave={handleMouseLeave}
                                key={item.id}
                                className="text-white hidden xs:flex"
                            >
                                <Card
                                    type={combinedData}
                                    item={item}
                                    handleSlideMoreInfo={handleSlideMoreInfo}
                                    handleMouseEnter={handleMouseEnter}
                                    handleMouseLeave={handleMouseLeave}
                                    hoveredCard={hoveredCard}
                                />
                            </div>
                            <div
                                onClick={() =>
                                    handleSlideMoreInfo(item.id)
                                }
                                className="xs:hidden scale-[.94] hover:scale-[.98] transition-all duration-500"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    alt={item.title}
                                    className="rounded-lg h-[190px] min-w-[130px] md:h-[240px] md:w-[170px] lg:h-[270px] lg:w-[220px]"
                                />
                            </div>
                        </div>

                    ))}
                </div>
            ) : (
                <p className="text-white text-center mt-10 h-screen translate-y-[200px] bg-[#141414]">
                    No results found for "{searchTerm}".
                </p>
            )}

            {modal && selectedItem && (
                <MoreInfo
                    setModal={setModal}
                    image={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
                    year={selectedItem.release_date?.slice(0, 4) || selectedItem.first_air_date?.slice(0, 4)}
                    overview={selectedItem.overview}
                    genres={selectedItem.genre_ids} />
            )}
        </div>
    )
}

export default Searched
