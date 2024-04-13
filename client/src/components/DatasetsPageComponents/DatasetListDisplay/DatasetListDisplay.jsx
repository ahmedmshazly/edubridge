import React from 'react';
import deleteIcon from '../../../assets/images/logo.png'; // Ensure the path is correct
import './DatasetListDisplay.css'; // Make sure the CSS is appropriately styled

const DatasetListDisplay = ({ filteredDatasets, deleteDataset,  handleCardClick, isLoading}) => {
    // Initialize navigate function

    // Handling the loading state
    if (isLoading) {
        return <div className="loading-datasets">Loading datasets...</div>;
    }
    
    // Handling the case when there are no datasets to display after loading is complete
    else if (filteredDatasets.length === 0) {
        return <div className="no-datasets">No datasets to display.</div>;
    }

    // Function to handle deletion with confirmation
    const handleDelete = (datasetId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this dataset?");
        if (isConfirmed) {
            deleteDataset(datasetId);
        }
    };


    return (
        <ul className="datasets-list">
            {filteredDatasets.map((dataset) => (
                <li key={dataset._id} className="dataset-item" >
                    <img src={deleteIcon} alt="Delete" className="dataset-icon" />
                    <div className="dataset-details" onClick={() => handleCardClick(dataset.name)}>
                        <div className="dataset-name">{dataset.name}</div>
                        <div className="dataset-size">{dataset.metrics[0].studentCompletion.totalStudents} Students</div>
                        <div className="dataset-description">{dataset.description}</div>
                    </div>
                    <button
                        className="delete-dataset-btn"
                        onClick={() => handleDelete(dataset._id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default DatasetListDisplay;
