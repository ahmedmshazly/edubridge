import React from 'react';
import './LoginCard.css';
// components and pages
import Divider from '../../common/Divider/Divider.jsx';
import LanguageSelector from '../../common/LanguageSelector/LanguageSelector';
import AuthButton from '../../common/AuthButton/AuthButton.jsx';
import LogInForm from '../../../components/LoginPageComponents/LoginForm/LoginForm.jsx';
import GuestButton from '../../common/GuestButton/GuestButton.jsx';
// Images
import LogoImage from '../../../assets/images/logo.png'; 
import BackgroundImage from '../../../assets/images/logo.png'; // Update the path as needed

const LoginCard = () => {
    return (
        <div className="login--card">
            <LanguageSelector className="lang--selector"/>
            <div className='login--card--content'>
                <img src={LogoImage} alt='login--card--logo' className='login--card--logo' />
                <h1>WELCOME BACK!</h1>
                <div className='login--card--slogan'>
                    <p>Get Ready for Better Education Environments</p>
                </div>
                <AuthButton className="login--card--google-auth">Continue With Google</AuthButton>
                <Divider>Or</Divider>
                <LogInForm />
                <GuestButton/>
            </div>
        </div>
    );
};

export default LoginCard;