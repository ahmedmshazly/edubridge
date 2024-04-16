import React, { useState, useEffect } from 'react';
import './QuestionDetail.css';

const QuestionDetail = ({ question }) => {
    const [q, setQuestion] = useState(question);

    useEffect(() => {
        setQuestion(question); // Update the local state whenever the 'question' prop changes
    }, [question]);

    if (!q) return <p>Select a question to view details.</p>;
    if (!q.questionText) return <p>No question found.</p>;

    return (
        <div className="question-detail">
            <h2>Question Details</h2>
            <h3>{q.questionText}</h3>
            <div>
                <strong>Categories:</strong>
                <ul>
                    {q.categories.map((cat, index) => (
                        <li key={index}>{cat.categoryName} (Applicable: {cat.applicable ? 'Yes' : 'No'})</li>
                    ))}
                </ul>
            </div>
            <p><strong>Created By:</strong> {q.createdBy}</p>
            <p><strong>Answer:</strong> {q.answer}</p>
            <p><strong>Created At:</strong> {new Date(q.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default QuestionDetail;
