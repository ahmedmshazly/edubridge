import React from 'react';
import './RegistrationCard.css';
// components and pages
import Divider from '../../common/Divider/Divider.jsx';
import LanguageSelector from '../../common/LanguageSelector/LanguageSelector';
import AuthButton from '../../common/AuthButton/AuthButton.jsx';
import RegisterationForm from '../../../components/RegisterationPageComponents/RegisterForm/RegisterForm.jsx';
import GuestButton from '../../common/GuestButton/GuestButton.jsx';


// Images
import LogoImage from '../../../assets/images/logo.png'; 

const RegistrationCard = () => {
    return (
        <div className="registeration--card">
            <LanguageSelector className="lang--selector"/>
            <div className='registeration--card--content'>
                <img src={LogoImage} alt='registeration--card--logo' className='registeration--card--logo' />
                <h1>WELCOME BACK!</h1>
                <div className='registeration--card--slogan'>
                    <p>Welcome to EduBridge Analytica.</p>
                    <p>Bridge Theory with Practice in Education</p>
                </div>
                <AuthButton className="registeration--card--google-auth">Continue With Google</AuthButton>
                <Divider>Or</Divider>
                <RegisterationForm />
                <GuestButton/>
            </div>
        </div>
    );
};

export default RegistrationCard;