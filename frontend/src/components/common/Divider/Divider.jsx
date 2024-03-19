// src/components/common/Divider.js
import React from 'react';
import './Divider.css';

const Divider = ({ children }) => {
  return (

    <div className="divider"><span>{children}</span></div>
  );
};

export default Divider;
