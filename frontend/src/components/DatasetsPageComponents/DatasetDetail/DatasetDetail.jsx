import React, { useState } from 'react';
import PerformanceOverview from '../PerformanceOverview/PerformanceOverview';

const DatasetDetail = ({ dataset }) => {
    const [activeTab, setActiveTab] = useState('performanceOverview');

    const renderContent = () => {
        switch (activeTab) {
            case 'performanceOverview':
                return <PerformanceOverview dataset={dataset} />;            case 'performanceOverview2':

            // Future case for 'engagementAnalytics'
            default:
                return <div>No view selected</div>;
        }
    };

    return (
        <div>
            <div className="navigation-tabs">
                <button
                    onClick={() => setActiveTab('performanceOverview')}
                    className={activeTab === 'performanceOverview' ? 'active' : ''}
                >
                    Performance Overview
                </button>
                
                {/* Future button for 'Engagement Analytics' */}
            </div>
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default DatasetDetail;