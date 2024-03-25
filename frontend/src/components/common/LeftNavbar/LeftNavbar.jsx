import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './LeftNavbar.css';
import logo from '../../../assets/images/logo.png';
import homeIcon from '../../../assets/images/home.svg';
import aboutIcon from '../../../assets/images/about.svg';
import databaseIcon from '../../../assets/images/database.svg';
import servicesIcon from '../../../assets/images/settings.svg';
import contactIcon from '../../../assets/images/contact.png';

const LeftNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Instantiate useNavigate

    // Define nav items
    const navItems = [
        { path: '/', icon: homeIcon, text: 'Home' },
        { path: '/about', icon: aboutIcon, text: 'About' },
        { path: '/datasets', icon: databaseIcon, text: 'Databases' },
        { path: '/Casestudies', icon: databaseIcon, text: 'Case Studies' },
        { path: '/settings', icon: servicesIcon, text: 'Settings' },
        { path: '/contact', icon: contactIcon, text: 'Contact' },
    ];

    return (
        <nav className="navItems">
            {navItems.map(item => (
                <button
                    key={item.text}
                    className={`navButton ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}>
                    <img src={item.icon} alt={item.text} className="icon" /> {item.text}
                </button>
            ))}
        </nav>
    );
};

export default LeftNavbar;
