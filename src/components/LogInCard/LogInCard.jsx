// src/components/loginCard.js
import React from 'react';
import AuthButton from '../common/AuthButton/AuthButton';
import Divider from '../common/Divider/Divider';
import LogInForm from '../LogInForm/LogInForm';
import GuestButton from '../common/GuestButton/GuestButton';
import logoImage from '../../assets/images/logo.png'; // Adjust the path as necessary
import GoogleLogo from '../../assets/images/google.png'; // Adjust the path as necessary

import './LogInCard.css';
// import './loginCard.css'; // Assuming you have CSS file for loginCard styles

const LogInCard = () => {
  return (
    <div className="login-card">
      <div className='card-content'>
        <img src={logoImage} alt='logo' className='logo' />
        <h1>WELCOME BACK!</h1>
        <div className='log-slogan'>
          <p>Get Ready for Better Education Environments</p>
        </div>
        <AuthButton className="google-auth"><img className='google-auth-logo' src={GoogleLogo} alt='google-auth-logo' />Continue With Google</AuthButton>
        <Divider>Or</Divider>
        <LogInForm />
      </div>

      <div className="guest-btn">
        <GuestButton />
      </div>
    </div>
  );
};

export default LogInCard;
