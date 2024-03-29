// CourseValidation.js
// Handles course validation logic

/**
 * Static class for validating course data.
 */
class CourseValidator {
    /**
     * Determines if a course is valid and whether it has been completed.
     * @param {Object} course - The course to validate.
     * @return {Object} An object containing isValid, isCompleted, and errorPresent flags.
     */
    static isValidAndCompleted(course) {
      const progress = course.course_progress;
      const errorPresent = Boolean(progress && progress.error);
      if (!progress) return { isValid: false, isCompleted: false, errorPresent };
      if (progress.error) return { isValid: true, isCompleted: false, errorPresent };
  
      const isCompleted = Boolean(
        progress.completed_at || progress.requirement_count === progress.requirement_completed_count
      );
      return { isValid: true, isCompleted, errorPresent };
    }
  }
  
  module.exports = { CourseValidator };
  