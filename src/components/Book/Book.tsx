import React, { useEffect, useState } from 'react';
import './Book.css';
import { fetchBooks } from '../../services/BookService';

interface Book {
    id: string;
    name: string;
    page: number;
    imageUrl: string;
    summary: string;
    authorId: string;
    authorName: string;
    categoryId: string;
}

interface BookProps {
    searchTerm: string;
}

const Book: React.FC<BookProps> = ({ searchTerm }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const booksData = await fetchBooks();
                setBooks(booksData);
            } catch (error) {
                setError('Failed to load books.');
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    if (loading) {
        return <div className="loading-message">Loading books...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="books-grid">
            {filteredBooks.length === 0 ? (
                <div className="no-books-message">No books available.</div>
            ) : (
                filteredBooks.map((book) => (
                    <div className="book-container" key={book.id}>
                        <img
                            src={book.imageUrl || "https://via.placeholder.com/200x300"}
                            alt={`Cover of ${book.name}`}
                            className="book-cover"
                        />
                        <div className="book-info">
                            <p className="book-author">Author: {book.authorName}</p>
                            <h3 className="book-title">{book.name}</h3>
                            <button
                                className="details-button"
                                onClick={() => console.log(`Details of ${book.name}`)}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Book;