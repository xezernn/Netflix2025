import { useContext, useState } from "react"
import { LIST } from "../../../context/MyListContext"
import Card from "./Card"
import MoreInfo from "./MoreInfo"
import Loading from "./Loading"
import { Swiper, SwiperSlide } from "swiper/react"
import { Keyboard, Navigation } from "swiper/modules"
import { PROFILES } from "../../../context/ProfileContext"
import { useNavigate } from "react-router-dom"
function MyList() {
  const { myList } = useContext(LIST)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()
  const handleMouseEnter = (id) => setHoveredCard(id)
  const handleMouseLeave = () => setHoveredCard(null)

  const handleSlideMoreInfo = (itemId) => {
   
    const selectedItem = myList.find((item) => item.id === itemId)
    if (selectedItem) {
      setSelectedItem(selectedItem)
      setModal(true)
    }
  }
  const { selectedProfile, selectedProfileName } = useContext(PROFILES)
  return (
    <main className="min-h-screen bg-[#141414]">
      <div className='max-w-[1450px] w-full mx-auto px-8 pt-2 flex justify-center items-center'>
        <div className={` ${myList.length === 0 ? "flex justify-center items-center" : "grid"
          } pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 xs:py-[110px]`}
        >
          {myList.length > 0 ? (
            myList.map((item) => (
              <div 
              key={item.id || Math.random()} className="hidden xs:flex">
                <Card
                  type="myList"
                  item={item}
                  handleSlideMoreInfo={handleSlideMoreInfo}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  hoveredCard={hoveredCard}
                />

              </div>
            ))
          ) : (
            <p className="text-[#7c7c7cbd] text-center flex justify-center w-full pt-[120px]">You haven't added any titles to your list yet.</p>
          )}
        </div>
        {/* Mobile */}
        <div className="absolute -z-10 min-h-screen inset-0 pointer-events-none bg-[#141414]" ></div >
        <div className="xs:hidden bg-[#141414] absolute top-[40px] xs:top-[60px] w-full">
          <div className="flex justify-center flex-col items-center bg-[#141414] w-full">
            <div onClick={() => navigate('/ManageProfiles')}>
              <img className='h-[65px] hover:scale-95 transition-all duration-200 my-4 rounded-md' src={selectedProfile}
                alt="Selected Profile" />
            </div>
            <div className="flex text-white items-center">
              <h2>{selectedProfileName}</h2>
            </div>
          </div>
          <div className="w-[90%] mx-auto xs:py-[80px] pt-5 px-2">
            <h1 className="text-white pt-10 font-semibold py-3">My List</h1>
            <Swiper
              cssMode={true}
              modules={[Navigation, Keyboard]}
            >
              
              {myList.length > 0 ? (
                myList.map((item) => (
                  <SwiperSlide key={item.id || Math.random()}  className="swiper-slide-trend cursor-pointer">
                    <div
                      onClick={() =>
                        handleSlideMoreInfo(item.id)
                      }
                      className="scale-[.94] hover:scale-[.98] transition-all duration-500"
                    >
                      <img
                        src={item.image || `https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item.title}
                        className="object-cover object-right rounded-lg h-[190px] w-[130px] md:h-[240px] md:w-[170px] lg:h-[270px] lg:w-[220px]"
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p className="text-[#7c7c7cbd] mx-auto pt-[120px]">You haven't added any titles to your list yet.</p>
              )}
            </Swiper>
          </div>
        </div>
        {modal && selectedItem && (
          <MoreInfo
            setModal={setModal}
            image={selectedItem.image || `https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
            year={selectedItem.release_date?.slice(0, 4) || selectedItem.first_air_date?.slice(0, 4)}
            overview={selectedItem.overview} genres={selectedItem.genre_ids} />
        )}
        {!myList && <Loading />}
      </div>
    </main >
  )
}

export default MyList
