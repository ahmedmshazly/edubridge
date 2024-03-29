const canvasTemplate = {
    "*": { // Indicates any student object (e.g., "Student_1", "Student_2")
        "courses": {
            "*": { // Indicates any course object by its ID (e.g., "485", "486")
                required: [],
                optional: ["is_favorite", "retrieval_error", "name", "course_id", "sis_course_id", "enrollment_term_id", "final_score"],
                // Define the expected structure for nested objects
                "term": {
                    required: ["id", "name"],
                },
                "course_progress": {
                    required: [],
                    optional: ["next_requirement_url", "requirement_count", "requirement_completed_count", "completed_at"],
                },
                "analytics": {
                    required: [],
                    optional: ["page_views", "participations"],
                    "page_views": "*", // Indicates a dynamic structure, validation specifics would need to be handled differently
                    "participations": {
                        "*": {
                            required: [],
                            optional: ["created_at", "url"],
                        }

                    },
                },
                "assignments": {
                    "*": { // Indicates each item in the assignments array, assuming dynamic keys aren't used here but you expect an array
                        required: [],
                        optional: ["non_digital_submission", "multiple_due_dates", "muted", "max_score", "min_score", "first_quartile", "median", "third_quartile", "module_ids", "excused", "submission", "assignment_id", "title", "unlock_at", "points_possible", "due_at", "status"],
                        "submission": {
                            required: [],
                            optional: ["posted_at", "score", "submitted_at"],
                        },
                    },
                },
                "communication": {
                    "*": { // Indicates dynamic keys (dates) for communication entries
                        required: [],
                        optional: ["instructorMessages"],
                    },
                },
            },
        },
    },
};

module.exports = { canvasTemplate };
