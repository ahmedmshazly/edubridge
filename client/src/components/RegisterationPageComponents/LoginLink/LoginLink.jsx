// src/components/common/LoginLink.js
import React from 'react';
import './LoginLink.css'; 

const LoginLink = () => {
  return (
    <div className="login-link">
      Already have an account? <a href="/login">Log in</a>
    </div>
  );
};

export default LoginLink;