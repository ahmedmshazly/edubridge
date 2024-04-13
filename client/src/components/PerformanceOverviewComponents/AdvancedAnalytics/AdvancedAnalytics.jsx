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

/*
Advanced Analytics Page
1. Term Statistics Analysis: Detailed charts and graphs for each term, showing average scores, requirement counts, and how they fluctuate over time.

2. Course and Student Correlation Analysis: Advanced graphs showing how specific courses affect student averages and completion rates, possibly identifying key courses that have a significant impact on students' academic performance.

3. Predictive Insights: Utilize the data to offer predictive insights, such as potential future trends in student performance based on past data, or identifying courses that might need attention due to declining scores or completion rates.
*/ 