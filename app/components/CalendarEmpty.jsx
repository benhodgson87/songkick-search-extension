import React from 'react';
import PropTypes from 'prop-types'
import style from './CalendarEmpty.css'

const CalendarEmpty = ({ artist }) => (
  <div>
    <div className={style.emptyMessage}>No upcoming events 🙁</div>
    <div className={style.trackUpsell}>
      <span>
        Track {artist.displayName} on Songkick and get notified when they announce a show!
      </span>
      <div>
        <a
          href={artist.uri}
          target="_blank"
          rel="noopener noreferrer"
          className={style.trackButton}
        >
          Start Tracking
        </a>
      </div>
    </div>
  </div>
);

CalendarEmpty.propTypes = {
  artist: PropTypes.object.isRequired,
}

export default CalendarEmpty
