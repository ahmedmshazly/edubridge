function generateInsights(dataset) {
    if (!dataset || Object.keys(dataset).length === 0) {
        throw new Error('Dataset is empty or null.');
    }

    const engagementInsights = generateUnifiedEngagement(dataset);


    const insights = {
        overallEngagement: {},
        courseEngagement: {},
        termEngagement: {},
        studentEngagement: {},
        scoreInsights: {},
        engagementInsights:engagementInsights
    };

    Object.entries(dataset).forEach(([studentId, studentData]) => {
        if (!studentData || Object.keys(studentData).length === 0) {
            insights.studentEngagement[studentId] = {
                error: 'No data available for this student.',
            };
            return;
        }

        Object.values(studentData.courses || {}).forEach(course => {
            aggregateEngagement(insights.overallEngagement, course);
            aggregateCourseEngagement(insights.courseEngagement, course);
            aggregateTermEngagement(insights.termEngagement, course);
            aggregateStudentEngagement(insights.studentEngagement, studentId, course);
            aggregateScoreInsights(insights.scoreInsights, course);
        });
    });

    // Finalize calculations
    calculateCourseAverages(insights.courseEngagement);
    finalizeTermEngagement(insights.termEngagement);
    finalizeStudentEngagement(insights.studentEngagement);

    return insights;
}


function aggregateEngagement(engagement, course) {
    // Initialize metrics in the engagement object if they don't exist
    engagement.totalPageViews = engagement.totalPageViews || 0;
    engagement.totalParticipations = engagement.totalParticipations || 0;
    engagement.pageViewSessions = engagement.pageViewSessions || 0;

    // Aggregate Page Views
    const pageViews = course.analytics.page_views;
    if (pageViews) {
        for (const views of Object.values(pageViews)) {
            engagement.totalPageViews += views;
            engagement.pageViewSessions += 1;
        }
    }

    // Aggregate Participations
    const participations = course.analytics.participations;
    if (participations) {
        engagement.totalParticipations += participations.length;
    }

    // Calculate averages if needed right away, or defer to a later stage if calculations depend on total dataset
    // For now, we'll defer average calculations to ensure we have complete data
}

function aggregateCourseEngagement(courseEngagement, course) {
    const courseId = course.course_id.toString();
    if (!courseEngagement[courseId]) {
        courseEngagement[courseId] = {
            name: course.name,
            totalPageViews: 0,
            totalParticipations: 0,
            assignmentsCount: course.assignments ? course.assignments.length : 0,
            averageFinalScore: null,
            percentageScores: [], // Initialize an array to track percentage scores
            averagePercentageScore: null, // New: Average percentage score
            scores: [],
            terms: new Set(),
        };
    }

    const pageViews = course.analytics.page_views;
    if (pageViews) {
        for (const views of Object.values(pageViews)) {
            courseEngagement[courseId].totalPageViews += views;
        }
    }

    const participations = course.analytics.participations;
    if (participations) {
        courseEngagement[courseId].totalParticipations += participations.length;
    }

    if (course.final_score !== undefined && course.final_score !== null) {
        const percentageScore = (course.final_score / 100) * 100; // Assuming a max score of 100
        courseEngagement[courseId].percentageScores.push(percentageScore);
    }

    if (course.term && course.term.id) {
        courseEngagement[courseId].terms.add(course.term.id);
    }

}

function calculateCourseAverages(courseEngagement) {
    Object.values(courseEngagement).forEach(course => {
        if (course.scores.length > 0) {
            course.averageFinalScore = course.scores.reduce((a, b) => a + b, 0) / course.scores.length;
            // Ensure there are percentage scores before calculating the average
            if (course.percentageScores.length > 0) {
                course.averagePercentageScore = course.percentageScores.reduce((a, b) => a + b, 0) / course.percentageScores.length;
            } else {
                course.averagePercentageScore = 0; // or another default value as appropriate
            }
        } else {
            course.averageFinalScore = 0; // Ensure this is set to a default as well
            course.averagePercentageScore = 0;
        }
        course.terms = Array.from(course.terms);
    });
}


