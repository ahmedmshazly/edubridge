// src/components/common/LoginLink.js
import React from 'react';
import './RegisterationLink.css'; 

const RegisterationLink = () => {
  return (
    <div className="registeration--link">
      Don't have an account? <a href="/register">Register</a>
    </div>
  );
};

export default RegisterationLink;