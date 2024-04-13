import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from 'react-router-dom';
import './QuestionsPage.css'
// import './QuestionsPage.css'; // Ensure the path matches your file structure
import LeftSidebar from "../../components/DatasetsPageComponents/LeftSidebar/LeftSidebar";
import QuestionsContainer from "../../components/QuestionPageComponents/QuestionsContainer/QuestionsContainer";

export default function QuestionsPage() {
    const { logout } = useLogout();
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    return (
        <div className="questions-page-container">
            <LeftSidebar />
            <div className="right">
                <QuestionsContainer />
            </div>
        </div>
    );
}
