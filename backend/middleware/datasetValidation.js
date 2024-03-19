// middleware/datasetValidation.js
exports.checkDatasetType = (req, res, next) => {
    // Example: Extract dataset type from request and validate it
    const { type } = req.body; // Adjust according to how the type is sent
    // console.log(req.file)
    const validTypes = ['canvas', 'otherType']; // Define valid dataset types
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: 'Invalid dataset type provided.' });
    }
    next();
};

exports.validateDatasetStructure = (req, res, next) => {
    // Example: Basic structure validation, can be expanded as needed
    try {
        // const dataset = JSON.parse(req.file.buffer.toString()); // Assuming dataset is uploaded as a file
        // Perform structure validation here based on your requirements
        // For instance, check if certain keys exist or if the structure matches a 'canvas' type schema
        // console.log(dataset)
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid JSON structure.' });
    }
};
