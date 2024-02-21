// AdminPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css'; // Import CSS file for styling

function AdminPage() {
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    subject: '',
    publishDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://library-backend-lzj3.onrender.com/api/addBook', formData);
      console.log('Book added successfully:', response.data);
      alert('Book added successfully!');
      setFormData({
        author: '',
        title: '',
        subject: '',
        publishDate: ''
      });
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Admin Page - Post a Book</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
        <label htmlFor="publishDate">Publish Date:</label>
        <input type="date" id="publishDate" name="publishDate" value={formData.publishDate} onChange={handleChange} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AdminPage;
