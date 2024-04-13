const { DataFrame } = require('dataframe-js');
const Dataset = require('../models/datasetModel'); // Ensure this path is correct
const DataCategorization = require('../models/dataCategorizationModel'); // Update with actual path

/**
 * Middleware to process the question by extracting and logging data based on category paths.
 */
async function processQuestion(req, res, next) {
    try {
        console.log("Starting to process question.");
        const categoryNames = req.body.categories.map(cat => cat.categoryName);
        console.log("Extracted category names:", categoryNames);

        const matchingDataPoints = await DataCategorization.find({
            'categories.categoryName': { $in: categoryNames }
        }).exec();
        console.log("Matching data points found:", matchingDataPoints);

        const paths = matchingDataPoints.map(dp => dp.reference.path);
        console.log("Paths extracted for data fetching:", paths);

        const datasets = await fetchDataByPaths(req.body.dataset, paths);
        console.log("Datasets fetched based on paths:", datasets);

        if (datasets.length > 0) {
            let dataframe = new DataFrame(datasets, ['path', 'data']);
            console.log("DataFrame created. Displaying data:");
            console.log(dataframe.show());

            req.dataframe = dataframe;
        }

        next(); // Proceed to next middleware or controller
    } catch (error) {
        console.error('Error in processQuestion:', error);
        res.status(500).json({ message: 'Error processing question', error: error.message });
    }
}

function getValueByPath(obj, path) {
    const parts = path.split('.');
    let current = obj;

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (current === undefined) {
            console.log(`Undefined value at part '${part}' of the path '${path}' at index ${i}`);
            return undefined;
        }

        console.log(`Accessing part '${part}' of the path '${path}' at index ${i}`);

        if (part.match(/^\d+$/)) { // If the part is an index
            current = current[parseInt(part, 10)]; // Access specific index in the array
        } else {
            current = current[part];
        }

        if (current === undefined) {
            console.log(`No data found at '${part}' in path '${path}'`);
        } else if (Array.isArray(current) && i < parts.length - 1) {
            // Handle array but only if it's not the last part of the path
            console.log(`Data at '${part}' is an array. Proceeding to next part of the path.`);
            current = current[0]; // Continue with the first element, or modify this as needed
        } else if (Array.isArray(current) && i === parts.length - 1) {
            console.log(`Data at '${part}' is an array. Collecting data from all items.`);
            return current; // Return the entire array if it's the last part of the path
        } else {
            console.log(`Data found at '${part}' in path '${path}': `, current);
        }
    }

    return current;
}

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

    console.log("Final extracted data ready for DataFrame:", dataExtracted);
    return dataExtracted;
}



module.exports = { processQuestion };
