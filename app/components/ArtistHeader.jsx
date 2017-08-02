import React from 'react'
import PropTypes from 'prop-types'
import style from './ArtistHeader.css'

const ArtistHeader = ({ artist }) => {
  if (!artist || !artist.id) return null
  return (
    <div
      className={style.artistImage}
      style={{
        paddingTop: '60px',
        backgroundImage: `url(https://images.sk-static.com/images/media/profile_images/artists/${artist.id}/col6)`
      }}
    >
      <div>
        <a className={style.artistHeaderTrack} href={artist.uri} target="_blank" rel="noopener noreferrer">
          Track {artist.displayName}
        </a>
      </div>
    </div>
  )
}

ArtistHeader.propTypes = {
  artist: PropTypes.object,
}

export default ArtistHeader
