import { useNavigate } from "react-router-dom"

const ArtistCard = ({ track }) => {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-gradient-to-br from-red-500 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists[0]?.adamid}`)}
    >
      <img
        className="w-full h-56 rounded-lg"
        src={track?.images?.coverart}
        alt="artist"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle}
      </p>
    </div>
  )
}

export default ArtistCard
