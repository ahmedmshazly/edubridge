import React from 'react';
import deleteIcon from '../../../assets/images/logo.png';  
import './DatasetListDisplay.css';

const DatasetListDisplay = ({ filteredDatasets, deleteDataset,  handleCardClick, isLoading}) => {

    if (isLoading) {
        return <div className="loading-datasets">Loading datasets...</div>;
    }
    
    else if (filteredDatasets.length === 0) {
        return <div className="no-datasets">No datasets to display.</div>;
    }

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
