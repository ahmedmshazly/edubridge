// src/components/RegisterCard.js
import React from 'react';
import AuthButton from '../common/AuthButton/AuthButton';
import Divider from '../common/Divider/Divider';
import RegisterForm from '../RegisterForm/RegisterForm';
import GuestButton from '../common/GuestButton/GuestButton';
import logoImage from '../../assets/images/logo.png'; // Adjust the path as necessary
import GoogleLogo from '../../assets/images/google.png'; // Adjust the path as necessary

import './RegisterCard.css';
// import './RegisterCard.css'; // Assuming you have CSS file for RegisterCard styles

const RegisterCard = () => {
  return (
    <div className="register-card">
      <div className='card-content'>
        <img src={logoImage} alt='logo' className='logo' />
        <h1>WELCOME!</h1>
        <div className='reg-slogan'>
          <p>Welcome to EduBridge Analytica</p>
          <p>Bridge Theory with Practice in Education</p>
        </div>
        <AuthButton className="google-auth"><img className='google-auth-logo' src={GoogleLogo} alt='google-auth-logo' />Continue With Google</AuthButton>
        <Divider>Or</Divider>
        <RegisterForm />
      </div>

      <div className="guest-btn">
        <GuestButton />
      </div>
    </div>
  );
};

export default RegisterCard;
