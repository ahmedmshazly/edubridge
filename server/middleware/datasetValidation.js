const { validateCanvasStructure } = require('../validations/canvasValidation'); // Adjust path as needed
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
        const dataset = JSON.parse(req.file.buffer.toString()); // Parse the JSON data from the uploaded file
        let validationResults;

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
        // Adjust to proceed with optional field issues, storing notes
        if (validationResults.missing.length > 0 || validationResults.extras.length > 0) {
            return res.status(400).json({
                message: "Dataset structure validation failed for required or unexpected fields.",
                missing: validationResults.missing,
                extras: validationResults.extras,
            });
        }

        // Attach validation notes to the request for further processing
        req.validationNotes = validationResults.notes;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid JSON structure.' });
    }
};

