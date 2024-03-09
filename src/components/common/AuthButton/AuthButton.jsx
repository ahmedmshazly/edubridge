// src/components/common/AuthButton.js
import React from 'react';
import './AuthButton.css'; 

const AuthButton = ({ className, children, onClick }) => {
  return (
    <button className={`auth-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default AuthButton;
