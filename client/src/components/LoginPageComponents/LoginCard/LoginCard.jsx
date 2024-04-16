import React from 'react';
// Hooks

// Components
import Divider from '../../common/Divider/Divider.jsx';
import LanguageSelector from '../../common/LanguageSelector/LanguageSelector';
import AuthButton from '../../common/AuthButton/AuthButton.jsx';
import LoginForm from '../../../components/LoginPageComponents/LoginForm/LoginForm.jsx';
import GuestButton from '../../common/GuestButton/GuestButton.jsx';

// Styles
import './LoginCard.css';

// Images
import LogoImage from '../../../assets/images/logo.png'; 


const LoginCard = () => {
    return (
        <div className="login-card">
            <LanguageSelector className="login-card__lang-selector"/>
            <div className="login-card__content">
                <img src={LogoImage} alt="Company Logo" className="login-card__logo" />
                <h1>Welcome Back!</h1>
                <p className="login-card__slogan">Get Ready for Better Education Environments</p>
                <AuthButton className="login-card__google-auth">Continue With Google</AuthButton>
                <Divider>Or</Divider>
                <LoginForm />
                <GuestButton className="login-card__guest-button"/>
            </div>
        </div>
    );
};

export default LoginCard;
