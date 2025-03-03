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
            <input className="SearchInput" onChange={handleTermChange} placeholder="Enter track name" />
            <button className="SearchButton" onClick={search}>
                SEARCH
            </button>
        </div>
    );
};

export default SearchBar;