function aggregateTermEngagement(termEngagement, course) {
    // Ensure the course has term information before proceeding
    if (!course.term || !course.term.id) {
        console.warn('Course missing term information, skipping...');
        return;
    }

    const termId = course.term.id.toString(); // Ensure termId is a string for consistency in object keys

    // Initialize term engagement object if it doesn't exist
    if (!termEngagement[termId]) {
        termEngagement[termId] = {
            name: course.term.id,
            totalPageViews: 0,
            totalParticipations: 0,
            coursesCount: 0,
            studentsCount: new Set(), // Track unique student IDs to avoid double counting
            averageFinalScore: null, // Will calculate later based on all courses' scores
            percentageScores: [],
            averagePercentageScore: null, // New: Average percentage score
            scores: [], // To calculate average score
        };
    }

    // Aggregate Page Views and Participations for the term
    const pageViews = course.analytics.page_views;
    if (pageViews) {
        for (const views of Object.values(pageViews)) {
            termEngagement[termId].totalPageViews += views;
        }
    }

    const participations = course.analytics.participations;
    if (participations) {
        termEngagement[termId].totalParticipations += participations.length;
    }

    if (course.final_score !== undefined && course.final_score !== null) {
        const percentageScore = (course.final_score / 100) * 100; // Assuming a max score of 100
        termEngagement[termId].percentageScores.push(percentageScore);
    }

    // Increment courses count
    termEngagement[termId].coursesCount += 1;

    // Add final score to scores array for later average calculation
    if (course.final_score) {
        termEngagement[termId].scores.push(course.final_score);
    }
}

function finalizeTermEngagement(termEngagement) {
    Object.values(termEngagement).forEach(term => {
        if (term.scores.length > 0) {
            term.averageFinalScore = term.scores.reduce((a, b) => a + b, 0) / term.scores.length;
            term.averagePercentageScore = term.percentageScores.length > 0 ? term.percentageScores.reduce((a, b) => a + b, 0) / term.percentageScores.length : 0;
        } else {
            term.averageFinalScore = 0; // Default value
            term.averagePercentageScore = 0;
        }

        term.studentsCount = term.studentsCount.size;
        term.terms = term.terms instanceof Set ? Array.from(term.terms) : term.terms;
    });
}

function aggregateStudentEngagement(studentEngagement, studentId, course) {
    // Ensure the studentId is treated as a string for consistency in object keys
    studentId = studentId.toString();

    // Initialize student engagement object if it doesn't exist
    if (!studentEngagement[studentId]) {
        studentEngagement[studentId] = {
            totalPageViews: 0,
            totalParticipations: 0,
            coursesCount: 0,
            averageFinalScore: null, // Will calculate later based on all courses' scores
            percentageScores: [],
            averagePercentageScore: null, // New: Average percentage score
            scores: [], // To calculate average score
            terms: new Set(), // To keep track of terms the student has participated in
        };
    }

    // Aggregate Page Views for the student
    const pageViews = course.analytics.page_views;
    if (pageViews) {
        for (const views of Object.values(pageViews)) {
            studentEngagement[studentId].totalPageViews += views;
        }
    }

    // Aggregate Participations for the student
    const participations = course.analytics.participations;
    if (participations) {
        studentEngagement[studentId].totalParticipations += participations.length;
    }

    // Increment courses count
    studentEngagement[studentId].coursesCount += 1;

    // Add final score to scores array for later average calculation
    if (course.final_score !== undefined && course.final_score !== null) {
        studentEngagement[studentId].scores.push(course.final_score);
    }

    if (course.final_score !== undefined && course.final_score !== null) {
        const percentageScore = (course.final_score / 100) * 100; // Assuming a max score of 100
        studentEngagement[studentId].percentageScores.push(percentageScore);
    }

    // Update terms the student has participated in
    if (course.term && course.term.id) {
        studentEngagement[studentId].terms.add(course.term.id || "Unknown Term");
    }
}

