const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { processQuestion } = require('../middleware/processQuestion');
const { processClustering } = require('../middleware/unsupervised');
const { analysisMiddleware } = require('../middleware/gptApi');

const router = express.Router();
const {
    createQuestion,
    getQuestionsByCategories,
    getQuestionsByUser,
    updateQuestionAnswer,
    getQuestionsByDataset,
    deleteQuestion
} = require('../controllers/questionsController');


router.use(requireAuth);


// Route to create a new question
router.post('/', processQuestion, processClustering, analysisMiddleware, createQuestion);

// Route to get questions filtered by categories
router.get('/by-categories', getQuestionsByCategories);

// Route to get all questions for a specific user
router.get('/user', getQuestionsByUser);

// Route to update a question with an answer
router.put('/answer/:questionId', updateQuestionAnswer);

// Route to get questions associated with a specific dataset
router.get('/dataset/:datasetId', getQuestionsByDataset);

// Route to delete a question
router.delete('/:questionId', deleteQuestion);

module.exports = router;
