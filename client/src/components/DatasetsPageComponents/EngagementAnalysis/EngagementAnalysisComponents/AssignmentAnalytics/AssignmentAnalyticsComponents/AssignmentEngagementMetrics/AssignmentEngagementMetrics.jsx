import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  Tooltip, Legend, ArcElement, Title, 
  CategoryScale, LinearScale, PointElement, LineElement
);

const AssignmentEngagementMetrics = ({ dataset }) => {
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
    const [summaryData, setSummaryData] = useState({ totalSubmissions: 0, averageLateDays: 0 });

    useEffect(() => {
        // Assume dataset structure and extract assignments accordingly
        if (dataset && dataset.metrics && dataset.metrics[0].overallStats.assignmentsStatistics) {
            setAssignments(dataset.metrics[0].overallStats.assignmentsStatistics.assignments);
        }
    }, [dataset]);

    useEffect(() => {
        // Simulate calculating summary data for the selected assignment
        if (selectedAssignmentId) {
            const assignment = assignments.find(assignment => assignment.assignmentId === selectedAssignmentId);
            // Simulated calculation of total submissions and average late days
            const totalSubmissions = assignment?.onTimeCount + assignment?.lateCount;
            const averageLateDays = Math.random() * 5; // Dummy calculation

            setSummaryData({ totalSubmissions, averageLateDays });
        }
    }, [selectedAssignmentId, assignments]);

    const selectedAssignmentData = assignments.find(assignment => assignment.assignmentId === selectedAssignmentId);

    const pieData = {
        labels: ['On-Time Submissions', 'Late Submissions'],
        datasets: [{
            data: [
                selectedAssignmentData?.onTimeCount || 10,
                selectedAssignmentData?.lateCount || 16,
            ],
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
            ],
            hoverBackgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 2,
        }],
    };

    // Add a Line chart dataset for visualizing submission trends over time
    // Placeholder data; you'd replace this with actual date-based data for the selected assignment
    const lineData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                label: 'On-Time Submissions Over Time',
                data: [12, 19, 3, 5],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                fill: true,
            },
            {
                label: 'Late Submissions Over Time',
                data: [2, 3, 20, 15],
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                fill: true,
            },
        ],
    };

    return (
        <div>
            <h2>Assignment Engagement Metrics</h2>
            <select value={selectedAssignmentId} onChange={(e) => setSelectedAssignmentId(e.target.value)}>
                <option value="">Select an Assignment</option>
                {assignments.map(({ assignmentId, title }) => (
                    <option key={assignmentId} value={assignmentId}>
                        {title || `Assignment ${assignmentId}`}
                    </option>
                ))}
            </select>
            {selectedAssignmentId && <>
              <Pie data={pieData} />
              <Line data={lineData} />
              <div>
                <h3>Summary</h3>
                <p>Total Submissions: {summaryData.totalSubmissions}</p>
                <p>Average Late Days: {summaryData.averageLateDays.toFixed(2)}</p>
              </div>
            </>}
        </div>
    );
};

export default AssignmentEngagementMetrics;
