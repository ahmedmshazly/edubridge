import React from 'react';
import './RegisterationPage.css'; // Ensure the path matches your file structure
// images
// import Backgroundimage from '../../assets/images/regestration_background.jpg';
// components and pages
import RegisterationBg from "../../components/RegisterationPageComponents/RegisterationBg/RegisterationBg.jsx";
import RegistrationCard from '../../components/RegisterationPageComponents/RegistrationCard/RegistrationCard.jsx';
import { useRedirectAuthenticated } from '../../hooks/useRedirectAuthenticated';


const RegisterationPage = () => {
  useRedirectAuthenticated('/home'); 
  return (
    <div className="registeration--page--container">
      <RegisterationBg />
      <RegistrationCard />
    </div>
  );
};

export default RegisterationPage;