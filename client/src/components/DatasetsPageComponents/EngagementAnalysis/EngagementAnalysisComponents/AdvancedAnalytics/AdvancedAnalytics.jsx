// Overview.jsx
import React from 'react';
import TermStatisticsAnalysis from './AdvancedAnalyticsComponents/TermStatisticsAnalysis/TermStatisticsAnalysis';
import CourseStudentCorrelationAnalysis from './AdvancedAnalyticsComponents/CourseStudentCorrelationAnalysis/CourseStudentCorrelationAnalysis';

const AdvancedAnalytics = ({ dataset }) => {
  return (
    <div className="advanced-analytics-container">
        <TermStatisticsAnalysis dataset={dataset} />
        {/* <CourseStudentCorrelationAnalysis dataset={dataset}/> */}
    </div>
  );
}

export default AdvancedAnalytics;

