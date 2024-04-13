// src/pages/NotFoundPage/NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';


const NotFoundPage = () => {
    return (
      <div className="not-found-container">
        <h1 className="not-found-title">404 - Not Found!</h1>
        <p className="not-found-text">Sorry, the page you are looking for does not exist.</p>
        <p>You can always go back to the <Link to="/" className="not-found-link">homepage</Link>.</p>
      </div>
    );
  };

export default NotFoundPage;
