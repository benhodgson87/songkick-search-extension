import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './MainHeader.css'

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  }

  renderArtistName() {
    if (!this.props.url) return <h2>{this.props.title}</h2>
    return (
      <h2>
        <a href={this.props.url} target="_blank" rel="noopener noreferrer">{this.props.title}</a>
      </h2>
    )
  }

  render() {
    return (
      <header>
        <div className={style.extHeader}>
          <a className={style.logo} href="http://www.songkick.com" target="_blank" rel="noopener noreferrer">
            <img src="https://assets.crowdsurge.com/brand/songkick_logo/SK_badge_white.png" alt="Songkick Logo" />
          </a>
          { this.renderArtistName() }
        </div>
      </header>
    )
  }
}
