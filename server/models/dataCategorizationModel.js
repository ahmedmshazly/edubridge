const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: String,
  applicable: Boolean
});

const DataCategorizationSchema = new mongoose.Schema({
  dataPoint: {
    type: String,
    required: true,
    unique: true
  },
  categories: [CategorySchema],
  schemaName: {
    type: String,
    required: true
  },
  reference: {
    path: String,
  },
  perspectives: {
    type: String,
    required: [true, 'Please specify the perspectives of the unsupervised analysis'],
    enum: ['Individual Student', 'Course', 'Group', 'Content', 'Teacher'],
  },
  type: {
    type: String,
    required: [true, 'Please specify the type of the dataset'],
    enum: ['canvas', 'otherType1', 'otherType2'],
    unique: true 
  },
  additionalInfo: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

const DataCategorization = mongoose.model('CanvasDataCategorization', DataCategorizationSchema);
module.exports = DataCategorization;
