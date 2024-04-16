require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const kMeans = require('ml-kmeans');
const ss = require('simple-statistics');




async function processClustering(req, res, next) {
    try {
        const dataframe = req.body.dataframe;
        dataframe.show();

        if (!dataframe || typeof dataframe.toCollection !== 'function') {
            return res.status(400).send('Dataframe is missing or incorrectly formatted.');
        }

        const dataCollection = dataframe.toCollection();
        if (!dataCollection.length) {
            return res.status(400).send('Dataframe is empty.');
        }

        const insights = await clusterDataframe(dataframe);
        if (!insights || insights.length === 0) {  // Check for empty insights
            return res.status(404).send('No insights generated.');
        }

        req.body.insights = JSON.stringify(insights);
        next()
    } catch (error) {
        console.error('Error during clustering process:', error);
        if (!res.headersSent) {
            res.status(500).send(`Error processing the data: ${error.message}`);
        }
    }
}




async function clusterDataframe(data) {
    const columnNames = ['studentId', 'averageFinalScore', 'averageRequirementCompletedCount', 'completionRate', 'completedCoursesCount', 'notCompletedCoursesCount', 'coursesCount', 'averageFinalScoreCompleted', 'averageFinalScoreNotCompleted', 'averageRequirementCompletedCountCompleted', 'averageRequirementCompletedCountNotCompleted'];
    const preprocessedData = preprocessData(data);

    if (!validateDataForTensor(preprocessedData.arraySync())) {
        throw new Error('Preprocessed data is not suitable for tensor operations');
    }
    const dataForClustering = preprocessedData.arraySync().map(tensor => Array.from(tensor));
    const { optimalClusters } = await determineClusteringParams(dataForClustering);

    const { centroids, labels } = await kMeansClustering(dataForClustering, optimalClusters);

    const insights = generateInsights(dataForClustering, centroids, labels, columnNames);
    console.log("Insights:")
    // console.log(insights)

    return insights;
}


// -------------------------
// Pre Processing 
// -------------------------

function convertDataFrameToArray(dataFrame) {
    return dataFrame.toCollection();
}

function preprocessData(dataFrame) {
    const dataCollection = convertDataFrameToArray(dataFrame);
    let tensors = dataCollection.map(item => {
        let featureTensors = [];
        Object.keys(item).forEach(key => {
            const value = item[key];
            if (typeof value === 'string') {
                const categories = uniqueCategories(dataCollection, key);
                const encoded = oneHotEncode(value, categories).reshape([1, -1]);  // Ensuring 2D
                featureTensors.push(encoded);
            } else {
                const normalized = normalizeFeature(dataCollection, key).reshape([1, -1]);  // Ensuring 2D
                featureTensors.push(normalized);
            }
        });
        if (featureTensors.length > 0) {
            // This concatenates along axis 1, flattening the tensor into 2D
            return tf.concat(featureTensors, 1).reshape([-1]);
        }
    });
    // Stacking along the first dimension to create a [samples, features] matrix
    return tf.stack(tensors);
}



function oneHotEncode(value, categories) {
    const index = categories.indexOf(value);
    const encoding = categories.map((_, i) => (i === index ? 1 : 0));
    // Convert encoding to float tensor for compatibility
    return tf.tensor1d(encoding, 'int32').cast('float32');
}


function normalizeFeature(data, featureKey) {
    const values = data.map(item => item[featureKey]);
    const valuesTensor = tf.tensor1d(values, 'float32'); 
    const normalized = valuesTensor.sub(valuesTensor.min()).div(valuesTensor.max().sub(valuesTensor.min()));
    return normalized;
}

function uniqueCategories(data, featureKey) {
    return Array.from(new Set(data.map(item => item[featureKey])));
}


function validateData(data) {
    if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0])) {
        throw new Error('Data must be a two-dimensional array.');
    }
    if (!data.every(row => row.every(col => typeof col === 'number'))) {
        throw new Error('All elements in the data array must be numbers.');
    }
}

// -------------------------
// determineClusteringParams
// -------------------------


async function determineClusteringParams(data) {
    const maxClusters = 10;
    const sseArray = [];

    for (let k = 1; k <= maxClusters; k++) {
        const { centroids, labels } = await kMeansClustering(data, k);
        const sse = calculateSSE(data, centroids, labels);
        sseArray.push(sse);
    }

    const optimalK = await findElbowPoint(sseArray);
    return { optimalClusters: optimalK, algorithm: 'K-means' };
}


function validateDataForTensor(data) {
    if (!Array.isArray(data) || !data.length || !Array.isArray(data[0])) {
        console.error('Data must be a two-dimensional array');
        return false;
    }
    for (let i = 0; i < data.length; i++) {
        if (!data[i].every(val => typeof val === 'number')) {
            console.error('All elements in the data array must be numbers:', data[i]);
            return false;
        }
    }
    return true;
}


