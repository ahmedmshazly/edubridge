const { DataFrame } = require('dataframe-js');
const Dataset = require('../models/datasetModel'); 
const DataCategorization = require('../models/dataCategorizationModel'); 

/**
 * Middleware to process the question by extracting and logging data based on category paths.
 */
async function processQuestion(req, res, next) {
    try {
        const categoryNames = req.body.categories.map(cat => cat.categoryName);

        const matchingDataPoints = await DataCategorization.find({
            'categories.categoryName': { $in: categoryNames }
        }).exec();

        const paths = matchingDataPoints.map(dp => dp.reference.path);

        const studentDetails = await fetchDataByPaths(req.body.dataset, paths);

        const refactoredDetails = consolidateStudentDetails(studentDetails);
        
        const studentDataFrame = createDataFrameFromDetails(refactoredDetails);

        req.body.dataframe = studentDataFrame; 
        // console.log("studentDataFrame", studentDataFrame)
        // console.log("req.body.dataframe", req.body.dataframe)

        next();
    } catch (error) {
        console.error('Error in processQuestion:', error);
        res.status(500).json({ message: 'Error processing question', error: error.message });
    }
}


const consolidateStudentDetails = (details) => {
    const studentMap = {};

    details.forEach(detail => {
        // Extract the index from the path
        const match = detail.path.match(/studentDetails\[(\d+)\]/);
        if (match) {
            const index = match[1];
            const propertyPath = detail.path.split('.').pop();

            // Initialize the student object if it doesn't exist
            if (!studentMap[index]) {
                studentMap[index] = {};
            }

            // Add the property to the student object
            studentMap[index][propertyPath] = detail.value;
        }
    });

    // Convert the map to an array
    return Object.values(studentMap);
};


const createDataFrameFromDetails = (refactoredDetails) => {
    // Create a DataFrame from the refactored details array
    const df = new DataFrame(refactoredDetails);
    return df;
  };
  

// Function to fetch data by resolving each path to the corresponding data in the dataset documents.
async function fetchDataByPaths(datasetId, paths) {
    console.log("Fetching data by paths for dataset ID:", datasetId);
    const dataset = await Dataset.findById(datasetId);
    if (!dataset) {
        console.error("No dataset found for ID:", datasetId);
        return [];
    }

    const dataExtracted = [];

    // Function to recursively extract values based on path
    function extractValues(obj, pathArray, currentPath) {
        const part = pathArray.shift();
        let current = obj[part];
        const newPath = currentPath ? `${currentPath}.${part}` : part;

        if (current === undefined) {
            console.log(`No data found at '${part}' in path '${newPath}'`);
            return;
        }

        if (Array.isArray(current)) {
            current.forEach((item, index) => {
                extractValues(item, [...pathArray], `${newPath}[${index}]`);
            });
        } else if (pathArray.length > 0) {
            extractValues(current, pathArray, newPath);
        } else {
            dataExtracted.push({ path: newPath, value: current });
        }
    }

    // Iterate over each specified path
    paths.forEach(path => {
        const pathParts = path.split('.');
        extractValues(dataset.toObject(), pathParts, '');
    });

    // console.log("Final extracted data ready for DataFrame:", dataExtracted);
    return dataExtracted;
}



module.exports = { processQuestion };
