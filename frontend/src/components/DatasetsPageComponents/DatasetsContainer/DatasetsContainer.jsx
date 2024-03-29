// Imports
import React, { useState, useEffect } from 'react';

// Hooks
import { useDatasetsContext } from '../../../hooks/useDatasetsContext'; 

// Style
import './DatasetsContainer.css'; 

// Components
import DatasetAddForm from '../DatasetAddForm/DatasetAddForm';
import DatasetListDisplay from '../DatasetListDisplay/DatasetListDisplay.jsx'; 
import DatasetDetail from '../DatasetDetail/DatasetDetail.jsx'; 

const DatasetsContainer = () => {
  const [currentView, setCurrentView] = useState('list'); // Default to showing the list
  const [selectedDatasetName, setSelectedDatasetName] = useState('');
  const { datasets, loading, deleteDataset, addDataset } = useDatasetsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDatasets, setFilteredDatasets] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  
  const getButtonText = () => {
    return currentView === 'list' ? 'New Dataset' : 'Show Datasets';
  };
  
  useEffect(() => {
    // Filter datasets based on the search term
    const filter = searchTerm === '' ? datasets : datasets.filter(dataset =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDatasets(filter);
  }, [datasets, searchTerm]);



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = () => {
    if (currentView === 'list') {
      setCurrentView('form'); // If the list is currently shown, switch to the form
    } else {
      setCurrentView('list'); // If the form or 'Others' component is shown, switch back to the list
    }
  };
  const selectedDataset = datasets.find(dataset => dataset.name === selectedDatasetName);

  return (
    <div className="datasets-container">
      <div className="datasets-header">
        <h1>
          {currentView === 'list' ? 'Datasets' :
            currentView === 'form' ? 'Adding a Dataset' :
              currentView === 'datasetDetail' ? `Analytics for ${selectedDatasetName}` : 'Datasets'}
        </h1>
        <button className="new-dataset-btn" onClick={handleButtonClick}>
          {getButtonText()}
        </button>
      </div>
      {currentView === 'list' && (
        <>
          <div className="datasets-search">
            <input type="text" placeholder="Search for datasets" value={searchTerm} onChange={handleSearch} />
          </div>
          <DatasetListDisplay
            filteredDatasets={filteredDatasets}
            deleteDataset={deleteDataset}
            handleCardClick={(datasetName) => {
              setSelectedDatasetName(datasetName);
              setCurrentView('datasetDetail');}}
            isLoading={loading}
          />
        </>
      )}
      {currentView === 'form' && (
        <DatasetAddForm
          addDataset={addDataset}
          setIsUploading={setIsUploading}
          setShowUploadForm={() => setCurrentView('list')} // Adjusted for consistency
          isUploading={isUploading}
        />
      )}
      {currentView === 'datasetDetail' && <DatasetDetail dataset={selectedDataset} />}
    </div>
  );
}

export default DatasetsContainer;
