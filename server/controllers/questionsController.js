const Question = require('../models/QuestionSchema');

// Create a new question with reference to dataset
exports.createQuestion = async (req, res) => {
    try {
        const { questionText, categories, dataset, answer } = req.body;
        const userId = req.user._id;
        const newQuestion = await Question.create({
            questionText: questionText,
            categories: categories,
            createdBy: userId,
            dataset: dataset,
            answer: answer 
        });
        // console.log(newQuestion)
        res.status(201).json({ success: true, data: newQuestion });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create question', error: error.message });

    }
};

// Get questions by categories
exports.getQuestionsByCategories = async (req, res) => {
    try {
        const { categories } = req.query;
        const questions = await Question.find({
            'categories.categoryName': { $in: categories }
        }).populate('createdBy dataset'); // Optionally populate user and dataset details
        res.status(200).json({ success: true, count: questions.length, data: questions });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Questions not found', error: error.message });
    }
};

// Get questions by a specific user
exports.getQuestionsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId)
        const questions = await Question.find({ createdBy: userId });
        res.status(200).json({ success: true, count: questions.length, data: questions });
    } catch (error) {
        res.status(404).json({ success: false, message: "User's questions not found", error: error.message });
    }
};

// Update an answer to a question
exports.updateQuestionAnswer = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { answer } = req.body;
        const question = await Question.findByIdAndUpdate(questionId, { answer }, { new: true });
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update question', error: error.message });
    }
};

// Get questions by dataset
exports.getQuestionsByDataset = async (req, res) => {
    try {
        const { datasetId } = req.params;
        const questions = await Question.find({ dataset: datasetId }).populate('createdBy');
        res.status(200).json({ success: true, count: questions.length, data: questions });
    } catch (error) {
        res.status(404).json({ success: false, message: "No questions found for this dataset", error: error.message });
    }
};

/**
 * Delete a specific question by ID.
 */
exports.deleteQuestion = async (req, res) => {
    try {
      const { questionId } = req.params;
      const question = await Question.findById(questionId);
  
      // Check if the question exists
      if (!question) {
        return res.status(404).json({ success: false, message: "Question not found" });
      }
  
      // Check if the user is authorized to delete the question
      if (question.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: "Not authorized to delete this question" });
      }
  
      // Delete the question
      await question.deleteOne(); // Using deleteOne() on the instance directly is typically not necessary, but works for illustrative purposes
      res.status(200).json({ success: true, message: "Question deleted successfully" });
    } catch (error) {
      console.error('Failed to delete question:', error);
      res.status(500).json({ success: false, message: "Failed to delete question", error: error.message });
    }
  };
  

module.exports = exports;
