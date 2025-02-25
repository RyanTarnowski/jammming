import logo from './logo.svg';
import './App.css';
import { useCallback, useState } from 'react';

import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';

function App() {
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [searchResultsData, setSearchResultsData] = useState([]);

  const search = useCallback((term) => {
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
    ]);
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
    const trackURIs = playListTracks.map((track) => track.uri);

    alert(trackURIs);
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