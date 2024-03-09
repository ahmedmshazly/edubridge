import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Import the RegisterPage component
// import RegisterPage from './pages/RegisterPage/RegisterPage';
import LogInPage from './pages/LogInPage/LogInPage';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode is a tool for highlighting potential problems in an application.
  // It's okay to omit it, but it's a good practice to use it during development.
  <React.StrictMode>
    {/* <LogInPage /> */}
    <RegisterPage />
  </React.StrictMode>
);

// console.log(<RegisterPage />);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
