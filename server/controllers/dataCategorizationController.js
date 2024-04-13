const DataCategorization = require('../models/dataCategorizationModel');

// Add a new DataCategorization
exports.createCategorization = async (req, res) => {
    try {
        const { type } = req.body;
        const existingCategorization = await DataCategorization.findOne({ type });
        if (existingCategorization) {
            return res.status(409).json({ error: 'A categorization with this type already exists' });
        }

        const newCategorization = new DataCategorization(req.body);
        const savedCategorization = await newCategorization.save();
        res.status(201).json(savedCategorization);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Retrieve all DataCategorizations
exports.getAllCategorizations = async (req, res) => {
    try {
        const categorizations = await DataCategorization.find();
        res.status(200).json(categorizations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single DataCategorization by ID
exports.getCategorizationById = async (req, res) => {
    try {
        const categorization = await DataCategorization.findById(req.params.id);
        if (!categorization) {
            return res.status(404).json({ error: 'Categorization not found' });
        }
        res.status(200).json(categorization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a DataCategorization
exports.updateCategorization = async (req, res) => {
    try {
        const updatedCategorization = await DataCategorization.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategorization) {
            return res.status(404).json({ error: 'Categorization not found' });
        }
        res.status(200).json(updatedCategorization);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a DataCategorization
exports.deleteCategorization = async (req, res) => {
    try {
        const deletedCategorization = await DataCategorization.findByIdAndDelete(req.params.id);
        if (!deletedCategorization) {
            return res.status(404).json({ error: 'Categorization not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller to fetch DataCategorization by type
exports.getDataCategorizationByType = async (req, res) => {
    try {
        const datasetType = req.params.type; // Capture the 'type' from the request URL
        const dataCategorization = await DataCategorization.findOne({ type: datasetType });

        if (!dataCategorization) {
            return res.status(404).json({
                success: false,
                message: `No data categorization found with type '${datasetType}'`
            });
        }

        res.status(200).json({
            success: true,
            data: dataCategorization
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while retrieving data categorization',
            error: error.message
        });
    }
};

exports.getUniquePerspectives = async (req, res) => {
    try {
        const uniquePerspectives = await DataCategorization.aggregate([
            {
                $group: {
                    _id: null, // Grouping without a specific field will aggregate all documents
                    perspectives: { $addToSet: "$perspectives" } // $addToSet adds unique items to an array
                }
            }
        ]);

        // The result is an array of documents with one document containing the perspectives array
        if (uniquePerspectives.length > 0) {
            res.status(200).json({ success: true, perspectives: uniquePerspectives[0].perspectives });
        } else {
            res.status(404).json({ success: false, message: "No perspectives found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while retrieving perspectives", error: error.message });
    }
};

// getPerspectives - Checking for the correct path to enum values
exports.getPerspectives = (req, res) => {
    try {
        const perspectivesEnum = DataCategorization.schema.path('perspectives').enumValues;
        res.json({ success: true, perspectives: perspectivesEnum });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve perspectives',
            error: error.message
        });
    }
};

/*
async function retrieveOriginalDataPoint(categorizationId) {
  const categorization = await Categorization.findById(categorizationId);
  if (!categorization) {
    console.error('Categorization not found');
    return;
  }

  const { collectionName, fieldName } = categorization.reference;
  const Model = mongoose.model(collectionName); // Dynamically select the model based on the collection name
  const query = {};
  query[fieldName] = { $exists: true }; // Build a query to check if the field exists

  const results = await Model.find(query); // This assumes you want to find all documents where this field exists
  return results;
}

*/