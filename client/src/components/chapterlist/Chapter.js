import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function Chapter({
  children,
  link,
  deleteChapter,
  readOnly,
  view,
  like,
}) {
  const viewCount = view.count + view.anonymousCount;

  return (
    <Card className="chapter-content">
      {!readOnly && (
        <div class="chapter-delete-icon">
          <Icon name="delete" circular onClick={deleteChapter} />
        </div>
      )}
      <NavLink to={link} activeClassName="active-chapter-content">
        <Card.Content>
          <Card.Header>{children}</Card.Header>
          <Card.Meta>
            <span className="date">Written in 2019</span>
          </Card.Meta>
        </Card.Content>
      </NavLink>
      <Card.Content>
        {viewCount ? (
          <a>
            <Icon name="user" />
            {viewCount} Views
          </a>
        ) : null}
        <br />
        {like.count ? (
          <a>
            <Icon name="thumbs up" />
            {like.count} Likes
          </a>
        ) : null}
      </Card.Content>
    </Card>
  );
}
