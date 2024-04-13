import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DetailedPerformanceMetrics.css';

const DetailedPerformanceMetrics = ({ dataset }) => {
    const studentDetails = dataset.metrics[0].overallStats.studentDetails;
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const selectedStudent = useMemo(() => studentDetails.find(student => student.studentId === selectedStudentId), [studentDetails, selectedStudentId]);

    // Use the same filter for the chart data as for the table to ensure consistency
    const filteredChartData = useMemo(() => selectedStudent?.coursesDetailsPerStudent.filter(course => course.courseId.includes(searchTerm) || course.termId.toString().includes(searchTerm)).map(course => ({
        name: `Course ${course.courseId} (Term ${course.termId})`,
        FinalScore: course.finalScore,
        RequirementsCompleted: course.requirementCompletedCount,
        RequirementsCompletion: (course.requirementCompletedCount / (course.requirementCount || 15)) * 100, // Calculate completion percentage
    })) || [], [selectedStudent, searchTerm]);

    const handleSelect = (event) => {
        setSelectedStudentId(event.target.value);
    };

    return (
        <div className="detailed-performance-container">
            <h1>Detailed Performance Metrics</h1>
            <select value={selectedStudentId} onChange={handleSelect} className="custom-select mb-3 mt-3">
                <option value="">Select Student</option>
                {studentDetails.map(student => (
                    <option key={student.studentId} value={student.studentId}>
                        {student.studentId}
                    </option>
                ))}
            </select>

            {selectedStudentId && (
                <>
                    <div className="input-group mb-3 mt-3">
                        <span className="input-group-text">Filter Courses</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Course ID or Term ID"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <table className="table table-striped table-bordered table-hover table-sm mt-3">
                        <thead>
                            <tr>
                                {/* Table headers */}
                                <th>Course ID</th>
                                <th>Term ID</th>
                                <th>Final Score</th>
                                <th>Requirements Needed</th>
                                <th>Requirements Completed</th>
                                <th>Completion %</th> {/* Add a column for completion percentage */}
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredChartData.map((course, index) => (
                                <tr 
                                    key={index} 
                                    className={`course-row ${course.FinalScore < 50 || course.RequirementsCompleted < course.requirementCount ? 'table-danger' : ''}`}
                                    onMouseEnter={(e) => {
                                        // Show tooltip
                                        const tooltip = document.createElement("div");
                                        tooltip.innerHTML = getTooltipContent(course);
                                        tooltip.className = "custom-tooltip";
                                        tooltip.style.position = "absolute";
                                        tooltip.style.top = `${e.clientY + 10}px`;
                                        tooltip.style.left = `${e.clientX + 10}px`;
                                        document.body.appendChild(tooltip);
                                    }}
                                    onMouseLeave={() => {
                                        // Remove tooltip
                                        const tooltips = document.querySelectorAll(".custom-tooltip");
                                        tooltips.forEach(tooltip => tooltip.remove());
                                    }}
                                >
                                    {/* Table data cells */}
                                    <td>{course.name.split(' ')[1]}</td>
                                    <td>{course.name.split(' ')[3]}</td>
                                    <td>{course.FinalScore}</td>
                                    <td>{course.requirementCount || 15}</td>
                                    <td>{course.RequirementsCompleted}</td>
                                    <td>{Math.round(course.RequirementsCompletion)}%</td> {/* Display the completion percentage */}
                                    <td>{course.isCompleted ? 'Completed' : 'Not Completed'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <ResponsiveContainer width="100%" height={400} className="mt-3">
                        <BarChart data={filteredChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="FinalScore" fill="#8884d8" name="Final Score" />
                            {/* <Bar dataKey="RequirementsCompleted" fill="#82ca9d" name="Requirements Completed" /> */}
                            <Bar dataKey="RequirementsCompletion" fill="#82ca9d" name="Requirements Completion Ratio" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};
export default DetailedPerformanceMetrics;
