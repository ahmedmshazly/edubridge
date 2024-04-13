// src/components/RegisterForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLink from '../../RegisterationPageComponents/LoginLink/LoginLink.jsx';
import { useRegister } from '../../../hooks/useRegister.jsx';
import './RegisterForm.css';
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, isLoading, error } = useRegister();

  const navigate = useNavigate();
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    // This effect runs whenever the error state changes.
    if (error) {
      setServerError(error); // Set the server-side error for display
    } else if (!isLoading && !error && Object.keys(touched).length !== 0) {
      // If there's no error and loading is false, navigate or do another action
      console.log("Registration successful, navigate or perform success action");
      navigate('/login'); 
    }
  }, [error, isLoading]);

  useEffect(() => {
    validateForm();
  }, [formData, touched]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setServerError(''); // Reset server-side error when user modifies any field
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (touched.fullName && !formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }

    if (touched.email && !formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (touched.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (touched.password && !formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (touched.password && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    if (touched.passwordConfirm && formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    setIsFormValid(isValid && Object.keys(touched).length !== 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      await register(formData.fullName, formData.email, formData.password);
      // No need to manually check errors here; useEffect will handle it
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} onBlur={handleBlur} />
      {errors.fullName && <p className="error">{errors.fullName}</p>}
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} />
      {errors.email && <p className="error">{errors.email}</p>}
      <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleInputChange} onBlur={handleBlur} />
      {errors.password && <p className="error">{errors.password}</p>}
      <input type="password" name="passwordConfirm" placeholder="Confirm Password" value={formData.passwordConfirm} onChange={handleInputChange} onBlur={handleBlur} />
      {errors.passwordConfirm && <p className="error">{errors.passwordConfirm}</p>}
      <div className="remember-me">
        {/* <input type="checkbox" name="rememberMe" id="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} /> */}
        {/* <label htmlFor="rememberMe">Remember Me</label> */}
      </div>
      {serverError && <p className="error server-error">{serverError}</p>}
      <button type="submit" disabled={!isFormValid || isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      <LoginLink />
    </form>
  );
};

export default RegisterForm;