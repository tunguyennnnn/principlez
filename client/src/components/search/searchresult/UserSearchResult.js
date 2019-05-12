import React from 'react';

function displayResults(results, limit) {
  return _.map(_.take(results, limit), (result, index) => {
    const { fullname } = result;
    return <li key={index}>@{fullname}</li>;
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
