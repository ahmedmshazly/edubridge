// DashboardSummary.jsx
import React from 'react';
import './DashboardSummary.css'; // Ensure you create this CSS file

const DashboardSummary = ({ dataset }) => {
  const { studentCompletion, overallStats, uniqueCoursesCount } = dataset.metrics[0]; // Assuming metrics is an array

  return (
    <div className="dashboard-summary">
      <div className="card-container">
        <div className="card">
          <h3>Total Students: {studentCompletion.totalStudents}</h3>
          <p>Completed All Courses: {studentCompletion.completedAllCourses}</p>
          <p>Not Completed Any: {studentCompletion.notCompletedAllCourses}</p>
          <p>Completed Some Courses: {studentCompletion.completedSomeCourses}</p>
        </div>

        <div className="card">
          
          <h3>Overall Final Score</h3>
          
          <p>Average: {overallStats.finalScore.averageFinalScore.toFixed(2)}</p>
          <p>Median: {overallStats.finalScore.median}</p>
          <p>Range: {overallStats.finalScore.min} - {overallStats.finalScore.max}</p>
        </div>

        <div className="card">
          <h3>Requirement Counts</h3>
          <p>Average Completed: {overallStats.requirementCount.averageRequirementCompletedCount.toFixed(2)}</p>
          <p>Median Completed: {overallStats.requirementCount.medianCompleted}</p>
          <p>Range: {overallStats.requirementCount.minCompleted} - {overallStats.requirementCount.maxCompleted}</p>
        </div>

        <div className="card">
          <h3>Course Counts</h3>
          <p>Total: {overallStats.coursesCount.total}</p>
          <p>Completed: {overallStats.coursesCount.completed}</p>
          <p>Not Completed: {overallStats.coursesCount.notCompleted}</p>
        </div>

        <div className="card">
          <h3>Unique Courses</h3>
          <p>Total: {overallStats.uniqueCoursesCount.total}</p>
          <p>With Error: {overallStats.uniqueCoursesCount.uniqueCoursesCountWithError}</p>
          <p>Without Error: {overallStats.uniqueCoursesCount.uniqueCoursesCountWithoutError}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardSummary;
