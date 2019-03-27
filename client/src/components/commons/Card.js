import './card.scss';
import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import * as UserId from '../../utils/userId';
import BlogEditor from '../BlogEditor';

const formatDateTime = updatedAt => {
  const time = moment(Number(updatedAt));
  return time.format('YYYY-MM-DD');
};

export default function Card(props) {
  const { id, title, body, updatedAt, type, author, view, like } = props;
  const viewCount = view.count + view.anonymousCount;
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
      <div class="card-time-container">
        <Icon name="pencil alternate" />
        {formatDateTime(updatedAt)}
      </div>
      <div class="card-actions">
        <div class="card-action">
          <Icon name="user" />
          {` ${viewCount} Views`}
        </div>
        <div class="card-action">
          <Icon name="thumbs up" />
          {` ${like.count} Like`}
        </div>
        <div class="card-action">
          <Link to={link + `/stories/${id}/view`}>
            {'Read '}
            <Icon name="chevron right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
