const Dataset = require('../models/datasetModel'); // Adjust the path as needed
const {countStudents} = require('../utils/countStudents')

/**
 * Add a new dataset to the database.
 * Assumes dataset details are in the request body and the dataset file is uploaded as 'dataset' field.
 */
exports.addDataset = async (req, res) => {
  try {
    const { name, description, type } = req.body;
    const userId = req.user._id;

    // Parse JSON dataset
    const data = JSON.parse(req.file.buffer.toString());

    // Calculate the number of students
    const studentCount = countStudents(data);

    // Create and save the new dataset document with studentCount
    const dataset = await Dataset.create({ 
      name, 
      description, 
      type, 
      owner: userId, 
      data,
      studentCount, // Include the calculated student count
    });

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

        // Calculate the total number of students across all datasets
        const totalStudents = datasets.reduce((acc, dataset) => acc + dataset.studentCount, 0);

        res.json({
          datasets,
          totalStudents // Include the total in the response
        });
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

/**
 * Delete a specific dataset by ID.
 */
exports.deleteDataset = async (req, res) => {
    try {
        const { id } = req.params;
        const dataset = await Dataset.findById(id);

        if (!dataset) {
            return res.status(404).json({ message: "Dataset not found" });
        }

        // Check if the dataset belongs to the currently logged-in user
        if (dataset.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this dataset" });
        }

        await dataset.deleteOne(dataset);
        res.json({ message: "Dataset deleted successfully" });
    } catch (error) {
        console.error('Failed to delete dataset:', error);
        res.status(500).json({ message: "Failed to delete dataset", error: error.message });
    }
};