import React from 'react';
import ReactDOM from 'react-dom';

export default function Notification({ type, title, message }) {
  return (
    <div class="widget-list widget-list-rounded inverse-mode w-100">
      <div class="widget-list-item">
        <div class="widget-list-content">
          <h4 class="widget-list-title">{title}</h4>
          <p class="widget-list-desc">{message}</p>
        </div>
      </div>
    </div>
  );
}
