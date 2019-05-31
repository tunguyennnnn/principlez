import React from 'react';
import TodoList from '../../components/TodoList';
import ListLoading from '../../components/hoc/ListLoadingHoc';

@ListLoading
export default class NewItems extends React.Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return <div>...loading</div>;
    }

    const { newItems } = data;

    const { pageInfo, edges } = newItems;

    const items = edges.map(({ node }) => node);
    return (
      <TodoList
        cart
        key={'new-item'}
        header={'New things to learn'}
        items={items}
      />
    );
  }
}
