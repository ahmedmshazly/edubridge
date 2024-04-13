import React from 'react';
import './SideBarNumbers.css';
import { useDatasetsContext } from "../../../hooks/useDatasetsContext"; 

const SideBarNumbers = () => {
  const { datasets, totalStudents } = useDatasetsContext();
  
  // Function to sum numbers for unique courses
  const sumUniqueCourses = (datasets) => {
    return datasets.reduce((total, dataset) => {
      const uniqueCoursesCount = dataset.metrics?.[0]?.overallStats?.uniqueCoursesCount?.total || 0;
      return total + uniqueCoursesCount;
    }, 0);
  };

  // Function to count unique assignments across all datasets
  const countUniqueAssignments = (datasets) => {
    const uniqueAssignments = new Set(); // Use a Set to store unique IDs
    datasets.forEach(dataset => {
      const assignments = dataset.metrics?.[0]?.overallStats?.assignmentsStatistics?.assignments || [];
      assignments.forEach(assignment => {
        // Assuming the assignment object looks like { Id: "content" }
        if (assignment.assignmentId) uniqueAssignments.add(assignment.assignmentId); // Add the ID to the Set
      });
    });
    return uniqueAssignments.size; // The size of the Set represents the count of unique IDs
  };

  // Use functions to calculate totals
  const totalUniqueCourses = sumUniqueCourses(datasets);
  const totalUniqueAssignments = countUniqueAssignments(datasets);

  return (
    <div className="sidebar-numbers">
        <div className="sidebar-item">
          <div className="number">{datasets.length}</div>
          <div className="description">Databases</div>
        </div>
        <div className="sidebar-item">
          <div className="number">{totalStudents}</div>
          <div className="description">Students</div>
        </div>
        <div className="sidebar-item">
          <div className="number">{totalUniqueCourses}</div>
          <div className="description">Courses</div>
        </div>
        <div className="sidebar-item">
          <div className="number">{totalUniqueAssignments}</div>
          <div className="description">Assignments</div>
        </div>
    </div>
  );
};

export default SideBarNumbers;
