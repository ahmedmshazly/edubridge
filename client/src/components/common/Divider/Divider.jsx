import React from 'react';
import './Divider.css';

const Divider = ({ children, style }) => {
  return (
    <div className="divider" style={style}>
      <span>{children}</span>
    </div>
  );
};

export default Divider;
