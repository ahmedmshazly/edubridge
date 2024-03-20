import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate here
import RegistrationPage from "./pages/RegisterationPage/RegisterationPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Ensure this component is updated as per initial instructions
import Home from './pages/home.jsx';

import './App.css';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} /> {/* Redirect "/" to "/home" */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    {/* Add other protected routes here */}
                </Route>
                <Route path="*" element={<NotFoundPage />} /> {/* Handle all unmatched routes */}
            </Routes>
        </Router>
    );
}

export default App;
