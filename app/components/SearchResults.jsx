import 'isomorphic-fetch'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as config from '../constants/config'

import CalendarEmpty from './CalendarEmpty'
import CalendarItem from './CalendarItem'

export default class SearchResults extends Component {

  static propTypes = {
    artist: PropTypes.object.isRequired,
    calendar: PropTypes.object.isRequired,
  };

  renderCalendar() {
    if (typeof this.props.calendar.event === 'undefined') {
      return <CalendarEmpty artist={this.props.artist} />
    }
    return (
      <div>
        {this.props.calendar.event.map(event => (
          <CalendarItem key={event.id} event={event} />
        ))}
      </div>
    )
  }

  render() {
    if (this.props.calendar === 'SEARCHING') return null
    return (
      <div>
        { this.renderCalendar() }
      </div>
    )
  }
}
