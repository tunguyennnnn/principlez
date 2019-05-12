import React from 'react';

export default function StorySearchResult(props) {
  const { results, searchText } = props;
  console.log('size', _.size(results));
  return (
    <div>
      <h4>STORIES</h4>
      {_.map(_.take(results, 3), (result, index) => {
        const { title, body } = result;
        return (
          <li key={index}>
            <h4>{title}</h4>
            {/* <div>{body[0].nodes[0].leaves[0].text}</div> */}
          </li>
        );
      })}
      {_.size(results) > 3 && <li>See all results for {searchText}</li>}
    </div>
  );
}
