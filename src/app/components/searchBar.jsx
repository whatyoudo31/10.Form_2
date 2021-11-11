import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch, search }) => {
    return (
        <div className="form-outline">
            <input
                type="search"
                id="search"
                className="form-control"
                placeholder="Найти того, кто тусанет"
                aria-label="Search"
                value={search}
                onChange={(evt) => onSearch(evt.target.value)}
            />
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func,
    search: PropTypes.string
};

export default SearchBar;
