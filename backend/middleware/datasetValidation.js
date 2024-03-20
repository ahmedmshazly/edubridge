const { validateCanvasStructure } = require('../utils/canvasValidation'); // Adjust path as needed
// Import other templates as needed

exports.checkDatasetType = (req, res, next) => {
    const { type } = req.body;
    const validTypes = ['canvas', 'otherType']; // Extend this list with new types
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: 'Invalid dataset type provided.' });
    }
    // Attach the type to the request for further validation
    req.datasetType = type;
    next();
};

exports.validateDatasetStructure = (req, res, next) => {
    try {
        console.log("Starting");
        const dataset = JSON.parse(req.file.buffer.toString()); // Parse the JSON data from the uploaded file
        let validationResults;
        console.log("Dataset made");

        // Switch based on the dataset type indicated in the request
        switch (req.datasetType) {
            case 'canvas':
                // Directly use the validateCanvasStructure for canvas type
                validationResults = validateCanvasStructure(dataset);
                break;
            // Placeholder for other dataset types
            case 'otherType':
                // Example: validationResults = validateOtherStructure(dataset, otherTemplate);
                // Implement and import validateOtherStructure similar to validateCanvasStructure
                break;
            default:
                return res.status(400).json({ message: `Validation not implemented for type: ${req.datasetType}` });
        }

        // Handle validation results
        if (validationResults.missing.length > 0 || validationResults.extras.length > 0 || validationResults.notes.length > 0) {
            // Constructing a response object to include only non-empty arrays
            let response = {
                message: "Dataset structure validation issues",
            };

            if (validationResults.missing.length > 0) response.missing = validationResults.missing;
            if (validationResults.extras.length > 0) response.extras = validationResults.extras;
            if (validationResults.notes.length > 0) response.notes = validationResults.notes;

            return res.status(400).json(response);
        }

        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid JSON structure. Ensure your file is properly formatted as JSON.' });
    }
};

