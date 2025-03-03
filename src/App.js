import logo from './logo.svg';
import './App.css';
import { useCallback, useState } from 'react';

import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import Spotify from './Ulility/SpotifyAPI';

function App() {
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResultsData);
  }, []);

  const addTrack = useCallback((track) => {
    if (playListTracks.some((savedTrack) => savedTrack.id === track.id))
      return

    setPlayListTracks((prevTracks) => [...prevTracks, track]);
  }, [playListTracks]);

  const removeTrack = useCallback((track) => {
    setPlayListTracks((prevTracks) => prevTracks.filter((currentTrack) => currentTrack.id !== track.id));
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    if (playlistName === ""){
      alert("Please enter a playlist name before saving.");
      return;
    }
    const trackURIs = playListTracks.map((track) => track.uri);

    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("");
      setPlayListTracks([]);
    });

  }, [playlistName, playListTracks]);


  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={search} />
      <div className="SplitPanel">
        <SearchResults SearchResultsData={searchResultsData} onAdd={addTrack} />
        <Playlist playlistName={playlistName} playListTracks={playListTracks} onNameChange={updatePlaylistName} onRemove={removeTrack} onSave={savePlaylist} />
      </div>
    </div>
  );
}

export default App;