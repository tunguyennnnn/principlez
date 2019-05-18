import React from 'react';
import { Link } from 'react-router-dom';

import { generateId } from '../../../utils/userId';

function displayResults(results, limit) {
  return _.map(_.take(results, limit), (result, index) => {
    const { title, body, id } = result;
    console.log('result', result);
    return (
      <li key={index}>
        {title}
        {/* <div>{body[0].nodes[0].leaves[0].text}</div> */}
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
