const mongoose = require('mongoose');

const QuestionCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    }
});

const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
        trim: true
    },
    categories: [QuestionCategorySchema],
    answer: {
        type: String,
        default: ''
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dataset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dataset', 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
