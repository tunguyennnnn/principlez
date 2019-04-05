import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { formatDateTime } from '../../utils/datetime';
import { generateId } from '../../utils/userId';
import BlogEditor from '../../components/BlogEditor';

export default function Story({
  id,
  title,
  body,
  updatedAt,
  like,
  view,
  author,
  likeChapter,
  unlikeChapter,
}) {
  const viewCount = view.count + view.anonymousCount;
  const { liked, count: likeCount } = like;
  const likeAction = liked ? unlikeChapter : likeChapter;
  return (
    <div className="story-container">
      <div className="title">{title}</div>
      <div className="author">
        <Link to={`/of/${generateId(author.id, author.fullname)}`}>
          <Icon name="id badge outline" />
          {author.fullname}
        </Link>
      </div>
      <div className="meta-data">
        <div className="meta-items">
          <div className="item">
            <Icon name="eye" />
            {viewCount}
          </div>
          <div className="item">
            <Icon name="star" onClick={() => likeAction(id)} />
            {likeCount}
          </div>
        </div>
        <div className="time-container">
          <Icon name="pencil alternate" />
          {formatDateTime(updatedAt)}
        </div>
      </div>
      <BlogEditor title={title} body={body} readOnly noTitle />
    </div>
  );
}
