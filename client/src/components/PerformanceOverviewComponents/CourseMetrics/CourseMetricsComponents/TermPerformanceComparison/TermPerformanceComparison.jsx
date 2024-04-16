import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './TermPerformanceComparison.css'; 

const TermPerformanceComparison = ({ dataset }) => {
    const { courseMetrics, termStatistics } = dataset.metrics[0].overallStats;
    const [selectedTermId, setSelectedTermId] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [completionRateFilterMin, setCompletionRateFilterMin] = useState(0);
    const [averageScoreFilterMin, setAverageScoreFilterMin] = useState(0);
    const [completionRateFilterMax, setCompletionRateFilterMax] = useState(100);
    const [averageScoreFilterMax, setAverageScoreFilterMax] = useState(100);
    const [showCourses, setShowCourses] = useState(false); // State to toggle course list visibility
    const [termData, setTermData] = useState([]);

    useEffect(() => {
        const fetchTermData = () => {
            const coursesToShow = selectedCourses.length > 0 ? selectedCourses : courseMetrics.filter(course => course.terms.includes(parseInt(selectedTermId))).map(course => String(course.courseId));

            const data = coursesToShow.map(courseId => {
                const course = courseMetrics.find(c => c.courseId === parseInt(courseId));
                if (!course) return null; // Guard clause for missing course

                const completionRate = (course.completedCount / course.totalStudents) * 100;

                if (course.averageFinalScore >= averageScoreFilterMin && course.averageFinalScore <= averageScoreFilterMax &&
                    completionRate >= completionRateFilterMin && completionRate <= completionRateFilterMax) {
                    return {
                        courseId: course.courseId,
                        name: course.name,
                        averageScore: course.averageFinalScore,
                        completionRate: completionRate,
                    };
                }
                return null;
            }).filter(Boolean);

            setTermData(data);
        };

        if (selectedTermId) {
            fetchTermData();
        }
    }, [selectedTermId, selectedCourses, courseMetrics, termStatistics, completionRateFilterMin, averageScoreFilterMin, completionRateFilterMax, averageScoreFilterMax]);

    // Toggle course list visibility
    const toggleCoursesVisibility = () => {
        setShowCourses(!showCourses);
    };

    const handleCompletionRateFilterMinChange = (e) => {
        setCompletionRateFilterMin(e.target.value);
    };

    const handleAverageScoreFilterMinChange = (e) => {
        setAverageScoreFilterMin(e.target.value);
    };

    const handleCompletionRateFilterMaxChange = (e) => {
        setCompletionRateFilterMax(e.target.value);
    };

    const handleAverageScoreFilterMaxChange = (e) => {
        setAverageScoreFilterMax(e.target.value);
    };

    const handleCourseSelectionChange = (courseId, isChecked) => {
        const updatedCourses = isChecked ? [...selectedCourses, courseId] : selectedCourses.filter(id => id !== courseId);
        setSelectedCourses(updatedCourses);
    };

    const handleTermChange = (e) => {
        setSelectedTermId(e.target.value);
    };

    return (
        <div>
            <h1>Term Performance Comparison</h1>
            <select value={selectedTermId} onChange={handleTermChange}>
                <option value="">Select a Term</option>
                {termStatistics.map(stat => (
                    <option key={stat.termId} value={stat.termId}>Term {stat.termId}</option>
                ))}
            </select>

            <button onClick={toggleCoursesVisibility}>
                {showCourses ? 'Hide Courses' : 'Show Courses'}
            </button>

            {showCourses && (
                <div className="course-selection collapsible">
                    {courseMetrics.filter(course => course.terms.includes(parseInt(selectedTermId))).length > 0 ? (
                        courseMetrics.filter(course => course.terms.includes(parseInt(selectedTermId))).map(course => (
                            <div key={course.courseId} className="checkbox-container">
                                <input
                                    id={`course-${course.courseId}`}
                                    type="checkbox"
                                    checked={selectedCourses.includes(String(course.courseId))}
                                    onChange={(e) => handleCourseSelectionChange(String(course.courseId), e.target.checked)}
                                />
                                <label htmlFor={`course-${course.courseId}`}>{course.name}</label>
                            </div>
                        ))
                    ) : (
                        <p>No courses available for this term.</p>
                    )}
                </div>
            )}


            <div>
                <label>
                    Min Completion Rate: {completionRateFilterMin}%
                    <input type="range" min="0" max="100" value={completionRateFilterMin} onChange={handleCompletionRateFilterMinChange} />
                </label>
                <label>
                    Max Completion Rate: {completionRateFilterMax}%
                    <input type="range" min="0" max="100" value={completionRateFilterMax} onChange={handleCompletionRateFilterMaxChange} />
                </label>
                <label>
                    Min Average Score: {averageScoreFilterMin}
                    <input type="range" min="0" max="100" value={averageScoreFilterMin} onChange={handleAverageScoreFilterMinChange} />
                </label>
                <label>
                    Max Average Score: {averageScoreFilterMax}
                    <input type="range" min="0" max="100" value={averageScoreFilterMax} onChange={handleAverageScoreFilterMaxChange} />
                </label>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={termData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-60} textAnchor="end" interval={0} height={100} />
                    <YAxis yAxisId="left" orientation="left" label={{ value: 'Avg Score', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Completion %', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="averageScore" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="completionRate" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TermPerformanceComparison;
