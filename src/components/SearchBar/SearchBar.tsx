import React from 'react';
import './SearchBar.css';

const SearchBar: React.FC = () => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search for books..."
                className="search-bar"
            />
        </div>
    );
};

export default SearchBar;