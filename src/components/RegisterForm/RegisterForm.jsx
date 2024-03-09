// src/components/RegisterForm.js
import React from 'react';
import LoginLink from '../common/LoginLink/LoginLink';
import './RegisterForm.css'; 

const RegisterForm = () => {
  // You might want to handle form submission, input state, validation, etc. here.

  return (
    <form className="register-form">
      <input type="text" name="fullName" placeholder="Full Name" />
      <input type="email" name="email" placeholder="Email Address" />
      <input type="password" name="password" placeholder="Enter Password" />
      <input type="password" name="password-confirm" placeholder="Confirm Password" />
      <div className="remember-me">
        <input type="checkbox" name="rememberMe" id="rememberMe" />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
      <button type="submit">Register</button>
      <LoginLink />
    </form>
  );
};

export default RegisterForm;
