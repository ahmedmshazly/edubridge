const getNestedProp = (obj, path) => {
  return path.reduce((acc, part) => {
    // console.log(`Accessing ${part} of:`, acc); // Debugging log
    return acc && acc[part];
  }, obj) || null;
};


function processAssignment(assignment, studentId, courseId) {
  try {
    // console.log(assignment)
    // Calculate the difference in days between two dates
    const dateDiffInDays = (date1, date2) => {
      if (!date1 || !date2) return null;
      const dt1 = new Date(date1);
      const dt2 = new Date(date2);
      return Math.floor((dt2 - dt1) / (1000 * 60 * 60 * 24));
    };

    // Basic assignment information extracted safely
    const processed = {
      studentId,
      courseId,
      assignmentId: getNestedProp(assignment, ['assignment_id']),
      title: getNestedProp(assignment, ['title']),
      pointsPossible: getNestedProp(assignment, ['points_possible']),
      status: getNestedProp(assignment, ['status']),
      unlockAt: getNestedProp(assignment, ['unlock_at']),
      dueAt: getNestedProp(assignment, ['due_at']),
      submittedAt: getNestedProp(assignment, ['submission', 'submitted_at']),
      postedAt: getNestedProp(assignment, ['submission', 'posted_at']),
      score: getNestedProp(assignment, ['submission', 'score']),
      // Update handling for boolean fields to explicitly set false if present or null if not
      nonDigitalSubmission: assignment.hasOwnProperty('non_digital_submission') ? assignment.non_digital_submission : null,
      multipleDueDates: assignment.hasOwnProperty('multiple_due_dates') ? assignment.multiple_due_dates : null,
      muted: assignment.hasOwnProperty('muted') ? assignment.muted : null,
      maxScore: getNestedProp(assignment, ['max_score']),
      minScore: getNestedProp(assignment, ['min_score']),
      firstQuartile: getNestedProp(assignment, ['first_quartile']),
      median: getNestedProp(assignment, ['median']),
      thirdQuartile: getNestedProp(assignment, ['third_quartile']),
      moduleIds: getNestedProp(assignment, ['module_ids']),
      excused: assignment.hasOwnProperty('excused') ? assignment.excused : null,
    };


    // Calculate date differences where applicable
    processed.daysFromUnlockToDue = processed.unlockAt ? dateDiffInDays(processed.unlockAt, processed.dueAt) : null;
    processed.daysFromDueToSubmission = processed.dueAt && processed.submittedAt ? dateDiffInDays(processed.dueAt, processed.submittedAt) : null;

    // Calculate score percentage if scores are present
    if (processed.score !== null && processed.pointsPossible) {
      processed.scorePercentage = (processed.score / processed.pointsPossible) * 100;
    }

    return processed;
  } catch (error) {
    console.error("Error processing assignment:", error);
    return { error: "An error occurred during processing." };
  }
}


function analyzeAssignments(assignments) {
  const assignmentStats = {};
  const courseStats = {};
  const studentStats = {};

  assignments.forEach(assignment => {
    const assignmentKey = `${assignment.assignmentId}`;
    const courseKey = `${assignment.courseId}`;
    const studentKey = `${assignment.studentId}`;

    // Initialize stat objects if they don't exist
    if (!assignmentStats[assignmentKey]) {
      assignmentStats[assignmentKey] = initializeStatObject(assignment);
    }
    if (!courseStats[courseKey]) {
      courseStats[courseKey] = initializeCourseOrStudentStatObject();
    }
    if (!studentStats[studentKey]) {
      studentStats[studentKey] = initializeCourseOrStudentStatObject();
    }

    // Update stats for each category
    updateStats(assignmentStats[assignmentKey], assignment, studentKey);
    updateStats(courseStats[courseKey], assignment, studentKey);
    updateStats(studentStats[studentKey], assignment, studentKey);
  });

  // Calculate additional statistics and finalize structures
  finalizeStats(assignmentStats);
  finalizeStats(courseStats);
  finalizeStats(studentStats);

  return { assignmentStats, courseStats, studentStats };
}

function initializeStatObject(assignment) {
  return {
    // ...assignment,
    scores: [],
    students: new Set(),
    count: 0,
    totalScore: 0,
    onTimeCount: 0,
    lateCount: 0,
    mutedCount: 0,
    excusedCount: 0,
    scorePercentages: [],
  };
}

