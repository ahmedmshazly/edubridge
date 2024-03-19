import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { logout } = useLogout();
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const handleClick = () => {
        logout();
        navigate('/login');
    }
    // Parse the user information from localStorage
    console.log("user: ",user.name)
    return (
        <>
            <h1>HOME PAGE</h1>
            {/* Ensure user and user.name  exist before trying to display name */}
            <h3>Hello {user && user.name  ? user.name : 'Guest'}</h3>
            <button onClick={handleClick}>Logout</button>
        </>
    );
}
