const { calculateStudentCompletionCounts } = require('./students/calculateStudentCount');
const { StudentCourseStats } = require('./studentCourseStats/StudentCourseStats');
const { generateInsights } = require('./engagmentParticipation/educationInsights');
// Include other required modules...

const calculateMetrics = (data) => {
  try {
    // Extract metrics using predefined functions
    const studentCompletionCounts = calculateStudentCompletionCounts(data);
    const courseStats = StudentCourseStats(data);
    const engagementInsights = generateInsights(data)
    console.log(engagementInsights.courseEngagement)
    // console.log(courseStats.assignments);
    // console.log(courseStats.minRequirementCount, courseStats.maxRequirementCount)

    // console.log(courseStats)
    // console.log(courseStats.uniqueCoursesCountWithError)
    // console.log(studentsAverageCompletionList,)
    // Aggregate the results
    // Aggregate and return the metrics in a structured and commented manner
    return {
      studentCompletion: {
        // Total count of students analyzed
        totalStudents: studentCompletionCounts.totalStudents,
        // Counts related to course completion status
        completedAllCourses: studentCompletionCounts.studentsCompletedAllCourses,
        notCompletedAllCourses: studentCompletionCounts.studentsNotCompletedAllCourses,
        completedSomeCourses: studentCompletionCounts.studentsCompletedSomeCourses,
        // Counts related to requirement completion status
        completedAllRequirements: studentCompletionCounts.studentsCompletedAllRequirements,
        notCompletedAllRequirements: studentCompletionCounts.studentsNotCompletedAllRequirements,
        completedSomeRequirements: studentCompletionCounts.studentsCompletedSomeRequirements,
      },

      overallStats: {
        // Total and unique counts for courses and final scores
        finalScore: {
          total: courseStats.totalFinalScore,
          completed: courseStats.totalFinalScoreCompleted,
          notCompleted: courseStats.totalFinalScoreNotCompleted,
          // Average scores for final, completed, and not completed courses
          averageFinalScore: courseStats.averageFinalScore,
          averageFinalScoreCompleted: courseStats.averageFinalScoreCompleted,
          averageFinalScoreNotCompleted: courseStats.averageFinalScoreNotCompleted,
          // min max med
          min: courseStats.minFinalScore,
          max: courseStats.maxFinalScore,
          median: courseStats.medianFinalScore,
          minCompleted: courseStats.minFinalScoreCompleted,
          maxCompleted: courseStats.maxFinalScoreCompleted,
          medianCompleted: courseStats.medianFinalScoreCompleted,
          minNotCompleted: courseStats.minFinalScoreNotCompleted,
          maxNotCompleted: courseStats.maxFinalScoreNotCompleted,
          medianNotCompleted: courseStats.medianFinalScoreNotCompleted
        },

        requirementCount: {
          total: courseStats.totalRequirementCount,
          completed: courseStats.totalRequirementCountCompleted,
          notCompleted: courseStats.totalRequirementCountNotCompleted,
          // Average counts of requirements completed
          averageRequirementCompletedCount: courseStats.averageRequirementCompletedCount,
          averageRequirementCompletedCountCompleted: courseStats.averageRequirementCompletedCountCompleted,
          averageRequirementCompletedCountNotCompleted: courseStats.averageRequirementCompletedCountNotCompleted,
          // min max med
          min: courseStats.minRequirementCount,
          max: courseStats.maxRequirementCount,
          median: courseStats.medianRequirementCount,
          minCompleted: courseStats.minRequirementCountCompleted,
          maxCompleted: courseStats.maxRequirementCountCompleted,
          medianCompleted: courseStats.medianRequirementCountCompleted,
          minNotCompleted: courseStats.minRequirementCountNotCompleted,
          maxNotCompleted: courseStats.maxRequirementCountNotCompleted,
          medianNotCompleted: courseStats.medianRequirementCountNotCompleted
        },
        coursesCount: {
          total: courseStats.totalCoursesCount,
          completed: courseStats.totalCompletedCoursesCount,
          notCompleted: courseStats.totalNotCompletedCoursesCount,
          totalCoursesWithError: courseStats.totalCoursesWithError,
          totalCoursesWithoutError: courseStats.totalCoursesWithoutError,

        },
        uniqueCoursesCount: {
          total: courseStats.uniqueCoursesCount,
          completed: courseStats.uniqueCompletedCoursesCount,
          notCompleted: courseStats.uniqueNotCompletedCoursesCount,
          uniqueCoursesCountWithError: courseStats.uniqueCoursesCountWithError,
          uniqueCoursesCountWithoutError: courseStats.uniqueCoursesCountWithoutError,

        },
        coursesLists: {
          uniqueCourses: courseStats.uniqueCourses,
          uniqueCoursesWithError: courseStats.uniqueCoursesWithError,
          uniqueCoursesWithoutError: courseStats.uniqueCoursesWithoutError, // Track unique course IDs without error

        },

        studentsWithError: courseStats.studentsWithError,
        studentDetails: courseStats.studentDetails,
        courseMetrics: Object.values(courseStats.courseDetails),
        termStatistics: Object.values(courseStats.termStatistics),
        assignmentsStatistics: courseStats.assignmentStatistics
      },
      
      engagementAndParticipation: {
        overallEngagement: engagementInsights.overallEngagement,
        courseEngagement: Object.values(engagementInsights.courseEngagement),
        termEngagement: Object.values(engagementInsights.termEngagement),
        studentEngagement: Object.values(engagementInsights.studentEngagement),
        scoreInsights: Object.values(engagementInsights.scoreInsights),
        engagementInsights: engagementInsights.engagementInsights,
      },

    };
  } catch (error) {
    console.error("Error calculating metrics: ", error);
    throw new Error("Failed to calculate metrics due to invalid data structure.");
  }
};

module.exports = { calculateMetrics };
