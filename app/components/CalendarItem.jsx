import React from 'react'
import PropTypes from 'prop-types'
import style from './CalendarItem.css'

const CalendarItem = ({ event }) => {
  const eventImageUrl = (event.type === 'Festival') ?
    `https://images.sk-static.com/images/media/profile_images/events/${event.id}/col6` :
    `https://images.sk-static.com/images/media/profile_images/venues/${event.venue.id}/col6`

  const eventDate = new Date(event.start.date.split('T')[0])
  const formattedDate = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <a className={style.eventContainer} href={event.uri} target="_blank" rel="noopener noreferrer">
      <div className={style.eventImage}>
        <img src={eventImageUrl} alt="Event Poster" />
      </div>
      <div className={style.eventInfo}>
        <h1 className={style.eventDate}>{formattedDate}</h1>
        <h2 className={style.eventName}>
          {event.type === 'Festival' ? event.displayName : event.venue.displayName}
        </h2>
        <div className={style.eventLocation}>
          {event.location.city}
        </div>
      </div>
    </a>
  )
}

CalendarItem.propTypes = {
  event: PropTypes.object.isRequired,
}

export default CalendarItem
