import 'isomorphic-fetch'
import * as config from '../constants/config'

const apiClient = {
  createEndpoint(path) {
    const keySeparator = (path.includes('?') ? '&' : '?')
    const apiKeyString = `${keySeparator}apikey=${config.API_KEY}`
    return `${config.API_ENDPOINT}/${path}${apiKeyString}`
  },

  get(endpoint) {
    return fetch(this.createEndpoint(endpoint), {
      method: 'get',
    })
  },

  artistSearch(searchQuery) {
    let artistData
    return new Promise((resolve, reject) => {
      this.get(`search/artists.json?query=${searchQuery}`)
      .then(r => r.json())
      .then((data) => {
        artistData = data.resultsPage.results.artist[0]
        return this.get(`artists/${artistData.id}/calendar.json`)
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
