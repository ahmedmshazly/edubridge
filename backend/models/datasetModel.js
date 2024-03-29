const mongoose = require('mongoose');

const courseDetailsSchema = new mongoose.Schema({
  courseId: String,
  finalScore: Number,
  requirementCompletedCount: Number,
  isCompleted: Boolean,
  courseError: Boolean
});

const studentAveragesSchema = new mongoose.Schema({
  averageFinalScore: Number,
  averageRequirementCompletedCount: Number,
  averageFinalScoreCompleted: Number,
  averageRequirementCompletedCountCompleted: Number,
  averageFinalScoreNotCompleted: Number,
  averageRequirementCompletedCountNotCompleted: Number,
  completedCoursesCount: Number,
  notCompletedCoursesCount: Number,
  coursesCount: Number
});

const studentDetailSchema = new mongoose.Schema({
  studentId: String,
  studentError: Boolean,
  averages: studentAveragesSchema,
  coursesDetails: [courseDetailsSchema],
});

// Define the schema for the metrics of each course
const MetricsSchema = new mongoose.Schema({
  // Basic course identifier
  courseId: Number,

  // Structured similarly to the analytics return object for consistency
  studentCompletion: {
    totalStudents: Number, // Total count of students analyzed
    completedAllCourses: Number, // Students who completed all their courses
    notCompletedAllCourses: Number, // Students who didn't complete any course
    completedSomeCourses: Number, // Students who completed some courses
    completedAllRequirements: Number, // Students who completed all requirements
    notCompletedAllRequirements: Number, // Students who didn't complete all requirements
    completedSomeRequirements: Number, // Students who completed some requirements
  },

  courseAverages: {
    finalScore: Number, // Average final score for all students
    finalScoreCompleted: Number, // Average final score for students who completed the course
    finalScoreNotCompleted: Number, // Average final score for students who didn't complete the course
    requirementCompletedCount: Number, // Average number of completed requirements
    requirementCompletedCountCompleted: Number, // Average requirements completed by those who completed the course
    requirementCompletedCountNotCompleted: Number, // Average requirements completed by those who didn't complete the course
  },

  overallStats: {
    finalScore: {
      total: Number,
      completed: Number,
      notCompleted: Number,
    },
    requirementCount: {
      total: Number,
      completed: Number,
      notCompleted: Number,
    },
    coursesCount: {
      total: Number, // Total courses count (aggregate)
      completed: Number, // Total completed courses count
      notCompleted: Number, // Total not completed courses count
      totalCoursesWithError: Number,
      totalCoursesWithoutError: Number,
    },
    uniqueCoursesCount: {
      total: Number, // Unique courses total count
      completed: Number, // Unique completed courses count
      notCompleted: Number, // Unique not completed courses count
      uniqueCoursesCountWithError: Number,
      uniqueCoursesCountWithoutError: Number,
    },

    coursesLists:{
      uniqueCourses: [String],
      uniqueCoursesWithError: [String],
      uniqueCoursesWithoutError: [String],
      
    },

    studentsWithError: Number, // Number of students with errors in course data
    studentDetails: [studentDetailSchema], // Array of student details

  },


}, { _id: false });


// Define the main dataset schema
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
    enum: ['canvas', 'otherType1', 'otherType2'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  studentCount: {
    type: Number,
    required: true,
    default: 0,
  },
  averageFinalScore: {
    type: Number,
    required: true,
    default: 0,
  },
  completionRate: {
    type: Number,
    required: true,
    default: 0,
  },
  generalEngagementMetrics: [{
    date: Date,
    count: Number,
  }],
  generalParticipationMetrics: [{
    date: Date,
    count: Number,
  }],

  metrics: [MetricsSchema],

  validationNotes: {
    type: [String],
    required: false,
    default: ["Data is clean and has no issues"],
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Flexible data storage
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Dataset = mongoose.model('Dataset', datasetSchema);

module.exports = Dataset;
