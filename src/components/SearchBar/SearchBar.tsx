import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search for books..."
                value={searchTerm}
                onChange={handleChange}
                className="search-bar"
            />
        </div>
    );
};

export default SearchBar;