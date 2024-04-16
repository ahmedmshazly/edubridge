import React from 'react';
import './IdentityCard.css';
import { useLogout } from "../../../hooks/useLogout";
import { useNavigate } from 'react-router-dom';
import userAvatar from '../../../assets/images/avatar.svg'; 

const IdentityCard = () => {

    const { logout } = useLogout();
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="identity-card-container">
            <div className="card-container">
                <img src={userAvatar} alt="User avatar" className="user-avatar" />
                <div className="user-info">
                    <div className="user-name">{user && user.name  ? user.name : 'Guest'}</div>
                    <div className="user-detail">{user && user.email  ? user.email : 'Guest'}</div>
                </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default IdentityCard;
