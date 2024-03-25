import React from 'react';
// Hooks
import { useRedirectAuthenticated } from '../../hooks/useRedirectAuthenticated';
// Components
import LoginCard from '../../components/LoginPageComponents/LoginCard/LoginCard.jsx';
import LoginBg from "../../components/LoginPageComponents/LoginBg/LoginBg.jsx";
// Styles
import './LoginPage.css';

/**
 * LoginPage renders the login interface and uses a custom hook to redirect
 * authenticated users to the home page. It consists of a LoginCard for user input
 * and a LoginBg component for displaying background or thematic imagery.
 */
const LoginPage = () => {
  // Redirects authenticated users to the home page.
  useRedirectAuthenticated('/home');

  return (
    <div className="login-page-container">
      <LoginCard />
      <LoginBg />
    </div>
  );
};

export default LoginPage;
