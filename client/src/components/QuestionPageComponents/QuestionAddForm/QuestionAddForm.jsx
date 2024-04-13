import React, { useState, useEffect } from 'react';
import './QuestionAddForm.css';
import { useQuestionsContext } from '../../../hooks/useQuestionsContext';

const QuestionAddForm = ({ setShowListView, setIsLoading, isLoading }) => {
    const { addQuestion } = useQuestionsContext();
    const [questionText, setQuestionText] = useState('');
    const availableCategories = [
        "Receptive Activities", "Active Participation", "Assessments",
        "Progress & Achievements", "General Information", "Structure & Content",
        "Results", "Demographics", "Profile", "Academic Background",
        "Teaching Profile", "Personal Demographics", "Student-Course Interactions",
        "Group Interactions"
    ];
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPerspective, setSelectedPerspective] = useState('');
    const [perspectives, setPerspectives] = useState([]);
    const [datasets, setDatasets] = useState([]);
    const [selectedDatasetId, setSelectedDatasetId] = useState('');
    const [error, setError] = useState('');

    const handleCategorySelection = (event) => {
        const selectedOptions = Array.from(event.target.options).filter(option => option.selected).map(option => option.value);
        setSelectedCategories(selectedOptions);
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        if (!questionText || selectedCategories.length === 0 || !selectedPerspective || !selectedDatasetId) {
            setError('Please fill in all fields.');
            return;
        }

        setIsLoading(true);  // Set loading true at the start of submission
        setError('');  // Clear any previous errors

        const formattedCategories = selectedCategories.map(categoryName => ({
            categoryName
        }));

        const questionData = {
            questionText,
            categories: formattedCategories,
            perspective: selectedPerspective,
            dataset: selectedDatasetId
        };

        try {
            const result = await addQuestion(questionData);
            if (result && result.success) {
                setShowListView(true);
            } else {
                // setError('Failed to add question');
                setShowListView(true);
            }
        } catch (error) {
            setError(error.message || 'Failed to process request');
        } finally {
            setIsLoading(false);  // Reset loading state irrespective of the outcome
        }
    };



    useEffect(() => {
        if (perspectives.length === 1) {
            setSelectedPerspective(perspectives[0]);
        }
    }, [perspectives]);

    useEffect(() => {
        if (datasets.length === 1) {
            setSelectedDatasetId(datasets[0]._id);
        }
    }, [datasets]);

    useEffect(() => {
        const fetchPerspectives = async () => {
            try {
                const response = await fetch('/api/data-categorizations/unique-perspectives');
                const data = await response.json();
                if (data.success) {
                    setPerspectives(data.perspectives);
                } else {
                    throw new Error('Failed to fetch perspectives');
                }
            } catch (error) {
                console.error('Error fetching perspectives:', error.message);
            }
        };

        fetchPerspectives();
    }, []);

    useEffect(() => {
        const fetchDatasets = async () => {
            try {
                const userJSON = localStorage.getItem('user');
                const user = userJSON ? JSON.parse(userJSON) : null;
                const response = await fetch(`/api/datasets/names`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}` // Adjust as needed
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setDatasets(data);
                } else {
                    throw new Error('Failed to fetch datasets');
                }
            } catch (error) {
                console.error('Error fetching datasets:', error.message);
            }
        };

        fetchDatasets();
    }, []);

    return (
        <div className="question-add-form">
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="questionText">Question Text:</label>
                    <textarea id="questionText" value={questionText} onChange={e => setQuestionText(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="categories">Categories:</label>
                    <select id="categories" multiple size="5" value={selectedCategories} onChange={handleCategorySelection} className="multi-select">
                        {availableCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="perspective">Perspective:</label>
                    <select id="perspective" value={selectedPerspective} onChange={e => setSelectedPerspective(e.target.value)}>
                        {perspectives.map(perspective => (
                            <option key={perspective} value={perspective}>{perspective}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="dataset">Dataset:</label>
                    <select id="dataset" value={selectedDatasetId} onChange={e => setSelectedDatasetId(e.target.value)}>
                        {datasets.map(dataset => (
                            <option key={dataset._id} value={dataset._id}>{dataset.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn submit-btn" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Question'}
                </button>
                <button type="button" className="btn cancel-btn" onClick={() => setShowListView(true)}>Cancel</button>
            </form>
        </div>
    );
};

export default QuestionAddForm;
