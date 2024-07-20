import React from 'react';
import './Book.css';

const Book: React.FC = () => {
    return (
        <div className="book-container">
            <img src="https://via.placeholder.com/150" alt="book cover" className="book-cover" />
            <div className="book-info">
                <p className="book-author">Yazar Adı</p>
                <h3 className="book-title">Kitap Adı</h3>
                <button className="details-button">Detaylar</button>
            </div>
        </div>
    );
};

export default Book;
