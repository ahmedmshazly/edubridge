import React from 'react';
import './SideBarNumbers.css';
import { useDatasetsContext } from "../../../hooks/useDatasetsContext"; 

const SideBarNumbers = () => {
  const { datasets } = useDatasetsContext();
  const { totalStudents } = useDatasetsContext();
  console.log(totalStudents)
  
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
    </div>
  );
};

export default SideBarNumbers;
