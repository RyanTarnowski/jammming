import React, { useCallback } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

function Playlist(props) {
    const handleNameChange = useCallback((event) => {
        props.onNameChange(event.target.value);
    }, [props.onNameChange]);

    return (
        <div className="Playlist">
            <input className="PlaylistInput" onChange={handleNameChange} defaultValue={"New Playlist"} />
            <button className="PlaylistButton" onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>
            <TrackList
                tracks={props.playListTracks}
                isRemoval={true}
                onRemove={props.onRemove} />

        </div>
    );
};

export default Playlist;