function initializeCourseOrStudentStatObject() {
  return {
    assignments: new Set(),
    students: new Set(),
    totalScore: 0,
    count: 0,
    onTimeCount: 0,
    lateCount: 0,
    mutedCount: 0,
    excusedCount: 0,
    scorePercentages: [],
  };
}

function updateStats(stat, assignment, studentKey) {
  if (!stat.scores) stat.scores = [];
  if (!stat.scorePercentages) stat.scorePercentages = [];
  if (!stat.students) stat.students = new Set();
  if (typeof stat.count !== 'number') stat.count = 0;
  if (typeof stat.totalScore !== 'number') stat.totalScore = 0;
  if (typeof stat.onTimeCount !== 'number') stat.onTimeCount = 0;
  if (typeof stat.lateCount !== 'number') stat.lateCount = 0;
  if (typeof stat.mutedCount !== 'number') stat.mutedCount = 0;
  if (typeof stat.excusedCount !== 'number') stat.excusedCount = 0;

  // Safely update statistics with checks for undefined and type correctness
  if (typeof assignment.score === 'number') {
    stat.scores.push(assignment.score);
    stat.totalScore += assignment.score;
    // Calculate score percentage if pointsPossible is a positive number
    if (typeof assignment.pointsPossible === 'number' && assignment.pointsPossible > 0) {
      const scorePercentage = (assignment.score / assignment.pointsPossible) * 100;
      stat.scorePercentages.push(scorePercentage);
    }
    stat.count++;
  }

  if (studentKey) {
    stat.students.add(studentKey);
  }

  // Update counts based on assignment properties
  if (assignment.status === 'on_time') {
    stat.onTimeCount++;
  } else if (assignment.status === 'late') {
    stat.lateCount++;
  }
  if (assignment.muted) {
    stat.mutedCount++;
  }
  if (assignment.excused) {
    stat.excusedCount++;
  }
}

function finalizeStats(stats) {
  Object.values(stats).forEach(stat => {
    stat.averageScore = average(stat.scores);
    stat.averagePercentage = average(stat.scorePercentages);
    stat.medianPercentage = median(stat.scorePercentages)
    stat.students = stat.students.size;
    stat.assignments = stat.assignments ? stat.assignments.size : undefined;
    const quartiles = calculateQuartiles(stat.scores);
    stat.firstQuartile = quartiles.q1;
    stat.secondQuartile = quartiles.q2;
    stat.thirdQuartile = quartiles.q3;
  });
}

function calculateQuartiles(scores) {
  const sortedScores = scores.slice().sort((a, b) => a - b);
  const quartiles = { q1: null, q2: null, q3: null };

  if (sortedScores.length) {
    const midIndex = Math.floor(sortedScores.length / 2);
    quartiles.q2 = sortedScores[midIndex]; // Median
    quartiles.q1 = median(sortedScores.slice(0, midIndex));
    quartiles.q3 = median(sortedScores.slice(midIndex + 1));
  }
  
  return quartiles;
}

function average(array) {
  return array.length ? array.reduce((sum, value) => sum + value, 0) / array.length : 0;
}

// A helper function to calculate median for quartile calculation
function median(array) {
  if (!array.length) return null;
  const sorted = array.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}



const isCourseValidAndCompleted = (course) => {
  const progress = course.course_progress;
  // Adjusted to check for the existence of 'progress' before evaluating 'errorPresent'
  const modular = Boolean(progress && !progress.error);
  const errorPresent = Boolean(progress && course.retrieval_error);
  if (!progress) return { isValid: false, isCompleted: false, errorPresent, modular };

  if (progress.error) return { isValid: true, isCompleted: false, errorPresent, modular };

  const isCompleted = Boolean(progress.completed_at || progress.requirement_count === progress.requirement_completed_count);
  return { isValid: true, isCompleted, errorPresent, modular };
};

function safeCalculateAverage(values) {
  // Filter out null or undefined values
  const validValues = values.filter(value => value !== null && value !== undefined);
  const total = validValues.reduce((acc, value) => acc + value, 0);
  const count = validValues.length;
  const average = count > 0 ? total / count : 0;

  // Return the average along with other relevant calculation details
  return {
    average: average,
    total: total,
    count: count,
    valid: count === values.length, // Whether all values were valid
  };
}

