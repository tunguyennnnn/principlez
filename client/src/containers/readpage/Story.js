import React from 'react';
import BlogEditor from '../../components/BlogEditor';

export default function Story({ title, body }) {
  return (
    <div class="story-container">
      <BlogEditor title={title} body={body} readOnly />
    </div>
  );
}
