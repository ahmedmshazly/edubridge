import React from 'react';
import './BackgroundPhoto.css'; // Make sure to create a CSS file for styles

const BackgroundPhoto = ({ backgroundImage }) => {
  return (
    <div className="background-photo" style={{ backgroundImage: `url(${backgroundImage})` }}>
    </div>
  );
};

export default BackgroundPhoto;
