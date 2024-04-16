const Dataset = require('../models/datasetModel'); 
const { calculateMetrics } = require('../modules/analytics/datasetAnalytics'); 



exports.addDataset = async (req, res) => {
  try {
    const { name, description, type } = req.body;
    console.log(req)
    const userId = req.user._id;

    const rawData = req.file.buffer.toString(); 
    const data = JSON.parse(rawData); // Parse string to JSON

    // Call calculateMetrics to get a comprehensive metrics object
    const metrics = calculateMetrics(data);

    // Validate metrics before saving
    if (!metrics || metrics.studentCompletion.totalStudents <= 0) {
      return res.status(400).json({ message: "Invalid metrics calculated, cannot save dataset" });
    }


    // Create and save the new dataset document with all calculated metrics and additional data
    const dataset = await Dataset.create({
      name,
      description,
      type,
      owner: userId,
      metrics: metrics, // Spread the metrics object to match the schema fields
      validationNotes: req.validationNotes || ["Data is clean and has no issues"], // Include validation notes
      // data, // Storing the raw data
    });

    res.status(201).json({
      message: "Dataset uploaded successfully",
      datasetId: dataset._id,
      validationNotes: dataset.validationNotes,
      metrics: dataset.metrics
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
    // Use the .select() method to exclude the 'data' field
    const datasets = await Dataset.find({ owner: userId }).select('-data');
    // console.log(datasets)
    // const totalStudents = datasets.reduce((acc, dataset) => console.log(dataset));
    const totalStudents = datasets.reduce((acc, dataset) => {
      if (dataset.metrics.length > 0 && dataset.metrics[0].studentCompletion) {
        return acc + dataset.metrics[0].studentCompletion.totalStudents;
      }
      return acc;
    }, 0);

    res.json({
      datasets,
      totalStudents // Include the total in the response
    });
  } catch (error) {
    console.error('Failed to retrieve datasets:', error);
    res.status(500).json({ message: "Failed to retrieve datasets", error: error.message });
  }
};

exports.getDatasetsNamesIdByUser = async (req, res) => {
  try {
      const userId = req.user._id;
      const datasets = await Dataset.find({ owner: userId }, 'name _id').exec(); // Select only the 'name' and '_id'
      res.status(200).json(datasets);
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
    const dataset = await Dataset.findById(id).select(['-data', '-validationNotes']);

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