function finalizeStudentEngagement(studentEngagement) {
    Object.values(studentEngagement).forEach(student => {
        // Calculate average final score for the student
        if (student.scores.length > 0) {
            student.averageFinalScore = student.scores.reduce((a, b) => a + b, 0) / student.scores.length;
            // Ensure there are percentage scores before calculating the average
            if (student.percentageScores && student.percentageScores.length > 0) {
                student.averagePercentageScore = student.percentageScores.reduce((a, b) => a + b, 0) / student.percentageScores.length;
            } else {
                student.averagePercentageScore = 0; // Set to 0 or another default value as appropriate
            }
        } else {
            student.averageFinalScore = 0; // Set to 0 or another default value as appropriate
            student.averagePercentageScore = 0;
        }

        // Convert terms Set to array for easier processing or display
        if (student.terms instanceof Set) {
            student.terms = Array.from(student.terms);
        } else {
            // Ensure terms is always an array, even if it's initially not a Set
            student.terms = Array.isArray(student.terms) ? student.terms : [];
        }
    });
}

function aggregateScoreInsights(scoreInsights, course) {
    const courseId = course.course_id.toString(); // Ensure courseId is a string for consistency

    // Initialize score insights for the course if it doesn't exist
    if (!scoreInsights[courseId]) {
        scoreInsights[courseId] = {
            name: course.name,
            totalStudents: 0,
            totalScores: 0,
            averageScore: null,
            scoreDistribution: {
                excellent: 0,
                good: 0,
                average: 0,
                belowAverage: 0,
                poor: 0,
            },
            // Consider adding engagement metrics correlations here
        };
    }

    // Check if there's a valid final score for the course
    if (course.final_score !== undefined && course.final_score !== null) {
        scoreInsights[courseId].totalStudents += 1;
        scoreInsights[courseId].totalScores += course.final_score;

        // Update score distribution
        categorizeScore(scoreInsights[courseId].scoreDistribution, course.final_score);
    }

    // Calculate average score for the course if there's at least one student
    if (scoreInsights[courseId].totalStudents > 0) {
        scoreInsights[courseId].averageScore = scoreInsights[courseId].totalScores / scoreInsights[courseId].totalStudents;
    }
}



function categorizeScore(distribution, score) {
    if (score >= 90) {
        distribution.excellent += 1;
    } else if (score >= 80) {
        distribution.good += 1;
    } else if (score >= 70) {
        distribution.average += 1;
    } else if (score >= 60) {
        distribution.belowAverage += 1;
    } else {
        distribution.poor += 1;
    }
}


function generateUnifiedEngagement(dataset) {
    let insights = {
        participation: [],
        pageViews: [],
        communication: []
    };

    Object.entries(dataset).forEach(([studentId, studentData]) => {
        Object.values(studentData.courses || {}).forEach(course => {
            const term = course.term ? course.term.name : "Unknown Term";

            // Handle participation analytics safely
            if (course.analytics && course.analytics.participations && Array.isArray(course.analytics.participations)) {
                course.analytics.participations.forEach(participation => {
                    let interactionType = 'other'; // Default interaction type
                    if (participation.url) {
                        if (participation.url.includes('/quizzes/')) {
                            interactionType = 'quiz';
                        } else if (participation.url.includes('/assignments/')) {
                            interactionType = 'assignment';
                        } else if (participation.url.includes('/discussion_topics/')) {
                            interactionType = 'discussion';
                        }
                    }

                    insights.participation.push({
                        date: participation.created_at.split('T')[0], // Extract date
                        term: term,
                        courseId: course.course_id.toString(),
                        studentId: studentId,
                        interactionType: interactionType,
                        interactionDetail: {
                            url: participation.url
                        }
                    });
                });
            }

            // Handle page views analytics safely
            if (course.analytics && course.analytics.page_views && typeof course.analytics.page_views === 'object') {
                Object.entries(course.analytics.page_views).forEach(([date, views]) => {
                    insights.pageViews.push({
                        date: date.split('T')[0], // Extract date
                        term: term,
                        courseId: course.course_id.toString(),
                        studentId: studentId,
                        viewCount: views
                    });
                });
            }

            // Handle communication safely
            if (course.communication && typeof course.communication === 'object') {
                Object.entries(course.communication).forEach(([date, { instructorMessages }]) => {
                    if (typeof instructorMessages === 'number') {
                        insights.communication.push({
                            date: date,
                            term: term,
                            courseId: course.course_id.toString(),
                            studentId: studentId,
                            messageType: "instructorMessage",
                            messageCount: instructorMessages
                        });
                    }
                });
            }
        });
    });

    return insights;
}



module.exports = { generateInsights };
