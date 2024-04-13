// Overview.jsx
import React from 'react';
import DashboardSummary from './OverViewComponents/DashboardSummary/DashboardSummary';
import EngagementAndParticipation from './OverViewComponents/EngagementAndParticipation/EngagementAndParticipation';

const Overview = ({ dataset }) => {
  return (
    <div className="overview-container">
      <DashboardSummary dataset={dataset} />
      {/* <EngagementAndParticipation /> */}
    </div>
  );
}

export default Overview;
