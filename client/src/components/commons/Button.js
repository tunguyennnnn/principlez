import './button.scss';
import React from 'react';

export default function LargeButton({ onClick, title }) {
  return (
    <div className="large-button-css" onClick={onClick}>
      {title}
    </div>
  );
}
