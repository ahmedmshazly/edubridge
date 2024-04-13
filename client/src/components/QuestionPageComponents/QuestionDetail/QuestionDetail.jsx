import React from 'react';
import './QuestionDetail'
const QuestionDetail = ({ question }) => {
    if (!question) {
        return <p>Select a question to view details.</p>;
    }

    return (
        <div className="question-detail">
            <h2>Question Details</h2>
            <h3>{question.questionText}</h3>
            <div>
                <strong>Categories:</strong>
                <ul>
                    {question.categories.map((cat, index) => (
                        <li key={index}>{cat.categoryName} (Applicable: {cat.applicable ? 'Yes' : 'No'})</li>
                    ))}
                </ul>
            </div>
            <p><strong>Created By:</strong> {question.createdBy}</p> {/* Assuming 'createdBy' might be just an ID or a name */}
            <p><strong>Created At:</strong> {new Date(question.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default QuestionDetail;
