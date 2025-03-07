import React, { useCallback } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

function Playlist(props) {
    const handleNameChange = useCallback((event) => {
        props.onNameChange(event.target.value);
    }, [props.onNameChange]);

    const handlePlaylistChange = useCallback((event) => {
        props.onPlaylistChange(event.target.value);
    }, [props.onPlaylistChnage]);

    const determineInput = () => {
        if (props.playlistId === ""){
            return(
                <input className="PlaylistInput" onChange={handleNameChange} placeholder="Enter playlist name" />
            )
        }
    };

    return (
        <div className="Playlist">

        <select className="PlaylistInput" onChange={handlePlaylistChange}>
            <option value="" key="0">Create New Playlist</option>

            {props.playlists.map((playlist) => {
                return (
                    <option value={playlist.id} key={playlist.id}>{playlist.name}</option>
                );
            })}
        </select>

            {determineInput()}
 
            <TrackList
                tracks={props.playListTracks}
                isRemoval={true}
                onRemove={props.onRemove} />
            <button className="PlaylistButton" onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
};

export default Playlist;