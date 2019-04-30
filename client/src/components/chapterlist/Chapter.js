import React, { useState } from 'react';
import { Link as NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { Link as ScrollLink } from 'react-scroll';

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
    <div className="chapter-action-menu">
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
      {({ titlePlaceholder, read }) => (
        <div className="title-place-holder">{titlePlaceholder}</div>
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
    deleteChapter,
    readOnly,
    view,
    like,
    mobile,
    match: {
      params: { chapterId },
    },
  } = props;

  const isFocusedChapter = id === chapterId;
  const viewCount = view.count + view.anonymousCount;

  const ChapterBodyComponent = isFocusedChapter
    ? ChapterBodyFocus
    : ChapterBody;

  const Link = readOnly ? ScrollLink : NavLink;

  return (
    <Link
      smooth
      className="chapter-content"
      to={readOnly ? `story-${id}` : id}
      containerId={mobile ? 'stories-container' : null}
      offset={-90}
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
    </Link>
  );
}

export default withRouter(Chapter);
