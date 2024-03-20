import React, { useState, useEffect } from 'react';
import './DatasetsList.css';
import deleteIcon from '../../../assets/images/logo.png'; // Ensure the path is correct
import { useDatasetsContext } from "../../../hooks/useDatasetsContext";

const DatasetsList = () => {
  // Accessing datasets and deleteDataset function from the context
  const { datasets, deleteDataset } = useDatasetsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDatasets, setFilteredDatasets] = useState([]);

  // useEffect to filter datasets locally based on search term
  useEffect(() => {
    const filter = searchTerm === '' ? datasets : datasets.filter(dataset =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDatasets(filter);
  }, [datasets, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="datasets-container">
      <div className="datasets-header">
        <h1>Datasets</h1>
        <button className="new-dataset-btn">New dataset</button> {/* Placeholder for future functionality */}
      </div>
      <div className="datasets-search">
        <input
          type="text"
          placeholder="Search for datasets"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {filteredDatasets && filteredDatasets.length > 0 ? (
        <ul className="datasets-list">
          {filteredDatasets.map((dataset) => (
            <li key={dataset._id} className="dataset-item">
              <img src={deleteIcon} alt="Delete" className="dataset-icon" />
              <div className="dataset-details">
                <div className="dataset-name">{dataset.name}</div>
                <div className="dataset-size">{dataset.studentCount} Students</div>
                <div className="dataset-description">{dataset.description}</div>
              </div>
              <button
                className="delete-dataset-btn"
                onClick={() => deleteDataset(dataset._id)} // Using deleteDataset from context
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-datasets">No datasets to display.</div>
      )}
    </div>
  );
};

export default DatasetsList;
