import React from 'react';
import { Link } from 'react-router-dom';

export default function Chapter({ children, link }) {
  return (
    <div class="chapter-content">
      <div class="title">
        <Link to={link}>{children}</Link>
      </div>
      <p class="subtitle">Some description about the chapter</p>
    </div>
  );
}
