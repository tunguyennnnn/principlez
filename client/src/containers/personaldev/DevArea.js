import React from 'react';
import { compose, graphql } from 'react-apollo';

import { newItemsQuery as learnngItemQuery } from './graphql';
import TodoList from '../../components/TodoList';
import ListLoading from '../../components/hoc/ListLoadingHoc';

@ListLoading
class DevArea extends React.Component {
  render() {
    const { data, name: title } = this.props;

    const { newItems } = data;

    const { pageInfo, edges } = newItems;
    const items = edges.map(({ node }) => node);
    return (
      <TodoList cart keyPrefix={'dev-area-item'} header={title} items={items} />
    );
  }
}

export default compose(
  graphql(learnngItemQuery, {
    options: props => {
      return {
        variables: {
          learningAreaId: props.id,
        },
      };
    },
  }),
)(DevArea);
