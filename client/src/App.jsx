import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Pages
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegistrationPage from "./pages/RegisterationPage/RegisterationPage.jsx"; // Corrected typo
import Home from './pages/Home.jsx'; // Ensure consistency in naming and file structure
import Other from './pages/Other.jsx'; // Ensure consistency in naming and file structure
import DatasetsPage from './pages/DatasetsPage/DatasetsPage.jsx';
import QuestionPage from './pages/QuestionsPage/QuestionsPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
// Components
import ProtectedRoute from "./components/ProtectedRoute.jsx";
// Styles
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                {/* Protected routes wrapper */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/other" element={<Other />} />
                    <Route path="/datasets" element={<DatasetsPage />} />
                    <Route path="/questions" element={<QuestionPage />} />
                    {/* Additional protected routes can be nested here */}
                </Route>
                {/* Catch-all for unmatched routes */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
