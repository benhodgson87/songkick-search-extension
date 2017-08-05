# Songkick Concert Search

A Chrome Extension for searching an artist's upcoming tour dates just by highlighting their name.

Built over the course of about 6 hours at the August 2017 Songkick Hackday ⛏

<img src="https://pbs.twimg.com/media/DGTtZzbUMAAgJSa.jpg" width="640" height="auto" alt="concert search extension screenshot showing SZA tour dates" />

Built with React. Originally generated using [react-chrome-extension-boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate).

API requests are made via a [proxy Express server](https://github.com/benhodgson87/sk-api-proxy) hosted on Heroku, which gets around the lack of Songkick API CORS support, and keeps the API key from being passed openly from the client.

# Commands

`yarn dev` to spin up a dev environment.

`yarn build` to create a packaged Chrome extension


# Future Work

* **Actually write some unit tests!** (It *was* a hackday project)
* Store state in Redux rather than component state
* Show a Spotify web player for the artist
* Get additional artist data, social links, etc. from MusicBrainz
* Use Songkick oAuth to let a user track artists and mark event attendance from within the extension
