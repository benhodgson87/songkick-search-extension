import 'isomorphic-fetch'
import * as config from '../constants/config'

const apiClient = {
  requestHeaders() {
    return new Headers({
      'content-type': 'application/json'
    })
  },

  artistSearchPayload(artistName) {
    return {
      endpoint: `search/artists.json?query=${artistName}`,
    }
  },

  artistCalendarPayload(artistId) {
    return {
      endpoint: `artists/${artistId}/calendar.json`,
    }
  },

  postJson(payload) {
    return fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: this.requestHeaders()
    })
  },

  get(search) {
    let artistData
    return new Promise((resolve, reject) => {
      this.postJson(this.artistSearchPayload(search))
      .then(r => r.json())
      .then((data) => {
        artistData = data.resultsPage.results.artist[0]
        return this.postJson(this.artistCalendarPayload(artistData.id))
      })
      .then(r => r.json())
      .then((data) => {
        resolve({
          artistData,
          artistCalendar: data.resultsPage.results,
        })
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}

export default apiClient
