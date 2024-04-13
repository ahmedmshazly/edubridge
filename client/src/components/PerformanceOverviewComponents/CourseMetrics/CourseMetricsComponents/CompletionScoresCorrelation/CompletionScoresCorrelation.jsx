import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './CompletionScoresCorrelation.css';

const CompletionScoresCorrelation = ({ dataset }) => {
    const { courseMetrics } = dataset.metrics[0].overallStats;
    const [minCompletionRate, setMinCompletionRate] = useState(0);
    const [minStudents, setMinStudents] = useState(0);

    // Filter data based on the selected filters
    const filteredData = courseMetrics.filter(course =>
        (course.completedCount / course.totalStudents) * 100 >= minCompletionRate &&
        course.totalStudents >= minStudents
    ).map(course => ({
        courseId: course.courseId,
        name: course.name,
        avgFinalScore: course.averageFinalScore,
        completionRate: (course.completedCount / course.totalStudents) * 100,
        totalStudents: course.totalStudents,
    }));

    return (
        <div className="correlation-container">
            <h1>Course Data Correlation</h1>
            <div className="filters">
                <label>
                    Min Completion Rate (%):
                    <input
                        type="number"
                        value={minCompletionRate}
                        onChange={e => setMinCompletionRate(Number(e.target.value))}
                        min="0" max="100"
                    />
                </label>
                <label>
                    Min Students:
                    <input
                        type="number"
                        value={minStudents}
                        onChange={e => setMinStudents(Number(e.target.value))}
                        min="0"
                    />
                </label>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis
                        type="number"
                        dataKey="avgFinalScore"
                        name="Average Final Score"
                        unit="%"
                        domain={['dataMin - 10', 'dataMax + 10']}
                        label={{ value: 'Average Final Score (%)', position: 'insideBottom', offset: -20, fill: '#666' }}
                    />
                    <YAxis
                        type="number"
                        dataKey="completionRate"
                        name="Completion Rate"
                        unit="%"
                        domain={['dataMin - 10', 'dataMax + 10']}
                        label={{ value: 'Completion Rate (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#666' }}
                    />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    <Legend />
                    <Scatter name="Courses" data={filteredData} fill="#8884d8" />
                </ScatterChart>

            </ResponsiveContainer>
        </div>
    );
};

// Custom tooltip for more informative interaction
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="custom-tooltip">
                <p className="label">{`Course: ${data.name}`}</p>
                <p className="intro">{`Avg Score: ${data.avgFinalScore}%`}</p>
                <p className="intro">{`Completion Rate: ${data.completionRate}%`}</p>
                <p className="intro">{`Total Students: ${data.totalStudents}`}</p>
            </div>
        );
    }
    return null;
};

export default CompletionScoresCorrelation;
