import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

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
    <div className="chapter-content">
      <div className="chapter-delete-icon">
        <Icon
          name="delete"
          circular
          onClick={deleteChapter}
          className="reverse-color"
        />
      </div>
      <div className="top">
        <NavLink to={link} activeClassName="active-chapter-content">
          <div className="title">{children}</div>
          <div className="time">
            <span className="date">Written in 2019</span>
          </div>
        </NavLink>
      </div>
      <div>
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
      </div>
    </div>
  );
}
