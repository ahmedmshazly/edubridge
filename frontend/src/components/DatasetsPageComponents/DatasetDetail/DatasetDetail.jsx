import React, { useState } from 'react';
import PerformanceOverview from '../PerformanceOverview/PerformanceOverview';
import './DatasetDetail.css'

const DatasetDetail = ({ dataset }) => {
    const [activeTab, setActiveTab] = useState('performanceOverview');

    const renderContent = () => {
        switch (activeTab) {
            case 'performanceOverview':
                return <PerformanceOverview dataset={dataset} />; 

            case 'engagementAnalysis':
                return <PerformanceOverview dataset={dataset} />; 

            case 'courseContentInsights':
                return <PerformanceOverview dataset={dataset} />; 

            case 'predictiveAnalytics':
                return <PerformanceOverview dataset={dataset} />;

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
                <button
                    onClick={() => setActiveTab('engagementAnalysis')}
                    className={activeTab === 'engagementAnalysis' ? 'active' : ''}
                >
                    Engagement Analysis
                </button>
                <button
                    onClick={() => setActiveTab('courseContentInsights')}
                    className={activeTab === 'courseContentInsights' ? 'active' : ''}
                >
                    Course Content Insights
                </button>
                <button
                    onClick={() => setActiveTab('predictiveAnalytics')}
                    className={activeTab === 'predictiveAnalytics' ? 'active' : ''}
                >
                    Predictive Analytics
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