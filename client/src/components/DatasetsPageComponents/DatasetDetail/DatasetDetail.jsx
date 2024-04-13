import React, { useState } from 'react';
import PerformanceOverview from '../PerformanceOverview/PerformanceOverview';
import './DatasetDetail.css'
import ValidationNotesComponent from '../ValidationNotesComponent/ValidationNotesComponent';
import EngagementAnalysis from '../EngagementAnalysis/EngagementAnalysis';

const DatasetDetail = ({ dataset }) => {
    const [activeTab, setActiveTab] = useState('performanceOverview');

    const renderContent = () => {
        switch (activeTab) {
            case 'performanceOverview':
                return <PerformanceOverview dataset={dataset} />; 

            case 'engagementAnalysis':
                return <EngagementAnalysis dataset={dataset} />; 

            // case 'predictiveAnalytics':
            //     return <PerformanceOverview dataset={dataset} />;

            case 'structureNotes':
                return <ValidationNotesComponent validationNotes={dataset.validationNotes} />; 
                    
            // Future case for 'engagementAnalytics'
            default:
                return <div>No view selected</div>;
        }
    };

    return (
        <div>
            {dataset.description}
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
                    onClick={() => setActiveTab('predictiveAnalytics')}
                    className={activeTab === 'predictiveAnalytics' ? 'active' : ''}
                >
                    Predictive Analytics
                </button>

                <button
                    onClick={() => setActiveTab('structureNotes')}
                    className={activeTab === 'structureNotes' ? 'active' : ''}
                >
                    Structure Notes 
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