import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'; // Import CSS file for styling

function HomePage() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [currentPage, searchQuery]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`https://library-backend-lzj3.onrender.com/api/books?page=${currentPage}&limit=15&search=${searchQuery}`);
      setBooks(response.data);
      // Assuming the server sends total count in response headers
      const totalCount = parseInt(response.headers['x-total-count']);
      setTotalPages(Math.ceil(totalCount / 15)); // Calculate total pages based on total count
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
      setTotalPages(0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  return (
    <div>
      <h1>Books</h1>
      <div className="search-bar-container">
        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by title, author, or subject" className="search-bar" />
      </div>
      <div className="card-container">
        {books.map((book) => (
          <div key={book.id} className="card">
            <h2 className="card-title">{book.title}</h2>
            <div className="card-details">
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Subject:</strong> {book.subject}</p>
              <p><strong>Publish Date:</strong> {new Date(book.publish_date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-button">Previous</button>
        <span className="pagination-info"> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">Next</button>
      </div>
    </div>
  );
}

export default HomePage;
