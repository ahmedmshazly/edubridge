// Overview.jsx
import React from 'react';
import AssignmentScoreDistribution from './AssignmentAnalyticsComponents/AssignmentScoreDistribution/AssignmentScoreDistribution';
import CorrelationAnalysis from './AssignmentAnalyticsComponents/CorrelationAnalysis/CorrelationAnalysis';
import AssignmentEngagementMetrics from './AssignmentAnalyticsComponents/AssignmentEngagementMetrics/AssignmentEngagementMetrics';

const AssignmentAnalytics = ({ dataset }) => {
  return (
    <div className="assignment-analytics-container">
        <AssignmentScoreDistribution dataset={dataset}/>
        <CorrelationAnalysis dataset={dataset}/>
        <AssignmentEngagementMetrics dataset={dataset}/>
    </div>
  );
}

export default AssignmentAnalytics;

