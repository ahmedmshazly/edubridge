import React, { useState } from 'react';

import Overview  from '../../PerformanceOverviewComponents/Overview/Overview';
import CourseMetrics  from '../../PerformanceOverviewComponents/CourseMetrics/CourseMetrics';
import './PerformanceOverview.css';
import StudentAnalytics from '../../PerformanceOverviewComponents/StudentAnalytics/StudentAnalytics';
import AdvancedAnalytics from '../../PerformanceOverviewComponents/AdvancedAnalytics/AdvancedAnalytics';
import AssignmentAnalytics from '../../PerformanceOverviewComponents/AssignmentAnalytics/AssignmentAnalytics';

const PerformanceOverview = ({ dataset }) => {
  // State to hold the currently active tab
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="performance-overview">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'courseMetrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('courseMetrics')}
        >
          Course Metrics
        </button>
        <button
          className={`tab-button ${activeTab === 'studentAnalytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('studentAnalytics')}
        >
          Student Analytics
        </button>
        <button
          className={`tab-button ${activeTab === 'advancedAnalytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('advancedAnalytics')}
        >
          Term Analytics
        </button>
        <button
          className={`tab-button ${activeTab === 'assignmentAnalytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('assignmentAnalytics')}
        >
          Assignments Analytics
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            <Overview dataset={dataset}/>
          </div>
        )}
        {activeTab === 'courseMetrics' && (
          <div>
            <CourseMetrics dataset = {dataset}/>
          </div>
        )}
        {activeTab === 'studentAnalytics' && (
          <div>
            <StudentAnalytics dataset={dataset}/>
          </div>
        )}
        {activeTab === 'advancedAnalytics' && (
          <div>
            <AdvancedAnalytics dataset={dataset}/>
          </div>
        )}
        {activeTab === 'assignmentAnalytics' && (
          <div>
            <AssignmentAnalytics dataset={dataset}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerformanceOverview;
