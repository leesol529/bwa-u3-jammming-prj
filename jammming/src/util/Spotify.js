// localhost:3000/spotify
//      | redirect(backToUrl:localhost:3000/spotify)
//      v
// https://accounts.spotify.com/authorize
//      provides crendentials
//      user clicks login
//      | redirects back to localhost:3000/spotify
//      v
// localhost:3000/spotify?access_token=1242141lk;dsafn&expires_in=124214
//      now we have the access token in the uri
//      so we save it and return it

// localhost:3000 local server runnignn node app - react App
// localhost:3000/spotify
// GET html, js, css

let accessToken;
const clientId = '65282340349147b4b22557673e4cc85f';
const redirectUri = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
    const token = window.location.href.match(/access_token=([^&]*)/)
    let expiry = window.location.href.match(/expires_in=([^&]*)/)
    if (token && expiry) { // been redirected  backfrom spotify
        console.log("been redirected from spotify")
        window.history.pushState('Access Token', null, '/'); // wipe the url
        return accessToken = token[1];
        } else {
        // redirect to spotify to login
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-modify-public&response_type=token`;
      }
    },

  search: async function(term) {
    let headers = {'Authorization' : `Bearer ${this.getAccessToken()}`}
    console.log(this.getAccessToken())
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers : headers
    }).then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.tracks.items){
        console.log(jsonResponse.tracks)
        return jsonResponse.tracks.items.map(track => {
          return {ID: track.id,
                  Name: track.name,
                  Artist: track.artists[0].name,
                  Album: track.album.name,
                  URI: track.uri}
      });
    }
  })},

  savePlaylist : async function(name, uriList) {
    const body = JSON.stringify({uris: uriList})
    if(!name || !uriList) {
      return;
    }
    let headers = {'Authorization' : `Bearer ${this.getAccessToken()}`};
    let userId;
    return fetch('https://api.spotify.com/v1/me', {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: name})
        }).then(response => response.json())
        .then(jsonResponse => {
          console.log(jsonResponse);
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: body
            });
        });
    });
  }
}

console.log(Spotify.getAccessToken())


export default Spotify;
