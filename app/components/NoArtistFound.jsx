import React from 'react'
import PropTypes from 'prop-types'
import style from './NoArtistFound.css'

const NoArtistFound = ({ searchTerm }) => {
  const searchQuery = searchTerm.replace(/ /gi, '+')
  return (
    <div className={style.noArtistFound}>
      <h1>Sorry, I can’t find artists called <em>{searchTerm}</em> 🙁</h1>
      <span>
        Try <a href={`http://songkick.com/search?utf8=✓&type=initial&query=${searchQuery}`} target="_blank" rel="noopener noreferrer">searching on Songkick</a> for more results.
     </span>
    </div>
  )
}

NoArtistFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
}

export default NoArtistFound
