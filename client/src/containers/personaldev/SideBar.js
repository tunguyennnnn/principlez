import React from 'react';
import TodoList from '../../components/TodoList';
import ListLoading from '../../components/hoc/ListLoadingHoc';

function LearningAreas(props) {
  const Comp = props => {
    const { data } = props;

    const { learningAreas } = data;
    return (
      <TodoList
        cart
        keyPrefix={'sidebar-item'}
        header="Learning Areas"
        items={learningAreas}
      />
    );
  };
  return ListLoading(Comp)(props);
}

export default class SideBar extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <LearningAreas data={data} />
      </div>
    );
  }
}
