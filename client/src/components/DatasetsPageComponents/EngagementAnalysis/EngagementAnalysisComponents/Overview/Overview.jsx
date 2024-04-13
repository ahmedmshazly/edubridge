// Overview.jsx
import React from 'react';
import OverviewSection from './OverViewComponents/DashboardSummary/OverviewSection';

const Overview = ({ dataset }) => {
  return (
    <div className="overview-container">
      <OverviewSection dataset={dataset} />
    </div>
  );
}

export default Overview;
