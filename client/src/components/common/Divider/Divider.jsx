import React from 'react';
import './Divider.css';

/**
 * A reusable Divider component that displays optional text content.
 * The component can be extended to accept style props for customization.
 */
const Divider = ({ children, style }) => {
  return (
    // Using a div here due to the inclusion of text. For a purely decorative divider, consider <hr>.
    <div className="divider" style={style}>
      <span>{children}</span>
    </div>
  );
};

export default Divider;
