

const dataPoints = [
    {
        dataPoint: 'studentId',
        schemaName: 'studentDetailSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.studentId',
        },
        categories: [
            { categoryName: "General Information", applicable: true },
            { categoryName: "Profile", applicable: true },
            { categoryName: "Demographics", applicable: true },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Progress & Achievements", applicable: false },
            { categoryName: "Active Participation", applicable: false },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Assessments", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Results", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Unique identifier for each student."
    },
    
    {
        dataPoint: 'averageFinalScore',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.averageFinalScore',
        },
        categories: [
            { categoryName: "General Information", applicable: false },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: true },
            { categoryName: "Assessments", applicable: true },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: false },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Represents the average score across all courses taken by the student."
    },
    {
        dataPoint: 'averageRequirementCompletedCount',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.averageRequirementCompletedCount',
        },
        categories: [
            { categoryName: "General Information", applicable: false },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: true },
            { categoryName: "Assessments", applicable: false },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: true },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Average number of requirements the student completed across courses."
    },    
    {
        dataPoint: 'completionRate',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.completionRate',
        },
        categories: [
            { categoryName: "General Information", applicable: false },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: true },
            { categoryName: "Assessments", applicable: false },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: true },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Percentage of courses completed by the student."
    },    
    {
        dataPoint: 'completedCoursesCount',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.completedCoursesCount',
        },
        categories: [
            { categoryName: "General Information", applicable: false },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: true },
            { categoryName: "Assessments", applicable: false },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: true },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Total number of courses the student has completed."
    },    
    {
        dataPoint: 'notCompletedCoursesCount',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.notCompletedCoursesCount',
        },
        categories: [
            { categoryName: "General Information", applicable: false },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: true },
            { categoryName: "Assessments", applicable: false },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: false },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Total number of courses the student has not completed."
    },
    
    {
        dataPoint: 'coursesCount',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.coursesCount',
        },
        categories: [
            { categoryName: "General Information", applicable: true },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: false },
            { categoryName: "Assessments", applicable: false },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: false },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Total number of courses taken by the student."
    },    
    {
        dataPoint: 'averageFinalScoreCompleted',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.averageFinalScoreCompleted',
        },
        categories: [
            { categoryName: "General Information", applicable: false },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: true },
            { categoryName: "Assessments", applicable: true },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: false },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Average final score for courses that the student completed."
    },    
    {
        dataPoint: 'averageFinalScoreNotCompleted',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.averageFinalScoreNotCompleted',
        },
        categories: [
            { categoryName: "General Information", applicable: false },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: true },
            { categoryName: "Assessments", applicable: true },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: false },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Average final score for courses that the student did not complete."
    },    
    {
        dataPoint: 'averageRequirementCompletedCountCompleted',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.averageRequirementCompletedCountCompleted',
        },
        categories: [
            { categoryName: "General Information", applicable: false },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: true },
            { categoryName: "Assessments", applicable: true },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: true },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Average count of requirements completed in courses that the student completed."
    },    
    {
        dataPoint: 'averageRequirementCompletedCountNotCompleted',
        schemaName: 'studentAveragesSchema',
        reference: {
            path: 'metrics.overallStats.studentDetails.averages.averageRequirementCompletedCountNotCompleted',
        },
        categories: [
            { categoryName: "General Information", applicable: false },
            { categoryName: "Progress & Achievements", applicable: true },
            { categoryName: "Results", applicable: true },
            { categoryName: "Assessments", applicable: true },
            { categoryName: "Profile", applicable: false },
            { categoryName: "Demographics", applicable: false },
            { categoryName: "Student-Course Interactions", applicable: true },
            { categoryName: "Group Interactions", applicable: false },
            { categoryName: "Active Participation", applicable: true },
            { categoryName: "Receptive Activities", applicable: false },
            { categoryName: "Structure & Content", applicable: false },
            { categoryName: "Academic Background", applicable: false },
            { categoryName: "Teaching Profile", applicable: false },
            { categoryName: "Personal Demographics", applicable: false }
        ],
        perspectives: 'Individual Student',
        additionalInfo: "Average count of requirements completed in courses that the student did not complete."
    }
    
];


require('dotenv').config();
const mongoose = require('mongoose');
const DataCategorization = require('./models/dataCategorizationModel');

// Define categories
const categories = [
    "Receptive Activities",
    "Active Participation",
    "Assessments",
    "Progress & Achievements",
    "General Information",
    "Structure & Content",
    "Results",
    "Demographics",
    "Profile",
    "Academic Background",
    "Teaching Profile",
    "Personal Demographics",
    "Student-Course Interactions",
    "Group Interactions"
];

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        insertDataPoints();
    })
    .catch(err => console.error('MongoDB connection error:', err));

function insertDataPoints() {
    DataCategorization.insertMany(dataPoints)
        .then(() => {
            console.log('All categorizations have been added successfully.');
            mongoose.disconnect();
        })
        .catch(error => {
            console.error('Failed to add categorizations:', error);
            mongoose.disconnect();
        });
}