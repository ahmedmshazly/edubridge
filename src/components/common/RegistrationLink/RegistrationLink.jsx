// src/components/common/RegistrationLink.js
import React from 'react';
import './RegistrationLink.css'; 

const RegistrationLink = () => {
  return (
    <div className="login-link">
      Don't have an account? <a href="/register">Create Account</a>
    </div>
  );
};

export default RegistrationLink;