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

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data } = useGetTopChartsQuery()
  const divRef = useRef(null)

  useEffect(() => divRef.current.scrollIntoView({ behavior: "smooth" }))

  const topPlays = data?.slice(0, 5)

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  return (
    <div
      ref={divRef}
      className=" ml-0 mb-6 flex-1 flex flex-colmax-w-full  xl:ml-6 xl:mb-0 xl:max-w-[500px]"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopPlay
