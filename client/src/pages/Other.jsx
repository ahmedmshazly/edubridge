import React from 'react';

const Other = ({ datasetName }) => {
  // No longer need to use useLocation to get the datasetName
  return (
    <div>
      <h1>{datasetName}</h1>
    </div>
  );
};

export default Other;
