import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './CourseStudentCorrelationAnalysis.css'; // Ensure this CSS file exists and is styled

const CourseStudentCorrelationAnalysis = ({ dataset }) => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [scatterData, setScatterData] = useState([]);
    const [barData, setBarData] = useState([]);

    const uniqueCourses = dataset.metrics[0].overallStats.courseMetrics.map(course => course.courseId);

    useEffect(() => {
        if (selectedCourse) {
            // Initialize processed data arrays
            const processedScatterData = [];
            const processedBarData = [];

            // Example processing logic
            const selectedCourseDetails = dataset.metrics[0].overallStats.courseMetrics.find(course => course.courseId === selectedCourse);

            if (selectedCourseDetails) {
                // Assuming we can determine "before" and "after" based on some logic
                const averageFinalScore = selectedCourseDetails.averageFinalScore;
                const averageRequirementCount = selectedCourseDetails.averageRequirementCount;

                // Just a simple example to populate the charts
                processedScatterData.push({
                    averageBefore: averageFinalScore * 0.95, // Example modification
                    averageAfter: averageFinalScore,
                });

                processedBarData.push({
                    name: "Completion Rate",
                    completionRateBefore: averageRequirementCount * 0.9, // Example modification
                    completionRateAfter: averageRequirementCount,
                });
            }

            setScatterData(processedScatterData);
            setBarData(processedBarData);
        } else {
            // Reset data when no course is selected
            setScatterData([]);
            setBarData([]);
        }
    }, [selectedCourse, dataset]);

    return (
        <div className="correlation-analysis-container">
            <h2>Course and Student Correlation Analysis</h2>
            <Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                displayEmpty
                fullWidth
            >
                <MenuItem value="">
                    <em>Select a Course</em>
                </MenuItem>
                {uniqueCourses.map(course => (
                    <MenuItem key={course} value={course}>{`Course ${course}`}</MenuItem>
                ))}
            </Select>

            {selectedCourse && (
                <>
                    <div className="chart-container">
                        <h3>Impact on Student Averages</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="averageBefore" name="Average Before" />
                                <YAxis type="number" dataKey="averageAfter" name="Average After" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Students" data={scatterData} fill="#8884d8" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart-container">
                        <h3>Completion Rates Comparison</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="completionRateBefore" fill="#82ca9d" name="Completion Rate Before" />
                                <Bar dataKey="completionRateAfter" fill="#8884d8" name="Completion Rate After" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default CourseStudentCorrelationAnalysis;
