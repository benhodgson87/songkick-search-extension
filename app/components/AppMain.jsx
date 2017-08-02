import 'isomorphic-fetch'
import React, { Component } from 'react'
import classnames from 'classnames';
import * as config from '../constants/config'
import style from './AppMain.css'

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
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        endpoint: `search/artists.json?query=${this.state.searchTerm}`
      }),
      headers: new Headers({ 'content-type': 'application/json' })
    })
    .then(r => r.json())
    .then((data) => {
      const artistData = data.resultsPage.results.artist[0]
      this.setState({
        artist: artistData,
      })
      return fetch(config.API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          endpoint: `artists/${artistData.id}/calendar.json`
        }),
        headers: new Headers({ 'content-type': 'application/json' })
      })
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        searchStatus: 'SUCCESS',
        calendar: data.resultsPage.results,
      })
    })
    .catch(() => {
      this.setState({ searchStatus: 'ERROR' })
    })
  }

  renderSearching() {
    return (
      <div>
        <MainHeader artist={this.state.searchTerm} />
        <div className={classnames(style.content, style.contentSearching)}>
          Searching for {this.state.searchTerm} 🙏
        </div>
      </div>
    )
  }

  renderError() {
    return (
      <div>
        <MainHeader artist={this.state.searchTerm} />
        <div className={classnames(style.content, style.contentError)}>
          <NoArtistFound searchTerm={this.state.searchTerm} />
        </div>
      </div>
    )
  }

  renderSuccess() {
    return (
      <div>
        <MainHeader artist={this.state.artist.displayName} url={this.state.artist.uri} />
        <div className={classnames(style.content, style.contentSuccess)}>
          <ArtistHeader artist={this.state.artist} />
          <SearchResults artist={this.state.artist} calendar={this.state.calendar} />
        </div>
      </div>
    )
  }

  render() {
    if (this.state.searchStatus === 'SEARCHING') return this.renderSearching()
    if (this.state.searchStatus === 'ERROR') return this.renderError()
    return this.renderSuccess()
  }
}
