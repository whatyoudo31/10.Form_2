import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
    const [searchValue, setSearcValue] = useState("");
    onSearch(searchValue);
    return (
        <div className="form-outline">
            <input
                type="search"
                id="search"
                className="form-control"
                placeholder="Найти того, кто тусанет"
                aria-label="Search"
                onChange={(evt) => setSearcValue(evt.target.value)}
            />
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func
};

export default SearchBar;
