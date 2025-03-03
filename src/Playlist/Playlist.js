import React, { useCallback } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

function Playlist(props) {
    const handleNameChange = useCallback((event) => {
        props.onNameChange(event.target.value);
    }, [props.onNameChange]);

    return (
        <div className="Playlist">
            <input className="PlaylistInput" onChange={handleNameChange} placeholder="Enter playlist name" />
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