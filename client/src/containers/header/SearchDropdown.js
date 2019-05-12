import React from 'react';

export default function SearchDropdown(props) {
  const { results } = props;
  console.log('results', results);
  return (
    <div className="dropdown-menu-container">
      {_.map(results, (result, index) => (
        <li key={index}>{result.title}</li>
      ))}
    </div>
  );
}
