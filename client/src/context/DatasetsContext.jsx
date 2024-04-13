import { createContext, useReducer, useEffect } from 'react';

export const DatasetsContext = createContext();

export const datasetsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state, loading: action.payload
            };
        case 'SET_DATASETS':
            return {
                ...state,
                datasets: action.payload.datasets,
                totalStudents: action.payload.totalStudents
            };
        case 'ADD_DATASET':
            return {
                ...state,
                datasets: [action.payload, ...state.datasets],
                totalStudents: state.totalStudents + action.payload.studentCount
            };
        case 'REMOVE_DATASET':
            const removedDataset = state.datasets.find(dataset => dataset._id === action.payload);
            const newTotalStudents = state.totalStudents - (removedDataset ? removedDataset.studentCount : 0);
            return {
                ...state,
                datasets: state.datasets.filter(dataset => dataset._id !== action.payload),
                totalStudents: newTotalStudents
            };
        default:
            return state;
    }
};

export const DatasetsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(datasetsReducer, { datasets: [], totalStudents: 0, loading: false });

    useEffect(() => {
        const fetchDatasets = async () => {
            dispatch({ type: 'SET_LOADING', payload: true }); // Start loading
            const userJSON = localStorage.getItem('user');
            const user = userJSON ? JSON.parse(userJSON) : null;

            if (user && user.token) {
                try {
                    const response = await fetch('/api/datasets', {
                        headers: { 'Authorization': `Bearer ${user.token}` },
                    });
                    if (!response.ok) throw new Error('Network response was not ok');

                    const { datasets, totalStudents } = await response.json();
                    dispatch({
                        type: 'SET_DATASETS',
                        payload: { datasets, totalStudents }
                    });
                } catch (error) {
                    console.error('There has been a problem with your fetch operation:', error);
                }
            }
            dispatch({ type: 'SET_LOADING', payload: false }); // End loading

        };

        fetchDatasets();
    }, []);


    // Function to delete a dataset
    const deleteDataset = async (_id) => {
        const userJSON = localStorage.getItem('user');
        const user = userJSON ? JSON.parse(userJSON) : null;

        if (user && user.token) {
            try {
                const response = await fetch(`/api/datasets/${_id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                });
                if (!response.ok) throw new Error('Failed to delete dataset');

                dispatch({ type: 'REMOVE_DATASET', payload: _id });
            } catch (error) {
                console.error('Error deleting dataset:', error);
            }
        }
    };

    // Function to add a dataset
    const addDataset = async (formData) => {
        const userJSON = localStorage.getItem('user');
        const user = userJSON ? JSON.parse(userJSON) : null;

        if (user && user.token) {
            try {
                const response = await fetch('/api/datasets/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                    body: formData,
                });
                if (!response.ok) throw new Error('Failed to add dataset');

                const addedDataset = await response.json();
                dispatch({ type: 'ADD_DATASET', payload: addedDataset });
            } catch (error) {
                console.error('Error adding dataset:', error);
                throw error; // Rethrow the error if you want to handle it (e.g., show an error message) in the component where addDataset is called
            }
        }
    };

    return (
        <DatasetsContext.Provider value={{ ...state, dispatch, deleteDataset, addDataset }}>
            {children}
        </DatasetsContext.Provider>
    );
};