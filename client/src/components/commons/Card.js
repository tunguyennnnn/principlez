import './card.scss';
import React from 'react';
import BlogEditor from '../BlogEditor';

export default function Card(props) {
  const { title, body, type, author, view, like } = props;
  return (
    <div class="card-container">
      <div class="card-author">{author.fullname}</div>
      <div class="card-content-container">
        <div class="title">
          <strong>{title}</strong>
        </div>
        <BlogEditor title={title} body={body} readOnly previewOnly />
      </div>
      <div class="card-actions">
        <div class="card-action">View</div>
        <div class="card-action">Like</div>
        <div class="card-action">Info</div>
      </div>
    </div>
  );
}
