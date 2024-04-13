const mongoose = require('mongoose');

// TermStatistics sub-schema
const TermStatisticsSchema = new mongoose.Schema({
  termId: Number,
  averageScore: Number,
  minScore: Number,
  maxScore: Number,
  medianScore: Number,
  averageRequirementCount: Number,
  minRequirementCount: Number,
  maxRequirementCount: Number,
  medianRequirementCount: Number,
}, { _id: false });

const CourseMetricsSchema = new mongoose.Schema({
  courseId: Number,
  name: String,
  termId: Number,
  terms: [Number], // List of term IDs the course was offered in
  finalScores: [Number],
  requirementCounts: [Number],
  completedCount: Number,
  notCompletedCount: Number,
  errorCount: Number,
  // Calculated metrics
  totalStudents: Number, // Total number of students who took the course
  averageFinalScore: Number, // Average score of all students
  minFinalScore: Number, // Minimum score among all students
  maxFinalScore: Number, // Maximum score among all students
  medianFinalScore: Number, // Median score among all students
  averageRequirementCount: Number, // Average of completed requirements
  minRequirementCount: Number, // Minimum of completed requirements
  maxRequirementCount: Number, // Maximum of completed requirements
  medianRequirementCount: Number, // Median of completed requirements
  averageTermScore: mongoose.Schema.Types.Mixed, // Average scores per term, stored as an object {termId: averageScore}
  completionRate: Number, // Percentage of students who completed the course
  // New: termScores is now part of termStatistics
}, { _id: false });

// ---
const courseDetailsSchema = new mongoose.Schema({
  courseId: String,
  finalScore: Number,
  requirementCompletedCount: Number,
  isModular: Boolean,
  isCompleted: Boolean,
  courseError: Boolean,
  termId: Number
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
  coursesCount: Number,
  completionRate: Number,
});

const studentDetailSchema = new mongoose.Schema({
  studentId: String,
  studentError: Boolean,
  averages: studentAveragesSchema,
  coursesDetailsPerStudent: [courseDetailsSchema],
});


// -------------
const StudentStatSchema = new mongoose.Schema({
  studentId: String, // Assuming unique identifier for a student
  assignmentsCompleted: { type: Number, default: 0 },
  totalScore: Number,
  count: Number,
  onTimeCount: Number,
  lateCount: Number,
  mutedCount: Number,
  excusedCount: Number,
  scorePercentages: [Number],
  scores: [Number],
  averageScore: Number,
  averagePercentage: Number,
  medianPercentage: Number,
  firstQuartile: Number,
  median: Number,
  thirdQuartile: Number
});

const CourseStatSchema = new mongoose.Schema({
  courseId: String, // Assuming unique identifier for a course
  studentsEnrolled: { type: Number, default: 0 },
  totalScore: Number,
  count: Number,
  onTimeCount: Number,
  lateCount: Number,
  mutedCount: Number,
  excusedCount: Number,
  scorePercentages: [Number],
  scores: [Number],
  averageScore: Number,
  averagePercentage: Number,
  medianPercentage: Number,
  firstQuartile: Number,
  secondQuartile: Number,
  thirdQuartile: Number
});

const AssignmentStatSchema = new mongoose.Schema({
  assignmentId: Number, // Assuming unique identifier for an assignment
  scores: [Number],
  studentsCompleted: { type: Number, default: 0 },
  count: Number,
  totalScore: Number,
  onTimeCount: Number,
  lateCount: Number,
  mutedCount: Number,
  excusedCount: Number,
  scorePercentages: [Number],
  averageScore: Number,
  averagePercentage: Number,
  medianPercentage: Number,
  firstQuartile: Number,
  secondQuartile: Number,
  thirdQuartile: Number
});

const ComprehensiveStatSchema = new mongoose.Schema({
  assignments: [AssignmentStatSchema],
  courses: [CourseStatSchema],
  students: [StudentStatSchema],
});


// -----------------


// ----Engagment----

const EngagementSchema = new mongoose.Schema({
  totalPageViews: Number,
  totalParticipations: Number,
  pageViewSessions: Number,
}, { _id: false });

const ScoreDistributionSchema = new mongoose.Schema({
  excellent: Number,
  good: Number,
  average: Number,
  belowAverage: Number,
  poor: Number,
}, { _id: false });

