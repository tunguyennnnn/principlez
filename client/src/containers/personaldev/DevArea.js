import React from 'react';
import { compose, graphql } from 'react-apollo';

import {
  newItemsQuery as learnngItemQuery,
  createItemToLearnMutation,
} from './graphql';

import FormContext from '../../contexts/FormContext';
import TodoList from '../../components/TodoList';
import ListLoading from '../../components/hoc/ListLoadingHoc';

@ListLoading
class DevArea extends React.Component {
  createNewItems = async ({ name, description, source }) => {
    const { id: learningAreaId } = this.props;
    try {
      await this.props.createItemToLearn({
        variables: { name, description, source, learningAreaId },
        update: (store, { data: { createItemToLearn } }) => {
          const data = _.cloneDeep(
            store.readQuery({
              query: learnngItemQuery,
              variables: { learningAreaId },
            }),
          );
          data.newItems.edges.push({
            __typename: 'ItemToLearnEdge',
            cursor: createItemToLearn.id,
            node: createItemToLearn,
          });
          store.writeQuery({
            query: learnngItemQuery,
            data,
            variables: { learningAreaId },
          });
        },
      });
    } catch (e) {}
  };

  render() {
    const { id, data, title } = this.props;

    const { newItems } = data;

    const { pageInfo, edges } = newItems;
    const items = edges.map(({ node }) => node);
    return (
      <FormContext.Provider
        value={{
          submit: this.createNewItems,
          fields: ['name', 'description', 'source'],
        }}
      >
        <TodoList
          cart
          keyPrefix={'dev-area-item'}
          id={id}
          header={title}
          items={items}
        />
      </FormContext.Provider>
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
  graphql(createItemToLearnMutation, {
    name: 'createItemToLearn',
  }),
)(DevArea);
