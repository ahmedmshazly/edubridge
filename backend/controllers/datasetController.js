const Dataset = require('../models/datasetModel'); // Adjust the path as needed
const User = require('../models/userModels'); // Adjust the path as needed

/**
 * Add a new dataset to the database.
 * Assumes dataset details are in the request body and the dataset file is uploaded as 'dataset' field.
 */
exports.addDataset = async (req, res) => {
    try {
        console.log()
        const { name, description, type } = req.body;
        // Assuming the user's ID is attached to the request via authentication middleware
        const userId = req.user._id;

        // Parse JSON dataset (assuming it's sent as a file)
        const data = JSON.parse(req.file.buffer.toString());

        // Create and save the new dataset document
        const dataset = await Dataset.create({ name, description, type, owner: userId, data });

        res.status(201).json({
            message: "Dataset uploaded successfully",
            datasetId: dataset._id,
        });
    } catch (error) {
        console.error('Dataset upload failed:', error);
        res.status(400).json({ message: "Failed to upload dataset", error: error.message });
    }
};

/**
 * Get all datasets for the currently logged-in user.
 */
exports.getDatasetsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const datasets = await Dataset.find({ owner: userId });
        res.json(datasets);
    } catch (error) {
        console.error('Failed to retrieve datasets:', error);
        res.status(500).json({ message: "Failed to retrieve datasets", error: error.message });
    }
};

/**
 * Get details for a specific dataset by ID.
 */
exports.getDatasetDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const dataset = await Dataset.findById(id);
        
        if (!dataset) {
            return res.status(404).json({ message: "Dataset not found" });
        }

        res.json(dataset);
    } catch (error) {
        console.error('Failed to retrieve dataset details:', error);
        res.status(500).json({ message: "Failed to retrieve dataset details", error: error.message });
    }
};
