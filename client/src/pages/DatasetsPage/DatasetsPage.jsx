import React from "react";
import { useLogout } from "../../hooks/useLogout.jsx";
import { useNavigate } from 'react-router-dom';
import './DatasetsPage.css'; // Ensure the path matches your file structure
import LeftSidebar from "../../components/DatasetsPageComponents/LeftSidebar/LeftSidebar.jsx";
import DatasetsList from "../../components/DatasetsPageComponents/DatasetsContainer/DatasetsContainer.jsx";



export default function DashboardPage() {
    const { logout } = useLogout();
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    return (
        <div className="dashboard-container">
            <LeftSidebar/>
            <div className="right">
            <DatasetsList/>
            </div>

        </div>
    );
}

