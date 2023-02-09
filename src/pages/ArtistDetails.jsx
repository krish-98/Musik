import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components"

const ArtistDetails = () => {
  const { id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const [artistData, setArtistData] = useState({})
  const [isFetchingArtistDetails, setIsFetchingArtistDetails] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(
      `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${artistId}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIsFetchingArtistDetails(false)
        setArtistData(data)
      })
      .catch((error) => {
        setIsFetchingArtistDetails(false)
        setError(true)
        setArtistData({})
      })
  }, [artistId])

  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />

  if (error) return <Error />

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={artistData?.data[0]?.views?.["top-songs"]?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  )
}

export default ArtistDetails
