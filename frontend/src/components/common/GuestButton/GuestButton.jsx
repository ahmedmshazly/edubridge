// src/components/common/GuestButton.js
import React from 'react';
import './GuestButton.css'; 

const GuestButton = ({ onClick }) => {
  return (
    <button className="guest-button" onClick={onClick}>
      GUEST?
    </button>
  );
};

export default GuestButton;
