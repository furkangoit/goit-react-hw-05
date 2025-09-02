import React, { useState, useEffect } from "react";
import css from "./Head.module.css";

const Head = ({ onClick, searchValue }) => {
    const [localSearchValue, setLocalSearchValue] = useState(searchValue || "");

    // Sync local state with prop when searchValue changes (e.g., from URL)
    useEffect(() => {
        setLocalSearchValue(searchValue || "");
    }, [searchValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the current input value to parent
        onClick(localSearchValue);
    };

    const handleInputChange = (e) => {
        setLocalSearchValue(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={css.formElements}>
                <input
                    type="text"
                    name="searchMovies"
                    placeholder="Search a movie..."
                    value={localSearchValue}
                    autoComplete="off"
                    className={css.searchBar}
                    onChange={handleInputChange}
                />
                <button type="submit" className={css.searchBtn}>
                    Search
                </button>
            </form>
        </div>
    );
};

export default Head;