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
    <div class="widget-list widget-list-rounded w-100">
      <div class={`widget-list-item ${className}`}>
        <div class="widget-list-content f-s-16">
          <h4 class="widget-list-title">{title}</h4>
          <p class="widget-list-desc">{message}</p>
        </div>
      </div>
    </div>
  );
}
