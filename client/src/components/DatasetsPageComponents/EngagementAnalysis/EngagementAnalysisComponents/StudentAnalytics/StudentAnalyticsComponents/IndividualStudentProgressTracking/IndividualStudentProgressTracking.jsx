import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const IndividualStudentProgressTracking = ({ dataset }) => {
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedMetrics, setSelectedMetrics] = useState(['scorePercentages']); // Default to showing scores
    const [students, setStudents] = useState([]);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        if (dataset && dataset.metrics && dataset.metrics[0].overallStats.assignmentsStatistics) {
            setStudents(dataset.metrics[0].overallStats.assignmentsStatistics.students);
        }
    }, [dataset]);

    useEffect(() => {
        if (selectedStudentId && students.length > 0) {
            const studentData = students.find(student => student.studentId === selectedStudentId);

            if (studentData) {
                const labels = Object.keys(studentData.scorePercentages); 

                const datasets = selectedMetrics.map(metric => {
                    const data = Object.values(studentData[metric]);
                    const label = metric === 'scorePercentages' ? 'scores' : 'scores';
                    const borderColor = metric === 'scorePercentages' ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)';
                    return {
                        label,
                        data,
                        fill: false,
                        borderColor,
                        tension: 0.1,
                    };
                });

                setChartData({ labels, datasets });
            } else {
                setChartData({ labels: [], datasets: [] });
            }
        }
    }, [selectedStudentId, students, selectedMetrics]);

    const handleMetricChange = (metric) => {
        const newMetrics = selectedMetrics.includes(metric)
            ? selectedMetrics.filter(m => m !== metric)
            : [...selectedMetrics, metric];
        setSelectedMetrics(newMetrics);
    };

    return (
        <div>
            <h1>Individual Student Progress Tracking</h1>
            <div>
                <select value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)}>
                    <option value="">Select a Student</option>
                    {students.map(({ studentId }) => (
                        <option key={studentId} value={studentId}>{studentId}</option>
                    ))}
                </select>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedMetrics.includes('scorePercentages')}
                            onChange={() => handleMetricChange('scorePercentages')}
                        />
                        Percentages
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedMetrics.includes('scores')}
                            onChange={() => handleMetricChange('scores')}
                        />
                        Scores
                    </label>
                </div>
            </div>
            {selectedStudentId && chartData.labels.length > 0 && <Line data={chartData} />}
        </div>
    );
};

export default IndividualStudentProgressTracking;
