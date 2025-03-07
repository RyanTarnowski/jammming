import logo from './logo.svg';
import './App.css';
import { use, useCallback, useState } from 'react';

import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import Spotify from './Ulility/SpotifyAPI';

function App() {
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [originalPlayListTracks, setOriginalPlayListTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [playlistLists, setPlaylistLists] = useState([]);
  const [connected, setConnected] = useState(false);

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
    if (playlistName === "" && playlistId === ""){
      alert("Please enter a playlist name before saving.");
      return;
    }

    const addTrackURIs = playListTracks.filter(item => originalPlayListTracks.every(oitem => oitem.id !== item.id)).map((track) => track.uri);
    const removeTrackURIs = originalPlayListTracks.filter(item => playListTracks.every(oitem => oitem.id !== item.id)).map((track) => ({uri: track.uri})); 
 
    Promise.all([
      Spotify.savePlaylist(playlistName, playlistId, addTrackURIs, 'POST'),
      Spotify.savePlaylist(playlistName, playlistId, removeTrackURIs, 'DELETE')
    ]).then(() => {
      setPlayListTracks([]);
      setOriginalPlayListTracks([]);

      if (playlistId!==""){
        getPlayListById(playlistId);
      }
      else {
        getUserPlaylistsClick();
        setPlaylistName("");
      }
    });

  }, [playlistName, playlistId, playListTracks, originalPlayListTracks]);

  const getUserPlaylistsClick = useCallback(() => {
    Spotify.getUserPlaylists().then(setPlaylistLists).then(setConnected(true));
  }, []);

  const getPlayListById = useCallback((playlistId) => {
    setPlayListTracks([]);
    setPlaylistId(playlistId);
    if (playlistId !== ""){
      Spotify.getPlaylist(playlistId).then(setPlayListTracks);
      Spotify.getPlaylist(playlistId).then(setOriginalPlayListTracks); //Don't like calling this twice, but struggling to assign it the value of playListTracks once the first API call is complete. Maybe try an array slice?
    }
  }, []);

  const determineConnection = () => {
    if (!connected){
        return(
          <button className='ConnectButton' onClick={getUserPlaylistsClick}>Connect to Spofity</button>
        )
    }
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      {determineConnection()}
      {connected && <SearchBar onSearch={search} />}
      <div className="SplitPanel">
      {connected && <SearchResults SearchResultsData={searchResultsData} onAdd={addTrack} />}
      {connected && <Playlist playlists={playlistLists} playlistName={playlistName} playlistId={playlistId} playListTracks={playListTracks} onPlaylistChange={getPlayListById} onNameChange={updatePlaylistName} onRemove={removeTrack} onSave={savePlaylist} />}
      </div>
    </div>
  );
}

export default App;