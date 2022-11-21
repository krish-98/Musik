import SongBar from "./SongBar"

const RelatedSongs = ({
  data,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
    {data?.map((song, i) => (
      <SongBar
        key={`${song.id}-${artistId}`}
        song={song}
        i={i}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    ))}
  </div>
)

export default RelatedSongs
