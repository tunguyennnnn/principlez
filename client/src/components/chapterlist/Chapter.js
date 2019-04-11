import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

function ChapterMenu(props) {
  return (
    <div class="chapter-action-menu">
      <Icon name="trash" />
    </div>
  );
}

export default function Chapter({ children, link, deleteChapter, view, like }) {
  const [hovered, updateHoverState] = useState(false);
  const viewCount = view.count + view.anonymousCount;

  return (
    <div
      className="chapter-content common-layout"
      onMouseEnter={() => updateHoverState(true)}
      onMouseLeave={() => updateHoverState(false)}
    >
      <div className="top">
        <NavLink to={link} activeClassName="active-chapter-content">
          <div className="title">{children}</div>
        </NavLink>
      </div>
      {hovered && <ChapterMenu />}
      <div>
        {viewCount ? (
          <a>
            <Icon name="user" />
            {viewCount} Views
          </a>
        ) : null}
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
