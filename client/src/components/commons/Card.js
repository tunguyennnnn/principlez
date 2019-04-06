import './card.scss';
import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import * as UserId from '../../utils/userId';
import BlogEditor from '../BlogEditor';
import { formatDateTime } from '../../utils/datetime';

export default function Card(props) {
  const { id, title, body, updatedAt, type, author, view, like } = props;
  const viewCount = view.count + view.anonymousCount;
  const link = '/of/' + UserId.generateId(author.id, author.fullname);
  return (
    <div className="card-container box-shadow">
      <div className="card-author">
        <Link to={link} className="scaler-hover">
          <Icon name="id badge outline" />
          {author.fullname}
        </Link>
      </div>
      <div className="card-content-container">
        <div className="title">
          <strong>{title}</strong>
        </div>
        <div className="content">
          <BlogEditor title={title} body={body} readOnly previewOnly />
        </div>
      </div>
      <div className="card-time-container">
        <Icon name="pencil alternate" />
        {formatDateTime(updatedAt)}
      </div>
      <div className="card-actions">
        <div className="card-action">
          <Icon name="user" />
          {` ${viewCount} Views`}
        </div>
        <div className="card-action">
          <Icon name="thumbs up" />
          {` ${like.count} Like`}
        </div>
        <div className="card-action">
          <Link to={link + `/stories?id=${id}`}>
            {'Read '}
            <Icon name="chevron right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
