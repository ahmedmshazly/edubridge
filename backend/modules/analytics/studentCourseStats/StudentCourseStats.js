
const isCourseValidAndCompleted = (course) => {
  const progress = course.course_progress;
  // Adjusted to check for the existence of 'progress' before evaluating 'errorPresent'
  const errorPresent = Boolean(progress && progress.error);
  if (!progress) return { isValid: false, isCompleted: false, errorPresent };

  if (progress.error) return { isValid: true, isCompleted: false, errorPresent };

  const isCompleted = Boolean(progress.completed_at || progress.requirement_count === progress.requirement_completed_count);
  return { isValid: true, isCompleted, errorPresent };
};


// Main function to calculate course averages with detailed tracking
const StudentCourseStats = (data) => {
  let studentDetails = []; // To keep track of each student's details
  let overallStats = {
    totalFinalScore: 0,
    totalFinalScoreCompleted: 0,
    totalFinalScoreNotCompleted: 0,
    totalRequirementCount: 0,
    totalRequirementCountCompleted: 0,
    totalRequirementCountNotCompleted: 0,
    totalCoursesCount: 0,
    totalCompletedCoursesCount: 0,
    totalNotCompletedCoursesCount: 0,
    studentsWithError: 0,
    uniqueCourses: new Set(),
    uniqueCoursesCount: 0,
    uniqueCompletedCoursesCount: 0,
    uniqueNotCompletedCoursesCount: 0,
    // New overall stats for tracking courses with errors
    totalCoursesWithError: 0,
    uniqueCoursesWithError: new Set(), // Track unique course IDs with errors
    uniqueCoursesCountWithError: 0, // unique course count with errors

    totalCoursesWithoutError: 0,
    uniqueCoursesWithoutError: new Set(), // Track unique course IDs without errors
    uniqueCoursesCountWithoutError: 0, // unique course count without errors
  };

  // Iterate over each student
  Object.entries(data).forEach(([studentId, student]) => {
    let studentError = false;
    let courseError = false;
    let coursesDetails = []; // To keep track of each course's details for the current student
    let studentAverages = {
      totalFinalScore: 0,
      totalRequirementCount: 0,
      coursesCount: 0,
      completedCoursesCount: 0,
      notCompletedCoursesCount: 0, // Initialize not completed courses count
      totalFinalScoreCompleted: 0, // Initialize total final score for completed courses
      totalRequirementCountCompleted: 0, // Initialize total requirement count for completed courses
      totalFinalScoreNotCompleted: 0, // Initialize total final score for not completed courses
      totalRequirementCountNotCompleted: 0, // Initialize total requirement count for not completed courses
    };


    // Iterate over each course
    Object.entries(student.courses || {}).forEach(([courseId, course]) => {
      const { isValid, isCompleted, errorPresent } = isCourseValidAndCompleted(course);
      courseError = Boolean(errorPresent);
      if (courseError) {
        // Track total and unique courses with errors
        overallStats.totalCoursesWithError++;
        overallStats.uniqueCoursesWithError.add(courseId);
      }
      else {
        // Track total and unique courses with errors
        overallStats.totalCoursesWithoutError++;
        overallStats.uniqueCoursesWithoutError.add(courseId);
      }
      if (!isValid) {
        // If the course is invalid due to an error, handle it accordingly
        studentError = true;
        return; // Skip invalid courses
      }
      const finalScore = course.final_score || 0;
      const requirementCompletedCount = course.course_progress.requirement_completed_count || 0;

      studentAverages.totalFinalScore += finalScore;
      studentAverages.totalRequirementCount += requirementCompletedCount;
      studentAverages.coursesCount++;

      coursesDetails.push({ courseId, finalScore, requirementCompletedCount, isCompleted, courseError });

      // Accumulate totals for overall stats
      overallStats.totalFinalScore += finalScore;
      overallStats.totalRequirementCount += requirementCompletedCount;
      overallStats.totalCoursesCount++;

      if (isCompleted) {
        overallStats.totalFinalScoreCompleted += finalScore;
        overallStats.totalRequirementCountCompleted += requirementCompletedCount;
        overallStats.totalCompletedCoursesCount++;

        studentAverages.totalFinalScoreCompleted += finalScore;
        studentAverages.totalRequirementCountCompleted += requirementCompletedCount;
        studentAverages.completedCoursesCount++;

      } else {
        overallStats.totalFinalScoreNotCompleted += finalScore;
        overallStats.totalRequirementCountNotCompleted += requirementCompletedCount;
        overallStats.totalNotCompletedCoursesCount++;

        studentAverages.totalFinalScoreNotCompleted += finalScore;
        studentAverages.totalRequirementCountNotCompleted += requirementCompletedCount;
        studentAverages.notCompletedCoursesCount++;
      }



      // Handle unique courses
      if (!overallStats.uniqueCourses.has(courseId)) {
        overallStats.uniqueCourses.add(courseId);
        overallStats.uniqueCoursesCount++;
        if (isCompleted) {
          overallStats.uniqueCompletedCoursesCount++;
        } else {
          overallStats.uniqueNotCompletedCoursesCount++;
        }

      }

      if (courseError) {
        // Track total and unique courses with errors
        overallStats.uniqueCoursesWithError.add(courseId);
        overallStats.uniqueCoursesCountWithError++;
      } else {
        // If the course is valid and doesn't have an error, track it as without error
        overallStats.uniqueCoursesWithoutError.add(courseId);
        overallStats.uniqueCoursesCountWithoutError++;
      }

    });




    if (studentError) overallStats.studentsWithError++;

    studentDetails.push({
      studentId,
      student,
      studentError,
      coursesDetails,
      averages: {
        averageFinalScore: studentAverages.coursesCount > 0 ? studentAverages.totalFinalScore / studentAverages.coursesCount : 0,
        averageRequirementCompletedCount: studentAverages.coursesCount > 0 ? studentAverages.totalRequirementCount / studentAverages.coursesCount : 0,
        averageFinalScoreCompleted: studentAverages.completedCoursesCount > 0 ? studentAverages.totalFinalScoreCompleted / studentAverages.completedCoursesCount : 0,
        averageRequirementCompletedCountCompleted: studentAverages.completedCoursesCount > 0 ? studentAverages.totalRequirementCountCompleted / studentAverages.completedCoursesCount : 0,
        averageFinalScoreNotCompleted: studentAverages.notCompletedCoursesCount > 0 ? studentAverages.totalFinalScoreNotCompleted / studentAverages.notCompletedCoursesCount : 0,
        averageRequirementCompletedCountNotCompleted: studentAverages.notCompletedCoursesCount > 0 ? studentAverages.totalRequirementCountNotCompleted / studentAverages.notCompletedCoursesCount : 0,
        completedCoursesCount: studentAverages.completedCoursesCount,
        notCompletedCoursesCount: studentAverages.notCompletedCoursesCount,
        coursesCount: studentAverages.coursesCount
      }
    });

  });

  overallStats.uniqueCourses = Array.from(overallStats.uniqueCourses);

  // After iterating over all courses and students
  overallStats.uniqueCoursesCountWithError = overallStats.uniqueCoursesWithError.size;
  overallStats.uniqueCoursesCountWithoutError = overallStats.uniqueCoursesWithoutError.size;

  // Now convert the Sets to Arrays for any further processing or storage
  overallStats.uniqueCoursesWithError = Array.from(overallStats.uniqueCoursesWithError);
  overallStats.uniqueCoursesWithoutError = Array.from(overallStats.uniqueCoursesWithoutError);

  // Calculating specific overall averages
  const averages = {
    averageFinalScore: overallStats.totalCoursesCount > 0 ? overallStats.totalFinalScore / overallStats.totalCoursesCount : 0,
    averageFinalScoreCompleted: overallStats.totalCompletedCoursesCount > 0 ? overallStats.totalFinalScoreCompleted / overallStats.totalCompletedCoursesCount : 0,
    averageFinalScoreNotCompleted: overallStats.totalNotCompletedCoursesCount > 0 ? overallStats.totalFinalScoreNotCompleted / overallStats.totalNotCompletedCoursesCount : 0,
    averageRequirementCompletedCount: overallStats.totalCoursesCount > 0 ? overallStats.totalRequirementCount / overallStats.totalCoursesCount : 0,
    averageRequirementCompletedCountCompleted: overallStats.totalCompletedCoursesCount > 0 ? overallStats.totalRequirementCountCompleted / overallStats.totalCompletedCoursesCount : 0,
    averageRequirementCompletedCountNotCompleted: overallStats.totalNotCompletedCoursesCount > 0 ? overallStats.totalRequirementCountNotCompleted / overallStats.totalNotCompletedCoursesCount : 0,
  };

  // console.log(studentDetails)


  return {
    studentDetails,
    ...averages,
    ...overallStats // This includes counts of total, completed, not completed courses, and students with error
  };
};