const CourseEngagementSchema = new mongoose.Schema({
  courseId: String,
  name: String,
  totalPageViews: Number,
  totalParticipations: Number,
  assignmentsCount: Number,
  averageFinalScore: Number,
  percentageScores: [Number],
  averagePercentageScore: Number,

  terms: [String],
}, { _id: false });

const TermEngagementSchema = new mongoose.Schema({
  termId: String,
  name: String,
  totalPageViews: Number,
  totalParticipations: Number,
  coursesCount: Number,
  averageFinalScore: Number,
  averagePercentageScore: Number,
  studentsCount: Number, // Assuming you convert the Set size to a count
}, { _id: false });

const StudentEngagementSchema = new mongoose.Schema({
  studentId: String,
  totalPageViews: Number,
  totalParticipations: Number,
  coursesCount: Number,
  averageFinalScore: Number,
  averagePercentageScore: Number,
  terms: [String],
}, { _id: false });

const ScoreInsightSchema = new mongoose.Schema({
  courseId: String,
  averageScore: Number,
  scoreDistribution: ScoreDistributionSchema,
}, { _id: false });

const ParticipationSchema = new mongoose.Schema({
  date: String,
  term: String,
  courseId: String,
  studentId: String,
  interactionType: String, // e.g., quiz, discussion
  interactionDetail: mongoose.Schema.Types.Mixed, // Flexible to store URL or other details
}, { _id: false }); // Prevent MongoDB from creating a default _id

const PageViewSchema = new mongoose.Schema({
  date: String,
  term: String,
  courseId: String,
  studentId: String,
  viewCount: Number,
}, { _id: false }); // Prevent MongoDB from creating a default _id

const CommunicationSchema = new mongoose.Schema({
  date: String,
  term: String,
  courseId: String,
  studentId: String,
  messageType: String, // e.g., "instructorMessage"
  messageCount: Number,
}, { _id: false }); // Prevent MongoDB from creating a default _id

// Main schema for engagement insights
const EngagementInsightsSchema = new mongoose.Schema({
  participation: [ParticipationSchema],
  pageViews: [PageViewSchema],
  communication: [CommunicationSchema],
});

// -----------------



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

  overallStats: {
    finalScore: {

      total: Number,
      completed: Number,
      notCompleted: Number,
      averageFinalScore: Number, // Average final score for all students
      averageFinalScoreCompleted: Number, // Average final score for students who completed the course
      averageFinalScoreNotCompleted: Number, // Average final score for students who didn't complete the course
      min: Number,
      max: Number,
      median: Number,
      minCompleted: Number,
      maxCompleted: Number,
      medianCompleted: Number,
      minNotCompleted: Number,
      maxNotCompleted: Number,
      medianNotCompleted: Number
    },
    requirementCount: {
      total: Number,
      completed: Number,
      notCompleted: Number,
      averageRequirementCompletedCount: Number, // Average number of completed requirements
      averageRequirementCompletedCountCompleted: Number, // Average requirements completed by those who completed the course
      averageRequirementCompletedCountNotCompleted: Number, // Average requirements completed by those who didn't complete the course
      // min max med
      min: Number,
      max: Number,
      median: Number,
      minCompleted: Number,
      maxCompleted: Number,
      medianCompleted: Number,
      minNotCompleted: Number,
      maxNotCompleted: Number,
      medianNotCompleted: Number
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

    coursesLists: {
      uniqueCourses: [String],
      uniqueCoursesWithError: [String],
      uniqueCoursesWithoutError: [String],

    },

    studentsWithError: Number, // Number of students with errors in course data
    studentDetails: [studentDetailSchema], // Array of student details
    courseMetrics: [CourseMetricsSchema],
    termStatistics: [TermStatisticsSchema],
    assignmentsStatistics: ComprehensiveStatSchema,

  },

  engagementAndParticipation: {
    overallEngagement: EngagementSchema,
    courseEngagement: [CourseEngagementSchema], // Assuming multiple courses
    termEngagement: [TermEngagementSchema], // Assuming multiple terms
    studentEngagement: [StudentEngagementSchema], // Assuming multiple students
    scoreInsights: [ScoreInsightSchema], // Assuming insights for multiple courses
    engagementInsights: EngagementInsightsSchema
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