// A safe division function that returns 0 when attempting to divide by zero
const safeDivision = (numerator, denominator) => {
  if (denominator === 0) return 0;
  return numerator / denominator;
};

let calculateMinMaxMedian = (values) => {
  // console.log(values)
  if (!values.length) return [0, 0, 0]; // Return default values for empty arrays

  let sortedValues = values.slice().sort((a, b) => a - b);
  let min = sortedValues[0];
  let max = sortedValues[sortedValues.length - 1];

  let median = sortedValues.length % 2 === 0 ?
    (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2 :
    sortedValues[Math.floor(sortedValues.length / 2)];

  return { min: min, max: max, median: median };
};


function calculateMedian(numbers) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

const calculatePercentage = (part, total) => {
  return total > 0 ? (part / total) * 100 : 0;
};



// Main function to calculate course averages with detailed tracking
const StudentCourseStats = (data) => {
  let termData = {}; // Object to aggregate data by term
  let courseDetails = {}; // To keep track of each course's details
  let studentDetails = []; // To keep track of each student's details
  let overallStats = {
    // final score stats
    totalFinalScore: 0,
    totalFinalScoreCompleted: 0,
    totalFinalScoreNotCompleted: 0,
    minFinalScore: 0,
    minFinalScoreCompleted: 0,
    minFinalScoreNotCompleted: 0,
    maxFinalScore: 0,
    maxFinalScoreCompleted: 0,
    maxFinalScoreNotCompleted: 0,
    medianFinalScore: 0,
    medianFinalScoreCompleted: 0,
    medianFinalScoreNotCompleted: 0,
    // req
    totalRequirementCount: 0,
    minRequirementCount: 0,
    maxRequirementCount: 0,
    medianRequirementCount: 0,
    totalRequirementCountCompleted: 0,
    minRequirementCountCompleted: 0,
    maxRequirementCountCompleted: 0,
    medianRequirementCountCompleted: 0,
    totalRequirementCountNotCompleted: 0,
    minRequirementCountNotCompleted: 0,
    maxRequirementCountNotCompleted: 0,
    medianRequirementCountNotCompleted: 0,
    // cou
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

  let valuesLists = {
    finalScores: [],
    finalScoresCompleted: [],
    finalScoresNotCompleted: [],
    requirementCounts: [],
    requirementCountsCompleted: [],
    requirementCountsNotCompleted: []

  }

  let assignments = [];
  let assignmentStatistics = {};




  // Iterate over each student
  Object.entries(data).forEach(([studentId, student]) => {
    let studentError = false;
    let coursesDetailsPerStudent = []; // To keep track of each course's details for the current student
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
      completionRate: 0,
    };



    // Iterate over each course
    Object.entries(student.courses || {}).forEach(([courseId, course]) => {

      const { isValid, isCompleted, errorPresent, modular } = isCourseValidAndCompleted(course);

      let courseError = false;
      courseError = Boolean(errorPresent);
      let isModular = true;
      isModular = Boolean(modular)
      const finalScore = course.final_score || 0;
      const requirementCompletedCount = course.course_progress.requirement_completed_count || 0;
      const termId = course.enrollment_term_id
      // -- General --
      studentAverages.totalFinalScore += finalScore;
      valuesLists.finalScores.push(finalScore)
      valuesLists.requirementCounts.push(requirementCompletedCount)
      studentAverages.totalRequirementCount += requirementCompletedCount;
      studentAverages.coursesCount++;

      coursesDetailsPerStudent.push({ courseId, finalScore, requirementCompletedCount, isModular, isCompleted, courseError, termId });

      // Accumulate totals for overall stats
      overallStats.totalFinalScore += finalScore;
      overallStats.totalRequirementCount += requirementCompletedCount;
      overallStats.totalCoursesCount++;

      // New: Aggregate data for termStatistics
      if (!termData[termId]) {
        termData[termId] = {
          termId: termId,
          scores: [],
          requirementCounts: [],
        };
      }
      termData[termId].scores.push(course.final_score || 0);
      termData[termId].requirementCounts.push(course.course_progress.requirement_completed_count || 0);



      // New: Accumulate data for courseDetails
      if (!courseDetails[courseId]) {
        courseDetails[courseId] = {
          courseId,
          name: course.name,
          termId: course.enrollment_term_id,
          finalScores: [],
          requirementCounts: [],
          completedCount: 0,
          notCompletedCount: 0,
          errorCount: 0,
          terms: new Set(), // To track different terms
          termScores: [], // New: List to keep scores by term
          completedCount: 0,
          notCompletedCount: 0,
          totalStudents: 0, // New: Total number of students
          // Add more fields as necessary
        };
      }
      // Update courseDetails with information from this instance of the course
      let details = courseDetails[courseId];
      if (isCompleted) details.completedCount++;
      if (!isCompleted) details.notCompletedCount++;
      if (courseError) details.errorCount++;
      details.finalScores.push(finalScore || 0);
      details.requirementCounts.push(requirementCompletedCount || 0);
      details.terms.add(course.enrollment_term_id); // Add term ID to the set
      details.totalStudents++; // Increment total students count
      // Accumulate scores by term
      if (!details.termScores[course.enrollment_term_id]) {
        details.termScores[course.enrollment_term_id] = [];
      }
      details.termScores[course.enrollment_term_id].push(course.final_score || 0);


      // Completed courses
      if (isCompleted) {

        overallStats.totalFinalScoreCompleted += finalScore;
        overallStats.totalRequirementCountCompleted += requirementCompletedCount;
        overallStats.totalCompletedCoursesCount++;
        // ---- 
        studentAverages.totalFinalScoreCompleted += finalScore;
        studentAverages.totalRequirementCountCompleted += requirementCompletedCount;
        studentAverages.completedCoursesCount++;

        // min max median
        valuesLists.finalScoresCompleted.push(finalScore)
        valuesLists.requirementCountsCompleted.push(requirementCompletedCount)


      }

      // Not complete courses
      else {
        overallStats.totalFinalScoreNotCompleted += finalScore;
        overallStats.totalRequirementCountNotCompleted += requirementCompletedCount;
        overallStats.totalNotCompletedCoursesCount++;
        // ---
        studentAverages.totalFinalScoreNotCompleted += finalScore;
        studentAverages.totalRequirementCountNotCompleted += requirementCompletedCount;
        studentAverages.notCompletedCoursesCount++;

        // min max median
        valuesLists.finalScoresNotCompleted.push(finalScore)
        valuesLists.requirementCountsNotCompleted.push(requirementCompletedCount)

      }

      // withError
      if (courseError) {
        overallStats.totalCoursesWithError++;
        overallStats.uniqueCoursesWithError.add(courseId);
      }
      // Without Error
      else {
        overallStats.totalCoursesWithoutError++;
        overallStats.uniqueCoursesWithoutError.add(courseId);
      }

      // If the course is invalid due to an error, handle it accordingly
      if (!isValid) {
        studentError = true;
        return; // Skip invalid courses
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

        if (courseError) {
          // Track total and unique courses with errors
          overallStats.uniqueCoursesWithError.add(courseId);
          overallStats.uniqueCoursesCountWithError++;
        } else {
          // If the course is valid and doesn't have an error, track it as without error
          overallStats.uniqueCoursesWithoutError.add(courseId);
          overallStats.uniqueCoursesCountWithoutError++;
        }

      }

      if (Array.isArray(course.assignments)) {
        course.assignments.forEach((assignment) => {
          let tempAss = processAssignment(assignment, studentId, courseId);
          assignments.push(tempAss); 
          // console.losg(tempAss)
        });
      } else {
        // Handle the case where course.assignments does not exist or is not an array
        // For example, you might want to log a warning or push a default value
        console.warn(`No assignments found for course with ID: ${courseId}`);
      }

      function includeKeyInValues(statsObject, idName) {
        return Object.entries(statsObject).map(([key, value]) => {
          // Include the key as part of the object with a dynamic property name
          return {
            [idName]: key, // Dynamically set the property name for the ID
            ...value,
            // Convert Set to Array for students and assignments, if applicable
            students: Array.isArray(value.students) ? value.students : Array.from(value.students),
            assignments: value.assignments ? Array.from(value.assignments) : undefined,
          };
        });
      }
      
      function transformAndOrganizeData(tempAssignmentStatistics) {
        const assignmentStatistics = {
          assignments: includeKeyInValues(tempAssignmentStatistics.assignmentStats, 'assignmentId'),
          courses: includeKeyInValues(tempAssignmentStatistics.courseStats, 'courseId'),
          students: includeKeyInValues(tempAssignmentStatistics.studentStats, 'studentId')
        };
      
        return assignmentStatistics;
      }
      
      // Usage example
      tempAssignmentStatistics = analyzeAssignments(assignments);
      assignmentStatistics = transformAndOrganizeData(tempAssignmentStatistics);
      
    });




    if (studentError) overallStats.studentsWithError++;

    studentDetails.push({
      studentId,
      student,
      studentError,
      coursesDetailsPerStudent,
      averages: {
        averageFinalScore: studentAverages.coursesCount > 0 ? studentAverages.totalFinalScore / studentAverages.coursesCount : 0,
        averageRequirementCompletedCount: studentAverages.coursesCount > 0 ? studentAverages.totalRequirementCount / studentAverages.coursesCount : 0,
        averageFinalScoreCompleted: studentAverages.completedCoursesCount > 0 ? studentAverages.totalFinalScoreCompleted / studentAverages.completedCoursesCount : 0,
        averageRequirementCompletedCountCompleted: studentAverages.completedCoursesCount > 0 ? studentAverages.totalRequirementCountCompleted / studentAverages.completedCoursesCount : 0,
        averageFinalScoreNotCompleted: studentAverages.notCompletedCoursesCount > 0 ? studentAverages.totalFinalScoreNotCompleted / studentAverages.notCompletedCoursesCount : 0,
        averageRequirementCompletedCountNotCompleted: studentAverages.notCompletedCoursesCount > 0 ? studentAverages.totalRequirementCountNotCompleted / studentAverages.notCompletedCoursesCount : 0,
        completedCoursesCount: studentAverages.completedCoursesCount,
        notCompletedCoursesCount: studentAverages.notCompletedCoursesCount,
        coursesCount: studentAverages.coursesCount,
        completionRate: studentAverages.completionRate = (studentAverages.completedCoursesCount / studentAverages.coursesCount) * 100

      }
    });

  });

  // New: Calculate statistics for each course
  Object.values(courseDetails).forEach((course) => {
    course.terms = Array.from(course.terms); // Convert terms set to array
    // Calculate averages, min/max, median, etc.
    course.averageFinalScore = safeCalculateAverage(course.finalScores).average;
    course.averageRequirementCount = safeCalculateAverage(course.requirementCounts).average;
    // Calculate min, max, median for finalScores and requirementCounts
    let finalScoreStats = calculateMinMaxMedian(course.finalScores);
    course.minFinalScore = finalScoreStats.min;
    course.maxFinalScore = finalScoreStats.max;
    course.medianFinalScore = finalScoreStats.median;

    finalScoreStats = calculateMinMaxMedian(course.requirementCounts);
    course.minRequirementCount = finalScoreStats.min;
    course.maxRequirementCount = finalScoreStats.max;
    course.medianRequirementCount = finalScoreStats.median;

    // Initialize a structure to store calculated term statistics
    course.termStatistics = {};
    // console.log("termscores: ", course.termScores)
    Object.entries(course.termScores).forEach(([termId, scores]) => {
      const average = scores.reduce((acc, score) => acc + score, 0) / scores.length;
      const min = Math.min(...scores);
      const max = Math.max(...scores);
      const median = calculateMedian(scores);

      course.termStatistics[termId] = {
        average,
        min,
        max,
        median,
        scores,
      };
    });
  });

  // New: Calculate statistics for each term
  let termStatistics = {};
  Object.values(termData).forEach(term => {
    const scoreStats = calculateMinMaxMedian(term.scores);
    const requirementStats = calculateMinMaxMedian(term.requirementCounts);
    const averageScore = safeCalculateAverage(term.scores).average;
    const averageRequirementCount = safeCalculateAverage(term.requirementCounts).average;

    termStatistics[term.termId] = {
      termId: term.termId,
      averageScore,
      minScore: scoreStats.min,
      maxScore: scoreStats.max,
      medianScore: scoreStats.median,
      averageRequirementCount,
      minRequirementCount: requirementStats.min,
      maxRequirementCount: requirementStats.max,
      medianRequirementCount: requirementStats.median,
    };
  });


  overallStats.uniqueCourses = Array.from(overallStats.uniqueCourses);

  // After iterating over all courses and students
  overallStats.uniqueCoursesCountWithError = overallStats.uniqueCoursesWithError.size;
  overallStats.uniqueCoursesCountWithoutError = overallStats.uniqueCoursesWithoutError.size;

  // Now convert the Sets to Arrays for any further processing or storage
  overallStats.uniqueCoursesWithError = Array.from(overallStats.uniqueCoursesWithError);
  overallStats.uniqueCoursesWithoutError = Array.from(overallStats.uniqueCoursesWithoutError);

  // min max median calculation and setting
  // Final Score
  let tempMinMaxMedian = calculateMinMaxMedian(valuesLists.finalScores);
  overallStats.minFinalScore = tempMinMaxMedian.min;
  overallStats.maxFinalScore = tempMinMaxMedian.max;
  overallStats.medianFinalScore = tempMinMaxMedian.median;

  tempMinMaxMedian = calculateMinMaxMedian(valuesLists.finalScoresCompleted);
  overallStats.minFinalScoreCompleted = tempMinMaxMedian.min;
  overallStats.maxFinalScoreCompleted = tempMinMaxMedian.max;
  overallStats.medianFinalScoreCompleted = tempMinMaxMedian.median;

  tempMinMaxMedian = calculateMinMaxMedian(valuesLists.finalScoresNotCompleted);
  overallStats.minFinalScoreNotCompleted = tempMinMaxMedian.min;
  overallStats.maxFinalScoreNotCompleted = tempMinMaxMedian.max;
  overallStats.medianFinalScoreNotCompleted = tempMinMaxMedian.median;

  // Requirment count
  tempMinMaxMedian = calculateMinMaxMedian(valuesLists.requirementCounts);
  overallStats.minRequirementCount = tempMinMaxMedian.min;
  overallStats.maxRequirementCount = tempMinMaxMedian.max;
  overallStats.medianRequirementCount = tempMinMaxMedian.median;

  tempMinMaxMedian = calculateMinMaxMedian(valuesLists.requirementCountsCompleted);
  overallStats.minRequirementCountCompleted = tempMinMaxMedian.min;
  overallStats.maxRequirementCountCompleted = tempMinMaxMedian.max;
  overallStats.medianRequirementCountCompleted = tempMinMaxMedian.median;

  tempMinMaxMedian = calculateMinMaxMedian(valuesLists.requirementCountsNotCompleted);
  overallStats.minRequirementCountNotCompleted = tempMinMaxMedian.min;
  overallStats.maxRequirementCountNotCompleted = tempMinMaxMedian.max;
  overallStats.medianRequirementCountNotCompleted = tempMinMaxMedian.median;



  // [overallStats.minFinalScoreNotCompleted, overallStats.maxFinalScoreNotCompleted, overallStats.medianFinalScoreNotCompleted] = calculateMinMaxMedian(valuesLists.finalScoresNotCompleted)

  // Calculating specific overall averages
  const averages = {
    averageFinalScore: overallStats.totalCoursesCount > 0 ? overallStats.totalFinalScore / overallStats.totalCoursesCount : 0,
    averageFinalScoreCompleted: overallStats.totalCompletedCoursesCount > 0 ? overallStats.totalFinalScoreCompleted / overallStats.totalCompletedCoursesCount : 0,
    averageFinalScoreNotCompleted: overallStats.totalNotCompletedCoursesCount > 0 ? overallStats.totalFinalScoreNotCompleted / overallStats.totalNotCompletedCoursesCount : 0,
    averageRequirementCompletedCount: overallStats.totalCoursesCount > 0 ? overallStats.totalRequirementCount / overallStats.totalCoursesCount : 0,
    averageRequirementCompletedCountCompleted: overallStats.totalCompletedCoursesCount > 0 ? overallStats.totalRequirementCountCompleted / overallStats.totalCompletedCoursesCount : 0,
    averageRequirementCompletedCountNotCompleted: overallStats.totalNotCompletedCoursesCount > 0 ? overallStats.totalRequirementCountNotCompleted / overallStats.totalNotCompletedCoursesCount : 0,
  };

  // console.log(termStatistics)

  return {
    studentDetails,
    courseDetails,
    termStatistics,
    // assignments,
    assignmentStatistics,
    ...valuesLists,
    ...averages,
    // ...studentAverages,
    ...overallStats // This includes counts of total, completed, not completed courses, and students with error
  };
};

module.exports = { StudentCourseStats };


/* studentDetails = [
  {
    studentId: "Student_109", // A unique identifier for the student
    studentError: false, // Indicates if there was an error in processing this student's data
    coursesDetailsPerStudent: [ // An array of course details for each course the student is enrolled in
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
  }*/