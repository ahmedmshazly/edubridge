import React from 'react';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../../assets/images/logo.png'; // Ensure the path is correct
import './DatasetListDisplay.css'; // Make sure the CSS is appropriately styled

const DatasetListDisplay = ({ filteredDatasets, deleteDataset,  handleCardClick}) => {
    // Initialize navigate function
    let navigate = useNavigate();

    // Handling the case when there are no datasets to display
    if (filteredDatasets.length === 0) {
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
                <li key={dataset._id} className="dataset-item" onClick={() => handleCardClick(dataset.name)}>
                    <img src={deleteIcon} alt="Delete" className="dataset-icon" onClick={() => handleDelete(dataset._id)} />
                    <div className="dataset-details">
                        <div className="dataset-name">{dataset.name}</div>
                        <div className="dataset-size">{dataset.studentCount} Students</div>
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
