const calculateCompletionStatus = (courses) => {
    if (!courses || Object.keys(courses).length === 0) {
        // Early return if courses is null, undefined, or empty
        return { allCompleted: false, anyCompleted: false, allRequirementsCompleted: false, anyRequirementsCompleted: false };
    }

    let allCompleted = true;
    let anyCompleted = false;
    let allRequirementsCompleted = true;
    let anyRequirementsCompleted = false;

    Object.values(courses).forEach(course => {
        // Handle courses that are null or undefined within the loop
        if (!course || !course.course_progress) {
            allCompleted = false;
            allRequirementsCompleted = false;
            return; // Skip this iteration
        }

        const { course_progress } = course;
        const {
            requirement_count = 0,
            requirement_completed_count = 0,
            completed_at = null,
        } = course_progress;

        const isCompleted = !!completed_at;
        const hasCompletedAllRequirements = requirement_count === requirement_completed_count;

        allCompleted = allCompleted && (isCompleted || hasCompletedAllRequirements);
        anyCompleted = anyCompleted || isCompleted || hasCompletedAllRequirements;
        allRequirementsCompleted = allRequirementsCompleted && hasCompletedAllRequirements;
        anyRequirementsCompleted = anyRequirementsCompleted || hasCompletedAllRequirements;
    });

    return { allCompleted, anyCompleted, allRequirementsCompleted, anyRequirementsCompleted };
};

const calculateStudentCompletionCounts = (data) => {
    if (!data || Object.keys(data).length === 0) {
        // Early return if data is null, undefined, or empty
        return {
            totalStudents: 0,
            studentsCompletedAllCourses: 0,
            studentsNotCompletedAllCourses: 0,
            studentsCompletedSomeCourses: 0,
            studentsCompletedAllRequirements: 0,
            studentsNotCompletedAllRequirements: 0,
            studentsCompletedSomeRequirements: 0
        };
    }

    let totalStudents = 0;
    let studentsCompletedAllCourses = 0;
    let studentsNotCompletedAllCourses = 0;
    let studentsCompletedSomeCourses = 0;
    let studentsCompletedAllRequirements = 0;
    let studentsNotCompletedAllRequirements = 0;
    let studentsCompletedSomeRequirements = 0;

    Object.values(data).forEach(student => {
        if (!student || !student.courses) {
            // Handle null or undefined student or student.courses
            return; // Skip this student
        }

        totalStudents++;
        const { allCompleted, anyCompleted, allRequirementsCompleted, anyRequirementsCompleted } = calculateCompletionStatus(student.courses);

        studentsCompletedAllCourses += allCompleted ? 1 : 0;
        studentsNotCompletedAllCourses += !allCompleted ? 1 : 0;
        studentsCompletedSomeCourses += anyCompleted && !allCompleted ? 1 : 0;
        studentsCompletedAllRequirements += allRequirementsCompleted ? 1 : 0;
        studentsNotCompletedAllRequirements += !allRequirementsCompleted ? 1 : 0;
        studentsCompletedSomeRequirements += anyRequirementsCompleted && !allRequirementsCompleted ? 1 : 0;
    });

    return {
        totalStudents,
        studentsCompletedAllCourses,
        studentsNotCompletedAllCourses,
        studentsCompletedSomeCourses,
        studentsCompletedAllRequirements,
        studentsNotCompletedAllRequirements,
        studentsCompletedSomeRequirements
    };
};

module.exports = { calculateStudentCompletionCounts };
