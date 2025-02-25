import React, { use, useCallback } from "react";
import "./Track.css";

function Track(props) {
    const addTrack = useCallback((event) => {
        props.onAdd(props.track);
    }, [props.onAdd, props.track]);

    const removeTrack = useCallback((event) => {
        props.onRemove(props.track);
    }, [props.onRemove, props.track]);

    const determineButton = () => {
        if (props.isRemoval) {
            return (
                <button className="RemoveTrack" onClick={removeTrack}>
                    -
                </button>
            )
        }

        return (
            <button className="AddTrack" onClick={addTrack}>
                +
            </button>
        )
    };

    return (
        <div className="Track">
            <div className="TrackInfo">
                <h3>{props.track.name}</h3>
                <p>
                    {props.track.artist} | {props.track.album}
                </p>
            </div>
            {determineButton()}
        </div>
    );
};

export default Track;