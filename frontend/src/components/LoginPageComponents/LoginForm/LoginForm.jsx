// Imports
import React, { useState, useEffect } from 'react';
// Hooks
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../hooks/useLogin'; // Import useLogin hook

// Components
import RegistrationLink from '../../LoginPageComponents/RegisterationLink/RegisterationLink.jsx';

// functions
// TODO: import { validateEmail, validatePassword } from '../../../utils/validators'; // Assume these are implemented

// Styles
import './LoginForm.css';

// Images

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [serverError, setServerError] = useState('');
  const { login, isLoading, error } = useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    // This effect runs whenever the error state changes.
    if (error) {
      setServerError(error); // Set the server-side error for display
    } else if (!isLoading && !error && Object.keys(touched).length !== 0) {
      // If there's no error and loading is false, navigate or do another action
      console.log("Login successful, navigate or perform success action");
      navigate('/home'); 
    }
  }, [error, isLoading]);

  useEffect(() => {
    validateForm();
  }, [formData, touched]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setServerError(''); // Reset server-side error upon any user input modification
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
    let newErrors = {};

    if (touched.email && !formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (touched.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (touched.password && !formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid && Object.keys(touched).length !== 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    await login(formData.email, formData.password);
    // No need to check for errors here, useEffect will handle it
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} />
      {errors.email && <p className="error">{errors.email}</p>}
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} onBlur={handleBlur} />
      {errors.password && <p className="error">{errors.password}</p>}
      {serverError && <p className="error server-error">{serverError}</p>}
      <button type="submit" disabled={!isFormValid || isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
      <RegistrationLink />
    </form>
  );
};

export default LoginForm;
""
