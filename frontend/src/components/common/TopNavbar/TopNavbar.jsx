import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TopNavbar.css';
import logo from '../../../assets/images/logo.png';
import homeIcon from '../../../assets/images/home.svg';
import aboutIcon from '../../../assets/images/about.svg';
import databaseIcon from '../../../assets/images/database.svg';
import servicesIcon from '../../../assets/images/settings.svg';
import contactIcon from '../../../assets/images/contact.png';

const TopNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Define nav items
    const navItems = [
        { path: '/', icon: homeIcon, text: 'Dashboard' },
        { path: '/reports', icon: databaseIcon, text: 'Reports' },
        { path: '/settings', icon: servicesIcon, text: 'Settings' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="top-navbar">
            <div className="logo-container" onClick={() => navigate('/')}>
                <img src={logo} alt="EduBridge Analytics" />
            </div>
            <div className="nav-items-container">
                {navItems.map((item) => (
                    <div
                        key={item.text}
                        className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <img src={item.icon} alt={item.text} />
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
            <div className="logout-container" onClick={() => {/* handle logout logic here */}}>
                <span>Logout</span>
            </div>
        </nav>
    );
};

export default TopNavbar;
