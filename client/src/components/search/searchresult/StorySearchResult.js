import React from 'react';

function displayResults(results, limit) {
  return _.map(_.take(results, limit), (result, index) => {
    const { title, body } = result;
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
