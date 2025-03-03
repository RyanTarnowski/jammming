const clientId = ''; //Enter your id here
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]+)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);  //sets the window timeout to be the expiration in milliseconds
            window.history.pushState('Access Token', null, '/'); //clears parameters

            return accessToken
        }
        else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&query=${term}`, 
            {
                headers: 
                {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(
            response => {
                return response.json();
            }
        ).then(
            jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }

                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
        });
            /*
            setSearchResultsData([
              {
                  id: 1,
                  name: "TrackName1",
                  artist: "Artist1",
                  album: "Album1",
                  uri: "url1"
              },
              {
                  id: 2,
                  name: "TrackName2",
                  artist: "Artist2",
                  album: "Album2",
                  uri: "url2"
              },
              {
                id: 3,
                name: "SuperLong__________________TrackName3",
                artist: "SuperLong__________________Artist3",
                album: "SuperLong__________________Album3",
                uri: "SuperLong__________________url3"
            },
            ]); */
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', 
            {
                headers: headers
            }
        ).then(
            response => response.json()
        ).then(
            jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
                    {
                        headers: headers, 
                        method: 'POST', 
                        body: JSON.stringify({name: name})
                    }
                ).then(
                    response => response.json()
                ).then(
                    jsonResponse => {
                        const playlistId = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                            {
                                headers: headers, 
                                method: 'POST', 
                                body: JSON.stringify({uris: trackURIs})
                            }
                        );
                    }
                );
            }
        );
    }

};

export default Spotify;