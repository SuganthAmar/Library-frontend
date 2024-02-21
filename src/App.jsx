import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './Admin/AdminPage';
import HomePage from './HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Define other routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
