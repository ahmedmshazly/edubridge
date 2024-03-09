// src/pages/RegisterPage.js
import React from 'react';
import Header from '../../components/common/Header/Header';
import LogInCard from '../../components/LogInCard/LogInCard';
import BackgroundPhoto from '../../components/common/BackgroundPhoto/BackgroundPhoto';
import './LogInPage.css';
import RegBackground from './../../assets/images/login_pg.jpg'; // Adjust the path as necessary

const LogInPage = () => {
  return (
    <div className="login-page">
      <div className='login-card bg'>
        <BackgroundPhoto backgroundImage={RegBackground} />
      </div>
      <div className='login-card card'>
        <Header />
        <LogInCard />
      </div>
    </div>
  );
};

export default LogInPage;
