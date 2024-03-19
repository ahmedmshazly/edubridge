// src/components/common/AuthButton.js
import React from 'react';
import './AuthButton.css'; 

// Images
import GoogleLogo from '../../../assets/images/google.png';


const AuthButton = ({ className, children, onClick }) => {
  return (
    <button className={`auth--button ${className}`} onClick={onClick}>
      <img className='auth--button--google-logo' src={GoogleLogo} alt='google-auth-logo' />{children}
    </button>
  );
};

export default AuthButton;
