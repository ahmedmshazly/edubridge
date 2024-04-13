import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const AssignmentScoreDistribution = ({ dataset }) => {
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
    // console.log(assignments)

    // Assuming dataset is structured appropriately
    useEffect(() => {
        // Only set assignments once the component has mounted or when dataset changes
        if (dataset && dataset.metrics && dataset.metrics[0].overallStats.assignmentsStatistics) {
            setAssignments(dataset.metrics[0].overallStats.assignmentsStatistics.assignments);
        }
    }, [dataset]); // Add dataset as a dependency to this effect

    // Find the selected assignment based on selectedAssignmentId
    const selectedAssignment = assignments.find(a => a.assignmentId === selectedAssignmentId);

    // Prepare chart data for the selected assignment
    const chartData = {
        labels: selectedAssignment?.scores.map((_, index) => `Student ${index + 1}`) || [],
        datasets: [
            {
                label: 'Scores',
                data: selectedAssignment?.scorePercentages || [],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div>
            <h2>Assignment Score Distribution</h2>
            <select value={selectedAssignmentId} onChange={(e) => setSelectedAssignmentId(e.target.value)}>
                <option value="">Select an Assignment</option>
                {assignments.map((assignment) => (
                    <option key={assignment.assignmentId} value={assignment.assignmentId}>
                        Assignment {assignment.assignmentId}
                    </option>
                ))}
            </select>
            <Bar data={chartData} />
        </div>
    );
};

export default AssignmentScoreDistribution;
