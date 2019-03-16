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
        {view.count ? (
          <a>
            <Icon name="user" />
            {view.count} Views
          </a>
        ) : null}
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
