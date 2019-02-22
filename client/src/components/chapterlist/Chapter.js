import React from 'react';

export default function Chapter({ children }) {
  return (
    <div class="chapter-content">
      <div class="title">{children}</div>
      <p class="subtitle">Some description about the chapter</p>
    </div>
  );
}
