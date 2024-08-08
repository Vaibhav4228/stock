// src/pages/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <h1>Welcome to the Stock Market App</h1>
        <p>Get real-time stock data and visualize stock trends with our application.</p>
      </div>
    </div>
  );
};

export default HomePage;
