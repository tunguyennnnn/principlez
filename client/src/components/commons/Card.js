import './card.scss';
import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import StoryMetaData from './StoryMetaData';
import * as UserId from '../../utils/userId';
import BlogEditor from '../BlogEditor';

export default function Card(props) {
  const { id, title, body, updatedAt, isAuthor, author, view, like } = props;
  const viewCount = view.count + view.anonymousCount;

  const link = '/of/' + UserId.generateId(author.id, author.fullname);
  const storyLink = link + (isAuthor ? `/stories/${id}` : `/stories?id=${id}`);
  const linkText = isAuthor ? 'Edit...' : 'Read...';

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
        <div className="read">
          <Link to={storyLink}>{linkText}</Link>
        </div>
      </div>
      <div className="card-actions">
        <StoryMetaData
          viewCount={viewCount}
          likeCount={like.count}
          updatedAt={updatedAt}
        />
      </div>
    </div>
  );
}
