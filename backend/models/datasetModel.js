const mongoose = require('mongoose');

// Schema for the dataset
const datasetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the dataset'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the dataset'],
  },
  type: {
    type: String,
    required: [true, 'Please specify the type of the dataset'],
    enum: ['canvas', 'otherType1', 'otherType2'], // Enumerate your dataset types here
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Ensure this matches the name of your user model
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // For flexible data storage
    required: [true, 'Please provide the dataset data'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  studentCount: {
    type: Number,
    required: true,
    default: 0, // Default value if not specified
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});



// Compile and export the model
const Dataset = mongoose.model('Dataset', datasetSchema);

module.exports = Dataset;
