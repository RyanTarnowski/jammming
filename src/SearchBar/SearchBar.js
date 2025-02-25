import React, { useState, useCallback } from "react";
import "./SearchBar.css";

function SearchBar(props) {
    const [term, setTerm] = useState("");

    const handleTermChange = useCallback((event) => {
        setTerm(event.target.value);
    }, []);

    const search = useCallback(() => {
        props.onSearch(term);
    }, [props.onSearch, term]);

    return (
        <div className="SearchBar">   
            <input onChange={handleTermChange} />
            <button onClick={search}>
                SEARCH
            </button>
        </div>
    );
};

export default SearchBar;