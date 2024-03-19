import React from 'react';
import './LoginPage.css'; // Ensure the path matches your file structure
// images
// import Backgroundimage from '../../assets/images/regestration_background.jpg';
// components and pages
import LoginBg from "../../components/LoginPageComponents/LoginBg/LoginBg.jsx";
import LoginCard from '../../components/LoginPageComponents/LoginCard/LoginCard.jsx'
import { useRedirectAuthenticated } from '../../hooks/useRedirectAuthenticated';


const LoginPage = () => {
  useRedirectAuthenticated('/home')
  return (
    <div className="login--page--container">
      <LoginCard />
      <LoginBg />
    </div>
  );
};

export default LoginPage;