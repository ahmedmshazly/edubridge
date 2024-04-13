import React from 'react';
import './AuthButton.css';
import GoogleLogo from '../../../assets/images/google.png';

const AuthButton = ({ className = '', children, onClick }) => {
  return (
    <button className={`auth-button ${className}`} onClick={onClick}>
      <img className='auth-button__google-logo' src={GoogleLogo} alt='Sign in with Google' />
      {children}
    </button>
  );
};


export default AuthButton;
