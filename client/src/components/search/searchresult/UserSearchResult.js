import React from 'react';
import { Link } from 'react-router-dom';

import * as UserId from '../../../utils/userId';

function displayResults(results, limit) {
  return _.map(_.take(results, limit), (result, index) => {
    const { fullname, id } = result;
    return (
      <li key={index}>
        <Link to={`/of/${UserId.generateId(id, fullname)}`}>@{fullname}</Link>
      </li>
    );
  });
}

export default function UserSearchResult(props) {
  const { results, limit } = props;
  return (
    <div>
      <li>PEOPLE</li>
      {displayResults(results, limit)}
    </div>
  );
}
