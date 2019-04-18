import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { withRouter } from 'react-router';

import IconButton from '../commons/IconButton';
import StoryWriteContext from '../../contexts/StoryWriteContext';

function ChapterMenu({ deleteChapter }) {
  const deleteAction = () => {
    const c = confirm('Are you sure to delete?');
    if (c) {
      deleteChapter();
    }
  };
  return (
    <div class="chapter-action-menu">
      <IconButton iconName="trash" text="delete story" action={deleteAction} />
    </div>
  );
}

function ChapterTitle({ title }) {
  if (!_.isEmpty(_.trim(title))) {
    return title;
  }
  return (
    <StoryWriteContext.Consumer>
      {({ placeholderText }) => (
        <div class="title-place-holder">{placeholderText}</div>
      )}
    </StoryWriteContext.Consumer>
  );
}

function ChapterBodyFocus({ id, title, deleteChapter }) {
  return (
    <div className="top">
      <div className="title">
        <ChapterTitle title={title} />
      </div>
      <ChapterMenu deleteChapter={deleteChapter} />
    </div>
  );
}

function ChapterBody({ title, id }) {
  const [hovered, updateHoverState] = useState(false);
  return (
    <div
      className="top"
      onMouseEnter={() => updateHoverState(true)}
      onMouseLeave={() => updateHoverState(false)}
    >
      <div className="title">
        <ChapterTitle title={title} />
      </div>
    </div>
  );
}

function Chapter(props) {
  const {
    id,
    title,
    forceParentUpdate,
    deleteChapter,
    readOnly,
    view,
    like,
    match: {
      params: { chapterId },
    },
  } = props;

  const isFocusedChapter = id === chapterId;
  const viewCount = view.count + view.anonymousCount;

  const ChapterBodyComponent = isFocusedChapter
    ? ChapterBodyFocus
    : ChapterBody;

  const link = readOnly ? `stories?id=${id}` : id;

  return (
    <div
      className="chapter-content"
      onClick={() => {
        props.history.push(link);
        forceParentUpdate && forceParentUpdate(id);
      }}
    >
      <ChapterBodyComponent
        title={title}
        id={id}
        deleteChapter={deleteChapter}
      />
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

export default withRouter(Chapter);
