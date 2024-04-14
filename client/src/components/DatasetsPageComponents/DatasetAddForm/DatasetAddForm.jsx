import React from 'react';
import { useState, useRef } from 'react'; // Use useRef for the file input reference
import './DatasetAddForm.css'; // Ensure you have this CSS file for styling

const DatasetAddForm = ({ addDataset, setIsUploading, setShowUploadForm, isUploading }) => {
    const [uploadFormData, setUploadFormData] = useState({
        type: '',
        name: '',
        description: '',
        file: null,
    });
    const [dragOver, setDragOver] = useState(false); // State to track if drag is over the drop area

    // Using useRef hook for the file input reference
    const fileInputRef = useRef(null);

    const handleFormChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'file') {
            setUploadFormData({ ...uploadFormData, file: files[0] });
        } else {
            setUploadFormData({ ...uploadFormData, [name]: value });
        }
    };

    const handleFileSelectClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setUploadFormData({ ...uploadFormData, file: files[0] });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!uploadFormData.file) {
            alert('Please select a file');
            return;
        }
        setIsUploading(true);

        const formData = new FormData();
        formData.append('dataset', uploadFormData.file);
        formData.append('type', uploadFormData.type);
        formData.append('name', uploadFormData.name);
        formData.append('description', uploadFormData.description);

        try {
            await addDataset(formData);
            alert('Dataset uploaded successfully');
            setShowUploadForm(false); // Hide the form on success
        } catch (error) {
            alert(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="dataset-upload-form">
            {/* Type field */}
            <label>
                Type:
                <select onChange={handleFormChange} name="type" value={uploadFormData.type} required>
                    <option value="">Select Type</option>
                    <option value="canvas">Canvas</option>
                </select>
            </label>
            
            {/* Name field */}
            <label>
                Name:
                <input type="text" name="name" value={uploadFormData.name} onChange={handleFormChange} required />
            </label>
            
            {/* Description field */}
            <label>
                Description:
                <textarea name="description" value={uploadFormData.description} onChange={handleFormChange} required />
            </label>
            
            {/* File Upload field */}
            <label className="upload-area-label">
                Dataset File:
                <div 
                    className={`upload-area ${dragOver ? 'drag-over' : ''}`}
                    onClick={handleFileSelectClick}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {uploadFormData.file ? uploadFormData.file.name : "Click or drag a file to this area to upload"}
                </div>
                <input 
                    type="file" 
                    name="file" 
                    onChange={handleFormChange} 
                    accept=".json" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                />
            </label>
            
            {/* Submit button */}
            <button type="submit" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload Dataset'}
            </button>
        </form>
    );
};

export default DatasetAddForm;
