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
    <div class="story-container">
      <div class="title">{title}</div>
      <div class="author">
        <Link to={`/of/${generateId(author.id, author.fullname)}`}>
          <Icon name="id badge outline" />
          {author.fullname}
        </Link>
      </div>
      <div class="meta-data">
        <div class="meta-items">
          <div class="item">
            <Icon name="eye" />
            {viewCount}
          </div>
          <div class="item">
            <Icon name="star" onClick={() => likeAction(id)} />
            {likeCount}
          </div>
        </div>
        <div class="time-container">
          <Icon name="pencil alternate" />
          {formatDateTime(updatedAt)}
        </div>
      </div>
      <BlogEditor title={title} body={body} readOnly noTitle />
    </div>
  );
}
