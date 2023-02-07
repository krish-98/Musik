import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper"

import PlayPause from "./PlayPause"
import { playPause, setActiveSong } from "../redux/features/playerSlice"
import { useGetTopChartsQuery } from "../redux/services/shazamCore"

import "swiper/css"
import "swiper/css/free-mode"

const TopChartCard = ({
  song,
  i,
  activeSong,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="group w-full flex flex-row items-center hover:bg-neutral-600 py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3 group-hover:text-white">
      {i + 1}.
    </h3>
    <div className="flex-1 flex flex-row justify-between">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-lg font-semibold text-white md:text-xl group-hover:text-[#f81617]">
            {song?.title}
          </p>
        </Link>
        {/* <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-[#706566] mt-1 group-hover:text-white">
            {song?.subtitle}
          </p>
        </Link> */}
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data } = useGetTopChartsQuery()
  const divRef = useRef(null)

  useEffect(() => divRef.current.scrollIntoView({ behavior: "smooth" }))

  const topPlays = data?.slice(0, 5)

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  return (
    <div
      ref={divRef}
      className="ml-0 mb-6 flex-1 flex flex-col max-w-full xl:ml-6 xl:mb-0 xl:max-w-[500px]"
    >
      {/* Top Artists */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to="">
                <img
                  src={song?.images?.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Top Charts */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopPlay
