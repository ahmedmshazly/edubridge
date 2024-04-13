const mongoose = require('mongoose');

async function retrieveOriginalDataPoint(categorizationId) {
  try {
    const Categorization = mongoose.model('DataCategorization'); // Correct model name as per schema definition
    const categorization = await Categorization.findById(categorizationId);
    
    if (!categorization) {
      console.error('Categorization not found');
      return null; // Return null to indicate not found
    }

    const { path } = categorization.reference;
    if (!path) {
      console.error('No path specified in reference');
      return null; // Return null if the path is missing
    }

    // Split the path to handle potentially nested fields
    const [modelName, ...fieldPath] = path.split('.');
    const Model = mongoose.model(modelName); // Dynamically select the model based on the first segment of the path
    const query = {};
    query[fieldPath.join('.')] = { $exists: true }; // Build a query to check if the nested field exists

    const results = await Model.find(query); // Find all documents where the nested field exists
    console.log(`Found ${results.length} items for path ${path}`);
    return results;
  } catch (error) {
    console.error('Error retrieving data points:', error);
    return null; // Return null in case of error
  }
}


const mongoose = require('mongoose');
require('./path/to/your/mongoose/models'); // Make sure to require your models

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    // Replace 'yourCategorizationId' with an actual ID from your database
    retrieveOriginalDataPoint('yourCategorizationId')
      .then(results => {
        console.log('Results:', results);
        mongoose.disconnect();
      })
      .catch(err => {
        console.error('Error during retrieval:', err);
        mongoose.disconnect();
      });
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));
