// src/pages/RegisterPage.js
import React from 'react';
import RegBackground from './../../assets/images/regestration_background.jpg'; // Adjust the path as necessary
import Header from '../../components/common/Header/Header';
import RegisterCard from '../../components/RegisterCard/RegisterCard';
import BackgroundPhoto from '../../components/common/BackgroundPhoto/BackgroundPhoto';
import './RegisterPage.css'; // Assuming you have a CSS file for page-specific styles

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className='register-card bg'>
      <BackgroundPhoto backgroundImage={RegBackground}/>
      </div>
      <div className='register-card card'>
      <Header />
      <RegisterCard />
      </div>
    </div>
  );
};

export default RegisterPage;
