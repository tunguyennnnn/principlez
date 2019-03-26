import './card.scss';
import React from 'react';

export default function Card(props) {
  const { title, body, type, author, view, like } = props;
  console.log(props);
  return (
    <div class="card-container">
      <div class="card-author">{author.fullname}</div>
      <div class="card-content-container">
        <div class="title">
          <strong>{title}</strong>
        </div>
      </div>
      <div class="card-actions">
        <div class="action">View</div>
        <div class="action">Like</div>
        <div class="action">Info</div>
      </div>
    </div>
  );
}
