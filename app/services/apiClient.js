import 'isomorphic-fetch'
import * as config from '../constants/config'

const apiClient = {
  post(endpoint) {
    return fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        endpoint
      }),
      headers: new Headers({
        'content-type': 'application/json'
      })
    })
  },

  artistSearch(searchQuery) {
    let artistData
    return new Promise((resolve, reject) => {
      this.post(`search/artists.json?query=${searchQuery}`)
      .then(r => r.json())
      .then((data) => {
        artistData = data.resultsPage.results.artist[0]
        return this.post(`artists/${artistData.id}/calendar.json`)
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
