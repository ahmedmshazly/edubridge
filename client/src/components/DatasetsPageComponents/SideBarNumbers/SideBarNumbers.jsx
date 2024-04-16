import React from 'react';
import './SideBarNumbers.css';
import { useDatasetsContext } from "../../../hooks/useDatasetsContext"; 

const SideBarNumbers = () => {
  const { datasets, totalStudents } = useDatasetsContext();
  
  const sumUniqueCourses = (datasets) => {
    return datasets.reduce((total, dataset) => {
      const uniqueCoursesCount = dataset.metrics?.[0]?.overallStats?.uniqueCoursesCount?.total || 0;
      return total + uniqueCoursesCount;
    }, 0);
  };

  const countUniqueAssignments = (datasets) => {
    const uniqueAssignments = new Set(); 
    datasets.forEach(dataset => {
      const assignments = dataset.metrics?.[0]?.overallStats?.assignmentsStatistics?.assignments || [];
      assignments.forEach(assignment => {
        if (assignment.assignmentId) uniqueAssignments.add(assignment.assignmentId); // Add the ID to the Set
      });
    });
    return uniqueAssignments.size; 
  };

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
