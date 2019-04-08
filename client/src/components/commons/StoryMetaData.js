import React from 'react';
import { Icon } from 'semantic-ui-react';
import { formatDateTime } from '../../utils/datetime';

export default function StoryMetaData(props) {
  const { updatedAt, viewCount, likeCount, likeAction = () => {} } = props;

  return (
    <div className="meta-data">
      <div className="meta-items">
        <div className="item">
          <Icon name="eye" />
          {viewCount}
        </div>
        <div className="item">
          <Icon name="star" onClick={likeAction} />
          {likeCount}
        </div>
      </div>
      <div className="time-container">
        <Icon name="pencil alternate" />
        {formatDateTime(updatedAt)}
      </div>
    </div>
  );
}
