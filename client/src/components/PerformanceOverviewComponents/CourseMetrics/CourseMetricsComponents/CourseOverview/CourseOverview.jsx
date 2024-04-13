import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './CourseOverview.css';

const CourseOverview = ({ dataset }) => {
    const initialCourses = dataset.metrics[0].overallStats.courseMetrics;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // States for filter criteria
    const [filteredCourses, setFilteredCourses] = useState(initialCourses);
    const [termFilter, setTermFilter] = useState('');
    const [minAverageFinalScore, setMinAverageFinalScore] = useState(0);
    const [maxAverageFinalScore, setMaxAverageFinalScore] = useState(100);
    const [minAverageRequirementCount, setMinAverageRequirementCount] = useState(0);
    const [maxAverageRequirementCount, setMaxAverageRequirementCount] = useState(20);

    useEffect(() => {
        applyFilters();
    }, [termFilter, minAverageFinalScore, maxAverageFinalScore, minAverageRequirementCount, maxAverageRequirementCount]);

    const applyFilters = () => {
        let filtered = initialCourses.filter(course => {
            const termMatch = termFilter ? course.termId.toString() === termFilter : true;
            const scoreMatch = course.averageFinalScore >= minAverageFinalScore && course.averageFinalScore <= maxAverageFinalScore;
            const requirementMatch = course.averageRequirementCount >= minAverageRequirementCount && course.averageRequirementCount <= maxAverageRequirementCount;
            return termMatch && scoreMatch && requirementMatch;
        });
        setFilteredCourses(filtered);
    };

    return (
        <div>
            <h1>Courses Overview</h1>
            <div className="filter-container">
                <label htmlFor="termFilter">Term ID:</label>
                <input
                    id="termFilter"
                    type="text"
                    placeholder="Enter Term ID"
                    value={termFilter}
                    onChange={e => setTermFilter(e.target.value)}
                />
                <div>
                    <label>Min Avg Final Score: {minAverageFinalScore}</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={minAverageFinalScore}
                        onChange={e => setMinAverageFinalScore(e.target.value)}
                    />
                    <label>Max Avg Final Score: {maxAverageFinalScore}</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={maxAverageFinalScore}
                        onChange={e => setMaxAverageFinalScore(e.target.value)}
                    />
                </div>
                <div>
                    <label>Min Avg Requirement Count: {minAverageRequirementCount}</label>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={minAverageRequirementCount}
                        onChange={e => setMinAverageRequirementCount(e.target.value)}
                    />
                    <label>Max Avg Requirement Count: {maxAverageRequirementCount}</label>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={maxAverageRequirementCount}
                        onChange={e => setMaxAverageRequirementCount(e.target.value)}
                    />
                </div>
            </div>
            <div className="courses-container">
                {filteredCourses.map((course, index) => (
                    <div className="course-card" key={index}>
                        <h2>{course.name}</h2>
                        <p><strong>Course ID:</strong> {course.courseId}</p>
                        <p><strong>Term ID:</strong> {course.termId}</p>
                        <div className="card-section">
                            <span><strong>Average Final Score:</strong> {course.averageFinalScore.toFixed(2)}</span>
                            <span><strong>Median Final Score:</strong> {course.medianFinalScore}</span>
                        </div>
                        <div className="card-section">
                            <span><strong>Average Requirement Count:</strong> {course.averageRequirementCount}</span>
                            <span><strong>Median Requirement Count:</strong> {course.medianRequirementCount}</span>
                        </div>
                        <div className="chart">
                            <ResponsiveContainer width="100%" height={150}>
                                <PieChart>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={true}
                                        data={[
                                            { name: 'Completed', value: course.completedCount },
                                            { name: 'Not Completed', value: course.notCompletedCount }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={60}
                                        fill="#8884d8"
                                        label
                                    >
                                        {COLORS.map((color, index) => (
                                            <Cell key={`cell-${index}`} fill={color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseOverview;
