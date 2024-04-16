import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import './StudentPerformanceOverview.css';

const StudentPerformanceOverview = ({ dataset }) => {
    const studentDetails = dataset.metrics[0].overallStats.studentDetails;
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [viewOption, setViewOption] = useState('all'); 

    const selectedStudent = studentDetails.find(student => student.studentId === selectedStudentId);

    const { finalScores, reqCounts, barData } = selectedStudent ? prepareDataForView(selectedStudent, viewOption) : { finalScores: [], reqCounts: [], barData: [] };

    function prepareDataForView(student, viewOption) {
        const finalScores = [
            {
                name: 'Avg Final Score',
                Score: viewOption === 'all' ? student.averages.averageFinalScore :
                    viewOption === 'completed' ? student.averages.averageFinalScoreCompleted :
                        student.averages.averageFinalScoreNotCompleted,
            },
        ];
        const reqCounts = [
            {
                name: 'Avg Requirement Count',
                Score: viewOption === 'all' ? student.averages.averageRequirementCompletedCount :
                    viewOption === 'completed' ? student.averages.averageRequirementCompletedCountCompleted :
                        student.averages.averageRequirementCompletedCountNotCompleted,

            },

        ];
        console.log(reqCounts);

        const barData = [
            {
                name: 'Courses',
                Completed: viewOption !== 'notCompleted' ? student.averages.completedCoursesCount : 0,
                'Not Completed': viewOption !== 'completed' ? student.averages.notCompletedCoursesCount : 0,
            },
            {
                name: 'Completion Rate',
                Rate: student.averages.completionRate,
            },
        ];

        return { finalScores, reqCounts, barData };
    }

    return (
        <div className="student-performance-container">
            <select onChange={(e) => setSelectedStudentId(e.target.value)} value={selectedStudentId}>
                <option value="">Select a Student</option>
                {studentDetails.map(student => (
                    <option key={student.studentId} value={student.studentId}>{student.studentId}</option>
                ))}
            </select>

            {selectedStudentId && (
                <>
                    <div className="view-options">
                        <button onClick={() => setViewOption('all')} className={viewOption === 'all' ? 'active' : ''}>All Courses</button>
                        <button onClick={() => setViewOption('completed')} className={viewOption === 'completed' ? 'active' : ''}>Completed Courses</button>
                        <button onClick={() => setViewOption('notCompleted')} className={viewOption === 'notCompleted' ? 'active' : ''}>Not Completed Courses</button>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={finalScores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Score" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reqCounts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={['dataMin - 1', 'dataMax + 1']} allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Score" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height={300} style={{ marginTop: '20px' }}>
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Completed" fill="#82ca9d" />
                            <Bar dataKey="Not Completed" fill="#8884d8" />
                            {viewOption === 'all' && <Bar dataKey="Rate" fill="#ffc658" />}
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};

export default StudentPerformanceOverview;
