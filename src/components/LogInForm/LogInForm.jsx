// src/components/LogInForm.js
import React from 'react';
import RegistrationLink from '../common/RegistrationLink/RegistrationLink';
import './LogInForm.css'; 

const LogInForm = () => {
  // You might want to handle form submission, input state, validation, etc. here.

  return (
    <form className="login-form">
      <input type="email" name="email" placeholder="Email Address" />
      <input type="password" name="password" placeholder="Enter Password" />
      <div className="remember-me">
        <input type="checkbox" name="rememberMe" id="rememberMe" />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
      <button type="submit">Login</button>
      <RegistrationLink />
    </form>
  );
};

export default LogInForm;