function calculateSSE(data, centroids, labels) {
    if (!validateDataForTensor(data) || !validateDataForTensor(centroids)) {
        throw new Error('Invalid data format for tensors');
    }
    return tf.tidy(() => {
        const dataTensor = tf.tensor2d(data);
        const centroidsTensor = tf.tensor2d(centroids);
        let totalSSE = 0;
        labels.forEach((clusterIndex, i) => {
            const point = dataTensor.slice([i, 0], [1, dataTensor.shape[1]]);
            const centroid = centroidsTensor.slice([clusterIndex, 0], [1, centroidsTensor.shape[1]]);
            const diff = point.sub(centroid);
            const sse = diff.square().sum().dataSync()[0];
            totalSSE += sse;
        });
        return totalSSE;
    });
}
async function findElbowPoint(sseArray) {
    let elbowPoint = 1;
    let maxDrop = 0;
    for (let i = 1; i < sseArray.length - 1; i++) {
        const drop = sseArray[i - 1] - sseArray[i];
        if (drop > maxDrop) {
            maxDrop = drop;
            elbowPoint = i + 1;
        }
    }
    return elbowPoint;
}

// ------------------
// Clustering
// ------------------

// A manual implementation of the K-means algorithm
async function kMeansClustering(data, k, maxIterations = 100) {
    let centroids = initializeCentroids(data, k);
    let assignments = new Array(data.length);
    let iteration = 0;
    let changed = true;

    while (iteration < maxIterations && changed) {
        // Assign clusters
        changed = false;
        data.forEach((point, index) => {
            let distances = centroids.map(centroid => euclideanDistance(point, centroid));
            let newAssignment = distances.indexOf(Math.min(...distances));
            if (newAssignment !== assignments[index]) {
                assignments[index] = newAssignment;
                changed = true;
            }
        });

        // Update centroids
        centroids = centroids.map((_, i) => {
            const assignedPoints = data.filter((_, index) => assignments[index] === i);
            return assignedPoints.length > 0 ? meanPoint(assignedPoints) : centroids[i]; // Reuse the old centroid if no points assigned
        });

        iteration++;
    }

    return { centroids, labels: assignments };
}

function initializeCentroids(data, k) {
    return data.slice().sort(() => 0.5 - Math.random()).slice(0, k);
}

function euclideanDistance(pointA, pointB) {
    return Math.sqrt(pointA.reduce((sum, value, idx) => sum + (value - pointB[idx]) ** 2, 0));
}

function meanPoint(points) {
    const numPoints = points.length;
    const numDimensions = points[0].length;
    let mean = new Array(numDimensions).fill(0);
    points.forEach(point => {
        point.forEach((value, idx) => {
            mean[idx] += value / numPoints;
        });
    });
    return mean;
}


// ------------------
// Insights
// ------------------

function generateInsights(data, centroids, labels, columnNames) {
    // Summarizing each cluster with concise data
    const clusterDetails = centroids.map((centroid, index) => {
        const points = data.filter((_, idx) => labels[idx] === index);
        return {
            clusterId: index + 1,  // Human-readable indexing
            size: points.length,
            centroid: centroid.map((c, i) => `${columnNames[i]}: ${c.toFixed(2)}`),  // Map centroid values to column names
            stats: getStatisticsForCluster(points, columnNames),
            sample: getRepresentativeSample(points, columnNames)
        };
    });

    // Simplified global insights, focusing on overall statistics
    const globalInsights = {
        totalClusters: centroids.length,
        overallStats: getOverallStatistics(data, columnNames)
    };

    return {
        clusters: clusterDetails,
        insights: globalInsights
    };
}

function getStatisticsForCluster(points, columnNames) {
    if (points.length === 0) return {};
    let stats = {};
    const dimensions = points[0].length;
    for (let i = 0; i < dimensions; i++) {
        const dimPoints = points.map(p => p[i]);
        stats[columnNames[i]] = {
            mean: ss.mean(dimPoints).toFixed(2),
            median: ss.median(dimPoints).toFixed(2),
            stddev: ss.standardDeviation(dimPoints).toFixed(2),
            min: ss.min(dimPoints).toFixed(2),
            max: ss.max(dimPoints).toFixed(2)
        };
    }
    return stats;
}

function getOverallStatistics(data, columnNames) {
    let stats = {};
    const dimensions = data[0].length;
    for (let i = 0; i < dimensions; i++) {
        const dimPoints = data.map(p => p[i]);
        stats[columnNames[i]] = {
            mean: ss.mean(dimPoints).toFixed(2),
            median: ss.median(dimPoints).toFixed(2),
            stddev: ss.standardDeviation(dimPoints).toFixed(2),
            min: ss.min(dimPoints).toFixed(2),
            max: ss.max(dimPoints).toFixed(2)
        };
    }
    return stats;
}

function getRepresentativeSample(points, columnNames) {
    if (points.length === 0) return {};
    // Samples up to 5 points from the cluster
    const samplePoints = ss.sample(points, Math.min(points.length, 5));
    return samplePoints.map(point => {
        let sample = {};
        point.forEach((value, index) => {
            sample[columnNames[index]] = value.toFixed(2);
        });
        return sample;
    });
}


module.exports = { processClustering };

