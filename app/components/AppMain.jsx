import React, { Component } from 'react'
import classnames from 'classnames';
import style from './AppMain.css'
import apiClient from '../services/apiClient'
import MainHeader from './MainHeader'
import ArtistHeader from './ArtistHeader'
import NoArtistFound from './NoArtistFound'
import SearchResults from './SearchResults'

export default class Root extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: null,
      searchStatus: 'SEARCHING',
      artist: {},
      calendar: {},
    }
  }

  componentWillMount() {
    const url = new URLSearchParams(window.location.search);
    if (url.get('searchTerm')) {
      this.setState({ searchTerm: url.get('searchTerm') })
    }
  }

  componentDidMount() {
    if (this.state.searchTerm) {
      apiClient.artistSearch(this.state.searchTerm)
      .then((result) => {
        this.setState({
          searchStatus: 'SUCCESS',
          artist: result.artistData,
          calendar: result.artistCalendar,
        })
      })
      .catch(() => {
        this.setState({ searchStatus: 'ERROR' })
      })
    }
  }

  renderStartScreen() {
    return (
      <div>
        <MainHeader artist="Concert Search" />
        <div className={classnames(style.content, style.contentExtraPad)}>
          To use this extension, please highlight an artist&rsquo;s name, right-click,
          and select the <em>Search for Artist Concerts</em> option in the menu
        </div>
      </div>
    )
  }

  renderSearching() {
    return (
      <div>
        <MainHeader artist={this.state.searchTerm} />
        <div className={classnames(style.content, style.contentExtraPad)}>
          Searching for {this.state.searchTerm} 🙏
        </div>
      </div>
    )
  }

  renderError() {
    return (
      <div>
        <MainHeader artist={this.state.searchTerm} />
        <div className={classnames(style.content, style.contentExtraPad)}>
          <NoArtistFound searchTerm={this.state.searchTerm} />
        </div>
      </div>
    )
  }

  renderSuccess() {
    return (
      <div>
        <MainHeader artist={this.state.artist.displayName} url={this.state.artist.uri} />
        <div className={classnames(style.content)}>
          <ArtistHeader artist={this.state.artist} />
          <SearchResults artist={this.state.artist} calendar={this.state.calendar} />
        </div>
      </div>
    )
  }

  render() {
    if (this.state.searchTerm === null) return this.renderStartScreen()
    if (this.state.searchStatus === 'SEARCHING') return this.renderSearching()
    if (this.state.searchStatus === 'ERROR') return this.renderError()
    return this.renderSuccess()
  }
}
