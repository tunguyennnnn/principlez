import './card.scss';
import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as UserId from '../../utils/userId';
import BlogEditor from '../BlogEditor';

export default function Card(props) {
  const { title, body, type, author, view, like } = props;
  const link = '/of/' + UserId.generateId(author.id, author.fullname);
  return (
    <div class="card-container">
      <div class="card-author">
        <Link to={link} className="scaler-hover">
          <Icon name="id badge outline" />
          {author.fullname}
        </Link>
      </div>
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
