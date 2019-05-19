import React from 'react';
import { Link } from 'react-router-dom';

import * as UserId from '../../../utils/userId';

function displayResults(results, limit) {
  return _.map(_.take(results, limit), result => {
    const {
      title,
      body,
      id,
      author: { id: userId, fullname },
    } = result;
    return (
      <li key={`${id}-${title}`}>
        <Link
          to={`/of/${UserId.generateId(userId, fullname)}/stories?id=${id}`}
        >
          {title}
        </Link>
      </li>
    );
  });
}

export default function StorySearchResult(props) {
  const { results, limit } = props;
  return (
    <div>
      <li>STORIES</li>
      {displayResults(results, limit)}
    </div>
  );
}
