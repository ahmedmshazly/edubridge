const express = require('express');
const router = express.Router();
const {
    createCategorization,
    getAllCategorizations,
    getCategorizationById,
    updateCategorization,
    deleteCategorization,
    getDataCategorizationByType,
    getPerspectives,
    getUniquePerspectives
} = require('../controllers/dataCategorizationController');

// Define routes
router.post('/data-categorizations', createCategorization);
router.get('/data-categorizations', getAllCategorizations);
router.get('/data-categorizations/:id', getCategorizationById);
router.put('/data-categorizations/:id', updateCategorization);
router.delete('/data-categorizations/:id', deleteCategorization);
router.get('/type/:type', getDataCategorizationByType);
router.get('/perspectives', getPerspectives);
router.get('/unique-perspectives', getUniquePerspectives);




module.exports = router;
