import { FaMusic } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link, Route, Routes } from "react-router-dom"

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components"
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages"

const App = () => {
  const { activeSong } = useSelector((state) => state.player)

  return (
    <div className="relative flex flex-col">
      <Link to="/">
        <h1 className="h-14 text-white font-bold text-4xl  tracking-wider">
          MUSIK
        </h1>
        <FaMusic className="w-8 h-8 text-[#f81617] self-start" />
      </Link>

      <Sidebar />
      <div className="flex-1 flex flex-col bg-black">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex flex-col-reverse xl:flex-row">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-neutral-600 backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  )
}

export default App
