const { calculateStudentCompletionCounts } = require('./students/calculateStudentCount');
const { StudentCourseStats } = require('./studentCourseStats/StudentCourseStats');
// Include other required modules...

const calculateMetrics = (data) => {
  try {
    // Extract metrics using predefined functions
    const studentCompletionCounts = calculateStudentCompletionCounts(data);
    const courseStats = StudentCourseStats(data);
    console.log(courseStats.uniqueCoursesCountWithoutError)
    console.log(courseStats.uniqueCoursesCountWithError)
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
      courseAverages: {
        // Average scores for final, completed, and not completed courses
        finalScore: courseStats.averageFinalScore,
        finalScoreCompleted: courseStats.averageFinalScoreCompleted,
        finalScoreNotCompleted: courseStats.averageFinalScoreNotCompleted,
        // Average counts of requirements completed
        requirementCompletedCount: courseStats.averageRequirementCompletedCount,
        requirementCompletedCountCompleted: courseStats.averageRequirementCompletedCountCompleted,
        requirementCompletedCountNotCompleted: courseStats.averageRequirementCompletedCountNotCompleted,
      },
      overallStats: {
        // Total and unique counts for courses and final scores
        finalScore: {
          total: courseStats.totalFinalScore,
          completed: courseStats.totalFinalScoreCompleted,
          notCompleted: courseStats.totalFinalScoreNotCompleted,
        },
        requirementCount: {
          total: courseStats.totalRequirementCount,
          completed: courseStats.totalRequirementCountCompleted,
          notCompleted: courseStats.totalRequirementCountNotCompleted,
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
      },

    };
  } catch (error) {
    console.error("Error calculating metrics: ", error);
    throw new Error("Failed to calculate metrics due to invalid data structure.");
  }
};

module.exports = { calculateMetrics };