module.exports = { StudentCourseStats };


/* studentDetails = [
  {
    studentId: "Student_109", // A unique identifier for the student
    studentError: false, // Indicates if there was an error in processing this student's data
    coursesDetails: [ // An array of course details for each course the student is enrolled in
      {
        courseId: "169", // A unique identifier for the course
        finalScore: 95, // The final score the student achieved in the course
        requirementCompletedCount: 10, // The number of requirements the student completed in the course
        isCompleted: true, // Indicates if the course is considered completed by the student
      },
      // Additional courses follow the same structure
    ],
    averages: { // Averages and totals calculated for this student
      averageFinalScore: 90, // The average final score across all the student's courses
      averageRequirementCompletedCount: 8, // The average number of requirements completed across courses
      completedCoursesCount: 5, // The total number of courses completed by the student
      coursesCount: 6, // The total number of courses the student is enrolled in
    }
  },
  // Additional students follow the same structure
]
*/
// totalStudents": 19,
//             "studentsCompletedAllCourses": 0,
//             "studentsNotCompletedAllCourses": 19,
//             "studentsCompletedSomeCourses": 19,
//             "studentsCompletedAllRequirements": 0,
//             "studentsNotCompletedAllRequirements": 19,
//             "studentsCompletedSomeRequirements": 19,
//             "averageFinalScore": 65.3038222543353,
//             "averageFinalScoreCompleted": 68.9726570458404,
//             "averageFinalScoreNotCompleted": 44.32378640776697,
//             "averageRequirementCompletedCount": 9.39956647398844,
//             "averageRequirementCompletedCountCompleted": 9.404923599320883,
//             "averageRequirementCompletedCountNotCompleted": 9.368932038834952,
//             "studentsAverageCompletionList": [],
//             "coursesList": []
//         }
//     ]


