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

  componentDidMount() {
    this.getSearchTerm()
      .then((result) => {
        this.setState({
          searchTerm: result
        })
        if (result) return apiClient.artistSearch(result)
      })
      .then((apiResponse) => {
        this.setState({
          searchStatus: 'SUCCESS',
          artist: apiResponse.artistData,
          calendar: apiResponse.artistCalendar,
        })
      })
      .catch(() => {
        this.setState({ searchStatus: 'ERROR' })
      })
  }

  getSearchTerm() {
    return new Promise((resolve) => {
      const url = new URLSearchParams(window.location.search)

      if (url.get('searchTerm')) {
        resolve(url.get('searchTerm'))
      } else {
        chrome.tabs.executeScript({
          code: 'window.getSelection().toString();'
        }, (selection) => {
          resolve(selection[0])
        })
      }
    })
  }

  renderStartScreen() {
    return (
      <div>
        <MainHeader title="Concert Search" />
        <div className={classnames(style.content, style.contentExtraPad)}>
          To search for concerts, please highlight an artist&rsquo;s name and open this extension,
          or right-click, and select the <em>Search for Artist Concerts</em> option in the menu
        </div>
      </div>
    )
  }

  renderSearching() {
    return (
      <div>
        <MainHeader title={this.state.searchTerm} />
        <div className={classnames(style.content, style.contentExtraPad)}>
          Searching for {this.state.searchTerm} 🙏
        </div>
      </div>
    )
  }

  renderError() {
    return (
      <div>
        <MainHeader title={this.state.searchTerm} />
        <div className={classnames(style.content, style.contentExtraPad)}>
          <NoArtistFound searchTerm={this.state.searchTerm} />
        </div>
      </div>
    )
  }

  renderSuccess() {
    return (
      <div>
        <MainHeader title={this.state.artist.displayName} url={this.state.artist.uri} />
        <div className={classnames(style.content)}>
          <ArtistHeader artist={this.state.artist} />
          <SearchResults artist={this.state.artist} calendar={this.state.calendar} />
        </div>
      </div>
    )
  }

  render() {
    if (!this.state.searchTerm) return this.renderStartScreen()
    if (this.state.searchStatus === 'SEARCHING') return this.renderSearching()
    if (this.state.searchStatus === 'ERROR') return this.renderError()
    return this.renderSuccess()
  }
}
