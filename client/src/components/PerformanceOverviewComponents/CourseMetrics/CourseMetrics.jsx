import React from 'react';
// Import subcomponents related to course metrics here
import CourseOverview from './CourseMetricsComponents/CourseOverview/CourseOverview';
import TermPerformanceComparison from './CourseMetricsComponents/TermPerformanceComparison/TermPerformanceComparison';
import CompletionScoresCorrelation from './CourseMetricsComponents/CompletionScoresCorrelation/CompletionScoresCorrelation';

const CourseMetricsPage = ({ dataset }) => {
  // This is a placeholder for any state or methods you might need to manage

  return (
    <div className="course-metrics-page">
      <CompletionScoresCorrelation dataset={dataset}/>
      <hr style={{'margin':'50px'}} />
      <TermPerformanceComparison  dataset={dataset} />
      <hr style={{'margin':'50px'}} />
      <CourseOverview dataset={dataset}/>
      {/* Render subcomponents with courseData as props */}
      {/* Example: <CourseSummary data={courseData} /> */}
    </div>
  );
}

export default CourseMetricsPage;
