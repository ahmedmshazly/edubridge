import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const generateChartData = (dataset) => {
    return {
        labels: dataset.map(course => course.courseName),
        datasets: [
            {
                label: 'Median Grade',
                data: dataset.map(course => calculateStatistics(course.grades).median),
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                type: 'line', // Display median as a line chart on top of the bar chart
                fill: false,
            },
            {
                label: 'Grade Range',
                data: dataset.map(course => calculateStatistics(course.grades).range),
                backgroundColor: dataset.map(course => course.color),
                borderColor: dataset.map(course => course.borderColor),
                borderWidth: 1,
            },
        ],
    };
};

const calculateStatistics = (grades) => {
    const sortedGrades = [...grades].sort((a, b) => a - b);
    const midIndex = Math.floor(sortedGrades.length / 2);
    const median = sortedGrades.length % 2 !== 0 ? sortedGrades[midIndex] : (sortedGrades[midIndex - 1] + sortedGrades[midIndex]) / 2;
    const range = sortedGrades[sortedGrades.length - 1] - sortedGrades[0];

    return { median, range };
};


const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        tooltip: {
            callbacks: {
                // Customize tooltip content here
                // e.g., showing specific statistics
            }
        },
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Course Grade Statistics',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Grades',
            },
        },
        x: {
            title: {
                display: true,
                text: 'Courses',
            },
        },
    },
};

const templateDataset = [
    {
        courseName: 'Introduction to Psychology',
        grades: [88, 92, 79, 85, 87], // Example set of grades for this course
        color: 'rgba(255, 99, 132, 0.2)', // Light red
        borderColor: 'rgba(255, 99, 132, 1)' // Darker red
    },
    {
        courseName: 'Principles of Economics',
        grades: [65, 75, 70, 68, 74], // Example set of grades for this course
        color: 'rgba(54, 162, 235, 0.2)', // Light blue
        borderColor: 'rgba(54, 162, 235, 1)' // Darker blue
    },
    {
        courseName: 'Modern World History',
        grades: [83, 89, 85, 90, 87], // Example set of grades for this course
        color: 'rgba(255, 206, 86, 0.2)', // Light yellow
        borderColor: 'rgba(255, 206, 86, 1)' // Darker yellow
    },
    {
        courseName: 'Introduction to Philosophy',
        grades: [94, 92, 95, 98, 97], // Example set of grades for this course
        color: 'rgba(75, 192, 192, 0.2)', // Light green
        borderColor: 'rgba(75, 192, 192, 1)' // Darker green
    }
];


const PerformanceOverview = ({ dataset }) => {
    const chartData = generateChartData(templateDataset);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Grade Distribution by Course'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Average Grade'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Courses'
                }
            }
        }
    };

    return (
        <div>
            <h2>Performance Overview</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default PerformanceOverview;
