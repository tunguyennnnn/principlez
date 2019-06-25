import React from 'react';

const backgroundColor = {
  warning: 'bg-orange-transparent-9',
  error: 'bg-red-transparent-9',
  success: 'bg-green-transparent-9',
  notification: 'inverse-mode',
};

export default function Notification({ type, title, message }) {
  const className = backgroundColor[type] || 'inverse-mode';
  return (
    <div className="widget-list widget-list-rounded w-100">
      <div className={`widget-list-item ${className}`}>
        <div className="widget-list-content f-s-16">
          <h4 className="widget-list-title">{title}</h4>
          <p className="widget-list-desc">{message}</p>
        </div>
      </div>
    </div>
  );
}
