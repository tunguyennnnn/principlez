import React from 'react';
import ReactPlaceholder from 'react-placeholder';

export default function(Component) {
  return props => {
    const { data } = props;
    if (!data) {
      return <Component {...props} />;
    }
    return (
      <ReactPlaceholder type="media" rows={3} ready={!data.loading}>
        <Component {...props} />
      </ReactPlaceholder>
    );
  };
}
