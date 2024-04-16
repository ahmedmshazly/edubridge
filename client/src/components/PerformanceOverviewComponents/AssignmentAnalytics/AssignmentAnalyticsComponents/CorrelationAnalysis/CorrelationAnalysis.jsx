import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AssignmentScoreDistribution = ({ dataset }) => {
    const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        // Transform the dataset if needed or set it directly
        const transformedData = dataset.metrics[0].overallStats.assignmentsStatistics.students;
        setAssignments(transformedData);
    }, [dataset]);

    useEffect(() => {
        if (selectedAssignmentId && assignments.length > 0) {
            const scores = assignments
              .map((student, index) => ({
                  label: `Student ${index + 1}`,
                  score: student.scores[selectedAssignmentId], 
              }))
              .filter(entry => entry.score !== undefined); 

            setChartData({
                labels: scores.map(entry => entry.label),
                datasets: [{
                    label: 'Scores',
                    data: scores.map(entry => entry.score),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }],
            });
        }
    }, [selectedAssignmentId, assignments]);

    return (
        <div>
            <h2>Assignment Score Distribution</h2>
            <select value={selectedAssignmentId} onChange={(e) => setSelectedAssignmentId(e.target.value)}>
                <option value="">Select an Assignment</option>
                {assignments.length > 0 && Object.keys(assignments[0].scores || {}).map((assignmentId) => (
                    <option key={assignmentId} value={assignmentId}>
                        Assignment {assignmentId}
                    </option>
                ))}
            </select>
            {selectedAssignmentId && <Bar data={chartData} />}
        </div>
    );
};

export default AssignmentScoreDistribution;
