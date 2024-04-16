import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Form } from 'react-bootstrap';
import './CompletionTrends.css'; 

const aggregateCompletionData = (studentDetails, filters) => {
    const { minScore, maxScore, minReqCount, isModular, hasError } = filters;
    const termCompletion = {};

    studentDetails.forEach(student => {
        student.coursesDetailsPerStudent.forEach(course => {
            // Apply filters
            if (course.finalScore < minScore || course.finalScore > maxScore ||
                course.requirementCompletedCount < minReqCount ||
                (isModular !== undefined && course.isModular !== isModular) ||
                (hasError !== undefined && course.courseError !== hasError)) {
                return;
            }

            const { termId, isCompleted } = course;
            if (!termCompletion[termId]) {
                termCompletion[termId] = { completed: 0, notCompleted: 0 };
            }

            if (isCompleted) {
                termCompletion[termId].completed += 1;
            } else {
                termCompletion[termId].notCompleted += 1;
            }
        });
    });

    const aggregatedData = Object.entries(termCompletion).map(([termId, counts]) => ({
        term: termId,
        completionRatio: counts.completed / (counts.completed + counts.notCompleted) * 100,
    }));

    aggregatedData.sort((a, b) => a.term.localeCompare(b.term));
    return aggregatedData;
};


const CompletionTrends = ({ dataset }) => {
    const studentDetails = dataset.metrics[0].overallStats.studentDetails;
    const [filters, setFilters] = useState({
        minScore: 0,
        maxScore: 100,
        minReqCount: 0,
        isModular: undefined, // true, false, or undefined for no filter
        hasError: undefined, // true, false, or undefined for no filter
    });

    const [completionData, setCompletionData] = useState([]);


    useEffect(() => {
        const aggregatedData = aggregateCompletionData(studentDetails, filters);
        setCompletionData(aggregatedData);
    }, [studentDetails, filters]);

    // Handler functions to update filter state
    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Adjusting the handling for select dropdowns for boolean and 'All' (undefined) values
        let parsedValue = value;
        if (name === "isModular" || name === "hasError") {
            if (value === "true") {
                parsedValue = true;
            } else if (value === "false") {
                parsedValue = false;
            } else {
                parsedValue = undefined; // Handle 'All' option
            }
        } else if (type !== 'checkbox') {
            parsedValue = Number(value); 
        } else {
            parsedValue = checked; // For checkboxes
        }

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: parsedValue
        }));
    };


    return (
        <div className="completion-trends-container">
            <h1>Completion Trends</h1>
            {/* Filter UI Elements */}
            <div className="filters">
                <label>
                    Min Final Score:
                    <input type="number" name="minScore" value={filters.minScore} onChange={handleFilterChange} />
                </label>
                <label>
                    Max Final Score:
                    <input type="number" name="maxScore" value={filters.maxScore} onChange={handleFilterChange} />
                </label>
                <label>
                    Min Requirement Count:
                    <input type="number" name="minReqCount" value={filters.minReqCount} onChange={handleFilterChange} />
                </label>
                <label>
                    is Modular:
                    <select name="isModular" value={filters.isModular === undefined ? "" : String(filters.isModular)} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    Has Error:
                    <select name="hasError" value={filters.hasError === undefined ? "" : String(filters.hasError)} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
            </div>

            <ResponsiveContainer width="95%" height={400}>
                <LineChart
                    data={completionData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="term" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="completionRatio" stroke="#82ca9d" activeDot={{ r: 8 }} name="Completion Ratio" />
                    {/* <Line type="monotone" dataKey="completed" stroke="#82ca9d" activeDot={{ r: 8 }} name="Courses Completed" /> */}
                    {/* <Line type="monotone" dataKey="notCompleted" stroke="#8884d8" name="Courses Not Completed" /> */}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CompletionTrends;
