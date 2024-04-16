import React, { useState } from 'react';

import Overview from './EngagementAnalysisComponents/Overview/Overview';
import ParticipationAnalysis from './EngagementAnalysisComponents/ParticipationAnalysis/ParticipationAnalysis';
import './EngagementAnalysis.css';
import StudentAnalytics from './EngagementAnalysisComponents/StudentAnalytics/StudentAnalytics';
import AdvancedAnalytics from './EngagementAnalysisComponents/AdvancedAnalytics/AdvancedAnalytics';
import AssignmentAnalytics from './EngagementAnalysisComponents/AssignmentAnalytics/AssignmentAnalytics';

const EngagementAnalysis = ({ dataset }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="engagement-overview">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'courseMetrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('ParticipationAnalysis')}
        >
          Analysis
        </button>
        
      </div>
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            <Overview dataset={dataset} />
          </div>
        )}
        {activeTab === 'ParticipationAnalysis' && (
          <div>
            <ParticipationAnalysis dataset={dataset} />
          </div>
        )}

      </div>
    </div>
  );
}

export default EngagementAnalysis;
