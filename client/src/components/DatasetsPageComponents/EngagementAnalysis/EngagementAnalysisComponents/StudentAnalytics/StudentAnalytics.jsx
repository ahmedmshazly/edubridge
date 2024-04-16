import React from 'react';
import StudentPerformanceOverview from './StudentAnalyticsComponents/StudentPerformanceOverview/StudentPerformanceOverview';
import DetailedPerformanceMetrics from './StudentAnalyticsComponents/DetailedPerformanceMetrics/DetailedPerformanceMetrics';
import CompletionTrends from './StudentAnalyticsComponents/CompletionTrends/CompletionTrends';
import IndividualStudentProgressTracking from './StudentAnalyticsComponents/IndividualStudentProgressTracking/IndividualStudentProgressTracking';
// Import subcomponents related to course metrics here

const StudentAnalytics = ({ dataset }) => {

    return (
        <div className="course-metrics-page">
            <CompletionTrends dataset={dataset} />
            <hr style={{'margin':'50px'}} />
            <StudentPerformanceOverview dataset={dataset} />
            <hr style={{'margin':'50px'}} />
            <IndividualStudentProgressTracking dataset={dataset} />
            <hr style={{'margin':'50px'}} />
            <DetailedPerformanceMetrics dataset={dataset} />
            {/* Render subcomponents with courseData as props */}
            {/* Example: <CourseSummary data={courseData} /> */}
        </div>
    );
}

export default StudentAnalytics;

