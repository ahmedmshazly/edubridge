import React from 'react'; 
import { createContext, useReducer, useEffect } from 'react';

export const QuestionsContext = createContext();

export const questionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_QUESTIONS':
            console.log("data.questions in reducer:", action.payload);
            return { ...state, questions: action.payload };
        case 'ADD_QUESTION':
            return { ...state, questions: [action.payload, ...state.questions] };
        case 'REMOVE_QUESTION':
            return { ...state, questions: state.questions.filter(question => question._id !== action.payload) };
        case 'UPDATE_QUESTION':
            return {
                ...state,
                questions: state.questions.map(question =>
                    question._id === action.payload._id ? action.payload : question)
            };
        default:
            return state;
    }
};

export const QuestionsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(questionsReducer, { questions: [], loading: false });

    useEffect(() => {
        const fetchQuestions = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const userJSON = localStorage.getItem('user');
                const user = userJSON ? JSON.parse(userJSON) : null;

                if (user && user.token) {
                    const response = await fetch(`/api/questions/user`, {
                        headers: { 'Authorization': `Bearer ${user.token}` },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch questions');
                    }
                    const data = await response.json();
                    console.log("Fetched data:", data.data);
                    dispatch({ type: 'SET_QUESTIONS', payload: data.data });
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        fetchQuestions();
    }, []);

    const addQuestion = async (question) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const userJSON = localStorage.getItem('user');
            const user = userJSON ? JSON.parse(userJSON) : null;
            // Assume API endpoint for adding a question
            console.log(JSON.stringify(question))
            const response = await fetch('/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // Adjust as needed
                },
                body: JSON.stringify(question)
            });

            const newQuestion = await response.json();
            if (response.ok) {
                dispatch({ type: 'ADD_QUESTION', payload: newQuestion });
            } else {
                throw new Error('Failed to add question');
            }
        } catch (error) {
            console.error('Add question error:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const removeQuestion = async (questionId) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const userJSON = localStorage.getItem('user');
            const user = userJSON ? JSON.parse(userJSON) : null;
            // Assume API endpoint for deleting a question
            const response = await fetch(`/api/questions/${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}` // Adjust as needed
                }
            });
            if (response.ok) {
                dispatch({ type: 'REMOVE_QUESTION', payload: questionId });
            } else {
                throw new Error('Failed to delete question');
            }
        } catch (error) {
            console.error('Delete question error:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    return (
        <QuestionsContext.Provider value={{ ...state, dispatch, addQuestion, removeQuestion }}>
            {children}
        </QuestionsContext.Provider>
    );
};
