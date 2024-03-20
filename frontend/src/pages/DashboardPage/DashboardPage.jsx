import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css'; // Ensure the path matches your file structure
import LeftSidebar from "../../components/DashboardPageComponents/LeftSidebar/LeftSidebar";
import DatasetsList from "../../components/DashboardPageComponents/DatasetsList/DatabaseList.jsx";
// images

// components and pages


export default function DashboardPage() {
    const { logout } = useLogout();
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const handleClick = () => {
        logout();
        navigate('/login');
    }
    // Parse the user information from localStorage
    return (
        <div className="dashboard-container">
            <LeftSidebar/>
            <div className="right">
            <DatasetsList/>
            </div>

        </div>
    );
}

