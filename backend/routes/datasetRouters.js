const express = require('express');
const multer = require('multer');
const { checkDatasetType, validateDatasetStructure } = require('../middleware/datasetValidation');
const { addDataset, getDatasetsByUser, getDatasetDetails, deleteDataset } = require('../controllers/datasetController');
const requireAuth = require('../middleware/requireAuth');


// Configure multer for file uploads, storing files in memory for processing before saving to DB or filesystem
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Apply authentication middleware to all dataset routes
router.use(requireAuth);

// Routes
// Upload dataset - assumes JSON format, validation middleware can be adjusted as needed
router.post('/upload', upload.single('dataset'), checkDatasetType, validateDatasetStructure, addDataset);

// Get all datasets for the logged-in user
router.get('/', getDatasetsByUser);

// Get details for a specific dataset by ID
router.get('/:id', getDatasetDetails);

// Delete a specific dataset by ID
router.delete('/:id', deleteDataset);


module.exports = router;
