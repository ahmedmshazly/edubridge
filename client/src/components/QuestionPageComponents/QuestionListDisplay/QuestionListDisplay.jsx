import React from 'react';
import deleteIcon from '../../../assets/images/logo.png'; // Ensure the path is correct
import './QuestionListDisplay.css'; // Ensure CSS is styled appropriately

const QuestionListDisplay = ({ filteredQuestions, deleteQuestion, handleCardClick, isLoading }) => {
    // Handling the loading state
    if (isLoading) {
        return <div className="loading-questions">Loading questions...</div>;
    }
    
    // Handling the case when there are no questions to display after loading is complete
    else if (filteredQuestions.length === 0) {
        return <div className="no-questions">No questions to display.</div>;
    }

    // Function to handle deletion with confirmation
    const handleDelete = (questionId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this question?");
        if (isConfirmed) {
            deleteQuestion(questionId);
        }
    };

    return (
        <div className="question-list">
            {filteredQuestions.map((question) => (
                <div key={question._id} className="question-card">
                    <div className="question-details" onClick={() => handleCardClick(question._id)}>
                        <h4>{question.questionText}</h4>
                        <p>{question.categories.map(cat => cat.categoryName).join(', ')}</p>
                    </div>
                    <button
                        className="delete-question-btn"
                        onClick={() => handleDelete(question._id)}
                    >
                        <img src={deleteIcon} alt="Delete" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default QuestionListDisplay;
